/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-file-selector-dropzone renders DOM"] = 
`<sbb-file-selector-dropzone size="m">
</sbb-file-selector-dropzone>
`;
/* end snapshot sbb-file-selector-dropzone renders DOM */

snapshots["sbb-file-selector-dropzone renders Shadow DOM"] = 
`<div class="sbb-file-selector">
  <div class="sbb-file-selector__input-container">
    <label>
      <span class="sbb-file-selector__dropzone-area">
        <span class="sbb-file-selector__dropzone-area--icon">
          <sbb-icon name="folder-open-medium">
          </sbb-icon>
        </span>
        <span class="sbb-file-selector__dropzone-area--title">
        </span>
        <span class="sbb-file-selector__dropzone-area--subtitle">
          Drag & Drop your file here
        </span>
        <span class="sbb-file-selector__dropzone-area--button">
          <sbb-secondary-button-static size="m">
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
/* end snapshot sbb-file-selector-dropzone renders Shadow DOM */

snapshots["sbb-file-selector-dropzone renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Drag & Drop your file here"
    },
    {
      "role": "text",
      "name": "Choose a file"
    },
    {
      "role": "button",
      "name": "Drag & Drop your file here Choose a file",
      "value": "No file chosen"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector-dropzone renders A11y tree Chrome */

snapshots["sbb-file-selector-dropzone renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Drag & Drop your file here"
    },
    {
      "role": "text leaf",
      "name": "Choose a file"
    },
    {
      "role": "button",
      "name": "Drag & Drop your file here Choose a file Browse… …"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector-dropzone renders A11y tree Firefox */

snapshots["sbb-file-selector-dropzone renders multiple DOM"] = 
`<sbb-file-selector-dropzone
  multiple=""
  size="m"
>
</sbb-file-selector-dropzone>
`;
/* end snapshot sbb-file-selector-dropzone renders multiple DOM */

snapshots["sbb-file-selector-dropzone renders multiple Shadow DOM"] = 
`<div class="sbb-file-selector">
  <div class="sbb-file-selector__input-container">
    <label>
      <span class="sbb-file-selector__dropzone-area">
        <span class="sbb-file-selector__dropzone-area--icon">
          <sbb-icon name="folder-open-medium">
          </sbb-icon>
        </span>
        <span class="sbb-file-selector__dropzone-area--title">
        </span>
        <span class="sbb-file-selector__dropzone-area--subtitle">
          Drag & Drop your files here
        </span>
        <span class="sbb-file-selector__dropzone-area--button">
          <sbb-secondary-button-static size="m">
            Choose files
          </sbb-secondary-button-static>
        </span>
      </span>
      <input
        class="sbb-file-selector__visually-hidden"
        multiple=""
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
/* end snapshot sbb-file-selector-dropzone renders multiple Shadow DOM */

snapshots["sbb-file-selector-dropzone renders multiple A11y tree Chrome"] = 
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
      "name": "Choose files"
    },
    {
      "role": "button",
      "name": "Drag & Drop your files here Choose files",
      "value": "No file chosen"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector-dropzone renders multiple A11y tree Chrome */

snapshots["sbb-file-selector-dropzone renders multiple A11y tree Firefox"] = 
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
      "name": "Choose files"
    },
    {
      "role": "button",
      "name": "Drag & Drop your files here Choose files Browse… …"
    }
  ]
}
</p>
`;
/* end snapshot sbb-file-selector-dropzone renders multiple A11y tree Firefox */

