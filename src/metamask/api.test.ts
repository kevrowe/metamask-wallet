import { SDKProvider } from '@metamask/sdk'
import { getAccounts, getBalance, getChainId } from './api'

describe('getAccounts', () => {
    it('should return an empty array if the provider returns an invalid response', async () => {
        const mockProvider = {
            request: jest.fn(() => Promise.resolve(false)),
        } as unknown as SDKProvider

        const accounts = await getAccounts(mockProvider)

        expect(accounts).toEqual([])
    })

    it('should return an array of accounts if the provider returns a valid response', async () => {
        const mockProvider = {
            request: jest.fn(() => Promise.resolve(['0x1234567890abcdef1234567890abcdef12345678'])),
        } as unknown as SDKProvider

        const accounts = await getAccounts(mockProvider)

        expect(accounts).toEqual(['0x1234567890abcdef1234567890abcdef12345678'])
    })
})

describe('getBalance', () => {
    it('should return the balance of the account if the provider returns a valid response', async () => {
        const mockProvider = {
            request: jest.fn(() => Promise.resolve('1000000000000000000')),
        } as unknown as SDKProvider

        const balance = await getBalance(mockProvider, '0x1234567890abcdef1234567890abcdef12345678')

        expect(balance).toEqual('1000000000000000000')
    })

    it('should return null if the provider returns an invalid response', async () => {
        const mockProvider = {
            request: jest.fn(() => Promise.resolve(false)),
        } as unknown as SDKProvider

        const balance = await getBalance(mockProvider, '0x1234567890abcdef1234567890abcdef12345678')

        expect(balance).toEqual(null)
    })
})

describe('getChainId', () => {
    it('should return the chain ID if the provider returns a valid response', async () => {
        const mockProvider = {
            request: jest.fn(() => Promise.resolve('1')),
        } as unknown as SDKProvider

        const chainId = await getChainId(mockProvider)

        expect(chainId).toEqual('1')
    })

    it('should return null if the provider returns an invalid response', async () => {
        const mockProvider = {
            request: jest.fn(() => Promise.resolve(false)),
        } as unknown as SDKProvider

        const chainId = await getChainId(mockProvider)

        expect(chainId).toEqual(null)
    })
})
