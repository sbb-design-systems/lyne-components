import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbTimetableFormSwapButtonElement } from './timetable-form-swap-button.component.ts';

describe(`sbb-timetable-form-swap-button ssr`, () => {
  let root: SbbTimetableFormSwapButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>`,
      {
        modules: ['./timetable-form-swap-button.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbTimetableFormSwapButtonElement);
  });
});
