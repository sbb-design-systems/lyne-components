/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-download-info renders with all values DOM"] = 
`<sbb-download-info
  changed="2026-12-24"
  non-accessible=""
  size="1234567"
  slot="info"
  type="PDF"
>
</sbb-download-info>
`;
/* end snapshot sbb-download-info renders with all values DOM */

snapshots["sbb-download-info renders with all values Shadow DOM"] = 
`<span>
  PDF,
</span>
1 MB, not accessible, 24.12.2026
`;
/* end snapshot sbb-download-info renders with all values Shadow DOM */

snapshots["sbb-download-info renders with all values A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none"
    },
    {
      "ignored": true,
      "role": "none"
    },
    {
      "ignored": true,
      "role": "none"
    },
    {
      "ignored": true,
      "role": "none"
    },
    {
      "ignored": true,
      "role": "none"
    },
    {
      "ignored": true,
      "role": "none"
    }
  ]
}
</p>
`;
/* end snapshot sbb-download-info renders with all values A11y tree Chrome */

snapshots["sbb-download-info renders with a textual size Shadow DOM"] = 
`<span>
  PDF,
</span>
123 KB
`;
/* end snapshot sbb-download-info renders with a textual size Shadow DOM */

