import { h } from '@stencil/core';
import { LyneToast } from './lyne-toast';
import { newSpecPage } from '@stencil/core/testing';
import {
  InterfaceToastAction, InterfaceToastConfiguration, InterfaceToastIcon, InterfaceToastLink
} from './lyne-toast.custom';

describe('lyne-toast', () => {

  it('renders the toast with the message', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-1" role="status" tabindex="-1" style="z-index: 60001;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-text">
                  Message
                </span>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-toast>
      `);
  });

  it('renders the toast with the message and the close icon action', async () => {
    const action: InterfaceToastIcon = {
      role: 'cancel',
      type: 'icon'
    };
    const config: InterfaceToastConfiguration = {
      action,
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-2" role="dialog" style="z-index: 60002;">
          <mock:shadow-root>
           <div class="toast-wrapper">
             <div class="toast toast-vertical-end toast-horizontal-center">
               <span class="toast-text">
                 Message
               </span>
               <span class="toast-spacer"></span>
               <span class="toast-action">
                 <button class="lyne-focusable toast-button" role="cancel" type="button">
                   <span class="toast-close"></span>
                 </button>
               </span>
             </div>
           </div>
          </mock:shadow-root>
        </lyne-toast>
      `);
  });

  it('renders the toast with the message and the link action', async () => {
    const action: InterfaceToastLink = {
      href: 'https://www.sbb.ch',
      label: 'Link',
      role: null,
      type: 'link'
    };
    const config: InterfaceToastConfiguration = {
      action,
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-3" role="dialog" style="z-index: 60003;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-spacer"></span>
                <span class="toast-action">
                  <a class="lyne-focusable toast-link" href="https://www.sbb.ch" rel="noreferrer" target="_blank">
                    Link
                  </a>
                </span>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-toast>
      `);
  });

  it('renders the toast with the message and the button action', async () => {
    const action: InterfaceToastAction = {
      handler: jest.fn(),
      label: 'Button',
      role: null,
      type: 'action'
    };
    const config: InterfaceToastConfiguration = {
      action,
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-4" role="dialog" style="z-index: 60004;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-spacer"></span>
                <span class="toast-action">
                  <button class="lyne-focusable toast-button" type="button">
                    <span class="toast-label">
                      Button
                    </span>
                  </button>
                </span>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-toast>
      `);
  });

  it('renders the toast with the icon and the message', async () => {
    const config: InterfaceToastConfiguration = {
      icon: '<svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>',
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-5" role="status" tabindex="-1" style="z-index: 60005;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-icon">
                  <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
                </span>
                <span class="toast-text">
                  Message
                </span>
              </div>
            </div>
          </mock:shadow-root>
        </lyne-toast>
      `);
  });

  it('renders the toast with the icon as slot and the message', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (
        <lyne-toast config={config}>
          <span slot='icon'>
            <svg height='24' width='24'>
              <circle cx='50' cy='50' r='24' stroke='black' stroke-width='3' fill='red'/>
            </svg>
          </span>
        </lyne-toast>
      )
    });

    expect(root)
      .toEqualHtml(`
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-6" role="status" tabindex="-1" style="z-index: 60006;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-icon">
                  <slot name="icon"></slot>
                </span>
                <span class="toast-text">
                  Message
                </span>
              </div>
            </div>
          </mock:shadow-root>
          <span slot="icon">
            <svg height="24" width="24">
              <circle cx="50" cy="50" fill="red" r="24" stroke="black" stroke-width="3"></circle>
            </svg>
          </span>
        </lyne-toast>
      `);
  });

  it('renders the toast with the icon and message and the close icon action', async () => {
    const action: InterfaceToastIcon = {
      role: 'cancel',
      type: 'icon'
    };
    const config: InterfaceToastConfiguration = {
      action,
      icon: '<svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>',
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-7" role="dialog" style="z-index: 60007;">
          <mock:shadow-root>
           <div class="toast-wrapper">
             <div class="toast toast-vertical-end toast-horizontal-center">
               <span class="toast-icon">
                 <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
               </span>
               <span class="toast-text">
                 Message
               </span>
               <span class="toast-spacer"></span>
               <span class="toast-action">
                 <button class="lyne-focusable toast-button" role="cancel" type="button">
                   <span class="toast-close">
                   </span>
                 </button>
               </span>
             </div>
           </div>
          </mock:shadow-root>
        </lyne-toast>
      `);
  });

  it('renders the toast with the icon and the message and the link action', async () => {
    const action: InterfaceToastLink = {
      href: 'https://www.sbb.ch',
      label: 'Link',
      role: null,
      type: 'link'
    };
    const config: InterfaceToastConfiguration = {
      action,
      icon: '<svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>',
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
         <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-8" role="dialog" style="z-index: 60008;">
            <mock:shadow-root>
              <div class="toast-wrapper">
                <div class="toast toast-vertical-end toast-horizontal-center">
                  <span class="toast-icon">
                    <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
                  </span>
                  <span class="toast-text">
                    Message
                  </span>
                  <span class="toast-spacer"></span>
                  <span class="toast-action">
                     <a class="lyne-focusable toast-link" href="https://www.sbb.ch" rel="noreferrer" target="_blank">
                      Link
                    </a>
                  </span>
                </div>
              </div>
         </mock:shadow-root>
       </lyne-toast>
       `);
  });

  it('renders the toast with the icon and the message and the button action', async () => {
    const action: InterfaceToastAction = {
      handler: jest.fn(),
      label: 'Button',
      role: null,
      type: 'action'
    };
    const config: InterfaceToastConfiguration = {
      action,
      icon: '<svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>',
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
       <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-9" role="dialog" style="z-index: 60009;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-icon">
                  <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
                </span>
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-spacer"></span>
                <span class="toast-action">
                  <button class="lyne-focusable toast-button" type="button">
                    <span class="toast-label">
                      Button
                    </span>
                  </button>
                </span>
              </div>
            </div>
           </mock:shadow-root>
       </lyne-toast>
     `);
  });

  it('renders the toast with the icon and the message and the button action with custom CSS', async () => {
    const action: InterfaceToastAction = {
      cssClass: 'my-css-class',
      handler: jest.fn(),
      label: 'Button',
      role: null,
      type: 'action'
    };
    const config: InterfaceToastConfiguration = {
      action,
      icon: '<svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>',
      message: 'Message'
    };
    const {
      root
    } = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(root)
      .toEqualHtml(`
       <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-10" role="dialog" style="z-index: 60010;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-icon">
                  <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
                </span>
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-spacer"></span>
                <span class="toast-action">
                  <button class="lyne-focusable toast-button my-css-class" type="button">
                    <span class="toast-label">
                      Button
                    </span>
                  </button>
                </span>
              </div>
            </div>
           </mock:shadow-root>
       </lyne-toast>
     `);
  });

  it('renders the toast and present it', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
      timeout: 500
    };
    const page = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(page.root)
      .toEqualHtml(`
       <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-11" role="status" tabindex="-1" style="z-index: 60011;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-text">
                  Message
                </span>
              </div>
            </div>
           </mock:shadow-root>
       </lyne-toast>
     `);

    const toast = page.doc.querySelector('lyne-toast');

    expect(toast).not.toBeNull();
    expect(toast.config.message)
      .toEqual('Message');

    const returnOnDismiss = {
      data: undefined,
      role: 'timeout'
    };

    await toast.present();
    await expect(toast.onDidDismiss()).resolves.toStrictEqual(returnOnDismiss);

  });

  it('renders the toast and present and dismiss it programmatically', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
      timeout: 5000
    };
    const page = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(page.root)
      .toEqualHtml(`
       <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-12" role="status" tabindex="-1" style="z-index: 60012;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-text">
                  Message
                </span>
              </div>
            </div>
           </mock:shadow-root>
       </lyne-toast>
     `);

    const toast = page.doc.querySelector('lyne-toast');

    expect(toast).not.toBeNull();
    expect(toast.config.message)
      .toEqual('Message');

    const returnOnDismiss = {
      data: 'Data passed closing the toast',
      role: 'Programmatically closed'
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
      type: 'icon'
    };
    const config: InterfaceToastConfiguration = {
      action,
      message: 'Message'
    };
    const page = await newSpecPage({
      components: [LyneToast],
      template: () => (<lyne-toast config={config}></lyne-toast>)
    });

    expect(page.root)
      .toEqualHtml(`
       <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-13" role="dialog" style="z-index: 60013;">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-vertical-end toast-horizontal-center">
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-spacer"></span>
                <span class="toast-action">
                 <button class="lyne-focusable toast-button" role="cancel" type="button">
                   <span class="toast-close">
                   </span>
                 </button>
               </span>
              </div>
            </div>
           </mock:shadow-root>
       </lyne-toast>
     `);

    const toast = page.doc.querySelector('lyne-toast');

    expect(toast).not.toBeNull();
    expect(toast.config.message)
      .toEqual('Message');

    const returnOnDismiss = {
      data: null,
      role: 'cancel'
    };

    await toast.present();
    const onDidDismiss = toast.onDidDismiss();
    const toastButton = page.root.shadowRoot.querySelector('button');

    toastButton.click();
    await expect(onDidDismiss).resolves.toStrictEqual(returnOnDismiss);
  });

});
