# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
