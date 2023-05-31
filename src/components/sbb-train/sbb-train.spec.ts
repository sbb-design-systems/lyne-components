import { SbbTrain } from './sbb-train';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-train', () => {
  it('should render', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrain],
      html: '<sbb-train direction-label="Driving direction" station="Bern" />',
    });

    expect(root).toEqualHtml(`
      <sbb-train direction-label="Driving direction" station="Bern" direction="left">
        <mock:shadow-root>
          <div class="sbb-train">
            <sbb-title visually-hidden level="3">Train, Driving direction Bern.</sbb-title>
            <ul class="sbb-train__wagons" aria-label="Coaches of the train"></ul>
            <span hidden>
              <slot />
            </span>
            <div class="sbb-train__direction" aria-hidden="true">
              <div class="sbb-train__direction-heading">
                <span class="sbb-train__direction-label">Driving direction</span>
                <span class="sbb-train__direction-station">Bern</span>
              </div>
              <div class="sbb-train__direction-indicator">
                <div class="sbb-train__sticky-wrapper">
                  <sbb-icon class="sbb-train__direction-arrow" name="chevron-small-left-small"></sbb-icon>
                </div>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-train>
      `);
  });

  it('should hide direction label element if not present', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrain],
      html: '<sbb-train/>',
    });

    expect(root.shadowRoot.querySelector('.sbb-train__direction')).toBeNull();
  });

  it('should hide station element if not present', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrain],
      html: '<sbb-train direction-label="Driving direction"/>',
    });

    expect(root.shadowRoot.querySelector('.sbb-train__direction-station')).toBeNull();
  });

  it('should display left indicator if direction is left', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrain],
      html: '<sbb-train direction-label="Driving direction" station="Bern" direction="left" />',
    });

    expect(
      root.shadowRoot.querySelector('.sbb-train__direction-arrow').getAttribute('name')
    ).toContain('-left-');
  });

  it('should display right indicator if direction is right', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrain],
      html: '<sbb-train direction-label="Driving direction" station="Bern" direction="right" />',
    });

    expect(
      root.shadowRoot.querySelector('.sbb-train__direction-arrow').getAttribute('name')
    ).toContain('-right-');
  });

  describe('accessibility label', () => {
    it('should create aria label with no direction-label and no accessibility-label', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrain],
        html: '<sbb-train />',
      });

      expect(root.shadowRoot.querySelector('sbb-title').textContent).toEqual('Train.');
    });

    it('should create aria label with direction-label and no accessibility-label', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrain],
        html: '<sbb-train direction-label="Direction of Travel"/>',
      });

      expect(root.shadowRoot.querySelector('sbb-title').textContent).toEqual('Train.');
    });

    it('should create aria label with direction-label, station and no accessibility-label', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrain],
        html: '<sbb-train direction-label="Direction of Travel" station="Bern"/>',
      });

      expect(root.shadowRoot.querySelector('sbb-title').textContent).toEqual(
        'Train, Direction of Travel Bern.'
      );
    });

    it('should create aria label with direction-label, station and accessibility-label', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrain],
        html: '<sbb-train direction-label="Direction of Travel" station="Bern" accessibility-label="Additional label"/>',
      });

      expect(root.shadowRoot.querySelector('sbb-title').textContent).toEqual(
        'Train, Direction of Travel Bern, Additional label.'
      );
    });
  });
});
