/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-journey-header renders DOM"] = 
`<sbb-journey-header
  destination="B"
  level="3"
  origin="A"
  visual-level="5"
>
</sbb-journey-header>
`;
/* end snapshot sbb-journey-header renders DOM */

snapshots["sbb-journey-header renders Shadow DOM"] = 
`A
<sbb-icon name="arrow-long-right-small">
</sbb-icon>
B
`;
/* end snapshot sbb-journey-header renders Shadow DOM */

snapshots["sbb-journey-header renders visual-level 4 round-trip negative DOM"] = 
`<sbb-journey-header
  destination="C"
  level="1"
  negative=""
  origin="B"
  round-trip=""
  visual-level="4"
>
</sbb-journey-header>
`;
/* end snapshot sbb-journey-header renders visual-level 4 round-trip negative DOM */

snapshots["sbb-journey-header renders visual-level 4 round-trip negative Shadow DOM"] = 
`B
<sbb-icon name="arrows-long-right-left-small">
</sbb-icon>
C
`;
/* end snapshot sbb-journey-header renders visual-level 4 round-trip negative Shadow DOM */

snapshots["sbb-journey-header renders visual-level 4 round-trip negative A11y tree Chrome"] = 
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
/* end snapshot sbb-journey-header renders visual-level 4 round-trip negative A11y tree Chrome */

