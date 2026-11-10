/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-optgroup autocomplete renders DOM"] = 
`<sbb-optgroup label="Label">
  <sbb-option value="1">
    1
  </sbb-option>
  <sbb-option value="2">
    2
  </sbb-option>
</sbb-optgroup>
`;
/* end snapshot sbb-optgroup autocomplete renders DOM */

snapshots["sbb-optgroup autocomplete renders Shadow DOM"] = 
`<div
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
/* end snapshot sbb-optgroup autocomplete renders Shadow DOM */

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
          "expanded": true,
          "controls": ""
        },
        {
          "role": "listbox",
          "name": "",
          "focusable": true,
          "multiselectable": false,
          "orientation": "vertical",
          "required": false
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

snapshots["sbb-optgroup autocomplete renders disabled DOM"] = 
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
/* end snapshot sbb-optgroup autocomplete renders disabled DOM */

snapshots["sbb-optgroup autocomplete renders disabled Shadow DOM"] = 
`<div
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
/* end snapshot sbb-optgroup autocomplete renders disabled Shadow DOM */

