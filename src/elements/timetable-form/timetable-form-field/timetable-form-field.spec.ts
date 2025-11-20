import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbTimetableFormFieldElement } from './timetable-form-field.component.ts';

describe('sbb-timetable-form-field', () => {
  let element: SbbTimetableFormFieldElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-timetable-form-field>
        <label>From</label>
        <input type="text" name="from" />
      </sbb-timetable-form-field>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableFormFieldElement);
    expect(element.borderless).to.be.true;
    expect(element.floatingLabel).to.be.true;
    expect(element.width).to.be.equal('collapse');
    expect(element.size).to.be.equal('l');
  });
});
