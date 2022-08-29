import { h } from '@stencil/core';
import sbbButtonEvents from '../sbb-button/sbb-button.events';
import { SbbToast } from './sbb-toast';
import { newSpecPage } from '@stencil/core/testing';
import {
  InterfaceToastAction,
  InterfaceToastConfiguration,
  InterfaceToastIcon,
  InterfaceToastLink,
} from './sbb-toast.custom';

describe('sbb-toast', () => {
  it('renders the toast with the message', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-1" role="status" tabindex="-1" style="z-index: 60001;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <span class="toast-text">
                Message
              </span>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-toast>
    `);
  });

  it('renders the toast with the message and the close icon action', async () => {
    const action: InterfaceToastIcon = {
      role: 'cancel',
      type: 'icon',
    };
    const config: InterfaceToastConfiguration = {
      action,
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-2" role="dialog" style="z-index: 60002;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center toast--button-icon">
              <span class="toast-text">
                Message
              </span>
              <span class="toast-spacer"></span>
              <span class="toast-action toast-action-icon">
                <sbb-button class="sbb-focusable toast-button" icon="" icondescription="Icon. Close the toast." role="cancel" size="m" variant="transparent-negative">
                  <span class="toast-close"></span>
                </sbb-button>
              </span>
            </div>
         </div>
        </mock:shadow-root>
      </sbb-toast>
    `);
  });

  it('renders the toast with the message and the link action', async () => {
    const action: InterfaceToastLink = {
      accessibilityDescribedby: null,
      accessibilityLabel: 'Link accessible label',
      accessibilityLabelledby: null,
      href: 'https://www.sbb.ch',
      label: 'Link',
      role: null,
      type: 'link',
    };
    const config: InterfaceToastConfiguration = {
      action,
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-3" role="dialog" style="z-index: 60003;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <span class="toast-text">
                Message
              </span>
              <span class="toast-spacer"></span>
              <span class="toast-action">
                <sbb-link accessibilitylabel="Link accessible label" class="sbb-focusable toast-link" href="https://www.sbb.ch" negative="" variant="inline">
                  Link
                </sbb-link>
              </span>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-toast>
    `);
  });

  it('renders the toast with the message and the button action', async () => {
    const action: InterfaceToastAction = {
      handler: jest.fn(),
      label: 'Button',
      role: null,
      type: 'action',
    };
    const config: InterfaceToastConfiguration = {
      action,
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-4" role="dialog" style="z-index: 60004;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <span class="toast-text">
                Message
              </span>
              <span class="toast-spacer"></span>
              <span class="toast-action">
                <sbb-link class="sbb-focusable toast-button" negative="" type="button" variant="inline">
                  <span class="toast-label">
                    Button
                  </span>
                </sbb-link>
              </span>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-toast>
    `);
  });

  it('renders the toast with the icon and the message', async () => {
    const config: InterfaceToastConfiguration = {
      icon: 'icon-name',
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-5" role="status" tabindex="-1" style="z-index: 60005;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <sbb-icon name='icon-name'></sbb-icon>
              <span class="toast-text">
                Message
              </span>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-toast>
      `);
  });

  it('renders the toast with the icon as slot and the message', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
      icon: (
        <svg height="24" width="24">
          <circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red" />
        </svg>
      ),
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config}></sbb-toast>,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-6" role="status" tabindex="-1" style="z-index: 60006;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <svg height="24" width="24">
                <circle cx="50" cy="50" fill="red" r="24" stroke="black" stroke-width="3"></circle>
              </svg>
              <span class="toast-text">
                Message
              </span>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-toast>
    `);
  });

  it('renders the toast with the icon and message and the close icon action', async () => {
    const action: InterfaceToastIcon = {
      role: 'cancel',
      type: 'icon',
    };
    const config: InterfaceToastConfiguration = {
      action,
      icon: 'icon-name',
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-7" role="dialog" style="z-index: 60007;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center toast--button-icon">
              <sbb-icon name='icon-name'></sbb-icon>
              <span class="toast-text">
               Message
              </span>
              <span class="toast-spacer"></span>
              <span class="toast-action toast-action-icon">
                <sbb-button class="sbb-focusable toast-button" icon="" icondescription="Icon. Close the toast." role="cancel" size="m" variant="transparent-negative">
                  <span class="toast-close"></span>
                </sbb-button>
              </span>
           </div>
         </div>
        </mock:shadow-root>
      </sbb-toast>
    `);
  });

  it('renders the toast with the icon and the message and the link action', async () => {
    const action: InterfaceToastLink = {
      accessibilityDescribedby: null,
      accessibilityLabel: 'Link accessible label',
      accessibilityLabelledby: null,
      href: 'https://www.sbb.ch',
      label: 'Link',
      role: null,
      type: 'link',
    };
    const config: InterfaceToastConfiguration = {
      action,
      icon: 'icon-name',
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-8" role="dialog" style="z-index: 60008;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <sbb-icon name='icon-name'></sbb-icon>
              <span class="toast-text">
                Message
              </span>
              <span class="toast-spacer"></span>
              <span class="toast-action">
                <sbb-link accessibilitylabel="Link accessible label" class="sbb-focusable toast-link" href="https://www.sbb.ch" negative="" variant="inline">
                  Link
                </sbb-link>
              </span>
            </div>
          </div>
      </mock:shadow-root>
      </sbb-toast>
   `);
  });

  it('renders the toast with the icon and the message and the button action', async () => {
    const action: InterfaceToastAction = {
      handler: jest.fn(),
      label: 'Button',
      role: null,
      type: 'action',
    };
    const config: InterfaceToastConfiguration = {
      action,
      icon: 'icon-name',
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-9" role="dialog" style="z-index: 60009;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <sbb-icon name='icon-name'></sbb-icon>
              <span class="toast-text">
                Message
              </span>
              <span class="toast-spacer"></span>
              <span class="toast-action">
                <sbb-link class="sbb-focusable toast-button" negative="" type="button" variant="inline">
                  <span class="toast-label">
                    Button
                  </span>
                </sbb-link>
              </span>
            </div>
          </div>
         </mock:shadow-root>
      </sbb-toast>
   `);
  });

  it('renders the toast with the icon and the message and the button action with custom CSS', async () => {
    const action: InterfaceToastAction = {
      cssClass: 'my-css-class',
      handler: jest.fn(),
      label: 'Button',
      role: null,
      type: 'action',
    };
    const config: InterfaceToastConfiguration = {
      action,
      icon: 'icon-name',
      message: 'Message',
    };
    const { root } = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-10" role="dialog" style="z-index: 60010;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <sbb-icon name='icon-name'></sbb-icon>
              <span class="toast-text">
                Message
              </span>
              <span class="toast-spacer"></span>
              <span class="toast-action">
                <sbb-link class="my-css-class sbb-focusable toast-button" negative="" type="button" variant="inline">
                  <span class="toast-label">
                    Button
                  </span>
                </sbb-link>
              </span>
            </div>
          </div>
         </mock:shadow-root>
      </sbb-toast>
    `);
  });

  it('renders the toast and present it', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
      timeout: 500,
    };
    const page = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(page.root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-11" role="status" tabindex="-1" style="z-index: 60011;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <span class="toast-text">
                Message
              </span>
            </div>
          </div>
         </mock:shadow-root>
      </sbb-toast>
    `);

    const toast = page.doc.querySelector('sbb-toast');

    expect(toast).not.toBeNull();
    expect(toast.config.message).toEqual('Message');

    const returnOnDismiss = {
      data: undefined,
      role: 'timeout',
    };

    await toast.present();
    await expect(toast.onDidDismiss()).resolves.toStrictEqual(returnOnDismiss);
  });

  it('renders the toast and present and dismiss it programmatically', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
      timeout: 5000,
    };
    const page = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(page.root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-12" role="status" tabindex="-1" style="z-index: 60012;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center">
              <span class="toast-text">
                Message
              </span>
            </div>
          </div>
         </mock:shadow-root>
      </sbb-toast>
    `);

    const toast = page.doc.querySelector('sbb-toast');

    expect(toast).not.toBeNull();
    expect(toast.config.message).toEqual('Message');

    const returnOnDismiss = {
      data: 'Data passed closing the toast',
      role: 'Programmatically closed',
    };

    await toast.present();
    const onDidDismiss = toast.onDidDismiss();
    const onWillDismiss = toast.onWillDismiss();

    await toast.dismiss('Data passed closing the toast', 'Programmatically closed');
    await expect(onWillDismiss).resolves.toStrictEqual(returnOnDismiss);
    await expect(onDidDismiss).resolves.toStrictEqual(returnOnDismiss);
  });

  it('renders the toast and present and dismiss it from the close icon', async () => {
    const action: InterfaceToastIcon = {
      role: 'cancel',
      type: 'icon',
    };
    const config: InterfaceToastConfiguration = {
      action,
      message: 'Message',
    };
    const page = await newSpecPage({
      components: [SbbToast],
      template: () => <sbb-toast config={config} />,
    });

    expect(page.root).toEqualHtml(`
      <sbb-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="sbb-overlay-13" role="dialog" style="z-index: 60013;">
        <mock:shadow-root>
          <div class="toast-wrapper">
            <div class="toast toast-vertical-end toast-horizontal-center toast--button-icon">
              <span class="toast-text">
                Message
              </span>
              <span class="toast-spacer"></span>
              <span class="toast-action toast-action-icon">
                <sbb-button class="sbb-focusable toast-button" icon="" icondescription="Icon. Close the toast." role="cancel" size="m" variant="transparent-negative">
                  <span class="toast-close"></span>
                </sbb-button>
             </span>
            </div>
          </div>
         </mock:shadow-root>
      </sbb-toast>
    `);

    const toast = page.doc.querySelector('sbb-toast');

    expect(toast).not.toBeNull();
    expect(toast.config.message).toEqual('Message');

    const returnOnDismiss = {
      data: null,
      role: 'cancel',
    };

    await toast.present();
    const onDidDismiss = toast.onDidDismiss();
    // query and click for button doesn't work; click event is correctly caught
    toast.dispatchEvent(new CustomEvent(sbbButtonEvents.click));
    await expect(onDidDismiss).resolves.toStrictEqual(returnOnDismiss);
  });
});
