The `sbb-selection-panel` component wraps either a [sbb-checkbox](/docs/components-sbb-checkbox-sbb-checkbox--docs) 
or a [sbb-radio-button](/docs/components-sbb-radio-button-sbb-radio-button--docs) that can optionally toggle a content section.

The content section can be opened by checking `sbb-checkbox` or selecting the `sbb-radio-button`. 
Additionally, clicking on all the upper area sets the checked state and therefore opens the content; 
clicking on the content area does not toggle anything.

The selection panel can also be used inside a [sbb-radio-button-group](/docs/components-sbb-radio-button-sbb-radio-button-group--docs) 
or a [sbb-checkbox-group](/docs/components-sbb-checkbox-sbb-checkbox-group--docs).

### With `sbb-radio-button-group`

```html
<sbb-radio-button-group>
  <sbb-selection-panel>
    <sbb-card-badge>
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
     <sbb-radio-button>
       Value
       <span slot="subtext">Subtext</span>
       <span slot="suffix">
         <sbb-icon/>
         <span class="sbb-text-xs sbb-text--bold">CHF</span>
         <span class="sbb-text-m sbb-text--bold">40.00</span>
       </span>
     </sbb-radio-button>
     <div slot="content">
      Inner Content
     </div>
  </sbb-selection-panel>
</sbb-radio-button-group>
```

### With `sbb-checkbox-group`

```html
<sbb-checkbox-group>
  <sbb-selection-panel>
    <sbb-card-badge>
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    <sbb-checkbox>
      Value
      <span slot="subtext">Subtext</span>
      <span slot="suffix">
        <sbb-icon/>
        <span class="sbb-text-xs sbb-text--bold">CHF</span>
        <span class="sbb-text-m sbb-text--bold">40.00</span>
      </span>
    </sbb-checkbox>
    <div slot="content">
     Inner Content
    </div>
  </sbb-selection-panel>
</sbb-checkbox-group>
```

As shown in the examples above, `sbb-checkbox` and `sbb-radio-button` placed in a `sbb-selection-panel` are extended 
with a slot named `subtext` for the subtext and a slot named `suffix` for the suffix items.

## Style

The component has two background options that can be set using the `color` variable: `milk` and `white` (default).

```html
<sbb-selection-panel color='milk'>
  ...
</sbb-selection-panel>
```

It's also possible to display the `sbb-selection-panel` without border by setting the `borderless` variable to `true`.

```html
<sbb-selection-panel borderless>
  ...
</sbb-selection-panel>
```

<!-- Auto Generated Below --> 
 

| Name               | Attribute               | Privacy | Type                | Default   | Description                                    |
| ------------------ | ------------------ | ------- | ------------------- | --------- | ---------------------------------------------- |
| `color`            | `color`            | public  | `'white' \| 'milk'` | `'white'` | The background color of the panel.             |
| `forceOpen`        | `force-open`        | public  | `boolean`           | `false`   | Whether the content section is always visible. |
| `borderless`       | `borderless`       | public  | `boolean`           | `false`   | Whether the unselected panel has a border.     |
| `disableAnimation` | `disable-animation` | public  | `boolean`           | `false`   | Whether the animation is enabled.              |

| Name               | Attribute               | Privacy | Type                                            | Default   | Description                                                       |
| ------------------ | ------------------ | ------- | ----------------------------------------------- | --------- | ----------------------------------------------------------------- |
| `color`            | `color`            | public  | `InterfaceSbbSelectionPanelAttributes['color']` | `'white'` | The background color of the panel.                                |
| `forceOpen`        | `force-open`        | public  | `boolean`                                       | `false`   | Whether the content section is always visible.                    |
| `borderless`       | `borderless`       | public  | `boolean`                                       | `false`   | Whether the unselected panel has a border.                        |
| `disableAnimation` | `disable-animation` | public  | `boolean`                                       | `false`   | Whether the animation is enabled.                                 |
| `willOpen`         | `will-open`         | public  | `EventEmitter<void>`                            |           | Emits whenever the content section starts the opening transition. |
| `didOpen`          | `did-open`          | public  | `EventEmitter<void>`                            |           | Emits whenever the content section is opened.                     |
| `willClose`        | `will-close`        | public  | `EventEmitter<{ closeTarget: HTMLElement }>`    |           | Emits whenever the content section begins the closing transition. |
| `didClose`         | `did-close`         | public  | `EventEmitter<{ closeTarget: HTMLElement }>`    |           | Emits whenever the content section is closed.                     |

## Methods

| Name            | Privacy | Description | Parameters                                                          | Return | Inherited From |
| --------------- | ------- | ----------- | ------------------------------------------------------------------- | ------ | -------------- |
| `onInputChange` | public  |             | `event: CustomEvent<RadioButtonStateChange \| CheckboxStateChange>` | `void` |                |

## Slots

| Name      | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| `unnamed` | Use this slot to provide a \`sbb-checkbox\` or a \`sbb-radio-button\`. |
| `badge`   | Use this slot to provide a \`sbb-card-badge\` (optional).              |
| `content` | Use this slot to provide custom content for the panel (optional).      |

