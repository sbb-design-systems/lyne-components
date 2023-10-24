The `sbb-navigation` component provides a way to present a navigation menu. 

Some of its features are: 

- uses a native dialog element;
- creates a backdrop for disabling interaction below the navigation;
- disables scrolling of the page content while open;
- manages focus properly by setting it on the first focusable element;
- can act as a host for components as [sbb-navigation-list](/docs/components-sbb-navigation-sbb-navigation-list--docs), 
 [sbb-navigation-marker](/docs/components-sbb-navigation-sbb-navigation-marker--docs) 
 and [sbb-navigation-section](/docs/components-sbb-navigation-sbb-navigation-section--docs);

## Interactions

To display the `sbb-navigation` component you can either provide a trigger element using the `trigger` property,
or call the `open()` method on the `sbb-navigation` component.

```html
<!-- Trigger element -->
<sbb-button id="nav-trigger">Navigation trigger</sbb-button>

<!-- Navigation component with navigation sections -->
<sbb-navigation trigger="nav-trigger">
  <sbb-navigation-marker>
    <sbb-navigation-action aria-current="page" id="nav-section-1">Label 1</sbb-navigation-action>
    <sbb-navigation-action id="nav-section-2">Label 2</sbb-navigation-action>
    <sbb-navigation-action href="https://www.sbb.ch/some/route">Label 3</sbb-navigation-action>
  <sbb-navigation-marker>
  
  <sbb-navigation-marker>
    <sbb-navigation-action aria-pressed="true">Language 1</sbb-navigation-action>
    <sbb-navigation-action aria-pressed="false">Language 2</sbb-navigation-action>
    <sbb-navigation-action aria-pressed="false">Language 3</sbb-navigation-action>
  <sbb-navigation-marker>

  <sbb-navigation-section trigger="nav-section-1">
    <span slot="label">Title 1</span>
    <sbb-navigation-list>
      <span slot="label">Label 1.1</span>
      <sbb-navigation-action href="...">Label 1.1.1</sbb-navigation-action>
      <sbb-navigation-action href="...">Label 1.1.2</sbb-navigation-action>
      <sbb-navigation-action href="...">Label 1.1.3</sbb-navigation-action>
    </sbb-navigation-list>
    ...
    <sbb-button>Something</sbb-button>
  </sbb-navigation-section>
  ...
</sbb-navigation>
```

## Style

The default `z-index` of the component is set to `1000`; 
to specify a custom stack order, the `z-index` can be changed by defining the CSS variable `--sbb-navigation-z-index`.

## Accessibility

When a navigation action is marked to indicate the user is currently on that page, `aria-current="page"` should be set on that action. 
Similarly, if a navigation action is marked to indicate a selected option (e.g., the selected language) `aria-pressed` should be set on that action.

<!-- Auto Generated Below --> 
 

## Properties

| Name                      | Privacy | Type                         | Default | Description                                                                                                    | Inherited From |
| ------------------------- | ------- | ---------------------------- | ------- | -------------------------------------------------------------------------------------------------------------- | -------------- |
| `trigger`                 | public  | `string \| HTMLElement`      |         | The element that will trigger the navigation.&#xA;Accepts both a string (id of an element) or an HTML element. |                |
| `accessibilityLabel`      | public  | `string \| undefined`        |         | This will be forwarded as aria-label to the dialog and is read as a title of the navigation.                   |                |
| `accessibilityCloseLabel` | public  | `\| string     \| undefined` |         | This will be forwarded as aria-label to the close button element.                                              |                |
| `disableAnimation`        | public  | `boolean`                    | `false` | Whether the animation is enabled.                                                                              |                |

## Methods

| Name    | Privacy | Description            | Parameters | Return | Inherited From |
| ------- | ------- | ---------------------- | ---------- | ------ | -------------- |
| `open`  | public  | Opens the navigation.  |            | `void` |                |
| `close` | public  | Closes the navigation. |            | `void` |                |

