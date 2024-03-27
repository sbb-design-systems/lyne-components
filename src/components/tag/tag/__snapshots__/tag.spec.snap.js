/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tag renders unchecked"] = 
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
/* end snapshot sbb-tag renders unchecked */

snapshots["sbb-tag renders checked"] = 
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
/* end snapshot sbb-tag renders checked */

snapshots["sbb-tag renders disabled with icon and amount"] = 
`<span class="sbb-action-base sbb-tag">
  <span class="sbb-tag--shift sbb-tag__icon">
    <slot name="icon">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="circle-information-small"
        role="img"
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
/* end snapshot sbb-tag renders disabled with icon and amount */

snapshots["sbb-tag renders slotted icon and amount"] = 
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
/* end snapshot sbb-tag renders slotted icon and amount */

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

