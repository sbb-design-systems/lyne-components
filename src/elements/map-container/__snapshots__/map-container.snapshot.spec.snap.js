/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-map-container renders DOM"] = 
`<sbb-map-container>
</sbb-map-container>
`;
/* end snapshot sbb-map-container renders DOM */

snapshots["sbb-map-container renders Shadow DOM"] = 
`<div class="sbb-map-container">
  <div class="sbb-map-container__map">
    <slot name="map">
    </slot>
  </div>
  <div class="sbb-map-container__sidebar">
    <span id="intersector">
    </span>
    <slot>
    </slot>
    <sbb-accent-button
      class="sbb-map-container__sidebar-button"
      icon-name="location-pin-map-small"
      inert=""
      size="l"
      tabindex="0"
      type="button"
    >
      Show map
    </sbb-accent-button>
  </div>
</div>
`;
/* end snapshot sbb-map-container renders Shadow DOM */

snapshots["sbb-map-container renders without scroll-up button DOM"] = 
`<sbb-map-container hide-scroll-up-button="">
</sbb-map-container>
`;
/* end snapshot sbb-map-container renders without scroll-up button DOM */

snapshots["sbb-map-container renders without scroll-up button Shadow DOM"] = 
`<div class="sbb-map-container">
  <div class="sbb-map-container__map">
    <slot name="map">
    </slot>
  </div>
  <div class="sbb-map-container__sidebar">
    <span id="intersector">
    </span>
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-map-container renders without scroll-up button Shadow DOM */

snapshots["sbb-map-container renders A11y tree Chrome"] = 
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
              "role": "generic",
              "name": ""
            },
            {
              "role": "generic",
              "name": ""
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-map-container renders A11y tree Chrome */

