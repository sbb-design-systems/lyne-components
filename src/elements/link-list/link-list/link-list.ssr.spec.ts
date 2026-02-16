import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbLinkListElement } from './link-list.component.ts';

import '../../link.ts';

describe(`sbb-link-list ssr`, () => {
  let root: SbbLinkListElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-link-list title-level="2">
          <span slot="title">Help &amp; Contact</span>
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            >Rückerstattungen</sbb-block-link
          >
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            >Fundbüro</sbb-block-link
          >
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            >Beschwerden</sbb-block-link
          >
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            >Lob aussprechen</sbb-block-link
          >
          <sbb-block-link
            href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
            >Sachbeschädigung melden</sbb-block-link
          >
        </sbb-link-list>
      `,
      { modules: ['./link-list.component.js', '../../link.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLinkListElement);
  });
});
