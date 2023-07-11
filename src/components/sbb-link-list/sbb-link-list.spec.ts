import { SbbLinkList } from './sbb-link-list';
import { newSpecPage } from '@stencil/core/testing';
import { AnyHTMLElement } from '@stencil/core/internal';

describe('sbb-link-list', () => {
  const sbbLinkSnippet = `
    <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Rückerstattungen</sbb-link>
    <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Fundbüro</sbb-link>
    <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Beschwerden</sbb-link>
    <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Lob aussprechen</sbb-link>
    <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Sachbeschädigung melden</sbb-link>
  `;

  it('rendered with a slotted title', async () => {
    const { root } = await newSpecPage({
      components: [SbbLinkList],
      html: `
      <sbb-link-list title-level="2">
        <span slot="title">Help &amp; Contact</span>
        ${sbbLinkSnippet}
      </sbb-link-list>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link-list title-level="2" orientation="vertical" size="s">
          <mock:shadow-root>
            <div class="sbb-link-list-wrapper">
              <sbb-title id="sbb-link-list-title-id" level="2" visual-level="5" class="sbb-link-list-title">
                <slot name="title"></slot>
              </sbb-title>
              <ul aria-labelledby="sbb-link-list-title-id" class="sbb-link-list">
                <li><slot name="link-0"></slot></li>
                <li><slot name="link-1"></slot></li>
                <li><slot name="link-2"></slot></li>
                <li><slot name="link-3"></slot></li>
                <li><slot name="link-4"></slot></li>
              </ul>
              <span hidden>
                <slot></slot>
              </span>
            </div>
          </mock:shadow-root>
          <span slot="title">Help &amp; Contact</span>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-0">Rückerstattungen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-1">Fundbüro</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-2">Beschwerden</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-3">Lob aussprechen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-4">Sachbeschädigung melden</sbb-link>
        </sbb-link-list>
      `);
  });

  it('rendered with a title from properties', async () => {
    const { root } = await newSpecPage({
      components: [SbbLinkList],
      html: `
      <sbb-link-list title-level="2" title-content="Help &amp; Contact">
        ${sbbLinkSnippet}
      </sbb-link-list>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link-list
            title-level="2"
            title-content="Help &amp; Contact"
            orientation="vertical"
            size="s"
          >
          <mock:shadow-root>
            <div class="sbb-link-list-wrapper">
              <sbb-title id="sbb-link-list-title-id" level="2" visual-level="5" class="sbb-link-list-title">
                <slot name="title">
                Help &amp; Contact
              </sbb-title>
              <ul aria-labelledby="sbb-link-list-title-id" class="sbb-link-list">
                <li><slot name="link-0"></slot></li>
                <li><slot name="link-1"></slot></li>
                <li><slot name="link-2"></slot></li>
                <li><slot name="link-3"></slot></li>
                <li><slot name="link-4"></slot></li>
              </ul>
              <span hidden>
                <slot></slot>
              </span>
            </div>
          </mock:shadow-root>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-0">Rückerstattungen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-1">Fundbüro</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-2">Beschwerden</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-3">Lob aussprechen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-4">Sachbeschädigung melden</sbb-link>
        </sbb-link-list>
      `);
  });

  it('rendered without a title', async () => {
    const { root } = await newSpecPage({
      components: [SbbLinkList],
      html: `
        <sbb-link-list>
          ${sbbLinkSnippet}
        </sbb-link-list>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link-list orientation="vertical" size="s">
          <mock:shadow-root>
            <div class="sbb-link-list-wrapper">
              <ul class="sbb-link-list">
                <li><slot name="link-0"></slot></li>
                <li><slot name="link-1"></slot></li>
                <li><slot name="link-2"></slot></li>
                <li><slot name="link-3"></slot></li>
                <li><slot name="link-4"></slot></li>
              </ul>
              <span hidden>
                <slot></slot>
              </span>
            </div>
          </mock:shadow-root>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-0">Rückerstattungen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-1">Fundbüro</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-2">Beschwerden</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-3">Lob aussprechen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-4">Sachbeschädigung melden</sbb-link>
        </sbb-link-list>
      `);
  });

  describe('property sync', () => {
    const assertLinks = (
      root: AnyHTMLElement,
      assertion: (link: HTMLSbbLinkElement) => boolean,
    ): boolean => Array.from(root.querySelectorAll('sbb-link')).every(assertion);

    it('should render all sbb-link instances with defaults (variant="block", size="s", no negative)', async () => {
      const { root } = await newSpecPage({
        components: [SbbLinkList],
        html: `
          <sbb-link-list>
            ${sbbLinkSnippet}
          </sbb-link-list>`,
      });

      expect(
        assertLinks(root, (l) => l.variant === 'block' && l.size === 's' && !l.negative),
      ).toBeTruthy();
    });

    it('should render all sbb-link instances with size="m"', async () => {
      const { root } = await newSpecPage({
        components: [SbbLinkList],
        html: `
          <sbb-link-list size="m">
            ${sbbLinkSnippet}
          </sbb-link-list>`,
      });

      expect(assertLinks(root, (l) => l.size === 'm')).toBeTruthy();
    });

    it('should render all sbb-link instances with negative', async () => {
      const { root } = await newSpecPage({
        components: [SbbLinkList],
        html: `
          <sbb-link-list negative>
            ${sbbLinkSnippet}
          </sbb-link-list>`,
      });

      expect(assertLinks(root, (l) => l.negative)).toBeTruthy();
    });
  });
});
