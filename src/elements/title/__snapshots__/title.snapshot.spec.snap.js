/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-title renders DOM"] = 
`<sbb-title
  level="1"
  visual-level="2"
>
  Sample Title Text
</sbb-title>
`;
/* end snapshot sbb-title renders DOM */

snapshots["sbb-title renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-title renders Shadow DOM */

snapshots["sbb-title A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "heading",
      "name": "Sample Title Text",
      "level": 1
    }
  ]
}
</p>
`;
/* end snapshot sbb-title A11y tree Chrome */

