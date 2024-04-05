import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing/index.js';
import { fixture } from '../../core/testing/private/index.js';
import type { SbbTrainElement } from '../train/index.js';
import type { SbbTrainWagonElement } from '../train-wagon/index.js';

import { SbbTrainFormationElement } from './train-formation.js';
import '../train/index.js';
import '../train-wagon/index.js';
import '../train-blocked-passage/index.js';

function extractAggregatedSectors(element: SbbTrainFormationElement): Record<string, string>[] {
  return Array.from(
    element.shadowRoot!.querySelectorAll<HTMLSpanElement>('.sbb-train-formation__sector') || [],
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
      element = await fixture<SbbTrainFormationElement>(
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

      const aggregatedSectors = extractAggregatedSectors(element);
      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '1',
        },
      ]);
    });

    it('should collect wagons with two sectors', async () => {
      element = await fixture<SbbTrainFormationElement>(
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

      const aggregatedSectors = extractAggregatedSectors(element);
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
      element = await fixture<SbbTrainFormationElement>(
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

      const aggregatedSectors = extractAggregatedSectors(element);
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
      element = await fixture<SbbTrainFormationElement>(
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

      const aggregatedSectors = extractAggregatedSectors(element);
      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector B',
          wagonCount: '3',
          blockedPassageCount: '1',
        },
      ]);
    });

    it('should collect wagons when skipping a wagon in the middle', async () => {
      element = await fixture<SbbTrainFormationElement>(
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

      const aggregatedSectors = extractAggregatedSectors(element);
      expect(aggregatedSectors).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should collect over multiple trains', async () => {
      element = await fixture<SbbTrainFormationElement>(
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

      expect(extractAggregatedSectors(element)).to.be.eql([
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

      expect(extractAggregatedSectors(element)).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      element.querySelector<SbbTrainWagonElement>('sbb-train-wagon')!.sector = 'Z';
      await waitForLitRender(element);

      expect(extractAggregatedSectors(element)).to.be.eql([
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

      expect(extractAggregatedSectors(element)).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      element.querySelector<SbbTrainWagonElement>('sbb-train-wagon')!.setAttribute('sector', 'Z');
      await waitForLitRender(element);

      expect(extractAggregatedSectors(element)).to.be.eql([
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

      expect(extractAggregatedSectors(element)).to.be.eql([
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

      element.querySelector<SbbTrainElement>('sbb-train')!.remove();
      await waitForLitRender(element);

      expect(extractAggregatedSectors(element)).to.be.eql([
        {
          label: 'Sec. B',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
      ]);
    });
  });
});
