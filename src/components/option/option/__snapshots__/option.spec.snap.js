/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-option autocomplete renders selected and active"] = 
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
/* end snapshot sbb-option autocomplete renders selected and active */

snapshots["sbb-option autocomplete renders disabled"] = 
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
/* end snapshot sbb-option autocomplete renders disabled */

snapshots["sbb-option autocomplete A11y tree Chrome"] = 
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
/* end snapshot sbb-option autocomplete A11y tree Chrome */

snapshots["sbb-option autocomplete A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "option",
      "name": "Option 1",
      "selected": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-option autocomplete A11y tree Firefox */

