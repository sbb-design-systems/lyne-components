/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toggle renders DOM"] = 
`<sbb-toggle size="m">
  <sbb-toggle-option
    checked=""
    tabindex="0"
    value="Value one"
  >
    Value one
  </sbb-toggle-option>
  <sbb-toggle-option
    tabindex="-1"
    value="Value two"
  >
    Value two
  </sbb-toggle-option>
</sbb-toggle>
`;
/* end snapshot sbb-toggle renders DOM */

snapshots["sbb-toggle renders Shadow DOM"] = 
`<div class="sbb-toggle">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-toggle renders Shadow DOM */

snapshots["sbb-toggle renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "radiogroup",
      "name": "",
      "invalid": false,
      "required": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle renders A11y tree Chrome */

