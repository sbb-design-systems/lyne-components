/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-chip-label renders DOM"] = 
`<sbb-chip-label
  color="milk"
  size="xxs"
>
  Label
</sbb-chip-label>
`;
/* end snapshot sbb-chip-label renders DOM */

snapshots["sbb-chip-label renders Shadow DOM"] = 
`<span class="sbb-chip__text-wrapper">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-chip-label renders Shadow DOM */

snapshots["sbb-chip-label renders A11y tree Chrome"] = 
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
/* end snapshot sbb-chip-label renders A11y tree Chrome */

