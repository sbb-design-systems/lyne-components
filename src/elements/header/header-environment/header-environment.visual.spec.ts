import { html, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import './header-environment.component.ts';
import '../header.ts';
import '../header-link.ts';
import '../header-button.ts';
import '../../menu.ts';
import '../../logo.ts';

const template = (env: string): TemplateResult => html`
  <style>
    ${' .last-element, .sbb-header-spacer-logo {display: none;} '}
    ${' @media screen and (width >= 600px) { .last-element { display: block; } }'}
    ${' @media screen and (width < 1024px) { .sbb-header-spacer { display: none; } .sbb-header-spacer-logo { display: block; } }'}
  </style>
  <sbb-header>
    <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
      Menu
    </sbb-header-button>
    <div class="sbb-header-spacer"></div>
    <sbb-header-link href="https://www.sbb.ch" target="_blank" icon-name="magnifying-glass-small">
      Search
    </sbb-header-link>
    <sbb-header-button icon-name="user-small" class="sbb-header-shrinkable">
      Christina Müller
    </sbb-header-button>
    <sbb-header-button icon-name="globe-small" class="last-element" expand-from="small">
      English
    </sbb-header-button>
    <div class="sbb-header-spacer sbb-header-spacer-logo"></div>
    <a href="#" class="sbb-header-logo"><sbb-logo protective-room="none"></sbb-logo></a>
    <sbb-header-environment>${env}</sbb-header-environment>
  </sbb-header>
  <div class="sbb-page-spacing">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada augue. Morbi
    eget tristique nisl, sit amet dapibus erat. Donec tempor, metus et aliquam ultrices, nulla mi
    mollis urna, a lacinia mauris risus mattis massa.
  </div>
`;

describe(`sbb-header-environment`, () => {
  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 300 }, () => {
    for (const env of [`dev`, `edu`, `int`, `loc`, `test`, 'any']) {
      it(
        `env=${env}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(env), { padding: '0' });
        }),
      );
    }
  });

  describeViewports({ viewports: ['zero'], viewportHeight: 300 }, () => {
    describe('darkMode=true', () => {
      for (const env of [`dev`, `edu`, `int`, `loc`, `test`, 'any']) {
        it(
          `env=${env}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(template(env), { padding: '0', darkMode: true });
          }),
        );
      }
    });
  });
});
