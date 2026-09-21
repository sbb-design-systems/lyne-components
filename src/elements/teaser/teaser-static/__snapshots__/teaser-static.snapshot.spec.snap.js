/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-static renders below with projected content DOM"] = 
`<sbb-teaser-static alignment="below">
  <figure
    class="sbb-figure"
    slot="image"
  >
    <img alt="400x300">
  </figure>
  <sbb-chip-label
    color="charcoal"
    size="xxs"
    slot="chip"
  >
    Chip
  </sbb-chip-label>
  <sbb-title
    level="2"
    slot="title"
    visual-level="5"
  >
    Title
  </sbb-title>
  A brief description.
  <sbb-secondary-button-link
    href="#"
    slot="action"
  >
    Read more
  </sbb-secondary-button-link>
</sbb-teaser-static>
`;
/* end snapshot sbb-teaser-static renders below with projected content DOM */

snapshots["sbb-teaser-static renders below with projected content Shadow DOM"] = 
`<div class="sbb-teaser__wrapper">
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__content">
      <span class="sbb-teaser__text">
        <slot name="chip">
        </slot>
        <slot name="title">
        </slot>
        <p class="sbb-teaser__description">
          <slot>
          </slot>
        </p>
      </span>
      <slot name="action">
      </slot>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-teaser-static renders below with projected content Shadow DOM */

snapshots["sbb-teaser-static renders below with projected content A11y tree Chrome"] = 
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
/* end snapshot sbb-teaser-static renders below with projected content A11y tree Chrome */

