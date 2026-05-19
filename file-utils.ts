import mime from 'mime-types';

/**
 * Interface representing a file-like object with custom properties used across the system.
 */
export interface CustomFile extends Partial<File> {
  url?: string;
  name?: string;
  type?: string;
  lastModifiedDate?: Date;
  [key: string]: any; // Allows custom properties dynamically attached by the system
}

/**
 * Ensures a file object has the basic required properties (url, type, and name).
 * 
 * @param file - The file-like object to process.
 * @returns The processed file with guaranteed properties.
 */
export const ensureFileProperties = <T extends CustomFile>(file: T): T => {
  file.url ??= fileToUrl(file as any);
  file.type ??= getMimeTypeByExtension(file.url) || undefined;
  file.name ??= getFileNameFromUrl(file.url);
  return file;
};

/**
 * Extracts the filename from a given URL string.
 * 
 * @param url - The URL of the file.
 * @returns The filename extracted from the last URL segment.
 */
export const getFileNameFromUrl = (url: string): string => {
  return url.split('/').at(-1) || '';
};

/**
 * Orchestrates the conversion of various inputs (URL, Base64, File, or Object) 
 * into a standardized File object.
 * 
 * @param file - The raw input to assemble.
 * @returns A promise that resolves to a standardized File/Object or null.
 */
export const assembleFile = async (file: string | File | CustomFile | null | undefined): Promise<CustomFile | null> => {
  if (!file) return null;

  if (file instanceof File) return ensureFileProperties(file);

  if (typeof file === 'string') {
    if (isBase64(file)) {
      const blob = await getBase64FromFile(file as any);
      return ensureFileProperties(blob as any);
    }
    if (file.startsWith('http')) {
      const url = file;
      try {
        return ensureFileProperties(await urlToFile(url, getFileNameFromUrl(url)));
      } catch (e) {
        return ensureFileProperties({ url });
      }
    }
  }

  if (typeof file === 'object') {
    const ensuredFile = ensureFileProperties({ ...file });
    const base64 = getBase64FromFileObj(ensuredFile);
    if (base64) {
      return ensureFileProperties(
        assembleFileWithTypeFromBase64(
          base64,
          ensuredFile.name || 'file',
          ensuredFile.type
        )
      );
    }
    try {
      return ensureFileProperties(
        await urlToFile(ensuredFile.url || '', ensuredFile.name || 'file')
      );
    } catch (e) {
      return ensuredFile;
    }
  }
  return null;
};

/**
 * Looks up the MIME type associated with a file extension or path.
 * 
 * @param extension - The file extension or path.
 * @returns The MIME type string or false if not found.
 */
export const getMimeTypeByExtension = (extension: string): string | false => {
  return mime.lookup(extension);
};

/**
 * Generates a temporary browser URL (Blob URL) for a File or Blob.
 * 
 * @param file - The source file or blob.
 * @returns The generated object URL.
 */
export const fileToUrl = (file: File | Blob): string => {
  return URL.createObjectURL(file);
};

/**
 * Creates a new File object from an existing one with a different name.
 * 
 * @param file - The original file.
 * @param fileName - The new name for the file.
 * @returns A new File instance with the updated name.
 */
export const renameFile = (file: File, fileName: string): File => {
  return new File([file], fileName, { type: file.type });
};

/**
 * Downloads a file from a URL and converts it into a File object.
 * 
 * @param url - The remote file URL.
 * @param filename - The name to assign to the new file.
 * @returns A Promise that resolves to a File instance.
 */
export const urlToFile = async (url: string, filename: string): Promise<File> => {
  return assembleFileFromBase64(await getBase64FromUrl(url), filename);
};

/**
 * Converts a Blob into a File object by manually adding metadata.
 * 
 * @param blob - The source blob.
 * @param fileName - The filename to assign.
 * @returns The decorated blob (emulating a File object).
 */
export const blobToFile = (blob: Blob & CustomFile, fileName: string): Blob => {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
};

/**
 * Scans an object's values to find a valid Base64 string.
 * 
 * @param obj - The object to search.
 * @returns The found Base64 string or null.
 */
export const getBase64FromFileObj = (obj: Record<string, any> | null | undefined): string | null => {
  if (!obj || typeof obj !== 'object') return null;
  return Object.values(obj).find((val): val is string => typeof val === 'string' && isBase64(val)) || null;
};

/**
 * Validates if a string is a correctly formatted Base64 or Data URL.
 * 
 * @param str - The string to check.
 * @returns True if valid base64, false otherwise.
 */
export const isBase64 = (str: unknown): boolean => {
  if (typeof str !== 'string' || str.startsWith('http')) return false;
  const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  const dataUrlRegex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)?;base64,([A-Za-z0-9+/=\s]+)$/;
  const cleanStr = str.replace(/\s/g, '');
  if (dataUrlRegex.test(cleanStr)) return true;
  return base64Regex.test(cleanStr);
};

/**
 * Helper to convert Base64 data directly into an Object URL.
 * 
 * @param dataUrl - The Data URL string.
 * @param filename - The filename to use during conversion.
 * @returns The generated Object URL.
 */
export const assembleUrlFromBase64 = (dataUrl: string, filename: string): string => {
  return fileToUrl(assembleFileFromBase64(dataUrl, filename));
};

/**
 * Assembles a File from Base64, ensuring MIME type headers are present.
 * 
 * @param base64 - Raw or Data URL Base64 string.
 * @param filename - Target filename.
 * @param type - Optional MIME type.
 * @returns A standard File instance.
 */
export const assembleFileWithTypeFromBase64 = (base64: string, filename: string, type?: string): File => {
  if (!base64.includes(',')) {
    const mimeType = type ?? (getMimeTypeByExtension(filename) || 'application/octet-stream');
    const base64WithType = mergeMimeTypeWithBase64(mimeType, base64);
    return assembleFileFromBase64(base64WithType, filename);
  }
  return assembleFileFromBase64(base64, filename);
};

/**
 * Converts a Data URL (Base64) into a physical File object.
 * 
 * @param base64Data - The Data URL string.
 * @param filename - The name for the resulting file.
 * @returns A standard File instance.
 */
export const assembleFileFromBase64 = (base64Data: string, filename: string): File => {
  const [mimeType, base64] = base64Data.split(',');
  const match = mimeType.match(/:(.*?);/);
  const type = match ? match[1] : 'application/octet-stream';
  const decodedData = atob(base64);
  const data = new Uint8Array(decodedData.length);

  let index = decodedData.length;
  while (index--) {
    data[index] = decodedData.charCodeAt(index);
  }

  return new File([data], filename, { type });
};

/**
 * Fetches content from a URL and returns it as a Base64 string.
 * 
 * @param url - The URL to fetch.
 * @returns The resulting Base64 Data URL.
 */
export const getBase64FromUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return getBase64FromFile(blob);
};

/**
 * Reads a file and returns the Base64 content without the Data URL prefix.
 * 
 * @param file - The source file or blob.
 * @returns Raw base64 string.
 */
export const getBase64FromFileWithoutMimeType = async (file: File | Blob): Promise<string | undefined> => {
  return ensureBase64WithoutMimeType(await getBase64FromFile(file));
};

/**
 * Strips the Data URL prefix (e.g., "data:image/png;base64,") from a string if it exists.
 * 
 * @param base64 - The full Data URL string.
 * @returns The raw Base64 data without the MIME type header.
 */
export const ensureBase64WithoutMimeType = (base64: string | undefined): string | undefined => {
  return base64?.includes(',') ? base64.split(',').at(-1) : base64;
};

/**
 * Reads a File or Blob as a Data URL string.
 * 
 * @param file - The source file or blob.
 * @returns A promise that resolves to the data URL string.
 */
export const getBase64FromFile = async (file: File | Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string);
  });
};

/**
 * Prefixes raw Base64 data with the appropriate Data URL header.
 * 
 * @param mimeType - The MIME type (e.g., 'image/png').
 * @param base64 - The raw Base64 data.
 * @returns The full Data URL string.
 */
export const mergeMimeTypeWithBase64 = (mimeType: string, base64: string): string => {
  const formattedBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
  return `data:${mimeType};base64,${formattedBase64}`;
};

/**
 * Infers the file extension from a Base64 Data URL.
 * 
 * @param base64String - Data URL string.
 * @returns Extension string.
 */
export const getExtensionFromBase64 = (base64String: string): string => {
  return getExtensionFromMimeType(getMimeTypeFromBase64(base64String) ?? '');
};

/**
 * Extracts the MIME type from a Base64 Data URL string.
 * 
 * @param base64String - Data URL string.
 * @returns The extracted MIME type or undefined if not found.
 */
export const getMimeTypeFromBase64 = (base64String: string): string | undefined => {
  const match = base64String.match(/^data:(.*?);base64,/);
  return match ? match[1] : undefined;
};

/**
 * Parses a MIME type string to extract the extension.
 * 
 * @param mimeType - Example: 'image/jpeg'.
 * @returns Example: 'jpeg'.
 */
export const getExtensionFromMimeType = (mimeType: string): string => {
  const [, extension] = mimeType?.split('/') ?? [];
  return extension || '';
};
