import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbDownloadElement } from './download.component.ts';

import '../../download.ts';

describe(`sbb-download`, () => {
  let element: SbbDownloadElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-download href="files/annual-report.pdf"></sbb-download>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbDownloadElement);
  });

  it('renders an anchor with the href', async () => {
    const anchor = element.shadowRoot!.querySelector('a');
    expect(anchor).to.have.attribute('href', 'files/annual-report.pdf');
  });

  it('always enables the download attribute on the anchor', async () => {
    const anchor = element.shadowRoot!.querySelector('a');
    expect(anchor).to.have.attribute('download');
  });

  it('keeps the download behavior enabled even when set to false', async () => {
    element.download = false;
    await waitForLitRender(element);
    expect(element.download).to.be.true;
    expect(element.shadowRoot!.querySelector('a')).to.have.attribute('download');
  });

  it('uses the file name of the href as default label', async () => {
    const label = element.shadowRoot!.querySelector('.sbb-download__label');
    expect(label!.textContent!.trim()).to.be.equal('annual-report.pdf');
  });

  it('uses the explicit label when provided', async () => {
    element.label = 'Annual report';
    await waitForLitRender(element);
    const label = element.shadowRoot!.querySelector('.sbb-download__label');
    expect(label!.textContent!.trim()).to.be.equal('Annual report');
  });

  it('derives the icon from the href extension', async () => {
    const icon = element.shadowRoot!.querySelector('sbb-icon');
    expect(icon).to.have.attribute('name', 'document-pdf-small');
  });

  it('falls back to a generic document icon for unknown extensions', async () => {
    element.href = 'files/notes.xyz';
    await waitForLitRender(element);
    const icon = element.shadowRoot!.querySelector('sbb-icon');
    expect(icon).to.have.attribute('name', 'document-standard-small');
  });

  it('prefers an explicitly set icon name', async () => {
    element.iconName = 'circle-information-small';
    await waitForLitRender(element);
    const icon = element.shadowRoot!.querySelector('sbb-icon');
    expect(icon).to.have.attribute('name', 'circle-information-small');
  });

  it('renders the presentational button', async () => {
    const button = element.shadowRoot!.querySelector('sbb-secondary-button-static');
    expect(button).to.have.attribute('icon-name', 'download-small');
  });

  it('reflects the color attribute on the host', async () => {
    expect(element).to.have.attribute('color', 'white');
    element.color = 'milk';
    await waitForLitRender(element);
    expect(element).to.have.attribute('color', 'milk');
  });

  it('moves a slotted sbb-download-info to the info slot', async () => {
    const el = await fixture<SbbDownloadElement>(html`
      <sbb-download href="files/annual-report.pdf">
        <sbb-download-info size="1234567"></sbb-download-info>
      </sbb-download>
    `);
    await waitForLitRender(el);
    expect(el.querySelector('sbb-download-info')!.slot).to.be.equal('info');
  });

  it('keeps custom content in the unnamed slot', async () => {
    const el = await fixture<SbbDownloadElement>(html`
      <sbb-download href="files/annual-report.pdf">
        <span>Custom content</span>
      </sbb-download>
    `);
    await waitForLitRender(el);
    expect(el.querySelector('span')!.slot).to.be.equal('');
  });

  it('supports both custom content and a sbb-download-info simultaneously', async () => {
    const el = await fixture<SbbDownloadElement>(html`
      <sbb-download href="files/annual-report.pdf">
        <span>Custom content</span>
        <sbb-download-info size="1234567"></sbb-download-info>
      </sbb-download>
    `);
    await waitForLitRender(el);
    expect(el.querySelector('span')!.slot).to.be.equal('');
    expect(el.querySelector('sbb-download-info')!.slot).to.be.equal('info');
  });

  it('renders without any slotted content', async () => {
    const el = await fixture<SbbDownloadElement>(
      html`<sbb-download href="files/annual-report.pdf"></sbb-download>`,
    );
    await waitForLitRender(el);
    assert.instanceOf(el, SbbDownloadElement);
    expect(el.querySelector('sbb-download-info')).to.be.null;
    expect(el.shadowRoot!.querySelector('.sbb-download__label')!.textContent!.trim()).to.be.equal(
      'annual-report.pdf',
    );
  });

  it('links sbb-download-info correctly', async () => {
    const el = await fixture<SbbDownloadElement>(
      html`<sbb-download href="files/annual-report.pdf">
        <sbb-download-info></sbb-download-info>
      </sbb-download>`,
    );
    await waitForLitRender(el);

    // downloadInfoElement should be in ariaDescribedByElements
    const downloadInfoElement = el.querySelector('sbb-download-info');
    const linkElement = el.shadowRoot!.querySelector('a')!;
    const customContentElement = el.shadowRoot!.querySelector('.sbb-download__custom-content')!;
    expect(linkElement.ariaDescribedByElements).to.deep.equal([
      customContentElement,
      downloadInfoElement,
    ]);

    // When removing, no ariaDescribedByElements entry should be defined
    downloadInfoElement?.remove();
    await waitForLitRender(el);
    expect(linkElement.ariaDescribedByElements).to.deep.equal([customContentElement]);

    // When re-adding, downloadInfoElement should be in ariaDescribedByElements
    el.appendChild(downloadInfoElement!);
    await waitForLitRender(el);
    expect(linkElement.ariaDescribedByElements).to.deep.equal([
      customContentElement,
      downloadInfoElement,
    ]);
  });
});
