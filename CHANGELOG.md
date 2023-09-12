# Changelog
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.8.0] - 2023-09-11
### Added
- SL lang file
- proxyImages setting to preview and thumbnail
- canEditImages, canDeleteImages, canRenameImages, canCropImages options on gallery folders

## [1.7.0] - 2023-06-02
### Added
- Block level loop and conditional to advanced elements

## [1.6.0] - 2023-06-01
### Added
- `canEdit` title option to settings

## [1.5.0] - 2023-02-23
### Added
- acc (Adobe Campaign Classic) and Mailchimp templating language

## [1.4.1] - 2023-02-01
### Changed
- Update @chamaileon-sdk/plugins version that fixes sdk init message send

## [1.4.0] - 2023-01-31

### Added
- German (de) language option
- `useBlockTitleAsMarker` config option to block libraries

## [1.3.0] - 2022-08-16

### Added
- Added html import plugin tab, its settings, and data flow

### Changed
- html import plugin configuration

## [1.2.0] - 2022-08-05

### Added
- updateHooks example code for every plugin
- email editor setting variable parameters
- email editor setting elementDefaults
- email editor setting panels
- email editor setting addon disabledReason
- fonts in the setting editor config

### Changed
- New chamaileon-sdk version that ads updateHooks functionality
- vuetify color palette update in the sdk config
- French lang option for language selector

## [1.1.0] - 2022-08-05

### Added
- Folder handling in gallery foldertree
- New gallery hooks

## [1.0.2] - 2022-07-06

### Changed
- New chamaileon-sdk version that fixes inline plugin dimensions

## [1.0.1] - 2022-06-21

### Changed
- plugins version

## [1.0.0] - 2022-06-08

### Added
- Changelog
- More language options (ru, zh-tw)
- Methods tab for every plugin tooltip
- Thumbnail tooltip hooks tab

### Changed
- New lint config to be uniform with our other repositories
- npm ci in Github actions
- SDK v2 instead of v1
- Updated plugin settings and configs based on v2 docs
- Chamaileon SDK is now loaded from an npm package instead of the CDN
- Init every plugin on start and update it on every parameter change
- Versioned localStorage save so that it can be reset if a breaking change is introduced
- Wait for localStorage data to load before we init the SDK
- Reworked JSON examples visualization for the right tooltip panel
- Vue.config.js to be uniform with our other repositories
- Variable editor now has an extended button config
- The variable editor and email editor can set the font stack setting for each other and is stored in both stores

### Removed
- Unused dependencies

### Fixed
- Playground now works with the demo backend on locally started instances as well
- SDK config options are now changeable and stored in the localStorage
