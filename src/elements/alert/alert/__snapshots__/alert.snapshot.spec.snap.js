/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-alert should render default properties DOM"] = 
`<sbb-alert
  animation="all"
  size="m"
>
  <sbb-title
    level="3"
    negative=""
    slot="title"
    visual-level="5"
  >
    Interruption
  </sbb-title>
  Alert content
</sbb-alert>
`;
/* end snapshot sbb-alert should render default properties DOM */

snapshots["sbb-alert should render default properties Shadow DOM"] = 
`<div class="sbb-alert__transition-wrapper">
  <div class="sbb-alert">
    <span class="sbb-alert__icon">
      <slot name="icon">
        <sbb-icon name="info">
        </sbb-icon>
      </slot>
    </span>
    <span class="sbb-alert__content">
      <slot name="title">
      </slot>
      <p class="sbb-alert__content-slot">
        <slot>
        </slot>
      </p>
    </span>
    <span class="sbb-alert__close-button-wrapper">
      <sbb-divider
        class="sbb-alert__close-button-divider"
        negative=""
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-transparent-button
        aria-label="Close message"
        class="sbb-alert__close-button"
        icon-name="cross-small"
        negative=""
        size="m"
        tabindex="0"
      >
      </sbb-transparent-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-alert should render default properties Shadow DOM */

snapshots["sbb-alert should render customized properties DOM"] = 
`<sbb-alert
  animation="all"
  icon-name="disruption"
  size="l"
>
  <sbb-title
    level="2"
    negative=""
    slot="title"
    visual-level="3"
  >
    Interruption
  </sbb-title>
  Alert content Alert content
  <sbb-link
    href="https://www.sbb.ch"
    negative=""
    size="s"
  >
    Find out more
  </sbb-link>
</sbb-alert>
`;
/* end snapshot sbb-alert should render customized properties DOM */

snapshots["sbb-alert should render customized properties Shadow DOM"] = 
`<div class="sbb-alert__transition-wrapper">
  <div class="sbb-alert">
    <span class="sbb-alert__icon">
      <slot name="icon">
        <sbb-icon name="disruption">
        </sbb-icon>
      </slot>
    </span>
    <span class="sbb-alert__content">
      <slot name="title">
      </slot>
      <p class="sbb-alert__content-slot">
        <slot>
        </slot>
      </p>
    </span>
    <span class="sbb-alert__close-button-wrapper">
      <sbb-divider
        class="sbb-alert__close-button-divider"
        negative=""
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-transparent-button
        aria-label="Close message"
        class="sbb-alert__close-button"
        icon-name="cross-small"
        negative=""
        size="m"
        tabindex="0"
      >
      </sbb-transparent-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-alert should render customized properties Shadow DOM */

snapshots["sbb-alert A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Interruption",
      "level": 3
    },
    {
      "role": "text",
      "name": "Alert content "
    },
    {
      "role": "link",
      "name": "Find out more"
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-alert A11y tree Chrome */

snapshots["sbb-alert A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Interruption",
      "level": 3
    },
    {
      "role": "text leaf",
      "name": "Alert content "
    },
    {
      "role": "link",
      "name": "Find out more",
      "value": "https://www.sbb.ch/"
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-alert A11y tree Firefox */

snapshots["sbb-alert should render customized properties A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Interruption",
      "level": 2
    },
    {
      "role": "text",
      "name": "Alert content Alert content "
    },
    {
      "role": "link",
      "name": "Find out more"
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-alert should render customized properties A11y tree Chrome */

snapshots["sbb-alert should render customized properties A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Interruption",
      "level": 2
    },
    {
      "role": "text leaf",
      "name": "Alert content Alert content "
    },
    {
      "role": "link",
      "name": "Find out more",
      "value": "https://www.sbb.ch/"
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-alert should render customized properties A11y tree Firefox */

