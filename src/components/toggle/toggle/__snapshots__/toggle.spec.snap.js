/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toggle A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Value one",
      "checked": true
    },
    {
      "role": "radio",
      "name": "Value two",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle A11y tree Chrome */

snapshots["sbb-toggle A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Value one",
      "checked": true
    },
    {
      "role": "radio",
      "name": "Value two"
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle A11y tree Firefox */

