/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-card-badge renders DOM"] = 
`<sbb-card-badge
  color="charcoal"
  slot="badge"
>
  Black Friday Special
</sbb-card-badge>
`;
/* end snapshot sbb-card-badge renders DOM */

snapshots["sbb-card-badge renders Shadow DOM"] = 
`<span
  aria-hidden="true"
  class="sbb-card-badge-background"
>
</span>
<span class="sbb-card-badge-content">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-card-badge renders Shadow DOM */

snapshots["sbb-card-badge renders A11y tree Chrome"] = 
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
/* end snapshot sbb-card-badge renders A11y tree Chrome */

