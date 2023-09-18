import { assert, expect, fixture } from '@open-wc/testing';
import { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import { SbbTrainFormation } from './train-formation';
import '../../icon';
import '../train';
import '../train-wagon';
import '../train-blocked-passage';

function extractAggregatedSectors(): Record<string, string>[] {
  return Array.from(
    document
      .querySelector('sbb-train-formation')
      .shadowRoot.querySelectorAll('.sbb-train-formation__sector'),
  ).map((sector) => {
    const computedStyles = getComputedStyle(sector);

    return {
      label: sector.querySelector('.sbb-train-formation__sector-sticky-wrapper').textContent.trim(),
      wagonCount: computedStyles.getPropertyValue('--sbb-train-formation-wagon-count'),
      blockedPassageCount: computedStyles.getPropertyValue(
        '--sbb-train-formation-wagon-blocked-passage-count',
      ),
    };
  });
}

async function createAndExtractAggregatedSectors(
  wagonsOrBlockedPassages: TemplateResult[],
): Promise<Record<string, string>[]> {
  await fixture(html`
    <sbb-train-formation>
      <sbb-train> ${wagonsOrBlockedPassages} </sbb-train>
    </sbb-train-formation>
  `);

  return extractAggregatedSectors();
}

describe('sbb-train-formation', () => {
  let element: SbbTrainFormation;

  it('should render', async () => {
    element = await fixture(html`<sbb-train-formation></sbb-train-formation>`);
    assert.instanceOf(element, SbbTrainFormation);
  });

  describe('sectors building', () => {
    it('should collect wagons with one sector', async () => {
      const aggregatedSectors = await createAndExtractAggregatedSectors([
        html`<sbb-train-wagon sector="A"></sbb-train-wagon>`,
        html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`,
        html`<sbb-train-wagon sector="A"></sbb-train-wagon>`,
        html`<sbb-train-wagon sector="A"></sbb-train-wagon>`,
      ]);

      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '1',
        },
      ]);
    });

    it('should collect wagons with two sectors', async () => {
      const aggregatedSectors = await createAndExtractAggregatedSectors([
        html`<sbb-train-wagon sector="A"></sbb-train-wagon>`,
        html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`,
        html`<sbb-train-wagon sector="B"></sbb-train-wagon>`,
        html`<sbb-train-wagon sector="B"></sbb-train-wagon>`,
      ]);

      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sec. A',
          wagonCount: '1',
          blockedPassageCount: '1',
        },
        {
          label: 'Sector B',
          wagonCount: '2',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should collect wagons when a middle sector name is missing', async () => {
      const aggregatedSectors = await createAndExtractAggregatedSectors([
        html`<sbb-train-wagon sector="A"></sbb-train-wagon>`,
        html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`,
        html`<sbb-train-wagon></sbb-train-wagon>`,
        html`<sbb-train-wagon sector="B"></sbb-train-wagon>`,
      ]);

      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '2',
          blockedPassageCount: '1',
        },
        {
          label: 'Sec. B',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should collect wagons when the first sector name is missing', async () => {
      const aggregatedSectors = await createAndExtractAggregatedSectors([
        html`<sbb-train-wagon></sbb-train-wagon>`,
        html`<sbb-train-blocked-passage></sbb-train-blocked-passage>`,
        html`<sbb-train-wagon sector="B"></sbb-train-wagon>`,
        html`<sbb-train-wagon sector="B"></sbb-train-wagon>`,
      ]);

      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector B',
          wagonCount: '3',
          blockedPassageCount: '1',
        },
      ]);
    });

    it('should collect wagons when skipping a wagon in the middle', async () => {
      const aggregatedSectors = await createAndExtractAggregatedSectors([
        html`<sbb-train-wagon sector="A"></sbb-train-wagon>`,
        html`<sbb-train-wagon></sbb-train-wagon>`,
        html`<sbb-train-wagon sector="A"></sbb-train-wagon>`,
      ]);
      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should collect over multiple trains', async () => {
      await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
          <sbb-train>
            <sbb-train-wagon sector="B"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sec. A',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
        {
          label: 'Sec. B',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should update sectors when sector property of a wagon is changing', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      element.querySelector('sbb-train-wagon').sector = 'Z';
      await waitForLitRender(element);

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sec. Z',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
        {
          label: 'Sector A',
          wagonCount: '2',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should update sectors when sector attribute of a wagon is changing', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      element.querySelector('sbb-train-wagon').setAttribute('sector', 'Z');
      await waitForLitRender(element);

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sec. Z',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
        {
          label: 'Sector A',
          wagonCount: '2',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should update sectors when wagon was removed', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="B"></sbb-train-wagon>
            <sbb-train-wagon sector="C"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      element.querySelector('sbb-train-wagon').remove();
      await waitForLitRender(element);

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sec. B',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
        {
          label: 'Sec. C',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should update sectors when train was removed', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
          <sbb-train>
            <sbb-train-wagon sector="B"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);
      await waitForLitRender(element);

      element.querySelector('sbb-train').remove();
      await waitForLitRender(element);

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sec. B',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
      ]);
    });
  });
});
