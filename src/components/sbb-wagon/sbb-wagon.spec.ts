import { SbbWagon } from './sbb-wagon';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-wagon', () => {
  it('renders as type wagon', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon accessibility-label-occupation="Expected occupancy low" occupancy="none" wagon-class="1" type="wagon" accessibility-label-class="First class" accessibility-label-wagon="Train coach number" label="38"/>',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon accessibility-label-class="First class" accessibility-label-occupation="Expected occupancy low" accessibility-label-wagon="Train coach number" label="38" occupancy="none" type="wagon" wagon-class="1">
          <mock:shadow-root>
            <div class="sbb-wagon">
              <p class="sbb-wagon__label">
                <span>Train coach number 38. First class. Expected occupancy low.</span>
                <span aria-hidden="true">38</span>
              </p>
              <div class="sbb-wagon__compartment">
                <sbb-icon name="utilization-none"></sbb-icon>
                <span class="sbb-wagon__class">
                  <span aria-hidden="true">1</span>
                </span>
              </div>
              <div class="sbb-wagon__icons">
                <p aria-hidden="true" id="sbb-wagon-list-title-1"></p>
                <ul aria-labelledby="sbb-wagon-list-title-1"></ul>
                <span hidden>
                  <slot></slot>
                </span>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-wagon>
      `);
  });
  it('renders as type locomotive', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon type="locomotive" accessibility-label-wagon="Locomotive" accessibility-additional-wagon-text="Top of the train"/>',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon type="locomotive" accessibility-label-wagon="Locomotive" accessibility-additional-wagon-text="Top of the train">
          <mock:shadow-root>
            <div class="sbb-wagon">
              <p class="sbb-wagon__label">
                <span>Locomotive Top of the train</span>
              </p>
              <div class="sbb-wagon__compartment">
                <svg aria-hidden="true" width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.7906 4.42719C19.9743 1.93152 23.129 0.5 26.4452 0.5H53.5548C56.871 0.5 60.0257 1.93152 62.2094 4.4272L76.2094 20.4272C82.7157 27.8629 77.4351 39.5 67.5548 39.5H12.4452C2.56489 39.5 -2.71566 27.8629 3.79058 20.4272L17.7906 4.42719Z" stroke="#767676"></path></svg>
              </div>
              </div>
          </mock:shadow-root>
        </sbb-wagon>
      `);
  });
  it('renders as type blocked passage', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon type="blocked" accessibility-label-wagon="Passage blocked" />',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon type="blocked" accessibility-label-wagon="Passage blocked">
          <mock:shadow-root>
            <div class="sbb-wagon">
              <p class="sbb-wagon__label">
                <span>Passage blocked</span>
              </p>
              <div class="sbb-wagon__compartment">
                <span class="sbb-wagon__blocked-icon"></span>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-wagon>
      `);
  });
});
