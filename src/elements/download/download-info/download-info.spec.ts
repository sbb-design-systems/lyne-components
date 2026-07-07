import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';
import type { SbbDownloadElement } from '../download/download.component.ts';

import { SbbDownloadInfoElement } from './download-info.component.ts';

import '../../download.ts';

describe(`sbb-download-info`, () => {
  let element: SbbDownloadInfoElement;
  const elementInternals = elementInternalsSpy();

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

  it('renders all values in order separated by commas', async () => {
    element.type = 'PDF';
    element.size = '1234567';
    element.nonAccessible = true;
    element.changed = '2026-12-24';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal(
      'PDF, 1 MB, not accessible, 24.12.2026',
    );
  });

  it('renders nothing when no values are provided', async () => {
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('');
  });

  it('renders only the type without a trailing separator', async () => {
    element.type = 'PDF';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('PDF');
  });

  it('renders only the changed date', async () => {
    element.changed = '2026-12-24';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('24.12.2026');
  });

  it('joins size and changed when the type is omitted', async () => {
    element.size = '1234567';
    element.changed = '2026-12-24';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('1 MB, 24.12.2026');
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

  it('formats 1024 bytes as 1 KB', async () => {
    element.size = '1024';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('1 KB');
  });

  it('renders a decimal size as is', async () => {
    element.size = '1.5';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent!.trim()).to.be.equal('1.5');
  });

  it('formats an ISO 8601 changed date', async () => {
    element.changed = '2026-12-24';
    await waitForLitRender(element);
    expect(element.shadowRoot!.textContent).to.contain('24.12.2026');
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
    const info = download.querySelector('sbb-download-info')!;
    await waitForLitRender(info);
    expect(info.shadowRoot!.textContent!.trim()).to.be.equal('PDF');
  });

  it('updates the type when moved to a download with a different extension', async () => {
    const root = await fixture(html`
      <div>
        <sbb-download id="pdf" href="files/report.pdf">
          <sbb-download-info></sbb-download-info>
        </sbb-download>
        <sbb-download id="zip" href="files/archive.zip"></sbb-download>
      </div>
    `);
    const info = root.querySelector<SbbDownloadInfoElement>('sbb-download-info')!;
    await waitForLitRender(info);
    expect(info.shadowRoot!.textContent!.trim()).to.be.equal('PDF');

    root.querySelector('#zip')!.appendChild(info);
    await waitForLitRender(info);
    expect(info.shadowRoot!.textContent!.trim()).to.be.equal('ZIP');
  });

  it('updates the type when the parent download href changes', async () => {
    const download = await fixture<SbbDownloadElement>(html`
      <sbb-download href="files/report.pdf">
        <sbb-download-info></sbb-download-info>
      </sbb-download>
    `);
    const info = download.querySelector<SbbDownloadInfoElement>('sbb-download-info')!;
    await waitForLitRender(info);
    expect(info.shadowRoot!.textContent!.trim()).to.be.equal('PDF');

    download.href = 'files/archive.zip';
    await waitForLitRender(info);
    expect(info.shadowRoot!.textContent!.trim()).to.be.equal('ZIP');
  });

  it('strips the query string when deriving the type from the parent href', async () => {
    const download = await fixture(html`
      <sbb-download href="files/report.pdf?v=2" label="Report">
        <sbb-download-info></sbb-download-info>
      </sbb-download>
    `);
    const info = download.querySelector('sbb-download-info')!;
    await waitForLitRender(info);
    expect(info.shadowRoot!.textContent!.trim()).to.be.equal('PDF');
  });

  it('hides the redundant type from assistive technology when parent has no label', async () => {
    const download = await fixture<SbbDownloadElement>(html`
      <sbb-download href="files/report.pdf">
        <sbb-download-info></sbb-download-info>
      </sbb-download>
    `);
    const info = download.querySelector('sbb-download-info')!;
    await waitForLitRender(info);
    expect(elementInternals.get(info)!.ariaLabel).not.to.contain('PDF');

    download.label = 'label';
    await waitForLitRender(info);
    expect(elementInternals.get(info)!.ariaLabel).to.contain('PDF');
  });

  it('does not hide the type when the parent has an explicit label', async () => {
    const download = await fixture<SbbDownloadElement>(html`
      <sbb-download href="files/report.pdf" label="Annual report">
        <sbb-download-info></sbb-download-info>
      </sbb-download>
    `);
    const info = download.querySelector('sbb-download-info')!;
    await waitForLitRender(info);
    expect(elementInternals.get(info)!.ariaLabel).to.contain('PDF');
  });
});
