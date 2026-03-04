### sbb-train-wagon

THe `sbb-train-wagon` is a component which represents a train compartment.

It is used inside the [sbb-train](/docs/elements-timetable-sbb-train--docs) element.

## Variants

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
A `sbb-train-wagon` with `type="wagon"` has the possibilities of slotting attribute icons.
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



### sbb-train-formation

The `sbb-train-formation` is a component used as a top container element
for wrapping [sbb-train](/docs/elements-timetable-sbb-train--docs)s.

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



### sbb-train-blocked-passage

A `sbb-train-blocked-passage` is a visual representation of a blocked passage between
[sbb-train-wagon](/docs/elements-timetable-sbb-train-wagon--docs)s.

It is used inside the [sbb-train](/docs/elements-timetable-sbb-train--docs) element.

```html
<sbb-train-blocked-passage></sbb-train-blocked-passage>
```



### sbb-train

A `sbb-train` is a component used as a container element for a collection of
[sbb-train-wagon](/docs/elements-timetable-sbb-train-wagon--docs)s
or [sbb-train-blocked-passage](/docs/elements-timetable-sbb-train-blocked-passage--docs)s,
and it can be used within the [sbb-train-formation](/docs/elements-timetable-sbb-train-formation--docs) component.

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

It's possible to use the `station` property to display the label of the `sbb-train` destination,
while the `direction` property can be used to display the direction indicator (default: `left`).
The direction label and the level of its heading tag are set, respectively,
with the property `directionLabel` and `directionLabelLevel`.

## Accessibility

The `accessibility-label` property should be used to give further information about the leaving direction of the `sbb-train`.
It should refer to the section where the locomotive is placed.

