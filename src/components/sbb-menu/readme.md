The `sbb-menu` is a component that can be attached to any element (trigger) to display a context menu. 
The menu appears on trigger left click. 

On mobile, the menu is displayed as a sheet with a backdrop; 
on desktop it will be shown as a floating menu and will calculate the optimal position relative to the trigger element 
by evaluating the available space with the following priority: start/below, start/above, end/below, end/above.

If only `sbb-menu-action` components are provided inside the menu, the items are automatically grouped within a list using `<ul>` and `<li>` items, for more complex scenarios the grouping must be done manually.

## Usage

The menu component allows you to open a custom menu that allows you to perform actions relevant to the current task 
or to navigate within or outside the application by using the `sbb-menu-action` component along with it as shown below:

```html
<!-- Trigger element -->
<sbb-button id="menu-trigger">Menu trigger</sbb-button>

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
<sbb-button id="menu-trigger">Menu trigger</sbb-button>

<!-- Menu component with custom content and menu actions -->
<sbb-menu trigger="menu-trigger">
    <div>Christina Müller</div>
    <span>UIS9057</span>
    <sbb-link href="https://www.sbb.ch/en" negative size="xs" variant="block">Profile</sbb-link>
    <sbb-divider />
    <sbb-menu-action icon="link-small" href="https://www.sbb.ch/en">View</sbb-menu-action>
    <sbb-menu-action icon="pen-small">Edit</sbb-menu-action>
    <sbb-menu-action icon="swisspass-small" amount="123">Details</sbb-menu-action>
    <sbb-divider />
    <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
</sbb-menu>
```

The default `z-index` of the component is set to `1000`; to specify a custom stack order, the `z-index` can be changed by defining the CSS variable `--sbb-menu-z-index`. 

Clicking in the backdrop or pressing the `ESC` key closes the menu.

### Accessibility

As the menu opens, the focus will automatically be set to the first focusable item within the component.
When using the `sbb-menu` as a select (e.g. language selection) it's recommended to use the `aria-pressed` attribute to identify which actions are active and which are not.

<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description                                                                                                 | Type                    | Default     |
| ------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `disableAnimation`       | `disable-animation`        | Whether the animation is enabled.                                                                           | `boolean`               | `false`     |
| `listAccessibilityLabel` | `list-accessibility-label` | This will be forwarded as aria-label to the inner list.                                                     | `string`                | `undefined` |
| `trigger`                | `trigger`                  | The element that will trigger the menu dialog. Accepts both a string (id of an element) or an HTML element. | `HTMLElement \| string` | `undefined` |


## Events

| Event        | Description                                            | Type                |
| ------------ | ------------------------------------------------------ | ------------------- |
| `did-close`  | Emits whenever the menu is closed.                     | `CustomEvent<void>` |
| `did-open`   | Emits whenever the menu is opened.                     | `CustomEvent<void>` |
| `will-close` | Emits whenever the menu begins the closing transition. | `CustomEvent<void>` |
| `will-open`  | Emits whenever the menu starts the opening transition. | `CustomEvent<void>` |


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


