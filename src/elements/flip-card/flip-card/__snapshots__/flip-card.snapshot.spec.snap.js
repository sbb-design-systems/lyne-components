/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Summary",
      "level": 4
    },
    {
      "role": "button",
      "name": "Click on this card to show more details"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["sbb-flip-card DOM"] = 
`<sbb-flip-card>
  <sbb-flip-card-summary
    image-alignment="after"
    slot="summary"
  >
    <sbb-title level="4">
      Summary
    </sbb-title>
    <sbb-image slot="image">
    </sbb-image>
  </sbb-flip-card-summary>
  <sbb-flip-card-details
    inert=""
    slot="details"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
          Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus
          vitae tortor ullamcorper maximus. In convallis consectetur felis.
    <sbb-link
      class="sbb-action"
      href="https://www.sbb.ch"
      negative=""
      size="s"
    >
      Link
    </sbb-link>
  </sbb-flip-card-details>
</sbb-flip-card>
`;
/* end snapshot sbb-flip-card DOM */

snapshots["sbb-flip-card Shadow DOM"] = 
`<div class="sbb-flip-card">
  <button
    aria-expanded="false"
    class="sbb-flip-card-button"
    type="button"
  >
    <sbb-screen-reader-only>
      Summary, Click on this card for details
    </sbb-screen-reader-only>
  </button>
  <slot name="summary">
  </slot>
  <slot name="details">
  </slot>
  <sbb-secondary-button-static
    class="sbb-flip-card--toggle-button"
    size="s"
  >
    <sbb-icon
      class="sbb-flip-card--toggle-button-icon"
      name="plus-small"
      slot="icon"
    >
    </sbb-icon>
  </sbb-secondary-button-static>
</div>
`;
/* end snapshot sbb-flip-card Shadow DOM */

snapshots["sbb-flip-card A11y tree Chrome"] = 
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
/* end snapshot sbb-flip-card A11y tree Chrome */

