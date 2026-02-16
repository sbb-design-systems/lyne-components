/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-header-link renders DOM"] = 
`<sbb-header-link
  accessibility-label="a11y label"
  expand-from="small"
  href="https://github.com/sbb-design-systems/lyne-components"
  icon-name="pie-small"
  target="_blank"
>
  Action
</sbb-header-link>
`;
/* end snapshot sbb-header-link renders DOM */

snapshots["sbb-header-link renders Shadow DOM"] = 
`<a
  aria-label="a11y label"
  class="sbb-action-base sbb-header-link"
  href="https://github.com/sbb-design-systems/lyne-components"
  rel="external noopener nofollow"
  target="_blank"
>
  <span class="sbb-header-action__wrapper">
    <span class="sbb-header-action__icon">
      <slot name="icon">
        <sbb-icon name="pie-small">
        </sbb-icon>
      </slot>
    </span>
    <span class="sbb-header-action__text">
      <slot>
      </slot>
    </span>
  </span>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-header-link renders Shadow DOM */

snapshots["sbb-header-link renders A11y tree Chrome"] = 
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
/* end snapshot sbb-header-link renders A11y tree Chrome */

