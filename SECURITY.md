# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within mopoke, please send an email
to [hello@teamharvey.co](mailto:hello@teamharvey.co). All security
vulnerabilities will be promptly addressed.

Please do not report security vulnerabilities through public GitHub issues.

## Supported Versions

Only the latest version is currently supported with security updates.

## Scope notes

mopoke is read-only by design: it resolves DNS records and prints to the
terminal. It has no runtime dependencies, makes no writes, and sends no
data anywhere. Anything that breaks those properties is a vulnerability.
