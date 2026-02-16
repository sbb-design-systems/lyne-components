/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-option-hint renders DOM"] = 
`<sbb-option-hint>
  Hint
</sbb-option-hint>
`;
/* end snapshot sbb-option-hint renders DOM */

snapshots["sbb-option-hint renders Shadow DOM"] = 
`<div class="sbb-option-hint__wrapper">
  <div class="sbb-optgroup__icon-space">
  </div>
  <span class="sbb-option-hint">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-option-hint renders Shadow DOM */

snapshots["sbb-option-hint renders A11y tree Chrome"] = 
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
              "ignored": true,
              "role": "none",
              "children": [
                {
                  "role": "StaticText",
                  "name": "Hint"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-option-hint renders A11y tree Chrome */

