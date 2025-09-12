/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tab renders DOM"] = 
`<sbb-tab id="sbb-tab-0">
  Content
</sbb-tab>
`;
/* end snapshot sbb-tab renders DOM */

snapshots["sbb-tab renders Shadow DOM"] = 
`<div class="sbb-tab">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-tab renders Shadow DOM */

snapshots["sbb-tab renders A11y tree Firefox"] = 
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
/* end snapshot sbb-tab renders A11y tree Firefox */

snapshots["sbb-tab renders A11y tree Chrome"] = 
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
/* end snapshot sbb-tab renders A11y tree Chrome */

