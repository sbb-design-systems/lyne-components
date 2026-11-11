/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-button renders DOM"] = 
`<sbb-autocomplete-button icon-name="pie-small">
</sbb-autocomplete-button>
`;
/* end snapshot sbb-autocomplete-button renders DOM */

snapshots["sbb-autocomplete-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-autocomplete-button">
  <slot name="icon">
    <sbb-icon name="pie-small">
    </sbb-icon>
  </slot>
</span>
`;
/* end snapshot sbb-autocomplete-button renders Shadow DOM */

snapshots["sbb-autocomplete-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": "",
      "description": "Button"
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-button renders A11y tree Chrome */

