import { html, nothing, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import type { SbbDialogElement } from './dialog.component.ts';

import './dialog.component.ts';
import '../dialog-actions.ts';
import '../dialog-close-button.ts';
import '../dialog-content.ts';
import '../dialog-title.ts';
import '../../link/block-link.ts';
import '../../button/button.ts';
import '../../button/secondary-button.ts';

describe(`sbb-dialog`, () => {
  const negativeCases = [false, true];

  const dialogTitle = (): TemplateResult => html`
    <sbb-dialog-title>A describing title of the dialog</sbb-dialog-title>
  `;

  const dialogContent = (longContent = false): TemplateResult => html`
    <sbb-dialog-content>
      <p style="margin: 0">
        What really knocks me out is a book that, when you're all done reading it, you wish the
        author that wrote it was a terrific friend of yours and you could call him up on the phone
        whenever you felt like it.
      </p>
      ${longContent
        ? html`
            <p>
              What really knocks me out is a book that, when you're all done reading it, you wish
              the author that wrote it was a terrific friend of yours and you could call him up on
              the phone whenever you felt like it. That doesn't happen much, though.” ― J.D.
              Salinger, The Catcher in the Rye
            </p>
          `
        : nothing}
    </sbb-dialog-content>
  `;

  const dialogFooter = (negative = false): TemplateResult => html`
    <sbb-dialog-actions align-group="stretch" orientation="vertical" horizontal-from="large">
      <sbb-block-link
        align-self="start"
        icon-name="chevron-small-left-small"
        href="https://www.sbb.ch/en/"
        ?negative=${negative}
        sbb-dialog-close
      >
        Link
      </sbb-block-link>
      <sbb-secondary-button sbb-dialog-close ?negative=${negative}>Cancel</sbb-secondary-button>
      <sbb-button sbb-dialog-close sbb-focus-initial ?negative=${negative}>Confirm</sbb-button>
    </sbb-dialog-actions>
  `;

  describeViewports({ viewports: ['zero', 'large'], viewportHeight: 600 }, () => {
    for (const darkMode of [false, true]) {
      describe(`darkMode=${darkMode}`, () => {
        for (const negative of negativeCases) {
          it(
            `negative=${negative}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html`
                  <sbb-dialog ?negative=${negative}>
                    ${dialogTitle()}
                    <sbb-dialog-close-button></sbb-dialog-close-button>
                    ${dialogContent()} ${dialogFooter(negative)}
                  </sbb-dialog>
                `,
                { darkMode },
              );
              const dialog = setup.snapshotElement.querySelector<SbbDialogElement>('sbb-dialog')!;
              setup.withSnapshotElement(dialog);
              setup.withPostSetupAction(() => dialog.open());
            }),
          );
        }
      });
    }

    it(
      `no footer`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-dialog> ${dialogTitle()} ${dialogContent()} </sbb-dialog>
        `);
        const dialog = setup.snapshotElement.querySelector<SbbDialogElement>('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        setup.withPostSetupAction(() => dialog.open());
      }),
    );

    it(
      `no title with close button`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-dialog>
            <sbb-dialog-close-button></sbb-dialog-close-button>
            ${dialogContent()}
          </sbb-dialog>
        `);
        const dialog = setup.snapshotElement.querySelector<SbbDialogElement>('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        setup.withPostSetupAction(() => dialog.open());
      }),
    );

    it(
      `long content`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-dialog>
            ${dialogTitle()}
            <sbb-dialog-close-button></sbb-dialog-close-button>
            ${dialogContent(true)} ${dialogFooter()}
          </sbb-dialog>
        `);
        const dialog = setup.snapshotElement.querySelector<SbbDialogElement>('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        setup.withPostSetupAction(() => dialog.open());
      }),
    );

    it(
      `long content scrolled`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-dialog>
            ${dialogTitle()}
            <sbb-dialog-close-button></sbb-dialog-close-button>
            ${dialogContent(true)} ${dialogFooter()}
          </sbb-dialog>
        `);
        const dialog = setup.snapshotElement.querySelector<SbbDialogElement>('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        setup.withPostSetupAction(() => {
          dialog.open();
          const content = setup.snapshotElement.querySelector('sbb-dialog-content')!;
          content.scrollTo(0, content.scrollHeight);
        });
      }),
    );

    it(
      `backdrop=translucent`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <p>Other content visible in the background</p>
          <sbb-dialog backdrop="translucent">
            ${dialogTitle()} ${dialogContent()} ${dialogFooter()}
          </sbb-dialog>
        `);
        const dialog = setup.snapshotElement.querySelector<SbbDialogElement>('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        setup.withPostSetupAction(() => dialog.open());
      }),
    );

    it(
      `forcedColors=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-dialog>${dialogTitle()} ${dialogContent()} ${dialogFooter()} </sbb-dialog>`,
          { forcedColors: true },
        );

        const dialog = setup.snapshotElement.querySelector<SbbDialogElement>('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        setup.withPostSetupAction(() => dialog.open());
      }),
    );

    describeEach(
      {
        state: [
          { closeButton: true, title: true },
          { closeButton: false, title: true },
          { closeButton: true, title: false },
        ],
      },
      ({ state: { closeButton, title } }) => {
        it(
          `with intermediate element`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-dialog negative>
                <div>
                  ${title ? dialogTitle() : nothing}
                  ${closeButton
                    ? html`<sbb-dialog-close-button></sbb-dialog-close-button>`
                    : nothing}
                  ${dialogContent(true)} ${dialogFooter()}
                </div>
              </sbb-dialog>
            `);
            const dialog = setup.snapshotElement.querySelector<SbbDialogElement>('sbb-dialog')!;
            setup.withSnapshotElement(dialog);
            setup.withPostSetupAction(() => {
              dialog.open();
              const content = setup.snapshotElement.querySelector('sbb-dialog-content')!;
              content.scrollTo(0, content.scrollHeight);
            });
          }),
        );
      },
    );
  });
});
