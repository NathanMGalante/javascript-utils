import { getFileNameFromUrl, renameFile } from '../file-utils.js'

describe('file-utils', () => {
  describe('getFileNameFromUrl', () => {
    it('should extract filename from URL', () => {
      expect(getFileNameFromUrl('https://example.com/path/to/file.txt')).toBe('file.txt')
    })

    it('should handle simple filenames', () => {
      expect(getFileNameFromUrl('document.pdf')).toBe('document.pdf')
    })

    it('should handle filenames with multiple dots', () => {
      expect(getFileNameFromUrl('archive.tar.gz')).toBe('archive.tar.gz')
    })

    it('should extract from URL with query params', () => {
      expect(getFileNameFromUrl('https://example.com/file.doc?v=1')).toBe('file.doc?v=1')
    })
  })

  describe('renameFile', () => {
    it('should rename a file', () => {
      const file = new File(['test'], 'original.txt', { type: 'text/plain' })
      const renamed = renameFile(file, 'newname.txt')
      
      expect(renamed.name).toBe('newname.txt')
      expect(renamed.type).toBe('text/plain')
    })

    it('should preserve file type', () => {
      const file = new File(['test'], 'image.jpg', { type: 'image/jpeg' })
      const renamed = renameFile(file, 'new-image.jpg')
      
      expect(renamed.type).toBe('image/jpeg')
    })

    it('should create a new File instance', () => {
      const file = new File(['test'], 'original.txt')
      const renamed = renameFile(file, 'renamed.txt')
      
      expect(renamed).not.toBe(file)
      expect(renamed).toBeInstanceOf(File)
    })
  })
})
