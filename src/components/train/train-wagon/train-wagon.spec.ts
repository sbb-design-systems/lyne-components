import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing/index.js';
import { fixture } from '../../core/testing/private/index.js';

import type { SbbTrainWagonElement } from './train-wagon.js';
import './train-wagon.js';
import '../../icon/index.js';
import '../../timetable-occupancy-icon/index.js';

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
      '[aria-hidden=false], [aria-label]:not(.sbb-train-wagon__icons-list), .sbb-screen-reader-only:not(.sbb-train-wagon__label > span)',
    ),
  ).map((entry) =>
    entry.hasAttribute('aria-label')
      ? entry.getAttribute('aria-label')!
      : entry.textContent!.replace(/\s+/g, ' ').trim(),
  );
}

describe(`sbb-train-wagon`, () => {
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
      await expect(root).shadowDom.to.be.equalSnapshot();
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
              slot="li-0"
            ></sbb-icon>
          </sbb-train-wagon>
        `,
      );

      await expect(root).shadowDom.to.be.equalSnapshot();
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
            slot="li-0"></sbb-icon>
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="sa-rs"
            role="img"
            slot="li-1"></sbb-icon>
        </sbb-train-wagon>
      `,
      );
      await expect(root).shadowDom.to.be.equalSnapshot();
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
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    it('should render as type closed wagon without number', async () => {
      const root = await fixture(html`<sbb-train-wagon type="closed"></sbb-train-wagon>`);

      expect(root).dom.to.be.equal(
        `
          <sbb-train-wagon type="closed">
          </sbb-train-wagon>
        `,
      );
      await expect(root).shadowDom.to.be.equalSnapshot();
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
