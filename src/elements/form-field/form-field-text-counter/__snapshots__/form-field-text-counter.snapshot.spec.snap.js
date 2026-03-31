/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-form-field-text-counter renders DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <label slot="label">
    Description
  </label>
  <textarea
    aria-describedby=""
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
`<span aria-hidden="true">
  100
  <slot>
    characters remaining
  </slot>
</span>
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

snapshots["sbb-form-field-text-counter renders with custom slot text DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <label slot="label">
    Description
  </label>
  <textarea
    aria-describedby=""
    maxlength="100"
    rows="3"
  >
  </textarea>
  <sbb-form-field-text-counter slot="hint">
    characters left
  </sbb-form-field-text-counter>
</sbb-form-field>
`;
/* end snapshot sbb-form-field-text-counter renders with custom slot text DOM */

snapshots["sbb-form-field-text-counter renders with custom slot text Shadow DOM"] = 
`<span aria-hidden="true">
  100
  <slot>
    characters remaining
  </slot>
</span>
`;
/* end snapshot sbb-form-field-text-counter renders with custom slot text Shadow DOM */

snapshots["sbb-form-field-text-counter renders with custom slot text A11y tree Chrome"] = 
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
/* end snapshot sbb-form-field-text-counter renders with custom slot text A11y tree Chrome */

