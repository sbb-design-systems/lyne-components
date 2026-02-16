/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-card should render with sbb-card-badge - DOM"] = 
`<sbb-card color="white">
  <h2>
    Title
  </h2>
  Content text
  <sbb-card-badge
    color="charcoal"
    slot="badge"
  >
    <span>
      %
    </span>
    <span>
      from CHF
    </span>
    <span>
      19.99
    </span>
  </sbb-card-badge>
</sbb-card>
`;
/* end snapshot sbb-card should render with sbb-card-badge - DOM */

snapshots["sbb-card should render with sbb-card-badge - Shadow DOM"] = 
`<slot name="action">
</slot>
<span class="sbb-card__wrapper">
  <slot>
  </slot>
</span>
<span class="sbb-card__badge-wrapper">
  <slot name="badge">
  </slot>
</span>
`;
/* end snapshot sbb-card should render with sbb-card-badge - Shadow DOM */

snapshots["sbb-card A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-card A11y tree Chrome */

