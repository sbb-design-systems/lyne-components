The `sbb-lead-container` can be used for product pages to display a lead image and following content.

Please note that the gaps between elements inside the unnamed slot (main content) need to be controlled by the consumer.
As per design rules, the spacings are defined as following:

```html
<sbb-breadcrump-group></sbb-breadcrump-group>
<!-- var(--sbb-spacing-4x) -->
<sbb-block-link></sbb-block-link>
<!-- var(--sbb-spacing-4x) -->
<sbb-title></sbb-title>
<!-- var(--sbb-spacing-responsive-s) -->
<p></p>
<!-- var(--sbb-spacing-responsive-s) -->
...
```

Full example with applied spacings in content:

```html
<sbb-lead-container>
  <style>
    .inner-container {
      display: flex;
      flex-direction: column;
      gap: var(--sbb-spacing-fixed-4x);
    }
    sbb-title {
      margin-block-start: 0;
    }
    p.lead-text {
      margin-block: 0;
    }
    p.other-content {
      margin-block-start: var(--sbb-spacing-responsive-s);
      margin-block-end: 0;
    }
  </style>
  <sbb-image
    slot="image"
    image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Bahnhof-Luzern.jpg"
    aspect-ratio="free"
  ></sbb-image>
  <div class="inner-container">
    <sbb-breadcrumb-group>
      <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
      <sbb-breadcrumb href="#" id="breadcrumb-1">Level 1</sbb-breadcrumb>
    </sbb-breadcrumb-group>
    <sbb-block-link
      icon-placement="start"
      icon-name="chevron-small-left-small"
      size="xs"
      href="https://www.sbb.ch"
    >
      Link
    </sbb-block-link>
    <sbb-title>Title</sbb-title>
  </div>
  <p class="sbb-text-xl lead-text">Lead text.</p>
  <p class="sbb-text-m other-content">Other content.</p>
</sbb-lead-container>
```

<!-- Auto Generated Below -->

## Slots

| Name    | Description                                                                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|         | Use the unnamed slot to add any content to the container.                                                                                                          |
| `image` | Use the image slot to provide the lead image. `sbb-image`, `img` and `picture` elements are supported. For other elements the aspect ratio has to be set manually. |
