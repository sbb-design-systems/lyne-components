/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-product renders DOM"] = 
`<sbb-teaser-product
  data-action=""
  data-link=""
  data-slot-names="footnote image unnamed"
  dir="ltr"
  href="https://www.sbb.ch"
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
</sbb-teaser-product>
`;
/* end snapshot sbb-teaser-product renders DOM */

snapshots["sbb-teaser-product renders Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-teaser-product"
  href="https://www.sbb.ch"
>
  <slot name="image">
  </slot>
  <span class="sbb-teaser-product__container">
    <span class="sbb-teaser-product__content">
      <slot>
      </slot>
    </span>
    <span class="sbb-teaser-product__footnote">
      <slot name="footnote">
      </slot>
    </span>
  </span>
</a>
`;
/* end snapshot sbb-teaser-product renders Shadow DOM */

snapshots["sbb-teaser-product renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Content Footnote",
      "value": "https://www.sbb.ch/"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-product renders A11y tree Firefox */

snapshots["sbb-teaser-product renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Content Footnote"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-product renders A11y tree Chrome */

