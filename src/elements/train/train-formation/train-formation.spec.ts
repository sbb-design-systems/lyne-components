import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';
import { waitForLitRender } from '../../core/testing.ts';

import { SbbTrainFormationElement } from './train-formation.component.ts';

import '../../train.ts';

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

describe(`sbb-train-formation`, () => {
  let element: SbbTrainFormationElement;

  it('should render', async () => {
    element = await fixture(html`<sbb-train-formation></sbb-train-formation>`);
    assert.instanceOf(element, SbbTrainFormationElement);
  });

  describe('sectors building', () => {
    it('should collect wagons with one sector', async () => {
      element = await fixture<SbbTrainFormationElement>(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon
            ><sbb-train-blocked-passage></sbb-train-blocked-passage
            ><sbb-train-wagon sector="A"></sbb-train-wagon
            ><sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

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
      element = await fixture<SbbTrainFormationElement>(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon
            ><sbb-train-blocked-passage></sbb-train-blocked-passage
            ><sbb-train-wagon sector="B"></sbb-train-wagon
            ><sbb-train-wagon sector="B"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

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
      element = await fixture<SbbTrainFormationElement>(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon
            ><sbb-train-blocked-passage></sbb-train-blocked-passage
            ><sbb-train-wagon></sbb-train-wagon><sbb-train-wagon sector="B"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

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
      element = await fixture<SbbTrainFormationElement>(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon
            ><sbb-train-blocked-passage></sbb-train-blocked-passage
            ><sbb-train-wagon sector="B"></sbb-train-wagon
            ><sbb-train-wagon sector="B"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

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
      element = await fixture<SbbTrainFormationElement>(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon><sbb-train-wagon></sbb-train-wagon
            ><sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

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
      element = await fixture<SbbTrainFormationElement>(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
          <sbb-train>
            <sbb-train-wagon sector="B"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

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
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(extractAggregatedSectors(element)).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      element.querySelector('sbb-train-wagon')!.sector = 'Z';
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
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(extractAggregatedSectors(element)).to.be.eql([
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      element.querySelector('sbb-train-wagon')!.setAttribute('sector', 'Z');
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
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="B"></sbb-train-wagon>
            <sbb-train-wagon sector="C"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      element.querySelector('sbb-train-wagon')!.remove();
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

      element.querySelector('sbb-train')!.remove();
      await waitForLitRender(element);

      expect(extractAggregatedSectors(element)).to.be.eql([
        {
          label: 'Sec. B',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
      ]);
    });

    it('should remove sectors row if there were no sectors found', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(extractAggregatedSectors(element)).to.be.eql([]);
    });
  });

  describe('has-sectors state', () => {
    it('should set has-sectors state when wagons have a sector', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(element).to.match(':state(has-sectors)');
    });

    it('should not set has-sectors state when no wagon has a sector', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(element).not.to.match(':state(has-sectors)');
    });

    it('should set has-sectors state when sector property is added at runtime', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(element).not.to.match(':state(has-sectors)');

      element.querySelector('sbb-train-wagon')!.sector = 'A';
      await waitForLitRender(element);

      expect(element).to.match(':state(has-sectors)');
    });

    it('should remove has-sectors state when last sector is removed at runtime', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(element).to.match(':state(has-sectors)');

      element.querySelector('sbb-train-wagon')!.sector = '';
      await waitForLitRender(element);

      expect(element).not.to.match(':state(has-sectors)');
    });

    it('should remove has-sectors state when the wagon with a sector is removed', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(element).to.match(':state(has-sectors)');

      element.querySelector('sbb-train-wagon')!.remove();
      await waitForLitRender(element);

      expect(element).not.to.match(':state(has-sectors)');
    });

    it('should set has-sectors state when a new train with sectored wagons is slotted', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);

      expect(element).not.to.match(':state(has-sectors)');

      const train = document.createElement('sbb-train');
      const wagon = document.createElement('sbb-train-wagon');
      wagon.sector = 'B';
      train.appendChild(wagon);
      element.appendChild(train);
      await waitForLitRender(element);

      expect(element).to.match(':state(has-sectors)');
    });
  });

  describe('has-direction-label state', () => {
    it('should set has-direction-label state when a train has a direction-label', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train direction-label="Direction of travel"></sbb-train>
        </sbb-train-formation>
      `);

      expect(element).to.match(':state(has-direction-label)');
    });

    it('should not set has-direction-label state when no train has a direction-label', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train></sbb-train>
        </sbb-train-formation>
      `);

      expect(element).not.to.match(':state(has-direction-label)');
    });

    it('should set has-direction-label state when direction-label property is added at runtime', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train></sbb-train>
        </sbb-train-formation>
      `);

      expect(element).not.to.match(':state(has-direction-label)');

      element.querySelector('sbb-train')!.directionLabel = 'Direction of travel';
      await waitForLitRender(element);

      expect(element).to.match(':state(has-direction-label)');
    });

    it('should remove has-direction-label state when direction-label property is cleared at runtime', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train direction-label="Direction of travel"></sbb-train>
        </sbb-train-formation>
      `);

      expect(element).to.match(':state(has-direction-label)');

      element.querySelector('sbb-train')!.directionLabel = '';
      await waitForLitRender(element);

      expect(element).not.to.match(':state(has-direction-label)');
    });

    it('should remove has-direction-label state when train with direction-label is removed', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train direction-label="Direction of travel"></sbb-train>
          <sbb-train></sbb-train>
        </sbb-train-formation>
      `);

      expect(element).to.match(':state(has-direction-label)');

      element.querySelector('sbb-train')!.remove();
      await waitForLitRender(element);

      expect(element).not.to.match(':state(has-direction-label)');
    });

    it('should keep has-direction-label state when a train without direction-label is removed', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train direction-label="Direction of travel"></sbb-train>
          <sbb-train></sbb-train>
        </sbb-train-formation>
      `);

      expect(element).to.match(':state(has-direction-label)');

      element.querySelectorAll('sbb-train')[1].remove();
      await waitForLitRender(element);

      expect(element).to.match(':state(has-direction-label)');
    });

    it('should set has-direction-label state when a new train with direction-label is slotted', async () => {
      element = await fixture(html`
        <sbb-train-formation>
          <sbb-train></sbb-train>
        </sbb-train-formation>
      `);

      expect(element).not.to.match(':state(has-direction-label)');

      const train = document.createElement('sbb-train');
      train.directionLabel = 'Direction of travel';
      element.appendChild(train);
      await waitForLitRender(element);

      expect(element).to.match(':state(has-direction-label)');
    });
  });
});
