The logo components from Lyne are used as a wrapper for the SBB logos, and they ensure the correct aspect ratio and protective room.

To use the component, please define the desired height or width on the components.

```css
sbb-logo,
sbb-logo-cargo-international,
sbb-logo-cargo,
sbb-logo-elvetino {
  height: 20px;
}
```

```html
<sbb-logo></sbb-logo>
<sbb-logo-cargo></sbb-logo-cargo>
<sbb-logo-cargo-international></sbb-logo-cargo-international>
<sbb-logo-elvetino></sbb-logo-elvetino>
```

## Style

All the components have a negative variant which can be set using the `negative` property.

```html
<sbb-logo negative></sbb-logo>
<sbb-logo-cargo negative></sbb-logo-cargo>
<sbb-logo-cargo-international negative></sbb-logo-cargo-international>
<sbb-logo-elvetino negative></sbb-logo-elvetino>
```

The aspect ratio of the logos can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal` and `none`.

```html
<sbb-logo protective-room="minimal"></sbb-logo>
<sbb-logo-cargo protective-room="none"></sbb-logo-cargo>
<sbb-logo-cargo-international protective-room="minimal"></sbb-logo-cargo-international>
<sbb-logo-elvetino protective-room="none"></sbb-logo-elvetino>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbLogoCargoElement`, `sbb-logo-cargo`

#### Properties

| Name                 | Attribute             | Privacy | Type                             | Default            | Description                                                  |
| -------------------- | --------------------- | ------- | -------------------------------- | ------------------ | ------------------------------------------------------------ |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                         | `'SBB Cargo Logo'` | Accessibility label which will be forwarded to the SVG logo. |
| `negative`           | `negative`            | public  | `boolean`                        | `false`            | Negative coloring variant flag.                              |
| `protectiveRoom`     | `protective-room`     | public  | `'none' \| 'minimal' \| 'ideal'` | `'ideal'`          | Visual protective room around logo.                          |

#### CSS Properties

| Name                | Default | Description                                |
| ------------------- | ------- | ------------------------------------------ |
| `--sbb-logo-height` | `auto`  | Can be used to set the height of the logo. |

### class: `SbbLogoCargoInternationalElement`, `sbb-logo-cargo-international`

#### Properties

| Name                 | Attribute             | Privacy | Type                             | Default                          | Description                                                  |
| -------------------- | --------------------- | ------- | -------------------------------- | -------------------------------- | ------------------------------------------------------------ |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                         | `'SBB Cargo International Logo'` | Accessibility label which will be forwarded to the SVG logo. |
| `negative`           | `negative`            | public  | `boolean`                        | `false`                          | Negative coloring variant flag.                              |
| `protectiveRoom`     | `protective-room`     | public  | `'none' \| 'minimal' \| 'ideal'` | `'ideal'`                        | Visual protective room around logo.                          |

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

### class: `SbbLogoElvetinoElement`, `sbb-logo-elvetino`

#### Properties

| Name                 | Attribute             | Privacy | Type                             | Default           | Description                                                  |
| -------------------- | --------------------- | ------- | -------------------------------- | ----------------- | ------------------------------------------------------------ |
| `accessibilityLabel` | `accessibility-label` | public  | `string`                         | `'Elvetino Logo'` | Accessibility label which will be forwarded to the SVG logo. |
| `negative`           | `negative`            | public  | `boolean`                        | `false`           | Negative coloring variant flag.                              |
| `protectiveRoom`     | `protective-room`     | public  | `'none' \| 'minimal' \| 'ideal'` | `'ideal'`         | Visual protective room around logo.                          |

#### CSS Properties

| Name                | Default | Description                                |
| ------------------- | ------- | ------------------------------------------ |
| `--sbb-logo-height` | `auto`  | Can be used to set the height of the logo. |
