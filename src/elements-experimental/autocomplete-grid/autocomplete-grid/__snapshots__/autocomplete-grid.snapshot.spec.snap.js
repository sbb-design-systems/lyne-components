/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-grid Chrome-Firefox DOM"] = 
`<sbb-autocomplete-grid
  popover="manual"
  size="m"
>
  <sbb-autocomplete-grid-row id="sbb-autocomplete-grid-row-1">
    <sbb-autocomplete-grid-option id="sbb-autocomplete-grid-option-0">
      Option 1
    </sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button
        icon-name="dog-small"
        id="sbb-autocomplete-grid-button-1"
      >
      </sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row id="sbb-autocomplete-grid-row-2">
    <sbb-autocomplete-grid-option id="sbb-autocomplete-grid-option-1">
      Option 2
    </sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button
        icon-name="dog-small"
        id="sbb-autocomplete-grid-button-2"
      >
      </sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
</sbb-autocomplete-grid>
`;
/* end snapshot sbb-autocomplete-grid Chrome-Firefox DOM */

snapshots["sbb-autocomplete-grid Chrome-Firefox Shadow DOM"] = 
`<div class="sbb-autocomplete__gap-fix">
</div>
<div class="sbb-autocomplete__container">
  <div class="sbb-autocomplete__gap-fix">
    <div class="sbb-gap-fix-wrapper">
      <div
        class="sbb-gap-fix-corner"
        id="left"
      >
      </div>
    </div>
    <div class="sbb-gap-fix-wrapper">
      <div
        class="sbb-gap-fix-corner"
        id="right"
      >
      </div>
    </div>
  </div>
  <div class="sbb-autocomplete__panel">
    <div class="sbb-autocomplete__wrapper">
      <div
        class="sbb-autocomplete__options"
        id="sbb-autocomplete-grid-2"
        role="grid"
      >
        <slot>
        </slot>
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete-grid Chrome-Firefox Shadow DOM */

snapshots["sbb-autocomplete-grid Safari DOM"] = 
`<sbb-autocomplete-grid
  id="sbb-autocomplete-grid-1"
  popover="manual"
  size="m"
>
  <sbb-autocomplete-grid-row id="sbb-autocomplete-grid-row-1">
    <sbb-autocomplete-grid-option id="sbb-autocomplete-grid-option-0">
      Option 1
    </sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button
        icon-name="dog-small"
        id="sbb-autocomplete-grid-button-1"
      >
      </sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row id="sbb-autocomplete-grid-row-2">
    <sbb-autocomplete-grid-option id="sbb-autocomplete-grid-option-1">
      Option 2
    </sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button
        icon-name="dog-small"
        id="sbb-autocomplete-grid-button-2"
      >
      </sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
</sbb-autocomplete-grid>
`;
/* end snapshot sbb-autocomplete-grid Safari DOM */

snapshots["sbb-autocomplete-grid Safari Shadow DOM"] = 
`<div class="sbb-autocomplete__gap-fix">
</div>
<div class="sbb-autocomplete__container">
  <div class="sbb-autocomplete__gap-fix">
    <div class="sbb-gap-fix-wrapper">
      <div
        class="sbb-gap-fix-corner"
        id="left"
      >
      </div>
    </div>
    <div class="sbb-gap-fix-wrapper">
      <div
        class="sbb-gap-fix-corner"
        id="right"
      >
      </div>
    </div>
  </div>
  <div class="sbb-autocomplete__panel">
    <div class="sbb-autocomplete__wrapper">
      <div class="sbb-autocomplete__options">
        <slot>
        </slot>
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete-grid Safari Shadow DOM */

snapshots["sbb-autocomplete-grid Chrome-Firefox A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "statictext",
      "name": "​"
    },
    {
      "role": "combobox",
      "name": "",
      "autocomplete": "list",
      "haspopup": "grid"
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid Chrome-Firefox A11y tree Firefox */

snapshots["sbb-autocomplete-grid Chrome-Firefox A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "​"
    },
    {
      "role": "combobox",
      "name": "",
      "autocomplete": "list",
      "haspopup": "grid"
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid Chrome-Firefox A11y tree Chrome */

