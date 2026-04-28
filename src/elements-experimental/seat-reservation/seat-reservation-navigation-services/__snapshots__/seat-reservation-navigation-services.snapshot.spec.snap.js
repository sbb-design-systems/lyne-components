/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-seat-reservation-navigation-services renders DOM"] = 
`<sbb-seat-reservation-navigation-services>
</sbb-seat-reservation-navigation-services>
`;
/* end snapshot sbb-seat-reservation-navigation-services renders DOM */

snapshots["sbb-seat-reservation-navigation-services renders Shadow DOM"] = 
`<div class="sbb-sr-navigation__signs">
  <span class="sbb-screen-reader-only">
    Available services:Bike area, Quiet zone
  </span>
  <sbb-seat-reservation-graphic
    aria-hidden="true"
    class="auto-width"
    name="BICYCLE"
  >
  </sbb-seat-reservation-graphic>
  <sbb-seat-reservation-graphic
    aria-hidden="true"
    class="auto-width"
    name="SILENCE"
  >
  </sbb-seat-reservation-graphic>
</div>
`;
/* end snapshot sbb-seat-reservation-navigation-services renders Shadow DOM */

snapshots["sbb-seat-reservation-navigation-services renders A11y tree Chrome"] = 
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
              "role": "StaticText",
              "name": "Available services:Bike area, Quiet zone"
            }
          ]
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "ignored": true,
              "role": "none"
            }
          ]
        },
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
</p>
`;
/* end snapshot sbb-seat-reservation-navigation-services renders A11y tree Chrome */

