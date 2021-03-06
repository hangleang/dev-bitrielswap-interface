import { Contract } from '@ethersproject/contracts'
// import { Contract } from 'web3-eth-contract'
import { abi as GOVERNANCE_ABI } from '@bitriel/governance/artifacts/contracts/BitrielGovernance.sol/BitrielGovernor.json'
import { abi as BTR_ABI } from '@bitriel/governance/artifacts/contracts/BitrielToken.sol/BitrielToken.json'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { abi as MERKLE_DISTRIBUTOR_ABI } from '@uniswap/merkle-distributor/build/MerkleDistributor.json'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { abi as QuoterABI } from '@bitriel/bitrielswap-periphery/build/contracts/Quoter.json'
import { abi as MigratorABI } from '@bitriel/bitrielswap-periphery/build/contracts/Migrator.json'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { abi as MulticallABI } from '@bitriel/bitrielswap-periphery/build/contracts/BitrielSwapInterfaceMulticall.json'
import { abi as NFTPositionManagerABI } from '@bitriel/bitrielswap-periphery/build/contracts/NonfungiblePositionManager.json'

import ARGENT_WALLET_DETECTOR_ABI from 'constants/abis/argent-wallet-detector.json'
import ENS_PUBLIC_RESOLVER_ABI from 'constants/abis/ens-public-resolver.json'
import ENS_ABI from 'constants/abis/ens-registrar.json'
import ERC20_ABI from 'constants/abis/erc20.json'
import ERC20_BYTES32_ABI from 'constants/abis/erc20_bytes32.json'
import WETH_ABI from 'constants/abis/wsel.json'
import EIP_2612 from 'constants/abis/eip_2612.json'

import {
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  QUOTER_ADDRESSES,
  V3_MIGRATOR_ADDRESSES,
  ARGENT_WALLET_DETECTOR_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  MULTICALL_ADDRESS,
  V2_ROUTER_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
  GOVERNANCE_ALPHA_V0_ADDRESSES,
  GOVERNANCE_ALPHA_V1_ADDRESSES,
  BTR_ADDRESS,
} from 'constants/addresses'
import { useMemo } from 'react'
import { Quoter } from 'types/v3/Quoter'
import { NonfungiblePositionManager } from 'types/v3/NonfungiblePositionManager'
import { BitrielSwapInterfaceMulticall } from 'types/v3/BitrielSwapInterfaceMulticall'
import { Migrator } from 'types/v3/Migrator'
import { getContract } from 'utils'
import { Erc20, ArgentWalletDetector, EnsPublicResolver, EnsRegistrar, Weth } from '../constants/abis/types'
import { WNATIVE } from '@bitriel/bitrielswap-sdk'
import { useActiveWeb3React } from './web3'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useV2MigratorContract() {
  return useContract<Migrator>(V3_MIGRATOR_ADDRESSES, MigratorABI, true)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WNATIVE[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract() {
  return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useV2RouterContract(): Contract | null {
  return useContract(V2_ROUTER_ADDRESS, IUniswapV2Router02ABI, true)
}

export function useMulticall2Contract() {
  return useContract<BitrielSwapInterfaceMulticall>(MULTICALL_ADDRESS, MulticallABI, false)
}

export function useMerkleDistributorContract() {
  return useContract(MERKLE_DISTRIBUTOR_ADDRESS, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useGovernanceV0Contract(): Contract | null {
  return useContract(GOVERNANCE_ALPHA_V0_ADDRESSES, GOVERNANCE_ABI, true)
}

export function useGovernanceV1Contract(): Contract | null {
  return useContract(GOVERNANCE_ALPHA_V1_ADDRESSES, GOVERNANCE_ABI, true)
}

export const useLatestGovernanceContract = useGovernanceV1Contract

export function useBitrielContract() {
  return useContract(BTR_ADDRESS, BTR_ABI, true)
}

export function useStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(stakingAddress, STAKING_REWARDS_ABI, withSignerIfPossible)
}

export function useV3NFTPositionManagerContract(withSignerIfPossible?: boolean): NonfungiblePositionManager | null {
  return useContract<NonfungiblePositionManager>(
    NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
    NFTPositionManagerABI,
    withSignerIfPossible
  )
}

export function useV3Quoter() {
  return useContract<Quoter>(QUOTER_ADDRESSES, QuoterABI)
}
