/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-form-error renders"] = 
`<span class="form-error__icon">
  <slot name="icon">
  </slot>
</span>
<span class="form-error-content">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-form-error renders */

snapshots["sbb-form-error A11y tree Chrome"] = 
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
/* end snapshot sbb-form-error A11y tree Chrome */

snapshots["sbb-form-error A11y tree Firefox"] = 
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
/* end snapshot sbb-form-error A11y tree Firefox */

