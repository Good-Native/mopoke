# Mopoke

[![CI](https://github.com/Good-Native/mopoke/actions/workflows/ci.yml/badge.svg)](https://github.com/Good-Native/mopoke/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Watch DNS records until your cutover lands. Point mopoke at the values you
expect, and it polls quietly, redraws in place, and logs the exact moment
each record flips.

> Mopoke sits still through the night and calls when there's something to
> say. Named after the Australian boobook owl, known by the sound of its own
> call — *mo-poke… mo-poke*. Sibling to Bloom, Hover, Currawong, and
> Paperbark in the [Good Native](https://www.goodnative.co) family.

Built by the Good Native team in Castlemaine, Victoria, Australia.

## Usage

No install needed:

```sh
npx @good-native/mopoke --domain=example.com --record1=1.2.3.4
```

Watch multiple records at once:

```sh
npx @good-native/mopoke --domain1=example.com --record1=1.2.3.4 --domain2=www.example.com --record2=example.netlify.app
```

Output updates in place:

```text
GOOD     last checked 14:02:31  example.com -> 1.2.3.4
NOT YET  last checked 14:02:31  www.example.com -> example.netlify.app
```

When a check changes state, a permanent `CHANGED -> GOOD` line is logged
with the timestamp, so you know exactly when it flipped — even if you
wandered off to make a coffee.

### Options

| Flag                   | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `--domain=<name>`      | Domain applied to every `--recordN` (single-domain shorthand)      |
| `--domainN=<name>`     | Domain for check _N_                                               |
| `--recordN=<value>`    | Expected value for check _N_ — an IPv4 address or CNAME target     |
| `--interval=<seconds>` | Poll interval, default 15                                          |

A check passes if the expected value appears among the domain's current A
records or CNAME targets. Trailing dots and case are ignored.

## Install globally

```sh
npm install -g @good-native/mopoke
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Every PR needs a changelog entry;
merges to `main` auto-release and publish to npm.

## Licence

MIT © [Good-Native](https://github.com/Good-Native)
