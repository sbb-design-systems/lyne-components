The `sbb-selection-action-panel` component wraps either a [sbb-checkbox-panel](/docs/elements-sbb-checkbox-sbb-checkbox-panel--docs)
or a [sbb-radio-button-panel](/docs/elements-sbb-radio-button-sbb-radio-button-panel--docs) and an action element (e.g. an `sbb-secondary-button` or a native `button`).

```html
<sbb-selection-action-panel>
  <sbb-radio-button-panel>
    Value
    <span slot="subtext">Subtext</span>
  </sbb-radio-button-panel>

  <!-- action -->
  <sbb-secondary-button icon-name="arrow-right-small">...</sbb-secondary-button>
  <!-- or -->
  <button data-action>...</button>
</sbb-selection-action-panel>
```

## With expansion panel

It is possible to combine the usage of the `sbb-selection-action-panel` and the [sbb-selection-expansion-panel](/docs/elements-sbb-selection-expansion-panel--docs).
Be aware that the `color` and the `borderless` properties need to be set on the expansion panel component.

```html
<sbb-selection-expansion-panel color="..." borderless>
  <sbb-selection-action-panel>
    <sbb-radio-button-panel>
      Value
      <span slot="subtext">Subtext</span>
    </sbb-radio-button-panel>

    <sbb-secondary-button icon-name="arrow-right-small">...</sbb-secondary-button>
  </sbb-selection-action-panel>

  <!-- inner content -->
  <div slot="content">Inner Content</div>
</sbb-selection-expansion-panel>
```

## In a group

The selection panel can also be used inside a [sbb-radio-button-group](/docs/elements-sbb-radio-button-sbb-radio-button-group--docs) or a [sbb-checkbox-group](/docs/elements-sbb-checkbox-sbb-checkbox-group--docs).

With `sbb-radio-button-group`:

```html
<sbb-radio-button-group>
  <sbb-selection-action-panel>
    <sbb-radio-button-panel>
      Value
      <span slot="subtext">Subtext</span>
    </sbb-radio-button-panel>
    <sbb-secondary-button icon-name="arrow-right-small"></sbb-secondary-button>
    <sbb-card-badge>%</sbb-card-badge>
  </sbb-selection-action-panel>
  ...
</sbb-radio-button-group>
```

With `sbb-checkbox-group`:

```html
<sbb-checkbox-group>
  <sbb-selection-action-panel>
    <sbb-checkbox-panel>
      Value
      <span slot="subtext">Subtext</span>
    </sbb-checkbox-panel>
    <sbb-secondary-button icon-name="arrow-right-small"></sbb-secondary-button>
    <sbb-card-badge>%</sbb-card-badge>
  </sbb-selection-action-panel>
  ...
</sbb-checkbox-group>
```

## Style

### Color

The component has two background options that can be set using the `color` variable: `milk` and `white` (default).

```html
<sbb-selection-action-panel color="milk"> ... </sbb-selection-action-panel>
```

It's also possible to display the `sbb-selection-action-panel` without border by setting the `borderless` variable to `true`.

```html
<sbb-selection-action-panel borderless> ... </sbb-selection-action-panel>
```

### Size

The component has no `size` property but, when slotted in a `sbb-radio-button-group` or in a `sbb-checkbox-group`,
it adapts to the parent `size` (`m` or `s`); if there's no wrapping group component,
it adapts its `size` to the slotted `sbb-radio-button-panel` or in a `sbb-checkbox-panel`.

```html
<!-- Adapts to the size of the `sbb-checkbox-group`-->
<sbb-checkbox-group size="s">
  <sbb-selection-action-panel>
    <sbb-checkbox-panel> ... </sbb-checkbox-panel>
  </sbb-selection-action-panel>
</sbb-checkbox-group>

<!-- Adapts to the size of the `sbb-checkbox-panel`-->
<sbb-selection-action-panel>
  <sbb-checkbox-panel size="s"> ... </sbb-checkbox-panel>
</sbb-selection-action-panel>
```

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute    | Privacy | Type                | Default   | Description                                |
| ------------ | ------------ | ------- | ------------------- | --------- | ------------------------------------------ |
| `borderless` | `borderless` | public  | `boolean`           | `false`   | Whether the unselected panel has a border. |
| `color`      | `color`      | public  | `'white' \| 'milk'` | `'white'` | The background color of the panel.         |

## Slots

| Name    | Description                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------- |
|         | Use this slot to render a `sbb-checkbox-panel` or `sbb-radio-button-panel` element and the action element. |
| `badge` | Use this slot to render a `sbb-card-badge` component.                                                      |
