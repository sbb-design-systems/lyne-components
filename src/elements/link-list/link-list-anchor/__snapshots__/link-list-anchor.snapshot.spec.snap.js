/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link-list-anchor renders DOM"] = 
`<sbb-link-list-anchor
  size="s"
  title-content="title"
>
  <sbb-block-link
    href="https://www.sbb.ch"
    icon-placement="start"
    size="s"
    slot="li-0"
  >
    Link 0
  </sbb-block-link>
  <sbb-block-link
    href="https://www.sbb.ch"
    icon-placement="start"
    size="s"
    slot="li-1"
  >
    Link 1
  </sbb-block-link>
  <sbb-block-link
    href="https://www.sbb.ch"
    icon-placement="start"
    size="s"
    slot="li-2"
  >
    Link 2
  </sbb-block-link>
</sbb-link-list-anchor>
`;
/* end snapshot sbb-link-list-anchor renders DOM */

snapshots["sbb-link-list-anchor renders Shadow DOM"] = 
`<div class="sbb-link-list-wrapper">
  <sbb-title
    class="sbb-link-list-title"
    id="sbb-link-list-title-id"
    level="2"
    visual-level="5"
  >
    <slot name="title">
      title
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-link-list-title-id"
    class="sbb-link-list-anchor"
  >
    <li>
      <slot name="li-0">
      </slot>
    </li>
    <li>
      <slot name="li-1">
      </slot>
    </li>
    <li>
      <slot name="li-2">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-link-list-anchor renders Shadow DOM */

snapshots["sbb-link-list-anchor renders A11y tree Chrome"] = 
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
              "role": "heading",
              "name": "title",
              "level": 2
            },
            {
              "role": "list",
              "name": "title"
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-link-list-anchor renders A11y tree Chrome */

