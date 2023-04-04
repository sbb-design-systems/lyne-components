The hero teaser should be an eye-catcher and should have an emotional effect on the user with its large image component. 

The `sbb-teaser-hero` is a link with a description, an action call and a background image.
You can either use slots or props to render the `sbb-teaser-hero` component.

## Usage with props

```html
<sbb-teaser-hero href="https://www.sbb.ch" link-content="Find out more" image-src="https://path-to-source" image-alt="SBB CFF FFS Employee">
  Break out and explore castles and palaces.
</sbb-teaser-hero>
```

## Usage with slots

```html
<sbb-teaser-hero href="https://www.sbb.ch">
  Break out and explore castles and palaces.
  <sbb-image slot="image" image-src="https://path-to-source" alt="SBB CFF FFS Employee"/>
  <span slot="link-content">Find out more</span>
</sbb-teaser-hero>
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                       | Type     | Default     |
| ------------- | -------------- | ----------------------------------------------------------------- | -------- | ----------- |
| `href`        | `href`         | The href value you want to link to.                               | `string` | `undefined` |
| `imageAlt`    | `image-alt`    | Image alt text will be passed to `sbb-image`.                     | `string` | `undefined` |
| `imageSrc`    | `image-src`    | Image src will be passed to `sbb-image`.                          | `string` | `undefined` |
| `linkContent` | `link-content` | Panel link text.                                                  | `string` | `undefined` |
| `rel`         | `rel`          | The relationship of the linked URL as space-separated link types. | `string` | `undefined` |
| `target`      | `target`       | Where to display the linked URL.                                  | `string` | `undefined` |


## Slots

| Slot             | Description                                |
| ---------------- | ------------------------------------------ |
| `"image"`        | the background image, can be a `sbb-image` |
| `"link-content"` | link content of the panel                  |
| `"unnamed"`      | text content of panel                      |


## Dependencies

### Depends on

- [sbb-link](../sbb-link)
- [sbb-image](../sbb-image)

### Graph
```mermaid
graph TD;
  sbb-teaser-hero --> sbb-link
  sbb-teaser-hero --> sbb-image
  sbb-link --> sbb-icon
  style sbb-teaser-hero fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


