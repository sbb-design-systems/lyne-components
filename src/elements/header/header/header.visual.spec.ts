import { html, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './header.js';
import '../header-link.js';
import '../header-button.js';
import '../../menu.js';

describe(`sbb-header`, () => {
  const loremIpsumTemplate = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada augue. Morbi
      eget tristique nisl, sit amet dapibus erat. Donec tempor, metus et aliquam ultrices, nulla mi
      mollis urna, a lacinia mauris risus mattis massa. Quisque cursus sollicitudin enim in
      malesuada. Maecenas nec hendrerit augue. Duis porttitor mattis molestie. Sed imperdiet velit
      at dui ultrices, viverra scelerisque nisi dapibus. Nulla urna lectus, gravida eu dapibus vel,
      mattis non turpis. Nunc interdum et justo sed faucibus. Vestibulum interdum commodo mi, sed
      eleifend odio posuere in. Nunc non dui venenatis, eleifend est ut, varius odio. Quisque augue
      ante, mollis eu lorem id, commodo cursus risus.
  `;

  const template = ({ expanded }: { expanded?: boolean }): TemplateResult => html`
    <style>
      ${' .last-element {display: none;} '}
      ${' @media screen and (width >= 840px) { .last-element { display: block; } }'}
      ${' @media screen and (width < 1023px) { .sbb-header-spacer { display: none; } }'}
    </style>
    <sbb-header ?expanded=${expanded}>
      <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
        Menu
      </sbb-header-button>
      <div class="sbb-header-spacer"></div>
      <sbb-header-link href="https://www.sbb.ch" target="_blank" icon-name="magnifying-glass-small"
        >Search
      </sbb-header-link>
      <sbb-header-button icon-name="user-small" class="sbb-header-shrinkable">
        Christina Müller
      </sbb-header-button>
      <sbb-header-button icon-name="globe-small" class="last-element"> English </sbb-header-button>
    </sbb-header>
    <div class=${expanded ? 'sbb-page-spacing-expanded' : 'sbb-page-spacing'}>
      ${loremIpsumTemplate}
    </div>
  `;

  describeViewports({ viewports: ['zero', 'ultra'], viewportHeight: 300 }, () => {
    for (const expanded of [true, false]) {
      it(
        `expanded=${expanded}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template({ expanded }), { padding: '0' });
        }),
      );
    }

    it(
      `scroll`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({}), { padding: '0' });

        // Scroll page down
        window.scrollTo(0, document.body.scrollHeight);
      }),
    );
  });
});
