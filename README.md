# Summit Network — Deployments

On-chain addresses, deployers, and domains for everything deployed to the **Summit** network.

## Network

<!-- GEN:network -->
| Field | Value |
| --- | --- |
| Network | Summit Asset Hub (PolkaVM / `pallet-revive`) |
| EVM chain id | `420420417` (`0x190f1b41`) |
| Native token | SUM, 10 decimals |
| SS58 prefix | `0` |
| Asset Hub RPC | `wss://summit-asset-hub-rpc.polkadot.io` |
<!-- /GEN:network -->

## Key accounts

<!-- GEN:accounts -->
| Ref | SS58 | EVM (H160) | Role |
| --- | --- | --- | --- |
| **DotNS deployer** | — (raw secp256k1 EVM key) | `0x8c78b53f2ceaf395fda66152d7a5e6e7a79db675` | DotNS contract suite owner (CREATE3); registerReserved .dot name registration; Mercado contracts owner |
| **DotNS whitelister** | `5GWa6ajKCE8SBvRgYKtQC4MJqAUfKaKCL15onWcrBop4yZfW` | — | DotnsRegistrarController whitelist operator |
| **CDM admin** | `5Hn6AMFkiAyGFgWCShqAdXFax87uknHa5YXCZmiabFidohQy` | `0xc53bb1eeac9b01bbd8161f3e9af1b0626e52a7e7` | CDM ContractRegistry owner/admin; Festival deployer/admin; t3rminal deployer; W3SPayRegistry deployer (super-admin) |
| **W3S publisher** | `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` | `0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD` | Bulletin uploader for most apps; .dot name owner for most apps; cdm deploy signer; Playground / Browse / LocalDOT / Survey / RPS / Feedback contract deployer |
| **DotNS UI owner** | `14M6Yc9i8dg6QLM2u1yd3jaFM2cd3NNvyKznfBaS2q3cNdKy` | `0x7e0e0a5a111aa15b0c1e4bac776884e263fa6b13` | dotns.dot name owner; read/view-call origin in tooling |
| **Browse trusted attester** | `5HECKTpBe95rgbptG812Gh61VH3pjDfhgtE6xq5mHvRSUSo3` | `0xeB686805D91dB3637258d0d21DefC06d0dA3a8C9` | trusted attester recognized by Browse TrustedAttesterIndexResolver |
| **Playground read origin** | `5DXpwDcFif9SzDX3GcqhW6igXhiCLpHrSRiJCBTwFfC4po9C` | — | read origin for Playground SPA CDM reads |
| **Constellation read origin** | `5FHxLwXdYvyQAsuH9RKeF7LyLXJaA3NbXjPZAbq13hZMcKRN` | `0x534507665bce7715a2894dec797e17e337a3d2e6` | read origin for Constellation kiosk SPA CDM reads |
| **Identity backend attester (real account)** | `5HKa1PwrXak7jQX1ukx3t2YQsQfsw2jinKpBYrNpWUKz4kEh` | — | the REAL attester identity (ATTESTER_PUBLIC_KEY) for identity-backend; holds DotnsGateway AttestationAllowance on Asset Hub (1,000,000) + People-lite attestation allowance; attests/reservations run as this account via Proxy.proxy from its delegates |
| **Identity backend attester proxy (signer)** | `5GjUuGpacCspUJjnDdNVpGLn1JQk9QvCXGhtKiLEpMRcHEHA` | — | identity-backend's signing key (ATTESTER_PROXY_PRIVATE_KEY); an Any-proxy of 5HKa on People + Asset Hub; signs Proxy.proxy(real=5HKa) for peopleLite.attest and dotnsGateway.reserve_name |
| **flow-funder reserver** | `5FH9DEoT2Mr7EwMiXUMH4FzNzQdd5ryh4WD5EKk5XodatCvd` | — | flow-funder's signing key: an Any-proxy of 5HKa on Asset Hub; reserves .dot names via Proxy.proxy(real=5HKa, dotnsGateway.reserve_name); also the DIM invitation-ticket pool signer on People (INVITER_POOL_PRIVATE_KEY) |
<!-- /GEN:accounts -->

## DotNS

ENS-style name service. Owner: **DotNS deployer**. Source: [dotns](https://github.com/Polkadot-Community-Foundation/dotns) · SDK/CLI: [dotns-sdk](https://github.com/Polkadot-Community-Foundation/dotns-sdk).

<!-- GEN:contracts:dotns -->
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
<!-- /GEN:contracts:dotns -->

## CDM — Contract Dependency Manager

Shared `ContractRegistry` + system contracts. Admin: **CDM admin**. Sources: [contract-dependency-manager](https://github.com/Polkadot-Community-Foundation/contract-dependency-manager) · [contract-developer-tools](https://github.com/Polkadot-Community-Foundation/contract-developer-tools).

<!-- GEN:contracts:cdm -->
| Contract | Package | Address |
| --- | --- | --- |
| ContractRegistry | `@polkadot/contract-registry` | `0xa5747e60ae27f93e92019e4021abfc4957050141` |
| Contexts | `@polkadot/contexts` | `0x9B935075094D7176Afc7e33C5B183109B86B1b6A` |
| Disputes | `@polkadot/disputes` | `0x3671Fe6Ebdd5E2FFCE2EbbD499972900390bdD64` |
| Profiles | `@polkadot/profiles` | `0x99dAFFC69479297C30815e3a27746f81632dfea1` |
| Reputation | `@polkadot/reputation` | `0x94a9099379EeA0C5093F93E9934a7f6605E7922f` |
| Threads | `@polkadot/threads` | `0xFa1AB6B6aCBb056F5D9952EEDC5C67F1F3162f3A` |
<!-- /GEN:contracts:cdm -->

> Append-only registry. Legacy aliases `@mock/disputes` and `@mock/reputation` still resolve to the same addresses.

### `@dotns/*` registered into the CDM ContractRegistry

The DotNS contracts (addresses under **DotNS** above) were deployed on Summit but not initially CDM-published, so `ContractManager.fromLiveClient` couldn't resolve them. Registered into the ContractRegistry on 2026-06-17 (append-only `publishLatest`, no redeploy) — signer/owner **W3S publisher 5Fk8**. Script: `contract-dependency-manager/src/lib/scripts/register-dotns-summit.ts`. This is what makes the dotns UI (`dotns.dot`) resolve its contracts live on Summit.

| Package | Address | Metadata CID |
| --- | --- | --- |
| `@dotns/registrar-controller` | `0xA68a5b2A6be6d014be0dB07c0ed4bacc4A6A570A` | `bafk2bzacecp5b5xdqoz4xlqxm65dbc4gqh3vbyh7cjspjczqtnbb2e6qkbpv4` |
| `@dotns/registrar` | `0xf3969bCBE60463302306663C62A6A8ef91ab9aA5` | `bafk2bzacecn66i4vqsdv367bjenbpamedvguczbrzyfxvjndhfz6vkpd2w4fm` |
| `@dotns/registry` | `0xFb7AB7E142ED0248D77198CA8722D67C1930D783` | `bafk2bzaceaa3tfic675b6p5nc47d4oyqhdmzy4bspizjghue32qk37zh43jla` |
| `@dotns/pop-rules` | `0x6331e51C9AfC73BfE12562fd160BA2c66A73f984` | `bafk2bzaceadkpmngjbf66caqqbikbxvxkz3ikxdqmzquxyl75kngvz6j4vcqu` |
| `@dotns/resolver` | `0xC7f1C3B16BFd0c5910EE37a4a2033f4506AcE94d` | `bafk2bzacedlwrkimxmat3jonvzocdh3v374pniefvsy6r677h4va3ph7h3sne` |
| `@dotns/reverse-resolver` | `0x5aa444C6cbA9bd703d1a0B5E5C643FB886F80bB4` | `bafk2bzaceddkgxv3qtneetq2cz76sqkqxhxwrwouxxgbvj6vpboapj6l4qu2i` |
| `@dotns/content-resolver` | `0xf110e5799c3f0adb8ED885C02c45Ecfe7fD86226` | `bafk2bzacec7pemoebt3uounblvdyvbfetpnbosvigmhgwz4n6lw7dnf2zsc4w` |
| `@dotns/store-factory` | `0x2947af3CBFb45b89610524a25921C32cB65C4C39` | `bafk2bzacecwqt2pbxj2tyxzcr3klafh65mj6huqkecewqd3hl4mxzu7rewmec` |
| `@dotns/multicall3` | `0x1C1044BEa5bDe0F435436bB52A8340fBE1D59847` | `bafk2bzaceae4besm57dw62zhwcld5rj3esb6fxxuv66nqa7svmaf5rqtvplo4` |

## Attestation Protocol

EAS-style schema registry + attestation service (both ownerless / immutable). Source: [attestation-protocol](https://github.com/Polkadot-Community-Foundation/attestation-protocol).

<!-- GEN:contracts:attestation -->
| Contract | Address |
| --- | --- |
| SchemaRegistry | `0x4d5b7543c380be0446ff9c22b6055990e2aa952a` |
| AttestationService | `0x40c48a58cdc2797f21325269c4422e717e6510e5` |
<!-- /GEN:contracts:attestation -->

## Browse

Privacy-app directory. Deployer / owner: **W3S publisher**. Source: [browse](https://github.com/Polkadot-Community-Foundation/browse).

<!-- GEN:contracts:browse -->
| Contract | Address |
| --- | --- |
| Publisher (v2.1.0) | `0xf5fe0fc9f4c13dfd3a4a8abd27e64eb652157494` |
| RecipientAndAttesterIndexResolver | `0xa2ea4ab49bbe73f466f2fa0aeb50b39d34b55218` |
| TrustedAttesterIndexResolver | `0xde4a63079034230d71b5a5071571ed3fd95194e0` |
<!-- /GEN:contracts:browse -->

Trusted attester: `5HECKTpBe95rgbptG812Gh61VH3pjDfhgtE6xq5mHvRSUSo3` (EVM `0xeB686805D91dB3637258d0d21DefC06d0dA3a8C9`).

## Festival

Conference app: soulbound tickets, attendance POAPs, sessions. Deployer / admin: **CDM admin**. Source: [festival](https://github.com/Polkadot-Community-Foundation/festival).

<!-- GEN:contracts:festival -->
| Contract | Address |
| --- | --- |
| Multicall3 | `0x6749bd94dc0d68fb7f829e0bf3422ad324d5fe53` |
| Festival POAP (AttendancePOAP) | `0x22127c13ee2abd2280c2e56bf3b7fff82d24ef75` |
| Session POAP (AttendancePOAP) | `0x55a0fced4cf4f2e50570ae27ce9a037b99579578` |
| Festival | `0xd75f84d9593bd2cf61dbf3670cc94f771050a99a` |
| FestivalSession | `0x50a70807bbb6eec19840ad46b0cb508f8c6cd99e` |
<!-- /GEN:contracts:festival -->

## t3rminal

Point-of-sale terminal; permissionless writes, no admin. Deployer: **CDM admin**. Source: [t3rminal](https://github.com/Polkadot-Community-Foundation/t3rminal).

<!-- GEN:contracts:t3rminal -->
| Contract | Address |
| --- | --- |
| T3rminalBulletinIndex | `0x10acbce7ea2fb859ef7c2caab29c0babb8b91803` |
<!-- /GEN:contracts:t3rminal -->

## w3spay-admin

W3sPay pilot admin console: the `W3SPayRegistry` contract (owner = deployer's H160, super-admin). Deployer: **CDM admin**. Source: [w3spay-admin](https://github.com/Polkadot-Community-Foundation/w3spay-admin).

<!-- GEN:contracts:w3spay-admin -->
| Contract | Address |
| --- | --- |
| W3SPayRegistry | `0xf76dadbbc112738275ed398d15c0e8c47b2550f2` |
<!-- /GEN:contracts:w3spay-admin -->

> `w3spay` (customer checkout) and `w3s-payment-processor` (merchant monitor) are app-only and consume this `W3SPayRegistry`.

**Additional super-admins** (also admins):

| Super-admin (H160) |
| --- |
| `0x5940940e7c1d9301a5ead19adfb810949da3a56e` |
| `0x379920d031edf3bb0cbcccfc102a2e96e9031d96` |
| `0xa035e1acdbf36ed14aa9a9b7eba486541d4fda01` |
| `0xb6c7d3967a6a7d4f13f1bccf72b1106e7f17b98b` |

## Playground

Registry browser + quest platform for the Web3 Summit Developer Lab. Deployer / `sudo` / owner: **W3S publisher**. Registered in the CDM `ContractRegistry`. Source: [playground-app-community](https://github.com/Polkadot-Community-Foundation/playground-app-community).

<!-- GEN:contracts:playground -->
| Contract | Package | Address |
| --- | --- | --- |
| Registry (v1) | `@w3s/playground-registry` | `0x49091Eb6dbBf2f95B55243b987ebc15eaaEe711F` |
<!-- /GEN:contracts:playground -->

> **v1 registry** (`0x49091Eb6…711F`) is the live runtime contract — a fresh CDM deploy that the frontend resolves via `@w3s/playground-registry`. State (6 apps, 9 point balances, 2 social counters) was migrated from the prior **v0** instance `0x14C27954796575C26c85eD9BC6441522e174a0f3` (now superseded). Extra admin granted on v1: `5FHxLwXdYvyQAsuH9RKeF7LyLXJaA3NbXjPZAbq13hZMcKRN` (sudo remains the W3S publisher).

## LocalDOT

Peer-to-peer cash↔token marketplace. Ownerless / permissionless. Deployer / publisher: **W3S publisher**. Source: [localdot-community](https://github.com/Polkadot-Community-Foundation/localdot-community).

<!-- GEN:contracts:localdot -->
| Contract | Address |
| --- | --- |
| P2PMarket | `0x6132fe5cfd82790ea548515c7d63878e6860397d` |
| ZKPassportRegistry | `0x4161D8dbe61DB1A68dfC570c1cBfD2f7C8E44749` |
<!-- /GEN:contracts:localdot -->

> `ZKPassportRegistry` is the optional identity-verification leg.

## Mercado

Food-delivery marketplace dApp. Contracts owner: **DotNS deployer** (`0x8c78b53f…`). App owner / uploader: **W3S publisher**. Source: [mercado-community](https://github.com/Polkadot-Community-Foundation/mercado-community).

<!-- GEN:contracts:mercado -->
| Contract | Address |
| --- | --- |
| MercadoCore | `0xc411ea624e8f8f0ec2a2145f79e88b80e0269289` |
| MercadoRatings | `0xac36c0173ea817c63dfea1ea796bfd4506d586d2` |
| RestaurantMeta | `0xe707ec73fc95a939c2591dbbdc910d91fdb52e3b` |
| MercadoDisputes | `0xb03380920c5dd15f725875c8eba6e30c2b3710fe` |
| MockMobRule | `0x24f2cce5598c733415d4cb3d23494c7e589d05ba` |
| MercadoMatchmakers | `0x569ee3092a64fdeb114c1cf3414817b31d3bc0bd` |
<!-- /GEN:contracts:mercado -->

## Simple Survey

Decentralized survey app. Ownerless / permissionless. Deployer / publisher: **W3S publisher**. Registered in the CDM `ContractRegistry`. Source: [simple-survey](https://github.com/Polkadot-Community-Foundation/simple-survey).

<!-- GEN:contracts:simple-survey -->
| Contract | Package | Address |
| --- | --- | --- |
| Surveys | `@polkadot/surveys` | `0xD9FBCF04Ea06904Ded8703d07b0c7E34F681E89F` |
<!-- /GEN:contracts:simple-survey -->

> Also listed in the Playground Apps grid.

## Rock-Paper-Scissors

Rock-paper-scissors game. Ownerless / permissionless. Deployer / publisher: **W3S publisher**. Registered in the CDM `ContractRegistry`. Served at two names (see Apps table). Source: [Rock-Paper-Scissors](https://github.com/Polkadot-Community-Foundation/Rock-Paper-Scissors).

<!-- GEN:contracts:rps -->
| Contract | Package | Address |
| --- | --- | --- |
| Leaderboard | `@rps/leaderboard` | `0xf3A06D11BDf5d01fD27D767Cd88e277070026AeE` |
<!-- /GEN:contracts:rps -->

## Feedback Board

Decentralized sticky-note board. Ownerless / permissionless. Deployer / publisher: **W3S publisher**. Registered in the CDM `ContractRegistry`. Source: [feedback-board](https://github.com/Polkadot-Community-Foundation/feedback-board).

<!-- GEN:contracts:feedback -->
| Contract | Package | Address |
| --- | --- | --- |
| Feedback | `@polkadot/feedback` | `0x86Cc121993A2B7Aa53EC8222B63D2053eF352f32` |
<!-- /GEN:contracts:feedback -->

> Also listed in the Playground Apps grid.

## Apps on Bulletin

Web apps published to the **Summit Bulletin chain** and bound to `.dot` names. Owner / uploader: **W3S publisher** (except DotNS UI, noted below).

<!-- GEN:apps -->
| App | Domain | URL | Root CID |
| --- | --- | --- | --- |
| DotNS UI | `dotns.dot` | https://dotns.dot.li | `bafybeiggzry5xc4ewcb6by7vh3dz7q3afhl5qk5kdufnla2vpajh2g5bha` |
| CDM Frontend | `contracts.dot` | https://contracts.dot.li | `bafybeid2flilxbxopek7yaifq4gsp6zvbalz46gv2nd7ayvij5znckhqnu` |
| Browse | `browse.dot` | https://browse.dot.li | `bafybeifybdg32mikvkrmssv6ie3kbgnrllwo7zksuzzrd53slvrpizq4ne` |
| Festival — Admin | `web3summit-admin.dot` | https://web3summit-admin.dot.li | `bafybeifba5rompnrufzup36uzssdnk3kqa3d7oxgjajvdb5woynvmzkzty` |
| Festival — Attendee | `web3summit.dot` | https://web3summit.dot.li | `bafybeicdaujjbajmfo2en4qjpoxibmaamz755nds2ojmpyrp65zebteiaq` |
| Game results webview | `game-webview.dot` | https://game-webview.dot.li | `bafybeigifj52a7zs7qdms5fvkztkdkz4szrmwsk2z3zeq5xxzaqarsqaiu` |
| Pocket collectibles webview | `collectibles-webview.dot` | https://collectibles-webview.dot.li | `bafybeiapc7v7x2ghalgciirymvxlmaspmhrf4hlgwu6xgzmfoa6qkwjg5i` |
| t3rminal | `t3rminal.dot` | https://t3rminal.dot.li | `bafybeiaonylrnny7n4enc4rtuuqgks3tjgdifs4gelhgzpwi7cbnnzk434` |
| t3rminal (alias) | `terminal.dot` | https://terminal.dot.li | `bafybeif3pp7tbdfiqaw7ioh6c6jhbfnuyu4jdoo3hvdfhxiwxn4u4abo3e` |
| w3spay-admin | `w3spayadmin.dot` | https://w3spayadmin.dot.li | `bafybeihk6ugqrpdbkphtvuwszowiiawp2pejuym3uo5iffbdw3juf72gmi` |
| w3spay checkout | `w3spay.dot` | https://w3spay.dot.li | `bafybeibfysmrfngmh4j4dmdcwqme4ngu4l6chhbuxshjewyktqz2o5mqjm` |
| w3s-payment-processor | `w3spayprocessor.dot` | https://w3spayprocessor.dot.li | `bafybeif6kkkfelyo2eynuqveev2ozkjungzgykd2dcgrmu3hxad6mkrugq` |
| Playground | `playground.dot` | https://playground.dot.li | `bafybeicrnm56b7j7zxrnkbbb3v3zz6mwznps7qgumkzotrwkib2ku2nivu` |
| Playground constellation (kiosk) | `constellation.dot` | https://constellation.dot.li | `bafybeibudgjoiyhcvgqumuzqlm7mzmormtpfeosv2kxdib7pomtl5hswza` |
| Playground template (starter) | `playground-template.dot` | https://playground-template.dot.li | `bafybeibfa3q4us7ufv2bajyjvbrukycfixgmbpiccurzij3556l5fqfdpe` |
| Playground tutorial (Rock Paper Scissors) | `playground-tutorial.dot` | https://playground-tutorial.dot.li | `bafybeihcma3ab4qodsc45cg5u5tav5qkyhc5qav6vw5c7a5ycjhg45v2vq` |
| Rock-Paper-Scissors (game frontend) | `rock-paper-scissors.dot` | https://rock-paper-scissors.dot.li | `bafybeig32jfoayuvtduoa5svqvmhd2lsxaldt7rdofjz4oyxca7fvfd4su` |
| Rock-Paper-Scissors (alias, host-only) | `rps-game.dot` | https://rps-game.dot.li | `bafybeicohsszja25bq2quwjkosz32lmqoxcvpexvhgeoesrfqqvhmz5krq` |
| Simple Survey | `survey.dot` | https://survey.dot.li | `bafybeih46vl67qfeiecplc2mjmsx7h63jl5j6lqokt5khrqwclfq4bahlq` |
| dotli Starter | `dotli-starter.dot` | https://dotli-starter.dot.li | `bafybeieekbrschbyclzsw4cjcs5wjcbisqkbkvwyfnn3ilzey6xifck2d4` |
| LocalDOT | `localmarket.dot` | https://localmarket.dot.li | `bafybeihbtyzmngldajelxi4ffk65oavtnsldtp63qlyq4xj2zsmu3mg2iy` |
| Mercado | `mercado.dot` | https://mercado.dot.li | `bafybeicg32dyfbeb732vj7gq4ciqcw66qhonrxte24dw2xu4ydfv7yxiwu` |
| Feedback Board | `feedback.dot` | https://feedback.dot.li | `bafybeigyrp65wfqwuk7fkhvjv7nlo7npxjm4k2kulgcdije4tjwpzdvunq` |
<!-- /GEN:apps -->

> **DotNS UI** owner / deployer: `14M6Yc9i8dg6QLM2u1yd3jaFM2cd3NNvyKznfBaS2q3cNdKy` (EVM `0x7e0e0a5a111aa15b0c1e4bac776884e263fa6b13`); uploaded by **W3S publisher**.

### dotli — public web gateway

The dotli `.dot` browser at **https://dot.li**, defaulting to the **Summit** network. Source: [dotli-community](https://github.com/Polkadot-Community-Foundation/dotli-community).

## Client Apps

The Polkadot superapp clients (Android / iOS / desktop). App stores aside, direct-download installers are hosted on the **PCF downloads host** — the R2 bucket at `get.polkadotcommunity.foundation` (zero-egress). Current desktop/Android build: **`1.0.0-rc.1`**. Each `latest-*` link is a stable pointer to the newest build; immutable version-named copies live alongside, and every direct download has a `.sha256` sidecar (append `.sha256` to the URL).

<!-- GEN:clients -->
| Platform | Channel | Download |
| --- | --- | --- |
| Android | Google Play | https://play.google.com/store/apps/details?id=io.pcf.polkadotapp |
| Android | Direct APK (latest) | https://get.polkadotcommunity.foundation/android/latest.apk |
| iOS | TestFlight (beta) | https://testflight.apple.com/join/VvC8SHVE |
| macOS — Apple Silicon | Direct `.dmg` | https://get.polkadotcommunity.foundation/desktop/latest-mac-arm64.dmg |
| macOS — Intel | Direct `.dmg` | https://get.polkadotcommunity.foundation/desktop/latest-mac-x64.dmg |
| Windows — universal | Direct `.exe` | https://get.polkadotcommunity.foundation/desktop/latest-win.exe |
| Windows — x64 | Direct `.exe` | https://get.polkadotcommunity.foundation/desktop/latest-win-x64.exe |
| Windows — ARM64 | Direct `.exe` | https://get.polkadotcommunity.foundation/desktop/latest-win-arm64.exe |
| Linux — x86_64 | Direct `AppImage` | https://get.polkadotcommunity.foundation/desktop/latest-linux-x64.AppImage |
| Linux — ARM64 | Direct `AppImage` | https://get.polkadotcommunity.foundation/desktop/latest-linux-arm64.AppImage |
<!-- /GEN:clients -->

## Services

Hosted on PCF infrastructure.

<!-- GEN:services -->
| Service | Endpoint |
| --- | --- |
| identity-backend | https://polkadot-app.api.polkadotcommunity.foundation |
| flow-funder | internal — People→AssetHub dotNS reservation bot (ns flow-funder, pcf-prod) |
<!-- /GEN:services -->

## npm Packages

Published under [`@polkadot-community-foundation`](https://www.npmjs.com/org/polkadot-community-foundation).

<!-- GEN:npm -->
| Package | Version | Purpose |
| --- | --- | --- |
| [`cdm-env`](https://www.npmjs.com/package/@polkadot-community-foundation/cdm-env) | `2.1.0` | CDM chain env presets; `getRegistryAddress("w3s")` → `0xa5747e60ae27f93e92019e4021abfc4957050141` |
| [`dotns-cli`](https://www.npmjs.com/package/@polkadot-community-foundation/dotns-cli) | `0.7.2` | DotNS CLI (`dotns`) |
| [`polkadot-app-deploy`](https://www.npmjs.com/package/@polkadot-community-foundation/polkadot-app-deploy) | `0.10.1` | Bulletin app-deploy CLI (`polkadot-app-deploy` / `pad`) |
| [`cdm-cli`](https://www.npmjs.com/package/@polkadot-community-foundation/cdm-cli) | `0.8.22` | CDM CLI (`cdm`) — bundled, registry baked in |
<!-- /GEN:npm -->
