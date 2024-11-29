import { assert, expect } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { isSafari } from '../core/dom.js';
import { fixture, tabKey } from '../core/testing/private.js';
import { describeIf, EventSpy, waitForLitRender } from '../core/testing.js';
import { SbbFormFieldElement } from '../form-field.js';
import { SbbOptionElement } from '../option.js';

import { SbbAutocompleteElement } from './autocomplete.js';

describe(`sbb-autocomplete`, () => {
  let element: SbbAutocompleteElement, formField: SbbFormFieldElement, input: HTMLInputElement;

  beforeEach(async () => {
    formField = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-autocomplete id="myAutocomplete">
          <sbb-option id="option-1" value="1">1</sbb-option>
          <sbb-option id="option-2" value="2">2</sbb-option>
          <sbb-option id="option-3" value="3">3</sbb-option>
        </sbb-autocomplete>
      </sbb-form-field>
      <button>Use this for backdrop click</button>
    `);
    input = formField.querySelector<HTMLInputElement>('input')!;
    element = formField.querySelector<SbbAutocompleteElement>('sbb-autocomplete')!;
  });

  describeIf(isSafari, 'Safari', async () => {
    it('renders and sets the correct attributes', () => {
      assert.instanceOf(formField, SbbFormFieldElement);
      assert.instanceOf(element, SbbAutocompleteElement);

      expect(element).not.to.have.attribute('autocomplete-origin-borderless');

      expect(input).to.have.attribute('autocomplete', 'off');
      expect(input).to.have.attribute('role', 'combobox');
      expect(input).to.have.attribute('aria-autocomplete', 'list');
      expect(input).to.have.attribute('aria-haspopup', 'listbox');
      expect(input).to.have.attribute('aria-controls', 'myAutocomplete');
      expect(input).to.have.attribute('aria-owns', 'myAutocomplete');
      expect(input).to.have.attribute('aria-expanded', 'false');
    });
  });

  describeIf(!isSafari, 'Chrome-Firefox', async () => {
    it('renders and sets the correct attributes', () => {
      assert.instanceOf(formField, SbbFormFieldElement);
      assert.instanceOf(element, SbbAutocompleteElement);

      expect(element).not.to.have.attribute('autocomplete-origin-borderless');

      expect(input).to.have.attribute('autocomplete', 'off');
      expect(input).to.have.attribute('role', 'combobox');
      expect(input).to.have.attribute('aria-autocomplete', 'list');
      expect(input).to.have.attribute('aria-haspopup', 'listbox');
      expect(input).to.have.attribute('aria-controls', 'sbb-autocomplete-8');
      expect(input).to.have.attribute('aria-owns', 'sbb-autocomplete-8');
      expect(input).to.have.attribute('aria-expanded', 'false');
    });
  });

  it('opens and closes with mouse and keyboard', async () => {
    const willOpenEventSpy = new EventSpy(SbbAutocompleteElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbAutocompleteElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbAutocompleteElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbAutocompleteElement.events.didClose);

    input.click();
    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'true');

    await sendKeys({ press: 'Escape' });
    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);
    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'false');

    await sendKeys({ press: 'ArrowDown' });
    await willOpenEventSpy.calledTimes(2);
    expect(willOpenEventSpy.count).to.be.equal(2);
    await didOpenEventSpy.calledTimes(2);
    expect(didOpenEventSpy.count).to.be.equal(2);
    expect(input).to.have.attribute('aria-expanded', 'true');

    await sendKeys({ press: tabKey });
    await willCloseEventSpy.calledTimes(2);
    expect(willCloseEventSpy.count).to.be.equal(2);
    await didCloseEventSpy.calledTimes(2);
    expect(didCloseEventSpy.count).to.be.equal(2);
    expect(input).to.have.attribute('aria-expanded', 'false');

    input.click();
    await willOpenEventSpy.calledTimes(3);
    expect(willOpenEventSpy.count).to.be.equal(3);
    await didOpenEventSpy.calledTimes(3);
    expect(didOpenEventSpy.count).to.be.equal(3);
    expect(input).to.have.attribute('aria-expanded', 'true');

    // Simulate backdrop click
    await sendMouse({ type: 'click', position: [formField.offsetWidth + 25, 25] });

    await willCloseEventSpy.calledTimes(3);
    expect(willCloseEventSpy.count).to.be.equal(3);
    await didCloseEventSpy.calledTimes(3);
    expect(didCloseEventSpy.count).to.be.equal(3);
    expect(input).to.have.attribute('aria-expanded', 'false');
  });

  it('select by mouse', async () => {
    const didOpenEventSpy = new EventSpy(SbbAutocompleteElement.events.didOpen);
    const optionSelectedEventSpy = new EventSpy(SbbOptionElement.events.optionSelected);
    const inputEventSpy = new EventSpy('input', input);
    const changeEventSpy = new EventSpy('change', input);
    const optTwo = element.querySelector<SbbOptionElement>('#option-2')!;

    input.focus();
    await didOpenEventSpy.calledOnce();

    const positionRect = optTwo.getBoundingClientRect();

    await sendMouse({
      type: 'click',
      position: [
        Math.round(positionRect.x + window.scrollX + positionRect.width / 2),
        Math.round(positionRect.y + window.scrollY + positionRect.height / 2),
      ],
    });
    await waitForLitRender(element);

    expect(inputEventSpy.count).to.be.equal(1);
    expect(changeEventSpy.count).to.be.equal(1);
    expect(optionSelectedEventSpy.count).to.be.equal(1);
    expect(optionSelectedEventSpy.firstEvent!.target).to.have.property('id', 'option-2');
  });

  it('opens and select with keyboard', async () => {
    const didOpenEventSpy = new EventSpy(SbbAutocompleteElement.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbAutocompleteElement.events.didClose);
    const optionSelectedEventSpy = new EventSpy(SbbOptionElement.events.optionSelected);
    const inputEventSpy = new EventSpy('input', input);
    const changeEventSpy = new EventSpy('change', input);
    const optOne = element.querySelector('#option-1');
    const optTwo = element.querySelector('#option-2');
    const keydownSpy = new EventSpy('keydown', input);

    input.focus();

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);

    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'ArrowDown' });
    await waitForLitRender(element);
    expect(optOne).not.to.have.attribute('data-active');
    expect(optOne).not.to.have.attribute('selected');
    expect(optTwo).to.have.attribute('data-active');
    expect(optTwo).not.to.have.attribute('selected');
    expect(input).to.have.attribute('aria-activedescendant', 'option-2');

    await sendKeys({ press: 'Enter' });
    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(keydownSpy.lastEvent?.defaultPrevented).to.be.true;

    expect(optTwo).not.to.have.attribute('data-active');
    expect(optTwo).to.have.attribute('selected');
    expect(inputEventSpy.count).to.be.equal(1);
    expect(changeEventSpy.count).to.be.equal(1);
    expect(optionSelectedEventSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'false');
    expect(input).not.to.have.attribute('aria-activedescendant');
  });

  it('should stay closed when disabled', async () => {
    input.toggleAttribute('disabled', true);

    input.focus();
    await waitForLitRender(element);
    expect(input).to.have.attribute('aria-expanded', 'false');

    input.click();
    await waitForLitRender(element);
    expect(input).to.have.attribute('aria-expanded', 'false');

    await sendKeys({ press: 'ArrowDown' });
    await waitForLitRender(element);
    expect(input).to.have.attribute('aria-expanded', 'false');
  });

  it('should stay closed when readonly', async () => {
    input.toggleAttribute('readonly', true);

    input.focus();
    await waitForLitRender(element);
    expect(input).to.have.attribute('aria-expanded', 'false');

    input.click();
    await waitForLitRender(element);
    expect(input).to.have.attribute('aria-expanded', 'false');

    await sendKeys({ press: 'ArrowDown' });
    await waitForLitRender(element);
    expect(input).to.have.attribute('aria-expanded', 'false');
  });

  it('does not open if prevented', async () => {
    const willOpenEventSpy = new EventSpy(SbbAutocompleteElement.events.willOpen);

    element.addEventListener(SbbAutocompleteElement.events.willOpen, (ev) => ev.preventDefault());
    element.open();

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close if prevented', async () => {
    const didOpenEventSpy = new EventSpy(SbbAutocompleteElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbAutocompleteElement.events.willClose);

    element.open();
    await didOpenEventSpy.calledOnce();
    await waitForLitRender(element);

    element.addEventListener(SbbAutocompleteElement.events.willClose, (ev) => ev.preventDefault());
    element.close();

    await willCloseEventSpy.calledOnce();
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });
});
