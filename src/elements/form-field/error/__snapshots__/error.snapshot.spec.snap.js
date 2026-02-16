/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-error renders DOM"] = 
`<sbb-error id="sbb-error-0">
  Required
</sbb-error>
`;
/* end snapshot sbb-error renders DOM */

snapshots["sbb-error renders Shadow DOM"] = 
`<span class="error__icon">
  <slot name="icon">
  </slot>
</span>
<span class="error-content">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-error renders Shadow DOM */

snapshots["sbb-error renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-error renders A11y tree Chrome */

