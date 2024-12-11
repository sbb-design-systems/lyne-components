/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-date-input renders Chrome-Safari DOM"] = 
`<sbb-date-input
  contenteditable="plaintext-only"
  value="2024-12-11"
>
  We, 11.12.2024
</sbb-date-input>
`;
/* end snapshot sbb-date-input renders Chrome-Safari DOM */

snapshots["sbb-date-input renders Chrome-Safari Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-date-input renders Chrome-Safari Shadow DOM */

snapshots["sbb-date-input renders Firefox DOM"] = 
`<sbb-date-input
  contenteditable="true"
  value="2024-12-11"
>
  We, 11.12.2024
</sbb-date-input>
`;
/* end snapshot sbb-date-input renders Firefox DOM */

snapshots["sbb-date-input renders Firefox Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-date-input renders Firefox Shadow DOM */

snapshots["sbb-date-input renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "textbox",
      "name": "",
      "value": "We, 11.12.2024"
    }
  ]
}
</p>
`;
/* end snapshot sbb-date-input renders A11y tree Chrome */

snapshots["sbb-date-input renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "textbox",
      "name": "",
      "value": "We, 11.12.2024"
    }
  ]
}
</p>
`;
/* end snapshot sbb-date-input renders A11y tree Firefox */

