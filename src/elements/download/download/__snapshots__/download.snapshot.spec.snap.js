/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-download renders with derived label and icon DOM"] = 
`<sbb-download
  color="white"
  href="files/annual-report.pdf"
>
  <sbb-download-info
    changed="2026-12-24"
    size="1234567"
    slot="info"
  >
  </sbb-download-info>
</sbb-download>
`;
/* end snapshot sbb-download renders with derived label and icon DOM */

snapshots["sbb-download renders with derived label and icon Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-download"
  download=""
  href="files/annual-report.pdf"
>
  <slot name="icon">
    <sbb-icon
      class="sbb-download__icon"
      name="document-pdf-small"
    >
    </sbb-icon>
  </slot>
  <span class="sbb-download__content">
    <span class="sbb-download__label">
      annual-report.pdf
    </span>
    <span class="sbb-download__custom-content">
      <slot>
      </slot>
    </span>
    <span class="sbb-download__info">
      <slot name="info">
      </slot>
    </span>
  </span>
  <sbb-secondary-button-static
    class="sbb-download__button"
    icon-name="download-small"
  >
  </sbb-secondary-button-static>
</a>
`;
/* end snapshot sbb-download renders with derived label and icon Shadow DOM */

snapshots["sbb-download renders with derived label and icon A11y tree Chrome"] = 
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
/* end snapshot sbb-download renders with derived label and icon A11y tree Chrome */

snapshots["sbb-download renders with explicit label and milk color DOM"] = 
`<sbb-download
  color="milk"
  href="report.pdf"
  label="Annual report"
>
  <sbb-download-info
    non-accessible=""
    size="123 KB"
    slot="info"
    type="PDF"
  >
  </sbb-download-info>
</sbb-download>
`;
/* end snapshot sbb-download renders with explicit label and milk color DOM */

snapshots["sbb-download renders with explicit label and milk color Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-download"
  download=""
  href="report.pdf"
>
  <slot name="icon">
    <sbb-icon
      class="sbb-download__icon"
      name="document-pdf-small"
    >
    </sbb-icon>
  </slot>
  <span class="sbb-download__content">
    <span class="sbb-download__label">
      Annual report
    </span>
    <span class="sbb-download__custom-content">
      <slot>
      </slot>
    </span>
    <span class="sbb-download__info">
      <slot name="info">
      </slot>
    </span>
  </span>
  <sbb-secondary-button-static
    class="sbb-download__button"
    icon-name="download-small"
  >
  </sbb-secondary-button-static>
</a>
`;
/* end snapshot sbb-download renders with explicit label and milk color Shadow DOM */

snapshots["sbb-download renders with custom content and info DOM"] = 
`<sbb-download
  color="white"
  href="files/annual-report.pdf"
  label="Annual report"
>
  <span>
    Custom description for the downloadable document.
  </span>
  <sbb-download-info
    changed="2026-12-24"
    size="1234567"
    slot="info"
  >
  </sbb-download-info>
</sbb-download>
`;
/* end snapshot sbb-download renders with custom content and info DOM */

snapshots["sbb-download renders with custom content and info Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-download"
  download=""
  href="files/annual-report.pdf"
>
  <slot name="icon">
    <sbb-icon
      class="sbb-download__icon"
      name="document-pdf-small"
    >
    </sbb-icon>
  </slot>
  <span class="sbb-download__content">
    <span class="sbb-download__label">
      Annual report
    </span>
    <span class="sbb-download__custom-content">
      <slot>
      </slot>
    </span>
    <span class="sbb-download__info">
      <slot name="info">
      </slot>
    </span>
  </span>
  <sbb-secondary-button-static
    class="sbb-download__button"
    icon-name="download-small"
  >
  </sbb-secondary-button-static>
</a>
`;
/* end snapshot sbb-download renders with custom content and info Shadow DOM */

