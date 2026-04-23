/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-carousel-item renders DOM"] = 
`<sbb-carousel-item>
  <img alt="SBB image">
</sbb-carousel-item>
`;
/* end snapshot sbb-carousel-item renders DOM */

snapshots["sbb-carousel-item renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-carousel-item renders Shadow DOM */

snapshots["sbb-carousel-item renders with sbb-image DOM"] = 
`<sbb-carousel-item>
  <sbb-image
    alt="SBB image"
    style="width: 800px; height: 600px;"
  >
  </sbb-image>
</sbb-carousel-item>
`;
/* end snapshot sbb-carousel-item renders with sbb-image DOM */

snapshots["sbb-carousel-item renders with sbb-image Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-carousel-item renders with sbb-image Shadow DOM */

snapshots["sbb-carousel-item renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "group",
      "name": "",
      "roledescription": "slide"
    }
  ]
}
</p>
`;
/* end snapshot sbb-carousel-item renders A11y tree Chrome */

snapshots["sbb-carousel-item renders with sbb-image A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "group",
      "name": "",
      "roledescription": "slide"
    }
  ]
}
</p>
`;
/* end snapshot sbb-carousel-item renders with sbb-image A11y tree Chrome */

