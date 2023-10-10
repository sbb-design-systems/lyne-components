import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { waitForLitRender } from '../../global/testing';
import { SbbLinkList } from './sbb-link-list';
import '../sbb-link';

describe('sbb-link-list', () => {
  let element: SbbLinkList;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-link-list title-level="2">
        <span slot="title">Help &amp; Contact</span>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          >Rückerstattungen</sbb-link
        >
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          >Fundbüro</sbb-link
        >
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          >Beschwerden</sbb-link
        >
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          >Lob aussprechen</sbb-link
        >
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          >Sachbeschädigung melden</sbb-link
        >
      </sbb-link-list>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbLinkList);
  });

  describe('property sync', () => {
    it('should sync properties/attributes with sbb-link', async () => {
      const links = Array.from(element.querySelectorAll('sbb-link'));
      expect(
        links.every((l) => l.size === 's' && l.variant === 'block' && l.negative === undefined),
      ).to.be.true;
    });

    it('should update attributes with size m', async () => {
      element.setAttribute('size', 'm');
      await waitForLitRender(element);
      const links = Array.from(element.querySelectorAll('sbb-link'));
      expect(links.every((l) => l.size === 'm')).to.be.true;
    });

    it('should update attributes with negative', async () => {
      element.setAttribute('negative', '');
      await waitForLitRender(element);
      const links = Array.from(element.querySelectorAll('sbb-link'));
      expect(links.every((l) => l.negative)).to.be.true;
    });
  });
});
