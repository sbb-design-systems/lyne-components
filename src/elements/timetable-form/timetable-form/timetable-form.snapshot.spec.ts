import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbTimetableFormElement } from './timetable-form.component.js';
import './timetable-form.component.js';

describe(`sbb-timetable-form`, () => {
  describe('renders', () => {
    let element: SbbTimetableFormElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-timetable-form my-prop="Label"></sbb-timetable-form>`);
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
