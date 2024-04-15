import { virtual } from '@guidepup/virtual-screen-reader';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './form-field.js';
import '../../button/mini-button.js';

describe('should announce the form-field', () => {
  it('read', async () => {
    await fixture(html`
      <sbb-form-field>
        <label>Example</label>
        <input placeholder="input field" />
        <sbb-mini-button slot="suffix" icon-name="pen-small" aria-label="edit"></sbb-mini-button>
      </sbb-form-field>
    `);

    // Start Virtual.
    await virtual.start({ container: document.body });

    // FIXME is the form field ignored?
    // Move to the label.
    await virtual.next();
    // Expect on the spoken phrase for the label element.
    expect(await virtual.lastSpokenPhrase()).to.equal('Example');
    // Move to the input.
    await virtual.next();
    // Expect on the spoken phrase for the input element.
    expect(await virtual.lastSpokenPhrase()).to.equal('textbox, Example, placeholder input field');
    // Move to the button.
    await virtual.next();
    // Expect on the spoken phrase for the button element.
    expect(await virtual.lastSpokenPhrase()).to.equal('button, edit');

    // Stop Virtual.
    await virtual.stop();
  });
});
