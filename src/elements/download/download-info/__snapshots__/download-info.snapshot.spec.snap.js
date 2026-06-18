/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-download-info renders with all values DOM"] = 
`<sbb-download-info
  changed="2026-12-24"
  non-accessible=""
  size="1234567"
  type="PDF"
>
</sbb-download-info>
`;
/* end snapshot sbb-download-info renders with all values DOM */

snapshots["sbb-download-info renders with all values Shadow DOM"] = 
`PDF, 1 MB, not accessible, 12/24/2026
`;
/* end snapshot sbb-download-info renders with all values Shadow DOM */

snapshots["sbb-download-info renders with all values A11y tree Chrome"] = 
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
/* end snapshot sbb-download-info renders with all values A11y tree Chrome */

snapshots["sbb-download-info renders with a textual size Shadow DOM"] = 
`PDF, 123 KB
`;
/* end snapshot sbb-download-info renders with a textual size Shadow DOM */

