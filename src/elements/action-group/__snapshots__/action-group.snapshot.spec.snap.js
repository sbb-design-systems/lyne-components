/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-action-group renders DOM"] = 
`<sbb-action-group
  align-group="start"
  button-size="l"
  horizontal-from="large"
  link-size="m"
  orientation="horizontal"
>
  <sbb-secondary-button
    size="l"
    tabindex="0"
  >
    Button
  </sbb-secondary-button>
  <sbb-block-link
    href="https://github.com/sbb-design-systems/lyne-components"
    icon-name="chevron-small-left-small"
    icon-placement="start"
    size="m"
  >
    Link
  </sbb-block-link>
</sbb-action-group>
`;
/* end snapshot sbb-action-group renders DOM */

snapshots["sbb-action-group renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-action-group renders Shadow DOM */

snapshots["sbb-action-group renders A11y tree Chrome"] = 
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
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "button",
              "name": "Button",
              "invalid": false,
              "focusable": true
            },
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
/* end snapshot sbb-action-group renders A11y tree Chrome */

