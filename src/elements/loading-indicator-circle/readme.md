The `<sbb-loading-indicator-circle>` is a component which can be used to indicate progress status
or an ongoing activity which require some time to complete.

```html
<sbb-loading-indicator-circle></sbb-loading-indicator-circle>
```

It can be slotted in other components (e.g. `<sbb-button>`) in the icon slot.

```html
<sbb-button>
  <sbb-loading-indicator-circle slot="icon"></sbb-loading-indicator-circle>
  Button
</sbb-button>
```

### Usage

Use the indicator only for actions lasting at least about 1 second. Shorter processes tend to be confusing due to the flashing.
A brief minimum display duration (guideline: about 500 ms) may be useful afterward, but it is not required, depending on what happens next.

If possible, offer a progress indicator to give users an idea of the remaining waiting time, especially for long waiting times (approx. 10 seconds or more).

## Accessibility

If the `<sbb-loading-indicator-circle>` should be announced by screen-readers, use an element with the correct aria attributes
(`aria-live` set to `polite` or `assertive`, and possibly `aria-atomic` and `aria-relevant`)
and then append the `<sbb-loading-indicator>` on it after giving it the correct `aria-label`.

```html
<div class="loader-container" aria-live="polite">
  <sbb-loading-indicator aria-label="Loading, please wait"></sbb-loading-indicator>
</div>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbLoadingIndicatorCircleElement`, `sbb-loading-indicator-circle`

#### Properties

| Name    | Attribute | Privacy | Type                              | Default     | Description    |
| ------- | --------- | ------- | --------------------------------- | ----------- | -------------- |
| `color` | `color`   | public  | `'default' \| 'smoke' \| 'white'` | `'default'` | Color variant. |
