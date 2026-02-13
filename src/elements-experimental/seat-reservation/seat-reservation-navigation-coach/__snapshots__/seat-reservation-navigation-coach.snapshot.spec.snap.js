/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-seat-reservation-navigation-coach renders a navigation coach DOM"] = 
`<sbb-seat-reservation-navigation-coach
  coach-id="85"
  travel-class="['FIRST']"
>
</sbb-seat-reservation-navigation-coach>
`;
/* end snapshot sbb-seat-reservation-navigation-coach renders a navigation coach DOM */

snapshots["sbb-seat-reservation-navigation-coach renders a navigation coach Shadow DOM"] = 
`<div class="sbb-sr-navigation__item-coach">
  <button
    class="sbb-sr-navigation__ctrl-button"
    type="button"
  >
    <div class="sbb-sr-navigation__additional-information">
      <div
        aria-hidden="true"
        class="sbb-sr-navigation__item-coach-number"
      >
        85
      </div>
      <div
        aria-hidden="true"
        class="sbb-sr-navigation__item-coach-travelclass"
      >
      </div>
    </div>
    <sbb-screen-reader-only>
      <div>
        Available services: Bike area,Quiet zone.
      </div>
      <div>
        Navigate to coach 85. 0 seats available. 0 available bicycle spaces.
      </div>
    </sbb-screen-reader-only>
  </button>
  <sbb-seat-reservation-navigation-services>
  </sbb-seat-reservation-navigation-services>
</div>
`;
/* end snapshot sbb-seat-reservation-navigation-coach renders a navigation coach Shadow DOM */

snapshots["sbb-seat-reservation-navigation-coach renders a navigation coach A11y tree Chrome"] = 
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
          "role": "button",
          "name": "Available services: Bike area,Quiet zone. Navigate to coach 85. 0 seats available. 0 available bicycle spaces.",
          "invalid": false,
          "focusable": true
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
                  "role": "generic",
                  "name": ""
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
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-seat-reservation-navigation-coach renders a navigation coach A11y tree Chrome */

