The `sbb-loading-indicator` is a component which can be used to indicate progress status 
or an ongoing activity which require some time to complete.


### Variant

It has two different variants: 
in `window` mode, the component completely covers the parent element, preventing interaction with it,

```html
<sbb-loading-indicator variant="window"/>
```

while the `circle` mode can be used inline within another component (e.g., button) and adjust its size to the parent font size.

```html
<sbb-button>
  <sbb-loading-indicator slot="icon" variant="circle"></sbb-loading-indicator>
  Click me
</sbb-button>
```


### Size

In `window` mode it's possible to define the `size` of the component, choosing between `s` (default) and `l`.

```html
<sbb-loading-indicator variant="window" size='l'/>
```


#### Accessibility

If the `sbb-loading-indicator` should be announced by screen-readers, use an element with the correct aria attributes 
(`aria-live` set to `polite` or `assertive`, and possibly `aria-atomic` and `aria-relevant`) 
and then append `sbb-loading-indicator` on it after giving it the correct `aria-label`.

```html
<div class="loader-container" aria-live="polite">
  <sbb-loading-indicator variant="window" size='l' aria-label='Loading, please wait'/>
</div>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                       | Type                   | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `disableAnimation` | `disable-animation` | Whether the animation is enabled.                                                                 | `boolean`              | `false`     |
| `size`             | `size`              | Size variant, either s or m.                                                                      | `"l" \| "s"`           | `'s'`       |
| `variant`          | `variant`           | Variant of the loading indicator; `circle` is meant to be used inline, while `window` as overlay. | `"circle" \| "window"` | `undefined` |


----------------------------------------------


