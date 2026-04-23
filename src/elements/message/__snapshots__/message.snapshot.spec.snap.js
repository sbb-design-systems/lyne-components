/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-message renders DOM"] = 
`<sbb-message>
  <sbb-image slot="image">
  </sbb-image>
  <sbb-title
    level="3"
    slot="title"
    visual-level="5"
  >
    Title.
  </sbb-title>
  <p slot="subtitle">
    Subtitle.
  </p>
  <p slot="legend">
    Error code: 0001
  </p>
  <sbb-button
    icon-name="arrows-circle-small"
    size="m"
    slot="action"
    tabindex="0"
  >
  </sbb-button>
</sbb-message>
`;
/* end snapshot sbb-message renders DOM */

snapshots["sbb-message renders Shadow DOM"] = 
`<slot name="image">
</slot>
<slot name="title">
</slot>
<slot name="subtitle">
</slot>
<slot name="legend">
</slot>
<slot name="action">
</slot>
`;
/* end snapshot sbb-message renders Shadow DOM */

snapshots["sbb-message renders without optional slots DOM"] = 
`<sbb-message>
  <sbb-title
    level="3"
    slot="title"
    visual-level="5"
  >
    Title.
  </sbb-title>
  <p slot="subtitle">
    Subtitle.
  </p>
</sbb-message>
`;
/* end snapshot sbb-message renders without optional slots DOM */

snapshots["sbb-message renders without optional slots Shadow DOM"] = 
`<slot name="image">
</slot>
<slot name="title">
</slot>
<slot name="subtitle">
</slot>
<slot name="legend">
</slot>
<slot name="action">
</slot>
`;
/* end snapshot sbb-message renders without optional slots Shadow DOM */

snapshots["sbb-message renders A11y tree Chrome"] = 
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
                  "role": "generic",
                  "name": ""
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
              "role": "heading",
              "name": "Title.",
              "level": 3
            }
          ]
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "paragraph",
              "name": ""
            }
          ]
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "paragraph",
              "name": ""
            }
          ]
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "button",
              "name": "",
              "invalid": false,
              "focusable": true
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-message renders A11y tree Chrome */

