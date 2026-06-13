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

## Ownership & control

Who controls each deployment (verified on-chain via `owner()` / role reads):

| Deployment | Control model | Controlling account |
| --- | --- | --- |
| **DotNS** (all contracts) | `Ownable` — `owner()` | `0x8c78b53f2ceaf395fda66152d7a5e6e7a79db675` — the **raw secp256k1 DotNS deployer key** (an EVM key, *not* an sr25519/mapped account; sign EVM txs via the eth-RPC). Also gates the registrar whitelist + `registerReserved`. |
| **CDM** `ContractRegistry` | `AccessControl` (no `owner()`) | `DEFAULT_ADMIN_ROLE` → `5Hn6AMFkiAyGFgWCShqAdXFax87uknHa5YXCZmiabFidohQy` (H160 `0xc53bb1eeac9b01bbd8161f3e9af1b0626e52a7e7`) |
| **Attestation** (SchemaRegistry, AttestationService) | **ownerless** — no admin, immutable | — |
| **Festival** (Festival, both POAPs) | `AccessControl` (no `owner()`) | `DEFAULT_ADMIN_ROLE` / `MANAGER_ROLE` → `5Hn6AMFkiAyGFgWCShqAdXFax87uknHa5YXCZmiabFidohQy` (H160 `0xc53bb1eeac9b01bbd8161f3e9af1b0626e52a7e7`) |
| **t3rminal** (T3rminalBulletinIndex) | **ownerless** — no admin, writes permissionless | — (the `t3rminal.dot` / `terminal.dot` names are owned by `5Fk8…`, registered via the DotNS owner override) |

> **DotNS owner override.** The DotNS owner can register any `.dot` label — including 6–8-char names that normally require PopFull personhood — via `DotnsRegistrarController.registerReserved()` (`onlyWhiteListedOrOwner`, price 0, no PoP check). Personhood itself is sourced from an external People-chain precompile and is **not** grantable on-chain. For first-party names only. Tooling: `summit-deployer-skills/guides/_tools/register-reserved-name.mjs`.

## DotNS

ENS-style name service. Source: [Polkadot-Community-Foundation/dotns](https://github.com/Polkadot-Community-Foundation/dotns).

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

The DotNS UI deployed to the **Summit Bulletin chain** and bound to a `.dot` name. Built from `pcf-dotns-ui` **v0.7.1**.

| Field | Value |
| --- | --- |
| Domain | `dotns.dot` |
| Root CID | `bafybeid6x63k3b3opmjkcfmlwagmtmdavwhher4mswzxijw7rm2olwozau` |
| Contenthash | `0xe301017012207ebfb6ad876e7b12a1158bb00cc9b060ad8e72478c95b37426df8b34e5d9d905` |
| Owner / deployer | `14M6Yc9i8dg6QLM2u1yd3jaFM2cd3NNvyKznfBaS2q3cNdKy` (EVM `0x7e0e0a5a111aa15b0c1e4bac776884e263fa6b13`) |
| Bulletin uploader | `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` (~448 chunks / 15.4 MB) |

## CDM — Contract Dependency Manager

The CDM contract layer: the `ContractRegistry` plus the shared system contracts registered in it. Sources: [contract-dependency-manager](https://github.com/Polkadot-Community-Foundation/contract-dependency-manager) (registry), [contract-developer-tools](https://github.com/Polkadot-Community-Foundation/contract-developer-tools) (system contracts).

| Contract | Package | Address | Metadata CID |
| --- | --- | --- | --- |
| ContractRegistry | — | `0xa5747e60ae27f93e92019e4021abfc4957050141` | — |
| Contexts | `@polkadot/contexts` | `0x9B935075094D7176Afc7e33C5B183109B86B1b6A` | `bafk2bzacebxxftyxsgmbqbqjxg2epgt2cu5efcgqudaeze7mbs2po7exzsbhu` |
| Disputes | `@mock/disputes` | `0x3671Fe6Ebdd5E2FFCE2EbbD499972900390bdD64` | `bafk2bzaceboepbkvkkqwowok4j7elutfxpofnzoqerkdnmipumggp2w7whkxw` |
| Profiles | `@polkadot/profiles` | `0x99dAFFC69479297C30815e3a27746f81632dfea1` | `bafk2bzaced4iqgbx7ph5dmri42jy27omodwkrouspwxkyiatiiee57cfi2r5y` |
| Reputation | `@mock/reputation` | `0x94a9099379EeA0C5093F93E9934a7f6605E7922f` | `bafk2bzacedzebmc33kmrgtynlvlwxdhusuuzoxc5cbasxhfi2xjkg3n4umuxe` |
| Threads | `@polkadot/threads` | `0xFa1AB6B6aCBb056F5D9952EEDC5C67F1F3162f3A` | `bafk2bzacebp7nmv5h4lp4mov23pzq6no5eati4u3nri3xkpb7cvxz4lri2er4` |

### CDM Frontend (browse hub on Bulletin)

The CDM contract-registry browse hub deployed to the **Summit Bulletin chain** and bound to a `.dot` name. Built from `@parity/cdm-frontend`; defaults to the W3S/Summit network.

| Field | Value |
| --- | --- |
| Domain | `contracts.dot` |
| URL | https://contracts.dot.li |
| Root CID | `bafybeid2flilxbxopek7yaifq4gsp6zvbalz46gv2nd7ayvij5znckhqnu` |

## Attestation Protocol

EAS-style attestation layer: schema registry + attestation service (both ownerless). Source: [Polkadot-Community-Foundation/attestation-protocol](https://github.com/Polkadot-Community-Foundation/attestation-protocol). Consumed by `browse`.

| Contract | Address |
| --- | --- |
| SchemaRegistry | `0x4d5b7543c380be0446ff9c22b6055990e2aa952a` |
| AttestationService | `0x40c48a58cdc2797f21325269c4422e717e6510e5` |

Artifacts: [`deployments/summit/`](https://github.com/Polkadot-Community-Foundation/attestation-protocol/tree/main/deployments/summit) in the source repo.

## Browse

Privacy-app directory ("Home for privacy apps"). Source: [Polkadot-Community-Foundation/browse](https://github.com/Polkadot-Community-Foundation/browse). Deployer / Publisher owner / `browse.dot` owner / uploader = `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` (EVM `0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD`).

| Contract | Address |
| --- | --- |
| Publisher (v2.1.0) | `0xf5fe0fc9f4c13dfd3a4a8abd27e64eb652157494` |
| RecipientAndAttesterIndexResolver | `0xa2ea4ab49bbe73f466f2fa0aeb50b39d34b55218` |
| TrustedAttesterIndexResolver | `0xde4a63079034230d71b5a5071571ed3fd95194e0` |

Schemas (in the shared SchemaRegistry): id `1` = `bool like` (resolver = the index resolver) · id `2` = `bool compliant`, unique (resolver = the trusted resolver). Trusted attester = `5HECKTpBe95rgbptG812Gh61VH3pjDfhgtE6xq5mHvRSUSo3` (EVM `0xeB686805D91dB3637258d0d21DefC06d0dA3a8C9`).

### Browse app (web app on Bulletin) — ✅ live

| Field | Value |
| --- | --- |
| Domain | `browse.dot` |
| URL | https://browse.dot.li |
| Root CID | `bafybeig6oyro2d337o22igjfmr4u7ctprucxkn3zomdluk4cazzrmtriea` |
| Owner / uploader | `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` |

## Festival

Conference app (soulbound tickets, attendance POAPs, composable sessions) + two Nuxt SPAs. Self-contained. Source: [Polkadot-Community-Foundation/festival](https://github.com/Polkadot-Community-Foundation/festival).

| Contract | Address |
| --- | --- |
| Multicall3 | `0x6749bd94dc0d68fb7f829e0bf3422ad324d5fe53` |
| Festival POAP (AttendancePOAP) | `0x22127c13ee2abd2280c2e56bf3b7fff82d24ef75` |
| Session POAP (AttendancePOAP) | `0x55a0fced4cf4f2e50570ae27ce9a037b99579578` |
| Festival | `0xd75f84d9593bd2cf61dbf3670cc94f771050a99a` |
| FestivalSession | `0x50a70807bbb6eec19840ad46b0cb508f8c6cd99e` |

Deployed by `5Hn6AMFkiAyGFgWCShqAdXFax87uknHa5YXCZmiabFidohQy` (EVM `0xc53bb1eeac9b01bbd8161f3e9af1b0626e52a7e7`).

### Festival apps (web app on Bulletin) — ✅ live

Two Nuxt SPAs published to the **Summit Bulletin chain**, bound to two `.dot` names. Publisher/owner/uploader = `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` (EVM `0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD`).

| App | Domain | URL | Root CID |
| --- | --- | --- | --- |
| Admin SPA | `web3summit-admin.dot` | https://web3summit-admin.dot.li | `bafybeihuuc6poyiwu32d6uaeflffeb3mpvxbnrahjnolah2hfhbudk52ku` |
| Attendee SPA | `web3summit.dot` | https://web3summit.dot.li | `bafybeigkjfmdjmsjtpko4ivlsgzdg47ooocxz4o3xbtfz7hndv2vr552ta` |

## Webviews (web apps on Bulletin) — ✅ live

Two static webviews embedded by the Polkadot superapp clients (android/ios/desktop): the game-results
viewer and the pocket-collectibles viewer.. Deployed with
[`@polkadot-community-foundation/polkadot-app-deploy@0.10.1`](https://www.npmjs.com/package/@polkadot-community-foundation/polkadot-app-deploy). Owner / uploader =
`5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` (EVM `0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD`).
Sources: [game-results-webview](https://github.com/Polkadot-Community-Foundation/game-results-webview) ·
[pocket-collectibles-webview](https://github.com/Polkadot-Community-Foundation/pocket-collectibles-webview).

| App | Domain | URL | Root CID |
| --- | --- | --- | --- |
| Game results | `game-results-webview.dot` | https://game-results-webview.dot.li | `bafybeichlyq74h5fpdlwdt4cn5ivmkxlbp4tdusrmoldedhzo4ilk4luby` |
| Pocket collectibles | `collectibles-webview.dot` | https://collectibles-webview.dot.li | `bafybeieqx7p6rccwid3xjvxpksz3piwfn37brwa2eatpd2lud2b53xmhye` |

## t3rminal

Point-of-sale terminal: accepts payments and anchors signed daily sales reports on-chain. The contract only **indexes** report CIDs (keyed by merchant+terminal+date, with a `finalize` lock); the report bytes live on Bulletin. **Writes are permissionless** — no admin/owner. Source: [Polkadot-Community-Foundation/t3rminal](https://github.com/Polkadot-Community-Foundation/t3rminal).

| Contract | Address |
| --- | --- |
| T3rminalBulletinIndex | `0x10acbce7ea2fb859ef7c2caab29c0babb8b91803` |

Prebuilt PolkaVM blob — code hash `0x47143defb9b966a31ec75f83cf54ba76231578280e4a9893d15f3afaa95245d3`. Deployed by `5Hn6AMFkiAyGFgWCShqAdXFax87uknHa5YXCZmiabFidohQy` (EVM `0xc53bb1eeac9b01bbd8161f3e9af1b0626e52a7e7`); deploy tx `0x06be2f41732213d2a8316ecfd08823e669332af27d44b01c320d7f3356c2f930`.

### t3rminal app (web app on Bulletin) — ✅ live

Static Next.js export published to the **Summit Bulletin chain**, bound to **two** `.dot` names — each a full product manifest (`app.<name>` subname holding the app contenthash, plus `text[manifest]` + `text[executable]` records on the root; shared icon CID `bafk2bzacebqw4qplfbh3g6h6ypipxvanbiyzrbg4imruyh43f2fcm3jccp3fi`). Both names registered via the **DotNS owner override** (`registerReserved`) and owned by `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` (EVM `0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD`), which is also the Bulletin uploader. The CLI bakes the target domain into each bundle, so the two names carry **distinct CIDs** (same app, same source build). Deployed with [`@polkadot-community-foundation/polkadot-app-deploy@0.10.1`](https://www.npmjs.com/package/@polkadot-community-foundation/polkadot-app-deploy).

| Name | URL | App CID (on `app.<name>`) |
| --- | --- | --- |
| `t3rminal.dot` | https://t3rminal.dot.li | `bafybeibwpj54mrm62fuzrpesianvzfnwgowln7juipjbbhgp6puhut5yau` |
| `terminal.dot` | https://terminal.dot.li | `bafybeig5gghipthmzr3wowyi3wunnjbkqlgrcdh4hyzs27fapceo3e7tha` |

## dotli — the public web gateway (dot.li)

The dotli `.dot` browser serving **Summit** as its default network, live at **https://dot.li** — a full production cutover from paritytech. Source: [Polkadot-Community-Foundation/dotli-community](https://github.com/Polkadot-Community-Foundation/dotli-community).

| Field | Value |
| --- | --- |
| Domain | `dot.li` |
| Network default | `summit` |

## npm Packages

PCF-scoped packages published to npm under [`@polkadot-community-foundation`](https://www.npmjs.com/org/polkadot-community-foundation).

| Package | Version | Purpose | Source |
| --- | --- | --- | --- |
| [`@polkadot-community-foundation/cdm-env`](https://www.npmjs.com/package/@polkadot-community-foundation/cdm-env) | `2.1.0` | CDM chain env presets; `getRegistryAddress("w3s")` returns the Summit `ContractRegistry` address `0xa5747e60ae27f93e92019e4021abfc4957050141` (see CDM section) | contract-dependency-manager — `@parity/cdm-env` rescoped at publish |
| [`@polkadot-community-foundation/dotns-cli`](https://www.npmjs.com/package/@polkadot-community-foundation/dotns-cli) | `0.7.2` | DotNS CLI (`dotns`) | dotns-sdk — `pcf-dotns-cli` renamed |
| [`@polkadot-community-foundation/polkadot-app-deploy`](https://www.npmjs.com/package/@polkadot-community-foundation/polkadot-app-deploy) | `0.10.1` | Bulletin app-deploy CLI (`polkadot-app-deploy`/`pad`); npm-legacy name `bulletin-deploy`. Carries the **manifest direct-signer fix** (manifest/icon/widget uploads sign with `--mnemonic`, not the unauthorized pool) | polkadot-app-deploy — `@parity/polkadot-app-deploy` rescoped at publish |
