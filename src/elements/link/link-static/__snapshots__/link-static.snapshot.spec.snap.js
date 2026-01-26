/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link-static renders DOM"] = 
`<sbb-link-static size="m">
  Travelcards & tickets.
</sbb-link-static>
`;
/* end snapshot sbb-link-static renders DOM */

snapshots["sbb-link-static renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-link-static">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-link-static renders Shadow DOM */

snapshots["sbb-link-static renders A11y tree Chrome"] = 
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
          "role": "StaticText",
          "name": "Travelcards & tickets."
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-link-static renders A11y tree Chrome */

