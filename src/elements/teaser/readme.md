The `<sbb-teaser>` is a component which can display an image with a caption, and it behaves like a link on user interaction.

Use the `<sbb-teaser-static>` variant instead, if the teaser must not behave like a link itself,
e.g. because it already contains one or more interactive/focusable elements
(more than a single static action is not supported within a link).

Simple teaser example:

```html
<sbb-teaser href="https://www.sbb.ch">
  <img slot="image" src="..." alt="400x300" />
  <sbb-chip-label>Chip label</sbb-chip-label>
  <sbb-title level="2">Title</sbb-title>
  A brief description.
</sbb-teaser>
```

## Slots

The default slot is reserved for the description and,
optionally, a [sbb-title](/docs/elements-title--docs) and a [sbb-chip-label](/docs/elements-chip-label--docs).
The component displays the `image` with the self-named slot.

Use the `image` slot to pass a `figure` containing an `<sbb-image>` or an `img` that will be used as background.
Optionally, you can add an overlapping `<sbb-chip-label>` to the slotted `figure` (see [sbb-image doc](/docs/elements-image--docs#utility-classes)).

```html
<sbb-teaser href="https://www.sbb.ch">
  <figure slot="image" class="sbb-figure">
    <img src="..." alt="400x300" />
    <sbb-chip-label class="sbb-figure-overlap-start-start">AI Generated</sbb-chip-label>
  </figure>
  <sbb-chip-label>Chip label</sbb-chip-label>
  <sbb-title level="2">Title</sbb-title>
  A brief description.
</sbb-teaser>
```

Use the `action` slot to display a static action below the description,
e.g. a [sbb-secondary-button-static](/docs/elements-button-secondary-button-static--docs) or another static button variant.
Since the `<sbb-teaser>` itself already behaves like a link, the slotted action must be a **static** element
(non-interactive, no own `href`/click handling) to avoid nested interactive/focusable elements.
Sbb buttons are automatically assigned to the `action` slot when slotted in the default slot.

```html
<sbb-teaser href="https://www.sbb.ch">
  <img slot="image" src="..." alt="400x300" />
  <sbb-chip-label>Chip label</sbb-chip-label>
  <sbb-title level="2">Title</sbb-title>
  A brief description.
  <sbb-secondary-button-static>Read more</sbb-secondary-button-static>
</sbb-teaser>
```

## Style

Using the `alignment` property, it is possible to change the text position respect to the image.
Possible values are `before`, `after-centered`, `after-centered` (default), `after` and `below`.

```html
<sbb-teaser href="https://www.sbb.ch" alignment="below"> ... </sbb-teaser>
```

The component has two different sizes (`m` and `l`), which can be changed using the `size` property.
The size defaults to `m` in both the standard and the lean theme.

```html
<sbb-teaser size="l" href="https://www.sbb.ch"> ... </sbb-teaser>
```

By default, the image dimensions are set using the width and the aspect ratio.
Default values are `300px` and `4/3`. Consumers can change these values on their slotted image element.

### Flexible Layouts

If using the teaser in a flexible layout like CSS grid or flex together with `alignment=below`,
the CSS variable `--sbb-teaser-align-items` with `stretch` as value can be used
to achieve the image width taking the full available space. On the image itself, the width must be set to `100%`.

```html
<div style="display: grid; gap: 1rem; grid-template-rows: repeat(2, 1fr)">
  <sbb-teaser style="--sbb-teaser-align-items: stretch" href="https://www.sbb.ch" alignment="below">
    <sbb-image style="width: 100%;" slot="image" image-src="..." alt="description"></sbb-image>
    ...
  </sbb-teaser>
  <sbb-teaser style="--sbb-teaser-align-items: stretch" href="https://www.sbb.ch" alignment="below">
    <sbb-image style="width: 100%;" slot="image" image-src="..." alt="description"></sbb-image>
    ...
  </sbb-teaser>
</div>
```

## Accessibility

It's important to set the `accessibilityLabel` on the `<sbb-teaser>`, which describes the `<sbb-teaser>` for screen-reader users.

The description text is wrapped into an `<p>` element to guarantee the semantic meaning.

## Static variant

The `<sbb-teaser-static>` is a non-interactive version of the `<sbb-teaser>` component.
Unlike `<sbb-teaser>`, it does not render an anchor and therefore has no `href`, `target`, `rel`,
`download`, `accessibilityLabel` or `accessibilityCurrent` property.
It should be used whenever the teaser has to contain more than one interactive element,
e.g. multiple links or buttons, since nesting interactive elements inside a link is not allowed.

```html
<sbb-teaser-static>
  <img slot="image" src="..." alt="400x300" />
  <sbb-chip-label>Chip label</sbb-chip-label>
  <sbb-title level="2">Title</sbb-title>
  A brief description.
  <sbb-secondary-button-link href="#">Read more</sbb-secondary-button-link>
</sbb-teaser-static>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbTeaserElement`, `sbb-teaser`

#### Properties

| Name                   | Attribute               | Privacy | Type                                                                      | Default            | Description                                                               |
| ---------------------- | ----------------------- | ------- | ------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------- |
| `accessibilityCurrent` | `accessibility-current` | public  | `string`                                                                  | `''`               | This will be forwarded as aria-current to the inner anchor element.       |
| `accessibilityLabel`   | `accessibility-label`   | public  | `string`                                                                  | `''`               | This will be forwarded as aria-label to the inner anchor element.         |
| `alignment`            | `alignment`             | public  | `'before' \| 'before-centered' \| 'after' \| 'after-centered' \| 'below'` | `'after-centered'` | Teaser variant - define the position and the alignment of the text block. |
| `download`             | `download`              | public  | `boolean`                                                                 | `false`            | Whether the browser will show the download dialog on click.               |
| `href`                 | `href`                  | public  | `string`                                                                  | `''`               | The href value you want to link to.                                       |
| `rel`                  | `rel`                   | public  | `string`                                                                  | `''`               | The relationship of the linked URL as space-separated link types.         |
| `size`                 | `size`                  | public  | `'m' \| 'l' \| null`                                                      | `null`             | Size variant, either m (default) or l.                                    |
| `target`               | `target`                | public  | `'_blank' \| '_self' \| '_parent' \| '_top' \| string`                    | `''`               | Where to display the linked URL.                                          |

#### Slots

| Name     | Description                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
|          | Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.                                                       |
| `action` | Slot for a static action, e.g. a `<sbb-secondary-button-static>` element. The action is displayed below the description.                    |
| `chip`   | Slot for the `sbb-chip-label` element. The slot on the `sbb-chip-label` element is automatically assigned when slotted in the unnamed slot. |
| `image`  | Slot used to render the image.                                                                                                              |
| `title`  | Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.              |

### class: `SbbTeaserStaticElement`, `sbb-teaser-static`

#### Properties

| Name        | Attribute   | Privacy | Type                                                                      | Default            | Description                                                               |
| ----------- | ----------- | ------- | ------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------- |
| `alignment` | `alignment` | public  | `'before' \| 'before-centered' \| 'after' \| 'after-centered' \| 'below'` | `'after-centered'` | Teaser variant - define the position and the alignment of the text block. |
| `size`      | `size`      | public  | `'m' \| 'l' \| null`                                                      | `null`             | Size variant, either m (default) or l.                                    |

#### Slots

| Name     | Description                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
|          | Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.                                                       |
| `action` | Slot for an interactive action, e.g. a `<sbb-secondary-button-link>` element. The action is displayed below the description.                |
| `chip`   | Slot for the `sbb-chip-label` element. The slot on the `sbb-chip-label` element is automatically assigned when slotted in the unnamed slot. |
| `image`  | Slot used to render the image.                                                                                                              |
| `title`  | Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.              |
