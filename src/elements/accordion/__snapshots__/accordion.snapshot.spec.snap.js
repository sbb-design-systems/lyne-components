/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-accordion renders DOM"] = 
`<sbb-accordion size="l">
  <sbb-expansion-panel
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
      Header 1
    </sbb-expansion-panel-header>
    <sbb-expansion-panel-content
      aria-hidden="true"
      aria-labelledby="sbb-expansion-panel-header-1"
      id="sbb-expansion-panel-content-1"
      slot="content"
    >
      Content 1
    </sbb-expansion-panel-content>
  </sbb-expansion-panel>
  <sbb-expansion-panel
    color="white"
    size="l"
  >
    <sbb-expansion-panel-header
      aria-controls="sbb-expansion-panel-content-2"
      aria-expanded="false"
      id="sbb-expansion-panel-header-2"
      slot="header"
      tabindex="0"
    >
      Header 2
    </sbb-expansion-panel-header>
    <sbb-expansion-panel-content
      aria-hidden="true"
      aria-labelledby="sbb-expansion-panel-header-2"
      id="sbb-expansion-panel-content-2"
      slot="content"
    >
      Content 2
    </sbb-expansion-panel-content>
  </sbb-expansion-panel>
</sbb-accordion>
`;
/* end snapshot sbb-accordion renders DOM */

snapshots["sbb-accordion renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-accordion renders Shadow DOM */

snapshots["sbb-accordion renders A11y tree Chrome"] = 
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
                      "role": "none",
                      "children": [
                        {
                          "role": "button",
                          "name": "Header 1",
                          "invalid": false,
                          "focusable": true,
                          "expanded": false
                        }
                      ]
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
                              "role": "none"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
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
                          "role": "button",
                          "name": "Header 2",
                          "invalid": false,
                          "focusable": true,
                          "expanded": false
                        }
                      ]
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
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-accordion renders A11y tree Chrome */

