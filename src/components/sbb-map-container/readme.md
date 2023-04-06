# sbb-map-container

This component is the layout container for the disruption map, the level 3 navigation and the
future ATLAS. It provides two slots. One unnamed slot for the sidebar content and one named ("map") slot for map.
On moblie the map is sticky above the sidebar and the sidebar content is scrolling over the map. On desktop is the sidebar
and the map in a two column layout side by side.The component come along with a height calculation that subtracts the height
of the header. The header height can be overriden with --sbb-map-container-margin-start if needed.

<!-- Auto Generated Below -->


## Slots

| Slot        | Description                            |
| ----------- | -------------------------------------- |
| `"map"`     | Used for slotting the map.             |
| `"unnamed"` | Used for slotting the sidebar content. |


----------------------------------------------


