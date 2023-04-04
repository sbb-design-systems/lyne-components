The `<sbb-logo>` ensures his aspect ratio and protective room. To use the logo, 
please define the desired height or width on `<sbb-logo>`.

## Usage

```html
<style>
  sbb-logo {
    height: 20px;
  }
</style>
<sbb-logo protective-room="none"></sbb-logo>
```

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                  | Type                             | Default   |
| -------------------- | --------------------- | ------------------------------------------------------------ | -------------------------------- | --------- |
| `accessibilityLabel` | `accessibility-label` | Accessibility label which will be forwarded to the SVG logo. | `string`                         | `'Logo'`  |
| `negative`           | `negative`            | Variants of the logo.                                        | `boolean`                        | `false`   |
| `protectiveRoom`     | `protective-room`     | Visual protective room around logo.                          | `"ideal" \| "minimal" \| "none"` | `'ideal'` |


## Dependencies

### Used by

 - [sbb-header](../sbb-header)

### Graph
```mermaid
graph TD;
  sbb-header --> sbb-logo
  style sbb-logo fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


