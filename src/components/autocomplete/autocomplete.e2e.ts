import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForCondition, waitForLitRender, EventSpy } from '../core/testing';
import { SbbFormField } from '../form-field';
import { SbbOption } from '../option';

import { SbbAutocomplete } from './autocomplete';

describe('sbb-autocomplete', () => {
  let element: SbbAutocomplete, formField: SbbFormField, input: HTMLInputElement;

  beforeEach(async () => {
    formField = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-autocomplete id="myAutocomplete" disable-animation>
          <sbb-option id="option-1" value="1">1</sbb-option>
          <sbb-option id="option-2" value="2">2</sbb-option>
          <sbb-option id="option-3" value="3">3</sbb-option>
        </sbb-autocomplete>
      </sbb-form-field>
      <button>Use this for backdrop click</button>
    `);
    input = formField.querySelector('input');
    element = formField.querySelector('sbb-autocomplete');
  });

  it('renders and sets the correct attributes', () => {
    assert.instanceOf(formField, SbbFormField);
    assert.instanceOf(element, SbbAutocomplete);

    expect(element).not.to.have.attribute('autocomplete-origin-borderless');

    expect(input).to.have.attribute('autocomplete', 'off');
    expect(input).to.have.attribute('role', 'combobox');
    expect(input).to.have.attribute('aria-autocomplete', 'list');
    expect(input).to.have.attribute('aria-haspopup', 'listbox');
    expect(input).to.have.attribute('aria-controls', 'myAutocomplete');
    expect(input).to.have.attribute('aria-owns', 'myAutocomplete');
    expect(input).to.have.attribute('aria-expanded', 'false');
  });

  it('opens and closes with mouse and keyboard', async () => {
    const willOpenEventSpy = new EventSpy(SbbAutocomplete.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbAutocomplete.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbAutocomplete.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbAutocomplete.events.didClose);

    input.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'true');

    await sendKeys({ press: 'Escape' });
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'false');

    await sendKeys({ press: 'ArrowDown' });
    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy.count).to.be.equal(2);
    await waitForCondition(() => didOpenEventSpy.events.length === 2);
    expect(didOpenEventSpy.count).to.be.equal(2);
    expect(input).to.have.attribute('aria-expanded', 'true');

    await sendKeys({ press: 'Tab' });
    await waitForCondition(() => willCloseEventSpy.events.length === 2);
    expect(willCloseEventSpy.count).to.be.equal(2);
    await waitForCondition(() => didCloseEventSpy.events.length === 2);
    expect(didCloseEventSpy.count).to.be.equal(2);
    expect(input).to.have.attribute('aria-expanded', 'false');

    input.click();
    await waitForCondition(() => willOpenEventSpy.events.length === 3);
    expect(willOpenEventSpy.count).to.be.equal(3);
    await waitForCondition(() => didOpenEventSpy.events.length === 3);
    expect(didOpenEventSpy.count).to.be.equal(3);
    expect(input).to.have.attribute('aria-expanded', 'true');

    // Simulate backdrop click
    sendMouse({ type: 'click', position: [formField.offsetWidth + 25, 25] });

    await waitForCondition(() => willCloseEventSpy.events.length === 3);
    expect(willCloseEventSpy.count).to.be.equal(3);
    await waitForCondition(() => didCloseEventSpy.events.length === 3);
    expect(didCloseEventSpy.count).to.be.equal(3);
    expect(input).to.have.attribute('aria-expanded', 'false');
  });

  it('select by mouse', async () => {
    const willOpenEventSpy = new EventSpy(SbbAutocomplete.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbAutocomplete.events.didOpen);
    const optionSelectedEventSpy = new EventSpy(SbbOption.events.optionSelected);

    input.focus();
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);

    expect(optionSelectedEventSpy.count).to.be.equal(1);
    expect(optionSelectedEventSpy.firstEvent.target).to.have.property('id', 'option-2');
  });

  it('opens and select with keyboard', async () => {
    const didOpenEventSpy = new EventSpy(SbbAutocomplete.events.didOpen);
    const didCloseEventSpy = new EventSpy(SbbAutocomplete.events.didClose);
    const optionSelectedEventSpy = new EventSpy(SbbOption.events.optionSelected);
    const optOne = element.querySelector('#option-1');
    const optTwo = element.querySelector('#option-2');
    input.focus();

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    await sendKeys({ press: 'ArrowDown' });
    await sendKeys({ press: 'ArrowDown' });
    await waitForLitRender(element);
    expect(optOne).not.to.have.attribute('active');
    expect(optOne).not.to.have.attribute('selected');
    expect(optTwo).to.have.attribute('active');
    expect(optTwo).not.to.have.attribute('selected');
    expect(input).to.have.attribute('aria-activedescendant', 'option-2');

    await sendKeys({ press: 'Enter' });
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    expect(optTwo).not.to.have.attribute('active');
    expect(optTwo).to.have.attribute('selected');
    expect(optionSelectedEventSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('aria-expanded', 'false');
    expect(input).not.to.have.attribute('aria-activedescendant');
  });

  it('should stay closed when disabled', async () => {
    input.setAttribute('disabled', '');

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
    input.setAttribute('readonly', '');

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
});
