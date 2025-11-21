/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-form-field-clear renders form-field DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <label
    for="sbb-form-field-input-0"
    slot="label"
  >
    Label
  </label>
  <input
    id="sbb-form-field-input-0"
    placeholder="Input placeholder"
    type="text"
    value="Input value"
  >
  <sbb-form-field-clear
    slot="suffix"
    tabindex="0"
  >
  </sbb-form-field-clear>
</sbb-form-field>
`;
/* end snapshot sbb-form-field-clear renders form-field DOM */

snapshots["sbb-form-field-clear renders form-field-clear Shadow DOM"] = 
`<span class="sbb-action-base sbb-form-field-clear">
  <sbb-icon name="cross-small">
  </sbb-icon>
</span>
`;
/* end snapshot sbb-form-field-clear renders form-field-clear Shadow DOM */

snapshots["sbb-form-field-clear renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "​"
    },
    {
      "role": "text",
      "name": "Label"
    },
    {
      "role": "textbox",
      "name": "Label",
      "value": "Input value"
    },
    {
      "role": "button",
      "name": "Clear input value"
    }
  ]
}
</p>
`;
/* end snapshot sbb-form-field-clear renders A11y tree Chrome */

snapshots["sbb-form-field-clear renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "statictext",
      "name": "​"
    },
    {
      "role": "text leaf",
      "name": "Label"
    },
    {
      "role": "textbox",
      "name": "Label",
      "value": "Input value"
    },
    {
      "role": "button",
      "name": "Clear input value"
    }
  ]
}
</p>
`;
/* end snapshot sbb-form-field-clear renders A11y tree Firefox */

