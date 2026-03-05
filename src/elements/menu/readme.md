The `sbb-menu` is a component that can be attached to any element to open and display a custom context menu,
which allows to perform actions relevant to the current task by using the `sbb-menu-button`
or to navigate within or outside the application by using the `sbb-menu-link` component along with it.

```html
<!-- Trigger element -->
<sbb-button id="menu-trigger">Menu trigger</sbb-button>

<!-- Menu component with menu actions -->
<sbb-menu trigger="menu-trigger">
  <sbb-menu-link icon="link-small" href="https://www.sbb.ch/en">View</sbb-menu-link>
  <sbb-menu-button icon="pen-small">Edit</sbb-menu-button>
  <sbb-menu-button icon="swisspass-small" sbb-badge="12" aria-label="Details, containing 12 items">
    Details
  </sbb-menu-button>
  <sbb-divider></sbb-divider>
  <sbb-menu-button icon="cross-small">Cancel</sbb-menu-button>
</sbb-menu>
```

## Interactions

The element that will trigger the menu dialog must be set using the `trigger` property.

The `sbb-menu` appears on trigger left click, and it is displayed as a sheet with a backdrop on mobile,  
while on desktop it will be shown as a floating menu, and it will calculate the optimal position relative to the trigger element
by evaluating the available space with the following priority: start/below, start/above, end/below, end/above.

Clicking in the backdrop or pressing the `ESC` key closes the menu.

You can also provide custom content inside the `sbb-menu`:

```html
<!-- Trigger element -->
<sbb-button id="menu-trigger">Menu trigger</sbb-button>

<!-- Menu component with custom content and menu actions -->
<sbb-menu trigger="menu-trigger">
  <div>Christina Müller</div>
  <span>UIS9057</span>
  <sbb-block-link href="https://www.sbb.ch/en" size="xs">Profile</sbb-block-link>
  <sbb-divider></sbb-divider>
  <sbb-menu-link icon="link-small" href="https://www.sbb.ch/en">View</sbb-menu-link>
  <sbb-menu-button icon="pen-small">Edit</sbb-menu-button>
  <sbb-menu-button icon="swisspass-small" sbb-badge="12" aria-label="Details, containing 12 items">
    Details
  </sbb-menu-button>
  <sbb-divider></sbb-divider>
  <sbb-menu-button icon="cross-small">Cancel</sbb-menu-button>
</sbb-menu>
```

## Nesting menus

It is possible to create submenus by connecting a menu to a `sbb-menu-button`/`sbb-menu-link`
element via trigger property / attribute of the `sbb-menu`.
On smaller screens, submenus will automatically display a back button to navigate back to the parent menu.

Please note that nesting the menus in DOM is not supported. The `sbb-menu` elements have to be siblings in order to work.

```html
<sbb-menu>
  <sbb-menu-button icon="pen-small" id="submenu-trigger">Submenu trigger</sbb-menu-button>
</sbb-menu>
<sbb-menu trigger="submenu-trigger">
  <sbb-menu-link icon="link-small" href="https://www.sbb.ch/en">View</sbb-menu-link>
  <sbb-menu-button icon="swisspass-small" sbb-badge="12">Details</sbb-menu-button>
</sbb-menu>
```

## Menu Link

The `sbb-menu-link` component is equivalent to a native `anchor (a)` element and is internally rendered as
a link, accepting its associated properties (`href`, `target`, `rel` and `download`).

The component can optionally display a `sbb-icon` at the component start using the `iconName` property
or via custom content using the `icon` slot.

```html
<sbb-menu-link href="#">Text</sbb-menu-link>

<sbb-menu-link href="#info" target="_blank">Link</sbb-menu-link>

<sbb-menu-link href="#" icon-name="pie-small">Another text</sbb-menu-link>
```

### Badge

A badge can be rendered on the icon as white text in a red circle via the `sbb-badge` attribute.
It's recommended to hide the badge when the menu link is disabled.
It's mandatory to provide the badge information for screen readers either with the `accessibility-label` attribute
or a hidden text (`<sbb-screen-reader-only>` for example).

```html
<sbb-menu-link
  href="#"
  sbb-badge="2"
  accessibility-label="Show messages, 2 new messages available"
  icon-name="pie-small"
>
  Messages
</sbb-menu-link>
```

## Menu Button

The `sbb-menu-button` component is equivalent to a native `button` element, accepting its associated
properties (`type`, `name`, `value` and `form`).

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-menu-button>Text</sbb-menu-button>

<sbb-menu-button icon-name="pie-small">Another text</sbb-menu-button>
```

## Badge

A badge can be rendered on the icon as white text in a red circle via the `sbb-badge` attribute.
It's recommended to hide the badge when the menu button is disabled.
It's mandatory to provide the badge information for screen readers either with an `aria-label`
or a hidden text (`<sbb-screen-reader-only>` for example).

```html
<sbb-menu-button
  sbb-badge="2"
  aria-label="Show messages, 2 new messages available"
  icon-name="pie-small"
>
  Messages
</sbb-menu-button>
```

## Accessibility

The `sbb-menu` uses the roles `menu` and `menuitem` for children.

As the menu opens, the focus will automatically be set to the first focusable
item within the component (unless manually specified, see below).
When using the `sbb-menu` as a select (e.g. language selection) it's recommended to use the `aria-pressed` attribute
to identify which actions are active and which are not.

It is possible to navigate the slotted `sbb-menu-button`/`sbb-menu-link` via keyboard using arrow keys or page keys
(<kbd>Home</kbd>, <kbd>PageUp</kbd>, <kbd>End</kbd> and <kbd>PageDown</kbd>).
If the trigger element for a nested menu is focused, <kbd>ArrowRight</kbd> will open and focus the submenu;
if the focus is currently on a nested menu, <kbd>ArrowLeft</kbd> will close the current menu and go back to the parent menu.

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus (recommended).

```html
<sbb-menu>
  <sbb-block-link href="https://www.sbb.ch/en" size="xs">Profile</sbb-block-link>
  <sbb-menu-link sbb-initial-focus icon="link-small" href="https://www.sbb.ch/en">
    Receives initial focus
  </sbb-menu-link>
</sbb-menu>
```

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

```html
<sbb-menu>
  ...
  <sbb-menu-button disabled-interactive> Edit </sbb-menu-button>
  ...
</sbb-menu>
```
