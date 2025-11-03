/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog-close-button renders DOM"] = 
`<sbb-dialog-close-button
  data-action=""
  data-button=""
  data-sbb-button=""
  size="s"
  slot="title-section"
  tabindex="0"
>
</sbb-dialog-close-button>
`;
/* end snapshot sbb-dialog-close-button renders DOM */

snapshots["sbb-dialog-close-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-dialog-close-button">
  <slot name="icon">
    <sbb-icon
      data-namespace="default"
      name="cross-small"
    >
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-dialog-close-button renders Shadow DOM */

snapshots["sbb-dialog-close-button renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Close secondary window"
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-close-button renders A11y tree Firefox */

snapshots["sbb-dialog-close-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Close secondary window"
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog-close-button renders A11y tree Chrome */

