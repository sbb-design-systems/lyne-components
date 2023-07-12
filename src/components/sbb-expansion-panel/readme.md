The `sbb-expansion-panel` is a component which acts as an expandable summary-details widget.

It has two slots, named `header` and `content`, which receive, respectively, a `sbb-expansion-panel-header` 
as a state controller, and a `sbb-expansion-panel-content` as an expandable content. 
The visibility of the content is controlled by the value of the `expanded` property; the property is also proxied 
to the `sbb-expansion-panel-header` to correctly display the toggle icon.

The component has two background options that can be set using the `color` variable, while the `disabled` state 
can be set using the self-named variable. It's also possible to display the `sbb-expansion-panel` without border
by setting the `borderless` variable to `true`. Using the `level` variable, it's possible to wrap the 
`sbb-expansion-panel-header` in a heading tag; if it's unset, a `<div>` is used as a wrapper. 

## Usage

Basic usage:

```html
<sbb-expansion-panel>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

Expanded panel with milk background:

```html
<sbb-expansion-panel expanded color='milk'>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

Borderless disabled panel with level-4 heading:

```html
<sbb-expansion-panel disabled borderless level='4'>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
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
| `level`            | `level`             | Heading level; if unset, a `div` will be rendered.                     | `"1" \| "2" \| "3" \| "4" \| "5" \| "6"` | `undefined` |


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


