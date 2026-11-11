/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-autocomplete-grid DOM"] = 
`<sbb-autocomplete-grid
  popover="manual"
  tabindex="-1"
>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option>
      Option 1
    </sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button icon-name="dog-small">
      </sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
  <sbb-autocomplete-grid-row>
    <sbb-autocomplete-grid-option>
      Option 2
    </sbb-autocomplete-grid-option>
    <sbb-autocomplete-grid-cell>
      <sbb-autocomplete-grid-button icon-name="dog-small">
      </sbb-autocomplete-grid-button>
    </sbb-autocomplete-grid-cell>
  </sbb-autocomplete-grid-row>
</sbb-autocomplete-grid>
`;
/* end snapshot sbb-autocomplete-grid DOM */

snapshots["sbb-autocomplete-grid Shadow DOM"] = 
`<div class="sbb-option-panel__overlay-container">
  <div class="sbb-option-panel__overlay sbb-scrollbar">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-autocomplete-grid Shadow DOM */

snapshots["sbb-autocomplete-grid A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "role": "generic",
          "name": ""
        },
        {
          "role": "generic",
          "name": ""
        },
        {
          "ignored": true,
          "role": "none"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-autocomplete-grid A11y tree Chrome */

