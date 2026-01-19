The `sbb-dialog` component provides a way to present content on top of the app's content mainly to interact with the user.

The component creates a backdrop to prevent interaction with content behind the modal, disables page scrolling while open,
manages focus by setting it to the first focusable element, and automatically adds the appropriate ARIA roles.

The dialog should always consist of a title and content. Optionally, a close button and actions can be provided.

```html
<sbb-dialog>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
</sbb-dialog>
```

## Slots

Consumers don't need to directly assign any slots; the dedicated components take care of assigning the correct slot.

The component supports slotting the `sbb-dialog-title`, `sbb-dialog-close-button`, `sbb-dialog-content` and an `sbb-dialog-actions` elements.

```html
<sbb-dialog>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-close-button></sbb-dialog-close-button>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
  <sbb-dialog-actions>
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

### Closing the dialog

The dialog can be closed in several ways:

1. **Close button**: Add an `<sbb-dialog-close-button>` component to provide a dedicated close button.
   This is recommended for dialogs with complex content.

   ```html
   <sbb-dialog>
     <sbb-dialog-title>Title</sbb-dialog-title>
     <sbb-dialog-close-button></sbb-dialog-close-button>
     <sbb-dialog-content>Dialog content.</sbb-dialog-content>
   </sbb-dialog>
   ```

2. **sbb-dialog-close attribute**: Add the `sbb-dialog-close` attribute to any element within the dialog
   (typically buttons in the actions section) to close the dialog when clicked. You can optionally provide a result value:

   ```html
   <sbb-dialog>
     <sbb-dialog-title>Title</sbb-dialog-title>
     <sbb-dialog-content>Dialog content.</sbb-dialog-content>
     <sbb-dialog-actions>
       <sbb-secondary-button sbb-dialog-close="cancel">Cancel</sbb-secondary-button>
       <sbb-button sbb-dialog-close="confirm">Confirm</sbb-button>
     </sbb-dialog-actions>
   </sbb-dialog>
   ```

   Alternatively, you can use the `assignDialogResult()` helper to programmatically assign a complex result to an element:

   ```js
   import { assignDialogResult } from '@sbb-esta/lyne-elements/dialog.js';

   const confirmButton = document.querySelector('sbb-button');
   assignDialogResult(confirmButton, { action: 'confirm', otherProp: 'any value' });
   ```

3. **Backdrop click**: By default, clicking on the backdrop will close the dialog.
   This behavior can be disabled by setting `backdrop-action="none"`.

4. **Escape key**: Pressing the `Esc` key will close the dialog.

5. **Programmatically**: Call the `close(result?: any)` method on the `sbb-dialog` element.
   This method closes the dialog and emits `beforeclose` and `close` events with the provided result as a payload.

   ```js
   const dialog = document.querySelector('sbb-dialog');
   dialog.close({ confirmed: true });
   ```

### Handling close events

When the dialog closes, it emits two events:

- `beforeclose`: Emitted before the closing transition begins. This event is cancelable by calling `event.preventDefault()`.
- `close`: Emitted after the dialog has fully closed.

Both events are of type `SbbDialogCloseEvent` and provide access to:

- `result`: The result value passed to `close()`, assigned via `assignDialogResult()`, or the value of the `sbb-dialog-close` attribute
- `closeTarget`: The element that triggered the close action (e.g., the clicked button), or `null` if closed programmatically or via Escape key

```js
dialog.addEventListener('close', (event) => {
  console.log('Result:', event.result);
  console.log('Close target:', event.closeTarget);
});
```

## Style

It's possible to display the component in `negative` variant using the self-named property.

```html
<sbb-dialog negative>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
</sbb-dialog>
```

## Accessibility

We recommend to place at maximum two actions in the `sbb-dialog-actions` component.
More elements can potentially confuse users.

If there is more complex content than just a simple text / question, we recommend to slot the `sbb-dialog-close-button`.
This either provides an initial focus at the dialog start and also provides as a second exit possibility.

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus.
In case there is no `sbb-dialog-close-button` and complex content,
there should be a focusable element at the dialog start, e.g. the title itself.
This prevents screen reader users having to navigate backwards from the dialog actions.

### Focus restoration

When closed, the dialog restores focus to the element that previously held focus when the
dialog opened by default. However, focus restoration can be disabled
by setting the `skipFocusRestoration` property to `true`.
As this is an accessibility feature, it is recommended to focus
an alternative element by listening to the `didClose` event.

<!-- Auto Generated Below -->

## Properties

| Name                   | Attribute              | Privacy | Type                        | Default    | Description                                                                                                                                                                                                                                                |
| ---------------------- | ---------------------- | ------- | --------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel`   | `accessibility-label`  | public  | `string`                    | `''`       | This will be forwarded as aria-label to the relevant nested element to describe the purpose of the overlay.                                                                                                                                                |
| `backdrop`             | `backdrop`             | public  | `'opaque' \| 'translucent'` | `'opaque'` | Backdrop density.                                                                                                                                                                                                                                          |
| `backdropAction`       | `backdrop-action`      | public  | `'close' \| 'none'`         | `'close'`  | Backdrop click action.                                                                                                                                                                                                                                     |
| `isOpen`               | -                      | public  | `boolean`                   |            | Whether the element is open.                                                                                                                                                                                                                               |
| `negative`             | `negative`             | public  | `boolean`                   | `false`    | Negative coloring variant flag.                                                                                                                                                                                                                            |
| `skipFocusRestoration` | `skipFocusRestoration` | public  | `boolean`                   | `false`    | Whether to skip restoring focus to the previously-focused element when the overlay is closed. Note that automatic focus restoration is an accessibility feature, and it is recommended that you provide your own equivalent, if you decide to turn it off. |
| `trigger`              | `trigger`              | public  | `HTMLElement \| null`       | `null`     | The element that will trigger the menu overlay. For attribute usage, provide an id reference.                                                                                                                                                              |

## Methods

| Name             | Privacy | Description                                                                 | Parameters    | Return | Inherited From          |
| ---------------- | ------- | --------------------------------------------------------------------------- | ------------- | ------ | ----------------------- |
| `announceTitle`  | public  | Announce the accessibility label or dialog title for screen readers.        |               | `void` |                         |
| `close`          | public  | Closes the component.                                                       | `result: any` | `void` | SbbOpenCloseBaseElement |
| `escapeStrategy` | public  | The method which is called on escape key press. Defaults to calling close() |               | `void` | SbbOpenCloseBaseElement |
| `open`           | public  | Opens the component.                                                        |               | `void` | SbbOpenCloseBaseElement |

## Events

| Name          | Type                  | Description                                                                  | Inherited From          |
| ------------- | --------------------- | ---------------------------------------------------------------------------- | ----------------------- |
| `beforeclose` | `SbbDialogCloseEvent` | Emits whenever the component begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `beforeopen`  | `Event`               | Emits whenever the component starts the opening transition. Can be canceled. | SbbOpenCloseBaseElement |
| `close`       | `SbbDialogCloseEvent` | Emits whenever the component is closed.                                      | SbbOpenCloseBaseElement |
| `open`        | `Event`               | Emits whenever the component is opened.                                      | SbbOpenCloseBaseElement |

## CSS Properties

| Name                   | Default                              | Description                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-dialog-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

## Slots

| Name | Description                                                                                                      |
| ---- | ---------------------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to provide a `sbb-dialog-title`, `sbb-dialog-content` and an optional `sbb-dialog-actions`. |
