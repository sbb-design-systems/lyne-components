The `<sbb-action-group>` component is a generic content container which can contain up to three action items
([sbb-button](/docs/elements-button--docs) or [sbb-block-link](/docs/elements-link--docs) or other HTML elements)
in various [allocations](#allocations).

## Style

### Orientation

The `sbb-action-group` behaves as a standard flex element, and it is possible to customize it via CSS.
Optionally a number of CSS classes are available to achieve most common cases, such as vertical, full width and some responsive variants
(The complete list is available in the [layout](/docs/guides-layout--docs#flex) documentation).

```html
<sbb-action-group class="sbb-orientation-horizontal-from-small">
  <sbb-secondary-button>Action 1</sbb-secondary-button>
  <sbb-button>Action 2</sbb-button>
  <sbb-block-link
    icon-name="chevron-small-left-small"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    Action 3
  </sbb-block-link>
</sbb-action-group>
```

## Allocations

Items can be displayed inside `<sbb-action-group>` in different allocations.

If we define the triad x-y-z as the number of elements aligned at the start, at the center and at the end of the component,
and we consider a template like the following one (possibly removing the link for 2-elements allocations):

```html
<sbb-action-group>
  <sbb-button>Button 1</sbb-button>
  <sbb-button>Button 2</sbb-button>
  <sbb-block-link
    icon-name="chevron-small-left-small"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    Link
  </sbb-block-link>
</sbb-action-group>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbActionGroupElement`, `sbb-action-group`

#### Slots

| Name | Description                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-action-group`. |
