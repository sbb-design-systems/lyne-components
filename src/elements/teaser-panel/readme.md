The `<sbb-teaser-panel>` simple component that displays the content in a vertically centered trapezoidal shape.

It matches the size and overlaps the parent element. Therefore, the parent element must have `position: relative` css property.

By default, the container has a bg-color fade effect on mouse hover.

```html
<div style="height: ...px; position: relative;">
  <!-- It expands to overlap the parent element -->
  <sbb-teaser-panel> Panel content </sbb-teaser-panel>
</div>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbTeaserPanelElement`, `sbb-teaser-panel`

#### Slots

| Name | Description                                           |
| ---- | ----------------------------------------------------- |
|      | Use the unnamed slot to add text content to the panel |
