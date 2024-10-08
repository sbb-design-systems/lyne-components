/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-product-static renders DOM"] = 
`<sbb-teaser-product-static
  data-action=""
  data-slot-names="footnote image unnamed"
  image-alignment="after"
>
  <sbb-image
    aspect-ratio="16-9"
    border-radius="default"
    slot="image"
  >
  </sbb-image>
  <p class="sbb-teaser-product--spacing">
    Content
  </p>
  <p
    class="sbb-teaser-product--spacing"
    slot="footnote"
  >
    Footnote
  </p>
</sbb-teaser-product-static>
`;
/* end snapshot sbb-teaser-product-static renders DOM */

snapshots["sbb-teaser-product-static renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-teaser-product-static">
  <span class="sbb-teaser-product__image-container">
    <slot name="image">
    </slot>
  </span>
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
      "name": "Content"
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

