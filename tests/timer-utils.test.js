import { timer } from '../timer-utils.js'

describe('timer-utils', () => {
    it('should create a timer object', () => {
        const callback = () => { }
        const t = timer(100, callback)

        expect(t).toBeDefined()
        expect(typeof t).toBe('object')
    })

    it('should have control methods', () => {
        const callback = () => { }
        const t = timer(100, callback)

        expect(t).toHaveProperty('play')
        expect(t).toHaveProperty('stop')
        expect(t).toHaveProperty('cancel')
        expect(t).toHaveProperty('reset')
        expect(t).toHaveProperty('restart')
    })

    it('should accept a duration', () => {
        const callback = () => { }
        expect(() => timer(100, callback)).not.toThrow()
        expect(() => timer(500, callback)).not.toThrow()
        expect(() => timer(1000, callback)).not.toThrow()
    })

    it('should accept a callback function', () => {
        const callback = () => { }
        expect(() => timer(100, callback)).not.toThrow()
    })

    it('should control the timer', () => {
        let value = 1
        const t = timer(100, () => (value++))
        expect(value).toBe(1)
        setTimeout(() => {
            expect(value).toBe(2)
            t.restart()
            setTimeout(() => expect(value).toBe(2), 50)
            setTimeout(() => {
                expect(value).toBe(3)
                t.restart()
                setTimeout(() => {
                    expect(value).toBe(3)
                    t.stop()
                }, 50)
                setTimeout(() => {
                    expect(value).toBe(3)
                    t.play()
                    setTimeout(() => expect(value).toBe(4), 50)
                }, 100)
            }, 100)
        }, 100)
    })
})
