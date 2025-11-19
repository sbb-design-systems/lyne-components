/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-optgroup autocomplete renders Safari DOM"] = 
`<sbb-optgroup
  data-variant="autocomplete"
  label="Label"
>
  <sbb-option
    data-variant="autocomplete"
    id="sbb-option-0"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    data-variant="autocomplete"
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
  data-variant="autocomplete"
  disabled=""
  label="Label"
>
  <sbb-option
    data-variant="autocomplete"
    id="sbb-option-4"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    data-variant="autocomplete"
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
`<sbb-optgroup
  data-variant="autocomplete"
  label="Label"
>
  <sbb-option
    data-variant="autocomplete"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    data-variant="autocomplete"
    value="2"
  >
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
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "combobox",
      "name": "",
      "expanded": true,
      "focused": true,
      "autocomplete": "list",
      "haspopup": "listbox"
    },
    {
      "role": "listbox",
      "name": "",
      "orientation": "vertical"
    }
  ]
}
</p>
`;
/* end snapshot sbb-optgroup autocomplete renders A11y tree Chrome */

snapshots["sbb-optgroup autocomplete renders disabled Chrome-Firefox DOM"] = 
`<sbb-optgroup
  data-variant="autocomplete"
  disabled=""
  label="Label"
>
  <sbb-option
    data-variant="autocomplete"
    value="1"
  >
    1
  </sbb-option>
  <sbb-option
    data-variant="autocomplete"
    value="2"
  >
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

snapshots["sbb-optgroup autocomplete renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "combobox",
      "name": "",
      "expanded": true,
      "focused": true,
      "autocomplete": "list",
      "haspopup": "listbox"
    },
    {
      "role": "listbox",
      "name": "",
      "children": [
        {
          "role": "option",
          "name": "1"
        },
        {
          "role": "option",
          "name": "2"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-optgroup autocomplete renders A11y tree Firefox */

