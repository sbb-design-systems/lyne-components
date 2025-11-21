import { assert, expect } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import type { SbbFormFieldElement } from '@sbb-esta/lyne-elements/form-field.js';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteGridOptgroupElement } from '../autocomplete-grid-optgroup.ts';
import type { SbbAutocompleteGridElement } from '../autocomplete-grid.ts';

import { SbbAutocompleteGridOptionElement } from './autocomplete-grid-option.component.ts';

import '@sbb-esta/lyne-elements/form-field.js';
import '../autocomplete-grid.ts';
import '../autocomplete-grid-optgroup.ts';
import '../autocomplete-grid-row.ts';
import '../autocomplete-grid-cell.ts';
import '../autocomplete-grid-button.ts';

describe(`sbb-autocomplete-grid-option`, () => {
  let element: SbbFormFieldElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-autocomplete-grid>
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option>Option 1</sbb-autocomplete-grid-option>
            <sbb-autocomplete-grid-cell>
              <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
            </sbb-autocomplete-grid-cell>
          </sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option>Option 2</sbb-autocomplete-grid-option>
            <sbb-autocomplete-grid-cell>
              <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
            </sbb-autocomplete-grid-cell>
          </sbb-autocomplete-grid-row>
        </sbb-autocomplete-grid>
      </sbb-form-field>
    `);
  });

  it('renders', async () => {
    const option = element.querySelector('sbb-autocomplete-grid-option')!;
    assert.instanceOf(option, SbbAutocompleteGridOptionElement);
  });

  it('set selected and emits on click', async () => {
    const optionSelectedSpy = new EventSpy(SbbAutocompleteGridOptionElement.events.optionselected);
    const optionOne = element.querySelector<SbbAutocompleteGridOptionElement>(
      'sbb-autocomplete-grid-option',
    )!;

    optionOne.dispatchEvent(new PointerEvent('click'));
    await waitForLitRender(element);

    expect(optionOne.selected).to.be.equal(true);
    expect(optionSelectedSpy.count).to.be.equal(1);
  });

  it('highlight on input', async () => {
    const input = element.querySelector<HTMLInputElement>('input')!;
    const autocomplete =
      element.querySelector<SbbAutocompleteGridElement>('sbb-autocomplete-grid')!;
    const options = element.querySelectorAll('sbb-autocomplete-grid-option');
    const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');
    const optionTwoLabel = options[1].shadowRoot!.querySelector('.sbb-option__label > span');

    input.focus();
    await sendKeys({ press: '1' });
    await waitForLitRender(autocomplete);

    expect(optionOneLabel).dom.to.be.equal(
      `
      <span>
        <span class="sbb-option__label--highlight">Option</span>
        <span>1</span>
        <span class="sbb-option__label--highlight"></span>
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );
    expect(optionTwoLabel).dom.to.be.equal(
      `
      <span>
        Option 2
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );
  });

  it('highlight after option label changed', async () => {
    const input = element.querySelector<HTMLInputElement>('input')!;
    const autocomplete =
      element.querySelector<SbbAutocompleteGridElement>('sbb-autocomplete-grid')!;
    const options = element.querySelectorAll('sbb-autocomplete-grid-option');
    const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');

    input.focus();
    await sendKeys({ type: 'Opt' });
    await waitForLitRender(autocomplete);

    expect(optionOneLabel).dom.to.be.equal(
      `
      <span>
        <span class="sbb-option__label--highlight"></span>
        <span>Opt</span>
        <span class="sbb-option__label--highlight">ion 1</span>
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );

    options[0].textContent = 'Other content';
    await waitForLitRender(autocomplete);

    expect(optionOneLabel).dom.to.be.equal(
      `
      <span>
        Other content
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );

    options[0].textContent = 'Option';
    await waitForLitRender(autocomplete);

    expect(optionOneLabel).dom.to.be.equal(
      `
      <span>
        <span class="sbb-option__label--highlight"></span>
        <span>Opt</span>
        <span class="sbb-option__label--highlight">ion</span>
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );
  });

  it('highlight later added options', async () => {
    const input = element.querySelector<HTMLInputElement>('input')!;
    const autocomplete =
      element.querySelector<SbbAutocompleteGridElement>('sbb-autocomplete-grid')!;
    const options = element.querySelectorAll('sbb-autocomplete-grid-option');
    const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');

    input.focus();
    await sendKeys({ type: 'Opt' });
    await waitForLitRender(autocomplete);

    expect(optionOneLabel).dom.to.be.equal(
      `
      <span>
        <span class="sbb-option__label--highlight"></span>
        <span>Opt</span>
        <span class="sbb-option__label--highlight">ion 1</span>
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );

    const newOption = document.createElement('sbb-autocomplete-grid-option');
    newOption.innerText = 'Option 3';
    autocomplete.append(newOption);
    await waitForLitRender(autocomplete);

    const newOptionLabel = newOption.shadowRoot!.querySelector('.sbb-option__label > span');

    expect(newOptionLabel).dom.to.be.equal(
      `
      <span>
        <span class="sbb-option__label--highlight"></span>
        <span>Opt</span>
        <span class="sbb-option__label--highlight">ion 3</span>
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );
  });

  it('highlight later added options in sbb-optgroup', async () => {
    element = await fixture(html`
      <sbb-form-field>
        <input />
        <sbb-autocomplete-grid>
          <sbb-autocomplete-grid-optgroup>
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option>Option 1</sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button icon-name="pie-small"></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid-optgroup>
        </sbb-autocomplete-grid>
      </sbb-form-field>
    `);

    const input = element.querySelector<HTMLInputElement>('input')!;
    const optgroup = element.querySelector<SbbAutocompleteGridOptgroupElement>(
      'sbb-autocomplete-grid-optgroup',
    )!;
    const options = element.querySelectorAll('sbb-autocomplete-grid-option');
    const optionOneLabel = options[0].shadowRoot!.querySelector('.sbb-option__label > span');

    input.focus();
    await sendKeys({ type: 'Opt' });
    await waitForLitRender(element);

    expect(optionOneLabel).dom.to.be.equal(
      `
      <span>
        <span class="sbb-option__label--highlight"></span>
        <span>Opt</span>
        <span class="sbb-option__label--highlight">ion 1</span>
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );

    const newOption = document.createElement('sbb-autocomplete-grid-option');
    newOption.innerText = 'Option 2';
    optgroup.append(newOption);
    await waitForLitRender(element);

    const newOptionLabel = newOption.shadowRoot!.querySelector('.sbb-option__label > span');

    expect(newOptionLabel).dom.to.be.equal(
      `
      <span>
        <span class="sbb-option__label--highlight"></span>
        <span>Opt</span>
        <span class="sbb-option__label--highlight">ion 2</span>
      </span>
    `,
      { ignoreAttributes: ['aria-hidden'] },
    );
  });
});
