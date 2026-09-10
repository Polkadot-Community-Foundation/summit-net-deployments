# Public Products Devnet — Deployments

PCF product suite on the public **Paseo** system chains (AssetHub 1000 / People 1004 / Bulletin 1010), gateway **`dev-dot.li`**.

## Network

| Field | Value |
| --- | --- |
| EVM chain id | `420420417` |
| Native token | PAS (10 dp) · SS58 prefix 42 |
| Gateway | `dev-dot.li` |
| Gateway build | TrUAPI host runtime (dotli fork sync 2026-09-09, PR #30 merged; dev-dot.li and dot.li both on this build, byte-identical asset graphs, DotNS v0.6.0 set) |
| DotNS v0.6.0 restore | ✅ complete 2026-09-09: 301 community names + 121 subnames restored on the new set (2 escrow-held names skipped: ip-assets, squadbuilder); migration controller retired |
| Bulletin uploader auth | ✅ 5Fk8 authorized until Bulletin block 930720 (~2026-09-18). ⚠️ `dotns-cli` < 0.9.1 misreads the post-2004000 authorization shape as "not authorized": check on-chain `transactionStorage.authorizations` before re-granting |
| Relay genesis | `0x374057be67b355151f271ff70c3db98308c62c8adc48dc6724b6a009a1a014fd` |
| AssetHub (1000) genesis | `0xd6eec26135305a8ad257a20d003357284c8aa03d0bdb2b357ab0a22371e11ef2` |
| People (1004) genesis | `0xe6c30d6e148f250b887105237bcaa5cb9f16dd203bf7b5b9d4f1da7387cb86ec` |
| Bulletin (1010) genesis | `0xe101f0fa4627d29a257645e02be86d80378fea1a2bf8fa6a918d150ebc760a59` |
| AssetHub RPC | `wss://asset-hub-paseo-rpc.n.dwellir.com` |
| AssetHub ETH-RPC | `https://eth-rpc-testnet.polkadot.io` |
| People RPC | `wss://people-paseo.rotko.net` |
| Bulletin RPC | `wss://bulletin-paseo.tservices.es:8443` |
| Bulletin IPFS gateway | `https://devnet-ipfs.api.polkadotcommunity.foundation` (bare origin; tools append `/ipfs/<cid>`) |
| Relay RPC | `wss://paseo-rpc.n.dwellir.com` |

## Runtimes

Paseo system-chain runtimes as enacted on the products devnet. Source: [paseo-network/runtimes](https://github.com/paseo-network/runtimes).

| Chain | spec_version | transaction_version | Release | Enacted (UTC) | Enactment block | Blob blake2-256 |
| --- | --- | --- | --- | --- | --- | --- |
| people-paseo (1004) | `2005002` (from 2005001) | `3` | [v2.5.2](https://github.com/paseo-network/runtimes/releases/tag/v2.5.2) | 2026-09-10 | `6618852` | `0xd0f3191c63f51decc9eaa0cb61be5e84dcda532e0934e827d382183458ac36df` |
| asset-hub-paseo (1000) | `2005002` (from 2005000) | `18` | [v2.5.2](https://github.com/paseo-network/runtimes/releases/tag/v2.5.2) | 2026-09-10 | `13182258` | `0x3d399dc2daeaaf831fc4fda6ddc1958494fc0f3319ebb8ec0c1e7ca8995eed56` |

> **v2.5.2 ([paseo-network/runtimes#421](https://github.com/paseo-network/runtimes/pull/421), closes [paseo-network/runtimes#420](https://github.com/paseo-network/runtimes/issues/420)) drops the W3S `AuthorizeValueTransfer` gate.**
> The extension and the protected-asset (pUSD `50000413`) value-transfer filter are gone from both chains: plain signed
> origins can now move pUSD and coinage, so clients no longer need a bundled W3S key. Slot 0 of the origin-modifier
> tuple is now the unit extension (metadata `UnitTransactionExtension`); extension counts are unchanged (People 23, Asset Hub 17).

## Stablecoins (pUSD / USDt / USDC)

Mirrors the 15XX (paseo-next) layout. On **AssetHub (1000)** these live in the `assets` pallet keyed by **u32** id; on **People (1004)** they are registered as **foreign assets** in People's `assets` pallet, keyed by the AH **MultiLocation** `{parents:1, X3[Parachain(1000), PalletInstance(50), GeneralIndex(<u32>)]}` (all `is_sufficient=true`, owner 5Fk8, decimals 6).

| Asset | AH u32 id | People Location (SCALE hex) | min_balance (People) | symbol / name |
| --- | --- | --- | --- | --- |
| pUSD | `50000413` | `0x010300a10f04320576c8eb0b` | `10000` | `pUSD` / Digital Dollar |
| USDt | `1984` | `0x010300a10f043205011f` (GeneralIndex 1984) | `70000` | `USDt` / Tether USD |
| USDC | `1337` | `0x010300a10f043205e514` (GeneralIndex 1337) | `70000` | `USDC` / USD Coin |

- AH pUSD (`50000413`) is `is_sufficient=true`; PAS/pUSD pool `lpToken 14` funded. The digital-dollar (People pUSD) is **load-bearing** — the client hard-crashes at launch if People's pUSD asset/metadata is absent (do not remove it).
- Client RC (`chains_v2` `dev_build_android/ios/web`) People pUSD `assetId` = the para-**1000** Location hex above (was mistakenly para-1500 from the -next config; corrected 2026-07-15).

## Accounts

| Ref | SS58 | EVM (H160) | Role |
| --- | --- | --- | --- |
| DotNS deployer/owner | — | `0x8C78b53f2CEAF395fDA66152d7A5e6e7A79DB675` | DotNS suite owner |
| DotNS fee-payer | `5FEtRF3LqggrAw4rGUP8DTkFugaZmhXN7QZmJjV11PS9Tf9s` | — | revive fee-payer of the DotNS deployer |
| Products deployer | `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` | `0xf8d186c352e2ea0b9c02c211525a20ddcb8cd2dd` | apps/CDM/Bulletin/name deployer |
| Sudo | `13uYxsEfJL5FYbJ1E7cW85ihp5LckYTyZT6Bqpc7tS4NAArK` | — | root (all chains) |
| Attester | `5HECKTpBe95rgbptG812Gh61VH3pjDfhgtE6xq5mHvRSUSo3` | — | identity-backend attester |
| Attester proxy | `5EpzDod3yb8cHJ96PVWviYCDZUGGxf53fvmyfj7qgQ87BK67` | — | attester proxy signer |

## DotNS

> **Migrated to v0.6.0 on 2026-09-08 (block ~13152236).** Fresh CREATE3 set = the fork's canonical manifest
> `deployments/pcf-devnet/420420417.json` (factory deployer `0x70C9D7d8…5F1a`, nonce-0). **Owner of every
> proxy = `0x82612afF72effDc0E8771A22B9AAF72f6fa3545d`** (new DotNS owner; keystore `devnet-dotns-owner`).
> All 18 names re-minted to their holders with unchanged token ids, contenthash + text records replayed,
> every name bound to the new content resolver. The pre-v0.6.0 set (factory `0x264D…`, owner `0x8C78…`,
> registrar `0x7f0dF075…`) is **abandoned, not destroyed**; do not point anything at it.
> ✅ `dotnsGateway.dispatcherAddress` → `DotnsPopController` `0xB25510…c42b` (sudo, 2026-09-08). ⏳ Pending: the consumer cascade
> (`summit-deployer-skills/guides/DOTNS_UPGRADE_CASCADE.md`).

| Contract | Address |
| --- | --- |
| Create3Factory | `0x32B9dDD1bd1D721f3787C1FB1DC41CD3D40aAC7a` |
| DotnsContentResolver | `0x444578659848ba38D1825238f10B8D75522d278f` |
| DotnsCostModelRegistry | `0x1B05a078b8FEAeE1f9f74AE9edDaCe488B252843` |
| DotnsFlatPricing | `0xcFEba3bd01A35aadf143f13CA7bEA0e894fd8D42` |
| DotnsNameEscrow | `0xCbf524C2E8ebC43FDE09C9A02632A4Fe03290524` |
| DotnsNameWhitelist | `0xBE95E5d19357F34f3041E0e8C005EB7d8AdB2173` |
| DotnsPopController | `0xB25510B665ad82291bc1552E94005013a025c42b` |
| DotnsPopLens | `0x99355A606baEB903A4f76787d0fE8818Ae603a63` |
| DotnsPopResolver | `0xE841BaEaDac51d301BCb82162d3B10918b60D158` |
| DotnsProtocolRegistry | `0xB961db86815326d2f99F6B62f27f9Fc938117406` |
| DotnsRegistrar | `0x0E05e0E2576DDD1C339d360Aa634fE52CBa7Ee45` |
| DotnsRegistrarController | `0x77556F42DF5db7f89c2eCD00446041F16781011E` |
| DotnsRegistry | `0x38cf3dE5877a18157f4C1a4e067F84956F582b31` |
| DotnsResolver | `0x57c10bc51bC59B93b6F2C165C62daFa92C34A8a9` |
| DotnsReverseResolver | `0x992c7C87967897b0F9336de640d9f66A5af76f73` |
| LabelStoreBeacon | `0xE1A11b57c08C299930Cf1235299804dfe561Fa39` |
| Multicall3 | `0x55985d2Cfdac95DD828bd3Aa0e031602a07a9049` |
| PopRules | `0xB991Bc0C5Ff4B4c7f3634bfC74e0E20F74D59554` |
| StoreFactory | `0x59aAF46797A549455697B6f046B4dE16b92670fd` |
| UserStoreBeacon | `0xf496E2CcDFE29135Cf38261E1c5c528e25673029` |

## CDM

| Contract | Address |
| --- | --- |
| ContractRegistry (proxy) | `0x05662b3dbd5dd9f2ff92d67630477e84b0b37c1f` |
| ContractRegistry impl | `0xfb478ad4b07ad869ad796e90f5d73ae56c0a6ea0` |
| CREATE3 factory | `0x2cf8e16164d083701a04b4fbe73932a0139013d0` |
| ~~ContractRegistry (old)~~ | `0x59b0245778917af55224e5f8fb55f7f8d452619f` — superseded 2026-09-04, still serving reads |
| @polkadot/contexts | `0x65317D46e8F62682002F9A769F7Bd8d63f8100Ba` |
| @polkadot/profiles | `0xaFa90438a1cBEd95A1fbA380226b27226e36C71B` |
| @polkadot/threads | `0x9F8c47b542856ABDa30F665eE4c7071444E39f50` |
| @mock/reputation | `0xa92964b3D49953086D01124cE0508932519edaDD` |
| @mock/disputes | `0xC20a79f6F1459f04e330285F2Fd48e4447C0d9B7` |
| @polkadot/disputes (alias) | `0xC20a79f6F1459f04e330285F2Fd48e4447C0d9B7` |

> **Registry redeployed 2026-09-04.** The old registry `0x59b0…619f` traps with
> `Revive.ContractTrapped` when a brand-new name is appended to its name index
> (products-devnet-issues #10/#12) and has **no admin** (`getAdmin`/`getCode`/`isFrozen` all revert),
> so it could not be fixed with `setCode`. The replacement is an EIP-1967 proxy deployed through the
> CREATE3 factory, migrated with **69/69 names and 168/168 versions, every owner preserved** (verified
> by diffing full exports of both registries: 0 address/CID mismatches). `getAdmin()` = 5Fk8
> (`0xF8d186c3…CD2dD`), `isFrozen()` = false ⇒ future fixes are in-place `setCode` upgrades.
> **Every contract kept its address**, so the system-contract rows above are unchanged and consumer
> `cdm.json` files only need their `registry` field moved. The old registry is NOT frozen (it has no
> admin), so writes to it after the snapshot silently drift; `admin_import_contracts` rejects existing
> names, so a catch-up import of only the drifted names is safe to re-run.
>
> ctdt system-contract addresses above are the **live devnet** addresses read from the on-chain
> `ContractRegistry.getAddress(name)` (19 entries). An earlier revision of this table carried the
> Summit addresses by mistake; `getAddress` on-chain is the source of truth.
> `@polkadot/disputes` was added (via `publishLatest`, signer `0x8C78`) as an alias to `@mock/disputes` so the
> disputes-frontend (`disputes.dot`) resolves its contract — matching the Summit canonical/alias pair.

> **Platform read-origin mapping (2026-07-15):** product-sdk frontends (e.g. `contracts.dot`) do view calls
> with `QUERY_FALLBACK_ORIGIN` = the keyless `modlpy/reviv` pallet account (`13UVJyLnbVp997Az9G9HHf6aKVvawZAFMHRtv1HGjdzA76Zd`
> / prefix-42 `5EYCAe5i…`). On devnet this was unmapped → `Revive::AccountUnmapped`. Fixed by mapping it once via
> `Sudo.sudo_as(modlpy/reviv, Revive.map_account())` (sudo `13uYxsEfJL…`). Verified: `ReviveApi.call getContractCount = 19`.

### `@dotns/*` in the devnet ContractRegistry (re-registered for v0.6.0, 2026-09-08, signer 5Fk8)

| Package | Address | metadata CID |
| --- | --- | --- |
| `@dotns/registrar-controller` | `0x77556F42DF5db7f89c2eCD00446041F16781011E` | `bafk2bzaceaangaerusxky5iyvylqy2e7urvs6g5jwpiaccp5g527khuk3x4m2` |
| `@dotns/registrar` | `0x0E05e0E2576DDD1C339d360Aa634fE52CBa7Ee45` | `bafk2bzaceatcoscbirgo6x57baug5rapdaipydxebhrgw55ymsvjz7s2znzce` |
| `@dotns/registry` | `0x38cf3dE5877a18157f4C1a4e067F84956F582b31` | `bafk2bzaceazs27wj2xcs6shrmkq6kyrxlvztmnb4vvnsbk6jnc76n3vhs34ky` |
| `@dotns/pop-rules` | `0xB991Bc0C5Ff4B4c7f3634bfC74e0E20F74D59554` | `bafk2bzacedd7kxpjodqed7fwjnck35ai3sz5uv6c7rty6i4uo7qdt3oeqyphe` |
| `@dotns/resolver` | `0x57c10bc51bC59B93b6F2C165C62daFa92C34A8a9` | `bafk2bzacecelxy7klp2elrpslxqwtl4fqsyg5ev7mkebudxpw5sjz4stdr2ki` |
| `@dotns/reverse-resolver` | `0x992c7C87967897b0F9336de640d9f66A5af76f73` | `bafk2bzaceaw76qleakn5rosowt4barlftgxkmaumdidfz6qmarqiieoxe6hgc` |
| `@dotns/content-resolver` | `0x444578659848ba38D1825238f10B8D75522d278f` | `bafk2bzaced4ffeu6g76y37wnmz273dvp74leqisaqhbvoxrbkaftxrhd6akww` |
| `@dotns/store-factory` | `0x59aAF46797A549455697B6f046B4dE16b92670fd` | `bafk2bzacebcrlp2jhpchsbujoewqyil7vqcxkqwzajlgsotkracn5ntbeypmw` |
| `@dotns/multicall3` | `0x55985d2Cfdac95DD828bd3Aa0e031602a07a9049` | `bafk2bzacedzz47wy4xhjk3wksgqe75rtrnwedarmr7kaggy7hgxy3eq6xvfyy` |


## Attestation

| Contract | Address |
| --- | --- |
| SchemaRegistry | `0xf8fccb815aabb57fb0210c686a923406ac4ef99d` |
| AttestationService | `0x1c8aeb620106dc05c74db5667e16042af6893352` |

> **2026-09-09 — `executable` records restored.** The v0.6.0 migration replayed subname contenthashes but not
> the `executable` text record, so every migrated manifest product failed to open in the clients ("Can't find
> product"). 18 PCF-owned subnames were replayed by 5Fk8; the 83 community-owned ones are written back with
> `Sudo.sudo_as(owner, Revive.call(setText…))` so each write carries the owner's origin (no redeploys). Audit +
> plans: `summit-deployer-skills/scripts/dotns-v060-migration/snapshots/*executable*-20260909.json`.

## Browse

| Contract | Address |
| --- | --- |
| Publisher | `0xaab42efbe8ea4d4228c3a11e973f94c17b9a0f2c` |
| RecipientAndAttesterIndexResolver | `0xe61622e6b55ddacbe1d076382903fd02a7709ab6` |
| TrustedAttesterIndexResolver | `0x075a4054e3b580540d2b908a7e339c7decd414dd` |

Attestation schemas in SchemaRegistry: `SCHEMA_ID`=1 (`bool like`), `COMPLIANCE_SCHEMA_ID`=2.

## Playground

| Contract | CDM name | Address |
| --- | --- | --- |
| playground-registry | `@w3s/playground-registry` | `0xdba08504f14fb46dca59da5e75e55c49b08c1ecc` |

## t3rminal

Point-of-sale terminal; permissionless writes, no admin. Deployer: **5Fk8** (native `Revive.instantiate_with_code`, prebuilt PVM blob).

| Contract | Address |
| --- | --- |
| T3rminalBulletinIndex | `0xf94229a0bbbb1dac19773c0086beff7ba930b1fc` |

## Apps

All `.dot` names below are owned by the products deployer **5Fk8** (`0xf8d1…d2dd`) on the DotnsRegistrar (v0.6.0 `0x0E05e0E2…`; legacy `0x7f0dF075…`), have their contenthash set to the listed CID, are listed in the browse Publisher (`0xaab42efb…`, owner 5Fk8 → owner-bypass), and resolve at `https://<label>.dev-dot.li`.

| App | .dot | Contracts | Bulletin CID |
| --- | --- | --- | --- |
| game-results-webview | `game-results-webview.dot` · browse-listed | app-only (webview) | `bafybeiffbmvler5aavegpqizlrwksobt6mmo5gw6ubvw3njxxnhi2hqnyq` |
| pocket-collectibles-webview | `collectibles-webview.dot` · browse-**unlisted** | app-only (webview) | `bafybeifnyl6tcy52oe2hhncoj36bgcnlq56i7sjuw3udprvprnlaqetl64` |
| simple-survey | `survey.dot` · browse-listed | `@polkadot/surveys` `0x4a641d1530bb44bed8afa0e00a004eba106d02c0` | `bafybeie3sxni3t47ztcitjnggfiaiqpoquzsj6u2um4pucgrm2lwz3ffuy` |
| feedback-board | `feedback.dot` · browse-listed | `@polkadot/feedback` `0x70b10d0361aecfa48069795f19d35eb212807ea4` | `bafybeigg3ib6dqlbufsuzkkm4unolc7ncesgy7dg2yuxkixhrflgx3kjea` |
| Rock-Paper-Scissors | `rock-paper-scissors.dot` · browse-listed (+ alias `rps-game.dot` · browse-**unlisted**) | `@rps/leaderboard` `0x3d05ec0916417c5e08a134c632745a9ca985dd5f` | `bafybeiebf7ka6wqsg2sovgfninm2ohrmgytyxlajofsyqmhbqwqocpvbkm` |
| browse (directory app) | `browse.dot` · browse-listed | Publisher `0xaab42efbe8ea4d4228c3a11e973f94c17b9a0f2c` (see Browse section) | `bafybeiftqsjcuoiacyx47kaokt2ioti57bsgzj47ozb446bamw3dxa4sly` |
| polkadot-app-docs | `docs.dot` · browse-listed | docs site (MkDocs), published with pad in manifest mode (devnet icon, `app.docs.dot` executable) | `bafybeiduemwopizurfce2mtbxyu2dohbifqpcwqot53eii7ogwwhptaezq` |
| browse dashboard widget | `widget.browse.dot` (executable-manifest subname; desktop default card) | — | `bafybeic4eit2s3dq6hsvfpgijtrxdnjhzohuho5kuygteut6kj6szbztoa` |
| playground-tutorial | `playground-tutorial.dot` · browse-listed | app-only (no contract) | `bafybeig7curj7fibyinp3o7lbsengogzb6blgwdsfi2rmehtyvrq3426cy` |
| playground-app-template | `playground-template.dot` · browse-listed | app-only (no contract) | `bafybeiaucj454qmrirzfndefyhss4xwxhyhhqrjr2clc7ghx67g2iwfaci` |
| w3spay-admin | `w3spayadmin.dot` · browse-**unlisted** | W3SPayRegistry `0x950c0243cb112abe1112924f1fcab04fb03ae670` (owner 0x8C78) | `bafybeibkxhzzqce4ie6avgrdkxrgdbc7tg5hipeh5nkr5f7c4yt624v7ri` |
| w3spay | `w3spaycheckout.dot` · browse-listed | consumes W3SPayRegistry above | `bafybeiei4yy27lieiz7mxktjxjxvqad7ybh3sjxere7oars5kq2zfimi64` |
| w3s-payment-processor | `w3spayprocessor.dot` · browse-listed | reads W3SPayRegistry above | `bafybeiczlggzlgh5l7ryrfmsqh24x3kv6ws6c7tkzayuj7ygqssqpup5xi` |
| mercado-community | `mercado.dot` · browse-listed | MercadoCore `0x919517341d0efC3eAc11B437DcbC6A71C453789A` · Ratings `0x0226c327b47f34afdce5c123a9cdecce553f9d42` · RestaurantMeta `0x6e49841681d9a00cf064fcf0a7852d34aed11328` · Disputes `0xa81ca2c7b1fff367830991a180a697afb5005aad` · MockMobRule `0x1e3f11204f1d20bb35e3407171cde48b393c518f` · Matchmakers `0xbd77d41baff68e6e0e439848df2c466937ecc47b` (owner 0x8C78) | `bafybeiar5pl6d75h53pcjew6fwsvkcwddgjm6uogtyqsnbodclugp4tklu` |
| localdot-community | `localmarket.dot` · browse-listed | P2PMarket `0x4161d8dbe61db1a68dfc570c1cbfd2f7c8e44749` · ZKPassportRegistry `0xfd87d5397eb9c16c654dbe3557ed8b4e3b543568` (ownerless) | `bafybeihgvqefulonreeby4vadkqazg6zigp6t5rxbehydjivjuy4ijppjy` |
| festival (attendee) | `web3summit.dot` · browse-listed | Festival `0xAc36c0173eA817c63dFEA1eA796BFD4506d586d2` · POAP `0x0234dBE0C2584729BE58434fd69F9B251F92c13e` · SessionPOAP `0xc411EA624e8f8f0ec2a2145f79e88b80e0269289` · Multicall3 `0x24F2cCe5598c733415D4cb3d23494C7e589d05bA` (owner 0x8C78) | `bafybeiasb4acl2n4hcz2oun5yy4m7w6w2alfqvdn6aqdx2afjbcuk75deu` |
| festival (admin) | `web3summit-admin.dot` · browse-**unlisted** | (same contracts as attendee) | `bafybeiarzveo5eewoacvxj6o2rzewixwquvgh4jxfncmanaaaepgblkd4e` |
| dotns UI | `dotns.dot` · browse-listed | DotNS web UI (consumes the DotNS suite above) | `bafybeieruzrm7gcc7djsun37lcd7kpdn3l7ooic4kuhfuvijqjl22uzh4u` |
| CDM / contracts UI | `contracts.dot` · browse-listed | the **CDM frontend** (`contract-dependency-manager/src/apps/frontend`, `@parity/cdm-frontend`); reads CDM `ContractRegistry` `0x05662b3dbd5dd9f2ff92d67630477e84b0b37c1f` (ctdt in CDM section) | `bafybeicyodhvzaiqmqptoqou7pyoylmbgfqvvhin6dbyattpn27dd6zjym` |
| disputes UI | `disputes.dot` · browse-listed | the disputes-frontend (`contract-developer-tools/src/apps/disputes-frontend`); reads `@polkadot/disputes` (alias `0xC20a79f6…` in CDM section) | `bafybeih5m72nwsxif5ybxzitnwwskloka55nxjwzbw5knubl52ygehnj4i` |
| t3rminal | `t3rminal.dot` · browse-**unlisted** (+ alias `terminal.dot` · browse-listed) | T3rminalBulletinIndex `0xf94229a0bbbb1dac19773c0086beff7ba930b1fc` | t3rminal `bafybeihirpzqnxlmmpinag247dnbokqmprvzopzi7byzs6ypbkfpeioxuu` · terminal `bafybeidggmmk2bxby5tk7qpz6t3pqrg77leknewww77kqjgj2i6dl7amii` |
| playground | `playground.dot` · browse-listed | reads `@w3s/playground-registry` `0xdba08504…` (Playground section); frontend built via **BYOD** devnet SDK descriptors (PCF-scoped `product-sdk-descriptors` + `createChainClient`/cloud-storage explicit-network — bypasses the missing `@parity` `devnet` preset) | `bafybeidnq6jecajgtelnn2rey6igkzf6fk7qpr25rlcnfig2tchu3oc5x4` |
| playground constellation (kiosk) | `constellation.dot` · browse-listed | read-only kiosk over `@w3s/playground-registry` `0xdba08504…`; already on the PCF-scoped SDK (has devnet), unblocked with a **vite alias** mapping the stale `@parity/{result,product-sdk-errors,product-sdk-host,product-sdk-descriptors}` dist imports → PCF scope | `bafybeibl4mtarljiernx7mem5xzhrjfsexziq4sdwnmdy2lmppumd35g2m` |
| hello-dot (static demo page) | **`hello.dot`** · browse-listed · ⚠️ **governance-reserved label** (see note below) | app-only (no contract) | `bafybeienblwb3p24mv2jsnsjgkit2a6nhghfovwwykkmp4nzrtnrrtd34i` (prev `bafybeicnjpo52g2uejim4ephteqwcnywqvpeqyqc63t7cqr6vhyhf3mkgi`) |

> **`hello.dot` — the first governance-reserved label bound to content.** Source repo `~/Projects/PCF/hello-dot`
> (a hand-authored single-page site; no contract, no framework). DotNS classifies base length ≤5 chars as
> **Reserved for governance**, 6–8 as PoP-Full, ≥9 as open — so `hello` (5) cannot go through the ordinary path,
> and `polkadot-app-deploy` contains **no `registerReserved` code path at all** (verified: zero occurrences), meaning
> relaxing its client guard alone would still revert on-chain. Two-step procedure actually used:
> 1. **Mint** via the dotns CLI governance path — `dotns register domain -n hello --governance --env devnet`
>    (`registerReserved`, whitelist-gated, price 0; **5Fk8 is whitelisted** on `DotnsRegistrarController 0x45fDEa4A…`,
>    `0x8C78` is not but is controller-owner). Commit-reveal, ownerOf verified = `0xF8d186c3…D2dD`.
> 2. **Bind content** with `PAD_ALLOW_RESERVED=1` + `polkadot-app-deploy … --env devnet --js-merkle --publish`.
>    The env var skips only the client-side Reserved classification at two sites (`validateDomainLabel`,
>    `_preflightInternal`); because the name already exists the tool logs `Already owned` and never calls
>    `register()`, so the reverting path is never reached. ⚠️ **That bypass is still only an UNCOMMITTED edit in the
>    `polkadot-app-deploy` fork** (`src/dotns.ts`, alongside a modified `assets/environments.json`) — it is in **no**
>    published build (0.13.1 has zero occurrences), so this deploy ran from a locally patched install. Committing +
>    releasing it is an open item; until then the procedure is not reproducible from npm.
>
> Full metadata landed (this is what a raw `dotns bulletin upload` cannot do): `manifest` text record with
> displayName "Hello Dot" + description + icon CID `bafk2bzacederugkk5q7we7te3zo3refclzs5ibxsvkkjuwvk6leo6norzpvys`
> (the `devnet` variant from `polkadot-app-brand-assets` — white tile = test network, `DEV` label), plus subname
> `app.hello.dot` with its own contenthash and `executable` record. Browse `isPublished` = true, `publishedCount` 17 → **20**.
> ⚠️ Verification note: `curl https://hello.dev-dot.li` returns the **dotli host-loader shell**, byte-identical to
> `survey.dev-dot.li` and every other app — dotli resolves the name client-side into a sandboxed iframe, so the
> gateway response proves nothing. Verify at the gateway **CID** (blob contains the page markers) and by decoding
> the on-chain contenthash (`0xe301‖01701220…` → the CID above); both confirmed byte-exact.
>
> **Content refresh — new CID `bafybeienblwb3p24mv2jsnsjgkit2a6nhghfovwwykkmp4nzrtnrrtd34i`.** Page CSS only
> (`body` padding `2rem` → `5rem 2rem 2rem`, extra headroom under the dotli host chrome); no manifest/icon change,
> same `--env devnet --js-merkle --publish` step 2 with `PAD_ALLOW_RESERVED=1`. Incremental deploy recorded
> `previous_contenthash` = the old CID. Both **`hello`** and the **`app.hello`** subname now resolve to the new CID
> (`contenthash` = `0xe301017012208d0aec1dbf5c657499364932913d03cd398e5756d6c294c7f1b98cdb18cc7be2`, decodes exactly);
> `manifest` + `executable` text records re-verified unchanged.
> ⚠️ Two operational gotchas hit while re-deploying: the fork's `npm run build` fails **anywhere under `$HOME`**
> (orphan `~/.pnp.cjs` hijacks esbuild resolution — phantom `Could not resolve "@polkadot-api/utils"`), so the CLI
> had to be built from a copy under `/tmp`; and the register's **ETH-RPC `paseo-assethub-rpc.laissez-faire.trade`
> was down**, so `cast` verification is unavailable — read `DotNS.getContenthash()` over the substrate RPC instead
> (note it appends `.dot` itself: pass `hello`, not `hello.dot`, or you namehash `hello.dot.dot` and get `0x`).

> **Session 2026-07-15 additions:** `dotns` / `contracts` / `t3rminal` / `terminal` names registered to 5Fk8 (t3rminal/terminal via owner-`registerReserved` from `0x8C78`; the rest via the CLI); content bound + verified on-chain, all four browse-published then trimmed per product decision (see below).
> - **contracts.dot corrected:** first mistakenly served the **disputes-frontend** (`contract-developer-tools`); redeployed with the real **CDM frontend** (CID above). The disputes-frontend belongs at `disputes.dot` (pending).
> - **Browse unlisted (product decision):** `t3rminal`, `web3summit-admin`, `rps-game` removed via `Publisher.unpublish`. Net `publishedCount` = **17** (was 16; +contracts/dotns/terminal, −the three). Kept: `terminal`, `web3summit`, `rock-paper-scissors`.
> - **`playground.dot` ✅ + `constellation.dot` ✅ deployed** (both were "deferred/dropped"; unblocked without upstream — playground via a BYOD SDK refactor, constellation via a vite alias for stale `@parity/*` dist imports; see the Apps rows + `guides/UPSTREAM_DEVNET_READINESS_AUDIT.md`).
> - **Collectibles ✅ DONE:** all **522** artwork blocks re-pinned to devnet Bulletin as the **exact** raw(0x55)+blake2b-256(0xb220) CIDs via `TransactionStorage.store_with_cid_config` (cid_map unchanged). **BOTH** webviews use the identical 522-CID set (`game-results-webview` + `pocket-collectibles-webview`); both resolvers repointed from `summit-ipfs.polkadot.io` → `devnet-ipfs.api.polkadotcommunity.foundation/ipfs` and redeployed (new CIDs in the Apps table above).
> - **`disputes.dot`** deployed (disputes-frontend) + `@polkadot/disputes` alias registered; **`contracts.dot` read-origin** (`modlpy/reviv`) mapped via `Sudo.sudo_as` (see CDM section notes).

> **festival note:** both SPAs were deployed via a raw Bulletin upload of the built `out/` (index.html served as a plain app), so the attendee's **announcements-chat _worker_ modality is not host-registered** — `packages/attendee/polkadot-app-deploy.config.mjs` declares an `app` + a `worker` executable, but registering the worker as a dotli host modality requires a `polkadot-app-deploy` manifest run (worker bundle is present in the content at `out/worker/index.js`, just not wired). Enable it by re-deploying the attendee via the `deploy-devnet.yml` path (polkadot-app-deploy processes the config into a manifest; the DotNS bind still needs the 5Fk8 pallet-revive path since 5Fk8 has no eth key).
