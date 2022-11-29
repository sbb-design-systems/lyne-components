# sbb-sector
A sbb-sector is a container element for the one to three sbb-wagon. It is used inside the sbb-train element.

```html
<!-- Emtpy/no content sector -->
<sbb-sector label="Sector A">
<slot/>
</sbb-sector>

<!-- Slotted/with content sector -->
<sbb-sector label="Sector E">
  <sbb-wagon
    type="locomotive"
    accessibility-label-wagon="Locomotive"
    accessibility-additional-wagon-text="Top of the train"
  ></sbb-wagon>
  <sbb-wagon type="blocked" accessibility-label-wagon="Passage blocked"></sbb-wagon>
  <sbb-wagon
    type="wagon"
    accessibility-label-wagon="Train coach number"
    label="50"
    accessibility-label-occupation="Expected occupancy low"
    accessibility-label-class="Second class"
    occupancy="low"
    wagon-class="2"
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


