/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-container renders DOM"] = 
`<sbb-container color="white">
</sbb-container>
`;
/* end snapshot sbb-container renders DOM */

snapshots["sbb-container renders Shadow DOM"] = 
`<div class="sbb-container">
  <slot name="image">
  </slot>
  <div class="sbb-container__content">
    <slot>
    </slot>
  </div>
</div>
<slot name="sticky-bar">
</slot>
`;
/* end snapshot sbb-container renders Shadow DOM */

snapshots["sbb-container renders A11y tree Chrome"] = 
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
              "role": "none"
            },
            {
              "ignored": true,
              "role": "none"
            },
            {
              "ignored": true,
              "role": "none"
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-container renders A11y tree Chrome */

