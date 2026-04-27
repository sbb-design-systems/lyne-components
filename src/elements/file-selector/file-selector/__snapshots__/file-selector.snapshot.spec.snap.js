/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-file-selector renders DOM"] = 
`<sbb-file-selector size="m">
</sbb-file-selector>
`;
/* end snapshot sbb-file-selector renders DOM */

snapshots["sbb-file-selector renders Shadow DOM"] = 
`<div class="sbb-file-selector__input-container">
  <label>
    <sbb-secondary-button-static
      icon-name="folder-open-small"
      size="m"
    >
      Choose a file
    </sbb-secondary-button-static>
    <input
      class="sbb-file-selector__visually-hidden"
      type="file"
    >
  </label>
</div>
<p
  class="sbb-file-selector__visually-hidden"
  role="status"
>
</p>
<div class="sbb-file-selector__error">
  <slot name="error">
  </slot>
</div>
`;
/* end snapshot sbb-file-selector renders Shadow DOM */

snapshots["sbb-file-selector renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "LabelText",
              "name": ""
            }
          ]
        },
        {
          "role": "status",
          "name": "",
          "live": "polite",
          "atomic": true,
          "relevant": "additions text"
        },
        {
          "ignored": true,
          "role": "none"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector renders A11y tree Chrome */

