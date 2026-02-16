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
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "role": "generic",
          "name": ""
        },
        {
          "role": "generic",
          "name": ""
        },
        {
          "ignored": true,
          "role": "none"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-form-field-clear renders A11y tree Chrome */

