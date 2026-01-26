/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-select renders Safari DOM"] = 
`<sbb-select
  id="sbb-select-1"
  size="m"
>
  <sbb-option
    id="sbb-option-0"
    value="1"
  >
    Option 1
  </sbb-option>
  <sbb-option
    id="sbb-option-1"
    value="2"
  >
    Option 2
  </sbb-option>
  <sbb-option
    id="sbb-option-2"
    value="3"
  >
    Option 3
  </sbb-option>
</sbb-select>
`;
/* end snapshot sbb-select renders Safari DOM */

snapshots["sbb-select renders Safari Shadow DOM"] = 
`<div
  aria-hidden="true"
  class="sbb-select__trigger"
>
  <span class="sbb-select__trigger--placeholder">
  </span>
</div>
<div class="sbb-select__gap-fix">
</div>
<div
  class="sbb-select__container"
  popover="manual"
>
  <div class="sbb-select__gap-fix">
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
  <div class="sbb-select__panel">
    <div class="sbb-select__wrapper">
      <div
        class="sbb-select__options"
        tabindex="-1"
      >
        <slot>
        </slot>
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-select renders Safari Shadow DOM */

snapshots["sbb-select renders multiple Safari DOM"] = 
`<sbb-select
  id="sbb-select-3"
  multiple=""
  size="m"
>
  <sbb-option
    id="sbb-option-6"
    value="1"
  >
    Option 1
  </sbb-option>
  <sbb-option
    id="sbb-option-7"
    value="2"
  >
    Option 2
  </sbb-option>
  <sbb-option
    id="sbb-option-8"
    value="3"
  >
    Option 3
  </sbb-option>
</sbb-select>
`;
/* end snapshot sbb-select renders multiple Safari DOM */

snapshots["sbb-select renders multiple Safari Shadow DOM"] = 
`<div
  aria-hidden="true"
  class="sbb-select__trigger"
>
  <span class="sbb-select__trigger--placeholder">
  </span>
</div>
<div class="sbb-select__gap-fix">
</div>
<div
  class="sbb-select__container"
  popover="manual"
>
  <div class="sbb-select__gap-fix">
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
  <div class="sbb-select__panel">
    <div class="sbb-select__wrapper">
      <div
        aria-multiselectable=""
        class="sbb-select__options"
        tabindex="-1"
      >
        <slot>
        </slot>
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-select renders multiple Safari Shadow DOM */

snapshots["sbb-select renders Chrome-Firefox DOM"] = 
`<sbb-select size="m">
  <sbb-option value="1">
    Option 1
  </sbb-option>
  <sbb-option value="2">
    Option 2
  </sbb-option>
  <sbb-option value="3">
    Option 3
  </sbb-option>
</sbb-select>
`;
/* end snapshot sbb-select renders Chrome-Firefox DOM */

snapshots["sbb-select renders Chrome-Firefox Shadow DOM"] = 
`<div
  aria-hidden="true"
  class="sbb-select__trigger"
>
  <span class="sbb-select__trigger--placeholder">
  </span>
</div>
<div class="sbb-select__gap-fix">
</div>
<div
  class="sbb-select__container"
  popover="manual"
>
  <div class="sbb-select__gap-fix">
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
  <div class="sbb-select__panel">
    <div class="sbb-select__wrapper">
      <div
        class="sbb-select__options"
        id="sbb-select-2"
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
/* end snapshot sbb-select renders Chrome-Firefox Shadow DOM */

snapshots["sbb-select renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "combobox",
      "name": "",
      "focusable": true,
      "hasPopup": "listbox",
      "required": false,
      "expanded": false
    },
    {
      "role": "generic",
      "name": "",
      "invalid": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-select renders A11y tree Chrome */

snapshots["sbb-select renders multiple Chrome-Firefox DOM"] = 
`<sbb-select
  multiple=""
  size="m"
>
  <sbb-option value="1">
    Option 1
  </sbb-option>
  <sbb-option value="2">
    Option 2
  </sbb-option>
  <sbb-option value="3">
    Option 3
  </sbb-option>
</sbb-select>
`;
/* end snapshot sbb-select renders multiple Chrome-Firefox DOM */

snapshots["sbb-select renders multiple Chrome-Firefox Shadow DOM"] = 
`<div
  aria-hidden="true"
  class="sbb-select__trigger"
>
  <span class="sbb-select__trigger--placeholder">
  </span>
</div>
<div class="sbb-select__gap-fix">
</div>
<div
  class="sbb-select__container"
  popover="manual"
>
  <div class="sbb-select__gap-fix">
    <div class="sbb-gap-fix-wrapper">
      <div class="sbb-gap-fix-corner">
      </div>
    </div>
    <div class="sbb-gap-fix-wrapper">
      <div class="sbb-gap-fix-corner">
      </div>
    </div>
  </div>
  <div class="sbb-select__panel">
    <div class="sbb-select__wrapper">
      <div
        aria-multiselectable=""
        class="sbb-select__options"
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
/* end snapshot sbb-select renders multiple Chrome-Firefox Shadow DOM */

snapshots["sbb-select renders multiple A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "combobox",
      "name": "",
      "focusable": true,
      "hasPopup": "listbox",
      "required": false,
      "expanded": false
    },
    {
      "role": "generic",
      "name": "",
      "invalid": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-select renders multiple A11y tree Chrome */

