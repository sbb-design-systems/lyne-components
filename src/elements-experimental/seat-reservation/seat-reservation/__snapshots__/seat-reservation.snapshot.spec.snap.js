/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-seat-reservation renders DOM"] = 
`<sbb-seat-reservation style="--sbb-seat-reservation-grid-size: 16px; --sbb-seat-reservation-one-px-rem: 0.0625rem;">
</sbb-seat-reservation>
`;
/* end snapshot sbb-seat-reservation renders DOM */

snapshots["sbb-seat-reservation renders Shadow DOM"] = 
`<div class="sbb-sr__container">
  <div class="sbb-sr sbb-sr__grid">
    <div class="sbb-sr-navigation-first-grid">
      <sbb-secondary-button
        aria-label="Start Graphic Seat Reservation"
        class="sbb-sr__navigation-control-button"
        data-action=""
        data-button=""
        data-sbb-button=""
        disabled-interactive=""
        icon-name="arrow-left-small"
        id="first-tab-element"
        role="contentinfo"
        size="s"
        tabindex="0"
        type="button"
      >
      </sbb-secondary-button>
    </div>
    <div class="sbb-sr__component">
      <div class="sbb-sr-grid-inner">
        <div class="nav-grid">
          <div class="sbb-sr-navigation-wrapper">
            <nav
              class="sbb-sr-navigation"
              id="sbb-sr-navigation"
            >
              <ul
                aria-label="Seat reservation navigation"
                class="sbb-sr-navigation__list-coaches"
                id="sbb-sr__navigation-list-coaches"
              >
              </ul>
            </nav>
          </div>
        </div>
        <div class="coaches-grid">
          <div class="sbb-sr__wrapper">
            <div
              class="sbb-sr__parent"
              id="sbb-sr__parent-area"
              tabindex="-1"
            >
              <ul
                class="sbb-sr__list-coaches"
                role="presentation"
              >
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sbb-sr-navigation-last-grid">
      <sbb-secondary-button
        aria-label="Exit Graphic Seat Reservation"
        class="sbb-sr__navigation-control-button"
        data-action=""
        data-button=""
        data-sbb-button=""
        disabled-interactive=""
        icon-name="arrow-right-small"
        id="last-tab-element"
        role="contentinfo"
        size="s"
        tabindex="0"
        type="button"
      >
      </sbb-secondary-button>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-seat-reservation renders Shadow DOM */

snapshots["sbb-seat-reservation renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "contentinfo",
      "name": "Start Graphic Seat Reservation",
      "disabled": true
    },
    {
      "role": "list",
      "name": "Seat reservation navigation"
    },
    {
      "role": "generic",
      "name": ""
    },
    {
      "role": "contentinfo",
      "name": "Exit Graphic Seat Reservation",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-seat-reservation renders A11y tree Chrome */

snapshots["sbb-seat-reservation renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "landmark",
      "name": "Start Graphic Seat Reservation",
      "disabled": true
    },
    {
      "role": "landmark",
      "name": "",
      "children": [
        {
          "role": "list",
          "name": "Seat reservation navigation"
        }
      ]
    },
    {
      "role": "section",
      "name": ""
    },
    {
      "role": "landmark",
      "name": "Exit Graphic Seat Reservation",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-seat-reservation renders A11y tree Firefox */

