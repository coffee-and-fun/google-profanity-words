# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Future releases are managed by [Release Please](https://github.com/googleapis/release-please)
— entries are generated automatically from commit messages.

## [3.0.7](https://github.com/coffee-and-fun/google-profanity-words/compare/v3.0.6...v3.0.7) (2026-04-20)


### Bug Fixes

* New Release push ([10df62b](https://github.com/coffee-and-fun/google-profanity-words/commit/10df62b14ab600fd19329ffe35154e6313ae7650))

## [3.0.6](https://github.com/coffee-and-fun/google-profanity-words/compare/v3.0.5...v3.0.6) (2026-04-20)


### Bug Fixes

* 10 ([4dd44ab](https://github.com/coffee-and-fun/google-profanity-words/commit/4dd44ab52ac1b485b495ab45107206b17e8df3ac))
* patch 1 ([f3bfb65](https://github.com/coffee-and-fun/google-profanity-words/commit/f3bfb6577d6986d9ccea404245f031339247b758))

## [3.0.5](https://github.com/coffee-and-fun/google-profanity-words/compare/v3.0.4...v3.0.5) (2026-04-20)


### Bug Fixes

* 32 ([d9ae99a](https://github.com/coffee-and-fun/google-profanity-words/commit/d9ae99a9c5807bdd65e3edff7c0600e6c4ddf264))

## [3.0.4](https://github.com/coffee-and-fun/google-profanity-words/compare/v3.0.3...v3.0.4) (2026-04-20)


### Bug Fixes

* 333 ([385a5f7](https://github.com/coffee-and-fun/google-profanity-words/commit/385a5f7a6d185f2ac88ddb48bac87a29be58aec7))
* e ([37553a8](https://github.com/coffee-and-fun/google-profanity-words/commit/37553a8b73289c66c0377e2d2c9a5ec0c6dea797))

## [3.0.3](https://github.com/coffee-and-fun/google-profanity-words/compare/v3.0.2...v3.0.3) (2026-04-20)


### Bug Fixes

* 2 ([2dd5b74](https://github.com/coffee-and-fun/google-profanity-words/commit/2dd5b74dbe857b66a265424082f47d7a53598e18))

## [3.0.2](https://github.com/coffee-and-fun/google-profanity-words/compare/v3.0.1...v3.0.2) (2026-04-20)


### Bug Fixes

* updated release code ([0a5f08d](https://github.com/coffee-and-fun/google-profanity-words/commit/0a5f08d25f63d21ef493bf359c3c49d074151d43))

## [3.0.1](https://github.com/coffee-and-fun/google-profanity-words/compare/3.0.0...v3.0.1) (2026-04-20)


### Bug Fixes

* whtie space ([33aace3](https://github.com/coffee-and-fun/google-profanity-words/commit/33aace3341af3f59521a87ab043c659bd7e25965))

## [Unreleased]

### Changed
- Refactored internal code into focused modules under `src/`. Public API is unchanged.
- Added TypeScript declarations (`index.d.ts`) shipped with the package.
- Added `engines.node >=16`, `files` allow-list, and `exports` field.
- License corrected to MIT (previously mismatched between `package.json` and README).

### Added
- `SECURITY.md` with the supported-versions table and private reporting instructions.
- `LICENSE` file (MIT).

### Fixed
- Test assertions now match the actual English word count (962, was 958).

## [3.0.0] - 2024

### Added
- `ProfanityEngine` class with `language` and `testMode` configuration.
- `getCurseWords(sentence)` method that returns the unique list of matched words.
- Lazy initialization — word lists load on first use.
- Internal `Set` for O(1) lookups.

### Changed
- All check methods are now `async`.

## [2.0.0]

### Added
- Spanish language support.
- `search(word)` method for single-word lookups.
- Prettier formatting.

## [1.0.0]

### Added
- Initial release: English profanity word list and basic `hasCurseWords` / `all` API.
