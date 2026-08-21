#!/usr/bin/env node
// mopoke — the little owl that watches your DNS.
// Usage:
//   mopoke --domain=example.com --record1=1.2.3.4 [--record2=...]
//   mopoke --domain1=example.com --record1=1.2.3.4 --domain2=www.example.com --record2=some.cname.target
// Each --recordN is an expected value (IP or CNAME target), checked against --domainN
// (or the single --domain if given). Green GOOD if it currently resolves, red NOT YET otherwise.

const dns = require("dns").promises;

const args = {};
for (const a of process.argv.slice(2)) {
  const m = a.match(/^--([^=]+)=(.+)$/);
  if (m) args[m[1]] = m[2];
}

const norm = (v) => v.toLowerCase().replace(/\.$/, "");
const checks = Object.keys(args)
  .filter((k) => /^record\d*$/.test(k))
  .sort()
  .map((k) => {
    const n = k.replace("record", "");
    const domain = args["domain" + n] || args.domain;
    return domain ? { domain: norm(domain), want: norm(args[k]) } : null;
  })
  .filter(Boolean);

if (checks.length === 0) {
  console.error("Usage: mopoke --domain1=example.com --record1=1.2.3.4 [--domain2=... --record2=...] [--interval=15]");
  process.exit(1);
}

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;

async function lookupAll(name) {
  const values = [];
  const tryResolve = async (fn) => {
    try { values.push(...(await fn)); } catch {}
  };
  await tryResolve(dns.resolve4(name));
  await tryResolve(dns.resolveCname(name));
  return values.map(norm);
}

const line = (ok, time, domain, want) =>
  `${ok ? green("GOOD   ") : red("NOT YET")}  last checked ${time}  ${domain} -> ${want}`;

let firstDraw = true;
const lastState = new Map();

async function check() {
  const time = new Date().toTimeString().slice(0, 8);
  const results = [];
  for (const { domain, want } of checks) {
    const current = await lookupAll(domain);
    results.push({ domain, want, ok: current.includes(want) });
  }

  // Move cursor back up over the live block so it redraws in place
  if (!firstDraw) process.stdout.write(`\x1b[${checks.length}A`);

  // Log a permanent line whenever a check changes state
  for (const r of results) {
    const key = `${r.domain}|${r.want}`;
    const prev = lastState.get(key);
    if (prev !== undefined && prev !== r.ok) {
      process.stdout.write(`\x1b[2K${r.ok ? green("CHANGED -> GOOD") : red("CHANGED -> NOT YET")}  at ${time}  ${r.domain} -> ${r.want}\n`);
    }
    lastState.set(key, r.ok);
  }

  for (const r of results) {
    process.stdout.write(`\x1b[2K${line(r.ok, time, r.domain, r.want)}\n`);
  }
  firstDraw = false;
}

check();
setInterval(check, (parseInt(args.interval, 10) || 15) * 1000);
