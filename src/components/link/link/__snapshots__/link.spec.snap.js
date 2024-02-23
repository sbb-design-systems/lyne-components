/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link renders - DOM"] = 
`<sbb-link
  data-slot-names="unnamed"
  dir="ltr"
  href="sbb.ch"
  role="link"
  size="m"
  tabindex="0"
  target="_blank"
>
  Travelcards & tickets.
</sbb-link>
`;
/* end snapshot sbb-link renders - DOM */

snapshots["sbb-link renders - ShadowDOM"] = 
`<a
  class="sbb-action-base sbb-link"
  href="sbb.ch"
  rel="external noopener nofollow"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <slot>
  </slot>
  <sbb-screenreader-only>
    . Link target opens in a new window.
  </sbb-screenreader-only>
</a>
`;
/* end snapshot sbb-link renders - ShadowDOM */

snapshots["sbb-link A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Travelcards & tickets. . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "Travelcards & tickets. . Link target opens in a new window."
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-link A11y tree Chrome */

snapshots["sbb-link A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Travelcards & tickets. . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "Travelcards & tickets. . Link target opens in a new window.",
          "value": "http://localhost:8000/sbb.ch"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-link A11y tree Firefox */

snapshots["sbb-link A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "",
      "children": [
        {
          "role": "link",
          "name": "Travelcards & tickets. . Link target opens in a new window.",
          "children": [
            {
              "role": "text",
              "name": "Travelcards & tickets."
            },
            {
              "role": "text",
              "name": ". "
            },
            {
              "role": "text",
              "name": "Link target opens in a new window."
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-link A11y tree Safari */

