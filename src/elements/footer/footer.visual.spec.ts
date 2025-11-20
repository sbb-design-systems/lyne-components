import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.ts';

import './footer.component.ts';
import '../button/button-link.ts';
import '../button/secondary-button-link.ts';
import '../clock.ts';
import '../divider.ts';
import '../link-list.ts';
import '../link/block-link.ts';

describe(`sbb-footer`, () => {
  const colorCases = {
    negative: [false, true],
    emulateMedia: [
      { forcedColors: false, darkMode: false },
      { forcedColors: true, darkMode: false },
      { forcedColors: false, darkMode: true },
    ],
  };

  const cases = {
    expanded: [false, true],
  };

  describeViewports(() => {
    describeEach(cases, ({ expanded }) => {
      it(
        'variant=default',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-footer ?expanded=${expanded}>
                <sbb-link-list horizontal-from="large">
                  <sbb-block-link>Refunds</sbb-block-link>
                  <sbb-block-link>Lost property office</sbb-block-link>
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
              <sbb-footer variant="clock-columns" ?expanded=${expanded}>
                <div class="sbb-link-list-button-group">
                  <sbb-link-list title-level="2" title-content="Help &amp; Contact.">
                    <sbb-block-link>Refunds</sbb-block-link>
                    <sbb-block-link>Lost property office</sbb-block-link>
                  </sbb-link-list>
                  <sbb-button-link size="m">All help topics</sbb-button-link>
                </div>
                <sbb-link-list title-level="2" title-content="More SBB.">
                  <sbb-block-link>Jobs & careers</sbb-block-link>
                  <sbb-block-link>Rail traffic information</sbb-block-link>
                </sbb-link-list>
                <div class="sbb-link-list-button-group">
                  <span>
                    <sbb-title
                      level="2"
                      visual-level="5"
                      style="margin: 0 0 var(--sbb-spacing-fixed-3x)"
                    >
                      Newsletter.
                    </sbb-title>
                    <p style="margin: 0">
                      Our newsletter regularly informs you of attractive offers from SBB via e-mail.
                    </p>
                  </span>
                  <sbb-secondary-button-link size="m">Subscribe</sbb-secondary-button-link>
                </div>
                <sbb-clock now="01:59:27"></sbb-clock>
                <sbb-divider></sbb-divider>
                <sbb-link-list horizontal-from="large">
                  <sbb-block-link>Refunds</sbb-block-link>
                  <sbb-block-link>Lost property office</sbb-block-link>
                </sbb-link-list>
              </sbb-footer>
            `,
            { padding: '0' },
          );
        }),
      );
    });
  });

  describeViewports({ viewports: ['large'] }, () => {
    describeEach(colorCases, ({ negative, emulateMedia: { forcedColors, darkMode } }) => {
      it(
        'variant=clock-columns',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-footer variant="clock-columns" ?negative=${negative}>
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
                      style="margin: 0 0 var(--sbb-spacing-fixed-3x)"
                    >
                      Newsletter.
                    </sbb-title>
                    <p style="margin: 0">
                      Our newsletter regularly informs you of attractive offers from SBB via e-mail.
                    </p>
                  </span>
                  <sbb-secondary-button-link size="m"> Subscribe </sbb-secondary-button-link>
                </div>
                <sbb-clock now="01:59:27"></sbb-clock>
                <sbb-divider ?negative=${negative}></sbb-divider>
                <sbb-link-list horizontal-from="large" ?negative=${negative}>
                  <sbb-block-link> Refunds </sbb-block-link>
                  <sbb-block-link> Lost property office </sbb-block-link>
                </sbb-link-list>
              </sbb-footer>
            `,
            { padding: '0', darkMode, forcedColors },
          );
        }),
      );
    });
  });
});
