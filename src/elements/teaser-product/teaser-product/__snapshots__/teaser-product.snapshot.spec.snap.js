/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-product renders DOM"] = 
`<sbb-teaser-product
  href="https://www.sbb.ch"
  image-alignment="after"
>
  <figure
    class="sbb-figure"
    slot="image"
  >
    <sbb-image>
    </sbb-image>
  </figure>
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
  <div class="sbb-teaser-product__root">
    <div class="sbb-teaser-product__image-container">
      <slot name="image">
      </slot>
    </div>
    <div class="sbb-teaser-product__container">
      <span class="sbb-teaser-product__content">
        <slot>
        </slot>
      </span>
      <div class="sbb-teaser-product__footnote">
        <slot name="footnote">
        </slot>
      </div>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-teaser-product renders Shadow DOM */

snapshots["sbb-teaser-product renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-product renders A11y tree Chrome */

