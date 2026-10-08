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

We recommend using the loading indicator only for actions that are expected to take at least one second.
For shorter processes, the indicator may appear as a distracting flash.

The loading indicator should generally be displayed after one second has elapsed since an action has started.
If it is known in advance that the back-end service will take at least one second to respond,
the loading indicator may be displayed immediately.

A minimum display duration of about 500ms can help prevent the indicator from disappearing too quickly,
but is not required and depends on what happens next.

For longer waiting times, especially those of around 10 seconds or more,
consider providing a progress indicator to give users an indication of the remaining time.

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
