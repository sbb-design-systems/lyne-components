/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-option autocomplete renders selected DOM"] = 
`<sbb-option
  aria-selected="true"
  data-slot-names="unnamed"
  data-variant="autocomplete"
  id="sbb-option-0"
  role="option"
  selected=""
  value="1"
>
  Option 1
</sbb-option>
`;
/* end snapshot sbb-option autocomplete renders selected DOM */

snapshots["sbb-option autocomplete renders selected Shadow DOM"] = 
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
/* end snapshot sbb-option autocomplete renders selected Shadow DOM */

snapshots["sbb-option autocomplete renders disabled DOM"] = 
`<sbb-option
  aria-disabled="true"
  aria-selected="false"
  data-slot-names="unnamed"
  data-variant="autocomplete"
  disabled=""
  id="sbb-option-2"
  role="option"
  value="1"
>
  Option 1
</sbb-option>
`;
/* end snapshot sbb-option autocomplete renders disabled DOM */

snapshots["sbb-option autocomplete renders disabled Shadow DOM"] = 
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
/* end snapshot sbb-option autocomplete renders disabled Shadow DOM */

snapshots["sbb-option selected Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-option selected Chrome */

snapshots["sbb-option disabled Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-option disabled Chrome */

snapshots["sbb-option selected Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-option selected Safari */

snapshots["sbb-option disabled Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-option disabled Safari */

snapshots["sbb-option selected Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-option selected Firefox */

snapshots["sbb-option disabled Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-option disabled Firefox */

