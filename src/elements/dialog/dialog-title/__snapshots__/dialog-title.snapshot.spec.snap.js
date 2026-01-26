/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog-title renders Light DOM"] = 
`<sbb-dialog-title
  level="2"
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
  "role": "generic",
  "name": "Fixture Container",
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

