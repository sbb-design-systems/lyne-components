import { SbbWagon } from './sbb-wagon';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-wagon', () => {
  it('renders as type wagon', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon occupancy="unknown" wagon-class="1" type="wagon" label="38" blocked-passage="previous"/>',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon blocked-passage="previous" label="38" occupancy="unknown" type="wagon" wagon-class="1">
          <mock:shadow-root>
            <div class="sbb-wagon">
              <span class="sbb-wagon__label">
                <span class="sbb-wagon__label-screenreader">Train coach with the number 38. First Class. No occupancy forecast available. No passage to the previous train coach.</span>
                <span class="sbb-wagon__label-text" aria-hidden="true">38</span>
              </span>
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
  it('renders as type wagon with custom accessibility text', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon occupancy="none" wagon-class="1" type="wagon" label="38" custom-accessibility-label="This text overwrites every default text"/>',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon label="38" occupancy="none" type="wagon" wagon-class="1" custom-accessibility-label="This text overwrites every default text">
          <mock:shadow-root>
            <div class="sbb-wagon">
              <span class="sbb-wagon__label">
                <span class="sbb-wagon__label-screenreader">This text overwrites every default text</span>
                <span class="sbb-wagon__label-text" aria-hidden="true">38</span>
              </span>
              <div class="sbb-wagon__compartment">
                <sbb-icon name="utilization-none"></sbb-icon>
                <span class="sbb-wagon__class">
                  <span aria-hidden="true">1</span>
                </span>
              </div>
              <div class="sbb-wagon__icons">
                <p aria-hidden="true" id="sbb-wagon-list-title-2"></p>
                <ul aria-labelledby="sbb-wagon-list-title-2"></ul>
                <span hidden>
                  <slot></slot>
                </span>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-wagon>
      `);
  });
  it('renders as type locomotive with additional accessibility text.', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon type="locomotive" additional-accessibility-text="Top of the train"/>',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon type="locomotive" additional-accessibility-text="Top of the train">
          <mock:shadow-root>
            <div class="sbb-wagon">
              <span class="sbb-wagon__label">
                <span class="sbb-wagon__label-screenreader">Locomotive. Top of the train.</span>
                <span class="sbb-wagon__label-text" aria-hidden="true"></span>
              </span>
              <div class="sbb-wagon__compartment">
                <svg aria-hidden="true" width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.7906 4.42719C19.9743 1.93152 23.129 0.5 26.4452 0.5H53.5548C56.871 0.5 60.0257 1.93152 62.2094 4.4272L76.2094 20.4272C82.7157 27.8629 77.4351 39.5 67.5548 39.5H12.4452C2.56489 39.5 -2.71566 27.8629 3.79058 20.4272L17.7906 4.42719Z" stroke="#767676"></path></svg>
              </div>
              </div>
          </mock:shadow-root>
        </sbb-wagon>
      `);
  });
  it('renders as type closed wagon without number', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon type="closed" />',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon type="closed">
          <mock:shadow-root>
            <div class="sbb-wagon">
              <span class="sbb-wagon__label">
                <span class="sbb-wagon__label-screenreader">Closed train coach.</span>
                <span class="sbb-wagon__label-text" aria-hidden="true"></span>
              </span>
              <div class="sbb-wagon__compartment"></div>
            </div>
          </mock:shadow-root>
        </sbb-wagon>
      `);
  });
  it('renders as type closed wagon with number', async () => {
    const { root } = await newSpecPage({
      components: [SbbWagon],
      html: '<sbb-wagon type="closed" label="47"/>',
    });

    expect(root).toEqualHtml(`
        <sbb-wagon type="closed" label="47">
          <mock:shadow-root>
            <div class="sbb-wagon">
              <span class="sbb-wagon__label">
                <span class="sbb-wagon__label-screenreader">Closed train coach with the number 47.</span>
                <span class="sbb-wagon__label-text" aria-hidden="true">47</span>
              </span>
              <div class="sbb-wagon__compartment"></div>
            </div>
          </mock:shadow-root>
        </sbb-wagon>
      `);
  });
});
