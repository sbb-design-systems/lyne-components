The `sbb-autocomplete` is a component that can be used to display a panel of suggested options connected to a text input.

If the component is used within a `sbb-form-field`, it will automatically connect to the native `input` as trigger
and will display the option panel above or below the `sbb-form-field`; otherwise, it's possible to set 
the panel `origin` and the input `trigger` passing an id or an element reference.

The options panel opens on `focus`, `click` or `input` on the trigger element, or on `ArrowDown` keypress;
it can be closed on backdrop click, or using the `Escape` or `Tab` keys.

### Events

The `sbb-option` will emit the `option-selected` event when selected via user interaction.

### Option highlight

By default, the autocomplete will highlight the label of the `sbb-option` in the panel, if it matches the typed text.
See the [sbb-option](../sbb-option/readme.md) for more details.

## Usage

In a form field:

```html
<!-- Origin element -->
<sbb-form-field label="Label">

  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete>
    <sbb-option icon-name="clock-small" value="Option 1"> Option 1 </sbb-option>
    <sbb-option icon-name="clock-small" value="Option 2"> Option 2 </sbb-option>
    <sbb-option icon-name="clock-small" value="Option 3"> Option 3 </sbb-option>
  </sbb-autocomplete>
</sbb-form-field>
```

Standalone, by setting the `origin` and `trigger` properties:

```html
<!-- Origin element -->
<div id="autocomplete-origin">Another origin</div>

<!-- Trigger element -->
<input id="autocomplete-txt" placeholder="Another trigger element" />

<sbb-autocomplete origin="autocomplete-origin" trigger="autocomplete-txt">
  <sbb-option value="Option A">Option A</sbb-option>
  <sbb-option value="Option B">Option B</sbb-option>
  <sbb-option value="Option C">Option C</sbb-option>
</sbb-autocomplete>
```
### Option grouping
`sbb-option` can be collected into groups using `sbb-optgroup` element:

```html
<!-- Origin element -->
<sbb-form-field label="Label">

  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete>
    <sbb-optgroup label="Group 1">
      <sbb-option icon-name="clock-small" value="Option 1"> Option 1 </sbb-option>
      ...
    </sbb-optgroup>
    <sbb-optgroup label="Group 2">
      ...
    </sbb-optgroup>
  </sbb-autocomplete>
</sbb-form-field>
```

## Keyboard interaction
| Keyboard shortcut                      | Action                                                         |
|----------------------------------------|----------------------------------------------------------------|
| <kbd>Down Arrow</kbd>                  | Navigate to the next option. Open the panel, if closed.        |
| <kbd>Up Arrow</kbd>                    | Navigate to the previous option.                               |
| <kbd>Enter</kbd>                       | Select the active option.                                      |
| <kbd>Escape</kbd>                      | Close the autocomplete panel.                                  |

## Accessibility
`sbb-autocomplete` implements the ARIA combobox interaction pattern. 
The text input trigger specifies `role="combobox"` while the content of the pop-up applies `role="listbox"`. 
Because of this listbox pattern, you should not put other interactive controls, such as buttons or checkboxes, inside an autocomplete option. 
Nesting interactive controls like this interferes with most assistive technology.

`sbb-autocomplete` preserves focus on the input trigger, using `aria-activedescendant` to support navigation though the autocomplete options.


<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                                                                                                                                                                                                                                       | Type                         | Default     |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `disableAnimation`  | `disable-animation`   | Whether the animation is disabled.                                                                                                                                                                                                                                                                                | `boolean`                    | `false`     |
| `origin`            | `origin`              | The element where the autocomplete will attach; accepts both an element's id or an HTMLElement. If not set, will search for the first 'sbb-form-field' ancestor.                                                                                                                                                  | `HTMLElement \| string`      | `undefined` |
| `preserveIconSpace` | `preserve-icon-space` | Whether the icon space is preserved when no icon is set.                                                                                                                                                                                                                                                          | `boolean`                    | `undefined` |
| `trigger`           | `trigger`             | The input element that will trigger the autocomplete opening; accepts both an element's id or an HTMLElement. By default, the autocomplete will open on focus, click, input or `ArrowDown` keypress of the 'trigger' element. If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor. | `HTMLInputElement \| string` | `undefined` |


## Events

| Event        | Description                                                    | Type                |
| ------------ | -------------------------------------------------------------- | ------------------- |
| `did-close`  | Emits whenever the autocomplete is closed.                     | `CustomEvent<void>` |
| `did-open`   | Emits whenever the autocomplete is opened.                     | `CustomEvent<void>` |
| `will-close` | Emits whenever the autocomplete begins the closing transition. | `CustomEvent<void>` |
| `will-open`  | Emits whenever the autocomplete starts the opening transition. | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Closes the autocomplete.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the autocomplete.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                       |
| ----------- | --------------------------------- |
| `"unnamed"` | Use this slot to project options. |


----------------------------------------------


