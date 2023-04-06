# sbb-map-container

This component is the layout container for the disruption map, the level 3 navigation and the
future ATLAS. It provides three slots. One unnamed slot for the sidebar content, one named ("map") slot for map and one
named ("button") for the scroll up button which is only visible on mobile. On moblie the map is sticky above the sidebar
and the sidebar content is scrolling over the map. On desktop, the sidebar and the map are in a two column layout side by
side. The component comes along with a height calculation that subtracts the height of the header for the height of the component. The header height can
be overriden with --sbb-map-container-margin-start if needed.

<!-- Auto Generated Below -->


## Slots

| Slot        | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `"button"`  | Used for slotting the scroll up button on inside the sidebar. |
| `"map"`     | Used for slotting the map.                                    |
| `"unnamed"` | Used for slotting the sidebar content.                        |


----------------------------------------------


