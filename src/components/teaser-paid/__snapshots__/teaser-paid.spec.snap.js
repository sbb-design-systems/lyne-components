/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-paid renders"] = 
`<a
  class="sbb-teaser-paid"
  role="presentation"
  tabindex="-1"
>
  <slot name="chip">
  </slot>
  <slot name="image">
  </slot>
</a>
`;
/* end snapshot sbb-teaser-paid renders */

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["sbb-teaser-paid A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-teaser-paid A11y tree Chrome */

snapshots["sbb-teaser-paid Dom"] = 
`<sbb-teaser-paid
  aria-label="label"
  dir="ltr"
  href="https://www.sbb.ch"
  rel="external"
  role="link"
  tabindex="0"
  target="_blank"
>
</sbb-teaser-paid>
`;
/* end snapshot sbb-teaser-paid Dom */

snapshots["sbb-teaser-paid ShadowDom"] = 
`<a
  class="sbb-teaser-paid"
  href="https://www.sbb.ch"
  rel="external"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <slot name="chip">
  </slot>
  <slot name="image">
  </slot>
  <sbb-screenreader-only>
    . Link target opens in a new window.
  </sbb-screenreader-only>
</a>
`;
/* end snapshot sbb-teaser-paid ShadowDom */

