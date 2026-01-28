/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toggle-option renders DOM"] = 
`<sbb-toggle-option
  checked=""
  tabindex="0"
  value="Option 1"
>
</sbb-toggle-option>
`;
/* end snapshot sbb-toggle-option renders DOM */

snapshots["sbb-toggle-option renders Shadow DOM"] = 
`<div class="sbb-toggle-option">
  <slot name="icon">
  </slot>
  <span class="sbb-toggle-option__label">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-toggle-option renders Shadow DOM */

snapshots["sbb-toggle-option renders unchecked DOM"] = 
`<sbb-toggle-option
  tabindex="-1"
  value="Option 1"
>
</sbb-toggle-option>
`;
/* end snapshot sbb-toggle-option renders unchecked DOM */

snapshots["sbb-toggle-option renders unchecked Shadow DOM"] = 
`<div class="sbb-toggle-option">
  <slot name="icon">
  </slot>
  <span class="sbb-toggle-option__label">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-toggle-option renders unchecked Shadow DOM */

snapshots["sbb-toggle-option renders checked disabled DOM"] = 
`<sbb-toggle-option
  checked=""
  disabled=""
  tabindex="-1"
  value="Option 1"
>
</sbb-toggle-option>
`;
/* end snapshot sbb-toggle-option renders checked disabled DOM */

snapshots["sbb-toggle-option renders checked disabled Shadow DOM"] = 
`<div class="sbb-toggle-option">
  <slot name="icon">
  </slot>
  <span class="sbb-toggle-option__label">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-toggle-option renders checked disabled Shadow DOM */

snapshots["sbb-toggle-option renders unchecked disabled DOM"] = 
`<sbb-toggle-option
  disabled=""
  tabindex="-1"
  value="Option 1"
>
</sbb-toggle-option>
`;
/* end snapshot sbb-toggle-option renders unchecked disabled DOM */

snapshots["sbb-toggle-option renders unchecked disabled Shadow DOM"] = 
`<div class="sbb-toggle-option">
  <slot name="icon">
  </slot>
  <span class="sbb-toggle-option__label">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-toggle-option renders unchecked disabled Shadow DOM */

snapshots["sbb-toggle-option renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "",
      "focusable": true,
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-option renders A11y tree Chrome */

snapshots["sbb-toggle-option renders unchecked A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "",
      "focusable": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-option renders unchecked A11y tree Chrome */

snapshots["sbb-toggle-option renders checked disabled A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "",
      "disabled": true,
      "focusable": true,
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-option renders checked disabled A11y tree Chrome */

snapshots["sbb-toggle-option renders unchecked disabled A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "",
      "disabled": true,
      "focusable": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-option renders unchecked disabled A11y tree Chrome */

