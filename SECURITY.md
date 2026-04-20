# Security Policy

## Supported versions

Security fixes are only applied to the latest major release line.

| Version | Supported          |
| ------- | ------------------ |
| 3.x     | :white_check_mark: |
| 2.x     | :x:                |
| < 2.0   | :x:                |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security reports.

Use GitHub's private vulnerability reporting instead:

→ [Report a vulnerability](https://github.com/coffee-and-fun/google-profanity-words/security/advisories/new)

We'll acknowledge your report within 7 days and keep you updated on the fix.
Once a patch is released, you'll be credited in the advisory (unless you prefer to stay anonymous).

## Scope

In scope:

- The `ProfanityEngine` runtime code in `index.js` and `src/`.
- The published data files in `data/`.
- The GitHub Actions workflows in `.github/workflows/`.

Out of scope:

- Issues in `devDependencies` only (Jest, Prettier) that don't affect the shipped package.
- The words themselves being offensive — that is, by design, the point of the library.
