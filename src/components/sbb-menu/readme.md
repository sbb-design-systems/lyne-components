The `sbb-menu` is a component that can be attached to any element to open and display a custom context menu,
which allows to perform actions relevant to the current task or to navigate within or outside the application 
by using the [sbb-menu-action](/docs/components-sbb-menu-sbb-menu-action--docs) component along with it.

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

## Style 

If only `sbb-menu-action` components are provided, the items are automatically grouped within a list
using `<ul>` and `<li>` items, for more complex scenarios the grouping must be done manually.

The default `z-index` of the component is set to `1000`; 
to specify a custom stack order, the `z-index` can be changed by defining the CSS variable `--sbb-menu-z-index`.

## Accessibility

As the menu opens, the focus will automatically be set to the first focusable item within the component.
When using the `sbb-menu` as a select (e.g. language selection) it's recommended to use the `aria-pressed` attribute 
to identify which actions are active and which are not.

<!-- Auto Generated Below --> 
 

## Properties

| Name                     | Privacy | Type                    | Default | Description                                                                                                                           | Inherited From |
| ------------------------ | ------- | ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `trigger`                | public  | `string \| HTMLElement` |         | The element that will trigger the menu dialog.&#xA;Accepts both a string (id of an element) or an HTML element.                       |                |
| `disableAnimation`       | public  | `boolean`               | `false` | Whether the animation is enabled.                                                                                                     |                |
| `listAccessibilityLabel` | public  | `string \| undefined`   |         | This will be forwarded as aria-label to the inner list.&#xA;Used only if the menu automatically renders the actions inside as a list. |                |

## Methods

| Name    | Privacy | Description                      | Parameters | Return | Inherited From |
| ------- | ------- | -------------------------------- | ---------- | ------ | -------------- |
| `open`  | public  | Opens the menu on trigger click. |            | `void` |                |
| `close` | public  | Closes the menu.                 |            | `void` |                |

