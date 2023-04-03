import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

async function assertSectorsCollected(
  page: E2EPage,
  expectedSectorsCollected: Record<string, string>[]
): Promise<void> {
  const sectorsCollected = await page.evaluate(() =>
    Array.from(
      document
        .querySelector('sbb-train-formation')
        .shadowRoot.querySelectorAll('.sbb-train-formation__sector')
    ).map((sector) => {
      const computedStyles = getComputedStyle(sector);

      return {
        label: sector
          .querySelector('.sbb-train-formation__sector-sticky-wrapper')
          .textContent.trim(),
        wagonCount: computedStyles.getPropertyValue('--sbb-train-formation-wagon-count'),
        blockedPassageCount: computedStyles.getPropertyValue(
          '--sbb-train-formation-wagon-blocked-passage-count'
        ),
      };
    })
  );

  expect(sectorsCollected).toEqual(expectedSectorsCollected);
}

async function testSectorsCollected(
  wagonsOrBlockedPassages: string[],
  expectedSectorsCollected: Record<string, string>[]
): Promise<void> {
  const page = await newE2EPage();
  await page.setContent(`
      <sbb-train-formation>
        <sbb-train>
          ${wagonsOrBlockedPassages.join('')}
        </sbb-train>
      </sbb-train-formation>
    `);

  await page.waitForChanges();

  await assertSectorsCollected(page, expectedSectorsCollected);
}

describe('sbb-train-formation', () => {
  let element: E2EElement, page: E2EPage;

  it('should render', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-train-formation></sbb-train-formation>');

    element = await page.find('sbb-train-formation');
    expect(element).toHaveClass('hydrated');
  });

  describe('sectors building', () => {
    it('should collect wagons with one sector', async () => {
      await testSectorsCollected(
        [
          '<sbb-train-wagon sector="A" />',
          '<sbb-train-blocked-passage />',
          '<sbb-train-wagon sector="A" />',
          '<sbb-train-wagon sector="A" />',
        ],
        [
          {
            label: 'Sector A',
            wagonCount: '3',
            blockedPassageCount: '1',
          },
        ]
      );
    });

    it('should collect wagons with two sectors', async () => {
      await testSectorsCollected(
        [
          '<sbb-train-wagon sector="A" />',
          '<sbb-train-blocked-passage />',
          '<sbb-train-wagon sector="B" />',
          '<sbb-train-wagon sector="B" />',
        ],
        [
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
        ]
      );
    });

    it('should collect wagons when a middle sector name is missing', async () => {
      await testSectorsCollected(
        [
          '<sbb-train-wagon sector="A" />',
          '<sbb-train-blocked-passage />',
          '<sbb-train-wagon />',
          '<sbb-train-wagon sector="B" />',
        ],
        [
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
        ]
      );
    });

    it('should collect wagons when the first sector name is missing', async () => {
      await testSectorsCollected(
        [
          '<sbb-train-wagon />',
          '<sbb-train-blocked-passage />',
          '<sbb-train-wagon sector="B" />',
          '<sbb-train-wagon sector="B" />',
        ],
        [
          {
            label: 'Sector B',
            wagonCount: '3',
            blockedPassageCount: '1',
          },
        ]
      );
    });

    it('should collect wagons when skipping a wagon in the middle', async () => {
      await testSectorsCollected(
        ['<sbb-train-wagon sector="A"/>', '<sbb-train-wagon />', '<sbb-train-wagon sector="A" />'],
        [
          {
            label: 'Sector A',
            wagonCount: '3',
            blockedPassageCount: '0',
          },
        ]
      );
    });

    it('should collect over multiple trains', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
          <sbb-train>
            <sbb-train-wagon sector="B"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
    `);
      await page.waitForChanges();

      await assertSectorsCollected(page, [
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
      const page = await newE2EPage();
      await page.setContent(`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
    `);
      await page.waitForChanges();

      await assertSectorsCollected(page, [
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      (await page.find('sbb-train-wagon')).setProperty('sector', 'Z');
      await page.waitForChanges();

      await assertSectorsCollected(page, [
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
      const page = await newE2EPage();
      await page.setContent(`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
    `);
      await page.waitForChanges();

      await assertSectorsCollected(page, [
        {
          label: 'Sector A',
          wagonCount: '3',
          blockedPassageCount: '0',
        },
      ]);

      (await page.find('sbb-train-wagon')).setAttribute('sector', 'Z');
      await page.waitForChanges();

      await assertSectorsCollected(page, [
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
      const page = await newE2EPage();
      await page.setContent(`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
            <sbb-train-wagon sector="B"></sbb-train-wagon>
            <sbb-train-wagon sector="C"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
    `);
      await page.waitForChanges();

      await page.evaluate(() => document.querySelector('sbb-train-wagon').remove());
      await page.waitForChanges();

      await assertSectorsCollected(page, [
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
      const page = await newE2EPage();
      await page.setContent(`
        <sbb-train-formation>
          <sbb-train>
            <sbb-train-wagon sector="A"></sbb-train-wagon>
          </sbb-train>
          <sbb-train>
            <sbb-train-wagon sector="B"></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
    `);
      await page.waitForChanges();

      await page.evaluate(() => document.querySelector('sbb-train').remove());
      await page.waitForChanges();

      await assertSectorsCollected(page, [
        {
          label: 'Sec. B',
          wagonCount: '1',
          blockedPassageCount: '0',
        },
      ]);
    });
  });
});
