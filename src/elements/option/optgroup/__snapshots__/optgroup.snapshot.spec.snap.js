/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-optgroup autocomplete renders Safari DOM"] = 
`<sbb-optgroup label="Label">
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
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders Safari DOM */

snapshots["sbb-optgroup autocomplete renders Safari Shadow DOM"] = 
`<div class="sbb-optgroup__divider">
  <sbb-divider orientation="horizontal">
  </sbb-divider>
</div>
<div
  aria-hidden="true"
  class="sbb-optgroup__label"
>
  <div class="sbb-optgroup__icon-space">
  </div>
  <span>
    Label
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-optgroup autocomplete renders Safari Shadow DOM */

snapshots["sbb-optgroup autocomplete renders disabled Safari DOM"] = 
`<sbb-optgroup
  disabled=""
  label="Label"
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
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders disabled Safari DOM */

snapshots["sbb-optgroup autocomplete renders disabled Safari Shadow DOM"] = 
`<div class="sbb-optgroup__divider">
  <sbb-divider orientation="horizontal">
  </sbb-divider>
</div>
<div
  aria-hidden="true"
  class="sbb-optgroup__label"
>
  <div class="sbb-optgroup__icon-space">
  </div>
  <span>
    Label
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-optgroup autocomplete renders disabled Safari Shadow DOM */

snapshots["sbb-optgroup autocomplete renders Chrome-Firefox DOM"] = 
`<sbb-optgroup label="Label">
  <sbb-option value="1">
    1
  </sbb-option>
  <sbb-option value="2">
    2
  </sbb-option>
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders Chrome-Firefox DOM */

snapshots["sbb-optgroup autocomplete renders Chrome-Firefox Shadow DOM"] = 
`<div class="sbb-optgroup__divider">
  <sbb-divider orientation="horizontal">
  </sbb-divider>
</div>
<div
  aria-hidden="true"
  class="sbb-optgroup__label"
>
  <div class="sbb-optgroup__icon-space">
  </div>
  <span>
    Label
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-optgroup autocomplete renders Chrome-Firefox Shadow DOM */

snapshots["sbb-optgroup autocomplete renders A11y tree Chrome"] = 
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
          "role": "combobox",
          "name": "",
          "invalid": false,
          "focusable": true,
          "focused": true,
          "editable": "plaintext",
          "settable": true,
          "autocomplete": "list",
          "hasPopup": "listbox",
          "required": false,
          "expanded": true
        },
        {
          "role": "group",
          "name": ""
        },
        {
          "role": "generic",
          "name": ""
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-optgroup autocomplete renders A11y tree Chrome */

snapshots["sbb-optgroup autocomplete renders disabled Chrome-Firefox DOM"] = 
`<sbb-optgroup
  disabled=""
  label="Label"
>
  <sbb-option value="1">
    1
  </sbb-option>
  <sbb-option value="2">
    2
  </sbb-option>
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders disabled Chrome-Firefox DOM */

snapshots["sbb-optgroup autocomplete renders disabled Chrome-Firefox Shadow DOM"] = 
`<div class="sbb-optgroup__divider">
  <sbb-divider orientation="horizontal">
  </sbb-divider>
</div>
<div
  aria-hidden="true"
  class="sbb-optgroup__label"
>
  <div class="sbb-optgroup__icon-space">
  </div>
  <span>
    Label
  </span>
</div>
<slot>
</slot>
`;
/* end snapshot sbb-optgroup autocomplete renders disabled Chrome-Firefox Shadow DOM */

