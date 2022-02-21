jest.mock('../../global/guid');

import { LyneLinkList } from './lyne-link-list';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-link-list', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneLinkList],
      html: `<lyne-link-list title-level="2" title-text="Help &amp; Contact" variant="positive">
                <li class='link-list__item' slot='link-list__item'>
                  <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Rückerstattungen' text-size='s' variant='positive'></lyne-link>
                </li>
                <li class='link-list__item' slot='link-list__item'>
                  <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Fundbüro' text-size='s' variant='positive'></lyne-link>
                </li>
                <li class='link-list__item' slot='link-list__item'>
                  <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Beschwerden' text-size='s' variant='positive'></lyne-link>
                </li>
                <li class='link-list__item' slot='link-list__item'>
                  <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Lob aussprechen' text-size='s' variant='positive'></lyne-link>
                </li>
                <li class='link-list__item' slot='link-list__item'>
                  <lyne-link href-value='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html' text='Sachbeschädigung melden' text-size='s' variant='positive'></lyne-link>
                </li>
            </lyne-link-list>`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-link-list
            title-level="2"
            title-text="Help &amp; Contact"
            variant="positive"
        >
          <mock:shadow-root>
            <div>
                <lyne-title id="title-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" level="2" text="Help &amp; Contact" variant="positive" visual-level="5"></lyne-title>
                <ul aria-labelledby="title-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" class="link-list link-list--vertical" role="list">
                    <slot name="link-list__item">
                    </slot>
                </ul>
            </div>
          </mock:shadow-root>
          <li class="link-list__item" slot="link-list__item">
            <lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Rückerstattungen" text-size="s" variant="positive"></lyne-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Fundbüro" text-size="s" variant="positive"></lyne-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Beschwerden" text-size="s" variant="positive"></lyne-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Lob aussprechen" text-size="s" variant="positive"></lyne-link>
          </li>
          <li class="link-list__item" slot="link-list__item">
            <lyne-link href-value="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html" text="Sachbeschädigung melden" text-size="s" variant="positive"></lyne-link>
          </li>
        </lyne-link-list>
      `);
  });

});

