# Paseo Next — PCF Deployments (re-home register)

On-chain addresses, deployers, and `.dot` names for the PCF product suite redeployed onto the
Parity-operated **Paseo Next** testnet chains (interim target after Summit's decommission).
The Summit register ([README.md](./README.md)) remains as the record of the decommissioned network.

All contract addresses below were cross-checked live against `https://eth-rpc-paseo-next.polkadot.io`
(code present at every address; `owner()` and CDM-registry `getAddress` spot-checks pass).

## Network

| Para | Chain | Genesis hash | RPC | Role |
| --- | --- | --- | --- | --- |
| **1500** | Paseo Asset Hub Next | `0xbf0488dbe9daa1de1c08c5f743e26fdc2a4ecd74cf87dd1b4b1eeb99ae4ef19f` | `wss://paseo-asset-hub-next-rpc.polkadot.io` | `pallet-revive` (contracts) |
| **1501** | Paseo Bulletin Next | `0x8cfe6717dc4becfda2e13c488a1e2061ff2dfee96e7d031157f72d36716c0a22` | `wss://paseo-bulletin-next-rpc.polkadot.io` | content store; IPFS gateway `https://paseo-bulletin-next-ipfs.polkadot.io/ipfs` |
| **1502** | Paseo People Next | `0xc5af1826b31493f08b7e2a823842f98575b806a784126f28da9608c68665afa5` | `wss://paseo-people-next-system-rpc.polkadot.io` | people / proof-of-ink |
| (relay) | Paseo | `0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f` | — | parent relay |

- Native token **PAS**, 10 decimals. SS58 prefix `0` on 1500/1501 (1502 reports `42` — same pubkeys, different encoding).
- eth-rpc for 1500: `https://eth-rpc-paseo-next.polkadot.io`.
- ⚠️ EVM chain id is `420420417` (`0x190f1b41`) — the **SAME** value Summit used. Never distinguish networks by chain id; use the genesis hash.
- ⚠️ W3S caveat: `AuthorizeValueTransfer` on 1500/1502 validates against **Parity's** bundled pubkey, so a PCF-baked `W3S_AUTH_KEY` is not honored — sponsored fee-less transfers degrade to user-pays (accepted for a dev testnet).
- Bulletin uploads are authorization-gated (Parity sudo/authorizer); the deployer holds a 10 GiB / 1M-tx grant with a ~14-day retention window (recurring renewal, same model as Summit).

## Key accounts

| Ref | SS58 | EVM (H160) | Role |
| --- | --- | --- | --- |
| **Deployer / signer** | `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` | `0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD` (mapped) | Reused Summit signer (decided over a fresh key — already funded/mapped on 1500 + Bulletin-authorized on 1501). Deployer of CDM registry, ctdt, Publisher, playground registry, attestation suite, W3SPayRegistry and app contracts; Bulletin uploader; `.dot` name owner for most apps; whitelisted on DotnsRegistrarController (CI name registration); **browse trusted attester** (one-signer model — Summit used a dedicated attester account) |
| **DotNS deployer** | — (raw secp256k1 EVM key); substrate fallback `14BBZaJQhTxKcU5NE7S8McaQmJaDU15WBuJFU2UMZUTfdwoB` (≡ `5FEtRF3LqggrAw4rGUP8DTkFugaZmhXN7QZmJjV11PS9Tf9s` at prefix 42) | `0x8C78b53f2CEAF395fDA66152d7A5e6e7A79DB675` | DotNS contract-suite owner (CREATE3, nonce-0 on this chain → reproduces the Summit address set); `registerReserved` owner-override signer for short / PoP-gated names; Mercado contracts deployer/owner |
| **DotNS whitelister** | `5GWa6ajKCE8SBvRgYKtQC4MJqAUfKaKCL15onWcrBop4yZfW` | `0xc27e5f15378ea34bf3bdbc82f7728a270ae3f14a` (mapped) | DotnsRegistrarController whitelist operator |
| **Identity-backend attester (real)** | `5HKa1PwrXak7jQX1ukx3t2YQsQfsw2jinKpBYrNpWUKz4kEh` | — | ATTESTER_PUBLIC_KEY; funded on 1500 + 1502; **on-chain provisioning (proxies + attestation allowances + PoI invites) pending a Parity sudo request** |
| **Identity-backend attester proxy (signer)** | `5GjUuGpacCspUJjnDdNVpGLn1JQk9QvCXGhtKiLEpMRcHEHA` | — | ATTESTER_PROXY key (Any-proxy of 5HKa once provisioned); funded; pending same sudo request |
| **flow-funder reserver** | `5FH9DEoT2Mr7EwMiXUMH4FzNzQdd5ryh4WD5EKk5XodatCvd` | — | flow-funder / inviter-pool signer (Any-proxy of 5HKa once provisioned); funded; pending same sudo request |

## DotNS (17 contracts)

Owner: **DotNS deployer** (`0x8C78b53f…` — `owner()` verified on-chain). Deployed via the `dotns`
repo 5-stage pipeline; manifest = `dotns/deployments/paseo-next-asset-hub/420420417.json`.
The address set equals Summit's by CREATE3 construction (chain-id-excluded salts, same deployer at nonce 0).

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

## Platform contracts

| Contract | Address | Notes |
| --- | --- | --- |
| CDM ContractRegistry | `0x59b0245778917af55224e5f8fb55f7f8d452619f` | CREATE2 salt `@cdm/registry.1`, signer 5Fk8; address differs from Summit's (newer initcode); baked into `cdm-env` (`PASEO_NEXT_REGISTRY_ADDRESS`) |
| Browse Publisher | `0x234e434e66f246def2207558dcdb0585d2de9fdc` | v2.1.0; `owner()` = 5Fk8-mapped ✓; `registrar()` = PCF DotnsRegistrar ✓ |
| Playground registry (`@w3s/playground-registry`) | `0xdba08504f14fb46dca59da5e75e55c49b08c1ecc` | registered in the PCF CDM registry ✓ |
| Attestation SchemaRegistry | `0x358e11d99749a81fc02eb20d8e4732619caea0a0` | attestation-protocol repo; record in its `deployments/paseo-next` |
| AttestationService | `0x110877cc32b31ea6a11c60b2e4d2c37cbb97bb3e` | schemas: `like` = 1, `compliant` = 2 |
| Browse index resolver | `0x4a6c08e97ace2d3e3ff9d4a877c36a67ae307b1a` | |
| Browse trusted resolver | `0x6a1421a1f0f1535e402d8655ea253e21dc5d9894` | trusted attester = 5Fk8-mapped `0xF8d186c3…` |
| W3SPayRegistry | `0x13a885e6c402cc293ae7185dcacbd824d109aee6` | `owner()` = 5Fk8-mapped ✓ (deployed via w3spay-admin scripts) |

### ctdt system contracts (registered in the PCF CDM registry ✓)

| Package | Address |
| --- | --- |
| `@polkadot/contexts` | `0x65317d46e8f62682002f9a769f7bd8d63f8100ba` |
| `@polkadot/profiles` | `0xafa90438a1cbed95a1fba380226b27226e36c71b` |
| `@polkadot/threads` | `0x9f8c47b542856abda30f665ee4c7071444e39f50` |
| `@mock/reputation` | `0xa92964b3d49953086d01124ce0508932519edadd` |
| `@mock/disputes` | `0xc20a79f6f1459f04e330285f2fd48e4447c0d9b7` |

### `@dotns/*` CDM registrations (9)

Registered in the PCF CDM registry (spot-checked `@dotns/registry` → DotnsRegistry ✓):
`@dotns/registry`, `@dotns/registrar`, `@dotns/registrar-controller`, `@dotns/resolver`,
`@dotns/reverse-resolver`, `@dotns/content-resolver`, `@dotns/pop-rules`, `@dotns/store-factory`,
`@dotns/multicall3`.

## App contracts

| Contract | Address | Repo / owner |
| --- | --- | --- |
| `@rps/leaderboard` | `0x3d05ec0916417c5e08a134c632745a9ca985dd5f` | Rock-Paper-Scissors; cdm-deployed + registered ✓ |
| `@polkadot/feedback` | `0x70b10d0361aecfa48069795f19d35eb212807ea4` | feedback-board; registered ✓ |
| `@polkadot/surveys` | `0x4a641d1530bb44bed8afa0e00a004eba106d02c0` | simple-survey; registered ✓ |
| MercadoCore | `0x24f2cce5598c733415d4cb3d23494c7e589d05ba` | mercado-community (owner `0x8C78b53f…`, raw-RPC deploy) |
| MercadoRatings | `0x569ee3092a64fdeb114c1cf3414817b31d3bc0bd` | mercado-community |
| MercadoMeta | `0x45948d57f413e33de6a14fcd46a77caf1a2bd3a5` | mercado-community |
| MercadoDisputes | `0x3534046ef8746d35d91935375bc31e4a25ec5e2a` | mercado-community |
| MockMobRule | `0x287375a3bea64533388d7b99dd60310cdcd2248c` | mercado-community |
| MercadoMatchmakers | `0x90a37a7e865265922ac9206a74f1c5df54117394` | mercado-community |
| P2PMarket | `0xaea7a0dc7ea63dd06a5fd5420690eccb3429a0f4` | localdot-community |
| Festival | `0x066a4d91de6b8083b91ee7cd4969ca2c1660fc08` | festival |
| Festival POAP | `0x5062ecd7c4d15f8d21f401ddab7f020720cee830` | festival |
| SubEventPOAP | `0x27f6a8222d6c889fe38b8b16a89f0896f658f2ae` | festival |
| Multicall (festival) | `0xf661c6129185417682d810f110e0d04dfeb44bc6` | festival |
| BulletinIndex | `0xa8fd6113c0b35f34a68a6da11eb7e98b07420e92` | t3rminal |

## Deployed `.dot` names

⚠️ **CIDs rotate on every redeploy** — the values below are the ones recorded at first paseo-next
deploy (prefixes from the program log). The truth is each repo CI's "Verified on-chain" output
(or a live `DotnsContentResolver` contenthash read).

| Name | Repo | CID at first deploy |
| --- | --- | --- |
| `browse.dot` | browse | `bafybeiaz6h75w…` |
| `playground.dot` | playground-app-community | `bafybeid3aah…` |
| `playground-template.dot` | playground-app-template | (see CI) |
| `playground-tutorial.dot` | playground-tutorial | (see CI) |
| `constellation.dot` | playground-constellation (no CI — deployed locally via `polkadot-app-deploy`) | `bafybeih3q2ytdx…` |
| `rock-paper-scissors.dot` | Rock-Paper-Scissors | (see CI) |
| `feedback.dot` | feedback-board (short name via `registerReserved`) | (see CI) |
| `survey.dot` | simple-survey (pre-registered) | (see CI) |
| `w3spay.dot` | w3spay (short name pre-registered) | (see CI) |
| `w3spayprocessor.dot` | w3s-payment-processor | (see CI) |
| `mercado.dot` | mercado-community | `bafybeiawxyzink…` |
| `localmarket.dot` | localdot-community | `bafybeihexx6fiw…` |
| `t3rminal.dot` + `terminal.dot` (alias) | t3rminal (both pre-registered) | (see CI) |
| `web3summit.dot` | festival — attendee (listed in Publisher ✓) | `bafybeiahsqqwpm…` |
| `web3summit-admin.dot` | festival — admin | (see CI) |
| `stg.web3summit.dot`, `stg.web3summit-admin.dot` | festival — staging legs (push-to-main, unpublished) | (see CI) |
| `game-results-webview.dot` | game-results-webview (**canonical** — RC-aligned) | content-set to the pilot CID `bafybeiaejiid7…` |
| `game-webview.dot` | game-results-webview (**frozen alias** — pilot name, superseded by `game-results-webview.dot` per RC alignment; deployments align to the RC, not vice versa) | `bafybeiaejiid7…` |
| `collectibles-webview.dot` | pocket-collectibles-webview | (see CI) |
| `dotns.dot` | dotns-sdk UI (deployed via the `dotns` CLI — `polkadot-app-deploy` refuses ≤5-char labels client-side) | `bafybeid5zpphom…` |
| `dotli-starter.dot` | dotli-starter | (see CI) |

Name registration mechanics: 5Fk8 is whitelisted on DotnsRegistrarController, so CI registers
ordinary names directly; short (≤8-char, PoP-gated) names go through the `registerReserved`
owner-override signed by the DotNS deployer key.

## Services

| Service | Where | Status |
| --- | --- | --- |
| identity-backend | GKE / ArgoCD (`polkadot-app` ns) — the existing Summit instance **reconfigured** (not a second deployment) | LIVE: endpoints repointed to 1502/1500, unparked to 3 replicas, API healthy. On-chain provisioning of the attester set (proxies + People-lite / DotnsGateway attestation allowances + PoI invites on 1502+1500) **pending a Parity sudo request** (concrete call data drafted) |
| flow-funder | GKE / ArgoCD (`flow-funder` ns) | Repointed to paseo-next; signer 5FH9; awaiting the same sudo provisioning |
| dot.li gateway | VM `pcf-summit-dotli` (`35.198.77.216`) — the k8s migration is parked, the VM is live | Rebuilt with `VITE_NETWORKS=paseo-next` (PCF registry/resolver); serves `dot.li` + `*.dot.li`; network selector shows only "Paseo Next (PCF)" |

The client-tier `.dev` Remote Config (`dev_build_*` conditions) points at this suite:
`dot_ns_config` → the DotNS registry/content-resolver above, `identity_backend_url` → the live
identity-backend, webview/browse URLs → `*.dot.li` via the gateway.

## Open items

- Attester-set on-chain provisioning on 1502/1500 (Parity sudo request outstanding).
- `w3spayadmin.dot` UI not redeployed on paseo-next (registry contract is live; admin UI pending).
- localdot ZKPassportRegistry not redeployed (optional flow; config still Summit-era stale).
- Playground grid listings: several apps deployed without `--playground` publish — re-dispatch later.
- dotli k8s migration (Argo CD rollout) parked; VM remains the serving path.
