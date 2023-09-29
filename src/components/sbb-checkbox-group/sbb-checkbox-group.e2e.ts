import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbCheckboxGroup } from './sbb-checkbox-group';
import { SbbCheckbox } from '../sbb-checkbox';

describe('sbb-checkbox-group', () => {
  let element: SbbCheckboxGroup;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-checkbox-group>
        <sbb-checkbox id="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox id="checkbox-2" disabled value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox id="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCheckboxGroup);
  });

  it('disabled status is inherited', async () => {
    element.setAttribute('disabled', 'true');
    await element.updateComplete;
    expect(element).to.have.attribute('disabled', 'true');
    const checkboxOne = document.querySelector('sbb-checkbox-group > sbb-checkbox#checkbox-1');
    expect(checkboxOne.getAttribute('data-group-disabled')).not.to.be.null;
    const checkboxTwo = document.querySelector('sbb-checkbox-group > sbb-checkbox#checkbox-2');
    expect(checkboxTwo.getAttribute('data-group-disabled')).not.to.be.null;
    expect(checkboxTwo.getAttribute('disabled')).not.to.be.null;
    const checkboxThree = document.querySelector('sbb-checkbox-group > sbb-checkbox#checkbox-3');
    expect(checkboxThree.getAttribute('data-group-disabled')).not.to.be.null;
    element.removeAttribute('disabled');
    await element.updateComplete;
    expect(checkboxTwo.getAttribute('data-group-disabled')).to.be.null;
    expect(checkboxTwo.getAttribute('disabled')).not.to.be.null;
  });

  it('disabled status prevents changes', async () => {
    const checkboxOne: SbbCheckbox = document.querySelector(
      'sbb-checkbox-group > sbb-checkbox#checkbox-1',
    );
    const checkboxTwo: SbbCheckbox = document.querySelector(
      'sbb-checkbox-group > sbb-checkbox#checkbox-2',
    );
    const checkboxThree: SbbCheckbox = document.querySelector(
      'sbb-checkbox-group > sbb-checkbox#checkbox-3',
    );
    const checkboxes: SbbCheckbox[] = [checkboxOne, checkboxTwo, checkboxThree];
    checkboxes.forEach((check: SbbCheckbox) => expect(check).not.to.have.attribute('checked'));

    element.setAttribute('disabled', 'true');
    await element.updateComplete;
    expect(element).to.have.attribute('disabled', 'true');
    for (const check of checkboxes) {
      await check.click();
      await check.updateComplete;
    }
    await element.updateComplete;
    checkboxes.forEach((check: SbbCheckbox) => expect(check).not.to.have.attribute('checked'));

    element.removeAttribute('disabled');
    await element.updateComplete;
    for (const check of checkboxes) {
      await check.click();
      await check.updateComplete;
    }
    await element.updateComplete;

    expect(checkboxOne).to.have.attribute('checked', '');
    expect(checkboxTwo).not.to.have.attribute('checked');
    expect(checkboxThree).to.have.attribute('checked', '');
  });

  it('required status', async () => {
    element.setAttribute('required', 'true');
    await element.updateComplete;
    expect(element).to.have.attribute('required', 'true');
    const checkboxOne = document.querySelector('sbb-checkbox-group > sbb-checkbox#checkbox-1');
    expect(checkboxOne.getAttribute('data-group-required')).not.to.be.null;
    const checkboxTwo = document.querySelector('sbb-checkbox-group > sbb-checkbox#checkbox-2');
    expect(checkboxTwo.getAttribute('data-group-required')).not.to.be.null;
    const checkboxThree = document.querySelector('sbb-checkbox-group > sbb-checkbox#checkbox-3');
    expect(checkboxThree.getAttribute('data-group-required')).not.to.be.null;
  });
});
