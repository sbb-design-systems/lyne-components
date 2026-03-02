import { html, nothing } from 'lit';

import { describeViewports, describeEach, visualDiffDefault } from '../core/testing/private.ts';

import './bar-container.component.ts';
import '../link/block-link.ts';
import '../card.ts';

describe('sbb-bar-container', () => {
  const cases = {
    color: ['white', 'milk'],
    withLink: [false, true],
  };

  describeViewports(() => {
    describeEach(cases, ({ color, withLink }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-bar-container color=${color}>
              ${withLink
                ? html`<sbb-block-link icon-name="arrow-left-small" href="/" negative>
                    Zurich
                  </sbb-block-link>`
                : nothing}
              <sbb-card>
                <span class="sbb-text-m">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit
                  odio, ut blandit libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis
                  leo. Curabitur malesuada, nibh ac blandit vehicula, urna sem scelerisque magna,
                  sed tincidunt neque arcu ac justo.
                </span>
              </sbb-card>
            </sbb-bar-container>
          `);
        }),
      );
    });
  });
});
