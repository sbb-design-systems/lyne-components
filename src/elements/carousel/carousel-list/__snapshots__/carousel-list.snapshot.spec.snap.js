/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-carousel-list renders DOM"] = 
`<sbb-carousel-list
  aria-atomic="true"
  aria-live="polite"
  style="--sbb-carousel-list-height: 300px; --sbb-carousel-list-width: 400px;"
>
  <sbb-carousel-item
    aria-label="1 of 3"
    aria-roledescription="slide"
    role="group"
  >
    <img
      alt="SBB image"
      height="300"
      src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
      width="400"
    >
  </sbb-carousel-item>
  <sbb-carousel-item
    aria-label="2 of 3"
    aria-roledescription="slide"
    role="group"
  >
    <img
      alt="SBB image"
      height="300"
      src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg"
      width="400"
    >
  </sbb-carousel-item>
  <sbb-carousel-item
    aria-label="3 of 3"
    aria-roledescription="slide"
    role="group"
  >
    <img
      alt="SBB image"
      height="300"
      src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Kaufmann-frau.jpg"
      width="400"
    >
  </sbb-carousel-item>
</sbb-carousel-list>
`;
/* end snapshot sbb-carousel-list renders DOM */

snapshots["sbb-carousel-list renders Shadow DOM"] = 
`<div class="sbb-carousel-list">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-carousel-list renders Shadow DOM */

snapshots["sbb-carousel-list renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "image",
      "name": "SBB image"
    }
  ]
}
</p>
`;
/* end snapshot sbb-carousel-list renders A11y tree Chrome */

snapshots["sbb-carousel-list renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "section",
      "name": "",
      "children": [
        {
          "role": "img",
          "name": "SBB image"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-carousel-list renders A11y tree Firefox */

