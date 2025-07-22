/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog-title renders Light DOM"] = 
`<sbb-dialog-title
  level="2"
  slot="title-section"
  visual-level="4"
>
  Title
</sbb-dialog-title>
`;
/* end snapshot sbb-dialog-title renders Light DOM */

snapshots["sbb-dialog-title renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-dialog-title renders Shadow DOM */

snapshots["sbb-dialog-title renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 2
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-title renders A11y tree Chrome */

snapshots["sbb-dialog-title renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 2
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-title renders A11y tree Firefox */

