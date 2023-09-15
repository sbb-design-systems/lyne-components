The `<sbb-signet>` is used as a wrapper for the SBB signet and ensures his aspect ratio and protective room.
To use the component, please define the desired height or width on `<sbb-signet>`.

## Usage

```html
<style>
  sbb-signet {
    height: 20px;
  }
</style>
<sbb-signet></sbb-signet>
```

### Aspect ratio

The aspect ratio of the logo can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal` and `none`.

```html
<sbb-signet protective-room="none"></sbb-signet>
```


<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                          | Type                             | Default   |
| -------------------- | --------------------- | -------------------------------------------------------------------- | -------------------------------- | --------- |
| `accessibilityLabel` | `accessibility-label` | Accessibility label which will be forwarded to the inner SVG signet. | `string`                         | `'Logo'`  |
| `protectiveRoom`     | `protective-room`     | Visual protective room around signet.                                | `"ideal" \| "minimal" \| "none"` | `'ideal'` |


----------------------------------------------


