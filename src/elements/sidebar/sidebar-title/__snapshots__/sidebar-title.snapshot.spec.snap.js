/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sidebar-title renders Light DOM"] = 
`<sbb-sidebar-title
  level="2"
  slot="title-section"
  visual-level="5"
>
  Title
</sbb-sidebar-title>
`;
/* end snapshot sbb-sidebar-title renders Light DOM */

snapshots["sbb-sidebar-title renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-sidebar-title renders Shadow DOM */

snapshots["sbb-sidebar-title renders A11y tree Chrome"] = 
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
/* end snapshot sbb-sidebar-title renders A11y tree Chrome */

