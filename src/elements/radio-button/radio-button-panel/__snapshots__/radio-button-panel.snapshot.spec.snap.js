/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-radio-button-panel renders DOM"] = 
`<sbb-radio-button-panel
  color="white"
  name="radio"
  size="m"
  tabindex="0"
  value="radio-value"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-radio-button-panel>
`;
/* end snapshot sbb-radio-button-panel renders DOM */

snapshots["sbb-radio-button-panel renders Shadow DOM"] = 
`<div class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-radio-button">
    <span class="sbb-radio-button__label-slot">
      <slot>
      </slot>
      <slot name="suffix">
      </slot>
    </span>
    <slot name="subtext">
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-radio-button-panel renders Shadow DOM */

snapshots["sbb-radio-button-panel renders checked DOM"] = 
`<sbb-radio-button-panel
  checked=""
  color="white"
  name="radio"
  size="m"
  tabindex="0"
  value="radio-value"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-radio-button-panel>
`;
/* end snapshot sbb-radio-button-panel renders checked DOM */

snapshots["sbb-radio-button-panel renders checked Shadow DOM"] = 
`<div class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-radio-button">
    <span class="sbb-radio-button__label-slot">
      <slot>
      </slot>
      <slot name="suffix">
      </slot>
    </span>
    <slot name="subtext">
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-radio-button-panel renders checked Shadow DOM */

snapshots["sbb-radio-button-panel renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext",
      "invalid": false,
      "focusable": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders A11y tree Chrome */

snapshots["sbb-radio-button-panel renders checked A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "Label Suffix Subtext",
      "invalid": false,
      "focusable": true,
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders checked A11y tree Chrome */

snapshots["sbb-radio-button-panel renders disabled - A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radio",
      "name": "Label",
      "disabled": true,
      "invalid": false,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel renders disabled - A11y tree Chrome */

snapshots["sbb-radio-button-panel renders required - A11y tree Chrome"] = 
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
/* end snapshot sbb-radio-button-panel renders required - A11y tree Chrome */

