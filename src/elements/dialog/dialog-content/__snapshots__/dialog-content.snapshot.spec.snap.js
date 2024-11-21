/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog-content renders DOM"] = 
`<sbb-dialog-content>
  Content
</sbb-dialog-content>
`;
/* end snapshot sbb-dialog-content renders DOM */

snapshots["sbb-dialog-content renders Shadow DOM"] = 
`<div class="sbb-dialog-content">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-dialog-content renders Shadow DOM */

snapshots["sbb-dialog-content renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Content"
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-content renders A11y tree Chrome */

snapshots["sbb-dialog-content renders A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Content"
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-content renders A11y tree Safari */

snapshots["sbb-dialog-content renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Content"
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-content renders A11y tree Firefox */

