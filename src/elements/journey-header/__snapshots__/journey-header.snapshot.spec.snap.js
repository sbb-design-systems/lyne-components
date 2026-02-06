/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-journey-header renders DOM"] = 
`<sbb-journey-header
  destination="B"
  level="3"
  origin="A"
  size="m"
  visual-level="5"
>
</sbb-journey-header>
`;
/* end snapshot sbb-journey-header renders DOM */

snapshots["sbb-journey-header renders Shadow DOM"] = 
`<span
  aria-hidden="true"
  class="sbb-journey-header"
>
  <span class="sbb-journey-header__origin">
    A
  </span>
  <sbb-icon name="arrow-long-right-small">
  </sbb-icon>
  <span class="sbb-journey-header__destination">
    B
  </span>
</span>
<sbb-screen-reader-only>
  Connection from A to B
</sbb-screen-reader-only>
`;
/* end snapshot sbb-journey-header renders Shadow DOM */

snapshots["sbb-journey-header renders H1 L-sized round-trip negative DOM"] = 
`<sbb-journey-header
  destination="C"
  level="1"
  negative=""
  origin="B"
  round-trip=""
  size="l"
  visual-level="4"
>
</sbb-journey-header>
`;
/* end snapshot sbb-journey-header renders H1 L-sized round-trip negative DOM */

snapshots["sbb-journey-header renders H1 L-sized round-trip negative Shadow DOM"] = 
`<span
  aria-hidden="true"
  class="sbb-journey-header"
>
  <span class="sbb-journey-header__origin">
    B
  </span>
  <sbb-icon name="arrows-long-right-left-small">
  </sbb-icon>
  <span class="sbb-journey-header__destination">
    C
  </span>
</span>
<sbb-screen-reader-only>
  Connection from B to C and back to B.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-journey-header renders H1 L-sized round-trip negative Shadow DOM */

snapshots["sbb-journey-header renders H1 L-sized round-trip negative A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "heading",
      "name": "Connection from B to C and back to B.",
      "level": 1
    }
  ]
}
</p>
`;
/* end snapshot sbb-journey-header renders H1 L-sized round-trip negative A11y tree Chrome */

