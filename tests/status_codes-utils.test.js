import statusCodes from '../status_codes-utils.js'

describe('status_codes-utils', () => {
  describe('Information responses (1xx)', () => {
    it('should have CONTINUE status code', () => {
      expect(statusCodes.CONTINUE).toBe(100)
    })

    it('should have SWITCHING_PROTOCOLS status code', () => {
      expect(statusCodes.SWITCHING_PROTOCOLS).toBe(101)
    })
  })

  describe('Success responses (2xx)', () => {
    it('should have OK status code', () => {
      expect(statusCodes.OK).toBe(200)
    })

    it('should have CREATED status code', () => {
      expect(statusCodes.CREATED).toBe(201)
    })

    it('should have NO_CONTENT status code', () => {
      expect(statusCodes.NO_CONTENT).toBe(204)
    })
  })

  describe('Redirection responses (3xx)', () => {
    it('should have MOVED_PERMANENTLY status code', () => {
      expect(statusCodes.MOVED_PERMANENTLY).toBe(301)
    })

    it('should have FOUND status code', () => {
      expect(statusCodes.FOUND).toBe(302)
    })
  })

  describe('Client error responses (4xx)', () => {
    it('should have BAD_REQUEST status code', () => {
      expect(statusCodes.BAD_REQUEST).toBe(400)
    })

    it('should have UNAUTHORIZED status code', () => {
      expect(statusCodes.UNAUTHORIZED).toBe(401)
    })

    it('should have FORBIDDEN status code', () => {
      expect(statusCodes.FORBIDDEN).toBe(403)
    })

    it('should have NOT_FOUND status code', () => {
      expect(statusCodes.NOT_FOUND).toBe(404)
    })

    it('should have REQUEST_TIMEOUT status code', () => {
      expect(statusCodes.REQUEST_TIMEOUT).toBe(408)
    })

    it('should have TOO_MANY_REQUESTS status code', () => {
      expect(statusCodes.TOO_MANY_REQUESTS).toBe(429)
    })
  })

  describe('Server error responses (5xx)', () => {
    it('should have INTERNAL_SERVER_ERROR status code', () => {
      expect(statusCodes.INTERNAL_SERVER_ERROR).toBe(500)
    })

    it('should have NOT_IMPLEMENTED status code', () => {
      expect(statusCodes.NOT_IMPLEMENTED).toBe(501)
    })

    it('should have BAD_GATEWAY status code', () => {
      expect(statusCodes.BAD_GATEWAY).toBe(502)
    })

    it('should have SERVICE_UNAVAILABLE status code', () => {
      expect(statusCodes.SERVICE_UNAVAILABLE).toBe(503)
    })

    it('should have GATEWAY_TIMEOUT status code', () => {
      expect(statusCodes.GATEWAY_TIMEOUT).toBe(504)
    })
  })

  it('should be frozen object', () => {
    expect(Object.isFrozen(statusCodes)).toBe(true)
  })
})
