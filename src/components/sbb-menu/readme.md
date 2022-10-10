# sbb-menu

The `sbb-menu` is a component that can be attached to any element (trigger) to display a context menu. 
The menu appears on trigger left click. 

On mobile, the menu is displayed as a sheet with a backdrop; 
on desktop it will be shown as a floating menu and will calculate the optimal position relative to the trigger element 
by evaluating the available space with the following priority: start/below, start/above, end/below, end/above.

## Usage

The menu component allows you to present a custom menu that allows you to perform actions relevant to the current task 
or to navigate within or outside the application by using the `sbb-menu-action` component along with it as shown below:

```html
<!-- Trigger element -->
<sbb-button id="menu-trigger" label="Menu trigger"></sbb-button>

<!-- Menu component with menu actions -->
<sbb-menu trigger="menu-trigger">
    <sbb-menu-action icon="link-small" href="https://www.sbb.ch/en">View</sbb-menu-action>
    <sbb-menu-action icon="pen-small">Edit</sbb-menu-action>
    <sbb-menu-action icon="swisspass-small" amount="123">Details</sbb-menu-action>
    <sbb-divider />
    <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
</sbb-menu>
```

You can also provide custom content inside the `sbb-menu`:

```html
<!-- Trigger element -->
<sbb-button id="menu-trigger" label="Menu trigger"></sbb-button>

<!-- Menu component with custom content and menu actions -->
<sbb-menu trigger="menu-trigger">
    <div>Christina Müller</div>
    <span>UIS9057</span>
    <sbb-link href="https://www.sbb.ch/en" negative text-size="xs" variant="block">Profile</sbb-link>
    <sbb-divider />
    <sbb-menu-action icon="link-small" href="https://www.sbb.ch/en">View</sbb-menu-action>
    <sbb-menu-action icon="pen-small">Edit</sbb-menu-action>
    <sbb-menu-action icon="swisspass-small" amount="123">Details</sbb-menu-action>
    <sbb-divider />
    <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
</sbb-menu>
```

Clicking in the backdrop or pressing the `ESC` key closes the menu.

### Accessibility

As the menu opens, the focus will automatically be set to the first focusable item within the component.

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                 | Type                    | Default     |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `disableAnimation` | `disable-animation` | Whether the animation is enabled.                                                                           | `boolean`               | `false`     |
| `trigger`          | `trigger`           | The element that will trigger the menu dialog. Accepts both a string (id of an element) or an HTML element. | `HTMLElement \| string` | `undefined` |


## Events

| Event                 | Description                                            | Type                |
| --------------------- | ------------------------------------------------------ | ------------------- |
| `sbb-menu_did-close`  | Emits whenever the menu is closed.                     | `CustomEvent<void>` |
| `sbb-menu_did-open`   | Emits whenever the menu is opened.                     | `CustomEvent<void>` |
| `sbb-menu_will-close` | Emits whenever the menu begins the closing transition. | `CustomEvent<void>` |
| `sbb-menu_will-open`  | Emits whenever the menu starts the opening transition. | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Closes the menu.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the menu on trigger click.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                             |
| ----------- | ------------------------------------------------------- |
| `"unnamed"` | Use this slot to project any content inside the dialog. |


----------------------------------------------


