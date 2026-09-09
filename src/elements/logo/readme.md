The logo components from Lyne are used as a wrapper for the SBB logos, and they ensure the correct aspect ratio and protective room.

To use the component, please define the desired height or width on the components.

```css
sbb-cargo-international,
sbb-cargo,
sbb-elvetino,
sbb-logo {
  height: 20px;
}
```

```html
<sbb-cargo></sbb-cargo>
<sbb-cargo-international></sbb-cargo-international>
<sbb-elvetino></sbb-elvetino>
<sbb-logo></sbb-logo>
```

## Style

All the components have a negative variant which can be set using the `negative` property.

```html
<sbb-cargo negative></sbb-cargo>
<sbb-cargo-international negative></sbb-cargo-international>
<sbb-elvetino negative></sbb-elvetino>
<sbb-logo negative></sbb-logo>
```

The aspect ratio of the logos can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal` and `none`.

```html
<sbb-cargo protective-room="none"></sbb-cargo>
<sbb-cargo-international protective-room="minimal"></sbb-cargo-international>
<sbb-elvetino protective-room="none"></sbb-elvetino>
<sbb-logo protective-room="minimal"></sbb-logo>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbCargoElement`, `sbb-cargo`

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

### class: `SbbCargoInternationalElement`, `sbb-cargo-international`

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

### class: `SbbElvetinoElement`, `sbb-elvetino`

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
