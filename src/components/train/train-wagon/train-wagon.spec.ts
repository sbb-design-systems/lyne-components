import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import type { SbbTrainWagonElement } from './train-wagon';
import '.';
import '../../icon';
import '../../timetable-occupancy-icon';

async function extractAriaLabels(
  properties: Partial<
    Pick<
      SbbTrainWagonElement,
      | 'type'
      | 'occupancy'
      | 'sector'
      | 'blockedPassage'
      | 'wagonClass'
      | 'label'
      | 'additionalAccessibilityText'
    >
  >,
): Promise<string[]> {
  const element = await fixture(html`<sbb-train-wagon></sbb-train-wagon>`);

  // attributes
  (
    [
      'type',
      'occupancy',
      'sector',
      'blockedPassage',
      'wagonClass',
      'label',
      'additionalAccessibilityText',
    ] as const
  ).forEach((attr) => {
    const attributeValue = properties[attr];
    // Convert camelCase to kebab-case
    const attributeName = attr.replace(
      /[A-Z]+(?![a-z])|[A-Z]/g,
      ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
    );
    element.setAttribute(attributeName, attributeValue ?? '');
  });

  await waitForLitRender(element);

  // Select all accessibility relevant text parts
  return Array.from(
    element.shadowRoot!.querySelectorAll(
      '[aria-hidden=false], [aria-label]:not(.sbb-train-wagon__icons-list), .sbb-screenreaderonly:not(.sbb-train-wagon__label > span)',
    ),
  ).map((entry) =>
    entry.hasAttribute('aria-label')
      ? entry.getAttribute('aria-label')!
      : entry.textContent!.replace(/\s+/g, ' ').trim(),
  );
}

describe('sbb-train-wagon', () => {
  describe('render', () => {
    it('should render as type wagon', async () => {
      const root = await fixture(
        html`<sbb-train-wagon
          occupancy="none"
          wagon-class="1"
          type="wagon"
          label="38"
          blocked-passage="previous"
        ></sbb-train-wagon>`,
      );

      expect(root).dom.to.be.equal(
        `
        <sbb-train-wagon data-has-visible-wagon-content blocked-passage="previous" label="38" occupancy="none" type="wagon" wagon-class="1">
        </sbb-train-wagon>
      `,
      );
      expect(root).shadowDom.to.be.equal(
        `
          <div class="sbb-train-wagon">
            <ul aria-label="Train coach" class="sbb-train-wagon__compartment">
              <li class="sbb-train-wagon__label" aria-hidden="false">
                <span class="sbb-screenreaderonly">Number, </span>
                38
              </li>
              <li class="sbb-train-wagon__class">
                <span class="sbb-screenreaderonly">First Class</span>
                <span aria-hidden="true">1</span>
              </li>
              <sbb-timetable-occupancy-icon
                data-namespace="default"
                class="sbb-train-wagon__occupancy"
                role="listitem"
                aria-label="No occupancy forecast available"
              ></sbb-timetable-occupancy-icon>
              <li class="sbb-screenreaderonly">No passage to the previous train coach</li>
            </ul>
            <span class="sbb-train-wagon__icons" hidden>
              <span class="sbb-train-wagon__icons-item" hidden><slot></slot></span>
            </span>
          </div>
        `,
      );
    });

    it('should render as type wagon with one icon', async () => {
      const root = await fixture(
        html`<sbb-train-wagon><sbb-icon name="sa-rs"></sbb-icon></sbb-train-wagon>`,
      );

      expect(root).dom.to.be.equal(
        `
          <sbb-train-wagon data-has-visible-wagon-content type="wagon">
            <sbb-icon
              aria-hidden="true"
              data-namespace="default"
              name="sa-rs"
              role="img"
            ></sbb-icon>
          </sbb-train-wagon>
        `,
      );
      expect(root).shadowDom.to.be.equal(
        `
          <div class="sbb-train-wagon">
            <ul
              aria-label="Train coach"
              class="sbb-train-wagon__compartment"
            >
              <li aria-hidden="true" class="sbb-train-wagon__label"></li>
              <sbb-timetable-occupancy-icon
                aria-label="No occupancy forecast available"
                class="sbb-train-wagon__occupancy"
                data-namespace="default"
                role="listitem"
              >
              </sbb-timetable-occupancy-icon>
            </ul>
            <span class="sbb-train-wagon__icons">
              <span class="sbb-train-wagon__icons-item">
                <span class="sbb-screenreaderonly">Additional wagon information</span>
                <slot></slot>
              </span>
            </span>
          </div>
        `,
      );
    });

    it('should render as type wagon with multiple icons', async () => {
      const root = await fixture(
        html`<sbb-train-wagon
          ><sbb-icon name="sa-rs"></sbb-icon><sbb-icon name="sa-rs"></sbb-icon
        ></sbb-train-wagon>`,
      );

      expect(root).dom.to.be.equal(
        `
        <sbb-train-wagon data-has-visible-wagon-content type="wagon">
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="sa-rs"
            role="img"
            slot="sbb-train-wagon-icon-0"></sbb-icon>
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="sa-rs"
            role="img"
            slot="sbb-train-wagon-icon-1"></sbb-icon>
        </sbb-train-wagon>
      `,
      );
      expect(root).shadowDom.to.be.equal(
        `
          <div class="sbb-train-wagon">
            <ul
              aria-label="Train coach"
              class="sbb-train-wagon__compartment"
            >
              <li aria-hidden="true" class="sbb-train-wagon__label"></li>
              <sbb-timetable-occupancy-icon
                aria-label="No occupancy forecast available"
                class="sbb-train-wagon__occupancy"
                data-namespace="default"
                role="listitem"
              >
              </sbb-timetable-occupancy-icon>
            </ul>
            <span class="sbb-train-wagon__icons">
              <ul aria-label="Additional wagon information" class="sbb-train-wagon__icons-list">
                <li class="sbb-train-wagon__icons-item">
                  <slot name="sbb-train-wagon-icon-0"></slot>
                </li>
                <li class="sbb-train-wagon__icons-item">
                  <slot name="sbb-train-wagon-icon-1"></slot>
                </li>
              </ul>
              <span class="sbb-train-wagon__icons-item" hidden>
                <slot></slot>
              </span>
            </span>
          </div>
        `,
      );
    });

    it('should render as type locomotive', async () => {
      const root = await fixture(
        html`<sbb-train-wagon
          type="locomotive"
          additional-accessibility-text="Top of the train"
        ></sbb-train-wagon>`,
      );

      expect(root).dom.to.be.equal(
        `
          <sbb-train-wagon type="locomotive" additional-accessibility-text="Top of the train">
          </sbb-train-wagon>
        `,
      );
      expect(root).shadowDom.to.be.equal(
        `
          <div class="sbb-train-wagon">
            <span class="sbb-train-wagon__compartment">
              <span class="sbb-screenreaderonly">
                Locomotive
              </span>
              <span aria-hidden="true" class="sbb-train-wagon__label"></span>
              <svg class="sbb-train-wagon__locomotive" aria-hidden="true" width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.7906 4.42719C19.9743 1.93152 23.129 0.5 26.4452 0.5H53.5548C56.871 0.5 60.0257 1.93152 62.2094 4.4272L76.2094 20.4272C82.7157 27.8629 77.4351 39.5 67.5548 39.5H12.4452C2.56489 39.5 -2.71566 27.8629 3.79058 20.4272L17.7906 4.42719Z" stroke="var(--sbb-train-wagon-shape-color-closed)"></path></svg>
            </span>
            <span class="sbb-screenreaderonly">
              , Top of the train
            </span>
          </div>
        `,
      );
    });

    it('should render as type closed wagon without number', async () => {
      const root = await fixture(html`<sbb-train-wagon type="closed"></sbb-train-wagon>`);

      expect(root).dom.to.be.equal(
        `
          <sbb-train-wagon type="closed">
          </sbb-train-wagon>
        `,
      );
      expect(root).shadowDom.to.be.equal(
        `
          <div class="sbb-train-wagon">
            <span class="sbb-train-wagon__compartment">
              <span class="sbb-screenreaderonly">
                Closed train coach
              </span>
              <span aria-hidden="true" class="sbb-train-wagon__label"></span>
            </span>
          </div>
        `,
      );
    });
  });

  it('should set aria labels correctly', async () => {
    expect(await extractAriaLabels({})).to.be.eql([]);
    expect(await extractAriaLabels({ type: 'locomotive' })).to.be.eql(['Locomotive']);
    expect(
      await extractAriaLabels({ type: 'closed', additionalAccessibilityText: `Don't enter` }),
    ).to.be.eql(['Closed train coach', `, Don't enter`]);
    expect(await extractAriaLabels({ type: 'wagon' })).to.be.eql(['Train coach']);

    expect(await extractAriaLabels({ sector: 'A', type: 'locomotive' })).to.be.eql([
      'Locomotive , Sector, A',
    ]);
    expect(await extractAriaLabels({ sector: 'A', type: 'closed' })).to.be.eql([
      'Closed train coach , Sector, A',
    ]);
    expect(await extractAriaLabels({ sector: 'A', type: 'wagon' })).to.be.eql([
      'Train coach',
      'Sector, A',
    ]);

    expect(
      await extractAriaLabels({
        sector: 'A',
        type: 'wagon',
        label: '38',
        wagonClass: '1',
        occupancy: 'none',
        blockedPassage: 'previous',
      }),
    ).to.be.eql([
      'Train coach',
      'Sector, A',
      'Number, 38',
      'First Class',
      'No occupancy forecast available',
      'No passage to the previous train coach',
    ]);

    expect(await extractAriaLabels({ type: 'wagon', wagonClass: '2' })).to.be.eql([
      'Train coach',
      'Second Class',
    ]);

    expect(await extractAriaLabels({ type: 'wagon', occupancy: 'low' })).to.be.eql([
      'Train coach',
      'Low to medium occupancy expected',
    ]);
    expect(await extractAriaLabels({ type: 'wagon', occupancy: 'medium' })).to.be.eql([
      'Train coach',
      'High occupancy expected',
    ]);
    expect(await extractAriaLabels({ type: 'wagon', occupancy: 'high' })).to.be.eql([
      'Train coach',
      'Very high occupancy expected',
    ]);

    expect(await extractAriaLabels({ type: 'wagon', blockedPassage: 'next' })).to.be.eql([
      'Train coach',
      'No passage to the next train coach',
    ]);
    expect(await extractAriaLabels({ type: 'wagon', blockedPassage: 'both' })).to.be.eql([
      'Train coach',
      'No passage to the next and previous train coach',
    ]);
    expect(await extractAriaLabels({ type: 'wagon', blockedPassage: 'none' })).to.be.eql([
      'Train coach',
    ]);
  });
});
