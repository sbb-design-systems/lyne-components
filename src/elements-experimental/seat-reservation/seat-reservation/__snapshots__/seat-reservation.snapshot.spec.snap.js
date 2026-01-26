/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-seat-reservation renders DOM"] = 
`<sbb-seat-reservation style="--sbb-seat-reservation-one-px-rem: 0.0625rem; --sbb-seat-reservation-grid-size: 16px;">
</sbb-seat-reservation>
`;
/* end snapshot sbb-seat-reservation renders DOM */

snapshots["sbb-seat-reservation renders Shadow DOM"] = 
`<div class="sbb-sr__component">
  <div class="sbb-sr-navigation-wrapper">
    <nav
      class="sbb-sr-navigation"
      id="sbb-sr-navigation"
    >
      <div class="sbb-sr-navigation__wrapper-button-direction">
        <sbb-secondary-button
          aria-label="Start Graphic Seat Reservation"
          class="sbb-sr__navigation-control-button"
          disabled-interactive=""
          icon-name="chevron-small-left-small"
          id="sbb-sr-navigation__wrapper-button-direction--left"
          role="button"
          size="m"
          tabindex="0"
          type="button"
        >
        </sbb-secondary-button>
      </div>
      <ul
        aria-label="Seat reservation navigation"
        class="sbb-sr-navigation__list-coaches"
        id="sbb-sr__navigation-list-coaches"
      >
      </ul>
      <div class="sbb-sr-navigation__wrapper-button-direction">
        <sbb-secondary-button
          aria-label="Exit Graphic Seat Reservation"
          class="sbb-sr__navigation-control-button"
          disabled-interactive=""
          icon-name="chevron-small-right-small"
          id="sbb-sr-navigation__wrapper-button-direction--right"
          role="button"
          size="m"
          tabindex="0"
          type="button"
        >
        </sbb-secondary-button>
      </div>
    </nav>
  </div>
  <div class="sbb-sr__wrapper-coach-decks">
    <div class="sbb-sr__wrapper-deck-labels">
    </div>
    <div
      class="sbb-sr__wrapper-scrollarea"
      id="sbb-sr__wrapper-scrollarea"
      tabindex="-1"
    >
      <div
        class="sbb-sr__parent"
        id="sbb-sr__parent-area"
      >
        <ul class="sbb-sr__list-decks">
          <li class="sbb-sr__list-item-deck">
            <ul
              class="sbb-sr__list-coaches"
              role="presentation"
            >
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-seat-reservation renders Shadow DOM */

snapshots["sbb-seat-reservation renders A11y tree Chrome"] = 
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
                  "role": "navigation",
                  "name": ""
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
                },
                {
                  "role": "generic",
                  "name": "",
                  "focusable": true
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
/* end snapshot sbb-seat-reservation renders A11y tree Chrome */

