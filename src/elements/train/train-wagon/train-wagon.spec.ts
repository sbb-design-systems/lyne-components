import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import {
  setOrRemoveAttribute,
  i18nBlockedPassage,
  i18nClass,
  i18nLocomotiveLabel,
  i18nOccupancy,
  i18nRestaurantWagonLabel,
  i18nSleepingWagonLabel,
  i18nWagonLabel,
} from '../../core.ts';
import type { SbbIconElement } from '../../icon.pure.ts';

import { SbbTrainWagonElement } from './train-wagon.component.ts';

import '../../train.ts';

describe(`sbb-train-wagon`, () => {
  let element: SbbTrainWagonElement;
  const elementInternals = elementInternalsSpy();

  async function extractAriaLabels(
    properties: Partial<
      Pick<
        SbbTrainWagonElement,
        | 'wagonType'
        | 'occupancy'
        | 'sector'
        | 'blockedPassage'
        | 'wagonClass'
        | 'label'
        | 'additionalAccessibilityText'
      >
    >,
  ): Promise<string[]> {
    // attributes
    (
      [
        'wagonType',
        'occupancy',
        'sector',
        'blockedPassage',
        'wagonClass',
        'label',
        'additionalAccessibilityText',
      ] as const
    ).forEach((attr) => {
      const defaultValueMap = new Map<string, string | null>();

      defaultValueMap.set('wagonType', 'wagon');
      defaultValueMap.set('occupancy', null);
      defaultValueMap.set('sector', '');
      defaultValueMap.set('blockedPassage', 'none');
      defaultValueMap.set('wagonClass', null);
      defaultValueMap.set('label', '');
      defaultValueMap.set('additionalAccessibilityText', '');

      const attributeValue = properties[attr];
      // Convert camelCase to kebab-case
      const attributeName = attr.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
      );
      setOrRemoveAttribute(element, attributeName, attributeValue ?? defaultValueMap.get(attr));
    });

    await waitForLitRender(element);

    // Select all accessibility relevant text parts
    // The alternative of a11yTreeSnapshot() does not work as the list title can't be extracted reliable.
    return Array.from(
      element.shadowRoot!.querySelectorAll<HTMLElement>(
        '[aria-label]:not(.sbb-train-wagon__attribute-icon-list), sbb-timetable-occupancy-icon, .sbb-screen-reader-only',
      ),
    ).map((entry) =>
      entry.hasAttribute('aria-label')
        ? entry.getAttribute('aria-label')!
        : (elementInternals.get(entry)?.ariaLabel ??
          entry.textContent!.replace(/\s+/g, ' ').trim()),
    );
  }

  it('renders', async () => {
    element = await fixture(html`<sbb-train-wagon></sbb-train-wagon>`);
    assert.instanceOf(element, SbbTrainWagonElement);
  });

  it('should emit sectorChange', async () => {
    element = await fixture(html`<sbb-train-wagon sector="A"></sbb-train-wagon>`);
    const sectorChangeSpy = new EventSpy('sectorchange');
    element.sector = 'B';

    await sectorChangeSpy.calledOnce();
    expect(sectorChangeSpy.count).to.be.greaterThan(0);
  });

  it('should change slot name when changing from multiple to single icon', async () => {
    element = await fixture(
      html`<sbb-train-wagon sector="A">
        <sbb-icon name="sa-rs"></sbb-icon>
        <sbb-icon name="sa-rs"></sbb-icon>
      </sbb-train-wagon>`,
    );

    Array.from(element.querySelectorAll('sbb-icon')).forEach((icon, index) => {
      expect(icon.getAttribute('slot')).to.equal(`li-${index}`);
    });

    // Remove one icon
    (element.querySelector('sbb-icon') as SbbIconElement).remove();
    await waitForLitRender(element);

    Array.from(element.querySelectorAll('sbb-icon')).forEach((icon, index) => {
      expect(icon.getAttribute('slot')).to.equal(`li-${index}`);
    });
  });

  it('should set aria labels correctly', async () => {
    element = await fixture(html`<sbb-train-wagon></sbb-train-wagon>`);

    expect(await extractAriaLabels({ wagonType: 'wagon' })).to.be.eql([i18nWagonLabel.en]);
    expect(await extractAriaLabels({ wagonType: 'locomotive' })).to.be.eql([
      i18nLocomotiveLabel.en,
    ]);
    expect(await extractAriaLabels({ wagonType: 'sleeping' })).to.be.eql([
      i18nSleepingWagonLabel.en,
    ]);
    expect(await extractAriaLabels({ wagonType: 'restaurant' })).to.be.eql([
      i18nRestaurantWagonLabel.en,
    ]);

    expect(
      await extractAriaLabels({ wagonType: 'closed', additionalAccessibilityText: `Don't enter` }),
    ).to.be.eql(['Closed train coach', `, Don't enter`]);
    expect(await extractAriaLabels({ wagonType: 'wagon' })).to.be.eql([i18nWagonLabel.en]);

    expect(await extractAriaLabels({ sector: 'A', wagonType: 'locomotive' })).to.be.eql([
      'Locomotive, Sector, A',
    ]);
    expect(await extractAriaLabels({ sector: 'A', wagonType: 'closed' })).to.be.eql([
      'Closed train coach, Sector, A',
    ]);
    expect(await extractAriaLabels({ sector: 'A', wagonType: 'wagon' })).to.be.eql([
      'Train coach, Sector, A',
    ]);

    expect(
      await extractAriaLabels({
        sector: 'A',
        wagonType: 'wagon',
        label: '38',
        wagonClass: '1',
        occupancy: 'none',
        blockedPassage: 'previous',
      }),
    ).to.be.eql([
      i18nWagonLabel.en,
      'Sector, A',
      'Number, 38',
      i18nClass.first.en,
      i18nOccupancy.none.en,
      i18nBlockedPassage.previous.en,
    ]);

    expect(await extractAriaLabels({ wagonType: 'wagon', wagonClass: '2' })).to.be.eql([
      i18nWagonLabel.en,
      i18nClass.second.en,
    ]);

    expect(await extractAriaLabels({ wagonType: 'wagon', occupancy: 'low' })).to.be.eql([
      i18nWagonLabel.en,
      i18nOccupancy.low.en,
    ]);
    expect(await extractAriaLabels({ wagonType: 'wagon', occupancy: 'medium' })).to.be.eql([
      i18nWagonLabel.en,
      i18nOccupancy.medium.en,
    ]);
    expect(await extractAriaLabels({ wagonType: 'wagon', occupancy: 'high' })).to.be.eql([
      i18nWagonLabel.en,
      i18nOccupancy.high.en,
    ]);

    expect(await extractAriaLabels({ wagonType: 'wagon', blockedPassage: 'next' })).to.be.eql([
      i18nWagonLabel.en,
      i18nBlockedPassage.next.en,
    ]);
    expect(await extractAriaLabels({ wagonType: 'wagon', blockedPassage: 'both' })).to.be.eql([
      i18nWagonLabel.en,
      i18nBlockedPassage.both.en,
    ]);
    expect(await extractAriaLabels({ wagonType: 'wagon', blockedPassage: 'none' })).to.be.eql([
      i18nWagonLabel.en,
    ]);

    expect(await extractAriaLabels({ wagonType: 'wagon-end-left' })).to.be.eql([
      i18nWagonLabel.en,
      i18nBlockedPassage.previous.en,
    ]);

    expect(await extractAriaLabels({ wagonType: 'wagon-end-right' })).to.be.eql([
      i18nWagonLabel.en,
      i18nBlockedPassage.next.en,
    ]);

    expect(
      await extractAriaLabels({ wagonType: 'wagon-end-right', blockedPassage: 'both' }),
    ).to.be.eql([i18nWagonLabel.en, i18nBlockedPassage.both.en]);

    expect(await extractAriaLabels({ wagonType: 'wagon-end-left', sector: 'A' })).to.be.eql([
      i18nWagonLabel.en,
      'Sector, A',
      i18nBlockedPassage.previous.en,
    ]);

    expect(await extractAriaLabels({ wagonType: 'wagon-end-right', sector: 'A' })).to.be.eql([
      i18nWagonLabel.en,
      'Sector, A',
      i18nBlockedPassage.next.en,
    ]);

    expect(
      await extractAriaLabels({
        wagonType: 'wagon-end-right',
        blockedPassage: 'both',
        sector: 'A',
      }),
    ).to.be.eql([i18nWagonLabel.en, 'Sector, A', i18nBlockedPassage.both.en]);
  });
});
