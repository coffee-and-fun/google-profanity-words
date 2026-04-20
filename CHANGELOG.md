# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Future releases are managed by [Release Please](https://github.com/googleapis/release-please)
— entries are generated automatically from commit messages.

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
