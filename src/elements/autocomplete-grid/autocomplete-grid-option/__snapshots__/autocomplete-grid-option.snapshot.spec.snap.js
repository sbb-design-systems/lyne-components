/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-grid-option renders DOM"] = 
`<sbb-autocomplete-grid-option
  aria-selected="false"
  data-slot-names="unnamed"
  id="sbb-autocomplete-grid-option-0"
  role="gridcell"
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
      Option 1
    </span>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete-grid-option renders Shadow DOM */

snapshots["sbb-autocomplete-grid-option renders disabled DOM"] = 
`<sbb-autocomplete-grid-option
  aria-disabled="true"
  aria-selected="false"
  data-slot-names="unnamed"
  disabled=""
  id="sbb-autocomplete-grid-option-2"
  role="gridcell"
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
      Option 1
    </span>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete-grid-option renders disabled Shadow DOM */

snapshots["sbb-autocomplete-grid-option A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Option 1"
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid-option A11y tree Chrome */

snapshots["sbb-autocomplete-grid-option A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Option 1"
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid-option A11y tree Safari */

snapshots["sbb-autocomplete-grid-option A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Option 1"
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid-option A11y tree Firefox */

