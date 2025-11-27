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
  <button class="sbb-action">...</button>
</sbb-selection-action-panel>
```

## With expansion panel

It is possible to combine the usage of the `sbb-selection-action-panel` and the [sbb-selection-expansion-panel](/docs/elements-sbb-selection-expansion-panel--docs).

```html
<sbb-selection-expansion-panel>
  <sbb-selection-action-panel>
    <sbb-radio-button-panel color="milk" borderless>
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

The component inherits its style from the slotted panel component (`sbb-checkbox-panel` or `sbb-radio-button-panel`).

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                                                            | Default | Description              |
| ------- | --------- | ------- | --------------------------------------------------------------- | ------- | ------------------------ |
| `group` | -         | public  | `SbbRadioButtonGroupElement \| SbbCheckboxGroupElement \| null` |         | Group element if present |
| `panel` | -         | public  | `SbbCheckboxPanelElement \| SbbRadioButtonPanelElement \| null` |         | Input panel element      |

## Slots

| Name    | Description                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------- |
|         | Use this slot to render a `sbb-checkbox-panel` or `sbb-radio-button-panel` element and the action element. |
| `badge` | Use this slot to render a `sbb-card-badge` component.                                                      |
