/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-seat-reservation-navigation-services renders DOM"] = 
`<sbb-seat-reservation-navigation-services>
</sbb-seat-reservation-navigation-services>
`;
/* end snapshot sbb-seat-reservation-navigation-services renders DOM */

snapshots["sbb-seat-reservation-navigation-services renders Shadow DOM"] = 
`<div class="sbb-sr-navigation__signs">
  <sbb-screen-reader-only>
    Available services:Bike area, Quiet zone
  </sbb-screen-reader-only>
  <sbb-seat-reservation-graphic
    aria-hidden="true"
    height="20"
    name="BICYCLE"
    style="--sbb-seat-reservation-graphic-width: 20; --sbb-seat-reservation-graphic-height: 20; --sbb-seat-reservation-graphic-rotation: 0; --sbb-seat-reservation-graphic-inverse-rotation: 0;"
    title="Bike area"
    width="20"
  >
  </sbb-seat-reservation-graphic>
  <sbb-seat-reservation-graphic
    aria-hidden="true"
    height="20"
    name="SILENCE"
    style="--sbb-seat-reservation-graphic-width: 20; --sbb-seat-reservation-graphic-height: 20; --sbb-seat-reservation-graphic-rotation: 0; --sbb-seat-reservation-graphic-inverse-rotation: 0;"
    title="Quiet zone"
    width="20"
  >
  </sbb-seat-reservation-graphic>
</div>
`;
/* end snapshot sbb-seat-reservation-navigation-services renders Shadow DOM */

snapshots["sbb-seat-reservation-navigation-services renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Available services:Bike area, Quiet zone"
    }
  ]
}
</p>
`;
/* end snapshot sbb-seat-reservation-navigation-services renders A11y tree Chrome */

snapshots["sbb-seat-reservation-navigation-services renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Available services:Bike area, Quiet zone"
    }
  ]
}
</p>
`;
/* end snapshot sbb-seat-reservation-navigation-services renders A11y tree Firefox */

