/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-carousel renders DOM"] = 
`<sbb-carousel>
  <sbb-carousel-list style="--sbb-carousel-list-height: 300px; --sbb-carousel-list-width: 400px;">
    <sbb-carousel-item>
      <img
        alt="SBB image"
        height="300"
        src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
        width="400"
      >
    </sbb-carousel-item>
    <sbb-carousel-item>
      <img
        alt="SBB image"
        height="300"
        src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg"
        width="400"
      >
    </sbb-carousel-item>
    <sbb-carousel-item>
      <img
        alt="SBB image"
        height="300"
        src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Kaufmann-frau.jpg"
        width="400"
      >
    </sbb-carousel-item>
  </sbb-carousel-list>
</sbb-carousel>
`;
/* end snapshot sbb-carousel renders DOM */

snapshots["sbb-carousel renders Shadow DOM"] = 
`<div
  aria-roledescription="carousel"
  class="sbb-carousel"
>
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-carousel renders Shadow DOM */

snapshots["sbb-carousel renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "image",
      "name": "SBB image"
    },
    {
      "role": "image",
      "name": "SBB image"
    },
    {
      "role": "image",
      "name": "SBB image"
    }
  ]
}
</p>
`;
/* end snapshot sbb-carousel renders A11y tree Chrome */

snapshots["sbb-carousel renders A11y tree Firefox"] = 
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
        },
        {
          "role": "img",
          "name": "SBB image"
        },
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
/* end snapshot sbb-carousel renders A11y tree Firefox */

