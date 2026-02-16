import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTimetableFormSwapButtonElement } from './timetable-form-swap-button.component.ts';
import './timetable-form-swap-button.component.ts';

describe(`sbb-timetable-form-swap-button`, () => {
  describe('renders', () => {
    let element: SbbTimetableFormSwapButtonElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>`,
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
