The `sbb-autocomplete-grid` is a component that can be used to display a panel of suggested options connected to a text input,
with each option connected to one or more buttons.
Use it when you need an autocomplete in which every selectable option in the panel needs one or more related button.
If you don't need actions, use the [sbb-autocomplete](/docs/elements-sbb-autocomplete---docs).

The component is strictly connected to:

- the [sbb-autocomplete-grid-row](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-row--docs), which is a wrapper for both option and buttons;
- the [sbb-autocomplete-grid-option](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-option--docs), which displays a selectable option within a panel;
- the [sbb-autocomplete-grid-cell](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-cell--docs), which is a wrapper a for button element;
- the [sbb-autocomplete-grid-button](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-button--docs), which displays a button within a row;
- the [sbb-autocomplete-grid-optgroup](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-optgroup--docs), which can be used to group more row within a group.

It's possible to set the element to which the component's panel will be attached using the `origin` prop,
and the input which will work as a trigger using the `trigger` prop.
Both accept an id or an element reference.

```html
<!-- Origin element -->
<div id="autocomplete-origin">Another origin</div>

<!-- Trigger element -->
<input id="autocomplete-txt" placeholder="Another trigger element" />

<sbb-autocomplete-grid origin="autocomplete-origin" trigger="autocomplete-txt">
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option value="2">Option 2</sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button icon-name="trash-small"></sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
</sbb-autocomplete-grid>
```

## In `sbb-form-field`

If the component is used within a [sbb-form-field](/docs/elements-sbb-form-field-sbb-form-field--docs),
it will automatically connect to the native `<input>` as trigger and will display the option panel above or below the `sbb-form-field`.

```html
<!-- Origin element -->
<sbb-form-field label="Label">
  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete-grid>
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option value="2">Option 2</sbb-autocomplete-grid-option>
      <sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-button icon-name="trash-small"></sbb-autocomplete-grid-button>
      </sbb-autocomplete-grid-cell>
    </sbb-autocomplete-grid-row>
  </sbb-autocomplete-grid>
</sbb-form-field>
```

## Style

### Option highlight

By default, the `sbb-autocomplete-grid` will highlight the label of the `sbb-autocomplete-grid-option` in the panel,
if it matches the typed text.
See the [sbb-autocomplete-grid-option](/docs/elements-sbb-autocomplete-grid-sbb-autocomplete-grid-option--docs) for more details.

### Option grouping

The displayed `sbb-autocomplete-grid-option` can be collected into groups using `sbb-autocomplete-grid-optgroup` element:

```html
<!-- Origin element -->
<sbb-form-field label="Label">
  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete-grid>
    <sbb-autocomplete-grid-optgroup>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value="1">Option 1</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
      ...
    </sbb-autocomplete-grid-optgroup>
    <sbb-autocomplete-grid-optgroup>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value="100">Option 100</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
      ...
    </sbb-autocomplete-grid-optgroup>
  </sbb-autocomplete-grid>
</sbb-form-field>
```

### Size

The component has no `size` property but, when slotted in a `sbb-form-field`, it adapts to the parent `size`.

```html
<sbb-form-field size="s">
  <label>Label</label>
  <input placeholder="Trigger element" />
  <sbb-autocomplete-grid> ... </sbb-autocomplete-grid>
</sbb-form-field>
```

## Events

The `sbb-autocomplete-grid-option` emits the `autocompleteoptionselected` event when selected via user interaction.

## Keyboard interaction

The options panel opens on `focus`, `click` or `input` events on the trigger element, or on `ArrowDown` keypress;
it can be closed on backdrop click, or using the `Escape` or `Tab` keys.

| Keyboard               | Action                                                  |
| ---------------------- | ------------------------------------------------------- |
| <kbd>Down Arrow</kbd>  | Navigate to the next option. Open the panel, if closed. |
| <kbd>Up Arrow</kbd>    | Navigate to the previous option.                        |
| <kbd>Right Arrow</kbd> | Navigate to the next button.                            |
| <kbd>Left Arrow</kbd>  | Navigate to the previous button.                        |
| <kbd>Enter</kbd>       | Select the active option/button.                        |
| <kbd>Escape</kbd>      | Close the autocomplete panel.                           |

Setting the `autoSelectActiveOption` property to true allows users
to automatically select the option reached via keyboard navigation as the input value,
without having to press the `Enter` key to confirm.

On the other hand, it's possible to use the `requireSelection` to clear the input
if the user does not explicitly select a value, via mouse click or keyboard selection.

## Accessibility

The `sbb-autocomplete-grid` implements the [ARIA combobox-grid interaction pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/grid-combo/).

The text input trigger specifies `role="combobox"` while the content of the pop-up applies `role="grid"`.
The inner option and actions have `role="gridcell"`, while the buttons inside the action have `role="button"`.
Note that since the focus must always be on the connected input, those buttons can't be reached via <kbd>Tab</kbd>,
but only with arrow navigation; note also that when a button is reached, going up or down will move to the previous/next option
and not to the previous/next button.

The component preserves focus on the input trigger,
using `aria-activedescendant` to support navigation though the autocomplete options.

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbAutocompleteGrid<T>` and `SbbAutocompleteGridOption<T>`.

```ts
const values = [
  { value: 'value 1', name: 'Option 1' },
  { value: 'value 2', name: 'Option 2' },
];
```

```html
<sbb-form-field>
  <input />
  <sbb-autocomplete-grid .displayWith="${(value) => value.name}">
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option .value="${values[0]}">Option 1</sbb-autocomplete-grid-option>
      ...
    </sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-option .value="${values[1]}">Option 2</sbb-autocomplete-grid-option>
      ...
    </sbb-autocomplete-grid-row>
  </sbb-autocomplete-grid>
</sbb-form-field>
```

### `displayWith` function

When using complex values, the selection should most likely still be represented as text.
To achieve this, you can use the `displayWith` property which accepts a function.
This function receives the selected value and should return a string.

Please note that the parameter is the assigned value of the selected option which does not necessarily
align with the type information.

<!-- Auto Generated Below -->

## Properties

| Name                     | Attribute                   | Privacy | Type                             | Default            | Description                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | --------------------------- | ------- | -------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoActiveFirstOption`  | `auto-active-first-option`  | public  | `boolean`                        | `false`            | Whether the first option is automatically activated when the autocomplete is opened.                                                                                                                                                                                                                                                  |
| `autoSelectActiveOption` | `auto-select-active-option` | public  | `boolean`                        | `false`            | Whether the active option should be selected as the user is navigating.                                                                                                                                                                                                                                                               |
| `displayWith`            | -                           | public  | `((value: T) => string) \| null` | `null`             | Function that maps an option's control value to its display value in the trigger.                                                                                                                                                                                                                                                     |
| `isOpen`                 | -                           | public  | `boolean`                        |                    | Whether the element is open.                                                                                                                                                                                                                                                                                                          |
| `negative`               | `negative`                  | public  | `boolean`                        | `false`            | Negative coloring variant flag.                                                                                                                                                                                                                                                                                                       |
| `origin`                 | `origin`                    | public  | `HTMLElement \| null`            | `null`             | The element where the autocomplete will attach. If not set, as fallback there are two elements which can act as origin with following priority order: 1\. `sbb-form-field` if it is an ancestor. 2\. trigger element if set. For attribute usage, provide an id reference.                                                            |
| `originElement`          | -                           | public  | `HTMLElement \| null`            |                    | Returns the element where autocomplete overlay is attached to.                                                                                                                                                                                                                                                                        |
| `position`               | `position`                  | public  | `'auto' \| 'above' \| 'below'`   | `'auto'`           | The position of the autocomplete panel relative to the trigger.                                                                                                                                                                                                                                                                       |
| `preserveIconSpace`      | `preserve-icon-space`       | public  | `boolean`                        | `false`            | Whether the icon space is preserved when no icon is set.                                                                                                                                                                                                                                                                              |
| `requireSelection`       | `require-selection`         | public  | `boolean`                        | `false`            | Whether the user is required to make a selection when they're interacting with the autocomplete. If the user moves away from the autocomplete without selecting an option from the list, the value will be reset. If the user opens the panel and closes it without interacting or selecting a value, the initial value will be kept. |
| `size`                   | `size`                      | public  | `'m' \| 's'`                     | `'m' / 's' (lean)` | Size variant, either m or s.                                                                                                                                                                                                                                                                                                          |
| `trigger`                | `trigger`                   | public  | `HTMLInputElement \| null`       | `null`             | The input element that will trigger the autocomplete opening. By default, the autocomplete will open on focus, click, input or `ArrowDown` keypress of the 'trigger' element. If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor. For attribute usage, provide an id reference.                       |
| `triggerElement`         | -                           | public  | `HTMLInputElement \| null`       |                    | Returns the trigger element.                                                                                                                                                                                                                                                                                                          |

## Methods

| Name             | Privacy | Description                                                                 | Parameters | Return | Inherited From          |
| ---------------- | ------- | --------------------------------------------------------------------------- | ---------- | ------ | ----------------------- |
| `close`          | public  | Closes the autocomplete.                                                    |            | `void` | SbbOpenCloseBaseElement |
| `escapeStrategy` | public  | The method which is called on escape key press. Defaults to calling close() |            | `void` | SbbOpenCloseBaseElement |
| `open`           | public  | Opens the autocomplete.                                                     |            | `void` | SbbOpenCloseBaseElement |

## Events

| Name          | Type    | Description                                                                  | Inherited From          |
| ------------- | ------- | ---------------------------------------------------------------------------- | ----------------------- |
| `beforeclose` | `Event` | Emits whenever the component begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `beforeopen`  | `Event` | Emits whenever the component starts the opening transition. Can be canceled. | SbbOpenCloseBaseElement |
| `close`       | `Event` | Emits whenever the component is closed.                                      | SbbOpenCloseBaseElement |
| `open`        | `Event` | Emits whenever the component is opened.                                      | SbbOpenCloseBaseElement |

## CSS Properties

| Name                             | Default                              | Description                                                                                                                                                                                                   |
| -------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-autocomplete-z-index`     | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |
| `--sbb-options-panel-max-height` |                                      | Maximum height of the options panel. If the calculated remaining space is smaller, the value gets ignored.                                                                                                    |

## Slots

| Name | Description                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
|      | Use the unnamed slot to add `sbb-autocomplete-grid-row` or `sbb-autocomplete-grid-optgroup` elements to the `sbb-autocomplete-grid`. |
