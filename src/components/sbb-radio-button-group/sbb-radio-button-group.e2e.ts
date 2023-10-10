import { waitForCondition, waitForLitRender } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { EventSpy } from '../../global/testing/event-spy';
import { SbbRadioButtonGroup } from './sbb-radio-button-group';
import { SbbRadioButton } from '../sbb-radio-button';
import './sbb-radio-button-group';
import '../sbb-radio-button';

describe('sbb-radio-button-group', () => {
  let element: SbbRadioButtonGroup;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-radio-button-group name="radio-group-name" value="Value one">
        <sbb-radio-button id="sbb-radio-1" value="Value one">Value one</sbb-radio-button>
        <sbb-radio-button id="sbb-radio-2" value="Value two">Value two</sbb-radio-button>
        <sbb-radio-button id="sbb-radio-3" value="Value three" disabled
          >Value three</sbb-radio-button
        >
        <sbb-radio-button id="sbb-radio-4" value="Value four">Value four</sbb-radio-button>
      </sbb-radio-button-group>
    `);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbRadioButtonGroup);
  });

  describe('events', () => {
    it('selects radio on click', async () => {
      const firstRadio = element.querySelector('#sbb-radio-1') as SbbRadioButton;
      const radio = element.querySelector('#sbb-radio-2') as SbbRadioButton;

      expect(firstRadio).to.have.attribute('checked');

      radio.click();
      await waitForLitRender(element);

      expect(radio).to.have.attribute('checked');
      expect(firstRadio).not.to.have.attribute('checked');
    });

    it('dispatches event on radio change', async () => {
      const firstRadio = element.querySelector('#sbb-radio-1') as SbbRadioButton;
      const checkedRadio = element.querySelector('#sbb-radio-2') as SbbRadioButton;
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      checkedRadio.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy.count).to.be.equal(1);

      firstRadio.click();
      await waitForLitRender(element);
      expect(firstRadio).to.have.attribute('checked');
    });

    it('does not select disabled radio on click', async () => {
      const firstRadio = element.querySelector('#sbb-radio-1') as SbbRadioButton;
      const disabledRadio = element.querySelector('#sbb-radio-3') as SbbRadioButton;

      disabledRadio.click();
      await waitForLitRender(element);

      expect(disabledRadio).not.to.have.attribute('checked');
      expect(firstRadio).to.have.attribute('checked');
    });

    it('preserves radio button disabled state after being disabled from group', async () => {
      const firstRadio = element.querySelector('#sbb-radio-1') as SbbRadioButton;
      const secondRadio = element.querySelector('#sbb-radio-2') as SbbRadioButton;
      const disabledRadio = element.querySelector('#sbb-radio-3') as SbbRadioButton;

      element.disabled = true;
      await waitForLitRender(element);

      disabledRadio.click();
      await waitForLitRender(element);
      expect(disabledRadio).not.to.have.attribute('checked');
      expect(firstRadio).to.have.attribute('checked');

      secondRadio.click();
      await waitForLitRender(element);
      expect(secondRadio).not.to.have.attribute('checked');

      element.disabled = false;
      await waitForLitRender(element);

      disabledRadio.click();
      await waitForLitRender(element);
      expect(disabledRadio).not.to.have.attribute('checked');
      expect(firstRadio).to.have.attribute('checked');
    });

    it('selects radio on left arrow key pressed', async () => {
      const firstRadio = element.querySelector('#sbb-radio-1') as SbbRadioButton;

      firstRadio.focus();
      await waitForLitRender(element);

      await sendKeys({ down: 'ArrowLeft' });
      await waitForLitRender(element);

      const radio = element.querySelector('#sbb-radio-4');
      expect(radio).to.have.attribute('checked');

      firstRadio.click();
      await waitForLitRender(element);

      expect(firstRadio).to.have.attribute('checked');
    });

    it('selects radio on right arrow key pressed', async () => {
      const firstRadio = element.querySelector('#sbb-radio-1') as SbbRadioButton;

      firstRadio.focus();
      await sendKeys({ down: 'ArrowRight' });

      await waitForLitRender(element);
      const radio = element.querySelector('#sbb-radio-2');

      expect(radio).to.have.attribute('checked');

      firstRadio.click();
      await waitForLitRender(element);

      expect(firstRadio).to.have.attribute('checked');
    });

    it('wraps around on arrow key navigation', async () => {
      const firstRadio = element.querySelector('#sbb-radio-1') as SbbRadioButton;
      const secondRadio = element.querySelector('#sbb-radio-2') as SbbRadioButton;

      secondRadio.click();
      await waitForLitRender(element);
      expect(secondRadio).to.have.attribute('checked');

      secondRadio.focus();
      await waitForLitRender(element);

      await sendKeys({ down: 'ArrowRight' });
      await waitForLitRender(element);

      await sendKeys({ down: 'ArrowRight' });
      await waitForLitRender(element);

      const radio = element.querySelector('#sbb-radio-1');
      expect(radio).to.have.attribute('checked');

      firstRadio.click();
      await waitForLitRender(element);

      expect(firstRadio).to.have.attribute('checked');
    });
  });
});
