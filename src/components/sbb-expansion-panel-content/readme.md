The `sbb-expansion-panel-content` is a component which acts as a container for any element 
that needs to be displayed in a `sbb-expansion-panel`; the content is projected inside an unnamed slot.

When it's used in a `sbb-expansion-panel` together with a `sbb-expansion-panel-header` with an icon displayed, 
the slotted content receives a padding on the left side in order to align it with the header label.

## Usage
```html
<sbb-expansion-panel-content>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <p>
    <span>
      Donec porttitor blandit odio, ut blandit libero cursus vel.
    </span> 
    <span>
      Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur malesuada, nibh ac
      blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac justo.
    </span>
  </p>
</sbb-expansion-panel-content>
```

<!-- Auto Generated Below -->


## Slots

| Slot        | Description                                            |
| ----------- | ------------------------------------------------------ |
| `"unnamed"` | Slot to render the content in the sbb-expansion-panel. |


----------------------------------------------


