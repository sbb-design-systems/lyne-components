import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing/index.js';
import { fixture } from '../../core/testing/private/index.js';

import './train.js';

describe(`sbb-train`, () => {
  it('should render', async () => {
    const root = await fixture(
      html`<sbb-train direction-label="Driving direction" station="Bern"></sbb-train>`,
    );

    await waitForLitRender(root);
    expect(root).dom.to.be.equal(
      `<sbb-train direction-label="Driving direction" station="Bern" direction="left"></sbb-train>`,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('should hide direction label element if not present', async () => {
    const root = await fixture(html`<sbb-train></sbb-train>`);

    expect(root.shadowRoot!.querySelector('.sbb-train__direction')).to.be.null;
  });

  it('should hide station element if not present', async () => {
    const root = await fixture(html`<sbb-train direction-label="Driving direction"></sbb-train>`);

    expect(root.shadowRoot!.querySelector('.sbb-train__direction-station')).to.be.null;
  });

  it('should display left indicator if direction is left', async () => {
    const root = await fixture(
      html`<sbb-train
        direction-label="Driving direction"
        station="Bern"
        direction="left"
      ></sbb-train>`,
    );

    expect(
      root.shadowRoot!.querySelector('.sbb-train__direction-arrow')!.getAttribute('name'),
    ).to.contain('-left-');
  });

  it('should display right indicator if direction is right', async () => {
    const root = await fixture(
      html`<sbb-train
        direction-label="Driving direction"
        station="Bern"
        direction="right"
      ></sbb-train>`,
    );

    expect(
      root.shadowRoot!.querySelector('.sbb-train__direction-arrow')!.getAttribute('name'),
    ).to.contain('-right-');
  });

  describe('accessibility label', () => {
    it('should create aria label with no direction-label and no accessibility-label', async () => {
      const root = await fixture(html`<sbb-train></sbb-train>`);

      expect(
        root.shadowRoot!.querySelector('.sbb-train__direction-label-sr')!.textContent!.trim(),
      ).to.be.equal('Train.');
    });

    it('should create aria label with direction-label and no accessibility-label', async () => {
      const root = await fixture(
        html`<sbb-train direction-label="Direction of Travel"></sbb-train>`,
      );

      expect(
        root.shadowRoot!.querySelector('.sbb-train__direction-label-sr')!.textContent!.trim(),
      ).to.be.equal('Train.');
    });

    it('should create aria label with direction-label, station and no accessibility-label', async () => {
      const root = await fixture(
        html`<sbb-train direction-label="Direction of Travel" station="Bern"></sbb-train>`,
      );

      expect(
        root.shadowRoot!.querySelector('.sbb-train__direction-label-sr')!.textContent!.trim(),
      ).to.be.equal('Train, Direction of Travel Bern.');
    });

    it('should create aria label with direction-label, station and accessibility-label', async () => {
      const root = await fixture(
        html`<sbb-train
          direction-label="Direction of Travel"
          station="Bern"
          accessibility-label="Additional label"
        ></sbb-train>`,
      );

      expect(
        root.shadowRoot!.querySelector('.sbb-train__direction-label-sr')!.textContent!.trim(),
      ).to.be.equal('Train, Direction of Travel Bern, Additional label.');
    });
  });
});
