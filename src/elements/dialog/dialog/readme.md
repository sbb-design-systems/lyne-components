The `sbb-dialog` component provides a way to present content on top of the app's content.
It offers the following features:

- creates a backdrop for disabling interaction below the modal;
- disables scrolling of the page content while open;
- manages focus properly by setting it on the first focusable element;
- can host a [sbb-dialog-actions](/docs/elements-sbb-dialog-sbb-dialog-actions--docs) component in the footer;
- adds the appropriate ARIA roles automatically.

```html
<sbb-dialog>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
</sbb-dialog>
```

## Slots

There are three slots: `title`, `content` and `actions`, which can respectively be used to provide an `sbb-dialog-title`, `sbb-dialog-content` and an `sbb-dialog-actions`.

```html
<sbb-dialog>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
  <sbb-dialog-actions>
    <sbb-block-link sbb-dialog-close>Link</sbb-block-link>
    <sbb-secondary-button sbb-dialog-close>Cancel</sbb-secondary-button>
    <sbb-button sbb-dialog-close sbb-focus-initial>Confirm</sbb-button>
  </sbb-dialog-actions>
</sbb-dialog>
```

## Interactions

To display the dialog, a trigger can be connected via the `trigger` property,
or the `open()` method on the `sbb-dialog` component can be called.

```html
<sbb-button id="dialog-trigger">Open dialog</sbb-button>

<sbb-dialog trigger="dialog-trigger">
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
  <sbb-dialog-actions><sbb-button sbb-dialog-close>Close</sbb-button></sbb-dialog-actions>
</sbb-dialog>
```

To dismiss the dialog, you need to call
the `close(result?: any, target?: HTMLElement)` method, which will close the dialog element and
emit a close event with an optional result as a payload.

The component can also be dismissed by clicking on the backdrop, pressing the `Esc` key,
or, if an element within the `sbb-dialog` has the `sbb-dialog-close` attribute, by clicking on it.

## Style

It's possible to display the component in `negative` variant using the self-named property.

```html
<sbb-dialog negative>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
</sbb-dialog>
```

## Accessibility

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus.

### Focus restoration

When closed, the dialog restores focus to the element that previously held focus when the
dialog opened by default. However, focus restoration can be disabled
by setting the `skipFocusRestoration` property to `true`.
As this is an accessibility feature, it is recommended to focus
an alternative element by listening to the `didClose` event.

<!-- Auto Generated Below -->

## Properties

| Name                   | Attribute              | Privacy | Type                        | Default    | Description                                                                                                                                                                                                                                               |
| ---------------------- | ---------------------- | ------- | --------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel`   | `accessibility-label`  | public  | `string`                    | `''`       | This will be forwarded as aria-label to the relevant nested element to describe the purpose of the overlay.                                                                                                                                               |
| `backdrop`             | `backdrop`             | public  | `'opaque' \| 'translucent'` | `'opaque'` | Backdrop density.                                                                                                                                                                                                                                         |
| `backdropAction`       | `backdrop-action`      | public  | `'close' \| 'none'`         | `'close'`  | Backdrop click action.                                                                                                                                                                                                                                    |
| `isOpen`               | -                      | public  | `boolean`                   |            | Whether the element is open.                                                                                                                                                                                                                              |
| `negative`             | `negative`             | public  | `boolean`                   | `false`    | Negative coloring variant flag.                                                                                                                                                                                                                           |
| `skipFocusRestoration` | `skipFocusRestoration` | public  | `boolean`                   | `false`    | Whether to skip restoring focus to the previously-focused element when the overlay is closed. Note that automatic focus restoration is an accessibility feature and it is recommended that you provide your own equivalent, if you decide to turn it off. |
| `trigger`              | `trigger`              | public  | `HTMLElement \| null`       | `null`     | The element that will trigger the menu overlay. For attribute usage, provide an id reference.                                                                                                                                                             |

## Methods

| Name    | Privacy | Description           | Parameters                         | Return | Inherited From          |
| ------- | ------- | --------------------- | ---------------------------------- | ------ | ----------------------- |
| `close` | public  | Closes the component. | `result: any, target: HTMLElement` | `any`  | SbbOpenCloseBaseElement |
| `open`  | public  | Opens the component.  |                                    | `void` | SbbOpenCloseBaseElement |

## Events

| Name          | Type    | Description                                                                     | Inherited From          |
| ------------- | ------- | ------------------------------------------------------------------------------- | ----------------------- |
| `beforeclose` | `Event` | Emits whenever the `sbb-dialog` begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `beforeopen`  | `Event` | Emits whenever the component starts the opening transition. Can be canceled.    | SbbOpenCloseBaseElement |
| `close`       | `Event` | Emits whenever the `sbb-dialog` is closed.                                      | SbbOpenCloseBaseElement |
| `open`        | `Event` | Emits whenever the component is opened.                                         | SbbOpenCloseBaseElement |

## CSS Properties

| Name                   | Default                              | Description                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-dialog-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

## Slots

| Name      | Description                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------- |
|           | Use the unnamed slot to provide a `sbb-dialog-title`, `sbb-dialog-content` and an optional `sbb-dialog-actions`. |
| `actions` | This slot is used for the actions, the slot is automatically assigned to the `sbb-dialog-actions` element.       |
