The `sbb-select` is a component which provides a list of selectable options in an overlay panel, 
emulating the behaviour of a native `select`. 

If the component is used within a `sbb-form-field`, it will automatically display the option panel above or below it, 
otherwise, the panel takes the component's parent element as origin. 
Options or groups of options (see `sbb-option`/`sbb-option-group` components) can be provided via an unnamed slot.

The component has a `value` property, which can be a string or a string array (when `multiple` is set to true).
It is possible to display a placeholder if no value has been selected, using the `placeholder` property.
If one option (or more in `multiple`) has the `selected` attribute, the `value` of the `sbb-select` is set accordingly.

If the `multiple` property is set to false, only one option can be selected: in this case the placeholder will be replaced 
by the chosen value and a check mark will appear on the right of the selected option in the panel.
If the `multiple` attribute is set to true, a visual checkbox will appear on the left of any option in the panel, and
the selected values will be displayed in selection order, separated by a comma.

It is possible to display the component in disabled or readonly state by using the self-named properties. The component 
has a `required` property, which can be useful for setting a custom `<sbb-form-error>` message within a `<sbb-form-field>`.

Consumers can listen to the native `change`/`input` event on the `sbb-select` component to intercept the selection's change;
the current value can be read from `event.target.value`.

### Usage

Single choice `sbb-select` inside a `sbb-form-field`, with pre-selected value:
```html
<sbb-form-field label="Drinks">
  <sbb-select>
    <sbb-option value="Water" selected>Water</sbb-option>
    <sbb-option value="Wine">Wine</sbb-option>
    <sbb-option value="Beer">Beer</sbb-option>
  </sbb-select>
</sbb-form-field>
```

Multiple choice `sbb-select` inside a `sbb-form-field` with two `sbb-option-group`:
```html
<sbb-form-field label="Electronic devices">
  <sbb-select multiple>
    <sbb-option-group label='Microsoft'>
      <sbb-option value="Surface">Surface</sbb-option>
      <sbb-option value="Lumia">Lumia</sbb-option>
    </sbb-option-group>
    <sbb-option-group label='Apple'>
      <sbb-option value="MacBook">MacBook</sbb-option>
      <sbb-option value="iPad">iPad</sbb-option>
      <sbb-option value="iPhone">iPhone</sbb-option>
    </sbb-option-group>
  </sbb-select>
</sbb-form-field>
```

Required `sbb-select` inside a `sbb-form-field`:
```html
<sbb-form-field label="Pick one:">
  <sbb-select placeholder="1st gen starters">
    <sbb-option value="Bulbasaur">Bulbasaur</sbb-option>
    <sbb-option value="Charmander">Charmander</sbb-option>
    <sbb-option value="Squirtle">Squirtle</sbb-option>
    <sbb-option value="Pikachu">Pikachu</sbb-option>
  </sbb-select>
  <sbb-form-error>You must pick one!</sbb-form-error>
</sbb-form-field>
```

### Keyboard interaction

Closed panel, `sbb-select` has focus:

| Keyboard                                     | Action                                                                                                        |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| <kbd>Down Arrow</kbd> or <kbd>Up Arrow</kbd> | If the `sbb-select` is neither `disabled` or `readonly`, opens the panel.                                     |
| <kbd>Enter</kbd> or <kbd>Spacebar</kbd>      | If the `sbb-select` is neither `disabled` or `readonly`, opens the panel.                                     |
| Any char or number                           | If exists, select the first non-disabled matching option after the selected value, without opening the panel. |

Opened panel:

| Keyboard                                | Action                                                                                                                                            |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| <kbd>Esc</kbd> or <kbd>Tab</kbd>        | Closes the panel.                                                                                                                                 |
| <kbd>Down Arrow</kbd>                   | Select the next non-disabled option. If the bottom of the list has been reached, restart from the top. If `multiple`, move without selecting.     |
| <kbd>Up Arrow</kbd>                     | Select the previous non-disabled option. If the top of the list has been reached, restart from the bottom. If `multiple`, move without selecting. |
| <kbd>Home</kbd> or <kbd>Page Up</kbd>   | Select the first non-disabled option. If `multiple`, move without selecting.                                                                      |
| <kbd>End</kbd> or <kbd>Page Down</kbd>  | Select the last non-disabled option. If `multiple`, move without selecting.                                                                       |
| <kbd>Enter</kbd> or <kbd>Spacebar</kbd> | Select the current option and close panel. If `multiple`, toggle selection (panel stays open).                                                    |
| <kbd>Shift</kbd>+<kbd>Down Arrow</kbd>  | If `multiple`, moves to the next non-disabled option and toggle its selection.                                                                    |
| <kbd>Shift</kbd><kbd>Up Arrow</kbd>     | If `multiple`, moves to the next non-disabled option and toggle its selection.                                                                    |
| Any char or number                      | If exists, select the first non-disabled matching option after the selected value.                                                                |


<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                              | Type                 | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------------------ | -------------------- | ----------- |
| `disableAnimation` | `disable-animation` | Whether the animation is disabled.                                       | `boolean`            | `false`     |
| `disabled`         | `disabled`          | Whether the select is disabled.                                          | `boolean`            | `false`     |
| `multiple`         | `multiple`          | Whether the select allows for multiple selection.                        | `boolean`            | `false`     |
| `placeholder`      | `placeholder`       | The placeholder used if no value has been selected.                      | `string`             | `undefined` |
| `readonly`         | `readonly`          | Whether the select is readonly.                                          | `boolean`            | `false`     |
| `required`         | `required`          | Whether the select is required.                                          | `boolean`            | `false`     |
| `value`            | `value`             | The value of the select component. If `multiple` is true, it's an array. | `string \| string[]` | `undefined` |


## Events

| Event        | Description                                                                                                                         | Type                |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `change`     |                                                                                                                                     | `CustomEvent<any>`  |
| `did-close`  | Emits whenever the select is closed.                                                                                                | `CustomEvent<void>` |
| `did-open`   | Emits whenever the select is opened.                                                                                                | `CustomEvent<void>` |
| `didChange`  | <span style="color:red">**[DEPRECATED]**</span> only used for React. Will probably be removed once React 19 is available.<br/><br/> | `CustomEvent<any>`  |
| `input`      |                                                                                                                                     | `CustomEvent<any>`  |
| `will-close` | Emits whenever the select begins the closing transition.                                                                            | `CustomEvent<void>` |
| `will-open`  | Emits whenever the select starts the opening transition.                                                                            | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Closes the selection panel.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the selection panel.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                       |
| ----------- | --------------------------------- |
| `"unnamed"` | Use this slot to project options. |


----------------------------------------------


