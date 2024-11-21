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
`<sbb-icon
  aria-hidden="true"
  data-empty=""
  data-namespace="default"
  role="img"
>
</sbb-icon>
`;
/* end snapshot sbb-icon renders DOM */

snapshots["sbb-icon renders Shadow DOM"] = 
`<span class="sbb-icon-inner">
</span>
`;
/* end snapshot sbb-icon renders Shadow DOM */

snapshots["sbb-icon renders aria-hidden and no aria-label DOM"] = 
`<sbb-icon
  aria-hidden="true"
  data-namespace="default"
  name="app-icon-medium"
  role="img"
>
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
  aria-label="Icon app icon medium"
  data-namespace="default"
  name="app-icon-medium"
  role="img"
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
  data-namespace="default"
  name="app-icon-medium"
  role="img"
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
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-icon A11y tree Chrome */

snapshots["sbb-icon A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-icon A11y tree Safari */

snapshots["sbb-icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-icon A11y tree Firefox */

