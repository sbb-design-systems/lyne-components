/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-chip renders - Dom"] = 
`<sbb-chip
  color="milk"
  size="xxs"
>
  Label
</sbb-chip>
`;
/* end snapshot sbb-chip renders - Dom */

snapshots["sbb-chip renders - ShadowDom"] = 
`<span class="sbb-chip">
  <span class="sbb-chip__text-wrapper">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-chip renders - ShadowDom */

snapshots["sbb-chip A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip A11y tree Chrome */

snapshots["sbb-chip A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip A11y tree Firefox */

