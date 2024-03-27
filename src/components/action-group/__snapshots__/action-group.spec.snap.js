/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-action-group renders renders - Dom"] = 
`<sbb-action-group
  align-group="start"
  button-size="l"
  horizontal-from="medium"
  link-size="m"
  orientation="horizontal"
>
  <sbb-secondary-button
    data-action=""
    data-button=""
    data-sbb-button=""
    data-slot-names="unnamed"
    dir="ltr"
    role="button"
    size="l"
    tabindex="0"
  >
    Button
  </sbb-secondary-button>
  <sbb-block-link
    data-action=""
    data-link=""
    data-sbb-link=""
    data-slot-names="unnamed"
    dir="ltr"
    href="https://github.com/lyne-design-system/lyne-components"
    icon-name="chevron-small-left-small"
    icon-placement="start"
    role="link"
    size="m"
    tabindex="0"
  >
    Link
  </sbb-block-link>
</sbb-action-group>
`;
/* end snapshot sbb-action-group renders renders - Dom */

snapshots["sbb-action-group renders renders - ShadowDom"] = 
`<div class="sbb-action-group">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-action-group renders renders - ShadowDom */

snapshots["sbb-action-group renders A11y tree Chrome"] = 
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
      "name": "Link",
      "children": [
        {
          "role": "link",
          "name": "Link"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-action-group renders A11y tree Chrome */

snapshots["sbb-action-group renders A11y tree Firefox"] = 
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
      "children": [
        {
          "role": "link",
          "name": "Link",
          "value": "https://github.com/lyne-design-system/lyne-components"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-action-group renders A11y tree Firefox */

