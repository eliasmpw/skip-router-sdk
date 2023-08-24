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
};

export type FeeAsset = {
  denom: string;
  gasPrice: GasPriceInfo;
};

export type FeeAssetJSON = {
  denom: string;
  gas_price: GasPriceInfo;
};

export type GasPriceInfo = {
  low: string;
  average: string;
  high: string;
};

export type ModuleSupport = {
  authz: boolean;
  feegrant: boolean;
};

export type ModuleVersionInfo = {
  path: string;
  version: string;
  sum: string;
};

export type SwapVenueJSON = {
  name: string;
  chain_id: string;
};

export type SwapVenue = {
  name: string;
  chainID: string;
};
