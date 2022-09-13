import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChain } from './sbb-pearl-chain';

describe('sbb-pearl-chain', () => {
  describe('sbb-pearl-chain with one leg', () => {
    it('renders compont with config', async () => {
      const page = await newSpecPage({
        components: [SbbPearlChain],
        html: `
            <sbb-pearl-chain>
            </sbb-pearl-chain>
        `,
      });
      page.rootInstance.legs = [
        {
          duration: 60,
          id: 'test',
          arrival: { time: '2022-08-18T05:00' },
          departure: { time: '2022-08-18T04:00' },
          serviceJourney: {
            serviceAlteration: {
              cancelled: false,
            },
          },
        },
      ];
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
        <sbb-pearl-chain>
          <mock:shadow-root>
            <div class="sbb-pearl-chain">
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past" style="width: 100%;"></div>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
    });
  });
  describe('sbb-pearl-chain with two legs', () => {
    it('renders compont with config', async () => {
      const page = await newSpecPage({
        components: [SbbPearlChain],
        html: `
            <sbb-pearl-chain>
            </sbb-pearl-chain>
        `,
      });
      page.rootInstance.legs = [
        {
          duration: 60,
          id: 'test',
          arrival: { time: '2022-08-18T05:00' },
          departure: { time: '2022-08-18T04:00' },
          serviceJourney: {
            serviceAlteration: {
              cancelled: false,
            },
          },
        },
        {
          duration: 660,
          id: 'test',
          arrival: { time: '2022-08-18T16:00' },
          departure: { time: '2022-08-18T05:00' },
          serviceJourney: {
            serviceAlteration: {
              cancelled: false,
            },
          },
        },
      ];
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
        <sbb-pearl-chain>
          <mock:shadow-root>
            <div class="sbb-pearl-chain">
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past" style="width: 8.333333333333332%;"></div>
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past" style="width: 91.66666666666666%;"></div>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
    });
  });
});
