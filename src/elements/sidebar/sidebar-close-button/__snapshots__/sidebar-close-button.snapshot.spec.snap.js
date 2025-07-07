/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-sidebar-close-button renders DOM"] = 
`<sbb-sidebar-close-button
  data-action=""
  data-button=""
  data-sbb-button=""
  icon-name="cross-small"
  size="s"
  slot="title-section"
  tabindex="0"
>
</sbb-sidebar-close-button>
`;
/* end snapshot sbb-sidebar-close-button renders DOM */

snapshots["sbb-sidebar-close-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-sidebar-close-button">
  <slot name="icon">
    <sbb-icon
      data-namespace="default"
      name="cross-small"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-sidebar-close-button renders Shadow DOM */

snapshots["sbb-sidebar-close-button renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Close sidebar"
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-close-button renders A11y tree Firefox */

snapshots["sbb-sidebar-close-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Close sidebar"
    }
  ]
}
</p>
`;
/* end snapshot sbb-sidebar-close-button renders A11y tree Chrome */

