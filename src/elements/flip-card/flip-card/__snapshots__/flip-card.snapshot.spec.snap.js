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
    <sbb-title
      aria-level="4"
      level="4"
      role="heading"
    >
      Summary
    </sbb-title>
    <sbb-image
      aspect-ratio="free"
      border-radius="none"
      image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
      slot="image"
    >
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
      data-action=""
      data-card-focusable=""
      data-link=""
      data-sbb-link=""
      data-slot-names="unnamed"
      dir="ltr"
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
`<div class="sbb-flip-card--wrapper">
  <slot name="summary">
  </slot>
  <button
    aria-expanded="false"
    aria-label="Click on this card for details"
  >
  </button>
  <slot name="details">
  </slot>
  <sbb-secondary-button
    class="sbb-flip-card--toggle-button"
    data-action=""
    data-button=""
    data-sbb-button=""
    dir="ltr"
    icon-name="plus-small"
    role="button"
    size="l"
    tabindex="0"
  >
  </sbb-secondary-button>
</div>
`;
/* end snapshot sbb-flip-card Shadow DOM */

snapshots["sbb-flip-card A11y tree Chrome"] = 
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
      "name": "Click on this card for details"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-flip-card A11y tree Chrome */

snapshots["sbb-flip-card A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Summary",
      "level": 4
    },
    {
      "role": "button",
      "name": "Click on this card for details"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-flip-card A11y tree Firefox */

