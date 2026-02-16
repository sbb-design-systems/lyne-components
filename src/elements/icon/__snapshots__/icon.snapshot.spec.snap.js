/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-icon registers a custom namespace"] = 
`<span class="sbb-icon-inner">
  <svg-fake
    data-name="heart-medium"
    height="36"
    style="width:36px;height:36px"
    width="36"
  >
  </svg-fake>
</span>
`;
/* end snapshot sbb-icon registers a custom namespace */

snapshots["sbb-icon renders DOM"] = 
`<sbb-icon>
</sbb-icon>
`;
/* end snapshot sbb-icon renders DOM */

snapshots["sbb-icon renders Shadow DOM"] = 
`<span class="sbb-icon-inner">
</span>
`;
/* end snapshot sbb-icon renders Shadow DOM */

snapshots["sbb-icon renders aria-hidden and no aria-label DOM"] = 
`<sbb-icon name="app-icon-medium">
</sbb-icon>
`;
/* end snapshot sbb-icon renders aria-hidden and no aria-label DOM */

snapshots["sbb-icon renders aria-hidden and no aria-label Shadow DOM"] = 
`<span class="sbb-icon-inner">
  <svg-fake
    data-name="app-icon-medium"
    height="36"
    style="width:36px;height:36px"
    width="36"
  >
  </svg-fake>
</span>
`;
/* end snapshot sbb-icon renders aria-hidden and no aria-label Shadow DOM */

snapshots["sbb-icon renders default aria-label DOM"] = 
`<sbb-icon
  aria-hidden="false"
  name="app-icon-medium"
>
</sbb-icon>
`;
/* end snapshot sbb-icon renders default aria-label DOM */

snapshots["sbb-icon renders default aria-label Shadow DOM"] = 
`<span class="sbb-icon-inner">
  <svg-fake
    data-name="app-icon-medium"
    height="36"
    style="width:36px;height:36px"
    width="36"
  >
  </svg-fake>
</span>
`;
/* end snapshot sbb-icon renders default aria-label Shadow DOM */

snapshots["sbb-icon renders custom aria-label DOM"] = 
`<sbb-icon
  aria-hidden="false"
  aria-label="Custom label"
  name="app-icon-medium"
>
</sbb-icon>
`;
/* end snapshot sbb-icon renders custom aria-label DOM */

snapshots["sbb-icon renders custom aria-label Shadow DOM"] = 
`<span class="sbb-icon-inner">
  <svg-fake
    data-name="app-icon-medium"
    height="36"
    style="width:36px;height:36px"
    width="36"
  >
  </svg-fake>
</span>
`;
/* end snapshot sbb-icon renders custom aria-label Shadow DOM */

snapshots["sbb-icon A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none"
    }
  ]
}
</p>
`;
/* end snapshot sbb-icon A11y tree Chrome */

