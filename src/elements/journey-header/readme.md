The `<sbb-journey-header>` element inherits from the `<sbb-title>` component,
which is used to display the title of the journey.

The component has two required properties, named `origin` and `destination`,
which represents the two ends of the journey.
An icon is placed between them: if the property `roundTrip` is set to false (default),
the icon is an arrow pointing to the `destination`, otherwise it is a double arrow to display the round-trip.

```html
<sbb-journey-header origin="Point A" destination="Point B"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" round-trip></sbb-journey-header>
```

## Style

The component has a `level` property, which is passed to its inner `<sbb-title>` component;
it is rendered as a heading from `h1` to `h6`. Default `level` is `3`.
It also has a `visualLevel` property, which can be used in scenarios
where the visual representation needs to be different from the semantic meaning of the title level.
The default `visualLevel` is `5`.

The component also has a `negative` background variant.

```html
<sbb-journey-header origin="Point A" destination="Point B" visual-level="4"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" level="5"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" negative></sbb-journey-header>
```

## Accessibility

The component sets an `aria-label` on its host element which is read by screen readers to provide a description of the journey.

The following example will be read as (locale: EN): `Connection from Point A to Point B.`.

```html
<sbb-journey-header origin="Point A" destination="Point B"></sbb-journey-header>
```

The following one will be read as (locale: EN): `Connection from Point A to Point B and back to Point A.`.

```html
<sbb-journey-header origin="Point A" destination="Point B" round-trip></sbb-journey-header>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbJourneyHeaderElement`, `sbb-journey-header`

#### Properties

| Name          | Attribute      | Privacy | Type                    | Default | Description                                                                       |
| ------------- | -------------- | ------- | ----------------------- | ------- | --------------------------------------------------------------------------------- |
| `destination` | `destination`  | public  | `string`                | `''`    | Destination location for the journey header.                                      |
| `level`       | `level`        | public  | `SbbTitleLevel`         | `'3'`   | Title level                                                                       |
| `negative`    | `negative`     | public  | `boolean`               | `false` | Negative coloring variant flag.                                                   |
| `origin`      | `origin`       | public  | `string`                | `''`    | Origin location for the journey header.                                           |
| `roundTrip`   | `round-trip`   | public  | `boolean`               | `false` | Whether the journey is a round trip. If so, the icon changes to a round-trip one. |
| `visualLevel` | `visual-level` | public  | `SbbTitleLevel \| null` | `'5'`   | Visual level for the title.                                                       |
