import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { SbbTimetableDurationElement } from './timetable-duration.component.ts';
import sampleData from './timetable-duration.sample-data.private.ts';

import './timetable-duration.component.ts';

const config = JSON.stringify(sampleData[2]);

describe(`sbb-timetable-duration`, () => {
  let element: SbbTimetableDurationElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-duration .config="${config}"></sbb-timetable-duration>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
