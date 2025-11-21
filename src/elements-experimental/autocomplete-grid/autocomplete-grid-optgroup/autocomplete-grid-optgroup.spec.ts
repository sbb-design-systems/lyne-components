import { assert, expect } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.ts';

import { SbbAutocompleteGridOptgroupElement } from './autocomplete-grid-optgroup.component.ts';

import '../autocomplete-grid.ts';
import '../autocomplete-grid-row.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-button.ts';
import '../autocomplete-grid-option.ts';

describe(`sbb-autocomplete-grid-optgroup`, () => {
  let element: SbbAutocompleteGridOptgroupElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-autocomplete-grid-optgroup label="Group 1">
        <sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-option id="option-1" value="1"
            >Option 1</sbb-autocomplete-grid-option
          >
          <sbb-autocomplete-grid-cell>
            <sbb-autocomplete-grid-button
              icon-name="pen-small"
              id="button-1"
            ></sbb-autocomplete-grid-button>
          </sbb-autocomplete-grid-cell>
        </sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-option id="option-2" value="2" disabled
            >Option 2</sbb-autocomplete-grid-option
          >
          <sbb-autocomplete-grid-cell>
            <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
          </sbb-autocomplete-grid-cell>
        </sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-option id="option-3" value="3"
            >Option 3</sbb-autocomplete-grid-option
          >
          <sbb-autocomplete-grid-cell>
            <sbb-autocomplete-grid-button icon-name="pen-small"></sbb-autocomplete-grid-button>
          </sbb-autocomplete-grid-cell>
        </sbb-autocomplete-grid-row>
      </sbb-autocomplete-grid-optgroup>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbAutocompleteGridOptgroupElement);
  });

  it('disabled status is inherited', async () => {
    const optionOne = element.querySelector('sbb-autocomplete-grid-option#option-1');
    const buttonOne = element.querySelector('sbb-autocomplete-grid-button#button-1');
    const optionTwo = element.querySelector('sbb-autocomplete-grid-option#option-2');
    const optionThree = element.querySelector('sbb-autocomplete-grid-option#option-3');
    element.setAttribute('disabled', '');
    await waitForLitRender(element);

    expect(element).to.have.attribute('disabled');
    expect(optionOne).to.match(':state(disabled)');
    expect(buttonOne).to.match(':state(disabled)');
    expect(optionTwo).to.match(':state(disabled)');
    expect(optionTwo).to.have.attribute('disabled');
    expect(optionThree).to.match(':state(disabled)');

    element.removeAttribute('disabled');
    await waitForLitRender(element);
    expect(buttonOne).not.to.match(':state(disabled)');
    expect(optionTwo).to.match(':state(disabled)');
    expect(optionTwo).to.have.attribute('disabled');
  });

  it('disabled status prevents changes', async () => {
    const optionOne: SbbAutocompleteGridOptionElement = element.querySelector(
      'sbb-autocomplete-grid-option#option-1',
    )!;
    const optionTwo: SbbAutocompleteGridOptionElement = element.querySelector(
      'sbb-autocomplete-grid-option#option-2',
    )!;
    const optionThree: SbbAutocompleteGridOptionElement = element.querySelector(
      'sbb-autocomplete-grid-option#option-3',
    )!;
    const options = [optionOne, optionTwo, optionThree];

    options.forEach((opt) => expect(opt).not.to.have.attribute('selected'));

    element.setAttribute('disabled', '');
    await waitForLitRender(element);
    expect(element).to.have.attribute('disabled');

    // clicks should have no effect since the group is disabled
    for (const opt of options) {
      opt.click();
      await waitForLitRender(opt);
      expect(opt).not.to.have.attribute('selected');
    }

    element.removeAttribute('disabled');
    await waitForLitRender(element);
    for (const opt of options) {
      opt.click();
      await waitForLitRender(opt);
    }

    expect(optionOne).to.have.attribute('selected');
    expect(optionTwo).not.to.have.attribute('selected');
    expect(optionThree).to.have.attribute('selected');
  });
});
