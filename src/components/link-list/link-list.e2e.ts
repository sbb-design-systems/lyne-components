import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing/index.js';
import { fixture } from '../core/testing/private/index.js';

import { SbbLinkListElement } from './link-list.js';
import '../link/block-link/index.js';

describe(`sbb-link-list with ${fixture.name}`, () => {
  let element: SbbLinkListElement;

  beforeEach(async () => {
    element = await fixture(
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
      { modules: ['./link-list.ts', '../link/index.ts'] },
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbLinkListElement);
  });

  describe('property sync', () => {
    it('should sync properties/attributes with sbb-link', async () => {
      const links = Array.from(element.querySelectorAll('sbb-block-link'));
      expect(links.every((l) => l.size === 's' && l.negative === false)).to.be.true;
    });

    it('should update attributes with size m', async () => {
      element.setAttribute('size', 'm');
      await waitForLitRender(element);
      const links = Array.from(element.querySelectorAll('sbb-block-link'));
      expect(links.every((l) => l.size === 'm')).to.be.true;
    });

    it('should update attributes with negative', async () => {
      element.setAttribute('negative', '');
      await waitForLitRender(element);
      const links = Array.from(element.querySelectorAll('sbb-block-link'));
      expect(links.every((l) => l.negative)).to.be.true;
    });
  });
});
