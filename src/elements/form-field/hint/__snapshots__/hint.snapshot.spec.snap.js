/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-hint renders DOM"] = 
`<sbb-hint slot="hint">
  Hint text
</sbb-hint>
`;
/* end snapshot sbb-hint renders DOM */

snapshots["sbb-hint renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-hint renders Shadow DOM */

snapshots["sbb-hint renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "role": "generic",
          "name": ""
        },
        {
          "role": "generic",
          "name": ""
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "generic",
              "name": ""
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-hint renders A11y tree Chrome */

