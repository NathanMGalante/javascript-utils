import { getFileNameFromUrl, renameFile } from '../file-utils.js';

describe('file-utils', () => {

  describe('getFileNameFromUrl', () => {
    const cases: [string, string, string][] = [
      ['standard URL path', 'https://example.com/path/to/file.txt', 'file.txt'],
      ['plain filename without path', 'document.pdf', 'document.pdf'],
      ['filename with multiple extensions', 'archive.tar.gz', 'archive.tar.gz'],
      ['URL containing query parameters', 'https://example.com/file.doc?v=1&user=test', 'file.doc?v=1&user=test'],
      ['URL containing hash anchors', 'https://example.com/gallery/photo.png#metadata', 'photo.png#metadata'],
      ['filename without extension', 'LICENSE', 'LICENSE'],
    ];

    test.each(cases)('should extract filename from %s', (_, input, expected) => {
      expect(getFileNameFromUrl(input)).toBe(expected);
    });
  });

  describe('renameFile', () => {
    // Shared setup helper to keep instantiation clean
    const createTestFile = (name: string, type = 'text/plain'): File => {
      return new File(['file content placeholder'], name, { type });
    };

    it('should immutably rename a file and preserve its properties', () => {
      const originalFile = createTestFile('original.txt', 'text/plain');
      const newName = 'new-name.txt';

      const renamedFile = renameFile(originalFile, newName);

      // Asserts structural changes and value preservation
      expect(renamedFile.name).toBe(newName);
      expect(renamedFile.type).toBe('text/plain');

      // Asserts immutability (must return a completely new instance)
      expect(renamedFile).not.toBe(originalFile);
      expect(renamedFile).toBeInstanceOf(File);
    });

    it('should correctly preserve specific mime types like images', () => {
      const imageFile = createTestFile('avatar.jpg', 'image/jpeg');
      const renamedImage = renameFile(imageFile, 'profile.jpg');

      expect(renamedImage.type).toBe('image/jpeg');
    });

    it('should handle renaming files that do not have extensions', () => {
      const extensionlessFile = createTestFile('README', '');
      const renamed = renameFile(extensionlessFile, 'README-NEW');

      expect(renamed.name).toBe('README-NEW');
      expect(renamed.type).toBe('');
    });
  });
});
