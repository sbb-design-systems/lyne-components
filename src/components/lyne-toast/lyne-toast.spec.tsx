import { h } from '@stencil/core';
import {InterfaceToastConfiguration, LyneToast} from './lyne-toast';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-toast', () => {
  it('renders with only message property', async () => {
    const config = {
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

  it('renders with only close icon action', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
      action: { type: "action", role: "cancel", label: '', handler: () => {}}
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
                     <span></span>
                   </button>
                 </span>

               </div>
             </div>
        </mock:shadow-root>
      </lyne-toast>
      `);
  });

  it('renders with only link action', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
      action: { type: "link", role: "cancel", label: 'Link', href: 'https://www.sbb.ch'}
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
                    <a class="lyne-focusable" href="https://www.sbb.ch" role="cancel" tabindex="0" target="_blank">
                     Link
                   </a>
                 </span>

               </div>
             </div>
        </mock:shadow-root>
      </lyne-toast>
      `);
  });

  it('renders with only button action', async () => {
    const config: InterfaceToastConfiguration = {
      message: 'Message',
      action: { type: "action", role: "cancel", label: 'Click me!', handler: () => console.log('Test')}
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
                   <button class="lyne-focusable toast-button" part="button" role="cancel" tabindex="0" type="button">
                     <span>
                        Click me!
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
