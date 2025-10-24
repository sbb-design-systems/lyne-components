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
    data-checked=""
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
<div class="sbb-radio-group__error">
  <slot name="error">
  </slot>
</div>
`;
/* end snapshot sbb-radio-button-group renders Shadow DOM */

snapshots["sbb-radio-button-group renders with panel DOM"] = 
`<sbb-radio-button-group
  data-has-panel=""
  orientation="horizontal"
>
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
<div class="sbb-radio-group__error">
  <slot name="error">
  </slot>
</div>
`;
/* end snapshot sbb-radio-button-group renders with panel Shadow DOM */

snapshots["sbb-radio-button-group renders with selection-expansion-panel DOM"] = 
`<sbb-radio-button-group
  data-has-panel=""
  orientation="horizontal"
>
  <sbb-selection-expansion-panel
    color="white"
    data-size="m"
    data-state="closed"
  >
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
<div class="sbb-radio-group__error">
  <slot name="error">
  </slot>
</div>
`;
/* end snapshot sbb-radio-button-group renders with selection-expansion-panel Shadow DOM */

snapshots["sbb-radio-button-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "1",
      "checked": false
    },
    {
      "role": "radio",
      "name": "2",
      "checked": true
    },
    {
      "role": "radio",
      "name": "3",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-group renders A11y tree Chrome */

snapshots["sbb-radio-button-group renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "1"
    },
    {
      "role": "radio",
      "name": "2",
      "checked": true
    },
    {
      "role": "radio",
      "name": "3"
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-group renders A11y tree Firefox */

