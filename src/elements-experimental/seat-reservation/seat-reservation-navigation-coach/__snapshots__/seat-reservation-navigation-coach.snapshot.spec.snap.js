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
    aria-describedby="nav-coach-service-descriptions-0"
    class="sbb-sr-navigation__ctrl-button"
    title="Navigate to train compartment 85"
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
  </button>
  <sbb-screen-reader-only id="nav-coach-service-descriptions-0">
    en:Verfügbare Services: Velozone,Silence area
  </sbb-screen-reader-only>
  <sbb-seat-reservation-navigation-services>
  </sbb-seat-reservation-navigation-services>
</div>
`;
/* end snapshot sbb-seat-reservation-navigation-coach renders a navigation coach Shadow DOM */

snapshots["sbb-seat-reservation-navigation-coach renders a navigation coach A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Navigate to train compartment 85",
      "description": "en:Verfügbare Services: Velozone,Silence area"
    },
    {
      "role": "text",
      "name": "en:Verfügbare Services: Velozone,Silence area"
    },
    {
      "role": "text",
      "name": "en:Verfügbare Services:Velozone, Silence area"
    }
  ]
}
</p>
`;
/* end snapshot sbb-seat-reservation-navigation-coach renders a navigation coach A11y tree Chrome */

snapshots["sbb-seat-reservation-navigation-coach renders a navigation coach A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Navigate to train compartment 85",
      "description": "en:Verfügbare Services: Velozone,Silence area"
    },
    {
      "role": "text leaf",
      "name": "en:Verfügbare Services: Velozone,Silence area"
    },
    {
      "role": "text leaf",
      "name": "en:Verfügbare Services:Velozone, Silence area"
    }
  ]
}
</p>
`;
/* end snapshot sbb-seat-reservation-navigation-coach renders a navigation coach A11y tree Firefox */

