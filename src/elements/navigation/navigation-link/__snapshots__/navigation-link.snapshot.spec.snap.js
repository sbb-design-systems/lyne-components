/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-navigation-link renders DOM"] = 
`<sbb-navigation-link
  accessibility-label="a11y label"
  href="https://www.sbb.ch"
  size="l"
  target="_blank"
>
  This is a link
</sbb-navigation-link>
`;
/* end snapshot sbb-navigation-link renders DOM */

snapshots["sbb-navigation-link renders Shadow DOM"] = 
`<a
  aria-label="a11y label"
  class="sbb-action-base sbb-navigation-link"
  href="https://www.sbb.ch"
  rel="external noopener nofollow"
  target="_blank"
>
  <sbb-icon name="dash-small">
  </sbb-icon>
  <slot>
  </slot>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-navigation-link renders Shadow DOM */

snapshots["sbb-navigation-link renders A11y tree Chrome"] = 
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
/* end snapshot sbb-navigation-link renders A11y tree Chrome */

