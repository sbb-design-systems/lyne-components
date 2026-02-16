/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-block-link-static renders DOM"] = 
`<sbb-block-link-static
  icon-placement="end"
  size="m"
>
  <sbb-icon
    aria-hidden="true"
    name="chevron-small-right-small"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Travelcards & tickets.
</sbb-block-link-static>
`;
/* end snapshot sbb-block-link-static renders DOM */

snapshots["sbb-block-link-static renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-block-link-static">
  <span class="sbb-link__icon">
    <slot name="icon">
    </slot>
  </span>
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-block-link-static renders Shadow DOM */

snapshots["sbb-block-link-static renders A11y tree Chrome"] = 
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
                      "role": "none"
                    }
                  ]
                }
              ]
            },
            {
              "role": "StaticText",
              "name": "Travelcards & tickets."
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-block-link-static renders A11y tree Chrome */

