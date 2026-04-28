import {
  DURATION_10_MILLISECONDS,
  DURATION_100_MILLISECONDS,
  DURATION_300_MILLISECONDS,
  DURATION_500_MILLISECONDS,
  DURATION_1_SECOND,
  DURATION_2_SECONDS,
  DURATION_5_SECONDS,
  DURATION_10_SECONDS,
  DURATION_15_SECONDS,
  DURATION_30_SECONDS,
  DURATION_1_MINUTE,
  DURATION_2_MINUTES,
  DURATION_5_MINUTES,
  DURATION_10_MINUTES,
  DURATION_15_MINUTES,
  DURATION_30_MINUTES,
} from '../duration-utils.js'

describe('duration-utils', () => {
  it('should have correct millisecond values', () => {
    expect(DURATION_10_MILLISECONDS).toBe(10)
    expect(DURATION_100_MILLISECONDS).toBe(100)
    expect(DURATION_300_MILLISECONDS).toBe(300)
    expect(DURATION_500_MILLISECONDS).toBe(500)
    expect(DURATION_1_SECOND).toBe(1000)
    expect(DURATION_2_SECONDS).toBe(2000)
    expect(DURATION_5_SECONDS).toBe(5000)
    expect(DURATION_10_SECONDS).toBe(10000)
    expect(DURATION_15_SECONDS).toBe(15000)
    expect(DURATION_30_SECONDS).toBe(30000)
    expect(DURATION_1_MINUTE).toBe(60000)
    expect(DURATION_2_MINUTES).toBe(120000)
    expect(DURATION_5_MINUTES).toBe(300000)
    expect(DURATION_10_MINUTES).toBe(600000)
    expect(DURATION_15_MINUTES).toBe(900000)
    expect(DURATION_30_MINUTES).toBe(1800000)
  })

  it('should all be numbers', () => {
    expect(typeof DURATION_10_MILLISECONDS).toBe('number')
    expect(typeof DURATION_100_MILLISECONDS).toBe('number')
    expect(typeof DURATION_1_SECOND).toBe('number')
    expect(typeof DURATION_1_MINUTE).toBe('number')
  })

  it('should increase proportionally', () => {
    expect(DURATION_2_SECONDS).toBe(DURATION_1_SECOND * 2)
    expect(DURATION_5_SECONDS).toBe(DURATION_1_SECOND * 5)
    expect(DURATION_2_MINUTES).toBe(DURATION_1_MINUTE * 2)
  })
})
