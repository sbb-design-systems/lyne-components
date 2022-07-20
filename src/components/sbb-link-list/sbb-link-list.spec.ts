jest.mock('../../global/guid');

import { SbbLinkList } from './sbb-link-list';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-link-list', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbLinkList],
      html: `<sbb-link-list title-level="2" title-text="Help &amp; Contact" variant="positive">
                <li class='link-list__item' slot='link-list__item'>
                  <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='s'>Rückerstattungen</sbb-link>
                </li>
                <li class='link-list__item' slot='link-list__item'>
                  <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='s'>Fundbüro</sbb-link>
                </li>
                <li class='link-list__item' slot='link-list__item'>
                  <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='s'>Beschwerden</sbb-link>
                </li>
                <li class='link-list__item' slot='link-list__item'>
                  <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='s'>Lob aussprechen</sbb-link>
                </li>
                <li class='link-list__item' slot='link-list__item'>
                  <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='s'>Sachbeschädigung melden</sbb-link>
                </li>
            </sbb-link-list>`,
    });

    expect(root).toEqualHtml(`
        <sbb-link-list
            title-level="2"
            title-text="Help &amp; Contact"
            variant="positive"
        >
          <mock:shadow-root>
            <div>
                <sbb-title id="title-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" level="2" visual-level="5">Help &amp; Contact</sbb-title>
                <ul aria-labelledby="title-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" class="link-list link-list--vertical" role="list">
                    <slot name="link-list__item">
                    </slot>
                </ul>
            </div>
          </mock:shadow-root>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Rückerstattungen" text-size="s">Rückerstattungen</sbb-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Fundbüro" text-size="s">Fundbüro</sbb-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Beschwerden" text-size="s">Beschwerden</sbb-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Lob aussprechen" text-size="s">Lob aussprechen</sbb-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Sachbeschädigung melden" text-size="s">Sachbeschädigung melden</sbb-link>
          </li>
        </sbb-link-list>
      `);
  });
});
