/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-radio-button-group renders DOM"] = 
`<sbb-radio-button-group
  orientation="horizontal"
  value="2"
>
  <sbb-radio-button
    size="m"
    value="1"
  >
    1
  </sbb-radio-button>
  <sbb-radio-button
    size="m"
    tabindex="0"
    value="2"
  >
    2
  </sbb-radio-button>
  <sbb-radio-button
    size="m"
    value="3"
  >
    3
  </sbb-radio-button>
</sbb-radio-button-group>
`;
/* end snapshot sbb-radio-button-group renders DOM */

snapshots["sbb-radio-button-group renders Shadow DOM"] = 
`<div class="sbb-radio-group">
  <slot>
  </slot>
</div>
<slot name="error">
</slot>
`;
/* end snapshot sbb-radio-button-group renders Shadow DOM */

snapshots["sbb-radio-button-group renders with panel DOM"] = 
`<sbb-radio-button-group orientation="horizontal">
  <sbb-radio-button-panel
    color="white"
    size="m"
    tabindex="0"
    value="checkbox-1"
  >
    Label 1
  </sbb-radio-button-panel>
  <sbb-radio-button-panel
    color="white"
    size="m"
    value="checkbox-2"
  >
    Label 2
  </sbb-radio-button-panel>
  <sbb-radio-button-panel
    color="white"
    size="m"
    value="checkbox-3"
  >
    Label 3
  </sbb-radio-button-panel>
</sbb-radio-button-group>
`;
/* end snapshot sbb-radio-button-group renders with panel DOM */

snapshots["sbb-radio-button-group renders with panel Shadow DOM"] = 
`<div class="sbb-radio-group">
  <slot>
  </slot>
</div>
<slot name="error">
</slot>
`;
/* end snapshot sbb-radio-button-group renders with panel Shadow DOM */

snapshots["sbb-radio-button-group renders with selection-expansion-panel DOM"] = 
`<sbb-radio-button-group orientation="horizontal">
  <sbb-selection-expansion-panel>
    <sbb-radio-button-panel
      color="white"
      size="m"
      tabindex="0"
      value="checkbox-1"
    >
      Label 1
    </sbb-radio-button-panel>
    <sbb-radio-button-panel
      color="white"
      size="m"
      tabindex="0"
      value="checkbox-2"
    >
      Label 2
    </sbb-radio-button-panel>
    <sbb-radio-button-panel
      color="white"
      size="m"
      tabindex="0"
      value="checkbox-3"
    >
      Label 3
    </sbb-radio-button-panel>
  </sbb-selection-expansion-panel>
</sbb-radio-button-group>
`;
/* end snapshot sbb-radio-button-group renders with selection-expansion-panel DOM */

snapshots["sbb-radio-button-group renders with selection-expansion-panel Shadow DOM"] = 
`<div class="sbb-radio-group">
  <slot>
  </slot>
</div>
<slot name="error">
</slot>
`;
/* end snapshot sbb-radio-button-group renders with selection-expansion-panel Shadow DOM */

snapshots["sbb-radio-button-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radiogroup",
      "name": "",
      "required": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-group renders A11y tree Chrome */

