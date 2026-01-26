/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-block-link renders DOM"] = 
`<sbb-block-link
  accessibility-label="Travelcards &amp; tickets"
  download=""
  href="https://github.com/sbb-design-systems/lyne-components"
  icon-placement="start"
  size="m"
>
  Travelcards & tickets.
</sbb-block-link>
`;
/* end snapshot sbb-block-link renders DOM */

snapshots["sbb-block-link renders Shadow DOM"] = 
`<a
  aria-label="Travelcards &amp; tickets"
  class="sbb-action-base sbb-block-link"
  download=""
  href="https://github.com/sbb-design-systems/lyne-components"
>
  <span class="sbb-link__icon">
    <slot name="icon">
    </slot>
  </span>
  <slot>
  </slot>
</a>
`;
/* end snapshot sbb-block-link renders Shadow DOM */

snapshots["sbb-block-link renders A11y tree Chrome"] = 
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
/* end snapshot sbb-block-link renders A11y tree Chrome */

