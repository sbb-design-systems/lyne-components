import { SbbMenu } from './sbb-menu';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-menu', () => {
  // let component, page, trigger;

  // beforeEach(async () => {
  //   page = await newSpecPage({
  //     components: [SbbMenu],
  //     html: `<sbb-button id="menu-trigger" size="m" label="Menu trigger"></sbb-button>
  //             <sbb-menu>
  //               <sbb-menu-action icon="link-small" href="https://github.com/lyne-design-system/lyne-components">
  //                 View
  //               </sbb-menu-action>
  //               <sbb-menu-action icon="pen-small">
  //                 Edit
  //               </sbb-menu-action>
  //               <sbb-menu-action icon="swisspass-small" amount="2" disabled>
  //                 Details
  //               </sbb-menu-action>
  //               <sbb-divider />
  //               <sbb-menu-action icon="cross-small">
  //                 Cancel
  //               </sbb-menu-action>
  //             </sbb-menu>`,
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
});
