import { formatHexToEth } from "./currency"

describe('Currency helpers', () => {
    describe('formatHexToEth', () => {
        it('should format 1234000000000000 WEI to 0.001234 ETH', () => {
            const result = formatHexToEth('0x6f269b20d05d5e6')

            expect(result).toBe('0.500578722035127782')
        })
    })
})