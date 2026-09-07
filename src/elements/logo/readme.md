The logo components from Lyne are used as a wrapper for the SBB logos, and they ensure the correct aspect ratio and protective room.

To use the component, please define the desired height or width on `<sbb-logo>`.

```css
sbb-logo,
sbb-cargo {
  height: 20px;
}
```

```html
<sbb-logo></sbb-logo> <sbb-cargo></sbb-cargo>
```

## Style

All the components have a negative variant which can be set using the `negative` property.

```html
<sbb-logo negative></sbb-logo> <sbb-cargo negative></sbb-cargo>
```

The aspect ratio of the logo can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal` and `none`.

```html
<sbb-logo protective-room="minimal"></sbb-logo> <sbb-cargo protective-room="none"></sbb-cargo>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbCargoElement`, `sbb-cargo`

#### Properties

| Name                 | Attribute             | Privacy | Type                             | Default   | Description                                                  |
| -------------------- | --------------------- | ------- | -------------------------------- | --------- | ------------------------------------------------------------ |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                         | `'Logo'`  | Accessibility label which will be forwarded to the SVG logo. |
| `negative`           | `negative`            | public  | `boolean`                        | `false`   | Negative coloring variant flag.                              |
| `protectiveRoom`     | `protective-room`     | public  | `'none' \| 'minimal' \| 'ideal'` | `'ideal'` | Visual protective room around Cargo logo.                    |

#### CSS Properties

| Name                 | Default | Description                                      |
| -------------------- | ------- | ------------------------------------------------ |
| `--sbb-cargo-height` | `auto`  | Can be used to set the height of the Cargo logo. |

### class: `SbbLogoElement`, `sbb-logo`

#### Properties

| Name                 | Attribute             | Privacy | Type                             | Default   | Description                                                  |
| -------------------- | --------------------- | ------- | -------------------------------- | --------- | ------------------------------------------------------------ |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                         | `'Logo'`  | Accessibility label which will be forwarded to the SVG logo. |
| `negative`           | `negative`            | public  | `boolean`                        | `false`   | Negative coloring variant flag.                              |
| `protectiveRoom`     | `protective-room`     | public  | `'none' \| 'minimal' \| 'ideal'` | `'ideal'` | Visual protective room around logo.                          |

#### CSS Properties

| Name                | Default | Description                                |
| ------------------- | ------- | ------------------------------------------ |
| `--sbb-logo-height` | `auto`  | Can be used to set the height of the logo. |
