import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChain } from './sbb-pearl-chain';

describe('sbb-pearl-chain', () => {
  describe('sbb-pearl-chain with one leg', () => {
    it('renders component with config', async () => {
      const page = await newSpecPage({
        components: [SbbPearlChain],
        html: `
            <sbb-pearl-chain>
            </sbb-pearl-chain>
        `,
      });
      page.rootInstance.legs = [
        {
          __typename: 'PTRideLeg',
          arrival: { time: '2022-08-18T05:00' },
          departure: { time: '2022-08-18T04:00' },
        },
      ];
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
        <sbb-pearl-chain>
          <mock:shadow-root>
            <div class="sbb-pearl-chain">
              <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet--past"></span>
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past" style="--sbb-pearl-chain-leg-width: 100%;"></div>
              <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet--past"></span>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
    });
  });

  describe('sbb-pearl-chain with two legs', () => {
    it('renders component with config', async () => {
      const page = await newSpecPage({
        components: [SbbPearlChain],
        html: `
            <sbb-pearl-chain>
            </sbb-pearl-chain>
        `,
      });
      page.rootInstance.legs = [
        {
          __typename: 'PTRideLeg',
          arrival: { time: '2022-08-18T05:00' },
          departure: { time: '2022-08-18T04:00' },
          serviceJourney: {
            serviceAlteration: {
              cancelled: false,
            },
          },
        },
        {
          __typename: 'PTRideLeg',
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
              <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet--past"></span>
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past" style="--sbb-pearl-chain-leg-width: 8.333333333333332%;"></div>
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past" style="--sbb-pearl-chain-leg-width: 91.66666666666666%;">
                <span class="sbb-pearl-chain__stop"></span>
              </div>
              <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet--past"></span>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
    });
  });

  describe('sbb-pearl-chain with skipped stops', () => {
    it('renders component with departure skipped', async () => {
      const page = await newSpecPage({
        components: [SbbPearlChain],
        html: `
            <sbb-pearl-chain>
            </sbb-pearl-chain>
        `,
      });
      page.rootInstance.legs = [
        {
          __typename: 'PTRideLeg',
          arrival: { time: '2022-08-18T05:00' },
          departure: { time: '2022-08-18T04:00' },
          serviceJourney: {
            serviceAlteration: {
              cancelled: false,
            },
          },
        },
        {
          __typename: 'PTRideLeg',
          arrival: { time: '2022-08-18T16:00' },
          departure: { time: '2022-08-18T05:00' },
          serviceJourney: {
            serviceAlteration: {
              cancelled: false,
            },
            stopPoints: [
              {
                stopStatus: 'NOT_SERVICED',
              },
              {
                stopStatus: 'PLANNED',
              },
            ],
          },
        },
      ];
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
        <sbb-pearl-chain>
          <mock:shadow-root>
            <div class="sbb-pearl-chain">
              <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet--past"></span>
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past" style="--sbb-pearl-chain-leg-width: 8.333333333333332%;"></div>
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past sbb-pearl-chain__leg--skipped" style="--sbb-pearl-chain-leg-width: 91.66666666666666%;">
                <span class="sbb-pearl-chain__stop sbb-pearl-chain__stop--departure-skipped"></span>
              </div>
              <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet--past"></span>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
    });

    it('renders component with arrival skipped', async () => {
      const page = await newSpecPage({
        components: [SbbPearlChain],
        html: `
            <sbb-pearl-chain>
            </sbb-pearl-chain>
        `,
      });
      page.rootInstance.legs = [
        {
          __typename: 'PTRideLeg',
          arrival: { time: '2022-08-18T05:00' },
          departure: { time: '2022-08-18T04:00' },
          serviceJourney: {
            serviceAlteration: {
              cancelled: false,
            },
          },
        },
        {
          __typename: 'PTRideLeg',
          arrival: { time: '2022-08-18T16:00' },
          departure: { time: '2022-08-18T05:00' },
          serviceJourney: {
            serviceAlteration: {
              cancelled: false,
            },
            stopPoints: [
              {
                stopStatus: 'PLANNED',
              },
              {
                stopStatus: 'NOT_SERVICED',
              },
            ],
          },
        },
      ];
      await page.waitForChanges();
      expect(page.root).toEqualHtml(`
        <sbb-pearl-chain>
          <mock:shadow-root>
            <div class="sbb-pearl-chain">
              <span class="sbb-pearl-chain__bullet sbb-pearl-chain__bullet--past"></span>
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past" style="--sbb-pearl-chain-leg-width: 8.333333333333332%;"></div>
              <div class="sbb-pearl-chain__leg sbb-pearl-chain__leg--past sbb-pearl-chain__leg--skipped" style="--sbb-pearl-chain-leg-width: 91.66666666666666%;">
                <span class="sbb-pearl-chain__stop"></span>
              </div>
              <span class="sbb-pearl-chain--arrival-skipped sbb-pearl-chain__bullet sbb-pearl-chain__bullet--past"></span>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
    });
  });
});
