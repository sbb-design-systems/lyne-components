/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-seat-reservation renders DOM"] = 
`<sbb-seat-reservation style="--sbb-seat-reservation-grid-size: 16px;">
</sbb-seat-reservation>
`;
/* end snapshot sbb-seat-reservation renders DOM */

snapshots["sbb-seat-reservation renders Shadow DOM"] = 
`<div>
  <sbb-screen-reader-only>
    <input
      aria-label="en:Beginn der Grafische Sitzplatzreservierung"
      id="first-tab-element"
      readonly=""
      role="contentinfo"
      type="text"
    >
  </sbb-screen-reader-only>
  <div>
    <nav>
      <ul
        aria-label="Seat reservation Navigation"
        class="sbb-sr-navigation__list-coaches"
      >
      </ul>
    </nav>
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
  <sbb-screen-reader-only>
    <input
      aria-label="en:Verlassen der Grafische Sitzplatzreservierung"
      id="last-tab-element"
      readonly=""
      role="contentinfo"
      type="text"
    >
  </sbb-screen-reader-only>
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
      "name": "en:Beginn der Grafische Sitzplatzreservierung"
    },
    {
      "role": "list",
      "name": "Seat reservation Navigation"
    },
    {
      "role": "generic",
      "name": ""
    },
    {
      "role": "contentinfo",
      "name": "en:Verlassen der Grafische Sitzplatzreservierung"
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
      "name": "en:Beginn der Grafische Sitzplatzreservierung"
    },
    {
      "role": "list",
      "name": "Seat reservation Navigation"
    },
    {
      "role": "section",
      "name": ""
    },
    {
      "role": "landmark",
      "name": "en:Verlassen der Grafische Sitzplatzreservierung"
    }
  ]
}
</p>
`;
/* end snapshot sbb-seat-reservation renders A11y tree Firefox */

