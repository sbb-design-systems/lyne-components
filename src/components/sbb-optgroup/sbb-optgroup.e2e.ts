import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbOptGroup } from './sbb-optgroup';
import { SbbOption } from '../sbb-option';
import { waitForLitRender } from '../core/testing';
import '../sbb-option';

describe('sbb-optgroup', () => {
  let element: SbbOptGroup;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-optgroup label="Group 1">
        <sbb-option id="option-1" value="option-1">Label 1</sbb-option>
        <sbb-option id="option-2" disabled value="option-2">Label 2</sbb-option>
        <sbb-option id="option-3" value="option-3">Label 3</sbb-option>
      </sbb-optgroup>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbOptGroup);
  });

  it('disabled status is inherited', async () => {
    const optionOne = document.querySelector('sbb-optgroup > sbb-option#option-1');
    const optionTwo = document.querySelector('sbb-optgroup > sbb-option#option-2');
    const optionThree = document.querySelector('sbb-optgroup > sbb-option#option-3');
    element.setAttribute('disabled', '');
    await waitForLitRender(element);

    expect(element).to.have.attribute('disabled');
    expect(optionOne).to.have.attribute('data-group-disabled');
    expect(optionTwo).to.have.attribute('data-group-disabled');
    expect(optionTwo).to.have.attribute('disabled');
    expect(optionThree).to.have.attribute('data-group-disabled');

    element.removeAttribute('disabled');
    await waitForLitRender(element);
    expect(optionTwo).not.to.have.attribute('data-group-disabled');
    expect(optionTwo).to.have.attribute('disabled');
  });

  it('disabled status prevents changes', async () => {
    const optionOne: SbbOption = document.querySelector('sbb-optgroup > sbb-option#option-1');
    const optionTwo: SbbOption = document.querySelector('sbb-optgroup > sbb-option#option-2');
    const optionThree: SbbOption = document.querySelector('sbb-optgroup > sbb-option#option-3');
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
