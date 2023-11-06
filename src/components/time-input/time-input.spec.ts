import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './time-input';

describe('sbb-time-input', () => {
  it('renders', async () => {
    const root = await fixture(
      html` <span>
        <sbb-time-input input="id-1"></sbb-time-input>
        <input id="id-1" />
      </span>`,
    );
    const elem = root.querySelector('sbb-time-input');

    expect(root).dom.to.be.equal(`
      <span>
        <sbb-time-input input="id-1">
        </sbb-time-input>
        <input id="id-1" placeholder="HH:MM" type="text" maxlength="5" inputmode="numeric" data-sbb-time-input>
      </span>
    `);
    expect(elem).shadowDom.to.be.equal(`
      <p role="status"></p>
    `);
  });
});
