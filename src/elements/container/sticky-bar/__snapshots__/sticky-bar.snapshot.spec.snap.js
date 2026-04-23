/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sticky-bar renders DOM"] = 
`<sbb-sticky-bar
  size="m"
  slot="sticky-bar"
>
</sbb-sticky-bar>
`;
/* end snapshot sbb-sticky-bar renders DOM */

snapshots["sbb-sticky-bar renders Shadow DOM"] = 
`<div class="sbb-sticky-bar__wrapper">
  <div class="sbb-sticky-bar">
    <slot>
    </slot>
  </div>
</div>
<div class="sbb-sticky-bar__intersector">
</div>
`;
/* end snapshot sbb-sticky-bar renders Shadow DOM */

snapshots["sbb-sticky-bar renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    },
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-sticky-bar renders A11y tree Chrome */

