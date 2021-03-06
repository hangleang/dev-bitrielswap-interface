import { ChainId } from '@bitriel/bitrielswap-sdk'
import { MAINNET_AND_TESTNETS } from 'constants/chains'

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: 'ropsten.',
  [ChainId.RINKEBY]: 'rinkeby.',
  [ChainId.GÖRLI]: 'goerli.',
  [ChainId.KOVAN]: 'kovan.',
}

const BSCSCAN_PREFIXES: { [chainId: number]: string } = {
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: 'testnet.',
}

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(chainId: number, data: string, type: ExplorerDataType): string {
  if (chainId === ChainId.ARBITRUM_ONE) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return `https://explorer.arbitrum.io/tx/${data}`
      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return `https://explorer.arbitrum.io/address/${data}`
      case ExplorerDataType.BLOCK:
        return `https://explorer.arbitrum.io/block/${data}`
      default:
        return `https://explorer.arbitrum.io/`
    }
  }

  if (chainId === ChainId.ARBITRUM_RINKEBY) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return `https://rinkeby-explorer.arbitrum.io/tx/${data}`
      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return `https://rinkeby-explorer.arbitrum.io/address/${data}`
      case ExplorerDataType.BLOCK:
        return `https://rinkeby-explorer.arbitrum.io/block/${data}`
      default:
        return `https://rinkeby-explorer.arbitrum.io/`
    }
  }

  let prefix
  if (MAINNET_AND_TESTNETS.includes(chainId)) {
    prefix = `https://${ETHERSCAN_PREFIXES[chainId] ?? ''}etherscan.io`
  } else if ([ChainId.BSC, ChainId.BSC_TESTNET].includes(chainId)) {
    prefix = `https://${BSCSCAN_PREFIXES[chainId] ?? ''}bscscan.com`
  }

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/tx/${data}`

    case ExplorerDataType.TOKEN:
      return `${prefix}/token/${data}`

    case ExplorerDataType.BLOCK:
      return `${prefix}/block/${data}`

    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`
    default:
      return `${prefix}`
  }
}
