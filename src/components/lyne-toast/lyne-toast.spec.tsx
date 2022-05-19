import { h } from '@stencil/core';
import {
  InterfaceToastAction, InterfaceToastConfiguration, InterfaceToastIcon, InterfaceToastLink, LyneToast
} from './lyne-toast';
import { newSpecPage } from '@stencil/core/testing';

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
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-1" role="status" tabindex="-1">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-bottom toast-center">
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
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-2" role="dialog" tabindex="-1">
          <mock:shadow-root>
           <div class="toast-wrapper">
             <div class="toast toast-bottom toast-center">
               <span class="toast-text">
                 Message
               </span>
               <span class="toast-action">
                 <button class="lyne-focusable toast-button" part="button" role="cancel" tabindex="0" type="button">
                   <span>
                   </span>
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
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-3" role="dialog" tabindex="-1">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-bottom toast-center">
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-action">
                  <a class="lyne-focusable" href="https://www.sbb.ch" tabindex="0" target="_blank">
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
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-4" role="dialog" tabindex="-1">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-bottom toast-center">
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-action">
                  <button class="lyne-focusable toast-button" part="button" tabindex="0" type="button">
                    <span>
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
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-5" role="status" tabindex="-1">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-bottom toast-center">
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
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-6" role="status" tabindex="-1">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-bottom toast-center">
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
        <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-7" role="dialog" tabindex="-1">
          <mock:shadow-root>
           <div class="toast-wrapper">
             <div class="toast toast-bottom toast-center">
               <span class="toast-icon">
                 <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
               </span>
               <span class="toast-text">
                 Message
               </span>
               <span class="toast-action">
                 <button class="lyne-focusable toast-button" part="button" role="cancel" tabindex="0" type="button">
                   <span>
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
         <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-8" role="dialog" tabindex="-1">
            <mock:shadow-root>
              <div class="toast-wrapper">
                <div class="toast toast-bottom toast-center">
                  <span class="toast-icon">
                    <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
                  </span>
                  <span class="toast-text">
                    Message
                  </span>
                  <span class="toast-action">
                     <a class="lyne-focusable" href="https://www.sbb.ch" tabindex="0" target="_blank">
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
       <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-9" role="dialog" tabindex="-1">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-bottom toast-center">
                <span class="toast-icon">
                  <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
                </span>
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-action">
                  <button class="lyne-focusable toast-button" part="button" tabindex="0" type="button">
                    <span>
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
       <lyne-toast aria-atomic="true" aria-live="polite" class="overlay-hidden" id="lyne-overlay-10" role="dialog" tabindex="-1">
          <mock:shadow-root>
            <div class="toast-wrapper">
              <div class="toast toast-bottom toast-center">
                <span class="toast-icon">
                  <svg height="24" width="24"><circle cx="50" cy="50" r="24" stroke="black" stroke-width="3" fill="red"/></svg>
                </span>
                <span class="toast-text">
                  Message
                </span>
                <span class="toast-action">
                  <button class="lyne-focusable toast-button my-css-class" part="button" tabindex="0" type="button">
                    <span>
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

});
