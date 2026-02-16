/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-product-static renders DOM"] = 
`<sbb-teaser-product-static image-alignment="after">
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
</sbb-teaser-product-static>
`;
/* end snapshot sbb-teaser-product-static renders DOM */

snapshots["sbb-teaser-product-static renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-teaser-product-static">
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
</span>
`;
/* end snapshot sbb-teaser-product-static renders Shadow DOM */

snapshots["sbb-teaser-product-static renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "ignored": true,
              "role": "none",
              "children": [
                {
                  "ignored": true,
                  "role": "none",
                  "children": [
                    {
                      "role": "figure",
                      "name": ""
                    }
                  ]
                },
                {
                  "ignored": true,
                  "role": "none",
                  "children": [
                    {
                      "role": "paragraph",
                      "name": ""
                    },
                    {
                      "ignored": true,
                      "role": "none",
                      "children": [
                        {
                          "role": "paragraph",
                          "name": ""
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-product-static renders A11y tree Chrome */

