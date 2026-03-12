/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-form-field-text-counter renders DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <label
    for="sbb-form-field-input-0"
    slot="label"
  >
    Description
  </label>
  <textarea
    id="sbb-form-field-input-0"
    maxlength="100"
    rows="3"
  >
  </textarea>
  <sbb-form-field-text-counter slot="hint">
  </sbb-form-field-text-counter>
</sbb-form-field>
`;
/* end snapshot sbb-form-field-text-counter renders DOM */

snapshots["sbb-form-field-text-counter renders Shadow DOM"] = 
`100
<slot>
  characters remaining
</slot>
`;
/* end snapshot sbb-form-field-text-counter renders Shadow DOM */

snapshots["sbb-form-field-text-counter renders A11y tree Chrome"] = 
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
          "role": "none",
          "children": [
            {
              "role": "generic",
              "name": ""
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-form-field-text-counter renders A11y tree Chrome */

