/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-title renders DOM"] = 
`<sbb-title
  aria-level="1"
  level="1"
  role="heading"
  visual-level="2"
>
  Sample Title Text
</sbb-title>
`;
/* end snapshot sbb-title renders DOM */

snapshots["sbb-title renders Shadow DOM"] = 
`<h1
  class="sbb-title"
  role="presentation"
>
  <slot>
  </slot>
</h1>
`;
/* end snapshot sbb-title renders Shadow DOM */

snapshots["sbb-title A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
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

snapshots["sbb-title A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
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
/* end snapshot sbb-title A11y tree Firefox */

