import { h } from '@stencil/core';
import {
  InterfaceToastConfiguration, LyneToast
} from './lyne-toast';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-toast', () => {
  it('renders with only message property', async () => {
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

});
