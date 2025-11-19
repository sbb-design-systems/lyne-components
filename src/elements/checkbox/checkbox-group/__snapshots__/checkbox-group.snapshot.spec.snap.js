/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-checkbox-group renders DOM"] = 
`<sbb-checkbox-group orientation="horizontal">
  <sbb-checkbox
    icon-placement="end"
    size="m"
    tabindex="0"
    value="checkbox-1"
  >
    Label 1
  </sbb-checkbox>
  <sbb-checkbox
    icon-placement="end"
    size="m"
    tabindex="0"
    value="checkbox-2"
  >
    Label 2
  </sbb-checkbox>
  <sbb-checkbox
    icon-placement="end"
    size="m"
    tabindex="0"
    value="checkbox-3"
  >
    Label 3
  </sbb-checkbox>
</sbb-checkbox-group>
`;
/* end snapshot sbb-checkbox-group renders DOM */

snapshots["sbb-checkbox-group renders Shadow DOM"] = 
`<div class="sbb-checkbox-group">
  <slot>
  </slot>
</div>
<slot name="error">
</slot>
`;
/* end snapshot sbb-checkbox-group renders Shadow DOM */

snapshots["sbb-checkbox-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label 1",
      "checked": false
    },
    {
      "role": "checkbox",
      "name": "​ Label 2",
      "checked": false
    },
    {
      "role": "checkbox",
      "name": "​ Label 3",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox-group renders A11y tree Chrome */

snapshots["sbb-checkbox-group renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label 1"
    },
    {
      "role": "checkbox",
      "name": "​ Label 2"
    },
    {
      "role": "checkbox",
      "name": "​ Label 3"
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox-group renders A11y tree Firefox */

snapshots["sbb-checkbox-group renders with panel DOM"] = 
`<sbb-checkbox-group
  data-has-panel=""
  orientation="horizontal"
>
  <sbb-checkbox-panel
    color="white"
    size="m"
    tabindex="0"
    value="checkbox-1"
  >
    Label 1
  </sbb-checkbox-panel>
  <sbb-checkbox-panel
    color="white"
    size="m"
    tabindex="0"
    value="checkbox-2"
  >
    Label 2
  </sbb-checkbox-panel>
  <sbb-checkbox-panel
    color="white"
    size="m"
    tabindex="0"
    value="checkbox-3"
  >
    Label 3
  </sbb-checkbox-panel>
</sbb-checkbox-group>
`;
/* end snapshot sbb-checkbox-group renders with panel DOM */

snapshots["sbb-checkbox-group renders with panel Shadow DOM"] = 
`<div class="sbb-checkbox-group">
  <slot>
  </slot>
</div>
<slot name="error">
</slot>
`;
/* end snapshot sbb-checkbox-group renders with panel Shadow DOM */

snapshots["sbb-checkbox-group renders with selection-expansion-panel DOM"] = 
`<sbb-checkbox-group
  data-has-panel=""
  orientation="horizontal"
>
  <sbb-selection-expansion-panel
    color="white"
    data-size="m"
    data-state="closed"
  >
    <sbb-checkbox-panel
      color="white"
      size="m"
      tabindex="0"
      value="checkbox-1"
    >
      Label 1
    </sbb-checkbox-panel>
    <sbb-checkbox-panel
      color="white"
      size="m"
      tabindex="0"
      value="checkbox-2"
    >
      Label 2
    </sbb-checkbox-panel>
    <sbb-checkbox-panel
      color="white"
      size="m"
      tabindex="0"
      value="checkbox-3"
    >
      Label 3
    </sbb-checkbox-panel>
  </sbb-selection-expansion-panel>
</sbb-checkbox-group>
`;
/* end snapshot sbb-checkbox-group renders with selection-expansion-panel DOM */

snapshots["sbb-checkbox-group renders with selection-expansion-panel Shadow DOM"] = 
`<div class="sbb-checkbox-group">
  <slot>
  </slot>
</div>
<slot name="error">
</slot>
`;
/* end snapshot sbb-checkbox-group renders with selection-expansion-panel Shadow DOM */

