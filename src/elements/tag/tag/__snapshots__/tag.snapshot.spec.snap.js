/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tag renders unchecked DOM"] = 
`<sbb-tag
  aria-label="Check to remove filters"
  data-action=""
  data-button=""
  size="m"
  tabindex="0"
  value="all"
>
  All
</sbb-tag>
`;
/* end snapshot sbb-tag renders unchecked DOM */

snapshots["sbb-tag renders unchecked Shadow DOM"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__text">
    <slot>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__amount">
    <slot name="amount">
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tag renders unchecked Shadow DOM */

snapshots["sbb-tag renders checked DOM"] = 
`<sbb-tag
  checked=""
  data-action=""
  data-button=""
  data-checked=""
  size="m"
  tabindex="0"
  value="info"
>
  Info
</sbb-tag>
`;
/* end snapshot sbb-tag renders checked DOM */

snapshots["sbb-tag renders checked Shadow DOM"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__text">
    <slot>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__amount">
    <slot name="amount">
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tag renders checked Shadow DOM */

snapshots["sbb-tag renders disabled with icon and amount DOM"] = 
`<sbb-tag
  amount="123"
  data-action=""
  data-button=""
  disabled=""
  icon-name="circle-information-small"
  size="m"
  value="information"
>
  Info
</sbb-tag>
`;
/* end snapshot sbb-tag renders disabled with icon and amount DOM */

snapshots["sbb-tag renders disabled with icon and amount Shadow DOM"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
      <sbb-icon
        data-namespace="default"
        name="circle-information-small"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__text">
    <slot>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__amount">
    <slot name="amount">
      123
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tag renders disabled with icon and amount Shadow DOM */

snapshots["sbb-tag renders slotted icon and amount DOM"] = 
`<sbb-tag
  data-action=""
  data-button=""
  size="m"
  tabindex="0"
  value="foo"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="cross-small"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Info
  <span slot="amount">
    123
  </span>
</sbb-tag>
`;
/* end snapshot sbb-tag renders slotted icon and amount DOM */

snapshots["sbb-tag renders slotted icon and amount Shadow DOM"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__text">
    <slot>
    </slot>
  </span>
  <span class="sbb-tag--shift sbb-tag__amount">
    <slot name="amount">
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-tag renders slotted icon and amount Shadow DOM */

snapshots["sbb-tag A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Label",
      "pressed": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag A11y tree Chrome */

snapshots["sbb-tag A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "toggle button",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag A11y tree Firefox */

