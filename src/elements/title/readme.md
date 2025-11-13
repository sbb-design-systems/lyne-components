The `sbb-title` is a component which renders a heading element according to the provided `level` (default: `1`).

```html
<sbb-title>Hello</sbb-title>
```

## Style

In scenarios where the visual representation needs to be different from the semantic meaning of the title level,
it is possible to use the `visualLevel` property.
The available values for both `level` and `visualLevel` are the numbers from 1 to 6 (`h1` to `h6`).

```html
<sbb-title level="3" visual-level="4">Hi!</sbb-title>
```

The component has a `negative` variant which can be set with the self-named property.

```html
<sbb-title negative>Negative</sbb-title>
```

As a default the `sbb-title` contains spacing on top and bottom on the host.
This can be removed or customized via simple CSS rules.

## Lean design

In `lean` mode, where the `sbb-lean` class is applied to the `<html>` tag, the title is given smaller sizes and spacings.

<!-- Auto Generated Below -->

## Properties

| Name          | Attribute      | Privacy | Type                    | Default | Description                                                                        |
| ------------- | -------------- | ------- | ----------------------- | ------- | ---------------------------------------------------------------------------------- |
| `level`       | `level`        | public  | `SbbTitleLevel`         | `'1'`   | Title level                                                                        |
| `negative`    | `negative`     | public  | `boolean`               | `false` | Negative coloring variant flag.                                                    |
| `visualLevel` | `visual-level` | public  | `SbbTitleLevel \| null` | `null`  | Visual level for the title. Optional, if not set, the value of level will be used. |

## CSS Properties

| Name                       | Default | Description                |
| -------------------------- | ------- | -------------------------- |
| `--sbb-title-margin-block` |         | Margin block of the title. |

## Slots

| Name | Description                                        |
| ---- | -------------------------------------------------- |
|      | Use the unnamed slot for the content of the title. |
