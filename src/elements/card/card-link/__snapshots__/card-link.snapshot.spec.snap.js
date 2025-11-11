/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-card-link renders DOM"] = 
`<sbb-card
  color="white"
  data-action-role="link"
  data-has-action=""
  size="m"
>
  <sbb-card-link
    data-action=""
    data-link=""
    href="https://github.com/sbb-design-systems/lyne-components"
    slot="action"
    target="_blank"
  >
    Follow me
  </sbb-card-link>
  Content text
</sbb-card>
`;
/* end snapshot sbb-card-link renders DOM */

snapshots["sbb-card-link renders Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-card-link"
  href="https://github.com/sbb-design-systems/lyne-components"
  rel="external noopener nofollow"
  target="_blank"
>
  <span class="sbb-screen-reader-only">
    <slot>
    </slot>
  </span>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-card-link renders Shadow DOM */

snapshots["sbb-card-link renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Follow me . Link target opens in a new window."
    },
    {
      "role": "text",
      "name": "Content text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-card-link renders A11y tree Chrome */

snapshots["sbb-card-link renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Follow me . Link target opens in a new window.",
      "value": "https://github.com/sbb-design-systems/lyne-components"
    },
    {
      "role": "text leaf",
      "name": "Content text "
    }
  ]
}
</p>
`;
/* end snapshot sbb-card-link renders A11y tree Firefox */

