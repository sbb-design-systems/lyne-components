import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import type { SbbCheckboxGroupElement } from '../checkbox';
import { SbbCheckboxElement } from '../checkbox';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing';
import type { SbbRadioButtonGroupElement } from '../radio-button';
import { SbbRadioButtonElement } from '../radio-button';

import { SbbSelectionPanelElement } from './selection-panel';
import '../link';

describe('sbb-selection-panel', () => {
  let elements: SbbSelectionPanelElement[];

  const getPageContent = (inputType: string): TemplateResult => {
    const tagGroupElement = unsafeStatic(`sbb-${inputType}-group`);
    const tagSingle = unsafeStatic(`sbb-${inputType}`);
    /* eslint-disable lit/binding-positions */
    return html`
      <${tagGroupElement} name="input-group-name" ${
        inputType === 'radio-button' && 'value="Value one"'
      }>
        <sbb-selection-panel disable-animation id="sbb-selection-panel-1">
          <${tagSingle} id="sbb-input-1" value="Value one" ?checked='${
            inputType === 'checkbox'
          }'>Value one</${tagSingle}>
          <div id="panel-content-1" slot="content">
            Inner Content
            <sbb-link>Link</sbb-link>
          </div>
        </sbb-selection-panel>
        <sbb-selection-panel disable-animation id="sbb-selection-panel-2">
          <${tagSingle} id="sbb-input-2" value="Value two">Value two</${tagSingle}>
          <div id="panel-content-2" slot="content">
            Inner Content
            <sbb-link>Link</sbb-link>
          </div>
        </sbb-selection-panel>
        <sbb-selection-panel disable-animation id="sbb-selection-panel-3">
          <${tagSingle} id="sbb-input-3" value="Value three" disabled>Value three</${tagSingle}>
          <div id="panel-content-3" slot="content">
            Inner Content
            <sbb-link>Link</sbb-link>
          </div>
        </sbb-selection-panel>
        <sbb-selection-panel disable-animation id="sbb-selection-panel-4">
          <${tagSingle} id="sbb-input-4" value="Value four">Value four</${tagSingle}>
          <div id="panel-content-4" slot="content">
            Inner Content
            <sbb-link>Link</sbb-link>
          </div>
        </sbb-selection-panel>
      </${tagGroupElement}>`;
    /* eslint-enable lit/binding-positions */
  };

  const forceOpenTest = async (wrapper, secondInput, secondContent): Promise<void> => {
    elements.forEach((e) => (e.forceOpen = true));
    await waitForLitRender(wrapper);

    elements.forEach((e) => {
      const panel = e.shadowRoot.querySelector('.sbb-selection-panel__content--wrapper');
      expect(panel).to.have.attribute('data-expanded', '');
    });

    expect(secondInput).not.to.have.attribute('checked');
    expect(secondContent).to.have.attribute('data-expanded');
    secondInput.click();
    await waitForLitRender(wrapper);
    expect(secondInput).to.have.attribute('checked');
    expect(secondContent).to.have.attribute('data-expanded');
  };

  const preservesDisabled = async (wrapper, disabledInput, secondInput): Promise<void> => {
    wrapper.disabled = true;
    await waitForLitRender(wrapper);

    disabledInput.click();
    await waitForLitRender(wrapper);
    expect(disabledInput).not.to.have.attribute('checked');

    secondInput.click();
    await waitForLitRender(wrapper);
    expect(secondInput).not.to.have.attribute('checked');

    wrapper.disabled = false;
    await waitForLitRender(wrapper);

    disabledInput.click();
    await waitForLitRender(wrapper);
    expect(disabledInput).not.to.have.attribute('checked');

    secondInput.click();
    await waitForLitRender(wrapper);
    expect(secondInput).to.have.attribute('checked');
  };

  const wrapsAround = async (wrapper, firstInput, secondInput): Promise<void> => {
    secondInput.click();
    secondInput.focus();
    await waitForLitRender(wrapper);

    expect(secondInput).to.have.attribute('checked');
    await sendKeys({ down: 'ArrowRight' });
    await sendKeys({ down: 'ArrowRight' });
    await waitForLitRender(wrapper);

    expect(document.activeElement.id).to.be.equal(firstInput.id);
  };

  describe('with radio buttons', () => {
    let wrapper: SbbRadioButtonGroupElement;
    let firstPanel: SbbSelectionPanelElement;
    let firstInput: SbbRadioButtonElement;
    let firstContent: HTMLDivElement;
    let secondPanel: SbbSelectionPanelElement;
    let secondInput: SbbRadioButtonElement;
    let secondContent: HTMLDivElement;
    let disabledInput: SbbRadioButtonElement;

    beforeEach(async () => {
      await fixture(getPageContent('radio-button'));
      elements = Array.from(document.querySelectorAll('sbb-selection-panel'));
      wrapper = document.querySelector('sbb-radio-button-group');
      firstPanel = document.querySelector('#sbb-selection-panel-1');
      firstInput = document.querySelector('#sbb-input-1');
      firstContent = firstPanel.shadowRoot.querySelector('.sbb-selection-panel__content--wrapper');
      secondPanel = document.querySelector('#sbb-selection-panel-2');
      secondInput = document.querySelector('#sbb-input-2');
      secondContent = secondPanel.shadowRoot.querySelector(
        '.sbb-selection-panel__content--wrapper',
      );
      disabledInput = document.querySelector('#sbb-input-3');
    });

    it('renders', () => {
      elements.forEach((e) => assert.instanceOf(e, SbbSelectionPanelElement));
    });

    it('selects input on click and shows related content', async () => {
      assert.instanceOf(firstPanel, SbbSelectionPanelElement);
      assert.instanceOf(firstInput, SbbRadioButtonElement);
      expect(firstInput).not.to.have.attribute('checked');
      expect(firstContent).not.to.have.attribute('data-expanded');

      assert.instanceOf(secondPanel, SbbSelectionPanelElement);
      assert.instanceOf(secondInput, SbbRadioButtonElement);
      expect(secondInput).not.to.have.attribute('checked');
      expect(secondContent).not.to.have.attribute('data-expanded');

      secondInput.click();
      await waitForLitRender(wrapper);
      expect(firstInput).not.to.have.attribute('checked');
      expect(firstContent).not.to.have.attribute('data-expanded');
      expect(secondInput).to.have.attribute('checked');
      expect(secondContent).to.have.attribute('data-expanded', '');
    });

    it('always displays related content with forceOpen', async () => {
      await forceOpenTest(wrapper, secondInput, secondContent);
    });

    it('dispatches event on input change', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      secondInput.click();
      await waitForLitRender(wrapper);
      expect(secondInput).to.have.attribute('checked');
      expect(firstInput).not.to.have.attribute('checked');
      expect(changeSpy.count).to.be.equal(1);
      expect(inputSpy.count).to.be.equal(1);

      firstInput.click();
      await waitForLitRender(wrapper);
      expect(secondInput).not.to.have.attribute('checked');
      expect(firstInput).to.have.attribute('checked');
      expect(changeSpy.count).to.be.equal(2);
      expect(inputSpy.count).to.be.equal(2);
    });

    it('does not select disabled input on click', async () => {
      firstInput.click();
      await waitForLitRender(wrapper);
      expect(firstInput).to.have.attribute('checked');
      expect(disabledInput).not.to.have.attribute('checked');

      disabledInput.click();
      await waitForLitRender(wrapper);
      expect(disabledInput).not.to.have.attribute('checked');
      expect(firstInput).to.have.attribute('checked');
    });

    it('preserves input button disabled state after being disabled from group', async () => {
      await preservesDisabled(wrapper, disabledInput, secondInput);
    });

    it('focuses input on left arrow key pressed and selects it on space key pressed', async () => {
      const fourthInput: SbbRadioButtonElement = document.querySelector('#sbb-input-4');

      firstInput.click();
      firstInput.focus();
      await sendKeys({ down: 'ArrowLeft' });
      await waitForLitRender(wrapper);
      expect(document.activeElement.id).to.be.equal(fourthInput.id);
      expect(firstInput).to.have.attribute('checked');
      expect(fourthInput).not.to.have.attribute('checked');

      await sendKeys({ press: ' ' });
      expect(fourthInput).to.have.attribute('checked');
      expect(firstInput).not.to.have.attribute('checked');
    });

    it('focuses input on right arrow key pressed and selects it on space key pressed', async () => {
      firstInput.click();
      firstInput.focus();
      await sendKeys({ down: 'ArrowRight' });
      await waitForLitRender(wrapper);
      expect(document.activeElement.id).to.be.equal(secondInput.id);
      expect(firstInput).to.have.attribute('checked');
      expect(secondInput).not.to.have.attribute('checked');

      await sendKeys({ press: ' ' });
      expect(secondInput).to.have.attribute('checked');
      expect(firstInput).not.to.have.attribute('checked');
    });

    it('wraps around on arrow key navigation', async () => {
      await wrapsAround(wrapper, firstInput, secondInput);
    });
  });

  describe('with radio group with no slotted content', () => {
    it('focus selected, the focus and select on keyboard navigation', async () => {
      await fixture(html`
        <sbb-radio-button-group id="group-no-content" name="input-group-name" value="Value 2">
          <sbb-selection-panel disable-animation id="no-content-1">
            <sbb-radio-button id="input-no-content-1" value="Value 1">Value one</sbb-radio-button>
          </sbb-selection-panel>
          <sbb-selection-panel disable-animation id="no-content-2">
            <sbb-radio-button id="input-no-content-2" value="Value 2">Value two</sbb-radio-button>
          </sbb-selection-panel>
          <sbb-selection-panel disable-animation id="no-content-3">
            <sbb-radio-button id="input-no-content-3" value="Value 3" disabled
              >Value three</sbb-radio-button
            >
          </sbb-selection-panel>
          <sbb-selection-panel disable-animation id="no-content-4">
            <sbb-radio-button id="input-no-content-4" value="Value 4">Value four</sbb-radio-button>
          </sbb-selection-panel>
        </sbb-radio-button-group>
      `);
      const wrapperNoContent = document.querySelector('#group-no-content');
      const firstInputNoContent: SbbRadioButtonElement =
        document.querySelector('#input-no-content-1');
      const secondInputNoContent: SbbRadioButtonElement =
        document.querySelector('#input-no-content-2');
      const fourthInputNoContent: SbbRadioButtonElement =
        document.querySelector('#input-no-content-4');

      await sendKeys({ down: 'Tab' });
      await waitForLitRender(wrapperNoContent);
      expect(document.activeElement.id).to.be.equal(secondInputNoContent.id);

      await sendKeys({ down: 'ArrowUp' });
      await waitForLitRender(wrapperNoContent);
      expect(document.activeElement.id).to.be.equal(firstInputNoContent.id);
      expect(secondInputNoContent).not.to.have.attribute('checked');
      expect(firstInputNoContent).to.have.attribute('checked');

      await sendKeys({ down: 'ArrowRight' });
      await waitForLitRender(wrapperNoContent);
      expect(document.activeElement.id).to.be.equal(secondInputNoContent.id);
      expect(firstInputNoContent).not.to.have.attribute('checked');
      expect(secondInputNoContent).to.have.attribute('checked');

      await sendKeys({ down: 'ArrowDown' });
      await waitForLitRender(wrapperNoContent);
      expect(document.activeElement.id).to.be.equal(fourthInputNoContent.id);
      expect(secondInputNoContent).not.to.have.attribute('checked');
      expect(fourthInputNoContent).to.have.attribute('checked');

      await sendKeys({ down: 'ArrowLeft' });
      await waitForLitRender(wrapperNoContent);
      expect(document.activeElement.id).to.be.equal(secondInputNoContent.id);
      expect(fourthInputNoContent).not.to.have.attribute('checked');
      expect(secondInputNoContent).to.have.attribute('checked');
    });
  });

  describe('with nested radio buttons', () => {
    let nestedElement: SbbRadioButtonGroupElement;

    beforeEach(async () => {
      nestedElement = await fixture(html`
        <sbb-radio-button-group orientation="vertical" horizontal-from="large">
          <sbb-selection-panel disable-animation>
            <sbb-radio-button value="main1" checked> Main Option 1 </sbb-radio-button>
            <sbb-radio-button-group orientation="vertical" slot="content">
              <sbb-radio-button value="sub1" checked>Suboption 1</sbb-radio-button>
              <sbb-radio-button value="sub2">Suboption 2</sbb-radio-button>
            </sbb-radio-button-group>
          </sbb-selection-panel>

          <sbb-selection-panel disable-animation>
            <sbb-radio-button value="main2"> Main Option 2 </sbb-radio-button>
            <sbb-radio-button-group orientation="vertical" slot="content">
              <sbb-radio-button value="sub3">Suboption 3</sbb-radio-button>
              <sbb-radio-button value="sub4">Suboption 4</sbb-radio-button>
            </sbb-radio-button-group>
          </sbb-selection-panel>
        </sbb-radio-button-group>
      `);
      await waitForLitRender(nestedElement);
    });

    it('should display expanded label correctly', async () => {
      const mainRadioButton1: SbbRadioButtonElement = document.querySelector(
        "sbb-radio-button[value='main1']",
      );
      const mainRadioButton1Label = mainRadioButton1.shadowRoot.querySelector(
        '.sbb-radio-button__expanded-label',
      );
      const mainRadioButton2: SbbRadioButtonElement = document.querySelector(
        "sbb-radio-button[value='main2']",
      );
      const mainRadioButton2Label = mainRadioButton2.shadowRoot.querySelector(
        '.sbb-radio-button__expanded-label',
      );
      const subRadioButton1 = document
        .querySelector("sbb-radio-button[value='sub1']")
        .shadowRoot.querySelector('.sbb-radio-button__expanded-label');

      expect(mainRadioButton1Label.textContent.trim()).to.be.equal(', expanded');
      expect(mainRadioButton2Label.textContent.trim()).to.be.equal(', collapsed');
      expect(subRadioButton1).to.be.null;

      // Activate main option 2
      mainRadioButton2.click();

      await waitForLitRender(nestedElement);

      expect(mainRadioButton1Label.textContent.trim()).to.be.equal(', collapsed');
      expect(mainRadioButton2Label.textContent.trim()).to.be.equal(', expanded');
      expect(subRadioButton1).to.be.null;
    });

    it('should mark only outer group children as disabled', async () => {
      nestedElement.setAttribute('disabled', '');
      await waitForLitRender(nestedElement);

      const radioButtons: SbbRadioButtonElement[] = Array.from(
        document.querySelectorAll('sbb-radio-button'),
      );

      expect(radioButtons.length).to.be.equal(6);
      expect(radioButtons[0]).to.have.attribute('disabled');
      expect(radioButtons[1]).not.to.have.attribute('disabled');
      expect(radioButtons[2]).not.to.have.attribute('disabled');
      expect(radioButtons[3]).to.have.attribute('disabled');
      expect(radioButtons[4]).not.to.have.attribute('disabled');
      expect(radioButtons[5]).not.to.have.attribute('disabled');
    });

    it('should not with interfere content on selection', async () => {
      const main1: SbbRadioButtonElement = document.querySelector(
        'sbb-radio-button[value="main1"]',
      );
      const main2: SbbRadioButtonElement = document.querySelector(
        'sbb-radio-button[value="main2"]',
      );
      const sub1: SbbRadioButtonElement = document.querySelector('sbb-radio-button[value="sub1"]');

      expect(main1).to.have.attribute('checked');
      expect(main2).not.to.have.attribute('checked');
      expect(sub1).to.have.attribute('checked');

      main2.checked = true;
      await waitForLitRender(nestedElement);

      expect(main1).not.to.have.attribute('checked');
      expect(main2).to.have.attribute('checked');
      expect(sub1).to.have.attribute('checked');
    });
  });

  describe('with template tag manipulation', () => {
    it('should initialize the group correctly after append', async () => {
      await fixture(html`
        <template>
          <sbb-selection-panel disable-animation>
            <sbb-radio-button value="main1" checked="true"> Main Option 1 </sbb-radio-button>
            <sbb-radio-button-group orientation="vertical" slot="content">
              <sbb-radio-button value="sub1" checked>Suboption 1</sbb-radio-button>
              <sbb-radio-button value="sub2">Suboption 2</sbb-radio-button>
            </sbb-radio-button-group>
          </sbb-selection-panel>

          <sbb-selection-panel disable-animation>
            <sbb-radio-button value="main2"> Main Option 2 </sbb-radio-button>
            <sbb-radio-button-group orientation="vertical" slot="content">
              <sbb-radio-button value="sub3">Suboption 3</sbb-radio-button>
              <sbb-radio-button value="sub4">Suboption 4</sbb-radio-button>
            </sbb-radio-button-group>
          </sbb-selection-panel>
        </template>

        <sbb-radio-button-group value="main1"></sbb-radio-button-group>
      `);

      const radioGroup = document.querySelector('sbb-radio-button-group');
      const selectionPanels = Array.from(
        document.querySelector('template').content.querySelectorAll('sbb-selection-panel'),
      );

      selectionPanels.forEach((el) => radioGroup.appendChild(el as HTMLElement));
      await waitForLitRender(radioGroup);

      const sub1 = document.querySelector("sbb-radio-button[value='sub1']") as HTMLElement;
      const sub2 = document.querySelector("sbb-radio-button[value='sub2']") as HTMLElement;

      expect(sub1).to.have.attribute('checked');
      expect(sub2).not.to.have.attribute('checked');

      sub2.click();
      await waitForLitRender(radioGroup);

      expect(sub1).not.to.have.attribute('checked');
      expect(sub2).to.have.attribute('checked');
    });
  });

  describe('with checkboxes', () => {
    let wrapper: SbbCheckboxGroupElement;
    let firstPanel: SbbSelectionPanelElement;
    let firstInput: SbbCheckboxElement;
    let firstContent: HTMLDivElement;
    let secondPanel: SbbSelectionPanelElement;
    let secondInput: SbbCheckboxElement;
    let secondContent: HTMLDivElement;
    let disabledInput: SbbCheckboxElement;

    beforeEach(async () => {
      await fixture(getPageContent('checkbox'));
      elements = Array.from(document.querySelectorAll('sbb-selection-panel'));
      wrapper = document.querySelector('sbb-checkbox-group');
      firstPanel = document.querySelector('#sbb-selection-panel-1');
      firstInput = document.querySelector('#sbb-input-1');
      firstContent = firstPanel.shadowRoot.querySelector('.sbb-selection-panel__content--wrapper');
      secondPanel = document.querySelector('#sbb-selection-panel-2');
      secondInput = document.querySelector('#sbb-input-2');
      secondContent = secondPanel.shadowRoot.querySelector(
        '.sbb-selection-panel__content--wrapper',
      );
      disabledInput = document.querySelector('#sbb-input-3');
    });

    it('renders', () => {
      elements.forEach((e) => assert.instanceOf(e, SbbSelectionPanelElement));
    });

    it('selects input on click and shows related content', async () => {
      await waitForLitRender(wrapper);

      assert.instanceOf(firstPanel, SbbSelectionPanelElement);
      assert.instanceOf(firstInput, SbbCheckboxElement);

      // TODO fix: should be 'opened', actual is 'close'.
      // we have to rethink the open/close flow to make it work
      //expect(firstPanel).to.have.attribute('data-state', 'opened');
      expect(firstInput).to.have.attribute('checked');
      expect(firstContent).to.have.attribute('data-expanded', '');

      assert.instanceOf(secondPanel, SbbSelectionPanelElement);
      assert.instanceOf(secondInput, SbbCheckboxElement);
      expect(firstPanel).to.have.attribute('data-state', 'closed');
      expect(secondInput).not.to.have.attribute('checked');
      expect(secondContent).not.to.have.attribute('data-expanded');

      secondInput.click();
      await waitForLitRender(wrapper);
      expect(firstInput).to.have.attribute('checked');
      expect(firstContent).to.have.attribute('data-expanded', '');
      expect(secondInput).to.have.attribute('checked');
      expect(secondContent).to.have.attribute('data-expanded', '');
    });

    it('deselects input on click and hides related content', async () => {
      expect(firstInput).to.have.attribute('checked');
      expect(firstContent).to.have.attribute('data-expanded');

      firstInput.click();
      await waitForLitRender(wrapper);
      expect(firstInput).not.to.have.attribute('checked');
      expect(firstContent).not.to.have.attribute('data-expanded');
    });

    it('always displays related content with forceOpen', async () => {
      await forceOpenTest(wrapper, secondInput, secondContent);
    });

    it('dispatches event on input change', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      secondInput.click();
      await waitForLitRender(wrapper);
      expect(secondInput).to.have.attribute('checked');
      expect(firstInput).to.have.attribute('checked');
      expect(changeSpy.count).to.be.equal(1);
      expect(inputSpy.count).to.be.equal(1);

      firstInput.click();
      await waitForLitRender(wrapper);
      expect(firstInput).not.to.have.attribute('checked');
      expect(secondInput).to.have.attribute('checked');
      expect(changeSpy.count).to.be.equal(2);
      expect(inputSpy.count).to.be.equal(2);
    });

    it('does not select disabled input on click', async () => {
      disabledInput.click();
      await waitForLitRender(wrapper);
      expect(disabledInput).not.to.have.attribute('checked');
      expect(firstInput).to.have.attribute('checked');
    });

    it('preserves input button disabled state after being disabled from group', async () => {
      await preservesDisabled(wrapper, disabledInput, secondInput);
    });

    it('focuses input on left arrow key pressed and selects it on space key pressed', async () => {
      const fourthInput: SbbRadioButtonElement = document.querySelector('#sbb-input-4');

      firstInput.click();
      firstInput.focus();
      await sendKeys({ down: 'ArrowLeft' });
      await waitForLitRender(wrapper);
      expect(document.activeElement.id).to.be.equal(fourthInput.id);
      expect(firstInput).not.to.have.attribute('checked');
      expect(fourthInput).not.to.have.attribute('checked');

      await sendKeys({ press: ' ' });

      await waitForCondition(() => fourthInput.hasAttribute('checked'));
      expect(fourthInput).to.have.attribute('checked');
      expect(firstInput).not.to.have.attribute('checked');
    });

    it('focuses input on right arrow key pressed and selects it on space key pressed', async () => {
      firstInput.click();
      firstInput.focus();
      await sendKeys({ down: 'ArrowRight' });
      await waitForLitRender(wrapper);
      expect(document.activeElement.id).to.be.equal(secondInput.id);
      expect(firstInput).not.to.have.attribute('checked');
      expect(secondInput).not.to.have.attribute('checked');

      await sendKeys({ press: ' ' });

      await waitForCondition(() => !firstInput.hasAttribute('checked'));
      expect(firstInput).not.to.have.attribute('checked');
      expect(secondInput).to.have.attribute('checked');
    });

    it('wraps around on arrow key navigation', async () => {
      await wrapsAround(wrapper, firstInput, secondInput);
    });
  });

  describe('with nested checkboxes', () => {
    let nestedElement: SbbCheckboxGroupElement;

    beforeEach(async () => {
      nestedElement = await fixture(html`
        <sbb-checkbox-group orientation="vertical" horizontal-from="large">
          <sbb-selection-panel disable-animation>
            <sbb-checkbox value="main1" checked> Main Option 1 </sbb-checkbox>
            <sbb-checkbox-group orientation="vertical" slot="content">
              <sbb-checkbox value="sub1" checked>Suboption 1</sbb-checkbox>
              <sbb-checkbox value="sub2">Suboption 2</sbb-checkbox>
            </sbb-checkbox-group>
          </sbb-selection-panel>

          <sbb-selection-panel disable-animation>
            <sbb-checkbox value="main2"> Main Option 2 </sbb-checkbox>
            <sbb-checkbox-group orientation="vertical" slot="content">
              <sbb-checkbox value="sub3">Suboption 3</sbb-checkbox>
              <sbb-checkbox value="sub4">Suboption 4</sbb-checkbox>
            </sbb-checkbox-group>
          </sbb-selection-panel>
        </sbb-checkbox-group>
      `);
      await waitForLitRender(nestedElement);
    });

    it('should display expanded label correctly', async () => {
      const mainCheckbox1: SbbCheckboxElement = document.querySelector(
        "sbb-checkbox[value='main1']",
      );
      const mainCheckbox1Label = mainCheckbox1.shadowRoot.querySelector(
        '.sbb-checkbox__expanded-label',
      );
      const mainCheckbox2: SbbCheckboxElement = document.querySelector(
        "sbb-checkbox[value='main2']",
      );
      const mainCheckbox2Label = mainCheckbox2.shadowRoot.querySelector(
        '.sbb-checkbox__expanded-label',
      );
      const subCheckbox1 = document
        .querySelector("sbb-checkbox[value='sub1']")
        .shadowRoot.querySelector('.sbb-checkbox__expanded-label');

      expect(mainCheckbox1Label.textContent.trim()).to.be.equal(', expanded');
      expect(mainCheckbox2Label.textContent.trim()).to.be.equal(', collapsed');
      expect(subCheckbox1).to.be.null;

      // Deactivate main option 1
      mainCheckbox1.click();

      // Activate main option 2
      mainCheckbox2.click();

      await waitForLitRender(nestedElement);

      expect(mainCheckbox1Label.textContent.trim()).to.be.equal(', collapsed');
      expect(mainCheckbox2Label.textContent.trim()).to.be.equal(', expanded');
      expect(subCheckbox1).to.be.null;
    });

    it('should mark only outer group children as disabled', async () => {
      nestedElement.setAttribute('disabled', '');
      await waitForLitRender(nestedElement);

      const checkboxes: SbbCheckboxElement[] = Array.from(
        document.querySelectorAll('sbb-checkbox'),
      );

      expect(checkboxes.length).to.be.equal(6);
      expect(checkboxes[0]).to.have.attribute('disabled');
      expect(checkboxes[1]).not.to.have.attribute('disabled');
      expect(checkboxes[2]).not.to.have.attribute('disabled');
      expect(checkboxes[3]).to.have.attribute('disabled');
      expect(checkboxes[4]).not.to.have.attribute('disabled');
      expect(checkboxes[5]).not.to.have.attribute('disabled');
    });
  });
});
