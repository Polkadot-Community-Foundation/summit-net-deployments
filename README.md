# Summit Network — Deployments

On-chain addresses, deployers, and domains for everything deployed to the **Summit** network.

## Network

| Field | Value |
| --- | --- |
| Network | Summit Asset Hub (PolkaVM / `pallet-revive`) |
| EVM chain id | `420420417` (`0x190f1b41`) |
| Native token | SUM, 10 decimals |
| SS58 prefix | `0` |
| Asset Hub RPC | `wss://summit-asset-hub-rpc.polkadot.io` |

## Key accounts

| Ref | SS58 | EVM (H160) | Role |
| --- | --- | --- | --- |
| **DotNS deployer** | — (raw secp256k1 EVM key) | `0x8c78b53f2ceaf395fda66152d7a5e6e7a79db675` | Owner of all DotNS contracts + registrar whitelist / `registerReserved` |
| **CDM admin** | `5Hn6AMFkiAyGFgWCShqAdXFax87uknHa5YXCZmiabFidohQy` | `0xc53bb1eeac9b01bbd8161f3e9af1b0626e52a7e7` | CDM / Festival / t3rminal / w3spay-admin deployer + admin |
| **W3S publisher** | `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` | `0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD` | Bulletin uploader + `.dot` owner for most apps; Playground/Browse deployer |

## DotNS

ENS-style name service. Owner: **DotNS deployer**. Source: [dotns](https://github.com/Polkadot-Community-Foundation/dotns) · SDK/CLI: [dotns-sdk](https://github.com/Polkadot-Community-Foundation/dotns-sdk).

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

## CDM — Contract Dependency Manager

Shared `ContractRegistry` + system contracts. Admin: **CDM admin**. Sources: [contract-dependency-manager](https://github.com/Polkadot-Community-Foundation/contract-dependency-manager) · [contract-developer-tools](https://github.com/Polkadot-Community-Foundation/contract-developer-tools).

| Contract | Package | Address |
| --- | --- | --- |
| ContractRegistry | — | `0xa5747e60ae27f93e92019e4021abfc4957050141` |
| Contexts | `@polkadot/contexts` | `0x9B935075094D7176Afc7e33C5B183109B86B1b6A` |
| Disputes | `@mock/disputes` | `0x3671Fe6Ebdd5E2FFCE2EbbD499972900390bdD64` |
| Profiles | `@polkadot/profiles` | `0x99dAFFC69479297C30815e3a27746f81632dfea1` |
| Reputation | `@mock/reputation` | `0x94a9099379EeA0C5093F93E9934a7f6605E7922f` |
| Threads | `@polkadot/threads` | `0xFa1AB6B6aCBb056F5D9952EEDC5C67F1F3162f3A` |

## Attestation Protocol

EAS-style schema registry + attestation service (both ownerless / immutable). Source: [attestation-protocol](https://github.com/Polkadot-Community-Foundation/attestation-protocol).

| Contract | Address |
| --- | --- |
| SchemaRegistry | `0x4d5b7543c380be0446ff9c22b6055990e2aa952a` |
| AttestationService | `0x40c48a58cdc2797f21325269c4422e717e6510e5` |

## Browse

Privacy-app directory. Deployer / owner: **W3S publisher**. Source: [browse](https://github.com/Polkadot-Community-Foundation/browse).

| Contract | Address |
| --- | --- |
| Publisher (v2.1.0) | `0xf5fe0fc9f4c13dfd3a4a8abd27e64eb652157494` |
| RecipientAndAttesterIndexResolver | `0xa2ea4ab49bbe73f466f2fa0aeb50b39d34b55218` |
| TrustedAttesterIndexResolver | `0xde4a63079034230d71b5a5071571ed3fd95194e0` |

Trusted attester: `5HECKTpBe95rgbptG812Gh61VH3pjDfhgtE6xq5mHvRSUSo3` (EVM `0xeB686805D91dB3637258d0d21DefC06d0dA3a8C9`).

## Festival

Conference app: soulbound tickets, attendance POAPs, sessions. Deployer / admin: **CDM admin**. Source: [festival](https://github.com/Polkadot-Community-Foundation/festival).

| Contract | Address |
| --- | --- |
| Multicall3 | `0x6749bd94dc0d68fb7f829e0bf3422ad324d5fe53` |
| Festival POAP (AttendancePOAP) | `0x22127c13ee2abd2280c2e56bf3b7fff82d24ef75` |
| Session POAP (AttendancePOAP) | `0x55a0fced4cf4f2e50570ae27ce9a037b99579578` |
| Festival | `0xd75f84d9593bd2cf61dbf3670cc94f771050a99a` |
| FestivalSession | `0x50a70807bbb6eec19840ad46b0cb508f8c6cd99e` |

## t3rminal

Point-of-sale terminal: indexes signed daily sales-report CIDs (writes permissionless, no admin). Deployer: **CDM admin**. Source: [t3rminal](https://github.com/Polkadot-Community-Foundation/t3rminal).

| Contract | Address |
| --- | --- |
| T3rminalBulletinIndex | `0x10acbce7ea2fb859ef7c2caab29c0babb8b91803` |

## w3spay-admin

W3sPay pilot admin console: the `W3SPayRegistry` contract (owner = deployer's H160, super-admin). Deployer: **CDM admin**. Source: [w3spay-admin](https://github.com/Polkadot-Community-Foundation/w3spay-admin).

| Contract | Address |
| --- | --- |
| W3SPayRegistry | `0xf76dadbbc112738275ed398d15c0e8c47b2550f2` |

> `w3spay` (customer checkout) and `w3s-payment-processor` (merchant monitor) are app-only and consume this `W3SPayRegistry`.

## Playground

Registry browser + quest platform for the Web3 Summit Developer Lab. Deployer / `sudo` / owner: **W3S publisher**. Registered in the CDM `ContractRegistry`. Source: [playground-app-community](https://github.com/Polkadot-Community-Foundation/playground-app-community).

| Contract | Package | Address |
| --- | --- | --- |
| Registry | `@w3s/playground-registry` | `0x14C27954796575C26c85eD9BC6441522e174a0f3` |

## Apps on Bulletin

Web apps published to the **Summit Bulletin chain** and bound to `.dot` names. Owner / uploader: **W3S publisher** (except DotNS UI, noted below).

| App | Domain | URL | Root CID |
| --- | --- | --- | --- |
| DotNS UI | `dotns.dot` | https://dotns.dot.li | `bafybeiggzry5xc4ewcb6by7vh3dz7q3afhl5qk5kdufnla2vpajh2g5bha` |
| CDM Frontend | `contracts.dot` | https://contracts.dot.li | `bafybeid2flilxbxopek7yaifq4gsp6zvbalz46gv2nd7ayvij5znckhqnu` |
| Browse | `browse.dot` | https://browse.dot.li | `bafybeig6oyro2d337o22igjfmr4u7ctprucxkn3zomdluk4cazzrmtriea` |
| Festival — Admin | `web3summit-admin.dot` | https://web3summit-admin.dot.li | `bafybeihuuc6poyiwu32d6uaeflffeb3mpvxbnrahjnolah2hfhbudk52ku` |
| Festival — Attendee | `web3summit.dot` | https://web3summit.dot.li | `bafybeigkjfmdjmsjtpko4ivlsgzdg47ooocxz4o3xbtfz7hndv2vr552ta` |
| Game results webview | `game-results-webview.dot` | https://game-results-webview.dot.li | `bafybeichlyq74h5fpdlwdt4cn5ivmkxlbp4tdusrmoldedhzo4ilk4luby` |
| Pocket collectibles webview | `collectibles-webview.dot` | https://collectibles-webview.dot.li | `bafybeieqx7p6rccwid3xjvxpksz3piwfn37brwa2eatpd2lud2b53xmhye` |
| t3rminal | `t3rminal.dot` | https://t3rminal.dot.li | `bafybeibwpj54mrm62fuzrpesianvzfnwgowln7juipjbbhgp6puhut5yau` |
| t3rminal (alias) | `terminal.dot` | https://terminal.dot.li | `bafybeig5gghipthmzr3wowyi3wunnjbkqlgrcdh4hyzs27fapceo3e7tha` |
| w3spay-admin | `w3spayadmin.dot` | https://w3spayadmin.dot.li | `bafybeihk6ugqrpdbkphtvuwszowiiawp2pejuym3uo5iffbdw3juf72gmi` |
| w3spay checkout | `w3spaycheckout.dot` | https://w3spaycheckout.dot.li | `bafybeiadel63jof2tiailtl3ngr7l5bgvtbaca63c35k4mlwbo35x7evhe` |
| w3s-payment-processor | `w3spayprocessor.dot` | https://w3spayprocessor.dot.li | `bafybeiermq4qz3vstftmhgmxqpfhzghhgj7k5s3sci6vwlwb7zqdm3qxdm` |
| Playground | `playground.dot` | https://playground.dot.li | `bafybeihzgdyuq7v5ncclnnusgmcy3lye3z7kadrcfqxmgvdxveqwpy76bq` |
| Playground constellation (kiosk) | `constellation.dot` | https://constellation.dot.li | `bafybeibudgjoiyhcvgqumuzqlm7mzmormtpfeosv2kxdib7pomtl5hswza` |
| dotli Starter | `dotli-starter.dot` | https://dotli-starter.dot.li | `bafybeieekbrschbyclzsw4cjcs5wjcbisqkbkvwyfnn3ilzey6xifck2d4` |

> **DotNS UI** owner / deployer: `14M6Yc9i8dg6QLM2u1yd3jaFM2cd3NNvyKznfBaS2q3cNdKy` (EVM `0x7e0e0a5a111aa15b0c1e4bac776884e263fa6b13`); uploaded by **W3S publisher**.

### dotli — public web gateway

The dotli `.dot` browser at **https://dot.li**, defaulting to the **Summit** network. Source: [dotli-community](https://github.com/Polkadot-Community-Foundation/dotli-community).

## npm Packages

Published under [`@polkadot-community-foundation`](https://www.npmjs.com/org/polkadot-community-foundation).

| Package | Version | Purpose |
| --- | --- | --- |
| [`cdm-env`](https://www.npmjs.com/package/@polkadot-community-foundation/cdm-env) | `2.1.0` | CDM chain env presets; `getRegistryAddress("w3s")` → `0xa5747e60ae27f93e92019e4021abfc4957050141` |
| [`dotns-cli`](https://www.npmjs.com/package/@polkadot-community-foundation/dotns-cli) | `0.7.2` | DotNS CLI (`dotns`) |
| [`polkadot-app-deploy`](https://www.npmjs.com/package/@polkadot-community-foundation/polkadot-app-deploy) | `0.10.1` | Bulletin app-deploy CLI (`polkadot-app-deploy` / `pad`) |
| [`cdm-cli`](https://www.npmjs.com/package/@polkadot-community-foundation/cdm-cli) | `0.8.22` | CDM CLI (`cdm`) — bundled, registry baked in |
