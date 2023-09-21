import { Secp256k1HdWallet } from "@cosmjs/amino";
import { FaucetClient } from "@cosmjs/faucet-client";
import { coin, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { isDeliverTxFailure, isDeliverTxSuccess } from "@cosmjs/stargate";
import { InjectiveDirectEthSecp256k1Wallet } from "@injectivelabs/sdk-ts";

import { SKIP_API_URL, SkipRouter } from "../src";
import {
  COSMOSHUB_ENDPOINT,
  COSMOSHUB_FAUCET,
  EVMOS_REST_ENDPOINT,
  EVMOS_RPC_ENDPOINT,
  INJECTIVE_REST_ENDPOINT,
  INJECTIVE_RPC_ENDPOINT,
  OSMOSIS_ENDPOINT,
  OSMOSIS_FAUCET,
} from "./utils";

describe("transaction execution", () => {
  it("signs and executes an IBC transfer", async () => {
    const client = new SkipRouter({
      apiURL: SKIP_API_URL,
      endpointOptions: {
        getRpcEndpointForChain: async () => {
          return COSMOSHUB_ENDPOINT;
        },
      },
    });

    const signer = await DirectSecp256k1HdWallet.fromMnemonic(
      "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley",
    );

    const accounts = await signer.getAccounts();

    const signerAddress = accounts[0].address;

    const faucet = new FaucetClient(COSMOSHUB_FAUCET);
    await faucet.credit(signerAddress, "uatom");

    const timeout = BigInt(Date.now()) * BigInt(1000000);

    const message = {
      chainID: "gaia-1",
      path: ["gaia-1", "osmosis-1"],
      msg: `{"source_port":"transfer","source_channel":"channel-0","token":{"denom":"uatom","amount":"1000000"},"sender":"${signerAddress}","receiver":"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj","timeout_height":{},"timeout_timestamp":"${timeout}","memo":"{\\"wasm\\":{\\"contract\\":\\"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj\\",\\"msg\\":{\\"swap_and_action\\":{\\"user_swap\\":{\\"swap_exact_coin_in\\":{\\"swap_venue_name\\":\\"osmosis-poolmanager\\",\\"operations\\":[{\\"pool\\":\\"1\\",\\"denom_in\\":\\"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2\\",\\"denom_out\\":\\"uosmo\\"}]}},\\"min_coin\\":{\\"denom\\":\\"uosmo\\",\\"amount\\":\\"18961936\\"},\\"timeout_timestamp\\":1693222298030492937,\\"post_swap_action\\":{\\"bank_send\\":{\\"to_address\\":\\"osmo1f2f9vryyu53gr8vhsksn66kugnxaa7k8jdpk0e\\"}},\\"affiliates\\":[]}}}}"}`,
      msgTypeURL: "/ibc.applications.transfer.v1.MsgTransfer",
    };

    const tx = await client.executeMultiChainMessage({
      signerAddress,
      signer,
      message,
      feeAmount: coin(1000000, "uatom"),
    });

    expect(isDeliverTxSuccess(tx)).toBe(true);
  });

  it("signs and executes an IBC transfer (amino)", async () => {
    const client = new SkipRouter({
      apiURL: SKIP_API_URL,
      endpointOptions: {
        getRpcEndpointForChain: async () => {
          return COSMOSHUB_ENDPOINT;
        },
      },
    });

    const signer = await Secp256k1HdWallet.fromMnemonic(
      "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley",
    );

    const accounts = await signer.getAccounts();

    const signerAddress = accounts[0].address;

    const faucet = new FaucetClient(COSMOSHUB_FAUCET);
    await faucet.credit(signerAddress, "uatom");

    const timeout = BigInt(Date.now()) * BigInt(1000000);

    const message = {
      chainID: "gaia-1",
      path: ["gaia-1", "osmosis-1"],
      msg: `{"source_port":"transfer","source_channel":"channel-0","token":{"denom":"uatom","amount":"1000000"},"sender":"${signerAddress}","receiver":"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj","timeout_height":{},"timeout_timestamp":"${timeout}","memo":"{\\"wasm\\":{\\"contract\\":\\"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj\\",\\"msg\\":{\\"swap_and_action\\":{\\"user_swap\\":{\\"swap_exact_coin_in\\":{\\"swap_venue_name\\":\\"osmosis-poolmanager\\",\\"operations\\":[{\\"pool\\":\\"1\\",\\"denom_in\\":\\"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2\\",\\"denom_out\\":\\"uosmo\\"}]}},\\"min_coin\\":{\\"denom\\":\\"uosmo\\",\\"amount\\":\\"18961936\\"},\\"timeout_timestamp\\":1693222298030492937,\\"post_swap_action\\":{\\"bank_send\\":{\\"to_address\\":\\"osmo1f2f9vryyu53gr8vhsksn66kugnxaa7k8jdpk0e\\"}},\\"affiliates\\":[]}}}}"}`,
      msgTypeURL: "/ibc.applications.transfer.v1.MsgTransfer",
    };

    const tx = await client.executeMultiChainMessage({
      signerAddress,
      signer,
      message,
      feeAmount: coin(1000000, "uatom"),
    });

    expect(isDeliverTxSuccess(tx)).toBe(true);
  });

  it("signs and executes an IBC transfer (injective)", async () => {
    const client = new SkipRouter({
      apiURL: SKIP_API_URL,
      endpointOptions: {
        getRpcEndpointForChain: async () => {
          return INJECTIVE_RPC_ENDPOINT;
        },
        getRestEndpointForChain: async () => {
          return INJECTIVE_REST_ENDPOINT;
        },
      },
    });

    const signer = await InjectiveDirectEthSecp256k1Wallet.fromKey(
      Uint8Array.from(
        Buffer.from(
          "408890c2b5eba1664bbd33ced41ec0d1322c48b2f65934142e0d8855b552204c",
          "hex",
        ),
      ),
    );
    const accounts = await signer.getAccounts();

    const signerAddress = accounts[0].address;

    const timeout = BigInt(Date.now()) * BigInt(1000000);

    const message = {
      chainID: "injective-1",
      path: ["injective-1", "osmosis-1"],
      msg: `{"source_port":"transfer","source_channel":"channel-0","token":{"denom":"inj","amount":"1000000000000000000"},"sender":"${signerAddress}","receiver":"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj","timeout_height":{},"timeout_timestamp":"${timeout}","memo":"{\\"wasm\\":{\\"contract\\":\\"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj\\",\\"msg\\":{\\"swap_and_action\\":{\\"user_swap\\":{\\"swap_exact_coin_in\\":{\\"swap_venue_name\\":\\"osmosis-poolmanager\\",\\"operations\\":[{\\"pool\\":\\"1\\",\\"denom_in\\":\\"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2\\",\\"denom_out\\":\\"uosmo\\"}]}},\\"min_coin\\":{\\"denom\\":\\"uosmo\\",\\"amount\\":\\"18961936\\"},\\"timeout_timestamp\\":1693222298030492937,\\"post_swap_action\\":{\\"bank_send\\":{\\"to_address\\":\\"osmo1f2f9vryyu53gr8vhsksn66kugnxaa7k8jdpk0e\\"}},\\"affiliates\\":[]}}}}"}`,
      msgTypeURL: "/ibc.applications.transfer.v1.MsgTransfer",
    };

    const tx = await client.executeMultiChainMessage({
      signerAddress,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      signer,
      message,
      feeAmount: coin(1000000, "inj"),
    });

    expect(isDeliverTxSuccess(tx)).toBe(true);
  });

  it("signs and executes an IBC transfer (evmos)", async () => {
    const client = new SkipRouter({
      apiURL: SKIP_API_URL,
      endpointOptions: {
        getRpcEndpointForChain: async () => {
          return EVMOS_RPC_ENDPOINT;
        },
        getRestEndpointForChain: async () => {
          return EVMOS_REST_ENDPOINT;
        },
      },
    });

    const signer = await InjectiveDirectEthSecp256k1Wallet.fromKey(
      Uint8Array.from(
        Buffer.from(
          "408890c2b5eba1664bbd33ced41ec0d1322c48b2f65934142e0d8855b552204c",
          "hex",
        ),
      ),
      "evmos",
    );

    const accounts = await signer.getAccounts();

    const signerAddress = accounts[0].address;

    const timeout = BigInt(Date.now()) * BigInt(1000000);

    const message = {
      chainID: "evmos_9000-1",
      path: ["evmos_9000-1", "osmosis-1"],
      msg: `{"source_port":"transfer","source_channel":"channel-0","token":{"denom":"aevmos","amount":"1000000000000000000"},"sender":"${signerAddress}","receiver":"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj","timeout_height":{},"timeout_timestamp":"${timeout}","memo":"{\\"wasm\\":{\\"contract\\":\\"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj\\",\\"msg\\":{\\"swap_and_action\\":{\\"user_swap\\":{\\"swap_exact_coin_in\\":{\\"swap_venue_name\\":\\"osmosis-poolmanager\\",\\"operations\\":[{\\"pool\\":\\"1\\",\\"denom_in\\":\\"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2\\",\\"denom_out\\":\\"uosmo\\"}]}},\\"min_coin\\":{\\"denom\\":\\"uosmo\\",\\"amount\\":\\"18961936\\"},\\"timeout_timestamp\\":1693222298030492937,\\"post_swap_action\\":{\\"bank_send\\":{\\"to_address\\":\\"osmo1f2f9vryyu53gr8vhsksn66kugnxaa7k8jdpk0e\\"}},\\"affiliates\\":[]}}}}"}`,
      msgTypeURL: "/ibc.applications.transfer.v1.MsgTransfer",
    };

    const tx = await client.executeMultiChainMessage({
      signerAddress,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      signer,
      message,
      feeAmount: coin(10000000, "aevmos"),
    });

    expect(isDeliverTxSuccess(tx)).toBe(true);
  });

  it("signs and executes a cosmwasm execute message", async () => {
    const signer = await DirectSecp256k1HdWallet.fromMnemonic(
      "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley",
      {
        prefix: "osmo",
      },
    );

    const accounts = await signer.getAccounts();
    const signerAddress = accounts[0].address;

    const faucet = new FaucetClient(OSMOSIS_FAUCET);
    await faucet.credit(signerAddress, "uosmo");

    const client = new SkipRouter({
      apiURL: SKIP_API_URL,
      endpointOptions: {
        getRpcEndpointForChain: async () => {
          return OSMOSIS_ENDPOINT;
        },
      },
    });

    const message = {
      chainID: "osmosis-1",
      path: ["osmosis-1", "cosmoshub-4"],
      msg: `{"sender":"${signerAddress}","contract":"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj","msg":{"swap_and_action":{"user_swap":{"swap_exact_coin_in":{"operations":[{"denom_in":"uosmo","denom_out":"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2","pool":"1"}],"swap_venue_name":"osmosis-poolmanager"}},"min_coin":{"denom":"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2","amount":"495"},"timeout_timestamp":1693265108785341058,"post_swap_action":{"ibc_transfer":{"ibc_info":{"memo":"","receiver":"cosmos1f2f9vryyu53gr8vhsksn66kugnxaa7k86kjxet","recover_address":"osmo1f2f9vryyu53gr8vhsksn66kugnxaa7k8jdpk0e","source_channel":"channel-0"}}},"affiliates":[]}},"funds":[{"denom":"uosmo","amount":"10000"}]}`,
      msgTypeURL: "/cosmwasm.wasm.v1.MsgExecuteContract",
    };

    const tx = await client.executeMultiChainMessage({
      signerAddress,
      signer,
      message,
      feeAmount: coin(1000000, "uosmo"),
    });

    // CheckTx must pass but the execution will fail in DeliverTx due to invalid contract address
    expect(isDeliverTxFailure(tx)).toBe(true);
    expect(tx.rawLog).toEqual(
      "failed to execute message; message index: 0: contract: not found",
    );
  });

  it("signs and executes a cosmwasm execute message (amino)", async () => {
    const client = new SkipRouter({
      apiURL: SKIP_API_URL,
      endpointOptions: {
        getRpcEndpointForChain: async () => {
          return OSMOSIS_ENDPOINT;
        },
      },
    });

    const signer = await Secp256k1HdWallet.fromMnemonic(
      "opinion knife other balcony surge more bamboo canoe romance ask argue teach anxiety adjust spike mystery wolf alone torch tail six decide wash alley",
      {
        prefix: "osmo",
      },
    );

    const accounts = await signer.getAccounts();

    const signerAddress = accounts[0].address;

    const faucet = new FaucetClient(OSMOSIS_FAUCET);
    await faucet.credit(signerAddress, "uosmo");

    const message = {
      chainID: "osmosis-1",
      path: ["osmosis-1", "cosmoshub-4"],
      msg: `{"sender":"${signerAddress}","contract":"osmo1rc6h59ev8m7mdpg584v7m5t24k2ut3dy5nekjw4mdsfjysyjvv3q65m8pj","msg":{"swap_and_action":{"user_swap":{"swap_exact_coin_in":{"operations":[{"denom_in":"uosmo","denom_out":"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2","pool":"1"}],"swap_venue_name":"osmosis-poolmanager"}},"min_coin":{"denom":"ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2","amount":"495"},"timeout_timestamp":1693265108785341058,"post_swap_action":{"ibc_transfer":{"ibc_info":{"memo":"","receiver":"cosmos1f2f9vryyu53gr8vhsksn66kugnxaa7k86kjxet","recover_address":"osmo1f2f9vryyu53gr8vhsksn66kugnxaa7k8jdpk0e","source_channel":"channel-0"}}},"affiliates":[]}},"funds":[{"denom":"uosmo","amount":"10000"}]}`,
      msgTypeURL: "/cosmwasm.wasm.v1.MsgExecuteContract",
    };

    const tx = await client.executeMultiChainMessage({
      signerAddress,
      signer,
      message,
      feeAmount: coin(1000000, "uosmo"),
    });

    // CheckTx must pass but the execution will fail in DeliverTx due to invalid contract address
    expect(isDeliverTxFailure(tx)).toBe(true);
    expect(tx.rawLog).toEqual(
      "failed to execute message; message index: 0: contract: not found",
    );
  });
});
