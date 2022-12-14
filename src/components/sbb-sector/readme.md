# sbb-sector
A sbb-sector is a container element for the one to three sbb-wagon. It is used inside the sbb-train element.

```html
<!-- Empty/no content sector -->
<sbb-sector label="Sector A"></sbb-sector>

<!-- Slotted/with content sector -->
<sbb-sector label="Sector A">
  <sbb-wagon type="locomotive" additional-accessibility-text="Top of the train"></sbb-wagon>
  <sbb-wagon type="closed"></sbb-wagon>
  <sbb-wagon-blocked-passage />
  <sbb-wagon
    type="wagon"
    label="50"
    occupancy="low"
    wagon-class="2"
    blocked-passage="previous"
  ></sbb-wagon>
</sbb-sector>

```
<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description           | Type     | Default     |
| -------------------- | --------- | --------------------- | -------- | ----------- |
| `label` _(required)_ | `label`   | Label for the sector. | `string` | `undefined` |


## Slots

| Slot        | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `"unnamed"` | Slot for the sbb-wagons. One to maximum 3 wagons are allowed. |


----------------------------------------------


