jest.mock('../../global/guid');

import { SbbLinkList } from './sbb-link-list';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-link-list', () => {
  it('renders with title and links', async () => {
    const { root } = await newSpecPage({
      components: [SbbLinkList],
      html: `<sbb-link-list title-level="2" title-text="Help &amp; Contact">
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='s'>Rückerstattungen</sbb-link>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='s'>Fundbüro</sbb-link>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='s'>Beschwerden</sbb-link>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='s'>Lob aussprechen</sbb-link>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='s'>Sachbeschädigung melden</sbb-link>
            </sbb-link-list>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link-list
            title-level="2"
            title-text="Help &amp; Contact">
          <mock:shadow-root>
            <div>
              <sbb-title id="sbb-link-list-heading-1" level="2" visual-level="5">
                <span slot="title">Help &amp; Contact</span>
              </sbb-title>
              <ul aria-labelledby="sbb-link-list-heading-1" class="link-list" role="list">
                <li><slot name="link-0"></slot></li>
                <li><slot name="link-1"></slot></li>
                <li><slot name="link-2"></slot></li>
                <li><slot name="link-3"></slot></li>
                <li><slot name="link-4"></slot></li>
              </ul>
              <span>
                <slot></slot>
              </span>
              <slot name="button"></slot>
            </div>
          </mock:shadow-root>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-0" text="Rückerstattungen" text-size="s">Rückerstattungen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-1" text="Fundbüro" text-size="s">Fundbüro</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-2" text="Beschwerden" text-size="s">Beschwerden</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-3" text="Lob aussprechen" text-size="s">Lob aussprechen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-4" text="Sachbeschädigung melden" text-size="s">Sachbeschädigung melden</sbb-link>
        </sbb-link-list>
      `);
  });
  it('renders with only links', async () => {
    const { root } = await newSpecPage({
      components: [SbbLinkList],
      html: `<sbb-link-list>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='s'>Rückerstattungen</sbb-link>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='s'>Fundbüro</sbb-link>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='s'>Beschwerden</sbb-link>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='s'>Lob aussprechen</sbb-link>
             <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='s'>Sachbeschädigung melden</sbb-link>
            </sbb-link-list>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link-list>
          <mock:shadow-root>
            <div>
            <sbb-title id="sbb-link-list-heading-2" level="2" visual-level="5">
                <span slot="title"></span>
              </sbb-title>
              <ul class="link-list" role="list">
                <li><slot name="link-0"></slot></li>
                <li><slot name="link-1"></slot></li>
                <li><slot name="link-2"></slot></li>
                <li><slot name="link-3"></slot></li>
                <li><slot name="link-4"></slot></li>
              </ul>
              <span>
                <slot></slot>
              </span>
              <slot name="button"></slot>
            </div>
          </mock:shadow-root>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-0" text="Rückerstattungen" text-size="s">Rückerstattungen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-1" text="Fundbüro" text-size="s">Fundbüro</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-2" text="Beschwerden" text-size="s">Beschwerden</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-3" text="Lob aussprechen" text-size="s">Lob aussprechen</sbb-link>
          <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" slot="link-4" text="Sachbeschädigung melden" text-size="s">Sachbeschädigung melden</sbb-link>
        </sbb-link-list>
      `);
  });
});
