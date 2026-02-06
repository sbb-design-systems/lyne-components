/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link renders DOM"] = 
`<sbb-link
  href="https://sbb.ch"
  size="m"
  target="_blank"
>
  Travelcards & tickets.
</sbb-link>
`;
/* end snapshot sbb-link renders DOM */

snapshots["sbb-link renders Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-link"
  href="https://sbb.ch"
  rel="external noopener nofollow"
  target="_blank"
>
  <slot>
  </slot>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-link renders Shadow DOM */

snapshots["sbb-link renders A11y tree Chrome"] = 
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
/* end snapshot sbb-link renders A11y tree Chrome */

snapshots["sbb-link reflects properties DOM"] = 
`<sbb-link
  download=""
  href="https://sbb.ch/"
  rel="nofollow"
  size="m"
  target="_blank"
>
  Travelcards & tickets.
</sbb-link>
`;
/* end snapshot sbb-link reflects properties DOM */

snapshots["sbb-link reflects properties Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-link"
  download=""
  href="https://sbb.ch/"
  rel="nofollow"
  target="_blank"
>
  <slot>
  </slot>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-link reflects properties Shadow DOM */

snapshots["sbb-link reflects properties A11y tree Chrome"] = 
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
/* end snapshot sbb-link reflects properties A11y tree Chrome */

