import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { elementInternalsSpy, fixture } from '../../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../../core/testing.ts';
import type { SbbTagElement } from '../tag.ts';

import { SbbTagGroupElement } from './tag-group.component.ts';

import '../tag.ts';

describe(`sbb-tag-group`, () => {
  let element: SbbTagGroupElement;
  const elementInternals = elementInternalsSpy();

  describe('multiple mode', () => {
    describe('no initialized checked tag', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('renders', async () => {
        assert.instanceOf(element, SbbTagGroupElement);
      });

      it('should have no default activated tag', async () => {
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(0);
        expect(element.value).to.be.an('array').that.is.empty;
      });

      it('should emit events and update value by checking manually', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        expect(tag1).not.to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(false);

        tag1.click();
        await waitForLitRender(element);

        expect(elementInternals.get(tag1)!.ariaPressed).to.equal('true');
        expect(tag1.checked).to.be.equal(true);
        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);
        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);
        expect(element.value).to.be.eql(['tag1']);
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        tag1.checked = true;
        await waitForLitRender(element);

        expect(elementInternals.get(tag1)!.ariaPressed).to.equal('true');
        expect(tag1.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        tag1.setAttribute('checked', 'true');
        await waitForLitRender(element);

        expect(elementInternals.get(tag1)!.ariaPressed).to.equal('true');
        expect(tag1.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should disable slotted tags when setting disabled property', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        element.setAttribute('disabled', 'true');
        await waitForLitRender(element);
        tag1.click();

        expect(elementInternals.get(tag1)!.ariaPressed).to.equal('false');
        expect(tag1.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });
    });

    describe('one initialized checked tag', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('should have one activated tag', async () => {
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(1);
        expect(element.value).to.be.eql(['tag2']);
      });

      it('should emit events and update value by unchecking manually', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        expect(elementInternals.get(tag2)!.ariaPressed).to.equal('true');
        expect(tag2.checked).to.be.equal(true);

        tag2.click();
        await waitForLitRender(element);

        expect(elementInternals.get(tag2)!.ariaPressed).to.equal('false');
        expect(tag2.checked).to.be.equal(false);
        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);
        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);
        expect(element.value).to.be.an('array').that.is.empty;
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag2.checked = false;
        await waitForLitRender(element);

        expect(elementInternals.get(tag2)!.ariaPressed).to.equal('false');
        expect(tag2.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag2.removeAttribute('checked');
        await waitForLitRender(element);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });
    });

    describe('initialization', () => {
      it('should read empty array as value [template attribute]', async () => {
        element = await fixture(html` <sbb-tag-group multiple value="[]"></sbb-tag-group> `);

        expect(element.value).to.be.an('array').that.is.empty;
      });

      it('should read array as value [template attribute]', async () => {
        element = await fixture(html`
          <sbb-tag-group multiple value='["tag1", "tag3"]'>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);

        expect(element.value).to.be.eql(['tag1', 'tag3']);
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')?.checked).to.be.equal(
          true,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-2')?.checked).to.be.equal(
          false,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-3')?.checked).to.be.equal(
          true,
        );
      });

      it('should read empty array as value [prop]', async () => {
        element = await fixture(html` <sbb-tag-group multiple></sbb-tag-group> `);
        element.value = [];
        await waitForLitRender(element);

        expect(element.value).to.be.an('array').that.is.empty;
      });

      it('should read array as value [prop]', async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element.value = ['tag1', 'tag3'];
        await waitForLitRender(element);

        expect(element.value).to.be.eql(['tag1', 'tag3']);
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')?.checked).to.be.equal(
          true,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-2')?.checked).to.be.equal(
          false,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-3')?.checked).to.be.equal(
          true,
        );
      });

      it('should coerce non-array value to array value', async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element.value = 'tag1';
        await waitForLitRender(element);

        expect(element.value).to.be.eql(['tag1']);
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')?.checked).to.be.equal(
          true,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-2')?.checked).to.be.equal(
          false,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-3')?.checked).to.be.equal(
          false,
        );
      });
    });

    describe('value change', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3" checked>Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('should update group value if single value changes [prop]', async () => {
        expect(element.value).to.be.eql(['tag1', 'tag2', 'tag3']);
        const tag1 = element.querySelector('sbb-tag#sbb-tag-1') as SbbTagElement;

        tag1.value = 'new value';
        await waitForLitRender(element);

        expect(element.value).to.be.eql(['new value', 'tag2', 'tag3']);
      });

      it('should update group value if single value changes [attribute]', async () => {
        expect(element.value).to.be.eql(['tag1', 'tag2', 'tag3']);
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')!;

        tag1.setAttribute('value', 'new value');
        await waitForLitRender(element);

        expect(element.value).to.be.eql(['new value', 'tag2', 'tag3']);
      });
    });
  });

  describe('exclusive mode', () => {
    describe('no initialized checked tag', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('renders', async () => {
        assert.instanceOf(element, SbbTagGroupElement);
      });

      it('should have no default activated tag', async () => {
        for (const tag of element.querySelectorAll('sbb-tag')) {
          expect(elementInternals.get(tag)!.ariaPressed).to.not.equal('true');
        }
        expect(element.value).to.be.equal(null);
      });

      it('should emit events and update value by checking manually', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        expect(elementInternals.get(tag1)!.ariaPressed).to.equal('false');
        expect(tag1.checked).to.be.equal(false);

        tag1.click();
        await waitForLitRender(element);

        expect(elementInternals.get(tag1)!.ariaPressed).to.equal('true');
        expect(tag1.checked).to.be.equal(true);
        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);
        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);
        expect(element.value).to.be.equal('tag1');
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        tag1.checked = true;
        await waitForLitRender(element);

        expect(elementInternals.get(tag1)!.ariaPressed).to.equal('true');
        expect(tag1.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector<SbbTagElement>('sbb-tag')!;

        tag1.setAttribute('checked', 'true');
        await waitForLitRender(element);

        expect(tag1).to.have.attribute('checked');
        expect(tag1.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
      });
    });

    describe('one initialized checked tag', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('should have one activated tag', async () => {
        expect(element.querySelectorAll('sbb-tag[checked]').length).to.be.equal(1);
        expect(element.value).to.be.equal('tag2');
      });

      it('should avoid unchecking manually', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        expect(tag2).to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(true);

        tag2.click();
        await waitForLitRender(element);

        expect(tag2).to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(true);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
        expect(element.value).to.be.equal('tag2');
      });

      it('should not emit events by setting checked programmatically to false [prop]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag2.checked = false;
        await waitForLitRender(element);

        expect(elementInternals.get(tag2)!.ariaPressed).to.equal('false');
        expect(tag2.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
        expect(element.value).to.be.equal(null);
      });

      it('should not emit events by setting checked programmatically to false [attribute]', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag2.removeAttribute('checked');
        await waitForLitRender(element);

        expect(tag2).not.to.have.attribute('checked');
        expect(tag2.checked).to.be.equal(false);
        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);
        expect(element.value).to.be.equal(null);
      });

      it('should select another tag manually and uncheck others', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;
        const tag3 = element.querySelector('sbb-tag#sbb-tag-3') as SbbTagElement;

        tag3.click();
        await waitForLitRender(element);

        expect(elementInternals.get(tag3)!.ariaPressed, 'tag3.ariaPressed').to.equal('true');
        expect(tag3.checked, 'tag3.checked').to.be.true;

        expect(elementInternals.get(tag2)!.ariaPressed, 'tag2.ariaPressed').to.equal('false');
        expect(tag2.checked, 'tag2.checked').to.be.false;

        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);

        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);

        expect(element.value).to.be.equal('tag3');
        expect(
          Array.from(element.querySelectorAll('sbb-tag')).filter(
            (t) => elementInternals.get(t)!.ariaPressed === 'true',
          ).length,
        ).to.be.equal(1);
      });

      it('should select another tag (before) manually and uncheck others', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag1 = element.querySelector('sbb-tag#sbb-tag-1') as SbbTagElement;
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;

        tag1.click();
        await waitForLitRender(element);

        expect(elementInternals.get(tag1)!.ariaPressed).to.equal('true');
        expect(tag1.checked).to.be.equal(true);

        expect(elementInternals.get(tag2)!.ariaPressed).to.equal('false');
        expect(tag2.checked).to.be.equal(false);

        await inputSpy.calledOnce();
        expect(inputSpy.count).to.be.equal(1);

        await changeSpy.calledOnce();
        expect(changeSpy.count).to.be.equal(1);

        expect(element.value).to.be.equal('tag1');
        expect(
          Array.from(element.querySelectorAll('sbb-tag')).filter(
            (t) => elementInternals.get(t)!.ariaPressed === 'true',
          ).length,
        ).to.be.equal(1);
      });

      it('should select another tag programmatically and uncheck others', async () => {
        const changeSpy = new EventSpy('change');
        const inputSpy = new EventSpy('input');
        const tag2 = element.querySelector('sbb-tag#sbb-tag-2') as SbbTagElement;
        const tag3 = element.querySelector('sbb-tag#sbb-tag-3') as SbbTagElement;

        tag3.checked = true;
        await waitForLitRender(element);

        expect(elementInternals.get(tag3)!.ariaPressed).to.equal('true');
        expect(tag3.checked).to.be.equal(true);

        expect(elementInternals.get(tag2)!.ariaPressed).to.equal('false');
        expect(tag2.checked).to.be.equal(false);

        expect(inputSpy.count).not.to.be.greaterThan(0);
        expect(changeSpy.count).not.to.be.greaterThan(0);

        expect(element.value).to.be.equal('tag3');
        expect(
          Array.from(element.querySelectorAll('sbb-tag')).filter(
            (t) => elementInternals.get(t)!.ariaPressed === 'true',
          ).length,
        ).to.be.equal(1);
      });
    });

    describe('initialization', () => {
      it('should read value [template attribute]', async () => {
        element = await fixture(html`
          <sbb-tag-group value="tag2">
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);

        expect(element.value).to.be.equal('tag2');
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')?.checked).to.be.equal(
          false,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-2')?.checked).to.be.equal(
          true,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-3')?.checked).to.be.equal(
          false,
        );
      });

      it('should read value [prop]', async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);

        element.value = 'tag2';
        await waitForLitRender(element);

        expect(element.value).to.be.equal('tag2');
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')?.checked).to.be.equal(
          false,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-2')?.checked).to.be.equal(
          true,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-3')?.checked).to.be.equal(
          false,
        );
      });

      it('should ignore because value is an array', async () => {
        element = await fixture(html` <sbb-tag-group></sbb-tag-group> `);
        element.value = [];
        await waitForLitRender(element);

        expect(element.value).to.be.null;
      });

      it('should ensure only first option selected', async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        expect(
          Array.from(element.querySelectorAll('sbb-tag')).filter(
            (t) => elementInternals.get(t)!.ariaPressed === 'true',
          ).length,
        ).to.be.equal(1);
        expect(element.value).to.be.equal('tag1');
      });
    });

    describe('value change', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
      });

      it('should update group value if single value changes [prop]', async () => {
        expect(element.value).to.be.equal('tag1');

        const tag1 = element.querySelector('sbb-tag#sbb-tag-1') as SbbTagElement;
        tag1.value = 'new value';
        await waitForLitRender(element);

        expect(element.value).to.be.equal('new value');
      });

      it('should update group value if single value changes [attribute]', async () => {
        expect(element.value).to.be.equal('tag1');
        const tag1 = element.querySelector('sbb-tag#sbb-tag-1') as SbbTagElement;

        tag1.setAttribute('value', 'new value');
        await waitForLitRender(element);

        expect(element.value).to.be.equal('new value');
      });

      it('should reflect group value change [prop]', async () => {
        expect(element.value).to.be.equal('tag1');
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')?.checked).to.be.equal(
          true,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-2')?.checked).to.be.equal(
          false,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-3')?.checked).to.be.equal(
          false,
        );

        element.value = 'tag2';
        await waitForLitRender(element);

        expect(element.value).to.be.equal('tag2');
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-1')?.checked).to.be.equal(
          false,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-2')?.checked).to.be.equal(
          true,
        );
        expect(element.querySelector<SbbTagElement>('sbb-tag#sbb-tag-3')?.checked).to.be.equal(
          false,
        );
      });
    });
  });

  describe('slotted in native form', () => {
    let form: HTMLFormElement;
    let element: SbbTagGroupElement;
    let tag3: SbbTagElement;

    beforeEach(async () => {
      form = await fixture(html`
        <form>
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" name="tag1" value="Label 1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" name="tag2" value="Label 2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" name="tag3" value="Label 3">Tag 3</sbb-tag>
          </sbb-tag-group>
        </form>
      `);

      element = form.querySelector('sbb-tag-group') as SbbTagGroupElement;
      tag3 = element.querySelector('#sbb-tag-3') as SbbTagElement;
    });

    it('updates form value on click', async () => {
      tag3.click();
      await waitForLitRender(element);

      expect(JSON.stringify(Object.fromEntries(new FormData(form)))).to.be.equal(
        `{"tag1":"Label 1","tag3":"Label 3"}`,
      );
    });

    it('updates form value on property set', async () => {
      tag3.checked = true;
      await waitForLitRender(element);

      expect(JSON.stringify(Object.fromEntries(new FormData(form)))).to.be.equal(
        `{"tag1":"Label 1","tag3":"Label 3"}`,
      );
    });

    it('updates form in exclusive mode', async () => {
      element.multiple = false;
      await waitForLitRender(element);

      tag3.click();
      await waitForLitRender(element);
      expect(JSON.stringify(Object.fromEntries(new FormData(form)))).to.be.equal(
        `{"tag3":"Label 3"}`,
      );
    });

    it('restores value on form reset', async () => {
      element.multiple = false;
      await waitForLitRender(element);

      tag3.click();
      await waitForLitRender(element);
      expect(JSON.stringify(Object.fromEntries(new FormData(form)))).to.be.equal(
        `{"tag3":"Label 3"}`,
      );

      form.reset();
      await waitForLitRender(element);

      expect(JSON.stringify(Object.fromEntries(new FormData(form)))).to.be.equal(
        `{"tag1":"Label 1"}`,
      );
    });
  });

  describe('with complex value', () => {
    type ValueType = { value: string; label: string };
    const values: ValueType[] = [
      { value: 'tag1', label: 'Tag 1' },
      { value: 'tag2', label: 'Tag 2' },
      { value: 'tag3', label: 'Tag 3' },
    ];
    let form: HTMLFormElement;
    let tags: SbbTagElement[];
    let element: SbbTagGroupElement<ValueType>;

    beforeEach(async () => {
      form = await fixture(html`
        <form>
          <sbb-tag-group .value=${values[0]}>
            <sbb-tag name="sbb-tag-1" .value=${values[0]}>values[0].label</sbb-tag>
            <sbb-tag name="sbb-tag-2" .value=${values[1]}>values[1].label</sbb-tag>
            <sbb-tag name="sbb-tag-3" .value=${values[2]}>values[2].label</sbb-tag>
          </sbb-tag-group>
        </form>
      `);
      element = form.querySelector<SbbTagGroupElement<ValueType>>('sbb-tag-group')!;
      tags = Array.from(element.querySelectorAll('sbb-tag'));
    });

    it('should init with value', async () => {
      expect(element.value).to.be.equal(tags[0].value);
      expect(element.value).to.be.deep.equal(tags[0].value);
    });

    it('should update value on click', async () => {
      tags[1].click();
      await waitForLitRender(element);

      expect(element.value).to.be.deep.equal(tags[1].value);
    });

    it('should set complex value', async () => {
      element.value = values[1];
      await waitForLitRender(element);

      expect(element.value).to.be.deep.equal(tags[1].value);
      expect(tags[0].checked).to.be.false;
      expect(tags[1].checked).to.be.true;
      expect(tags[2].checked).to.be.false;
    });
  });
});
