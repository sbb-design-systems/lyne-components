/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tab renders DOM"] = 
`<sbb-tab>
  <p>
    Content
  </p>
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

