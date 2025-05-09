/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-time-input renders DOM"] = 
`<sbb-time-input
  contenteditable="plaintext-only"
  inputmode="numeric"
  placeholder="HH:MM"
  value="13:30"
>
  13:30
</sbb-time-input>
`;
/* end snapshot sbb-time-input renders DOM */

snapshots["sbb-time-input renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-time-input renders Shadow DOM */

snapshots["sbb-time-input renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "textbox",
      "name": "HH:MM",
      "value": "13:30"
    }
  ]
}
</p>
`;
/* end snapshot sbb-time-input renders A11y tree Chrome */

snapshots["sbb-time-input renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "textbox",
      "name": "",
      "value": "13:30"
    }
  ]
}
</p>
`;
/* end snapshot sbb-time-input renders A11y tree Firefox */

