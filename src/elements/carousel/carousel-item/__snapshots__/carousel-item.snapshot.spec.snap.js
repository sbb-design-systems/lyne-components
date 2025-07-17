/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-carousel-item renders DOM"] = 
`<sbb-carousel-item>
  <img
    alt="SBB image"
    src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
  >
</sbb-carousel-item>
`;
/* end snapshot sbb-carousel-item renders DOM */

snapshots["sbb-carousel-item renders Shadow DOM"] = 
`<div
  aria-roledescription="slide"
  class="sbb-carousel-item"
  role="group"
>
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-carousel-item renders Shadow DOM */

snapshots["sbb-carousel-item renders A11y tree Chrome"] = 
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
/* end snapshot sbb-carousel-item renders A11y tree Chrome */

