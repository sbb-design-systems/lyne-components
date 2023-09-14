The `sbb-expansion-panel` is a component which acts as an expandable summary-details widget.

### Slots 

In order to correctly display the component, it must be used together with a `sbb-expansion-panel-header` 
and a `sbb-expansion-panel-content`; the first will work as a state controller, the last will act as the expandable content. 
These two components fill the two available slots, named `header` and `content`.

```html
<sbb-expansion-panel>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

### Expanded

The visibility of the content is controlled by the value of the `expanded` property.

```html
<sbb-expansion-panel expanded>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the expanded content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

### Color

The component has two background options that can be set using the `color` variable.

```html
<sbb-expansion-panel color='milk'>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

### Disabled

The `disabled` state can be set using the self-named variable. In this state, the component can not be collapsed or expanded.

```html
<sbb-expansion-panel disabled>
  <sbb-expansion-panel-header>This is a disabled non-interactive header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

### Borderless

It's also possible to display the `sbb-expansion-panel` without border by setting the `borderless` variable to `true`. 

```html
<sbb-expansion-panel borderless>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

### Title level

Using the `titleLevel` variable, it's possible to wrap the `sbb-expansion-panel-header` in a heading tag; 
if it's unset, a `<div>` is used as a wrapper. 

```html
<sbb-expansion-panel level='4'>
  <sbb-expansion-panel-header>This is the header, and it will be wrapped in a h4 tag.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

## Accessibility

When the `sbb-expansion-panel-header` and the `sbb-expansion-panel-content` are slotted into the component,
they both receive an `id`, if not set; then, the content's `id` is set as `aria-controls` attribute of the header,
and the header's `id` is set as `aria-labelledby` attribute on the content.
The `expanded` attribute is used to correctly set the `aria-expanded` attribute on the header 
and the `aria-hidden` attribute on the content.

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                            | Type                                     | Default     |
| ------------------ | ------------------- | ---------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `borderless`       | `borderless`        | Whether the panel has no border.                                       | `boolean`                                | `false`     |
| `color`            | `color`             | The background color of the panel.                                     | `"milk" \| "white"`                      | `'white'`   |
| `disableAnimation` | `disable-animation` | Whether the animations should be disabled.                             | `boolean`                                | `false`     |
| `disabled`         | `disabled`          | Whether the panel is disabled, so its expanded state can't be changed. | `boolean`                                | `false`     |
| `expanded`         | `expanded`          | Whether the panel is expanded.                                         | `boolean`                                | `false`     |
| `titleLevel`       | `title-level`       | Heading level; if unset, a `div` will be rendered.                     | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `undefined` |


## Events

| Event        | Description                                                           | Type                |
| ------------ | --------------------------------------------------------------------- | ------------------- |
| `did-close`  | Emits whenever the sbb-expansion-panel is closed.                     | `CustomEvent<void>` |
| `did-open`   | Emits whenever the sbb-expansion-panel is opened.                     | `CustomEvent<void>` |
| `will-close` | Emits whenever the sbb-expansion-panel begins the closing transition. | `CustomEvent<void>` |
| `will-open`  | Emits whenever the sbb-expansion-panel starts the opening transition. | `CustomEvent<void>` |


## Slots

| Slot        | Description                                         |
| ----------- | --------------------------------------------------- |
| `"content"` | Use this to render the sbb-expansion-panel-content. |
| `"header"`  | Use this to render the sbb-expansion-panel-header.  |


----------------------------------------------


