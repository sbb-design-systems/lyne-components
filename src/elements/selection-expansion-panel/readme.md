The `sbb-selection-expansion-panel` component wraps either a [sbb-checkbox-panel](/docs/elements-sbb-checkbox-sbb-checkbox-panel--docs)
or a [sbb-radio-button-panel](/docs/elements-sbb-radio-button-sbb-radio-button-panel--docs) that can toggle a content section.

The content section can be opened by checking `sbb-checkbox-panel` or selecting the `sbb-radio-button-panel`.
Additionally, clicking on all the upper area sets the checked state and therefore opens the content;
clicking on the content area does not toggle anything.

The selection panel can also be used inside a [sbb-radio-button-group](/docs/elements-sbb-radio-button-sbb-radio-button-group--docs)
or a [sbb-checkbox-group](/docs/elements-sbb-checkbox-sbb-checkbox-group--docs).

### With `sbb-radio-button-group`

```html
<sbb-radio-button-group>
  <sbb-selection-expansion-panel>
    <sbb-radio-button-panel>
      <sbb-card-badge>%</sbb-card-badge>
      Value
      <span slot="subtext">Subtext</span>
      <span slot="suffix">
        <sbb-icon></sbb-icon>
        <span class="sbb-text-xs sbb-text--bold">CHF</span>
        <span class="sbb-text-m sbb-text--bold">40.00</span>
      </span>
    </sbb-radio-button-panel>
    <div slot="content">Inner Content</div>
  </sbb-selection-expansion-panel>
</sbb-radio-button-group>
```

### With `sbb-checkbox-group`

```html
<sbb-checkbox-group>
  <sbb-selection-expansion-panel>
    <sbb-checkbox-panel>
      <sbb-card-badge>%</sbb-card-badge>
      Value
      <span slot="subtext">Subtext</span>
      <span slot="suffix">
        <sbb-icon name="cross-small"></sbb-icon>
        <span class="sbb-text-xs sbb-text--bold">CHF</span>
        <span class="sbb-text-m sbb-text--bold">40.00</span>
      </span>
    </sbb-checkbox-panel>
    <div slot="content">Inner Content</div>
  </sbb-selection-expansion-panel>
</sbb-checkbox-group>
```

## Style

The component has two background options that can be set using the `color` variable: `milk` and `white` (default).

```html
<sbb-selection-expansion-panel color="milk"> ... </sbb-selection-expansion-panel>
```

It's also possible to display the `sbb-selection-expansion-panel` without border by setting the `borderless` variable to `true`.

```html
<sbb-selection-expansion-panel borderless> ... </sbb-selection-expansion-panel>
```

<!-- Auto Generated Below -->

## Properties

| Name         | Attribute    | Privacy | Type                | Default   | Description                                    |
| ------------ | ------------ | ------- | ------------------- | --------- | ---------------------------------------------- |
| `borderless` | `borderless` | public  | `boolean`           | `false`   | Whether the unselected panel has a border.     |
| `color`      | `color`      | public  | `'white' \| 'milk'` | `'white'` | The background color of the panel.             |
| `forceOpen`  | `force-open` | public  | `boolean`           | `false`   | Whether the content section is always visible. |

## Events

| Name        | Type                | Description                                                       | Inherited From |
| ----------- | ------------------- | ----------------------------------------------------------------- | -------------- |
| `didClose`  | `CustomEvent<void>` | Emits whenever the content section is closed.                     |                |
| `didOpen`   | `CustomEvent<void>` | Emits whenever the content section is opened.                     |                |
| `willClose` | `CustomEvent<void>` | Emits whenever the content section begins the closing transition. |                |
| `willOpen`  | `CustomEvent<void>` | Emits whenever the content section starts the opening transition. |                |

## Slots

| Name      | Description                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
|           | Use the unnamed slot to add `sbb-checkbox` or `sbb-radio-button` elements to the `sbb-selection-expansion-panel`. |
| `content` | Use this slot to provide custom content for the panel (optional).                                                 |
