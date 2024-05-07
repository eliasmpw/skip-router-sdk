export type ModuleSupport = {
  authz: boolean;
  feegrant: boolean;
};

export type GasPriceInfo = {
  low: string;
  average: string;
  high: string;
};

export type FeeAsset = {
  denom: string;
  gasPrice: GasPriceInfo | null;
};

export type FeeAssetJSON = {
  denom: string;
  gas_price: GasPriceInfo | null;
};

export type Chain = {
  chainName: string;
  chainID: string;
  pfmEnabled: boolean;
  cosmosSDKVersion: string;
  modules: Record<string, ModuleVersionInfo>;
  cosmosModuleSupport: ModuleSupport;
  supportsMemo: boolean;
  logoURI?: string;
  bech32Prefix: string;
  feeAssets: FeeAsset[];
  chainType: string;
  ibc_capabilities: {
    cosmos_pfm: boolean;
    cosmos_ibc_hooks: boolean;
    cosmos_memo: boolean;
    cosmos_autopilot: boolean;
  };
  isTestnet: boolean;
};

export type ChainJSON = {
  chain_name: string;
  chain_id: string;
  pfm_enabled: boolean;
  cosmos_sdk_version: string;
  modules: Record<string, ModuleVersionInfo>;
  cosmos_module_support: ModuleSupport;
  supports_memo: boolean;
  logo_uri?: string;
  bech32_prefix: string;
  fee_assets: FeeAssetJSON[];
  chain_type: string;
  ibc_capabilities: {
    cosmos_pfm: boolean;
    cosmos_ibc_hooks: boolean;
    cosmos_memo: boolean;
    cosmos_autopilot: boolean;
  };
  is_testnet: boolean;
};

export type ModuleVersionInfo = {
  path: string;
  version: string;
  sum: string;
};
