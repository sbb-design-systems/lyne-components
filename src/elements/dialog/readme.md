The `sbb-dialog` component provides a way to present content on top of the app's content mainly to
interact with the user.

The component creates a backdrop to prevent interaction with content behind the modal, disables page
scrolling while open, manages focus by setting it to the first focusable element, and automatically
adds the appropriate ARIA roles.

The dialog should always consist of a title and content. Optionally, a close button and actions can
be provided.

```html
<sbb-dialog>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
</sbb-dialog>
```

The component supports slotting the `sbb-dialog-title`, `sbb-dialog-close-button`, `sbb-dialog-content`
and an `sbb-dialog-actions` elements for structuring the content of a dialog..

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

## Title

The `sbb-dialog-title` component extends the [sbb-title](/docs/elements-sbb-title--docs) component.
It should be used as a title for a dialog.

```html
<sbb-dialog>
  <sbb-dialog-title>A describing title of the dialog</sbb-dialog-title>
</sbb-dialog>
```

### States

The title can have a `negative` state which is automatically synchronized with the negative state of the dialog.

### Style

In scenarios where the visual representation needs to be different from the semantic meaning of the title level,
it is possible to use the `visualLevel` property (default value: `4`).

## Actions

The `sbb-dialog-actions` component extends the [sbb-action-group](/docs/elements-sbb-action-group--docs)
component. Use it to display a footer with an action group.

```html
<sbb-dialog>
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

   The `sbb-dialog-close-button` component extends the
   [sbb-secondary-button](/docs/elements-sbb-button-sbb-secondary-button--docs) component.
   An aria-label is automatically set. It is however possible to override it, if necessary.

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
