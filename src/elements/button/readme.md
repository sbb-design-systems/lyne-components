The button components from Lyne provide the same functionality as a native `<button>`
enhanced with SBB Design, accepting its associated properties (`type`, `name`, `value` and `form`).

Note: In contrast with other modules, each button component has its own entry point
(e.g. `@sbb-esta/lyne-elements/button/button.js`). This is due to the amount of button variants.

```html
<sbb-button>Button text</sbb-button>
<sbb-secondary-button>Button text</sbb-secondary-button>
<sbb-accent-button>Button text</sbb-accent-button>
<sbb-transparent-button>Button text</sbb-transparent-button>
```

For every variant there is also a link version.

```html
<sbb-button-link>Button text</sbb-button-link>
<sbb-secondary-button-link>Button text</sbb-secondary-button-link>
<sbb-accent-button-link>Button text</sbb-accent-button-link>
<sbb-transparent-button-link>Button text</sbb-transparent-button-link>
```

Additionally for every variant there is a static version that can be used inside another
interactive element (e.g. an `anchor (a)`).

```html
<sbb-button-static>Button text</sbb-button-static>
<sbb-secondary-button-static>Button text</sbb-secondary-button-static>
<sbb-accent-button-static>Button text</sbb-accent-button-static>
<sbb-transparent-button-static>Button text</sbb-transparent-button-static>
```

There is also a mini button variant, which can be used for specific contexts, such as inside
a `sbb-form-field`.

```html
<sbb-mini-button>Button text</sbb-mini-button>
<sbb-mini-button-link>Button text</sbb-mini-button-link>
```

Each button component can optionally display an `sbb-icon` at the component start
using the `iconName` property or via custom content using the `icon` slot.
All button usages must either provide text content, an icon (for icon only) or both.

```html
<!-- Buttons with both icon and text -->
<sbb-button icon-name="info">Button text</sbb-button>

<sbb-button>
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-button>

<!-- Buttons with only an icon -->
<sbb-button icon-name="info" aria-label="Click for more information."></sbb-button>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are different sizes (except for the mini-button), `s`, `m` and `l`,
that can be set using the `size` property.

The component can be displayed in `disabled` state using the corresponding property.

```html
<sbb-button negative>Button</sbb-button>

<sbb-button size="m">Button</sbb-button>

<sbb-button disabled>Button</sbb-button>
```

### Loading state

The button components (except for the mini-button) can be configured into a
loading state using the `loading` property.
This should be done by listening to the `click` event on the button and setting
the loading property to `true` e.g. when waiting for a response from the server.
After receiving the response, the property should be set back to `false`.
The loading state will be animated after a delay of 300ms, which can be configured with the
`--sbb-button-loading-delay` CSS variable.

```html
<sbb-button
  @click="${(e: PointerEvent) =>
  { 
    const button = e.currentTarget as SbbButtonElement;
    button.loading = true;
    setTimeout(() => (button.loading = false), 4000); 
  }}"
>
  Button
</sbb-button>
```

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the CSS var on `sbb-button` or any parent element:

```css
sbb-button {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## Accessibility

Use the accessibility properties in case of an icon-only button to describe the purpose of the `sbb-button` for screen-reader users.

### Interactive disabled buttons

Native disabled elements cannot receive focus and do not dispatch any events. This can
be problematic in some cases because it can prevent the app from telling the user why the button is
disabled. Consumers can use the `disabledInteractive` property to style the button as disabled but allow for
it to receive focus and dispatch events. The button will have `aria-disabled="true"` for assistive
technology. It is the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

**Note:** Using the `disabledInteractive` property can result in buttons that previously prevented
actions to no longer do so, for example a submit button in a form. When using this input, you should
guard against such cases in your component.
