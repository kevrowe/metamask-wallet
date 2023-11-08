import {ethers} from 'ethers'

export const formatHexToEth = (hexValue: string) => {
    return ethers.formatUnits(hexValue, 'ether')
}