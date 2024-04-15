import { virtual } from '@guidepup/virtual-screen-reader';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import './title.js';

describe('should navigate to titles and announce them', () => {
  it('read', async () => {
    await fixture(html`
      <sbb-title level="1" visual-level="2">Sample: "Title Text"</sbb-title>
      <sbb-title level="2" visual-level="3">Another sample: "Title Text 2"</sbb-title>
    `);

    // Start Virtual.
    await virtual.start({ container: document.body });

    // Move to the title.
    await virtual.next();

    // Expect on the spoken phrase for the title element.
    expect(await virtual.lastSpokenPhrase()).to.equal('heading, Sample: "Title Text", level 1');

    // Move to the second title.
    await virtual.next();

    // Expect on the spoken phrase for the second title element.
    expect(await virtual.lastSpokenPhrase()).to.equal(
      'heading, Another sample: "Title Text 2", level 2',
    );

    // Stop Virtual.
    await virtual.stop();
  });
});
