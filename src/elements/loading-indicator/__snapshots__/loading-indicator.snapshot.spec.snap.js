/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-loading-indicator renders with variant `window` DOM"] = 
`<sbb-loading-indicator
  color="default"
  size="s"
>
</sbb-loading-indicator>
`;
/* end snapshot sbb-loading-indicator renders with variant `window` DOM */

snapshots["sbb-loading-indicator renders with variant `window` Shadow DOM"] = 
`<span class="sbb-loading-indicator">
  <span class="sbb-loading-indicator__animated-element">
    <span>
      <span>
        <span>
        </span>
        <span>
        </span>
        <span>
        </span>
        <span>
        </span>
        <span>
        </span>
      </span>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-loading-indicator renders with variant `window` Shadow DOM */

snapshots["sbb-loading-indicator renders with variant `circle` DOM"] = 
`<sbb-loading-indicator
  aria-busy="true"
  color="default"
  role="progressbar"
  size="s"
  variant="circle"
>
</sbb-loading-indicator>
`;
/* end snapshot sbb-loading-indicator renders with variant `circle` DOM */

snapshots["sbb-loading-indicator renders with variant `circle` Shadow DOM"] = 
`<span class="sbb-loading-indicator">
  <span class="sbb-loading-indicator__animated-element">
  </span>
</span>
`;
/* end snapshot sbb-loading-indicator renders with variant `circle` Shadow DOM */

snapshots["sbb-loading-indicator renders with variant `window` A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "progressbar",
      "name": "",
      "valuemin": 0,
      "valuemax": 100,
      "valuetext": "",
      "busy": 1
    }
  ]
}
</p>
`;
/* end snapshot sbb-loading-indicator renders with variant `window` A11y tree Chrome */

snapshots["sbb-loading-indicator renders with variant `window` A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-loading-indicator renders with variant `window` A11y tree Firefox */

