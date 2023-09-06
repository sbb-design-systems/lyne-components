The `sbb-loading-indicator` is a component which can be used to indicate progress status 
or an ongoing activity which require some time to complete.

### Variant

It has two different variants: in `window` mode, the component completely covers the parent element, preventing interaction with it,
while the `circle` mode can be used inline within another component (e.g., button) and adjust its size to the parent font size.

### Size

In `window` mode it's possible to define the `size` of the component, choosing between `s` (default) and `l`.

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                       | Type                   | Default     |
| --------- | --------- | ------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `size`    | `size`    | Size variant, either s or m.                                                                      | `"l" \| "s"`           | `'s'`       |
| `variant` | `variant` | Variant of the loading indicator; `circle` is meant to be used inline, while `window` as overlay. | `"circle" \| "window"` | `undefined` |


----------------------------------------------


