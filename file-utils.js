/**
 * Ensures a file object has the basic required properties (url, type, and name).
 * @param {File|Object} file - The file-like object to process.
 * @returns {File|Object} The processed file with guaranteed properties.
 */
export const ensureFileProperties = (file) => {
    file.url ??= fileToUrl(file)
    file.type ??= getMimeTypeByExtension(file.url)
    file.name ??= getFileNameFromUrl(file.url)
    return file
}

/**
 * Extracts the filename from a given URL string.
 * @param {string} url - The URL of the file.
 * @returns {string} The filename extracted from the last URL segment.
 */
export const getFileNameFromUrl = (url) => {
    return url.split('/').at(-1)
}

/**
 * Orchestrates the conversion of various inputs (URL, Base64, File, or Object) 
 * into a standardized File object.
 * @param {string|File|Object|null} file - The raw input to assemble.
 * @returns {Promise<File|Object|null>} A promise that resolves to a standardized File or null.
 */
export const assembleFile = async (file) => {
    if (!file) return null

    if (file instanceof File) return ensureFileProperties(file)

    if (typeof file === 'string') {
        if (isBase64(file)) {
            return ensureFileProperties(await getBase64FromFile(file))
        }
        if (file.startsWith('http')) {
            const url = file
            try {
                return ensureFileProperties(urlToFile(url, getFileNameFromUrl(url)))
            } catch (e) {
                return ensureFileProperties({ url })
            }
        }
    }

    if (typeof file === 'object') {
        const ensuredFile = ensureFileProperties(file)
        const base64 = getBase64FromFileObj(ensuredFile)
        if (base64) {
            return ensureFileProperties(
                assembleFileWithTypeFromBase64(
                    base64,
                    ensuredFile.name,
                    ensuredFile.type
                )
            )
        }
        try {
            return ensureFileProperties(
                await urlToFile(ensuredFile.url, ensuredFile.name)
            )
        } catch (e) {
            return ensuredFile
        }
    }
    return null
}

/**
 * Looks up the MIME type associated with a file extension or path.
 * @param {string} extension - The file extension or path.
 * @returns {string|boolean} The MIME type string or false if not found.
 */
export const getMimeTypeByExtension = (extension) => {
    return require('mime-types').lookup(extension)
}

/**
 * Generates a temporary browser URL (Blob URL) for a File or Blob.
 * @param {File|Blob} file - The source file or blob.
 * @returns {string} The generated object URL.
 */
export const fileToUrl = (file) => {
    return URL.createObjectURL(file)
}

/**
 * Creates a new File object from an existing one with a different name.
 * @param {File} file - The original file.
 * @param {string} fileName - The new name for the file.
 * @returns {File} A new File instance with the updated name.
 */
export const renameFile = (file, fileName) => {
    return new File([file], fileName, { type: file.type })
}

/**
 * Downloads a file from a URL and converts it into a File object.
 * @param {string} url - The remote file URL.
 * @param {string} filename - The name to assign to the new file.
 * @returns {Promise<File>}
 */
export const urlToFile = async (url, filename) => {
    return assembleFileFromBase64(await getBase64FromUrl(url), filename)
}

/**
 * Converts a Blob into a File object by manually adding metadata.
 * @param {Blob} blob - The source blob.
 * @param {string} fileName - The filename to assign.
 * @returns {Blob} The decorated blob (emulating a File object).
 */
export const blobToFile = (blob, fileName) => {
    blob.lastModifiedDate = new Date()
    blob.name = fileName
    return blob
}

/**
 * Scans an object's values to find a valid Base64 string.
 * @param {Object} obj - The object to search.
 * @returns {string|null} The found Base64 string or null.
 */
export const getBase64FromFileObj = (obj) => {
    if (!obj || typeof obj !== 'object') return null
    return Object.values(obj).find(isBase64)
}

/**
 * Validates if a string is a correctly formatted Base64 or Data URL.
 * @param {string} str - The string to check.
 * @returns {boolean}
 */
export const isBase64 = (str) => {
    if (typeof str !== 'string' || str.startsWith('http')) return false
    const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
    const dataUrlRegex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)?;base64,([A-Za-z0-9+/=\s]+)$/
    const cleanStr = str.replace(/\s/g, '')
    if (dataUrlRegex.test(cleanStr)) return true
    return base64Regex.test(cleanStr)
}

/**
 * Helper to convert Base64 data directly into an Object URL.
 * @param {string} dataUrl - The Data URL string.
 * @param {string} filename - The filename to use during conversion.
 * @returns {string} The generated Object URL.
 */
export const assembleUrlFromBase64 = (dataUrl, filename) => {
    return fileToUrl(assembleFileFromBase64(dataUrl, filename))
}

/**
 * Assembles a File from Base64, ensuring MIME type headers are present.
 * @param {string} base64 - Raw or Data URL Base64 string.
 * @param {string} filename - Target filename.
 * @param {string} [type] - Optional MIME type.
 * @returns {File}
 */
export const assembleFileWithTypeFromBase64 = (base64, filename, type) => {
    if (!base64.includes(',')) {
        const mimeType = type ?? getMimeTypeByExtension(filename)
        const base64WithType = mergeMimeTypeWithBase64(mimeType, base64)
        return assembleFileFromBase64(base64WithType, filename)
    }
    return assembleFileFromBase64(base64, filename)
}

/**
 * Converts a Data URL (Base64) into a physical File object.
 * @param {string} base64Data - The Data URL string.
 * @param {string} filename - The name for the resulting file.
 * @returns {File}
 */
export const assembleFileFromBase64 = (base64Data, filename) => {
    const [mimeType, base64] = base64Data.split(','),
        type = mimeType.match(/:(.*?);/)[1],
        decodedData = atob(base64),
        data = new Uint8Array(decodedData.length)

    let index = decodedData.length
    while (index--) {
        data[index] = decodedData.charCodeAt(index)
    }

    return new File([data], filename, { type })
}

/**
 * Fetches content from a URL and returns it as a Base64 string.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<string>} The resulting Base64 Data URL.
 */
export const getBase64FromUrl = async (url) => {
    const blob = await fetch(url).then((response) => {
        return response.blob()
    })
    return getBase64FromFile(blob)
}

/**
 * Reads a file and returns the Base64 content without the Data URL prefix.
 * @param {File|Blob} file 
 * @returns {Promise<string>}
 */
export const getBase64FromFileWithoutMimeType = async (file) => {
    return ensureBase64WithoutMimeType(await getBase64FromFile(file))
}

/**
 * Strips the Data URL prefix (e.g., "data:image/png;base64,") from a string if it exists.
 * @param {string} base64 - The full Data URL string.
 * @returns {string} The raw Base64 data without the MIME type header.
 */
export const ensureBase64WithoutMimeType = (base64) => {
    return base64?.includes(',') ? base64.split(',').at(-1) : base64
}

/**
 * Reads a File or Blob as a Data URL string.
 * @param {File|Blob} file 
 * @returns {Promise<string>}
 */
export const getBase64FromFile = async (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => resolve(reader.result)
    })
}

/**
 * Prefixes raw Base64 data with the appropriate Data URL header.
 * @param {string} mimeType - The MIME type (e.g., 'image/png').
 * @param {string} base64 - The raw Base64 data.
 * @returns {string} The full Data URL string.
 */
export const mergeMimeTypeWithBase64 = (mimeType, base64) => {
    let formattedBase64 = base64.includes(',') ? base64.split(',')[1] : base64
    return `data:${mimeType};base64,${formattedBase64}`
}

/**
 * Infers the file extension from a Base64 Data URL.
 * @param {string} base64String 
 * @returns {string}
 */
export const getExtensionFromBase64 = (base64String) => {
    return getExtensionFromMimeType(getMimeTypeFromBase64(base64String) ?? '')
}

/**
 * Extracts the MIME type from a Base64 Data URL string.
 * @param {string} base64String 
 * @returns {string}
 */
export const getMimeTypeFromBase64 = (base64String) => {
    const [, mimeType] = base64String.match(/^data:(.*?);base64,/)
    return mimeType
}

/**
 * Parses a MIME type string to extract the extension.
 * @param {string} mimeType - Example: 'image/jpeg'.
 * @returns {string} Example: 'jpeg'.
 */
export const getExtensionFromMimeType = (mimeType) => {
    const [, extension] = mimeType?.split('/') ?? []
    return extension
}
