import { virtual } from '@guidepup/virtual-screen-reader';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './button.js';

describe('should navigate to the button and announce it', () => {
  it('read', async () => {
    await fixture(html`<sbb-button>Button 1</sbb-button>`);

    // Start Virtual.
    await virtual.start({ container: document.body });

    // Move to the button.
    await virtual.next();

    // Expect on the spoken phrase for the button element.
    expect(await virtual.lastSpokenPhrase()).to.equal('button, Button 1');

    // Stop Virtual.
    await virtual.stop();
  });
});
