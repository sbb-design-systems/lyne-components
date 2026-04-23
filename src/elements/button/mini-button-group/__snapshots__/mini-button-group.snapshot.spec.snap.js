/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-mini-button-group renders DOM"] = 
`<sbb-mini-button-group
  accessibility-label="Group label"
  size="m"
>
  <sbb-mini-button
    icon-name="pen-small"
    slot="li-0"
    tabindex="0"
  >
  </sbb-mini-button>
  <sbb-divider
    orientation="vertical"
    slot="li-1"
  >
  </sbb-divider>
  <sbb-mini-button
    icon-name="pen-small"
    slot="li-2"
    tabindex="0"
  >
  </sbb-mini-button>
</sbb-mini-button-group>
`;
/* end snapshot sbb-mini-button-group renders DOM */

snapshots["sbb-mini-button-group renders Shadow DOM"] = 
`<ul
  aria-label="Group label"
  class="sbb-mini-button-group"
>
  <li>
    <slot name="li-0">
    </slot>
  </li>
  <li aria-hidden="true">
    <slot name="li-1">
    </slot>
  </li>
  <li>
    <slot name="li-2">
    </slot>
  </li>
</ul>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-mini-button-group renders Shadow DOM */

snapshots["sbb-mini-button-group renders negative DOM"] = 
`<sbb-mini-button-group
  negative=""
  size="m"
>
  <sbb-mini-button
    icon-name="pen-small"
    negative=""
    slot="li-0"
    tabindex="0"
  >
  </sbb-mini-button>
  <sbb-mini-button
    icon-name="pen-small"
    negative=""
    slot="li-1"
    tabindex="0"
  >
  </sbb-mini-button>
</sbb-mini-button-group>
`;
/* end snapshot sbb-mini-button-group renders negative DOM */

snapshots["sbb-mini-button-group renders negative Shadow DOM"] = 
`<ul class="sbb-mini-button-group">
  <li>
    <slot name="li-0">
    </slot>
  </li>
  <li>
    <slot name="li-1">
    </slot>
  </li>
</ul>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-mini-button-group renders negative Shadow DOM */

snapshots["sbb-mini-button-group renders A11y tree Chrome"] = 
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
          "role": "list",
          "name": "Group label"
        },
        {
          "ignored": true,
          "role": "none"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-button-group renders A11y tree Chrome */

