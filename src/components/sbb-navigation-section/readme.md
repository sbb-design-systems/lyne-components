The `sbb-navigation-section` is a container for both [sbb-navigation-list](../sbb-navigation-list/readme.md) and [sbb-button](../sbb-button/readme.md).
Its intended use is inside a [sbb-navigation](../sbb-navigation/readme.md) component, in which it can be seen as a 'second-level' panel.

## Trigger

To display the `sbb-navigation-section` component you must provide a trigger element using the `trigger` property,
Optionally a label can be provided via slot or via the `titleContent` property.

```html
<sbb-navigation-section trigger="nav1" titleContent="Title 1">
  <sbb-navigation-list label="Label 1.1">
    <sbb-navigation-action aria-current="page" href="...">Label 1.1.1</sbb-navigation-action>
    <sbb-navigation-action href="...">Label 1.1.2</sbb-navigation-action>
    ...
  </sbb-navigation-list>
  <sbb-button>Something</sbb-button>
</sbb-navigation-section>
```

## Accessibility

When a navigation action is marked to indicate the user is currently on that page, `aria-current="page"` should be set on that action. 
Similarly, if a navigation action is marked to indicate a selected option (e.g., the selected language) `aria-pressed` should be set on that action.

<!-- Auto Generated Below --> 
 

## Properties 

| Name                     | Attribute                     | Privacy | Type                         | Default | Description                                                                                                            |
| ------------------------ | ------------------------ | ------- | ---------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `titleContent`           | `title-content`           | public  | `string \| undefined`        |         |                |
| `trigger`                | `trigger`                | public  | `string \| HTMLElement`      |         |                |
| `accessibilityLabel`     | `accessibility-label`     | public  | `string \| undefined`        |         |                |
| `accessibilityBackLabel` | `accessibility-back-label` | public  | `\| string     \| undefined` | This will be forwarded as aria-label to the back button element.                                                       |                |
| `disableAnimation`       | `disable-animation`       | public  | `boolean`                    | `false` | Whether the animation is enabled.                                                                                      |

## Methods

| Name    | Privacy | Description                                    | Parameters | Return | Inherited From |
| ------- | ------- | ---------------------------------------------- | ---------- | ------ | -------------- |
| `open`  | public  | Opens the navigation section on trigger click. |            | `void` |                |
| `close` | public  | Closes the navigation section.                 |            | `void` |                |

## Slots

| Name      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `unnamed` | Use this to project any content inside the navigation section. |

