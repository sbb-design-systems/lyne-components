import { SbbTrainWagon } from './sbb-train-wagon';
import { newSpecPage } from '@stencil/core/testing';

async function assertAriaLabel(
  properties: Partial<
    Pick<
      HTMLSbbTrainWagonElement,
      | 'type'
      | 'occupancy'
      | 'sector'
      | 'blockedPassage'
      | 'wagonClass'
      | 'label'
      | 'customAccessibilityLabel'
      | 'additionalAccessibilityText'
    >
  >,
  assertString = ''
): Promise<void> {
  const attributes = [
    'type',
    'occupancy',
    'sector',
    'blockedPassage',
    'wagonClass',
    'label',
    'customAccessibilityLabel',
    'additionalAccessibilityText',
  ]
    .map((property) => {
      const value = properties[property];
      // Convert camelCase to kebab-case
      const attributeName = property.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
      );
      return value ? `${attributeName}="${value}"` : attributeName;
    })
    .join(' ');

  const { root } = await newSpecPage({
    components: [SbbTrainWagon],
    html: `<sbb-train-wagon ${attributes}/>`,
  });

  expect(root.shadowRoot.querySelector('[aria-label]').getAttribute('aria-label')).toEqual(
    assertString
  );
}

describe('sbb-train-wagon', () => {
  describe('render', () => {
    it('should render as type wagon', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrainWagon],
        html: '<sbb-train-wagon occupancy="unknown" wagon-class="1" type="wagon" label="38" blocked-passage="previous"/>',
      });

      expect(root).toEqualHtml(`
        <sbb-train-wagon blocked-passage="previous" label="38" occupancy="unknown" type="wagon" wagon-class="1">
          <mock:shadow-root>
            <div class="sbb-train-wagon" aria-label="Train coach, Number: 38, First Class, No occupancy forecast available, No passage to the previous train coach.">
              <span class="sbb-train-wagon__label" aria-hidden="true">
                38
              </span>
              <span class="sbb-train-wagon__compartment">
                <sbb-icon name="utilization-none"></sbb-icon>
                <span class="sbb-train-wagon__class">
                  <span aria-hidden="true">1</span>
                </span>
              </span>
              <span class="sbb-train-wagon__icons">
                <span hidden class="sbb-train-wagon__icons-item">
                  <slot></slot>
                </span>
              </span>
            </div>
          </mock:shadow-root>
        </sbb-train-wagon>
      `);
    });

    it('should render as type wagon with one icon', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrainWagon],
        html: '<sbb-train-wagon><sbb-icon name="sa-rs"></sbb-icon></sbb-train-wagon>',
      });

      expect(root).toEqualHtml(`
        <sbb-train-wagon type="wagon">
          <mock:shadow-root>
            <div class="sbb-train-wagon" aria-label="Train coach, No occupancy forecast available.">
              <span class="sbb-train-wagon__label" aria-hidden="true">
              </span>
              <span class="sbb-train-wagon__compartment">
                <sbb-icon name="utilization-none"></sbb-icon>
                <span class="sbb-train-wagon__class">
                  <span aria-hidden="true"></span>
                </span>
              </span>
              <span class="sbb-train-wagon__icons">
                <span aria-label="Additional wagon information" class="sbb-train-wagon__icons-item">
                  <slot></slot>
                </span>
              </span>
            </div>
          </mock:shadow-root>
          <sbb-icon name="sa-rs"></sbb-icon>
        </sbb-train-wagon>
      `);
    });

    it('should render as type wagon with multiple icons', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrainWagon],
        html: '<sbb-train-wagon><sbb-icon name="sa-rs"></sbb-icon><sbb-icon name="sa-rs"></sbb-icon></sbb-train-wagon>',
      });

      expect(root).toEqualHtml(`
        <sbb-train-wagon type="wagon">
          <mock:shadow-root>
            <div class="sbb-train-wagon" aria-label="Train coach, No occupancy forecast available.">
              <span class="sbb-train-wagon__label" aria-hidden="true">
              </span>
              <span class="sbb-train-wagon__compartment">
                <sbb-icon name="utilization-none"></sbb-icon>
                <span class="sbb-train-wagon__class">
                  <span aria-hidden="true"></span>
                </span>
              </span>
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
            </div>
          </mock:shadow-root>
          <sbb-icon name="sa-rs" slot="sbb-train-wagon-icon-0"></sbb-icon>
          <sbb-icon name="sa-rs" slot="sbb-train-wagon-icon-1"></sbb-icon>
        </sbb-train-wagon>
      `);
    });

    it('should render as type locomotive', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrainWagon],
        html: '<sbb-train-wagon type="locomotive" additional-accessibility-text="Top of the train"/>',
      });

      expect(root).toEqualHtml(`
        <sbb-train-wagon type="locomotive" additional-accessibility-text="Top of the train">
          <mock:shadow-root>
            <div class="sbb-train-wagon" aria-label="Locomotive, Top of the train.">
              <span aria-hidden="true" class="sbb-train-wagon__label"></span>
              <span class="sbb-train-wagon__compartment">
                <svg aria-hidden="true" width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.7906 4.42719C19.9743 1.93152 23.129 0.5 26.4452 0.5H53.5548C56.871 0.5 60.0257 1.93152 62.2094 4.4272L76.2094 20.4272C82.7157 27.8629 77.4351 39.5 67.5548 39.5H12.4452C2.56489 39.5 -2.71566 27.8629 3.79058 20.4272L17.7906 4.42719Z" stroke="#767676"></path></svg>
              </span>
            </div>
          </mock:shadow-root>
        </sbb-train-wagon>
      `);
    });

    it('should render as type closed wagon without number', async () => {
      const { root } = await newSpecPage({
        components: [SbbTrainWagon],
        html: '<sbb-train-wagon type="closed" />',
      });

      expect(root).toEqualHtml(`
        <sbb-train-wagon type="closed">
          <mock:shadow-root>
            <div class="sbb-train-wagon" aria-label="Closed train coach.">
              <span aria-hidden="true" class="sbb-train-wagon__label"></span>
              <span class="sbb-train-wagon__compartment"></span>
            </div>
          </mock:shadow-root>
        </sbb-train-wagon>
      `);
    });
  });

  it('should construct aria label correctly', async () => {
    await assertAriaLabel({}, 'Train coach.');
    await assertAriaLabel({ customAccessibilityLabel: 'Hi!' }, 'Hi!');
    await assertAriaLabel({ type: 'locomotive' }, 'Locomotive.');
    await assertAriaLabel(
      { type: 'closed', additionalAccessibilityText: `Don't enter` },
      `Closed train coach, Don't enter.`
    );
    await assertAriaLabel({ type: 'wagon' }, 'Train coach.');

    await assertAriaLabel({ sector: 'A', type: 'locomotive' }, 'Locomotive, Sector: A.');
    await assertAriaLabel({ sector: 'A', type: 'closed' }, 'Closed train coach, Sector: A.');
    await assertAriaLabel({ sector: 'A', type: 'wagon' }, 'Train coach, Sector: A.');

    await assertAriaLabel(
      {
        sector: 'A',
        type: 'wagon',
        label: '38',
        wagonClass: '1',
        occupancy: 'unknown',
        blockedPassage: 'previous',
      },
      'Train coach, Sector: A, Number: 38, First Class, No occupancy forecast available, No passage to the previous train coach.'
    );

    await assertAriaLabel({ type: 'wagon', wagonClass: '2' }, 'Train coach, Second Class.');

    await assertAriaLabel(
      { type: 'wagon', occupancy: 'low' },
      'Train coach, Low to medium occupancy expected.'
    );
    await assertAriaLabel(
      { type: 'wagon', occupancy: 'medium' },
      'Train coach, High occupancy expected.'
    );
    await assertAriaLabel(
      { type: 'wagon', occupancy: 'high' },
      'Train coach, Very high occupancy expected.'
    );

    await assertAriaLabel(
      { type: 'wagon', blockedPassage: 'next' },
      'Train coach, No passage to the next train coach.'
    );
    await assertAriaLabel(
      { type: 'wagon', blockedPassage: 'both' },
      'Train coach, No passage to the next and previous train coach.'
    );
    await assertAriaLabel({ type: 'wagon', blockedPassage: 'none' }, 'Train coach.');
  });
});
