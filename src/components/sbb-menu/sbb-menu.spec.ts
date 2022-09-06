import { SbbMenu } from './sbb-menu';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-menu', () => {
  // let component, page, trigger;

  // beforeEach(async () => {
  //   page = await newSpecPage({
  //     components: [SbbMenu],
  //     html: `<sbb-button id="menu-trigger" label="Menu trigger"></sbb-button>
  //           <sbb-menu trigger="menu-trigger">
  //             <sbb-link href="https://www.sbb.ch/en" variant="block">Profile</sbb-link>
  //             <sbb-menu-action icon="tick-small">View</sbb-menu-action>
  //             <sbb-menu-action icon="pen-small" amount="1" disabled>Edit</sbb-menu-action>
  //             <sbb-menu-action icon="swisspass-small" amount="2">Details</sbb-menu-action>
  //             <sbb-divider />
  //             <sbb-menu-action icon="cross-small">Cancel</sbb-menu-action>
  //           </sbb-menu>`,
  //     supportsShadowDom: true,
  //   });
  //   component = page.doc.querySelector('sbb-menu');
  //   trigger = page.doc.querySelector('sbb-button');
  // });

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbMenu],
      html: '<sbb-menu />',
    });

    expect(root).toEqualHtml(`
        <sbb-menu>
          <mock:shadow-root>
            <dialog class="sbb-menu">
              <div class="sbb-menu__content">
                <slot></slot>
              </div>
            </dialog>
          </mock:shadow-root>
        </sbb-menu>
      `);
  });

  // it('opens the menu', async () => {
  //   component.openMenu();
  //   await page.waitForChanges();

  //   expect(component).toHaveAttribute('open');
  // });

  // it('accepts id of an element to set the trigger', async () => {
  //   //
  // });

  // it('accepts an HTML element to set the trigger', async () => {
  //   //
  // });

  // it('attaches click handler to trigger', async () => {
  //   //
  // });

  // it('removes click handler from trigger, if changed', async () => {
  //   //
  // });
});
