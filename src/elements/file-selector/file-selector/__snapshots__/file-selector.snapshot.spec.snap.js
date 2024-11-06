/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-file-selector renders DOM"] = 
`<sbb-file-selector size="m">
</sbb-file-selector>
`;
/* end snapshot sbb-file-selector renders DOM */

snapshots["sbb-file-selector renders Shadow DOM"] = 
`<div class="sbb-file-selector">
  <div class="sbb-file-selector__input-container">
    <label>
      <sbb-secondary-button-static
        data-action=""
        data-sbb-button=""
        data-slot-names="unnamed"
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
</div>
`;
/* end snapshot sbb-file-selector renders Shadow DOM */

snapshots["sbb-file-selector renders with dropzone area and size s DOM"] = 
`<sbb-file-selector
  size="s"
  variant="dropzone"
>
</sbb-file-selector>
`;
/* end snapshot sbb-file-selector renders with dropzone area and size s DOM */

snapshots["sbb-file-selector renders with dropzone area and size s Shadow DOM"] = 
`<div class="sbb-file-selector">
  <div class="sbb-file-selector__input-container">
    <label>
      <span class="sbb-file-selector__dropzone-area">
        <span class="sbb-file-selector__dropzone-area--icon">
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="folder-open-small"
            role="img"
          >
          </sbb-icon>
        </span>
        <span class="sbb-file-selector__dropzone-area--title">
        </span>
        <span class="sbb-file-selector__dropzone-area--subtitle">
          Drag & Drop your files here
        </span>
        <span class="sbb-file-selector__dropzone-area--button">
          <sbb-secondary-button-static
            data-action=""
            data-sbb-button=""
            data-slot-names="unnamed"
            size="s"
          >
            Choose a file
          </sbb-secondary-button-static>
        </span>
      </span>
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
</div>
`;
/* end snapshot sbb-file-selector renders with dropzone area and size s Shadow DOM */

snapshots["sbb-file-selector renders with dropzone area and size s A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Drag & Drop your files here"
    },
    {
      "role": "text",
      "name": "Choose a file"
    },
    {
      "role": "button",
      "name": "Drag & Drop your files here Choose a file",
      "value": "No file chosen"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector renders with dropzone area and size s A11y tree Chrome */

snapshots["sbb-file-selector renders with dropzone area and size s A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Drag & Drop your files here"
    },
    {
      "role": "text leaf",
      "name": "Choose a file"
    },
    {
      "role": "button",
      "name": "Drag & Drop your files here Choose a file Browse… …"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector renders with dropzone area and size s A11y tree Firefox */

snapshots["sbb-file-selector renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Choose a file"
    },
    {
      "role": "button",
      "name": "Choose a file",
      "value": "No file chosen"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector renders A11y tree Chrome */

