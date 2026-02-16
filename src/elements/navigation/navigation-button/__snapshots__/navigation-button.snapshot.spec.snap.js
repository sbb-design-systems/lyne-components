/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-navigation-button renders DOM"] = 
`<sbb-navigation-button
  size="l"
  tabindex="0"
>
  Button
</sbb-navigation-button>
`;
/* end snapshot sbb-navigation-button renders DOM */

snapshots["sbb-navigation-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-navigation-button">
  <sbb-icon name="dash-small">
  </sbb-icon>
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-navigation-button renders Shadow DOM */

snapshots["sbb-navigation-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Button",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-navigation-button renders A11y tree Chrome */

