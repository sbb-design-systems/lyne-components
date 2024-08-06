/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-product-static renders DOM"] = 
`<sbb-teaser-product-static
  data-action=""
  data-slot-names="footnote image unnamed"
  dir="ltr"
  image-alignment="after"
>
  <sbb-image
    aspect-ratio="16-9"
    border-radius="default"
    image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/online-kaufen.jpg"
    slot="image"
  >
  </sbb-image>
  Content
  <span slot="footnote">
    Footnote
  </span>
</sbb-teaser-product-static>
`;
/* end snapshot sbb-teaser-product-static renders DOM */

snapshots["sbb-teaser-product-static renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-teaser-product-static">
  <slot name="image">
  </slot>
  <span class="sbb-teaser-product__container">
    <p class="sbb-teaser-product__content">
      <slot>
      </slot>
    </p>
    <p class="sbb-teaser-product__footnote">
      <slot name="footnote">
      </slot>
    </p>
  </span>
</span>
`;
/* end snapshot sbb-teaser-product-static renders Shadow DOM */

snapshots["sbb-teaser-product-static renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Content"
    },
    {
      "role": "text",
      "name": "Footnote"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-product-static renders A11y tree Chrome */

snapshots["sbb-teaser-product-static renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Content "
    },
    {
      "role": "text leaf",
      "name": "Footnote"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-product-static renders A11y tree Firefox */

