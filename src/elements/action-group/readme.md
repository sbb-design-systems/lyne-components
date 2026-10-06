The `<sbb-action-group>` component is a generic content container for action items such as
[sbb-button](/docs/elements-button--docs), [sbb-block-link](/docs/elements-link--docs) or other HTML elements.

## Style

The `sbb-action-group` behaves like a standard flex element. It can be customized
via CSS rules directly on the `<sbb-action-group>` element or on the slotted action elements.

A set of CSS classes is available for common layout configurations such as vertical orientation
items and responsive breakpoint variants
(the complete list is available in the [layout](/docs/guides-layout--docs#flex) documentation).

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

Adding the `sbb-orientation-vertical-full-width` class switches the group to a vertical column layout
where each action item stretches to the full width of the container.

```html
<sbb-action-group class="sbb-orientation-vertical-full-width">
  <sbb-secondary-button>Action 1</sbb-secondary-button>
  <sbb-button>Action 2</sbb-button>
</sbb-action-group>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbActionGroupElement`, `sbb-action-group`

#### Slots

| Name | Description                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-action-group`. |
