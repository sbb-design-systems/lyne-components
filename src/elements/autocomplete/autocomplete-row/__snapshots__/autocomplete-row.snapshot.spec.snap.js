/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-row renders DOM"] = 
`<sbb-autocomplete-row>
  <sbb-option value="1">
    Option 1
  </sbb-option>
  <sbb-autocomplete-button icon-name="pie-small">
  </sbb-autocomplete-button>
</sbb-autocomplete-row>
`;
/* end snapshot sbb-autocomplete-row renders DOM */

snapshots["sbb-autocomplete-row renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-autocomplete-row renders Shadow DOM */

snapshots["sbb-autocomplete-row renders A11y tree Chrome"] = 
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
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "generic",
              "name": ""
            },
            {
              "role": "button",
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
/* end snapshot sbb-autocomplete-row renders A11y tree Chrome */

