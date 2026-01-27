/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-expansion-panel renders DOM"] = 
`<sbb-expansion-panel
  color="white"
  size="l"
>
  <sbb-expansion-panel-header
    aria-controls="sbb-expansion-panel-content-1"
    aria-expanded="false"
    id="sbb-expansion-panel-header-1"
    slot="header"
    tabindex="0"
  >
    Header
  </sbb-expansion-panel-header>
  <sbb-expansion-panel-content
    aria-hidden="true"
    aria-labelledby="sbb-expansion-panel-header-1"
    id="sbb-expansion-panel-content-1"
    slot="content"
  >
    Content
  </sbb-expansion-panel-content>
</sbb-expansion-panel>
`;
/* end snapshot sbb-expansion-panel renders DOM */

snapshots["sbb-expansion-panel renders Shadow DOM"] = 
`<div class="sbb-expansion-panel__header">
  <slot name="header">
  </slot>
</div>
<div class="sbb-expansion-panel__content-wrapper">
  <span class="sbb-expansion-panel__content">
    <slot name="content">
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-expansion-panel renders Shadow DOM */

snapshots["sbb-expansion-panel renders size s DOM"] = 
`<sbb-expansion-panel
  color="white"
  size="s"
>
  <sbb-expansion-panel-header
    aria-controls="sbb-expansion-panel-content-3"
    aria-expanded="false"
    id="sbb-expansion-panel-header-3"
    slot="header"
    tabindex="0"
  >
    Header
  </sbb-expansion-panel-header>
  <sbb-expansion-panel-content
    aria-hidden="true"
    aria-labelledby="sbb-expansion-panel-header-3"
    id="sbb-expansion-panel-content-3"
    slot="content"
  >
    Content
  </sbb-expansion-panel-content>
</sbb-expansion-panel>
`;
/* end snapshot sbb-expansion-panel renders size s DOM */

snapshots["sbb-expansion-panel renders size s Shadow DOM"] = 
`<div class="sbb-expansion-panel__header">
  <slot name="header">
  </slot>
</div>
<div class="sbb-expansion-panel__content-wrapper">
  <span class="sbb-expansion-panel__content">
    <slot name="content">
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-expansion-panel renders size s Shadow DOM */

snapshots["sbb-expansion-panel renders with level set DOM"] = 
`<sbb-expansion-panel
  color="white"
  size="l"
  title-level="4"
>
  <sbb-expansion-panel-header
    aria-controls="sbb-expansion-panel-content-5"
    aria-expanded="false"
    id="sbb-expansion-panel-header-5"
    slot="header"
    tabindex="0"
  >
    Header
  </sbb-expansion-panel-header>
  <sbb-expansion-panel-content
    aria-hidden="true"
    aria-labelledby="sbb-expansion-panel-header-5"
    id="sbb-expansion-panel-content-5"
    slot="content"
  >
    Content
  </sbb-expansion-panel-content>
</sbb-expansion-panel>
`;
/* end snapshot sbb-expansion-panel renders with level set DOM */

snapshots["sbb-expansion-panel renders with level set Shadow DOM"] = 
`<h4 class="sbb-expansion-panel__header">
  <slot name="header">
  </slot>
</h4>
<div class="sbb-expansion-panel__content-wrapper">
  <span class="sbb-expansion-panel__content">
    <slot name="content">
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-expansion-panel renders with level set Shadow DOM */

snapshots["sbb-expansion-panel renders with level set A11y tree Chrome"] = 
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
          "role": "heading",
          "name": "Header",
          "level": 4
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "ignored": true,
              "role": "none",
              "children": [
                {
                  "ignored": true,
                  "role": "none",
                  "children": [
                    {
                      "ignored": true,
                      "role": "none"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-expansion-panel renders with level set A11y tree Chrome */

