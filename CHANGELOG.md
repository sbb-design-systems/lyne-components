# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.20.11](https://github.com/lyne-design-system/lyne-components/compare/v0.20.10...v0.20.11) (2023-01-04)

### Bug Fixes

- **sbb-tag:** fix styles ([#1516](https://github.com/lyne-design-system/lyne-components/issues/1516)) ([83c9b86](https://github.com/lyne-design-system/lyne-components/commit/83c9b86cea1fe171053b6ee18d30d245a8382155))

### [0.20.10](https://github.com/lyne-design-system/lyne-components/compare/v0.20.9...v0.20.10) (2023-01-04)

### Features

- **sbb-header, sbb-footer:** introduce wide / full width variant ([#1508](https://github.com/lyne-design-system/lyne-components/issues/1508)) ([6911ea9](https://github.com/lyne-design-system/lyne-components/commit/6911ea9d9c4e3865cf1318879388f45ee05df8ce)), closes [#1500](https://github.com/lyne-design-system/lyne-components/issues/1500)

### [0.20.9](https://github.com/lyne-design-system/lyne-components/compare/v0.20.8...v0.20.9) (2023-01-04)

### Bug Fixes

- **sbb-teaser:** fix focus visible border-radius ([#1519](https://github.com/lyne-design-system/lyne-components/issues/1519)) ([5b3f9a9](https://github.com/lyne-design-system/lyne-components/commit/5b3f9a9ff89d09042a9da8cf01b30d41d12dd58d))

### [0.20.8](https://github.com/lyne-design-system/lyne-components/compare/v0.20.7...v0.20.8) (2023-01-04)

### Bug Fixes

- **sbb-pearl-chain-vertical:** fix possibility to disable animation ([#1520](https://github.com/lyne-design-system/lyne-components/issues/1520)) ([565248c](https://github.com/lyne-design-system/lyne-components/commit/565248cdf24ac025ca21c39bd0a4831e1e567314))

### [0.20.7](https://github.com/lyne-design-system/lyne-components/compare/v0.20.6...v0.20.7) (2023-01-03)

### Bug Fixes

- **sbb-timetable-row:** enhance icon mapping ([#1517](https://github.com/lyne-design-system/lyne-components/issues/1517)) ([bafb4b6](https://github.com/lyne-design-system/lyne-components/commit/bafb4b6de067abed6c37b550f72dda76981cad79))

### [0.20.6](https://github.com/lyne-design-system/lyne-components/compare/v0.20.5...v0.20.6) (2023-01-03)

### Bug Fixes

- enhance timezone helper ([#1515](https://github.com/lyne-design-system/lyne-components/issues/1515)) ([c59f18e](https://github.com/lyne-design-system/lyne-components/commit/c59f18e886b361819441c9966de97e1f5f2493d6))

### [0.20.5](https://github.com/lyne-design-system/lyne-components/compare/v0.20.4...v0.20.5) (2022-12-23)

### Features

- **sbb-navigation:** introduce navigation component ([#1480](https://github.com/lyne-design-system/lyne-components/issues/1480)) ([953d0f4](https://github.com/lyne-design-system/lyne-components/commit/953d0f43ca51394471fffc1cbdd9336c786bb9c2))

### [0.20.4](https://github.com/lyne-design-system/lyne-components/compare/v0.20.3...v0.20.4) (2022-12-22)

### Bug Fixes

- **sbb-timetable-row:** improve notices ([#1513](https://github.com/lyne-design-system/lyne-components/issues/1513)) ([666aa54](https://github.com/lyne-design-system/lyne-components/commit/666aa54c4521c1e3004d77a128830f21b87da426))

### [0.20.3](https://github.com/lyne-design-system/lyne-components/compare/v0.20.2...v0.20.3) (2022-12-22)

### Features

- **sbb-tag:** initial implementation ([#1494](https://github.com/lyne-design-system/lyne-components/issues/1494)) ([cad9b0a](https://github.com/lyne-design-system/lyne-components/commit/cad9b0a7f6007b90b2ae1894c0ea2d7676bb0d53)), closes [#1467](https://github.com/lyne-design-system/lyne-components/issues/1467)

### [0.20.2](https://github.com/lyne-design-system/lyne-components/compare/v0.20.1...v0.20.2) (2022-12-22)

### Features

- add link, legend, sub and sup mixins ([#1506](https://github.com/lyne-design-system/lyne-components/issues/1506)) ([e9e92a1](https://github.com/lyne-design-system/lyne-components/commit/e9e92a1d6dcb01240c6eaaebfe889e89ea670664)), closes [#1505](https://github.com/lyne-design-system/lyne-components/issues/1505)

### Bug Fixes

- **sbb-train-formation:** minor fixes ([#1512](https://github.com/lyne-design-system/lyne-components/issues/1512)) ([041b3c6](https://github.com/lyne-design-system/lyne-components/commit/041b3c63ac577f064493e2e21c2de9979e96a3e1))

### [0.20.1](https://github.com/lyne-design-system/lyne-components/compare/v0.20.0...v0.20.1) (2022-12-21)

### Bug Fixes

- **sbb-button:** fix active state and secondary colors ([#1507](https://github.com/lyne-design-system/lyne-components/issues/1507)) ([80a5c7f](https://github.com/lyne-design-system/lyne-components/commit/80a5c7f909dd12814fc3fc8845d053ac2a882c92)), closes [#1499](https://github.com/lyne-design-system/lyne-components/issues/1499)

## [0.20.0](https://github.com/lyne-design-system/lyne-components/compare/v0.19.7...v0.20.0) (2022-12-20)

### ⚠ BREAKING CHANGES

- Title mixins and <sbb-title>-component now have a default margin block to meet design specs. In the mixin you can opt out by passing the flag $exclude-spacing with true (e.g. @include text-1($exclude-spacing: true)).
  In the sbb-title component you can just set any margin from outside on the <sbb-title> itself, e.g. <sbb-title style='margin:0'>.

### Features

- add default title margins ([#1476](https://github.com/lyne-design-system/lyne-components/issues/1476)) ([78cb161](https://github.com/lyne-design-system/lyne-components/commit/78cb1618cd63711c1c7979e334de62df63e2e785))

### [0.19.7](https://github.com/lyne-design-system/lyne-components/compare/v0.19.6...v0.19.7) (2022-12-20)

### Bug Fixes

- **sbb-train-formation:** fix colors, icon size and translations ([#1502](https://github.com/lyne-design-system/lyne-components/issues/1502)) ([c2a26bd](https://github.com/lyne-design-system/lyne-components/commit/c2a26bda728e1bf7a17e73eb23eb1cf381b30f44))

### [0.19.6](https://github.com/lyne-design-system/lyne-components/compare/v0.19.5...v0.19.6) (2022-12-20)

### Bug Fixes

- **sbb-pearl-chain:** use min-width to prevent squeezing ([#1504](https://github.com/lyne-design-system/lyne-components/issues/1504)) ([80965d0](https://github.com/lyne-design-system/lyne-components/commit/80965d0a4117a9db80702c944cf21281fc9aaa31))

### [0.19.5](https://github.com/lyne-design-system/lyne-components/compare/v0.19.4...v0.19.5) (2022-12-19)

### [0.19.4](https://github.com/lyne-design-system/lyne-components/compare/v0.19.3...v0.19.4) (2022-12-19)

### [0.19.3](https://github.com/lyne-design-system/lyne-components/compare/v0.19.2...v0.19.3) (2022-12-19)

### [0.19.2](https://github.com/lyne-design-system/lyne-components/compare/v0.19.1...v0.19.2) (2022-12-15)

### Bug Fixes

- exclude chromatic stories for documentation ([#1498](https://github.com/lyne-design-system/lyne-components/issues/1498)) ([ee94370](https://github.com/lyne-design-system/lyne-components/commit/ee94370a3b8c424ed2b90f7b5435155b1675ade8))

### [0.19.1](https://github.com/lyne-design-system/lyne-components/compare/v0.19.0...v0.19.1) (2022-12-15)

### Features

- **sbb-train-formation:** initial implementation ([#1462](https://github.com/lyne-design-system/lyne-components/issues/1462)) ([343f510](https://github.com/lyne-design-system/lyne-components/commit/343f510d3593860fbae0aba12a90b823c8c062a6)), closes [#1428](https://github.com/lyne-design-system/lyne-components/issues/1428)

## [0.19.0](https://github.com/lyne-design-system/lyne-components/compare/v0.18.4...v0.19.0) (2022-12-15)

### ⚠ BREAKING CHANGES

- As it is not possible from shadow DOM to reach the light DOM by id values, we removed all id, accessibility-labelledby, accessibility-describedby and accessibility-controls properties because they were usless.

Co-authored-by: Jeremias Peier <jeremias.peier@sbb.ch>

### Bug Fixes

- remove obsolete id references ([#1493](https://github.com/lyne-design-system/lyne-components/issues/1493)) ([f442283](https://github.com/lyne-design-system/lyne-components/commit/f4422830a74816fe76180394dc80561403746d47))

### [0.18.4](https://github.com/lyne-design-system/lyne-components/compare/v0.18.3...v0.18.4) (2022-12-14)

### Bug Fixes

- **sbb-timetable-row:** fix px-to-rem usage ([#1497](https://github.com/lyne-design-system/lyne-components/issues/1497)) ([4f53b70](https://github.com/lyne-design-system/lyne-components/commit/4f53b70e92f8cc611cc4122852f1cb704329ba2f))

### [0.18.3](https://github.com/lyne-design-system/lyne-components/compare/v0.18.2...v0.18.3) (2022-12-14)

### Bug Fixes

- **sbb-form-field:** fix border radius for size L ([#1496](https://github.com/lyne-design-system/lyne-components/issues/1496)) ([120c507](https://github.com/lyne-design-system/lyne-components/commit/120c5076e1695abca07a52e1e46c5b96d3f40d70))

### [0.18.2](https://github.com/lyne-design-system/lyne-components/compare/v0.18.1...v0.18.2) (2022-12-13)

### Bug Fixes

- **sbb-card:** stretch height to host ([#1495](https://github.com/lyne-design-system/lyne-components/issues/1495)) ([fdb0ba8](https://github.com/lyne-design-system/lyne-components/commit/fdb0ba86c862f3e64e7ddc77ae2d3da2406ba29d))

### [0.18.1](https://github.com/lyne-design-system/lyne-components/compare/v0.18.0...v0.18.1) (2022-12-12)

### Bug Fixes

- arrow navigation refactoring ([#1485](https://github.com/lyne-design-system/lyne-components/issues/1485)) ([160bd21](https://github.com/lyne-design-system/lyne-components/commit/160bd21e716d0a6e4a61f1490c6971dc6043f95f))

## [0.18.0](https://github.com/lyne-design-system/lyne-components/compare/v0.17.0...v0.18.0) (2022-12-12)

### ⚠ BREAKING CHANGES

- Text line-height (--sbb-typo-line-height-body-text) has changed from 1.7 to 1.75

### Bug Fixes

- change line-height from 1.7 to 1.75 ([#1484](https://github.com/lyne-design-system/lyne-components/issues/1484)) ([1e26b15](https://github.com/lyne-design-system/lyne-components/commit/1e26b15e940f8027fd385bd515a226c599aab51e))

## [0.17.0](https://github.com/lyne-design-system/lyne-components/compare/v0.16.2...v0.17.0) (2022-12-08)

### ⚠ BREAKING CHANGES

- In order to standardize mixin names, all mixin names were renamed to kebab-case style.
  E.g. `ifForcedColors` became `if-forced-colors`.

- rename all mixins to kebab-case notation ([#1489](https://github.com/lyne-design-system/lyne-components/issues/1489)) ([c867749](https://github.com/lyne-design-system/lyne-components/commit/c867749846751c85f31b06c714bdf643ea3cd91c))

### [0.16.2](https://github.com/lyne-design-system/lyne-components/compare/v0.16.1...v0.16.2) (2022-12-07)

### Bug Fixes

- fix times for chromatic tests ([#1490](https://github.com/lyne-design-system/lyne-components/issues/1490)) ([baf9556](https://github.com/lyne-design-system/lyne-components/commit/baf9556483b17cb02a4bffc1b6524ee4991a360a))

### [0.16.1](https://github.com/lyne-design-system/lyne-components/compare/v0.16.0...v0.16.1) (2022-12-07)

### Bug Fixes

- **sbb-journey-summary:** enable configuration of current date ([#1487](https://github.com/lyne-design-system/lyne-components/issues/1487)) ([1c72cc4](https://github.com/lyne-design-system/lyne-components/commit/1c72cc4c89973f53e82086b839d29a3bed99033d))

## [0.16.0](https://github.com/lyne-design-system/lyne-components/compare/v0.15.9...v0.16.0) (2022-12-06)

### ⚠ BREAKING CHANGES

- Previously the sass code could be used via `@import`.
  This is no longer possible as we refactored the sass code to switch
  from `@import` to `@use` (see https://sass-lang.com/documentation/at-rules/use).
  You should now be able to use the following code to import
  our sass code: `@use '@sbb-esta/lyne-components' as sbb;`.

- adapt sass to [@use](https://github.com/use) instead of [@import](https://github.com/import) ([#1482](https://github.com/lyne-design-system/lyne-components/issues/1482)) ([219d68c](https://github.com/lyne-design-system/lyne-components/commit/219d68c101a746a1671f9a8ff9c8dba63018f63f))

### [0.15.9](https://github.com/lyne-design-system/lyne-components/compare/v0.15.8...v0.15.9) (2022-12-06)

### Bug Fixes

- fix timetable data ([#1474](https://github.com/lyne-design-system/lyne-components/issues/1474)) ([5bba303](https://github.com/lyne-design-system/lyne-components/commit/5bba3038b83dbf5e17e9bcfcce52cf417c0248d5))

### [0.15.8](https://github.com/lyne-design-system/lyne-components/compare/v0.15.7...v0.15.8) (2022-12-05)

### [0.15.7](https://github.com/lyne-design-system/lyne-components/compare/v0.15.6...v0.15.7) (2022-12-01)

### Bug Fixes

- **sbb-toggle-check:** fix toggle vertical alignment ([#1461](https://github.com/lyne-design-system/lyne-components/issues/1461)) ([e59239c](https://github.com/lyne-design-system/lyne-components/commit/e59239c89deee8727e83cff0148097ec111ca006))

### Documentation

- **sbb-dialog:** add an example of sbb-dialog-close attribute ([#1475](https://github.com/lyne-design-system/lyne-components/issues/1475)) ([13d7f09](https://github.com/lyne-design-system/lyne-components/commit/13d7f09196608013ad8f04ff21278b72fb3cf84f))

### [0.15.6](https://github.com/lyne-design-system/lyne-components/compare/v0.15.5...v0.15.6) (2022-12-01)

### Bug Fixes

- provide didChange event for react consumers ([#1472](https://github.com/lyne-design-system/lyne-components/issues/1472)) ([de71bda](https://github.com/lyne-design-system/lyne-components/commit/de71bdab7513359dda9d75c8bee2f52cc4132a88))

### [0.15.5](https://github.com/lyne-design-system/lyne-components/compare/v0.15.4...v0.15.5) (2022-11-29)

### [0.15.4](https://github.com/lyne-design-system/lyne-components/compare/v0.15.3...v0.15.4) (2022-11-29)

### Bug Fixes

- remove Firefox focus outline rule from normalize ([#1471](https://github.com/lyne-design-system/lyne-components/issues/1471)) ([3b61a40](https://github.com/lyne-design-system/lyne-components/commit/3b61a40923463db12edfb87509c7e7f25ad3df5f))

### Documentation

- fix snippets in readme ([#1470](https://github.com/lyne-design-system/lyne-components/issues/1470)) ([0b62fc5](https://github.com/lyne-design-system/lyne-components/commit/0b62fc5c33b5cfa81aa1343f064653fedbf03601))

### [0.15.3](https://github.com/lyne-design-system/lyne-components/compare/v0.15.2...v0.15.3) (2022-11-29)

### Features

- **styles:** list styles ([#1450](https://github.com/lyne-design-system/lyne-components/issues/1450)) ([b6b696e](https://github.com/lyne-design-system/lyne-components/commit/b6b696e023d78ec3be6995701f2b5fea2fafb439))

### [0.15.2](https://github.com/lyne-design-system/lyne-components/compare/v0.15.1...v0.15.2) (2022-11-28)

### [0.15.1](https://github.com/lyne-design-system/lyne-components/compare/v0.15.0...v0.15.1) (2022-11-28)

### Bug Fixes

- **sbb-radio-button:** remove red dot on low resolution screens ([#1469](https://github.com/lyne-design-system/lyne-components/issues/1469)) ([8854dc0](https://github.com/lyne-design-system/lyne-components/commit/8854dc0c029de614ee12d5f5128d2ed31279eecc))

## [0.15.0](https://github.com/lyne-design-system/lyne-components/compare/v0.14.5...v0.15.0) (2022-11-28)

### ⚠ BREAKING CHANGES

- Event name prefixes are removed (e.g `sbb-alert-group_did-dismiss-alert` was renamed to `did-dismiss-alert`). If it is necessary to determine which element is the event origin, check the event context (e.g. event.target).

### Features

- remove event name prefixes ([#1466](https://github.com/lyne-design-system/lyne-components/issues/1466)) ([cdb5962](https://github.com/lyne-design-system/lyne-components/commit/cdb59620e07582e3c6887feaecca4f30bfbcaffa))

### [0.14.5](https://github.com/lyne-design-system/lyne-components/compare/v0.14.4...v0.14.5) (2022-11-24)

### Features

- **sbb-icon:** add pictogram namespace ([#1463](https://github.com/lyne-design-system/lyne-components/issues/1463)) ([fcd2750](https://github.com/lyne-design-system/lyne-components/commit/fcd275003cf57ccb4b88e0faa616ccef5732470b))

### [0.14.4](https://github.com/lyne-design-system/lyne-components/compare/v0.14.3...v0.14.4) (2022-11-23)

### Features

- **sbb-checkbox:** component implementation ([#1294](https://github.com/lyne-design-system/lyne-components/issues/1294)) ([3599d6e](https://github.com/lyne-design-system/lyne-components/commit/3599d6e0d208bd085d9656b34293f6152dc73b19))

### [0.14.3](https://github.com/lyne-design-system/lyne-components/compare/v0.14.2...v0.14.3) (2022-11-18)

### Features

- **sbb-radio-button-group:** introduce radio-button-group component ([#1431](https://github.com/lyne-design-system/lyne-components/issues/1431)) ([3296198](https://github.com/lyne-design-system/lyne-components/commit/32961986f0431763d8b5d029f3ad1d17b9e1bbfe))

### [0.14.2](https://github.com/lyne-design-system/lyne-components/compare/v0.14.1...v0.14.2) (2022-11-17)

### Bug Fixes

- **sbb-timetable-row:** handle occupancy error ([#1460](https://github.com/lyne-design-system/lyne-components/issues/1460)) ([2456430](https://github.com/lyne-design-system/lyne-components/commit/2456430df1f656eb5ade62d417ddb6125d12b3a0))

### [0.14.1](https://github.com/lyne-design-system/lyne-components/compare/v0.14.0...v0.14.1) (2022-11-17)

### Bug Fixes

- set color in button-reset mixin to avoid iOS blue color ([#1459](https://github.com/lyne-design-system/lyne-components/issues/1459)) ([f868190](https://github.com/lyne-design-system/lyne-components/commit/f8681904c25d49b1efdbc1d9f9af1d26f8e8d993))

## [0.14.0](https://github.com/lyne-design-system/lyne-components/compare/v0.13.2...v0.14.0) (2022-11-17)

### ⚠ BREAKING CHANGES

- **sbb-signet:** - sbb-logo no longer has different color variants

* sbb-signet no longer white-on-black variant

- **sbb-signet:** adapt to coding standards ([#1457](https://github.com/lyne-design-system/lyne-components/issues/1457)) ([d9ca1a4](https://github.com/lyne-design-system/lyne-components/commit/d9ca1a4b3499b9e9cc5dbf2f32986ba4078ddd9f))

### [0.13.2](https://github.com/lyne-design-system/lyne-components/compare/v0.13.1...v0.13.2) (2022-11-17)

### [0.13.1](https://github.com/lyne-design-system/lyne-components/compare/v0.13.0...v0.13.1) (2022-11-16)

### Features

- **sbb-slider:** component implementation ([#1426](https://github.com/lyne-design-system/lyne-components/issues/1426)) ([4ad9ef9](https://github.com/lyne-design-system/lyne-components/commit/4ad9ef9ef53e17548952fccc2df566928ee2eef4))

## [0.13.0](https://github.com/lyne-design-system/lyne-components/compare/v0.12.19...v0.13.0) (2022-11-15)

### ⚠ BREAKING CHANGES

- **sbb-menu:** \*\*
  Use `open` for opening overlays and `close` for closing overlays. The methods `present()` and `dismiss()` become `open()` and `close()`; the tooltip properties `showDelay` and `hideDelay` become `openDelay` and `closeDelay`.

- **sbb-menu:** rename opening and closing methods ([#1456](https://github.com/lyne-design-system/lyne-components/issues/1456)) ([50e7120](https://github.com/lyne-design-system/lyne-components/commit/50e712047709cdd261be5daf760b23afd883a80c))

### [0.12.19](https://github.com/lyne-design-system/lyne-components/compare/v0.12.18...v0.12.19) (2022-11-15)

### Bug Fixes

- **sbb-pearl-chain-vertical:** add width to columns ([#1455](https://github.com/lyne-design-system/lyne-components/issues/1455)) ([9943ba9](https://github.com/lyne-design-system/lyne-components/commit/9943ba9050847f2fd5f196a916b6f56ede6bb606))

### [0.12.18](https://github.com/lyne-design-system/lyne-components/compare/v0.12.17...v0.12.18) (2022-11-14)

### Features

- **sbb-dialog:** add `sbb-dialog-close` attribute option to close the dialog ([#1454](https://github.com/lyne-design-system/lyne-components/issues/1454)) ([92200a5](https://github.com/lyne-design-system/lyne-components/commit/92200a500124659502541893a572c7735a40ce14))

### [0.12.17](https://github.com/lyne-design-system/lyne-components/compare/v0.12.16...v0.12.17) (2022-11-11)

### Features

- **sbb-tooltip:** introduce sbb-tooltip component ([#1425](https://github.com/lyne-design-system/lyne-components/issues/1425)) ([ceadf7f](https://github.com/lyne-design-system/lyne-components/commit/ceadf7f8d63280765286c96de383f763e7681247))

### [0.12.16](https://github.com/lyne-design-system/lyne-components/compare/v0.12.15...v0.12.16) (2022-11-09)

### Features

- **sbb-pearl-chain-vertical:** initial implementation ([#1366](https://github.com/lyne-design-system/lyne-components/issues/1366)) ([d36a40f](https://github.com/lyne-design-system/lyne-components/commit/d36a40fdb0ff2d8aedd349a116fbf71dc8b001e7))

### [0.12.15](https://github.com/lyne-design-system/lyne-components/compare/v0.12.14...v0.12.15) (2022-11-08)

### [0.12.14](https://github.com/lyne-design-system/lyne-components/compare/v0.12.13...v0.12.14) (2022-11-08)

### Features

- **sbb-dialog:** introduce sbb-dialog component ([#1413](https://github.com/lyne-design-system/lyne-components/issues/1413)) ([3cce10e](https://github.com/lyne-design-system/lyne-components/commit/3cce10ed35e49193057fce49af5a628a43af12d9))

### [0.12.13](https://github.com/lyne-design-system/lyne-components/compare/v0.12.12...v0.12.13) (2022-11-07)

### [0.12.12](https://github.com/lyne-design-system/lyne-components/compare/v0.12.11...v0.12.12) (2022-11-04)

### [0.12.11](https://github.com/lyne-design-system/lyne-components/compare/v0.12.10...v0.12.11) (2022-11-03)

### [0.12.10](https://github.com/lyne-design-system/lyne-components/compare/v0.12.9...v0.12.10) (2022-11-03)

### Bug Fixes

- wait for ready for storybook interactions ([#1443](https://github.com/lyne-design-system/lyne-components/issues/1443)) ([36c7979](https://github.com/lyne-design-system/lyne-components/commit/36c79790501ae807f5ac76b21f9772628f65f0a7))

### [0.12.9](https://github.com/lyne-design-system/lyne-components/compare/v0.12.8...v0.12.9) (2022-11-03)

### Bug Fixes

- typescript error ([#1444](https://github.com/lyne-design-system/lyne-components/issues/1444)) ([46226fc](https://github.com/lyne-design-system/lyne-components/commit/46226fcb82e497c62183b627517ae16a8820e70b))

### [0.12.8](https://github.com/lyne-design-system/lyne-components/compare/v0.12.7...v0.12.8) (2022-11-01)

### [0.12.7](https://github.com/lyne-design-system/lyne-components/compare/v0.12.6...v0.12.7) (2022-11-01)

### Features

- **sbb-journey-summary:** initial implementation ([#1359](https://github.com/lyne-design-system/lyne-components/issues/1359)) ([138d1b2](https://github.com/lyne-design-system/lyne-components/commit/138d1b241b00e4a424473bd3de8e372e5b6c9c01))

### [0.12.6](https://github.com/lyne-design-system/lyne-components/compare/v0.12.5...v0.12.6) (2022-11-01)

### Bug Fixes

- fix layout offset for micro size ([#1441](https://github.com/lyne-design-system/lyne-components/issues/1441)) ([a5aeebb](https://github.com/lyne-design-system/lyne-components/commit/a5aeebbf294a7972f5f1e0ade5090794c5a5aaae))

### [0.12.5](https://github.com/lyne-design-system/lyne-components/compare/v0.12.4...v0.12.5) (2022-10-31)

### Features

- enhance timetable-row and pearl-chain ([5479769](https://github.com/lyne-design-system/lyne-components/commit/5479769f544e0fb3e58f1818c54da66bda7e4040))

### Bug Fixes

- add app permission for release ([5fee7fa](https://github.com/lyne-design-system/lyne-components/commit/5fee7fa7fddd9797ac95bda15352bc02d4f4aef3))
- use correct output for release ([19cf257](https://github.com/lyne-design-system/lyne-components/commit/19cf25735e9910bd4a27bce39a3b577eed8c8c3c))

### 0.12.4 (2022-10-28)

### 0.12.3 (2022-10-28)

### Bug Fixes

- **sbb-clock:** avoid using unset properties ([#1438](https://github.com/lyne-design-system/lyne-components/issues/1438)) ([6ef7e18](https://github.com/lyne-design-system/lyne-components/commit/6ef7e188f46bc2c0254bc288a4a9d047da41deaa))

### 0.12.2 (2022-10-28)

### Bug Fixes

- **sbb-button:** fix border size for size m variant ([#1437](https://github.com/lyne-design-system/lyne-components/issues/1437)) ([7fcd384](https://github.com/lyne-design-system/lyne-components/commit/7fcd384036f4cb131d2dc238b05be8f4c9b99a99))

### 0.12.1 (2022-10-26)

### Features

- **sbb-header:** component implementation ([#1357](https://github.com/lyne-design-system/lyne-components/issues/1357)) ([1b847ab](https://github.com/lyne-design-system/lyne-components/commit/1b847ab92d8abb06f3fafd2b432ddd07d41f9136))

## 0.12.0 (2022-10-26)

### ⚠ BREAKING CHANGES

- **sbb-footer:** Removed column and bottom slot. The footer has now 2 variations. Default and clock-columns. Default displays every slotted content as blocks and clock-columns use a css-grid.

- **sbb-footer:** general refactoring ([#1409](https://github.com/lyne-design-system/lyne-components/issues/1409)) ([be1e8cc](https://github.com/lyne-design-system/lyne-components/commit/be1e8cc59291f23aeecf79ed151744d564696f88))

### 0.11.2 (2022-10-26)

### 0.11.1 (2022-10-26)

## 0.11.0 (2022-10-26)

### ⚠ BREAKING CHANGES

- Custom click events on action elements were removed
  (e.g. `sbb-button_click`, `sbb-link_click`, ...).
  Please read the property target of the emitted event if you are interested from where an event was triggered.

### Features

- forward focus on host and remove redundant click events ([#1427](https://github.com/lyne-design-system/lyne-components/issues/1427)) ([52b230f](https://github.com/lyne-design-system/lyne-components/commit/52b230fc9f62e193b1eee27b6bb383674f003b3f))

### 0.10.1 (2022-10-25)

### Bug Fixes

- **sbb-pearl-chain, sbb-pearl-chain-time:** relative datetime in stories ([#1423](https://github.com/lyne-design-system/lyne-components/issues/1423)) ([5d21890](https://github.com/lyne-design-system/lyne-components/commit/5d218900687aa81e7b1d64119fc3774608d98d49))

## 0.10.0 (2022-10-25)

### ⚠ BREAKING CHANGES

- Every property called idValue was renamed to ${componentName}Id
  as documented in CODING_STANDARDS.md. The following components
  are affected: sbb-button, sbb-card, sbb-card-product, sbb-link, sbb-teaser-hero.

- rename idValue properties to specific names ([#1421](https://github.com/lyne-design-system/lyne-components/issues/1421)) ([181735d](https://github.com/lyne-design-system/lyne-components/commit/181735d40be4f4d213c30db6f52bf64e7025f3f7))

### 0.9.16 (2022-10-25)

### 0.9.15 (2022-10-24)

### 0.9.14 (2022-10-21)

### Bug Fixes

- typescript compilation error ([#1416](https://github.com/lyne-design-system/lyne-components/issues/1416)) ([ee15959](https://github.com/lyne-design-system/lyne-components/commit/ee159599b79f51467320f40b230cb7ed8f6ba511))

### 0.9.13 (2022-10-19)

### Features

- add experimental sass output ([#1412](https://github.com/lyne-design-system/lyne-components/issues/1412)) ([3ab884f](https://github.com/lyne-design-system/lyne-components/commit/3ab884fdd05a68547f2a8db9bccd6176c14aa1bf))

### 0.9.12 (2022-10-18)

### Features

- **sbb-menu:** introduce sbb-menu component ([#1378](https://github.com/lyne-design-system/lyne-components/issues/1378)) ([4ee0c78](https://github.com/lyne-design-system/lyne-components/commit/4ee0c781a52cfbe13ab03d8cb790b3cb85ffd208))

### 0.9.11 (2022-10-18)

### Bug Fixes

- avoid finding element itself in `hostContext()` method ([#1405](https://github.com/lyne-design-system/lyne-components/issues/1405)) ([b0caab6](https://github.com/lyne-design-system/lyne-components/commit/b0caab66fd7ac4338bd786ef32c12ec19c9deea6))

### 0.9.10 (2022-10-12)

### 0.9.9 (2022-10-12)

### Features

- **sbb-action-group:** initial implementation ([#1391](https://github.com/lyne-design-system/lyne-components/issues/1391)) ([e9be87f](https://github.com/lyne-design-system/lyne-components/commit/e9be87fb9401f52a6b22016454f93fc9e3a7ddd6)), closes [#1368](https://github.com/lyne-design-system/lyne-components/issues/1368)

### 0.9.8 (2022-10-12)

### Features

- **sbb-teaser:** allow image size to be configured ([#1407](https://github.com/lyne-design-system/lyne-components/issues/1407)) ([7894d00](https://github.com/lyne-design-system/lyne-components/commit/7894d00455a8cb0c52a8f273d2d30f257d4e07eb))

### 0.9.7 (2022-10-11)

### Features

- add possibility to submit forms with sbb-button/sbb-link ([#1403](https://github.com/lyne-design-system/lyne-components/issues/1403)) ([52cdd0f](https://github.com/lyne-design-system/lyne-components/commit/52cdd0f3786b3adb2bbb460ea28f9bd0aa1bc6d4))

### 0.9.6 (2022-10-10)

### 0.9.5 (2022-10-07)

### Features

- improvement in LinkButtonProperties interface ([#1398](https://github.com/lyne-design-system/lyne-components/issues/1398)) ([433fddc](https://github.com/lyne-design-system/lyne-components/commit/433fddcd4df24e3325ae0b291a849547ca1e0139))

### 0.9.4 (2022-10-07)

### Features

- add removeTimezoneFromDate as a helper function ([#1402](https://github.com/lyne-design-system/lyne-components/issues/1402)) ([06850c8](https://github.com/lyne-design-system/lyne-components/commit/06850c8bb8f04a2f21f3e604d9e8245d64762ca7))

### 0.9.3 (2022-10-06)

### 0.9.2 (2022-10-06)

### Bug Fixes

- **sbb-link:** expand clickable area in block variant ([#1394](https://github.com/lyne-design-system/lyne-components/issues/1394)) ([b0fe962](https://github.com/lyne-design-system/lyne-components/commit/b0fe962b3b3f8689af46ef692aca71f51c3e5926)), closes [#1387](https://github.com/lyne-design-system/lyne-components/issues/1387)

### 0.9.1 (2022-10-06)

## 0.9.0 (2022-10-05)

### ⚠ BREAKING CHANGES

- **sbb-alert:** Property `inanimate` of sbb-alert was renamed to `disable-animation`.

- **sbb-alert:** rename property `inanimate` to `disable-animation` ([#1397](https://github.com/lyne-design-system/lyne-components/issues/1397)) ([1bc4a31](https://github.com/lyne-design-system/lyne-components/commit/1bc4a31016f2496cdfbd6515095bd1a7254c2fd4))

## 0.8.0 (2022-10-05)

### ⚠ BREAKING CHANGES

- **sbb-button:** - API of sbb-button changed.

* sbb-link-button removed

Co-authored-by: Sébastien Closs <sebastien.closs@one-inside.com>
Co-authored-by: Hendrik Wernze <hendrik.wernze@sbb.ch>
Co-authored-by: Lukas Spirig <lukas.spirig@sbb.ch>
Co-authored-by: Jeremias Peier <jeremias.peier@sbb.ch>

- **sbb-button:** cleanup and adapt to new api ([#1328](https://github.com/lyne-design-system/lyne-components/issues/1328)) ([b2c41f5](https://github.com/lyne-design-system/lyne-components/commit/b2c41f5d75089563b56d6bd9a26f0d944910e5f7)), closes [#1131](https://github.com/lyne-design-system/lyne-components/issues/1131)

### 0.7.6 (2022-10-05)

### Bug Fixes

- **sbb-logo:** display logo on Safari ([#1395](https://github.com/lyne-design-system/lyne-components/issues/1395)) ([9fee782](https://github.com/lyne-design-system/lyne-components/commit/9fee782ba0774958bddf301a263677452479c676))

### 0.7.5 (2022-10-03)

### 0.7.4 (2022-09-29)

### Bug Fixes

- **sbb-card:** correct animation duration ([#1390](https://github.com/lyne-design-system/lyne-components/issues/1390)) ([5972346](https://github.com/lyne-design-system/lyne-components/commit/5972346e2dcdf63db2f5d22b80296e886fce9bb4))

### 0.7.3 (2022-09-29)

### 0.7.2 (2022-09-28)

### Bug Fixes

- **sbb-card:** use correct import in story ([7f92b67](https://github.com/lyne-design-system/lyne-components/commit/7f92b67112cd69f9d4557ce7cc3c1072415a0431))

### 0.7.1 (2022-09-22)

### Features

- **sbb-alert:** initial implementation ([#1284](https://github.com/lyne-design-system/lyne-components/issues/1284)) ([5b0309c](https://github.com/lyne-design-system/lyne-components/commit/5b0309c6d8395d40347bf1ac143851723f4f5dc7))

## 0.7.0 (2022-09-21)

### ⚠ BREAKING CHANGES

- **sbb-link-list:** - rename prop titleText to titleContent

* rename prop listDirection to horizontalFrom
* replace old approach for negativ variant with new pattern (boolean instead of variant)
* add a named slot of title to sbb-link-list to either pass markup or text content to the containing sbb-title component
* rework the internal slotted sbb-link instances handling completely
* remove button slot from link-list

- **sbb-link-list:** review/refactor ([#1329](https://github.com/lyne-design-system/lyne-components/issues/1329)) ([bd6f091](https://github.com/lyne-design-system/lyne-components/commit/bd6f091d907a10f32bc43b924f709bba148c75fa)), closes [#1238](https://github.com/lyne-design-system/lyne-components/issues/1238)

### 0.6.8 (2022-09-21)

### Features

- add new text size l ([#1383](https://github.com/lyne-design-system/lyne-components/issues/1383)) ([fd1b915](https://github.com/lyne-design-system/lyne-components/commit/fd1b915c6252aad1deae85718649900da94f8d96))

### 0.6.7 (2022-09-16)

### Bug Fixes

- distribute the react package as commonjs ([532280c](https://github.com/lyne-design-system/lyne-components/commit/532280c4ba3c1d6360dab40067eedab874bb59ad))

### 0.6.6 (2022-09-16)

### Bug Fixes

- add type module for react package ([5d5ff5e](https://github.com/lyne-design-system/lyne-components/commit/5d5ff5e12c087d258a21fe0166db2e3a429653cd))

### 0.6.5 (2022-09-15)

### 0.6.4 (2022-09-15)

### 0.6.3 (2022-09-15)

### Bug Fixes

- adapt release process ([3e83e81](https://github.com/lyne-design-system/lyne-components/commit/3e83e81edadc28d9045120ad6751b7f46d332796))

### 0.6.2 (2022-09-06)

### Bug Fixes

- **sbb-link:** fix accessibility of external links ([#1372](https://github.com/lyne-design-system/lyne-components/issues/1372)) ([e371af8](https://github.com/lyne-design-system/lyne-components/commit/e371af8a9058c04e3c206fa5b4dc3508d1381367))

### 0.6.1 (2022-09-06)

### Bug Fixes

- **sbb-link:** fix placement of slotted icon ([#1371](https://github.com/lyne-design-system/lyne-components/issues/1371)) ([d70e1f8](https://github.com/lyne-design-system/lyne-components/commit/d70e1f8a257121724164470007f9f618bd97d626))

## 0.6.0 (2022-09-05)

### ⚠ BREAKING CHANGES

- The link does not anymore himself decides to set target="\_blank". It's now up to the consumer to decide if a link should be opened in a new window.

- refine link button properties interfaces ([#1367](https://github.com/lyne-design-system/lyne-components/issues/1367)) ([d0b30aa](https://github.com/lyne-design-system/lyne-components/commit/d0b30aa1fbf019b70b96291e53206e6a4faf332c))

### 0.5.4 (2022-09-01)

### Bug Fixes

- define compilation target for bundled storybook stories ([e3b2494](https://github.com/lyne-design-system/lyne-components/commit/e3b2494e21635c02a52bcbe10b283c9a05dcaef5))

### 0.5.3 (2022-09-01)

### Bug Fixes

- **sbb-link:** fix normalize button styles to not interfere with sbb-link in Safari ([#1365](https://github.com/lyne-design-system/lyne-components/issues/1365)) ([2b417f1](https://github.com/lyne-design-system/lyne-components/commit/2b417f102b16f767d6bb7491f25cbad457fc0bec))

### 0.5.2 (2022-08-31)

### Bug Fixes

- create release ([4848646](https://github.com/lyne-design-system/lyne-components/commit/4848646c779f24176c06e4e15b58e0090b7cd2e7))

### 0.5.1 (2022-08-30)

### Bug Fixes

- **sbb-form-field:** enable click on select arrow ([#1356](https://github.com/lyne-design-system/lyne-components/issues/1356)) ([91a52a7](https://github.com/lyne-design-system/lyne-components/commit/91a52a70d4c0e5d42ebca731d381c25667b53cfe))

## 0.5.0 (2022-08-30)

### ⚠ BREAKING CHANGES

- **sbb-form-field:** - Removes the `sbb-input-text` and replaces it with `sbb-form-field`

* Removes the `sbb-input-error` and replaces it with `sbb-form-error`

### Features

- **sbb-form-field:** initial implementation ([#1303](https://github.com/lyne-design-system/lyne-components/issues/1303)) ([b2ec4f0](https://github.com/lyne-design-system/lyne-components/commit/b2ec4f0a853536ed2f867efcce42f69ea59b8629))

## 0.4.0 (2022-08-25)

### ⚠ BREAKING CHANGES

- **sbb-link:** rename isIconAtEnd property to iconPlacement

### Bug Fixes

- **sbb-link:** rename property isIconAtEnd to iconPlacement and fix stories ([#1350](https://github.com/lyne-design-system/lyne-components/issues/1350)) ([10962ec](https://github.com/lyne-design-system/lyne-components/commit/10962ec4b28ed8fec1926277c77c640e96708b6e))

### 0.3.2 (2022-08-24)

### 0.3.1 (2022-08-23)

### Features

- **sbb-tab-group:** introduce new tab group component ([#1088](https://github.com/lyne-design-system/lyne-components/issues/1088)) ([31ec9ec](https://github.com/lyne-design-system/lyne-components/commit/31ec9ec920f0318d3ea266ef6d9fe5f92668c855))

## 0.3.0 (2022-08-22)

### ⚠ BREAKING CHANGES

- **sbb-image:** removed properties: 'hideFromScreenreader', 'variant', 'imageSrcExample'

- **sbb-image:** various refactorings ([#1305](https://github.com/lyne-design-system/lyne-components/issues/1305)) ([d57859c](https://github.com/lyne-design-system/lyne-components/commit/d57859c32a338abe4fb7cb4ba7da91860773f5b0))

### 0.2.6 (2022-08-22)

### Bug Fixes

- **sbb-teaser:** add png loader to story bundler ([#1347](https://github.com/lyne-design-system/lyne-components/issues/1347)) ([dd35929](https://github.com/lyne-design-system/lyne-components/commit/dd35929a90867f510e705f95e1e53e79ab54d002))

### 0.2.5 (2022-08-19)

### Features

- **sbb-link:** implement LinkButtonProperties interface ([#1344](https://github.com/lyne-design-system/lyne-components/issues/1344)) ([77e15cf](https://github.com/lyne-design-system/lyne-components/commit/77e15cfcf27d54e820208738cb233160792c90b4))

### 0.2.4 (2022-08-17)

### Bug Fixes

- **sbb-link:** handle icon slot and icon placement correctly ([#1340](https://github.com/lyne-design-system/lyne-components/issues/1340)) ([69bd54b](https://github.com/lyne-design-system/lyne-components/commit/69bd54b9141bf0c53cca1936f4c4d2c4eb4fb4c4))

### 0.2.3 (2022-08-17)

### Bug Fixes

- **sbb-button:** button doesn't emit eventId ([#1332](https://github.com/lyne-design-system/lyne-components/issues/1332)) ([b2abf37](https://github.com/lyne-design-system/lyne-components/commit/b2abf3723457ab64b79c8bc99e669cdd428c0d9a))

### 0.2.2 (2022-08-17)

### Bug Fixes

- add event to link button ([#1327](https://github.com/lyne-design-system/lyne-components/issues/1327)) ([8cfcd50](https://github.com/lyne-design-system/lyne-components/commit/8cfcd509a5ee9551d1827be595db622fa9ca2ec2))

### 0.2.1 (2022-08-11)

## 0.2.0 (2022-07-29)

### ⚠ BREAKING CHANGES

- **sbb-link:** - the text is now set via slot (default slot)

* the aria-label has its own property instead of the former text property
* iconFlip has been removed

### Features

- **sbb-link:** refactor sbb-link according to new specification ([#1292](https://github.com/lyne-design-system/lyne-components/issues/1292)) ([108310a](https://github.com/lyne-design-system/lyne-components/commit/108310aac4540f32bcf57febf364e3aae6cf7672))

### 0.1.19 (2022-07-28)

### Bug Fixes

- **sbb-teaser:** remove unwanted space and fix stories ([#1321](https://github.com/lyne-design-system/lyne-components/issues/1321)) ([490b6f4](https://github.com/lyne-design-system/lyne-components/commit/490b6f44d1680b35dcedaa58e5195c59e1f15008))

### 0.1.18 (2022-07-28)

### Features

- **sbb-divider:** initial implementation ([#1309](https://github.com/lyne-design-system/lyne-components/issues/1309)) ([7dcf833](https://github.com/lyne-design-system/lyne-components/commit/7dcf8333cfe074fad78aaebb1e113558c9db893c))

### 0.1.17 (2022-07-28)

### Bug Fixes

- **sbb-toggle-check:** fix story path ([625d90b](https://github.com/lyne-design-system/lyne-components/commit/625d90bdc096e9a16d7b06d839ea2536b1d7c53b))

### 0.1.16 (2022-07-27)

### Bug Fixes

- **sbb-toggle-check:** fix various issues ([#1317](https://github.com/lyne-design-system/lyne-components/issues/1317)) ([e13c447](https://github.com/lyne-design-system/lyne-components/commit/e13c44716c1b8b49f95ac518c8e48d53438b947e))

### 0.1.15 (2022-07-27)

### 0.1.14 (2022-07-26)

### Bug Fixes

- **sbb-toggle-check:** prevent the toggle from freezing on double-click ([#1315](https://github.com/lyne-design-system/lyne-components/issues/1315)) ([98a8d1a](https://github.com/lyne-design-system/lyne-components/commit/98a8d1afc352670cee11ddf7328e9a67c1a703ef))

### 0.1.13 (2022-07-26)

### 0.1.12 (2022-07-21)

### Features

- **sbb-toggle-check:** initial implementation ([#1283](https://github.com/lyne-design-system/lyne-components/issues/1283)) ([8db48df](https://github.com/lyne-design-system/lyne-components/commit/8db48df27f2cc9fa4674d78757605b8d6c459dfc))

### 0.1.11 (2022-07-19)

### Bug Fixes

- **button:** use new design tokens for size ([#1306](https://github.com/lyne-design-system/lyne-components/issues/1306)) ([21f20aa](https://github.com/lyne-design-system/lyne-components/commit/21f20aa429b38f501bdc8be0764d129d57e73121))

### 0.1.10 (2022-07-18)

### 0.1.9 (2022-07-18)

### Features

- **sbb-icon:** add width and height CSS variables and refactor ([#1297](https://github.com/lyne-design-system/lyne-components/issues/1297)) ([fc15052](https://github.com/lyne-design-system/lyne-components/commit/fc150521e6abc77ed5113e450572778dcc1cfd0e))

### 0.1.8 (2022-07-08)

### Features

- **sbb-icon:** introduce sbb-icon component ([#1286](https://github.com/lyne-design-system/lyne-components/issues/1286)) ([e10adb3](https://github.com/lyne-design-system/lyne-components/commit/e10adb3671a91fbe1e4f704b3a3ecdfc76f8ea38))

### 0.1.7 (2022-07-07)

### Bug Fixes

- fix focus outline override ([60ea2b0](https://github.com/lyne-design-system/lyne-components/commit/60ea2b0d837ac931bc857c6dcd3d5b2aef1dc19d))

### 0.1.6 (2022-07-07)

### 0.1.5 (2022-07-04)

### Bug Fixes

- remove engine config as it blocks consumers ([99e80db](https://github.com/lyne-design-system/lyne-components/commit/99e80db9ce98ae9c7cfcffda445485dd15e55484))

### 0.1.4 (2022-06-28)

### 0.1.3 (2022-06-28)

### Features

- **link:** add new inline variant ([#1248](https://github.com/lyne-design-system/lyne-components/issues/1248)) ([b02e614](https://github.com/lyne-design-system/lyne-components/commit/b02e614b5aa55a6b7dc4d9749f6905fdd6f87b79))

### 0.1.2 (2022-06-27)

### 0.1.1 (2022-06-27)

### Bug Fixes

- remove quotes when set STORYBOOK_COMPONENTS_VERSION variable ([#1274](https://github.com/lyne-design-system/lyne-components/issues/1274)) ([ef04fdb](https://github.com/lyne-design-system/lyne-components/commit/ef04fdbb87a2991da32b9c1e3d2c052798860480))

## 0.1.0 (2022-06-24)

### Bug Fixes

- update design tokens and adapt imports ([#1272](https://github.com/lyne-design-system/lyne-components/issues/1272)) ([4003284](https://github.com/lyne-design-system/lyne-components/commit/4003284f333640c8554f64728c3c481a3d11f9d9))
