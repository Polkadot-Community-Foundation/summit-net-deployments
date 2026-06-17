# Summit Network — Deployments

On-chain addresses, deployers, and domains for everything deployed to the **Summit** network.

> The tables below are **generated** from `accounts.json` + `deployments.json` by
> `tools/gen-registry-tables.mjs` (blocks marked `<!-- GEN:… -->`). **Edit the JSON, then run
> `node tools/gen-registry-tables.mjs`** — don't hand-edit the tables; `--check` flags drift.
> Operational secrets / key custody / caveats are intentionally **not** here — they live in the
> private (gitignored) `summit-deployer-skills/guides/SECRETS_AND_CAVEATS.md`.

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
| **DotNS deployer** | — (raw secp256k1 EVM key) | `0x8c78b53f2ceaf395fda66152d7a5e6e7a79db675` | CREATE3 owner of the entire DotNS contract suite; owner-override registration of every reserved/PoP-gated .dot name (registerReserved); constructor owner of all Mercado contracts |
| **DotNS whitelister** | `5GWa6ajKCE8SBvRgYKtQC4MJqAUfKaKCL15onWcrBop4yZfW` | — | holds DOTNS_WHITELIST_OPERATOR_ROLE on DotnsRegistrarController (whiteListAddress) |
| **CDM admin** | `5Hn6AMFkiAyGFgWCShqAdXFax87uknHa5YXCZmiabFidohQy` | `0xc53bb1eeac9b01bbd8161f3e9af1b0626e52a7e7` | CDM ContractRegistry owner/admin; Festival contracts deployer + admin; t3rminal contract deployer; W3SPayRegistry deployer (super-admin) |
| **W3S publisher** | `5Fk8FBTqBpAyBReZPse2wn8Lf4ADzdNVAsrGoNMSTxKedN8f` | `0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD` | Bulletin-authorized uploader for nearly all app uploads; .dot name owner for most apps; signer for `cdm deploy` (publishes ABI to Bulletin); deployer of Playground / Browse / LocalDOT / Simple Survey / Rock-Paper-Scissors / Feedback contracts |
| **DotNS UI owner** | `14M6Yc9i8dg6QLM2u1yd3jaFM2cd3NNvyKznfBaS2q3cNdKy` | `0x7e0e0a5a111aa15b0c1e4bac776884e263fa6b13` | owner of the dotns.dot name (DotNS UI); used as a generic read/view-call origin in tooling (check-readiness.mjs) |
| **Browse trusted attester** | `5HECKTpBe95rgbptG812Gh61VH3pjDfhgtE6xq5mHvRSUSo3` | `0xeB686805D91dB3637258d0d21DefC06d0dA3a8C9` | trusted attester recognized by Browse TrustedAttesterIndexResolver |
| **Playground read origin** | `5DXpwDcFif9SzDX3GcqhW6igXhiCLpHrSRiJCBTwFfC4po9C` | — | dry-run query origin for the Playground SPA's live CDM registry reads |
| **Constellation read origin** | `5FHxLwXdYvyQAsuH9RKeF7LyLXJaA3NbXjPZAbq13hZMcKRN` | `0x534507665bce7715a2894dec797e17e337a3d2e6` | dry-run query origin for the Constellation kiosk SPA's live CDM registry reads |
| **Identity backend attester (real account)** | `5GjUuGpacCspUJjnDdNVpGLn1JQk9QvCXGhtKiLEpMRcHEHA` | — | the on-chain identity recognised by the identity-backend service (ATTESTER_PUBLIC_KEY); registers usernames on the Summit People chain via peopleLite.attest, and (when DOTNS_GATEWAY_ENABLED) reserves .dot names via dotnsGateway.reserve_name on Asset Hub |
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

> Registry is append-only. Legacy aliases `@mock/disputes` and `@mock/reputation` remain registered at the same addresses and still resolve.

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

Point-of-sale terminal: indexes signed daily sales-report CIDs (writes permissionless, no admin). Deployer: **CDM admin**. Source: [t3rminal](https://github.com/Polkadot-Community-Foundation/t3rminal).

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

**Additional super-admins** (granted via `addSuperAdmin`, signer = CDM admin `5Hn6AMFk…`; each is also an admin):

| Super-admin (H160) | tx |
| --- | --- |
| `0x5940940e7c1d9301a5ead19adfb810949da3a56e` | `0x6680c5cf123c67bfff34f387a3f1ae125c7fa18e11efc0715210233cc0869399` |
| `0x379920d031edf3bb0cbcccfc102a2e96e9031d96` | `0x72b7d2f3bfd85d7705a48e70b01ff7bab3a3cfb20cfc76b44a78041755f26853` |
| `0xa035e1acdbf36ed14aa9a9b7eba486541d4fda01` | `0x970eb1e17951de0d7c83b5fb91793d52de723b3f8dc8fa9c5c28349709ed5fd3` |
| `0xb6c7d3967a6a7d4f13f1bccf72b1106e7f17b98b` | `0xbcfe907bfd13f5b04d335feeb6cd37696c9c4e76ebdf98d33d2f69e365d86cb7` |

## Playground

Registry browser + quest platform for the Web3 Summit Developer Lab. Deployer / `sudo` / owner: **W3S publisher**. Registered in the CDM `ContractRegistry`. Source: [playground-app-community](https://github.com/Polkadot-Community-Foundation/playground-app-community).

<!-- GEN:contracts:playground -->
| Contract | Package | Address |
| --- | --- | --- |
| Registry | `@polkadot/playground-registry` | `0x14C27954796575C26c85eD9BC6441522e174a0f3` |
<!-- /GEN:contracts:playground -->

> Legacy alias `@w3s/playground-registry` stays registered (append-only) at the same address and still resolves at runtime.

## LocalDOT

Peer-to-peer cash↔token marketplace (offer book + handoff-agent registry + native-token escrow). Solidity → Revive/PolkaVM; **no on-chain owner/admin** (permissionless escrow). Deployer / publisher: **W3S publisher**. Source: [localdot-community](https://github.com/Polkadot-Community-Foundation/localdot-community).

<!-- GEN:contracts:localdot -->
| Contract | Address |
| --- | --- |
| P2PMarket | `0x6132fe5cfd82790ea548515c7d63878e6860397d` |
| ZKPassportRegistry | `0x4161D8dbe61DB1A68dfC570c1cBfD2f7C8E44749` |
<!-- /GEN:contracts:localdot -->

> `localmarket.dot` registered via DotNS owner-override `registerReserved` → owner 5Fk8 (`0xF8d186c352e2ea0B9C02c211525A20DdcB8CD2dD`). Both contracts are ownerless; `ZKPassportRegistry` is the optional identity-verification leg.

## Mercado

Food-delivery marketplace dApp (restaurants, orders, ratings, disputes, matchmakers). Solidity → Revive/PolkaVM. Deployer / owner: **DotNS deployer** (`0x8c78b53f…`, constructor owner of all contracts). App owner / uploader: **W3S publisher** (`mercado.dot`). Source: [mercado-community](https://github.com/Polkadot-Community-Foundation/mercado-community).

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

> `mercado.dot` (7-char, PoP-gated) registered via DotNS owner-override `registerReserved` → owner 5Fk8 (tx `0x5804ed2f…`). App-leg CID in the Apps table.

## Simple Survey

Decentralized survey app: the contract indexes survey + response CIDs (content on Bulletin); **no on-chain owner/admin** (permissionless — any mapped account can create surveys / submit responses). Deployer / publisher: **W3S publisher**. Registered in the CDM `ContractRegistry`. Source: [simple-survey](https://github.com/Polkadot-Community-Foundation/simple-survey).

<!-- GEN:contracts:simple-survey -->
| Contract | Package | Address |
| --- | --- | --- |
| Surveys | `@polkadot/surveys` | `0xD9FBCF04Ea06904Ded8703d07b0c7E34F681E89F` |
<!-- /GEN:contracts:simple-survey -->

> `survey.dot` (6-char, PoP-gated) registered via DotNS owner-override `registerReserved` → owner 5Fk8. **Listed in the playground Apps grid** (`@polkadot/playground-registry`, tag `social`, moddable) via the PCF `playground-cli` fork (`9bc4415`); that publish RE-HOSTED the SPA, so the **current contenthash = the playground-cli root CID** in the Apps table (playground metadata CID `bafk2bzacedvgob55d6rm4tw57ghulonrtirbdqztiusczjtmrgchnmy37zcj6`). Earlier `polkadot-app-deploy` published the product manifest + icon (icon CID `bafk2bzaceacbyysvxvvu6mtqh3o5xmyamvxxar5jsiq2o7hust6rqdr3sia72`). On-chain contract metadata carries no ABI; the app bundles the ABI in `cdm.json` (so `cdm install @polkadot/surveys` returns no typed ABI). App-leg CID in the Apps table.

## Rock-Paper-Scissors

Rock-paper-scissors game: the `@rps/leaderboard` contract tracks `address → (game-history CID, points)`; game history lives on Bulletin. **No on-chain owner/admin** (permissionless — any mapped account registers / updates its own score). Deployer / publisher: **W3S publisher**. Registered in the CDM `ContractRegistry`. Served at two names (same build). Source: [Rock-Paper-Scissors](https://github.com/Polkadot-Community-Foundation/Rock-Paper-Scissors).

<!-- GEN:contracts:rps -->
| Contract | Package | Address |
| --- | --- | --- |
| Leaderboard | `@rps/leaderboard` | `0xf3A06D11BDf5d01fD27D767Cd88e277070026AeE` |
<!-- /GEN:contracts:rps -->

> Metadata CID `bafk2bzacebxrsph5b6z3my5ykvdoaqsle5hry6l7pcwf4fqikj2h423gnkbuu`; deploy tx `0x56d580267d651607a20d17eef50ace500c5cba31ec8f31cea5923947c8c652bc`. `rps-game.dot` (8-char, PoP-gated) registered via DotNS owner-override `registerReserved` → owner 5Fk8 (tx `0xc48c2b079da4ec26161b4bdf71487a40690511ece1eca597b8c2f09cc707c158`); `rock-paper-scissors.dot` (open) registered by CI. No typed ABI in on-chain metadata; the app bundles the ABI in `cdm.json`. App-leg CID in the Apps table.

## Feedback Board

Decentralized sticky-note board: the `@polkadot/feedback` contract keeps an ordered list of note CIDs (note JSON on Bulletin) + the H160 of each poster. **No on-chain owner/admin** (permissionless — any mapped account can `postFeedback`). Deployer / publisher: **W3S publisher**. Registered in the CDM `ContractRegistry`. Source: [feedback-board](https://github.com/Polkadot-Community-Foundation/feedback-board).

<!-- GEN:contracts:feedback -->
| Contract | Package | Address |
| --- | --- | --- |
| Feedback | `@polkadot/feedback` | `0x86Cc121993A2B7Aa53EC8222B63D2053eF352f32` |
<!-- /GEN:contracts:feedback -->

> Metadata CID `bafk2bzacea6dsyaa7epjo27hvipt7waumihd53geczm6qlvtirqmnhapg2xxw`; deploy tx `0x7efd9e3cebbc787a61fb77ddfd977d4a54466703b30a1a8f27e01a755f511c43`. `feedback.dot` (8-char, PoP-gated) registered via DotNS owner-override `registerReserved` → owner 5Fk8 (tx `0xb9a8b681bd533b04710546392adf080040137cadee0aac55ad878c7a2ef920e2`). No typed ABI in on-chain metadata; the app bundles the ABI in `cdm.json`. App-leg CID in the Apps table. **Listed in the playground Apps grid** (`@polkadot/playground-registry` `0x14C27954…`, moddable, tag `social`): AppMetadata CID `bafk2bzaceatayhdi2hx6fazemhgocq7vxmwv2jbln74f436mcr7nvvcecns6s`, publish tx `0x36ffddf9c7e6ef270fb8a4c2002002ddeb9445abe885837b2e514fad9d8c7fa3` — signed by the **bare keyring 5Fk8** (registry sudo; NOT the playground-cli `--suri` product-derived account → `Unauthorized`). Reusable: `feedback-board/scripts/publish-to-playground.ts`.

## Apps on Bulletin

Web apps published to the **Summit Bulletin chain** and bound to `.dot` names. Owner / uploader: **W3S publisher** (except DotNS UI, noted below).

<!-- GEN:apps -->
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
| Playground template (starter) | `playground-template.dot` | https://playground-template.dot.li | `bafybeiaplcd7ol5qwwezmd7pjvbnfspdpoxljoip2zna5v5pzdccgzfyna` |
| Playground tutorial (Rock Paper Scissors) | `playground-tutorial.dot` | https://playground-tutorial.dot.li | `bafybeib2g5ig4fgrcdkqkxe5zwzoofy2msuakuksa27ixubjsclnae7pjy` |
| Rock-Paper-Scissors (game frontend) | `rock-paper-scissors.dot` | https://rock-paper-scissors.dot.li | `bafybeidhs6e2zv7ykvjp3ex4dlugciasuyl56xhv5f33itanblf2wlvskq` |
| Rock-Paper-Scissors (alias, host-only) | `rps-game.dot` | https://rps-game.dot.li | `bafybeiflahpgddarjrg3yod6lbxm3m7wqidcoqzexedpzxy5afsputt66i` |
| Simple Survey | `survey.dot` | https://survey.dot.li | `bafybeifukaj2gdsmmtlk4oagno2bhucnaixr7dinsogcahkvuhofongcyu` |
| dotli Starter | `dotli-starter.dot` | https://dotli-starter.dot.li | `bafybeieekbrschbyclzsw4cjcs5wjcbisqkbkvwyfnn3ilzey6xifck2d4` |
| LocalDOT | `localmarket.dot` | https://localmarket.dot.li | `bafybeihbtyzmngldajelxi4ffk65oavtnsldtp63qlyq4xj2zsmu3mg2iy` |
| Mercado | `mercado.dot` | https://mercado.dot.li | `bafybeicg32dyfbeb732vj7gq4ciqcw66qhonrxte24dw2xu4ydfv7yxiwu` |
| Feedback Board | `feedback.dot` | https://feedback.dot.li | `bafybeibj5tbmmqdmajveunbmwdb2vewjoav3zuj5gzf7yitgyqbgw6llo4` |
<!-- /GEN:apps -->

> **DotNS UI** owner / deployer: `14M6Yc9i8dg6QLM2u1yd3jaFM2cd3NNvyKznfBaS2q3cNdKy` (EVM `0x7e0e0a5a111aa15b0c1e4bac776884e263fa6b13`); uploaded by **W3S publisher**.

### dotli — public web gateway

The dotli `.dot` browser at **https://dot.li**, defaulting to the **Summit** network. Source: [dotli-community](https://github.com/Polkadot-Community-Foundation/dotli-community).

## Services

Hosted on PCF infrastructure.

<!-- GEN:services -->
| Service | Endpoint |
| --- | --- |
| identity-backend | https://polkadot-app.api.polkadotcommunity.foundation |
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
