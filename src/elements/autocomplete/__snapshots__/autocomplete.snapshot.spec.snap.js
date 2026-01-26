/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete renders standalone Safari DOM"] = 
`<sbb-autocomplete
  id="sbb-autocomplete-1"
  origin="origin"
  popover="manual"
  size="m"
  trigger="trigger"
>
  <sbb-option
    id="sbb-option-0"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    id="sbb-option-1"
    value="2"
  >
    2
  </sbb-option>
</sbb-autocomplete>
`;
/* end snapshot sbb-autocomplete renders standalone Safari DOM */

snapshots["sbb-autocomplete renders standalone Safari Shadow DOM"] = 
`<div class="sbb-autocomplete__gap-fix">
</div>
<div class="sbb-autocomplete__container">
  <div class="sbb-autocomplete__gap-fix">
    <div class="sbb-gap-fix-wrapper">
      <div
        class="sbb-gap-fix-corner"
        id="left"
      >
      </div>
    </div>
    <div class="sbb-gap-fix-wrapper">
      <div
        class="sbb-gap-fix-corner"
        id="right"
      >
      </div>
    </div>
  </div>
  <div class="sbb-autocomplete__panel">
    <div class="sbb-autocomplete__wrapper">
      <div
        class="sbb-autocomplete__options"
        tabindex="-1"
      >
        <slot>
        </slot>
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete renders standalone Safari Shadow DOM */

snapshots["sbb-autocomplete renders in form field Safari DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <input
    aria-autocomplete="list"
    aria-controls="sbb-autocomplete-3"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="sbb-autocomplete-3"
    autocomplete="off"
    role="combobox"
  >
  <sbb-autocomplete
    id="sbb-autocomplete-3"
    popover="manual"
    size="m"
  >
    <sbb-option
      id="sbb-option-4"
      value="1"
    >
      1
    </sbb-option>
    <sbb-option
      id="sbb-option-5"
      value="2"
    >
      2
    </sbb-option>
  </sbb-autocomplete>
</sbb-form-field>
`;
/* end snapshot sbb-autocomplete renders in form field Safari DOM */

snapshots["sbb-autocomplete renders in form field Safari Shadow DOM"] = 
`<div class="sbb-form-field__space-wrapper">
  <div
    class="sbb-form-field__wrapper"
    id="overlay-anchor"
  >
    <slot name="prefix">
    </slot>
    <div class="sbb-form-field__input-container">
      <span
        aria-hidden="true"
        class="sbb-form-field__label-spacer"
      >
      </span>
      <span class="sbb-form-field__label">
        <span class="sbb-form-field__label-ellipsis">
          <slot name="label">
          </slot>
        </span>
      </span>
      <div class="sbb-form-field__input">
        <slot>
        </slot>
      </div>
    </div>
    <slot name="suffix">
    </slot>
  </div>
  <div class="sbb-form-field__error">
    <slot name="error">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete renders in form field Safari Shadow DOM */

snapshots["sbb-autocomplete renders standalone Chrome-Firefox DOM"] = 
`<sbb-autocomplete
  origin="origin"
  popover="manual"
  size="m"
  trigger="trigger"
>
  <sbb-option value="1">
    1
  </sbb-option>
  <sbb-option value="2">
    2
  </sbb-option>
</sbb-autocomplete>
`;
/* end snapshot sbb-autocomplete renders standalone Chrome-Firefox DOM */

snapshots["sbb-autocomplete renders standalone Chrome-Firefox Shadow DOM"] = 
`<div class="sbb-autocomplete__gap-fix">
</div>
<div class="sbb-autocomplete__container">
  <div class="sbb-autocomplete__gap-fix">
    <div class="sbb-gap-fix-wrapper">
      <div
        class="sbb-gap-fix-corner"
        id="left"
      >
      </div>
    </div>
    <div class="sbb-gap-fix-wrapper">
      <div
        class="sbb-gap-fix-corner"
        id="right"
      >
      </div>
    </div>
  </div>
  <div class="sbb-autocomplete__panel">
    <div class="sbb-autocomplete__wrapper">
      <div
        class="sbb-autocomplete__options"
        id="sbb-autocomplete-2"
        role="listbox"
        tabindex="-1"
      >
        <slot>
        </slot>
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete renders standalone Chrome-Firefox Shadow DOM */

snapshots["sbb-autocomplete renders in form field Chrome-Firefox DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <input
    aria-autocomplete="list"
    aria-controls="sbb-autocomplete-3"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="sbb-autocomplete-3"
    autocomplete="off"
    role="combobox"
  >
  <sbb-autocomplete
    popover="manual"
    size="m"
  >
    <sbb-option value="1">
      1
    </sbb-option>
    <sbb-option value="2">
      2
    </sbb-option>
  </sbb-autocomplete>
</sbb-form-field>
`;
/* end snapshot sbb-autocomplete renders in form field Chrome-Firefox DOM */

snapshots["sbb-autocomplete renders in form field Chrome-Firefox Shadow DOM"] = 
`<div class="sbb-form-field__space-wrapper">
  <div
    class="sbb-form-field__wrapper"
    id="overlay-anchor"
  >
    <slot name="prefix">
    </slot>
    <div class="sbb-form-field__input-container">
      <span
        aria-hidden="true"
        class="sbb-form-field__label-spacer"
      >
      </span>
      <span class="sbb-form-field__label">
        <span class="sbb-form-field__label-ellipsis">
          <slot name="label">
          </slot>
        </span>
      </span>
      <div class="sbb-form-field__input">
        <slot>
        </slot>
      </div>
    </div>
    <slot name="suffix">
    </slot>
  </div>
  <div class="sbb-form-field__error">
    <slot name="error">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete renders in form field Chrome-Firefox Shadow DOM */

snapshots["sbb-autocomplete renders in form field A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "role": "generic",
          "name": ""
        },
        {
          "role": "generic",
          "name": ""
        },
        {
          "ignored": true,
          "role": "none"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete renders in form field A11y tree Chrome */

