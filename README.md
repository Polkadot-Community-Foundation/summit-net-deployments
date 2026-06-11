# Summit Network — Deployments

What has been deployed to the **Summit** network and the on-chain addresses.

## Network

| Field | Value |
| --- | --- |
| Network | Summit Asset Hub (PolkaVM / `pallet-revive`) |
| EVM chain id | `420420417` (`0x190f1b41`) |
| Native token | SUM, 10 decimals |
| SS58 prefix | `0` |
| Asset Hub RPC | `wss://summit-asset-hub-rpc.polkadot.io` |

## DotNS

ENS-style name service. Source: [Polkadot-Community-Foundation/dotns](https://github.com/Polkadot-Community-Foundation/dotns). Deployed 2026-06-07.

| Contract | Address |
| --- | --- |
| Create3Factory | `0x2A6Ab3F071c216e80e683cB1A6eA32798A0F132C` |
| DotnsProtocolRegistry | `0x09f1AE947950eA2d1f010fE2abC00fDd5A745820` |
| DotnsRegistrar | `0xf3969bCBE60463302306663C62A6A8ef91ab9aA5` |
| DotnsRegistrarController | `0xA68a5b2A6be6d014be0dB07c0ed4bacc4A6A570A` |
| DotnsRegistry | `0xFb7AB7E142ED0248D77198CA8722D67C1930D783` |
| DotnsResolver | `0xC7f1C3B16BFd0c5910EE37a4a2033f4506AcE94d` |
| DotnsReverseResolver | `0x5aa444C6cbA9bd703d1a0B5E5C643FB886F80bB4` |
| DotnsContentResolver | `0xf110e5799c3f0adb8ED885C02c45Ecfe7fD86226` |
| DotnsPopController | `0xC7DD78B145ed109092A2d1E79324E5FE219B9518` |
| DotnsPopResolver | `0x03FD2ed7B1b848c59A2428224162dE00D11a8133` |
| PopRules | `0x6331e51C9AfC73BfE12562fd160BA2c66A73f984` |
| DotnsNameEscrow | `0xDbE911007f8cd9876D384b8c025d3BB157DCCcA4` |
| StoreFactory | `0x2947af3CBFb45b89610524a25921C32cB65C4C39` |
| LabelStoreBeacon | `0x670Dab225ea4f2EeB0e6Df2e49AA595aB2CAa5cb` |
| UserStoreBeacon | `0x31e392736889c973A25509861C7D6E6F2EaD951C` |
| RootGatewayDispatcher | `0x22362162032ED2442b43f5902b3421be5aCF1b60` |
| Multicall3 | `0x1C1044BEa5bDe0F435436bB52A8340fBE1D59847` |

A client SDK/CLI for DotNS including the changes with the above dotns relevant contract addresses in summit-net is available at [Polkadot-Community-Foundation/dotns-sdk](https://github.com/Polkadot-Community-Foundation/dotns-sdk).

### DotNS UI (web app on Bulletin)

The DotNS UI deployed to the **Summit Bulletin chain** and bound to a `.dot` name. Built from `pcf-dotns-ui` **v0.7.1**, deployed 2026-06-10.

| Field | Value |
| --- | --- |
| Domain | `summit-net-name-service.dot` |
| Root CID | `bafybeid7fijq27dia5alqoojr7ht4ha2pg4qod53ocdevpesk5fc3ynwk4` |
| Contenthash | `0xe301017012207f2a130d7c680740b839c98fcf3e1c1a79b9070fbb70864abc92574a2de1b657` |
| Owner / deployer | `14M6Yc9i8dg6QLM2u1yd3jaFM2cd3NNvyKznfBaS2q3cNdKy` (EVM `0x7e0e0a5a111aa15b0c1e4bac776884e263fa6b13`) |
| Bulletin uploader | `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` (435 blocks / 14.68 MB) |
| register tx | `0x95721477838ae1de09bfc112e7a0a0fed02caa4cbd507c3f78e90206cb7c4b84` |
| setContenthash tx | `0x4b4e40293b2332bdfa42cfdbb48a3436cfafdaa365669d0ab066e25d80832c4a` |

## CDM — Contract Dependency Manager

The CDM contract layer: the `ContractRegistry` plus the shared system contracts registered in it. Sources: [contract-dependency-manager](https://github.com/Polkadot-Community-Foundation/contract-dependency-manager) (registry), [contract-developer-tools](https://github.com/Polkadot-Community-Foundation/contract-developer-tools) (system contracts). Deployed 2026-06-11.

| Contract | Package | Address | Metadata CID |
| --- | --- | --- | --- |
| ContractRegistry | — | `0xa5747e60ae27f93e92019e4021abfc4957050141` | — |
| Contexts | `@polkadot/contexts` | `0x9B935075094D7176Afc7e33C5B183109B86B1b6A` | `bafk2bzacebxxftyxsgmbqbqjxg2epgt2cu5efcgqudaeze7mbs2po7exzsbhu` |
| Disputes | `@mock/disputes` | `0x3671Fe6Ebdd5E2FFCE2EbbD499972900390bdD64` | `bafk2bzaceboepbkvkkqwowok4j7elutfxpofnzoqerkdnmipumggp2w7whkxw` |
| Profiles | `@polkadot/profiles` | `0x99dAFFC69479297C30815e3a27746f81632dfea1` | `bafk2bzaced4iqgbx7ph5dmri42jy27omodwkrouspwxkyiatiiee57cfi2r5y` |
| Reputation | `@mock/reputation` | `0x94a9099379EeA0C5093F93E9934a7f6605E7922f` | `bafk2bzacedzebmc33kmrgtynlvlwxdhusuuzoxc5cbasxhfi2xjkg3n4umuxe` |
| Threads | `@polkadot/threads` | `0xFa1AB6B6aCBb056F5D9952EEDC5C67F1F3162f3A` | `bafk2bzacebp7nmv5h4lp4mov23pzq6no5eati4u3nri3xkpb7cvxz4lri2er4` |
