This component is the layout container for the disruption map, the level 3 navigation and the future ATLAS.

## Slots 

It provides two slots: one unnamed slot for the sidebar content, and one named `map` for the map.

```html
<sbb-map-container>
  <div>Content</div>
  <div slot="map">Here comes the map.</div>
</sbb-map-container>
```

On mobile, the map is sticky above the sidebar, and the sidebar content is scrolling over the map. 
On desktop, the sidebar and the map are shown in a two column layout side by side.

## Style

The component comes along with a height calculation that subtracts the height of the header. 
The header height can be overridden setting the variable `--sbb-map-container-margin-start`, if needed.

<!-- Auto Generated Below --> 
 

## Properties

| Name                 | Privacy | Type      | Default | Description                                                          | Inherited From |
| -------------------- | ------- | --------- | ------- | -------------------------------------------------------------------- | -------------- |
| `hideScrollUpButton` | public  | `boolean` | `false` | Flag to show/hide the scroll up button inside the sidebar on mobile. |                |

## Slots

| Name      | Description                            |
| --------- | -------------------------------------- |
| `unnamed` | Used for slotting the sidebar content. |
| `map`     | Used for slotting the map.             |

