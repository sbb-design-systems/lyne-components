/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link-list rendered with a slotted title"] = 
`<sbb-link-list
  orientation="vertical"
  size="s"
  title-level="2"
>
  <span slot="title">
    Help & Contact
  </span>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-0"
    tabindex="0"
    variant="block"
  >
    Rückerstattungen
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-1"
    tabindex="0"
    variant="block"
  >
    Fundbüro
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-2"
    tabindex="0"
    variant="block"
  >
    Beschwerden
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-3"
    tabindex="0"
    variant="block"
  >
    Lob aussprechen
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-4"
    tabindex="0"
    variant="block"
  >
    Sachbeschädigung melden
  </sbb-link>
</sbb-link-list>
`;
/* end snapshot sbb-link-list rendered with a slotted title */

snapshots["sbb-link-list rendered with a title from properties"] = 
`<sbb-link-list
  orientation="vertical"
  size="s"
  title-content="Help &amp; Contact"
  title-level="2"
>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-0"
    tabindex="0"
    variant="block"
  >
    Rückerstattungen
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-1"
    tabindex="0"
    variant="block"
  >
    Fundbüro
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-2"
    tabindex="0"
    variant="block"
  >
    Beschwerden
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-3"
    tabindex="0"
    variant="block"
  >
    Lob aussprechen
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-4"
    tabindex="0"
    variant="block"
  >
    Sachbeschädigung melden
  </sbb-link>
</sbb-link-list>
`;
/* end snapshot sbb-link-list rendered with a title from properties */

snapshots["sbb-link-list rendered without a title"] = 
`<sbb-link-list
  orientation="vertical"
  size="s"
>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-0"
    tabindex="0"
    variant="block"
  >
    Rückerstattungen
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-1"
    tabindex="0"
    variant="block"
  >
    Fundbüro
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-2"
    tabindex="0"
    variant="block"
  >
    Beschwerden
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-3"
    tabindex="0"
    variant="block"
  >
    Lob aussprechen
  </sbb-link>
  <sbb-link
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="link-4"
    tabindex="0"
    variant="block"
  >
    Sachbeschädigung melden
  </sbb-link>
</sbb-link-list>
`;
/* end snapshot sbb-link-list rendered without a title */

snapshots["sbb-link-list should render named slots if data-ssr-child-count attribute is set"] = 
`<div class="sbb-link-list-wrapper">
  <ul class="sbb-link-list">
    <li>
      <slot name="link-0">
      </slot>
    </li>
    <li>
      <slot name="link-1">
      </slot>
    </li>
    <li>
      <slot name="link-2">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-link-list should render named slots if data-ssr-child-count attribute is set */

