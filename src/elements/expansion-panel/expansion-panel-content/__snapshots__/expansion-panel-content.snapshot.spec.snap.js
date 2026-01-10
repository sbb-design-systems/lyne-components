/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-expansion-panel-content renders DOM"] = 
`<sbb-expansion-panel-content slot="content">
  Content
</sbb-expansion-panel-content>
`;
/* end snapshot sbb-expansion-panel-content renders DOM */

snapshots["sbb-expansion-panel-content renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-expansion-panel-content renders Shadow DOM */

snapshots["sbb-expansion-panel-content renders A11y tree Chrome"] = 
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
/* end snapshot sbb-expansion-panel-content renders A11y tree Chrome */

snapshots["sbb-expansion-panel-content renders A11y tree Firefox"] = 
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
/* end snapshot sbb-expansion-panel-content renders A11y tree Firefox */

