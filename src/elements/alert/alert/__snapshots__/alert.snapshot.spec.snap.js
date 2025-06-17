/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-alert should render default properties DOM"] = 
`<sbb-alert
  animation="all"
  data-state="opened"
  size="m"
>
  <sbb-title
    level="3"
    negative=""
    visual-level="5"
  >
    Interruption
  </sbb-title>
  <p>
    Alert content
  </p>
</sbb-alert>
`;
/* end snapshot sbb-alert should render default properties DOM */

snapshots["sbb-alert should render default properties Shadow DOM"] = 
`<div class="sbb-alert__transition-wrapper">
  <div class="sbb-alert__transition-sub-wrapper">
    <div class="sbb-alert">
      <span class="sbb-alert__icon">
        <slot name="icon">
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="info"
            role="img"
          >
          </sbb-icon>
        </slot>
      </span>
      <span class="sbb-alert__content">
        <slot>
        </slot>
      </span>
      <span class="sbb-alert__close-button-wrapper">
        <sbb-divider
          aria-orientation="vertical"
          class="sbb-alert__close-button-divider"
          negative=""
          orientation="vertical"
        >
        </sbb-divider>
        <sbb-transparent-button
          aria-label="Close message"
          class="sbb-alert__close-button"
          data-action=""
          data-button=""
          data-sbb-button=""
          icon-name="cross-small"
          negative=""
          size="m"
          tabindex="0"
        >
        </sbb-transparent-button>
      </span>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-alert should render default properties Shadow DOM */

snapshots["sbb-alert should render customized properties DOM"] = 
`<sbb-alert
  animation="all"
  data-state="opened"
  icon-name="disruption"
  size="l"
>
  <sbb-title
    level="2"
    negative=""
    visual-level="3"
  >
    Interruption
  </sbb-title>
  <p>
    Alert content Alert content
    <sbb-link
      data-action=""
      data-link=""
      data-sbb-link=""
      data-slot-names="unnamed"
      href="https://www.sbb.ch"
      negative=""
      size="s"
    >
      Find out more
    </sbb-link>
  </p>
</sbb-alert>
`;
/* end snapshot sbb-alert should render customized properties DOM */

snapshots["sbb-alert should render customized properties Shadow DOM"] = 
`<div class="sbb-alert__transition-wrapper">
  <div class="sbb-alert__transition-sub-wrapper">
    <div class="sbb-alert">
      <span class="sbb-alert__icon">
        <slot name="icon">
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="disruption"
            role="img"
          >
          </sbb-icon>
        </slot>
      </span>
      <span class="sbb-alert__content">
        <slot>
        </slot>
      </span>
      <span class="sbb-alert__close-button-wrapper">
        <sbb-divider
          aria-orientation="vertical"
          class="sbb-alert__close-button-divider"
          negative=""
          orientation="vertical"
        >
        </sbb-divider>
        <sbb-transparent-button
          aria-label="Close message"
          class="sbb-alert__close-button"
          data-action=""
          data-button=""
          data-sbb-button=""
          icon-name="cross-small"
          negative=""
          size="m"
          tabindex="0"
        >
        </sbb-transparent-button>
      </span>
    </div>
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

