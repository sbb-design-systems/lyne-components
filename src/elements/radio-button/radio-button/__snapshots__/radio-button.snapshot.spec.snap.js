/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-radio-button renders DOM"] = 
`<sbb-radio-button
  name="radio"
  size="m"
  tabindex="0"
  value="radio-value"
>
</sbb-radio-button>
`;
/* end snapshot sbb-radio-button renders DOM */

snapshots["sbb-radio-button renders Shadow DOM"] = 
`<div class="sbb-radio-button">
  <span class="sbb-radio-button__label-slot">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-radio-button renders Shadow DOM */

snapshots["sbb-radio-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "",
      "invalid": false,
      "focusable": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders A11y tree Chrome */

snapshots["sbb-radio-button renders checked - A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "",
      "invalid": false,
      "focusable": true,
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders checked - A11y tree Chrome */

snapshots["sbb-radio-button renders disabled - A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "",
      "disabled": true,
      "invalid": false,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders disabled - A11y tree Chrome */

snapshots["sbb-radio-button renders required - A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "",
      "invalid": true,
      "focusable": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button renders required - A11y tree Chrome */

