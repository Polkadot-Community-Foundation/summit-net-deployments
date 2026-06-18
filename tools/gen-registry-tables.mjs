#!/usr/bin/env node
/**
 * Regenerate the marker-delimited tables in README.md from the JSON sources of truth
 * (accounts.json + deployments.json). Prose outside the markers is never touched.
 *
 * Usage:  node tools/gen-registry-tables.mjs          # rewrite README.md in place
 *         node tools/gen-registry-tables.mjs --check   # exit 1 if README is out of date
 *
 * Markers in README.md (kept verbatim, content between them is replaced):
 *   <!-- GEN:network -->            ... <!-- /GEN:network -->
 *   <!-- GEN:accounts -->           ... <!-- /GEN:accounts -->
 *   <!-- GEN:contracts:<id> -->     ... <!-- /GEN:contracts:<id> -->   (one per product)
 *   <!-- GEN:apps -->               ... <!-- /GEN:apps -->
 *   <!-- GEN:clients -->            ... <!-- /GEN:clients -->
 *   <!-- GEN:services -->           ... <!-- /GEN:services -->
 *   <!-- GEN:npm -->                ... <!-- /GEN:npm -->
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const accounts = JSON.parse(readFileSync(join(ROOT, "accounts.json"), "utf8"));
const deploy = JSON.parse(readFileSync(join(ROOT, "deployments.json"), "utf8"));

const code = (s) => "`" + s + "`";
const table = (headers, rows) =>
  [
    "| " + headers.join(" | ") + " |",
    "| " + headers.map(() => "---").join(" | ") + " |",
    ...rows.map((r) => "| " + r.join(" | ") + " |"),
  ].join("\n");

const blocks = {};

// --- network ---
{
  const n = deploy.network;
  blocks["network"] = table(
    ["Field", "Value"],
    [
      ["Network", n.name.replace("pallet-revive", "`pallet-revive`")],
      ["EVM chain id", `${code(n.evmChainId)} (${code(n.evmChainIdHex)})`],
      ["Native token", `${n.nativeToken}, ${n.tokenDecimals} decimals`],
      ["SS58 prefix", code(String(n.ss58Prefix))],
      ["Asset Hub RPC", code(n.rpc.assetHub)],
    ]
  );
}

// --- accounts ---
{
  const ss58Cell = (a) =>
    a.ss58 ? code(a.ss58) : a.keyType === "secp256k1-raw" ? "— (raw secp256k1 EVM key)" : "—";
  const evmCell = (a) => (a.evm ? code(a.evm) : "—");
  blocks["accounts"] = table(
    ["Ref", "SS58", "EVM (H160)", "Role"],
    accounts.accounts.map((a) => [
      `**${a.label}**`,
      ss58Cell(a),
      evmCell(a),
      a.controls.join("; "),
    ])
  );
}

// --- per-product contract tables ---
for (const p of deploy.products) {
  if (!p.contracts || !p.contracts.length) continue;
  const hasPkg = p.contracts.some((c) => c.package);
  const headers = hasPkg ? ["Contract", "Package", "Address"] : ["Contract", "Address"];
  const rows = p.contracts.map((c) =>
    hasPkg
      ? [c.name, c.package ? code(c.package) : "—", code(c.address)]
      : [c.name, code(c.address)]
  );
  blocks[`contracts:${p.id}`] = table(headers, rows);
}

// --- apps ---
{
  blocks["apps"] = table(
    ["App", "Domain", "URL", "Root CID"],
    deploy.apps.map((a) => [a.name, code(a.domain), a.url, code(a.cid)])
  );
}

// --- clients (downloadable / store-distributed apps) ---
if (deploy.clients && deploy.clients.length) {
  blocks["clients"] = table(
    ["Platform", "Channel", "Download"],
    deploy.clients.map((c) => [c.platform, c.channel, c.url])
  );
}

// --- services ---
if (deploy.services && deploy.services.length) {
  blocks["services"] = table(
    ["Service", "Endpoint"],
    deploy.services.map((s) => [s.name, s.endpoint])
  );
}

// --- npm ---
{
  const short = (name) => name.split("/").pop();
  blocks["npm"] = table(
    ["Package", "Version", "Purpose"],
    deploy.npm.map((p) => [
      `[${code(short(p.name))}](https://www.npmjs.com/package/${p.name})`,
      code(p.version),
      p.purpose,
    ])
  );
}

// --- splice into README ---
const readmePath = join(ROOT, "README.md");
let md = readFileSync(readmePath, "utf8");
const missing = [];
for (const [key, content] of Object.entries(blocks)) {
  const re = new RegExp(
    `(<!-- GEN:${key} -->)[\\s\\S]*?(<!-- /GEN:${key} -->)`,
    "g"
  );
  if (!re.test(md)) {
    missing.push(key);
    continue;
  }
  md = md.replace(re, `$1\n${content}\n$2`);
}

if (missing.length) {
  console.error("⚠️  markers not found in README.md for: " + missing.join(", "));
}

const current = readFileSync(readmePath, "utf8");
if (process.argv.includes("--check")) {
  if (current !== md) {
    console.error("❌ README.md is out of date — run: node tools/gen-registry-tables.mjs");
    process.exit(1);
  }
  console.log("✓ README.md is up to date with accounts.json + deployments.json");
  process.exit(0);
}

writeFileSync(readmePath, md);
console.log(
  `✓ Regenerated ${Object.keys(blocks).length - missing.length} table blocks in README.md` +
    (missing.length ? ` (${missing.length} markers missing — add them)` : "")
);
