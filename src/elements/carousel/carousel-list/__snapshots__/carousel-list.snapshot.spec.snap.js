/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-carousel-list renders DOM"] = 
`<sbb-carousel-list style="--sbb-carousel-list-height: 300px; --sbb-carousel-list-width: 400px;">
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
`;
/* end snapshot sbb-carousel-list renders DOM */

snapshots["sbb-carousel-list renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-carousel-list renders Shadow DOM */

snapshots["sbb-carousel-list renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": "",
      "live": "polite",
      "atomic": true,
      "relevant": "additions text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-carousel-list renders A11y tree Chrome */

