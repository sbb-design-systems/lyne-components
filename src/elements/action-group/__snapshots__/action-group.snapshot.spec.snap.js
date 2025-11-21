/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-action-group renders renders DOM"] = 
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
/* end snapshot sbb-action-group renders renders DOM */

snapshots["sbb-action-group renders renders Shadow DOM"] = 
`<div class="sbb-action-group">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-action-group renders renders Shadow DOM */

snapshots["sbb-action-group renders renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button"
    },
    {
      "role": "link",
      "name": "Link"
    }
  ]
}
</p>
`;
/* end snapshot sbb-action-group renders renders A11y tree Chrome */

snapshots["sbb-action-group renders renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Button"
    },
    {
      "role": "link",
      "name": "Link",
      "value": "https://github.com/sbb-design-systems/lyne-components"
    }
  ]
}
</p>
`;
/* end snapshot sbb-action-group renders renders A11y tree Firefox */

