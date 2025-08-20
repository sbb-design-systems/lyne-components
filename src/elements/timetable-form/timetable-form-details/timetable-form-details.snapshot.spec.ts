import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbTimetableFormDetailsElement } from './timetable-form-details.component.js';
import './timetable-form-details.component.js';

describe(`sbb-timetable-form-details`, () => {
  describe('renders', () => {
    let element: SbbTimetableFormDetailsElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-form-details my-prop="Label"></sbb-timetable-form-details>`,
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
