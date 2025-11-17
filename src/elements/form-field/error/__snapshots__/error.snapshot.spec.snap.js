/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-error renders DOM"] = 
`<sbb-error id="sbb-error-0">
  Required
</sbb-error>
`;
/* end snapshot sbb-error renders DOM */

snapshots["sbb-error renders Shadow DOM"] = 
`<span class="form-error__icon">
  <slot name="icon">
  </slot>
</span>
<span class="form-error-content">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-error renders Shadow DOM */

snapshots["sbb-error renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Required"
    }
  ]
}
</p>
`;
/* end snapshot sbb-error renders A11y tree Chrome */

snapshots["sbb-error renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Required"
    }
  ]
}
</p>
`;
/* end snapshot sbb-error renders A11y tree Firefox */

