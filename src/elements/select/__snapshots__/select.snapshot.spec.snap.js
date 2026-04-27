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
</div>
<div
  class="sbb-option-panel__overlay-container"
  popover="manual"
>
  <div
    class="sbb-option-panel__overlay"
    tabindex="-1"
  >
    <slot>
    </slot>
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
</div>
<div
  class="sbb-option-panel__overlay-container"
  popover="manual"
>
  <div
    aria-multiselectable=""
    class="sbb-option-panel__overlay"
    tabindex="-1"
  >
    <slot>
    </slot>
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
</div>
<div
  class="sbb-option-panel__overlay-container"
  popover="manual"
>
  <div
    class="sbb-option-panel__overlay"
    id="sbb-select-2"
    role="listbox"
    tabindex="-1"
  >
    <slot>
    </slot>
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
</div>
<div
  class="sbb-option-panel__overlay-container"
  popover="manual"
>
  <div
    aria-multiselectable=""
    class="sbb-option-panel__overlay"
    role="listbox"
    tabindex="-1"
  >
    <slot>
    </slot>
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

