import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbLinkElement } from '../link';

import type { SbbLinkListElement } from './link-list';

import '../link';
import './link-list';

describe('sbb-link-list', () => {
  let element: SbbLinkListElement;

  const sbbLinkSnippet = html`
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
  `;

  describe('rendered with a slotted title', () => {
    before(async () => {
      element = await fixture(
        html` <sbb-link-list title-level="2">
          <span slot="title">Help &amp; Contact</span>
          ${sbbLinkSnippet}
        </sbb-link-list>`,
      );
    });

    it('in light DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('in shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('rendered with a title from properties', () => {
    before(async () => {
      element = await fixture(
        html` <sbb-link-list title-level="2" title-content="Help &amp; Contact">
          ${sbbLinkSnippet}
        </sbb-link-list>`,
      );
    });

    it('in light DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('in shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('rendered without a title', () => {
    before(async () => {
      element = await fixture(html`<sbb-link-list>${sbbLinkSnippet}</sbb-link-list>`);
    });

    it('in light DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('in shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  it('should render named slots if data-ssr-child-count attribute is set', async () => {
    element = await fixture(html`<sbb-link-list data-ssr-child-count="3"></sbb-link-list>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  describe('property sync', () => {
    const assertLinks = (root: Element, assertion: (link: SbbLinkElement) => boolean): boolean =>
      Array.from(root.querySelectorAll('sbb-link')).every(assertion);

    it('should render all sbb-link instances with defaults (variant="block", size="s", no negative)', async () => {
      element = await fixture(html` <sbb-link-list> ${sbbLinkSnippet} </sbb-link-list>`);

      expect(assertLinks(element, (l) => l.variant === 'block' && l.size === 's' && !l.negative)).to
        .be.true;
    });

    it('should render all sbb-link instances with size="m"', async () => {
      element = await fixture(html` <sbb-link-list size="m"> ${sbbLinkSnippet} </sbb-link-list>`);

      expect(assertLinks(element, (l) => l.size === 'm')).to.be.true;
    });

    it('should render all sbb-link instances with negative', async () => {
      element = await fixture(html` <sbb-link-list negative> ${sbbLinkSnippet} </sbb-link-list>`);

      expect(assertLinks(element, (l) => l.negative)).to.be.true;
    });
  });
});
