import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-train';
import '../sbb-icon';

describe('sbb-train', () => {
  it('should render', async () => {
    const root = await fixture(
      html`<sbb-train direction-label="Driving direction" station="Bern"></sbb-train>`,
    );

    expect(root).dom.to.be.equal(
      `<sbb-train direction-label="Driving direction" station="Bern" direction="left"></sbb-train>`,
    );
    expect(root).shadowDom.to.be.equal(
      `
      <div class="sbb-train">
        <h6 class="sbb-train__direction-label-sr">Train, Driving direction Bern.</h6>
        <ul class="sbb-train__wagons" aria-label="Coaches of the train"></ul>
        <span hidden>
          <slot></slot>
        </span>
        <div class="sbb-train__direction" aria-hidden="true">
          <div class="sbb-train__direction-heading">
            <span class="sbb-train__direction-label">Driving direction</span>
            <span class="sbb-train__direction-station">Bern</span>
          </div>
          <div class="sbb-train__direction-indicator">
            <div class="sbb-train__sticky-wrapper">
              <sbb-icon aria-hidden="true" data-namespace="default" role="img" class="sbb-train__direction-arrow" name="chevron-small-left-small"></sbb-icon>
            </div>
          </div>
        </div>
      `,
    );
  });

  it('should hide direction label element if not present', async () => {
    const root = await fixture(html`<sbb-train></sbb-train>`);

    expect(root.shadowRoot.querySelector('.sbb-train__direction')).to.be.null;
  });

  it('should hide station element if not present', async () => {
    const root = await fixture(html`<sbb-train direction-label="Driving direction"></sbb-train>`);

    expect(root.shadowRoot.querySelector('.sbb-train__direction-station')).to.be.null;
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
      root.shadowRoot.querySelector('.sbb-train__direction-arrow').getAttribute('name'),
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
      root.shadowRoot.querySelector('.sbb-train__direction-arrow').getAttribute('name'),
    ).to.contain('-right-');
  });

  describe('accessibility label', () => {
    it('should create aria label with no direction-label and no accessibility-label', async () => {
      const root = await fixture(html`<sbb-train></sbb-train>`);

      expect(
        root.shadowRoot.querySelector('.sbb-train__direction-label-sr').textContent.trim(),
      ).to.be.equal('Train.');
    });

    it('should create aria label with direction-label and no accessibility-label', async () => {
      const root = await fixture(
        html`<sbb-train direction-label="Direction of Travel"></sbb-train>`,
      );

      expect(
        root.shadowRoot.querySelector('.sbb-train__direction-label-sr').textContent.trim(),
      ).to.be.equal('Train.');
    });

    it('should create aria label with direction-label, station and no accessibility-label', async () => {
      const root = await fixture(
        html`<sbb-train direction-label="Direction of Travel" station="Bern"></sbb-train>`,
      );

      expect(
        root.shadowRoot.querySelector('.sbb-train__direction-label-sr').textContent.trim(),
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
        root.shadowRoot.querySelector('.sbb-train__direction-label-sr').textContent.trim(),
      ).to.be.equal('Train, Direction of Travel Bern, Additional label.');
    });
  });
});
