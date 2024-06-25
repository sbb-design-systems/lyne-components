import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './footer.js';
import '../button/button-link.js';
import '../button/secondary-button-link.js';
import '../clock.js';
import '../divider.js';
import '../link-list.js';
import '../link/block-link.js';

describe(`sbb-footer`, () => {
  const cases = {
    expanded: [false, true],
    negative: [false, true],
  };

  describeViewports({ viewports: ['zero', 'small', 'medium', 'wide'] }, () => {
    describeEach(cases, ({ expanded, negative }) => {
      it(
        'variant=default',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-footer ?expanded=${expanded} ?negative=${negative}>
                <sbb-link-list horizontal-from="medium" ?negative=${negative}>
                  <sbb-block-link> Refunds </sbb-block-link>
                  <sbb-block-link> Lost property office </sbb-block-link>
                </sbb-link-list>
              </sbb-footer>
            `,
            { padding: '0' },
          );
        }),
      );

      it(
        'variant=clock-columns',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-footer variant="clock-columns" ?expanded=${expanded} ?negative=${negative}>
                <div class="sbb-link-list-button-group">
                  <sbb-link-list
                    title-level="2"
                    title-content="Help &amp; Contact."
                    ?negative=${negative}
                  >
                    <sbb-block-link>Refunds</sbb-block-link>
                    <sbb-block-link>Lost property office</sbb-block-link>
                  </sbb-link-list>
                  <sbb-button-link size="m">All help topics</sbb-button-link>
                </div>
                <sbb-link-list title-level="2" title-content="More SBB." ?negative=${negative}>
                  <sbb-block-link> Jobs & careers </sbb-block-link>
                  <sbb-block-link> Rail traffic information </sbb-block-link>
                </sbb-link-list>
                <div class="sbb-link-list-button-group">
                  <span>
                    <sbb-title
                      level="2"
                      visual-level="5"
                      ?negative=${negative}
                      style=${styleMap({ margin: '0 0 var(--sbb-spacing-fixed-3x)' })}
                    >
                      Newsletter.
                    </sbb-title>
                    <p style=${styleMap({ margin: '0' })}>
                      Our newsletter regularly informs you of attractive offers from SBB via e-mail.
                    </p>
                  </span>
                  <sbb-secondary-button-link size="m"> Subscribe </sbb-secondary-button-link>
                </div>
                <sbb-clock now="01:59:27"></sbb-clock>
                <sbb-divider ?negative=${negative}></sbb-divider>
                <sbb-link-list horizontal-from="medium" ?negative=${negative}>
                  <sbb-block-link> Refunds </sbb-block-link>
                  <sbb-block-link> Lost property office </sbb-block-link>
                </sbb-link-list>
              </sbb-footer>
            `,
            { padding: '0' },
          );
        }),
      );
    });
  });
});
