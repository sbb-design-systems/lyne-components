/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-breadcrumb-group renders DOM"] = 
`<sbb-breadcrumb-group>
  <sbb-breadcrumb
    href="https://example.com"
    icon-name="pie-small"
    slot="li-0"
  >
  </sbb-breadcrumb>
  <sbb-breadcrumb
    href="https://example.com/one"
    slot="li-1"
  >
    One
  </sbb-breadcrumb>
  <sbb-breadcrumb
    accessibility-current="page"
    href="https://example.com/one"
    slot="li-2"
  >
    Two
  </sbb-breadcrumb>
</sbb-breadcrumb-group>
`;
/* end snapshot sbb-breadcrumb-group renders DOM */

snapshots["sbb-breadcrumb-group renders Shadow DOM"] = 
`<ol class="sbb-breadcrumb-group">
  <li class="sbb-breadcrumb-group__item">
    <slot name="li-0">
    </slot>
    <sbb-icon
      class="sbb-breadcrumb-group__divider-icon"
      name="chevron-small-right-small"
    >
    </sbb-icon>
  </li>
  <li class="sbb-breadcrumb-group__item">
    <slot name="li-1">
    </slot>
    <sbb-icon
      class="sbb-breadcrumb-group__divider-icon"
      name="chevron-small-right-small"
    >
    </sbb-icon>
  </li>
  <li class="sbb-breadcrumb-group__item">
    <slot name="li-2">
    </slot>
  </li>
</ol>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-breadcrumb-group renders Shadow DOM */

snapshots["sbb-breadcrumb-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "navigation",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-breadcrumb-group renders A11y tree Chrome */

