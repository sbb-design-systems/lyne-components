/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-product renders DOM"] = 
`<sbb-teaser-product
  data-action=""
  data-link=""
  data-slot-names="footnote image unnamed"
  href="https://www.sbb.ch"
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
</sbb-teaser-product>
`;
/* end snapshot sbb-teaser-product renders DOM */

snapshots["sbb-teaser-product renders Shadow DOM"] = 
`<div class="sbb-teaser-product__wrapper">
  <a
    class="sbb-action-base sbb-teaser-product"
    href="https://www.sbb.ch"
  >
    <sbb-screen-reader-only>
    </sbb-screen-reader-only>
  </a>
  <div class="sbb-teaser-product__content-wrapper">
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
  </div>
</div>
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
      "name": "",
      "value": "https://www.sbb.ch/"
    },
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
/* end snapshot sbb-teaser-product renders A11y tree Firefox */

snapshots["sbb-teaser-product renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": ""
    },
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
/* end snapshot sbb-teaser-product renders A11y tree Chrome */

