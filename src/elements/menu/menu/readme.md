The `sbb-menu` is a component that can be attached to any element to open and display a custom context menu,
which allows to perform actions relevant to the current task by using the [sbb-menu-button](/docs/elements-sbb-menu-sbb-menu-button--docs)
or to navigate within or outside the application by using the [sbb-menu-link](/docs/elements-sbb-menu-sbb-menu-link--docs) component along with it.

## Interactions

The element that will trigger the menu dialog must be set using the `trigger` property.

The `sbb-menu` appears on trigger left click, and it is displayed as a sheet with a backdrop on mobile,  
while on desktop it will be shown as a floating menu, and it will calculate the optimal position relative to the trigger element
by evaluating the available space with the following priority: start/below, start/above, end/below, end/above.

Clicking in the backdrop or pressing the `ESC` key closes the menu.

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

### Disabled menu items

Disabled elements do not receive focus, and they can be problematic for screen reader users. It's preferable if the [`disabledInteractive`](/docs/elements-sbb-menu-sbb-menu-button--docs#interactive-disabled-buttons) property is used, instead.

```html
<sbb-menu>
  ...
  <sbb-menu-button disabled-interactive> Edit </sbb-menu-button>
  ...
</sbb-menu>
```

<!-- Auto Generated Below -->

## Properties

| Name      | Attribute | Privacy | Type                  | Default | Description                                                                                   |
| --------- | --------- | ------- | --------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `isOpen`  | -         | public  | `boolean`             |         | Whether the element is open.                                                                  |
| `trigger` | `trigger` | public  | `HTMLElement \| null` | `null`  | The element that will trigger the menu overlay. For attribute usage, provide an id reference. |

## Methods

| Name             | Privacy | Description                                                                 | Parameters | Return | Inherited From          |
| ---------------- | ------- | --------------------------------------------------------------------------- | ---------- | ------ | ----------------------- |
| `close`          | public  | Closes the menu and all its nested menus.                                   |            | `void` | SbbOpenCloseBaseElement |
| `closeAll`       | public  | Closes the menu and all related menus (nested and parent menus).            |            | `void` |                         |
| `escapeStrategy` | public  | The method which is called on escape key press. Defaults to calling close() |            | `void` | SbbOpenCloseBaseElement |
| `open`           | public  | Opens the menu on trigger click.                                            |            | `void` | SbbOpenCloseBaseElement |

## Events

| Name          | Type    | Description                                                                  | Inherited From          |
| ------------- | ------- | ---------------------------------------------------------------------------- | ----------------------- |
| `beforeclose` | `Event` | Emits whenever the component begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `beforeopen`  | `Event` | Emits whenever the component starts the opening transition. Can be canceled. | SbbOpenCloseBaseElement |
| `close`       | `Event` | Emits whenever the component is closed.                                      | SbbOpenCloseBaseElement |
| `open`        | `Event` | Emits whenever the component is opened.                                      | SbbOpenCloseBaseElement |

## CSS Properties

| Name                 | Default                              | Description                                                                                                                                                                                                   |
| -------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-menu-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

## Slots

| Name | Description                                                                                  |
| ---- | -------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add `sbb-menu-button`/`sbb-menu-link` or other elements to the menu. |
