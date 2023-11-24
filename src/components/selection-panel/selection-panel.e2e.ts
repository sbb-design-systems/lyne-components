import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import { SbbCheckbox, SbbCheckboxGroup } from '../checkbox';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing';
import { SbbRadioButton, SbbRadioButtonGroup } from '../radio-button';

import { SbbSelectionPanel } from './selection-panel';
import '../link';

const ssrModules = ['./selection-panel.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-selection-panel rendered with ${fixture.name}`, () => {
    let elements: SbbSelectionPanel[];

    afterEach(() => {
      cleanupFixtures();
    });

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
      let wrapper: SbbRadioButtonGroup;
      let firstPanel: SbbSelectionPanel;
      let firstInput: SbbRadioButton;
      let firstContent: HTMLDivElement;
      let secondPanel: SbbSelectionPanel;
      let secondInput: SbbRadioButton;
      let secondContent: HTMLDivElement;
      let disabledInput: SbbRadioButton;

      beforeEach(async () => {
        await fixture(getPageContent('radio-button'), { modules: ssrModules });
        elements = Array.from(document.querySelectorAll('sbb-selection-panel'));
        wrapper = document.querySelector('sbb-radio-button-group');
        firstPanel = document.querySelector('#sbb-selection-panel-1');
        firstInput = document.querySelector('#sbb-input-1');
        firstContent = firstPanel.shadowRoot.querySelector(
          '.sbb-selection-panel__content--wrapper',
        );
        secondPanel = document.querySelector('#sbb-selection-panel-2');
        secondInput = document.querySelector('#sbb-input-2');
        secondContent = secondPanel.shadowRoot.querySelector(
          '.sbb-selection-panel__content--wrapper',
        );
        disabledInput = document.querySelector('#sbb-input-3');
      });

      it('renders', () => {
        elements.forEach((e) => assert.instanceOf(e, SbbSelectionPanel));
      });

      it('selects input on click and shows related content', async () => {
        assert.instanceOf(firstPanel, SbbSelectionPanel);
        assert.instanceOf(firstInput, SbbRadioButton);
        expect(firstInput).not.to.have.attribute('checked');
        expect(firstContent).not.to.have.attribute('data-expanded');

        assert.instanceOf(secondPanel, SbbSelectionPanel);
        assert.instanceOf(secondInput, SbbRadioButton);
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
        const fourthInput: SbbRadioButton = document.querySelector('#sbb-input-4');

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

    describe('with nested radio buttons', () => {
      let nestedElement: SbbRadioButtonGroup;

      beforeEach(async () => {
        nestedElement = await fixture(
          html`
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
          `,
          { modules: ssrModules },
        );
      });

      it('should display expanded label correctly', async () => {
        const mainRadioButton1: SbbRadioButton = document.querySelector(
          "sbb-radio-button[value='main1']",
        );
        const mainRadioButton1Label = mainRadioButton1.shadowRoot.querySelector(
          '.sbb-radio-button__expanded-label',
        );
        const mainRadioButton2: SbbRadioButton = document.querySelector(
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

        const radioButtons: SbbRadioButton[] = Array.from(
          document.querySelectorAll('sbb-radio-button'),
        );

        expect(radioButtons.length).to.be.equal(6);
        expect(radioButtons[0]).to.have.attribute('data-group-disabled');
        expect(radioButtons[1]).not.to.have.attribute('data-group-disabled');
        expect(radioButtons[2]).not.to.have.attribute('data-group-disabled');
        expect(radioButtons[3]).to.have.attribute('data-group-disabled');
        expect(radioButtons[4]).not.to.have.attribute('data-group-disabled');
        expect(radioButtons[5]).not.to.have.attribute('data-group-disabled');
      });

      it('should not with interfere content on selection', async () => {
        const main1: SbbRadioButton = document.querySelector('sbb-radio-button[value="main1"]');
        const main2: SbbRadioButton = document.querySelector('sbb-radio-button[value="main2"]');
        const sub1: SbbRadioButton = document.querySelector('sbb-radio-button[value="sub1"]');

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
        await fixture(
          html`
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
          `,
          { modules: ssrModules },
        );

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
      let wrapper: SbbCheckboxGroup;
      let firstPanel: SbbSelectionPanel;
      let firstInput: SbbCheckbox;
      let firstContent: HTMLDivElement;
      let secondPanel: SbbSelectionPanel;
      let secondInput: SbbCheckbox;
      let secondContent: HTMLDivElement;
      let disabledInput: SbbCheckbox;

      beforeEach(async () => {
        await fixture(getPageContent('checkbox'), { modules: ssrModules });
        elements = Array.from(document.querySelectorAll('sbb-selection-panel'));
        wrapper = document.querySelector('sbb-checkbox-group');
        firstPanel = document.querySelector('#sbb-selection-panel-1');
        firstInput = document.querySelector('#sbb-input-1');
        firstContent = firstPanel.shadowRoot.querySelector(
          '.sbb-selection-panel__content--wrapper',
        );
        secondPanel = document.querySelector('#sbb-selection-panel-2');
        secondInput = document.querySelector('#sbb-input-2');
        secondContent = secondPanel.shadowRoot.querySelector(
          '.sbb-selection-panel__content--wrapper',
        );
        disabledInput = document.querySelector('#sbb-input-3');
      });

      it('renders', () => {
        elements.forEach((e) => assert.instanceOf(e, SbbSelectionPanel));
      });

      it('selects input on click and shows related content', async () => {
        assert.instanceOf(firstPanel, SbbSelectionPanel);
        assert.instanceOf(firstInput, SbbCheckbox);
        expect(firstInput).to.have.attribute('checked');
        expect(firstContent).to.have.attribute('data-expanded', '');

        assert.instanceOf(secondPanel, SbbSelectionPanel);
        assert.instanceOf(secondInput, SbbCheckbox);
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
        const fourthInput: SbbRadioButton = document.querySelector('#sbb-input-4');

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
      let nestedElement: SbbCheckboxGroup;

      beforeEach(async () => {
        nestedElement = await fixture(
          html`
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
          `,
          { modules: ssrModules },
        );
      });

      it('should display expanded label correctly', async () => {
        const mainCheckbox1: SbbCheckbox = document.querySelector("sbb-checkbox[value='main1']");
        const mainCheckbox1Label = mainCheckbox1.shadowRoot.querySelector(
          '.sbb-checkbox__expanded-label',
        );
        const mainCheckbox2: SbbCheckbox = document.querySelector("sbb-checkbox[value='main2']");
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

        const checkboxes: SbbCheckbox[] = Array.from(document.querySelectorAll('sbb-checkbox'));

        expect(checkboxes.length).to.be.equal(6);
        expect(checkboxes[0]).to.have.attribute('data-group-disabled');
        expect(checkboxes[1]).not.to.have.attribute('data-group-disabled');
        expect(checkboxes[2]).not.to.have.attribute('data-group-disabled');
        expect(checkboxes[3]).to.have.attribute('data-group-disabled');
        expect(checkboxes[4]).not.to.have.attribute('data-group-disabled');
        expect(checkboxes[5]).not.to.have.attribute('data-group-disabled');
      });
    });
  });
}
