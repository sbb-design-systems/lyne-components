/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-grid-option renders DOM"] = 
`<sbb-autocomplete-grid-option
  id="sbb-autocomplete-grid-option-0"
  value="1"
>
  Option 1
</sbb-autocomplete-grid-option>
`;
/* end snapshot sbb-autocomplete-grid-option renders DOM */

snapshots["sbb-autocomplete-grid-option renders Shadow DOM"] = 
`<div class="sbb-option__container">
  <div class="sbb-option">
    <span class="sbb-option__icon">
      <slot name="icon">
      </slot>
    </span>
    <span class="sbb-option__label">
      <slot>
      </slot>
      <span>
        Option 1
      </span>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete-grid-option renders Shadow DOM */

snapshots["sbb-autocomplete-grid-option renders disabled DOM"] = 
`<sbb-autocomplete-grid-option
  disabled=""
  id="sbb-autocomplete-grid-option-2"
  value="1"
>
  Option 1
</sbb-autocomplete-grid-option>
`;
/* end snapshot sbb-autocomplete-grid-option renders disabled DOM */

snapshots["sbb-autocomplete-grid-option renders disabled Shadow DOM"] = 
`<div class="sbb-option__container">
  <div class="sbb-option">
    <span class="sbb-option__icon">
      <slot name="icon">
      </slot>
    </span>
    <span class="sbb-option__label">
      <slot>
      </slot>
      <span>
        Option 1
      </span>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete-grid-option renders disabled Shadow DOM */

snapshots["sbb-autocomplete-grid-option A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "gridcell",
      "name": "Option 1",
      "readonly": false,
      "required": false,
      "selected": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid-option A11y tree Chrome */

