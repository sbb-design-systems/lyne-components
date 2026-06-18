import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbDownloadInfoElement } from './download-info.component.ts';

import '../../download.ts';

describe(`sbb-download-info`, () => {
  let element: SbbDownloadInfoElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-download-info></sbb-download-info>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbDownloadInfoElement);
  });

  it('renders provided values in order, skipping empty ones', async () => {
    element.type = 'FOO';
    element.nonAccessible = true;
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('FOO, not accessible');
  });

  it('renders the size as is when it contains non-numeric characters', async () => {
    element.size = '123 KB';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('123 KB');
  });

  it('formats a numeric size to the closest unit', async () => {
    element.size = '1234567';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('1 MB');
  });

  it('formats a zero byte size as 0 B', async () => {
    element.size = '0';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('0 B');
  });

  it('formats an ISO 8601 changed date', async () => {
    element.changed = '2026-12-24';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent).to.contain('12/24/2026');
  });

  it('renders an invalid changed date as is', async () => {
    element.changed = 'not-a-date';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('not-a-date');
  });

  it('falls back to the parent download extension as type', async () => {
    const download = await fixture(html`
      <sbb-download href="files/report.pdf">
        <sbb-download-info></sbb-download-info>
      </sbb-download>
    `);
    const info = download.querySelector<SbbDownloadInfoElement>('sbb-download-info')!;
    await waitForLitRender(info);
    expect(info.shadowRoot!.textContent!.trim()).to.be.equal('PDF');
  });
});
