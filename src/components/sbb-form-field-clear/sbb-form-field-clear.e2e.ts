import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { waitForLitRender } from '../core/testing';
import { SbbFormFieldClear } from './sbb-form-field-clear';
import { SbbFormField } from '../sbb-form-field/sbb-form-field';

describe('sbb-form-field-clear', () => {
  let element: SbbFormFieldClear;
  let formField: SbbFormField;
  let input: HTMLInputElement;

  beforeEach(async () => {
    formField = await fixture(
      html` <sbb-form-field label="Label">
        <input id="input" type="text" placeholder="Input placeholder" value="Input value" />
        <sbb-form-field-clear />
      </sbb-form-field>`,
    );
    element = formField.querySelector('sbb-form-field-clear');
    input = formField.querySelector('input');
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbFormFieldClear);
    assert.instanceOf(formField, SbbFormField);
  });

  it('clears the value and sets the focus on the input', async () => {
    expect(input.value).to.be.equal('Input value');

    await element.click();
    await waitForLitRender(element);

    expect(input.value).not.to.be.ok; // to be falsy
    expect(document.activeElement.id).to.be.equal('input');
    expect(element).to.have.style('display', 'none');
  });

  it('is hidden if the form field is disabled', async () => {
    input.setAttribute('disabled', '');

    await waitForLitRender(element);

    expect(element).to.have.style('display', 'none');
  });

  it('is hidden if the form field is readonly', async () => {
    input.setAttribute('readonly', '');

    await waitForLitRender(element);

    expect(element).to.have.style('display', 'none');
  });
});
