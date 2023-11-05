import { SDKProvider } from '@metamask/sdk'

export const getAccounts = async (provider: SDKProvider): Promise<string[]> => {
    const accounts = await provider.request({
        method: "eth_accounts",
        params: [],
    })

    if (!Array.isArray(accounts)) {
        return []
    }

    return accounts
}

/**
 * Get balance of account
 * @param provider MetaMask SDKProvider
 * @param account Account number
 * @returns Raw balance value
 */
export const getBalance = async (provider: SDKProvider, account: string): Promise<string | null> => {
    const result = await provider.request({
        method: "eth_getBalance",
        params: [account, "latest"],
    })

    if (typeof result === 'string') {
        return result
    }

    return null
}

export const getChainId = async (provider: SDKProvider): Promise<string | null> => {
    const result = await provider.request({
        method: "eth_chainId",
    });

    return typeof result === 'string' ? result : null
}