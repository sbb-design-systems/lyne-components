TODO: order of sidebar in container is important, how to connect header

> > Explain the use and the purpose of the component; add minor details if needed and provide a basic example.<br>
> > If you reference other components, link their documentation at least once (the path must start from _/docs/..._ ).<br>
> > For the examples, use triple backticks with file extension (` ```html <code here>``` `).<br>
> > The following list of paragraphs is only suggested; remove, create and adapt as needed.

The `sbb-sidebar` is a component . . .

```html
<sbb-sidebar></sbb-sidebar>
```

## Slots

> Describe slot naming and usage and provide an example of slotted content.

## States

> Describe the component states (`disabled`, `readonly`, etc.) and provide examples.

## Style

> Describe the properties which change the component visualization (`size`, `negative`, etc.) and provide examples.

## Interactions

> Describe how it's possible to interact with the component (open and close a `sbb-dialog`, dismiss a `sbb-alert`, etc.) and provide examples.

## Events

> Describe events triggered by the component and possibly how to get information from the payload.

## Keyboard interaction

> If the component has logic for keyboard navigation (as the `sbb-calendar` or the `sbb-select`) describe it.

| Keyboard       | Action        |
| -------------- | ------------- |
| <kbd>Key</kbd> | What it does. |

## Accessibility

> Describe how accessibility is implemented and if there are issues or suggested best-practice for the consumers.

<!-- Auto Generated Below -->

## Properties

| Name        | Attribute  | Privacy | Type                  | Default   | Description                                                                      |
| ----------- | ---------- | ------- | --------------------- | --------- | -------------------------------------------------------------------------------- |
| `color`     | `color`    | public  | `'white' \| 'milk'`   | `'white'` | Background color of the sidebar. Either `white` or `milk`. \*                    |
| `container` | -          | public  | `HTMLElement \| null` |           | Returns the SbbIconSidebarContainerElement where this icon-sidebar is contained. |
| `position`  | `position` | public  | `'start' \| 'end'`    | `'start'` | The side that the sidebar is attached to.                                        |

## Slots

| Name | Description                                                     |
| ---- | --------------------------------------------------------------- |
|      | Use the unnamed slot to slot any content into the icon-sidebar. |
