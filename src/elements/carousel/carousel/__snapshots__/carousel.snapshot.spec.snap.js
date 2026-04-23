/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-carousel renders DOM"] = 
`<sbb-carousel>
  <sbb-carousel-list style="--sbb-carousel-list-height: 300px; --sbb-carousel-list-width: 400px;">
    <sbb-carousel-item aria-label="1 of 3">
      <img
        alt="SBB image"
        height="300"
        width="400"
      >
    </sbb-carousel-item>
    <sbb-carousel-item
      aria-hidden="true"
      aria-label="2 of 3"
    >
      <img
        alt="SBB image"
        height="300"
        width="400"
      >
    </sbb-carousel-item>
    <sbb-carousel-item
      aria-hidden="true"
      aria-label="3 of 3"
    >
      <img
        alt="SBB image"
        height="300"
        width="400"
      >
    </sbb-carousel-item>
  </sbb-carousel-list>
</sbb-carousel>
`;
/* end snapshot sbb-carousel renders DOM */

snapshots["sbb-carousel renders Shadow DOM"] = 
`<div class="sbb-carousel">
  <sbb-screen-reader-only id="sbb-carousel-arrows-navigation-hint">
    Carousel - Use the arrow keys in interaction mode to navigate through the slides
  </sbb-screen-reader-only>
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-carousel renders Shadow DOM */

snapshots["sbb-carousel renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "region",
      "name": "carousel",
      "description": "Carousel - Use the arrow keys in interaction mode to navigate through the slides"
    }
  ]
}
</p>
`;
/* end snapshot sbb-carousel renders A11y tree Chrome */

