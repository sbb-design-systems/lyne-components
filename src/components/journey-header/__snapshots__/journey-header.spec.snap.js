/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-journey-header renders"] = 
`<sbb-title
  aria-level="3"
  level="3"
  role="heading"
  visual-level="5"
>
  <span
    class="sbb-journey-header"
    dir="ltr"
  >
    <span class="sbb-journey-header__origin">
      <span class="sbb-journey-header__connection--visually-hidden">
        Connection from
      </span>
      A
    </span>
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="arrow-long-right-small"
      role="img"
    >
    </sbb-icon>
    <span class="sbb-journey-header__destination">
      <span class="sbb-journey-header__connection--visually-hidden">
        to
      </span>
      B
    </span>
  </span>
</sbb-title>
`;
/* end snapshot sbb-journey-header renders */

snapshots["sbb-journey-header renders H1 L-sized round-trip negative"] = 
`<sbb-title
  aria-level="1"
  level="1"
  negative=""
  role="heading"
  visual-level="4"
>
  <span
    class="sbb-journey-header"
    dir="ltr"
  >
    <span class="sbb-journey-header__origin">
      <span class="sbb-journey-header__connection--visually-hidden">
        Connection from
      </span>
      B
    </span>
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="arrows-long-right-left-small"
      role="img"
    >
    </sbb-icon>
    <span class="sbb-journey-header__destination">
      <span class="sbb-journey-header__connection--visually-hidden">
        to
      </span>
      C
      <span class="sbb-journey-header__connection--visually-hidden">
        and back to B.
      </span>
    </span>
  </span>
</sbb-title>
`;
/* end snapshot sbb-journey-header renders H1 L-sized round-trip negative */

snapshots["sbb-journey-header A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Connection from  B  to  C and back to B.",
      "level": 1
    }
  ]
}
</p>
`;
/* end snapshot sbb-journey-header A11y tree Chrome */

snapshots["sbb-journey-header A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Connection from  B  to  C and back to B.",
      "level": 1
    }
  ]
}
</p>
`;
/* end snapshot sbb-journey-header A11y tree Firefox */

snapshots["sbb-journey-header A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Connection from"
    },
    {
      "role": "text",
      "name": " "
    },
    {
      "role": "text",
      "name": "B"
    },
    {
      "role": "text",
      "name": " "
    },
    {
      "role": "text",
      "name": "to"
    },
    {
      "role": "text",
      "name": " "
    },
    {
      "role": "text",
      "name": "C"
    },
    {
      "role": "text",
      "name": "and back to B."
    }
  ]
}
</p>
`;
/* end snapshot sbb-journey-header A11y tree Safari */

