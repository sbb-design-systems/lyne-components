/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tag-group renders - Dom"] = 
`<sbb-tag-group role="group">
  <sbb-tag
    slot="li-0"
    value="tag-1"
  >
    First tag
  </sbb-tag>
  <sbb-tag
    slot="li-1"
    value="tag-2"
  >
    Second tag
  </sbb-tag>
  <div slot="li-2">
  </div>
  <sbb-tag
    slot="li-3"
    value="tag-3"
  >
    Third tag
  </sbb-tag>
</sbb-tag-group>
`;
/* end snapshot sbb-tag-group renders - Dom */

snapshots["sbb-tag-group renders - ShadowDom"] = 
`<div class="sbb-tag-group">
  <ul class="sbb-tag-group__list">
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
    <li>
      <slot name="li-3">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-tag-group renders - ShadowDom */

snapshots["sbb-tag-group A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "First tag"
    },
    {
      "role": "text",
      "name": "Second tag"
    },
    {
      "role": "text",
      "name": "Third tag"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag-group A11y tree Chrome */

snapshots["sbb-tag-group A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "First tag"
    },
    {
      "role": "text leaf",
      "name": "Second tag"
    },
    {
      "role": "text leaf",
      "name": "Third tag"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag-group A11y tree Firefox */

snapshots["sbb-tag-group A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "First tag"
    },
    {
      "role": "text",
      "name": "Second tag"
    },
    {
      "role": "text",
      "name": "Third tag"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tag-group A11y tree Safari */

