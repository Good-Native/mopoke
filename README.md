# mopoke

*The little owl that watches your DNS.*

You've flipped a DNS record and now you're waiting for it to propagate, re-running `dig` like it owes you money. **mopoke** sits quietly, checks every 15 seconds, and sings out the moment your cutover lands.

Named after the [Australian boobook owl](https://en.wikipedia.org/wiki/Australian_boobook) — a small, patient night-watcher known by its call: *mo-poke… mo-poke…*

## Usage

No install needed:

```bash
npx mopoke --domain=example.com --record1=1.2.3.4
```

Watch multiple records at once:

```bash
npx mopoke --domain1=example.com --record1=1.2.3.4 --domain2=www.example.com --record2=example.netlify.app
```

Output updates in place:

```
GOOD     last checked 14:02:31  example.com -> 1.2.3.4
NOT YET  last checked 14:02:31  www.example.com -> example.netlify.app
```

When a check changes state, a permanent `CHANGED -> GOOD` line is logged with the timestamp, so you know exactly when it flipped — even if you wandered off to make coffee.

### Options

| Flag | Description |
| --- | --- |
| `--domain=<name>` | Domain applied to every `--recordN` (single-domain shorthand) |
| `--domainN=<name>` | Domain for check *N* |
| `--recordN=<value>` | Expected value for check *N* — an IPv4 address or CNAME target |
| `--interval=<seconds>` | Poll interval, default 15 |

A check passes if the expected value appears among the domain's current A records or CNAME targets. Trailing dots and case are ignored.

## Install globally

```bash
npm install -g mopoke
```

## License

MIT
