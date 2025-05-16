/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-journey-header renders DOM"] = 
`<sbb-journey-header
  destination="B"
  origin="A"
  size="m"
>
</sbb-journey-header>
`;
/* end snapshot sbb-journey-header renders DOM */

snapshots["sbb-journey-header renders Shadow DOM"] = 
`<sbb-title
  aria-level="3"
  level="3"
  role="heading"
  visual-level="5"
>
  <span
    aria-hidden="true"
    class="sbb-journey-header"
  >
    <span class="sbb-journey-header__origin">
      A
    </span>
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="arrow-long-right-small"
      role="img"
    >
    </sbb-icon>
    <span class="sbb-journey-header__destination">
      B
    </span>
  </span>
  <sbb-screen-reader-only>
    Connection from A to B
  </sbb-screen-reader-only>
</sbb-title>
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
>
</sbb-journey-header>
`;
/* end snapshot sbb-journey-header renders H1 L-sized round-trip negative DOM */

snapshots["sbb-journey-header renders H1 L-sized round-trip negative Shadow DOM"] = 
`<sbb-title
  aria-level="1"
  level="1"
  negative=""
  role="heading"
  visual-level="4"
>
  <span
    aria-hidden="true"
    class="sbb-journey-header"
  >
    <span class="sbb-journey-header__origin">
      B
    </span>
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="arrows-long-right-left-small"
      role="img"
    >
    </sbb-icon>
    <span class="sbb-journey-header__destination">
      C
    </span>
  </span>
  <sbb-screen-reader-only>
    Connection from B to C and back to B.
  </sbb-screen-reader-only>
</sbb-title>
`;
/* end snapshot sbb-journey-header renders H1 L-sized round-trip negative Shadow DOM */

snapshots["sbb-journey-header renders H1 L-sized round-trip negative A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
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

snapshots["sbb-journey-header renders H1 L-sized round-trip negative A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
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
/* end snapshot sbb-journey-header renders H1 L-sized round-trip negative A11y tree Firefox */

