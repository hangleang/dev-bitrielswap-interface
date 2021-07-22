import {
  GOVERNANCE_ALPHA_V0_ADDRESSES,
  GOVERNANCE_ALPHA_V1_ADDRESSES,
  TIMELOCK_ADDRESS,
  UNI_ADDRESS,
} from './addresses'
import { ChainId } from 'dev-bitrielswap-sdk'

export const COMMON_CONTRACT_NAMES: Record<number, { [address: string]: string }> = {
  [ChainId.MAINNET]: {
    [UNI_ADDRESS[ChainId.MAINNET]]: 'UNI',
    [TIMELOCK_ADDRESS]: 'Timelock',
    [GOVERNANCE_ALPHA_V0_ADDRESSES[ChainId.MAINNET]]: 'Governance (V0)',
    [GOVERNANCE_ALPHA_V1_ADDRESSES[ChainId.MAINNET]]: 'Governance',
  },
}

export const DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS = 13

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS: { [chainId: number]: number } = {
  [1]: DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS,
}