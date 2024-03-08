import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender, fixture } from '../../core/testing';
import type { SbbTrainElement } from '../train';
import type { SbbTrainWagonElement } from '../train-wagon';

import { SbbTrainFormationElement } from './train-formation';
import '../train';
import '../train-wagon';
import '../train-blocked-passage';

function extractAggregatedSectors(): Record<string, string>[] {
  return Array.from(
    document
      .querySelector<SbbTrainFormationElement>('sbb-train-formation')!
      .shadowRoot!.querySelectorAll<HTMLSpanElement>('.sbb-train-formation__sector') || [],
  ).map((sector) => {
    const computedStyles = getComputedStyle(sector);

    return {
      label:
        sector
          .querySelector<HTMLSpanElement>('.sbb-train-formation__sector-sticky-wrapper')!
          .textContent!.trim() || '',
      wagonCount: computedStyles.getPropertyValue('--sbb-train-formation-wagon-count'),
      blockedPassageCount: computedStyles.getPropertyValue(
        '--sbb-train-formation-wagon-blocked-passage-count',
      ),
    };
  });
}

describe(`sbb-train-formation with ${fixture.name}`, () => {
  let element: SbbTrainFormationElement;
  const ssrModules = [
    './train-formation.ts',
    '../train/index.ts',
    '../train-wagon/index.ts',
    '../train-blocked-passage/index.ts',
  ];

  it('should render', async () => {
    element = await fixture(html`<sbb-train-formation></sbb-train-formation>`, {
      modules: ['./train-formation.ts'],
    });
    assert.instanceOf(element, SbbTrainFormationElement);
  });

  describe('sectors building', () => {
    it('should collect wagons with one sector', async () => {
      await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon
              ><sbb-train-blocked-passage></sbb-train-blocked-passage
              ><sbb-train-wagon sector="A"></sbb-train-wagon
              ><sbb-train-wagon sector="A"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ssrModules },
      );

      const aggregatedSectors = extractAggregatedSectors();
      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '1',
        },
      ]);
    });

    it('should collect wagons with two sectors', async () => {
      await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon
              ><sbb-train-blocked-passage></sbb-train-blocked-passage
              ><sbb-train-wagon sector="B"></sbb-train-wagon
              ><sbb-train-wagon sector="B"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ssrModules },
      );

      const aggregatedSectors = extractAggregatedSectors();
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
      await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon
              ><sbb-train-blocked-passage></sbb-train-blocked-passage
              ><sbb-train-wagon></sbb-train-wagon><sbb-train-wagon sector="B"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ssrModules },
      );

      const aggregatedSectors = extractAggregatedSectors();
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
      await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon></sbb-train-wagon
              ><sbb-train-blocked-passage></sbb-train-blocked-passage
              ><sbb-train-wagon sector="B"></sbb-train-wagon
              ><sbb-train-wagon sector="B"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ssrModules },
      );

      const aggregatedSectors = extractAggregatedSectors();
      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector B',
          wagonCount: '3',
          blockedPassageCount: '1',
        },
      ]);
    });

    it('should collect wagons when skipping a wagon in the middle', async () => {
      await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon><sbb-train-wagon></sbb-train-wagon
              ><sbb-train-wagon sector="A"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ssrModules },
      );

      const aggregatedSectors = extractAggregatedSectors();
      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should collect over multiple trains', async () => {
      await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
            </sbb-train>
            <sbb-train>
              <sbb-train-wagon sector="B"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ['./train-formation.ts', '../train/index.ts', '../train-wagon/index.ts'] },
      );

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
      element = await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ['./train-formation.ts', '../train/index.ts', '../train-wagon/index.ts'] },
      );

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      element.querySelector<SbbTrainWagonElement>('sbb-train-wagon')!.sector = 'Z';
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
      element = await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ['./train-formation.ts', '../train/index.ts', '../train-wagon/index.ts'] },
      );

      expect(extractAggregatedSectors()).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      element.querySelector<SbbTrainWagonElement>('sbb-train-wagon')!.setAttribute('sector', 'Z');
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
      element = await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
              <sbb-train-wagon sector="B"></sbb-train-wagon>
              <sbb-train-wagon sector="C"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ['./train-formation.ts', '../train/index.ts', '../train-wagon/index.ts'] },
      );

      element.querySelector<SbbTrainWagonElement>('sbb-train-wagon')!.remove();
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
      element = await fixture(
        html`
          <sbb-train-formation>
            <sbb-train>
              <sbb-train-wagon sector="A"></sbb-train-wagon>
            </sbb-train>
            <sbb-train>
              <sbb-train-wagon sector="B"></sbb-train-wagon>
            </sbb-train>
          </sbb-train-formation>
        `,
        { modules: ['./train-formation.ts', '../train/index.ts', '../train-wagon/index.ts'] },
      );
      await waitForLitRender(element);

      element.querySelector<SbbTrainElement>('sbb-train')!.remove();
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
