The train module contains components to visualize train formations in a timetable context.
It is divided into the following components:

```html
<sbb-train-formation>
  <sbb-train>
    <sbb-train-wagon></sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
  </sbb-train>
</sbb-train-formation>
```

- The **`<sbb-train-formation>`** is a container for one or more `<sbb-train>` components.
  It ensures orchestration of the contained `<sbb-train>` components and provides a common context
  for them, such as the perspective of the train (side or top view) and inline padding.
- The **`<sbb-train>`** is a container for one or more `<sbb-train-wagon>` components and `<sbb-train-blocked-passage>` components.
  It provides the context for the contained components, such as the direction of the train and the station label.
- The **`<sbb-train-wagon>`** is a component which represents a train compartment.
- The **`<sbb-train-blocked-passage>`** is a component which visually displays a blocked passage between two `<sbb-train-wagon>` components.

## sbb-train-formation

```html
<sbb-train-formation>
  <sbb-train
    direction-label="Direction of travel"
    station="Bern"
    direction="left"
    accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
  >
    <sbb-train-wagon
      sector="A"
      type="locomotive"
      additional-accessibility-text="Top of the train"
    ></sbb-train-wagon>
    <sbb-train-wagon sector="A" type="closed"> </sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      sector="A"
      type="wagon"
      label="38"
      occupancy="low"
      wagon-class="1"
      blocked-passage="previous"
    >
      <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      <sbb-icon
        aria-hidden="false"
        aria-label="Business zone in 1st class: Reservation possible"
        name="sa-bz"
      ></sbb-icon>
    </sbb-train-wagon>
    ...
  </sbb-train>
  <sbb-train
    direction-label="Direction of travel"
    station="Luzern"
    direction="left"
    accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction"
  >
    ...
  </sbb-train>
</sbb-train-formation>
```

### View

The perspective of the train can be switched with the `view` property between `side` (default) and `top`.

### Inline padding

In certain circumstances there should be a left and right padding applied, but including the scrollbar.
To achieve the inline padding, set a value to the
CSS variable `--sbb-train-formation-padding-inline` like `var(--sbb-spacing-fixed-4x)`.

## sbb-train

```html
<sbb-train
  direction-label="driving direction"
  direction-label-level="3"
  station="Genève-Aéroport"
  direction="left"
  accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
>
  ...
</sbb-train>
```

The `station` property is used to set the destination label of the train, which is displayed in the
top left corner of the component. The `direction` property indicates the direction of the train,
which can be either `left` (default) or `right`.
The direction label and the level of its heading tag are set, respectively,
with the property `directionLabel` and `directionLabelLevel`.

The `accessibility-label` property should be used to give further information about the leaving direction of the `<sbb-train>`.
It should refer to the section where the locomotive is placed.

## sbb-train-wagon

### Variants

With the `type` property, the component can visualize different types of wagons and locomotives.
For the types `wagon-end-left` and `wagon-end-right` the blocked passage information is set automatically.

```html
<sbb-train-wagon type="wagon"></sbb-train-wagon>
<sbb-train-wagon type="wagon-end-left"></sbb-train-wagon>
<sbb-train-wagon type="wagon-end-right"></sbb-train-wagon>
<sbb-train-wagon type="couchette"></sbb-train-wagon>
<sbb-train-wagon type="sleeping"></sbb-train-wagon>
<sbb-train-wagon type="restaurant"></sbb-train-wagon>
<sbb-train-wagon type="locomotive"></sbb-train-wagon>
<sbb-train-wagon type="closed"></sbb-train-wagon>
```

The property `occupancy` sets the component's inner icon; available values are `high`, `medium`, `low`, `none` and `null`;
it's also possible to display the wagon class at component's end using the `wagonClass` property
and a wagon number (property `label`) above the component.

```html
<sbb-train-wagon type="wagon" label="38" occupancy="low" wagon-class="1"></sbb-train-wagon>
```

**Note:**
An `<sbb-train-wagon>` with `type="wagon"` has the possibilities of slotting attribute icons.
They will be applied internally into a list (using `<ul>` and `<li>`) and requires an `aria-label` for each slotted icon.

```html
<sbb-train-wagon type="wagon">
  <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
  <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
  <sbb-icon
    aria-hidden="false"
    aria-label="Business zone in 1st class: Reservation possible"
    name="sa-bz"
  ></sbb-icon>
</sbb-train-wagon>
```

### Active state

To indicate an active wagon,
apply the CSS class `sbb-active` to the `<sbb-train-wagon>` element.
This will visually highlight the wagon with a thicker border.

```html
<sbb-train-wagon class="sbb-active" type="wagon" label="38" occupancy="low"></sbb-train-wagon>
```

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbTrainBlockedPassageElement`, `sbb-train-blocked-passage`

### class: `SbbTrainElement`, `sbb-train`

#### Properties

| Name                  | Attribute               | Privacy | Type                | Default  | Description                                                                                  |
| --------------------- | ----------------------- | ------- | ------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `accessibilityLabel`  | `accessibility-label`   | public  | `string`            | `''`     | Accessibility label for additional information regarding the leaving direction of the train. |
| `direction`           | `direction`             | public  | `'left' \| 'right'` | `'left'` | Controls the direction indicator to show the arrow left or right. Default is left.           |
| `directionLabel`      | `direction-label`       | public  | `string`            | `''`     | General label for "driving direction".                                                       |
| `directionLabelLevel` | `direction-label-level` | public  | `SbbTitleLevel`     | `'6'`    | Heading level of the direction label, used for screen readers.                               |
| `station`             | `station`               | public  | `string`            | `''`     | Label for the destination station of the train.                                              |

#### Slots

| Name | Description                                                                |
| ---- | -------------------------------------------------------------------------- |
|      | Use the unnamed slot to add 'sbb-train-wagon' elements to the `sbb-train`. |

### class: `SbbTrainFormationElement`, `sbb-train-formation`

#### Properties

| Name   | Attribute | Privacy | Type              | Default  | Description                                                     |
| ------ | --------- | ------- | ----------------- | -------- | --------------------------------------------------------------- |
| `view` | `view`    | public  | `'side' \| 'top'` | `'side'` | Whether the view of the wagons is from side or top perspective. |

#### CSS Properties

| Name                                   | Default | Description                                                      |
| -------------------------------------- | ------- | ---------------------------------------------------------------- |
| `--sbb-train-formation-padding-inline` | `0px`   | Defines the inline padding inside the horizontal scrolling area. |

#### Slots

| Name | Description                                                                    |
| ---- | ------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add 'sbb-train' elements to the `sbb-train-formation`. |

### class: `SbbTrainWagonElement`, `sbb-train-wagon`

#### Properties

| Name                          | Attribute                       | Privacy | Type                                                                                                                        | Default   | Description                                                                                                                  |
| ----------------------------- | ------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `additionalAccessibilityText` | `additional-accessibility-text` | public  | `string`                                                                                                                    | `''`      | Additional accessibility text which will be appended to the end.                                                             |
| `blockedPassage`              | `blocked-passage`               | public  | `'previous' \| 'next' \| 'both' \| 'none'`                                                                                  | `'none'`  | Accessibility text for blocked passages of the wagon.                                                                        |
| `label`                       | `label`                         | public  | `string`                                                                                                                    | `''`      | Wagon number                                                                                                                 |
| `occupancy`                   | `occupancy`                     | public  | `SbbOccupancy \| null`                                                                                                      | `null`    | Occupancy of a wagon.                                                                                                        |
| `sector`                      | `sector`                        | public  | `string`                                                                                                                    | `''`      | Sector in which the wagon stops.                                                                                             |
| `type`                        | `type`                          | public  | `'wagon' \| 'wagon-end-left' \| 'wagon-end-right' \| 'couchette' \| 'sleeping' \| 'restaurant' \| 'locomotive' \| 'closed'` | `'wagon'` | Wagon type. For `wagon-end-left` and `wagon-end-right`, please set the corresponding value of the `blockedPassage` property. |
| `wagonClass`                  | `wagon-class`                   | public  | `'1' \| '2' \| null`                                                                                                        | `null`    | Class label                                                                                                                  |

#### Slots

| Name | Description                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to add one or more `sbb-icon` for meta-information of the `sbb-train-wagon`. |
