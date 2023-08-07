# States

Components can have various states. We want to document which states exist and their definitions.

### Normal

The state when no other state applies.

### Hover

State when mouse is hovering over the component. Does not exist on touch devices.
Should visually highlight the component.
For accessibility compliance, the visual highlight must not be reduced to color, but should either include translation, cursor/pointer change or other effects that make it understandable for visually impaired consumers.

### Focused

State when component or element has focus via keyboard.
Should provide an outline when component has focus (via keyboard).

### Active

State when component or element is active and not a form element.
(e.g. an active tab in a tab group, an expanded accordion panel, a pressed button)
Should visually highlight the component.
For accessibility compliance, the visual highlight must not be reduced to color, but should either include translation, cursor/pointer change or other effects that make it understandable for visually impaired consumers.

### Checked

State when form component or element is checked.
(e.g. radio-button, checkbox)
Should visually indicate its state.
Indeterminate is a substate of this.

### Disabled

State when component or element is disabled and cannot be used or selected.
Should prevent focus or selection by keyboard or mouse.
Should visually indicate its state.

### Readonly

State when form component or element is readonly.
Must be accessible via keyboard and mouse but content/selection cannot be changed.
Should visually indicate its state.

### Error

State when form component or element is in an error state.
Should visually and textually indicate the error state and error type.
