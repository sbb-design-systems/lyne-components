import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-tag-group', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-tag-group>
        <sbb-tag value="tag-1">First tag</sbb-tag>
        <sbb-tag value="tag-2">Second tag</sbb-tag>
        <sbb-tag value="tag-3">Third tag</sbb-tag>
      </sbb-tag-group>
    `);

    expect(await page.find('sbb-tag-group')).toEqualHtml(`
      <sbb-tag-group role="group" class="hydrated">
        <mock:shadow-root>
          <div class="sbb-tag-group">
            <ul class="sbb-tag-group__list">
              <li class="sbb-tag-group__list-item">
                <slot name="tag-0"></slot>
              </li>
              <li class="sbb-tag-group__list-item">
                <slot name="tag-1"></slot>
              </li>
              <li class="sbb-tag-group__list-item">
                <slot name="tag-2"></slot>
              </li>
            </ul>
            <span hidden="">
              <slot></slot>
            </span>
          </div>
        </mock:shadow-root>
        <sbb-tag aria-pressed="false" class="hydrated" dir="ltr" role="button" tabindex="0" slot="tag-0" value="tag-1">
          First tag
        </sbb-tag>
        <sbb-tag aria-pressed="false" class="hydrated" dir="ltr" role="button" tabindex="0" slot="tag-1" value="tag-2">
          Second tag
        </sbb-tag>
        <sbb-tag aria-pressed="false" class="hydrated" dir="ltr" role="button" tabindex="0" slot="tag-2" value="tag-3">
          Third tag
        </sbb-tag>
      </sbb-tag-group>
    `);
  });

  describe('multiple mode', () => {
    describe('no initialized checked tag', () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <sbb-tag-group multiple>
        <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
        <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
        <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
      </sbb-tag-group>
    `);
        element = await page.find('sbb-tag-group');

        await page.waitForChanges();
      });

      it('renders', async () => {
        expect(element).toHaveClass('hydrated');
      });

      it('should have no default activated tag', async () => {
        expect((await element.findAll('sbb-tag[checked]')).length).toBe(0);
        expect(await element.getProperty('value')).toEqual([]);
      });

      it('should emit events and update value by checking manually', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag1 = await page.find('sbb-tag');

        expect(tag1).not.toHaveAttribute('checked');
        expect(await tag1.getProperty('checked')).toBe(false);

        await tag1.click();
        await page.waitForChanges();

        expect(tag1).toHaveAttribute('checked');
        expect(await tag1.getProperty('checked')).toBe(true);
        await waitForCondition(() => inputSpy.events.length === 1);
        expect(inputSpy).toHaveReceivedEventTimes(1);
        await waitForCondition(() => changeSpy.events.length === 1);
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(await element.getProperty('value')).toEqual(['tag1']);
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag1 = await page.find('sbb-tag');

        await tag1.setProperty('checked', true);
        await page.waitForChanges();

        expect(tag1).toHaveAttribute('checked');
        expect(await tag1.getProperty('checked')).toBe(true);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag1 = await page.find('sbb-tag');

        await tag1.setAttribute('checked', true);
        await page.waitForChanges();

        expect(tag1).toHaveAttribute('checked');
        expect(await tag1.getProperty('checked')).toBe(true);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
      });
    });

    describe('one initialized checked tag', () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <sbb-tag-group multiple>
        <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
        <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
        <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
      </sbb-tag-group>
    `);
        element = await page.find('sbb-tag-group');
        await page.waitForChanges();
      });

      it('should have one activated tag', async () => {
        expect((await element.findAll('sbb-tag[checked]')).length).toBe(1);
        expect(await element.getProperty('value')).toEqual(['tag2']);
      });

      it('should emit events and update value by unchecking manually', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');

        expect(tag2).toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(true);

        await tag2.click();
        await page.waitForChanges();

        expect(tag2).not.toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(false);
        await waitForCondition(() => inputSpy.events.length === 1);
        expect(inputSpy).toHaveReceivedEventTimes(1);
        await waitForCondition(() => changeSpy.events.length === 1);
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(await element.getProperty('value')).toEqual([]);
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');

        await tag2.setProperty('checked', false);
        await page.waitForChanges();

        expect(tag2).not.toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(false);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');

        await tag2.removeAttribute('checked');
        await page.waitForChanges();

        expect(tag2).not.toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(false);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
      });
    });

    describe('initialization', () => {
      it('should read empty array as value [template attribute]', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group multiple value='[]'></sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');

        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual([]);
      });

      it('should read array as value [template attribute]', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group multiple value='["tag1", "tag3"]'>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');

        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual(['tag1', 'tag3']);
        expect(await element.find('sbb-tag#sbb-tag-1')).toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-2')).not.toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-3')).toHaveAttribute('checked');
      });

      it('should read empty array as value [prop]', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group multiple></sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');
        element.setProperty('value', []);

        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual([]);
      });

      it('should read array as value [prop]', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group multiple>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');
        element.setProperty('value', ['tag1', 'tag3']);

        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual(['tag1', 'tag3']);
        expect(await element.find('sbb-tag#sbb-tag-1')).toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-2')).not.toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-3')).toHaveAttribute('checked');
      });

      it('should ignore because value is not an array', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group multiple></sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');
        element.setProperty('value', 'invalid');

        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual('invalid');
      });
    });

    describe('value change', () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <sbb-tag-group multiple>
        <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
        <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
        <sbb-tag id="sbb-tag-3" value="tag3" checked>Tag 3</sbb-tag>
      </sbb-tag-group>
    `);
        element = await page.find('sbb-tag-group');

        await page.waitForChanges();
      });

      it('should update group value if single value changes [prop]', async () => {
        expect(await element.getProperty('value')).toEqual(['tag1', 'tag2', 'tag3']);
        const tag1 = await element.find('sbb-tag#sbb-tag-1');

        tag1.setProperty('value', 'new value');
        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual(['new value', 'tag2', 'tag3']);
      });

      it('should update group value if single value changes [attribute]', async () => {
        expect(await element.getProperty('value')).toEqual(['tag1', 'tag2', 'tag3']);
        const tag1 = await element.find('sbb-tag#sbb-tag-1');

        tag1.setAttribute('value', 'new value');
        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual(['new value', 'tag2', 'tag3']);
      });
    });
  });

  describe('exclusive mode', () => {
    describe('no initialized checked tag', () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');

        await page.waitForChanges();
      });

      it('renders', async () => {
        expect(element).toHaveClass('hydrated');
      });

      it('should have no default activated tag', async () => {
        expect((await element.findAll('sbb-tag[checked]')).length).toBe(0);
        expect(await element.getProperty('value')).toEqual(null);
      });

      it('should emit events and update value by checking manually', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag1 = await page.find('sbb-tag');

        expect(tag1).not.toHaveAttribute('checked');
        expect(await tag1.getProperty('checked')).toBe(false);

        await tag1.click();
        await page.waitForChanges();

        expect(tag1).toHaveAttribute('checked');
        expect(await tag1.getProperty('checked')).toBe(true);
        await waitForCondition(() => inputSpy.events.length === 1);
        expect(inputSpy).toHaveReceivedEventTimes(1);
        await waitForCondition(() => changeSpy.events.length === 1);
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(await element.getProperty('value')).toEqual('tag1');
      });

      it('should not emit events by setting checked programmatically [prop]', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag1 = await page.find('sbb-tag');

        await tag1.setProperty('checked', true);
        await page.waitForChanges();

        expect(tag1).toHaveAttribute('checked');
        expect(await tag1.getProperty('checked')).toBe(true);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
      });

      it('should not emit events by setting checked programmatically [attribute]', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag1 = await page.find('sbb-tag');

        await tag1.setAttribute('checked', true);
        await page.waitForChanges();

        expect(tag1).toHaveAttribute('checked');
        expect(await tag1.getProperty('checked')).toBe(true);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
      });
    });

    describe('one initialized checked tag', () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <sbb-tag-group>
        <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
        <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
        <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
      </sbb-tag-group>
    `);
        element = await page.find('sbb-tag-group');
        await page.waitForChanges();
      });

      it('should have one activated tag', async () => {
        expect((await element.findAll('sbb-tag[checked]')).length).toBe(1);
        expect(await element.getProperty('value')).toEqual('tag2');
      });

      it('should avoid unchecking manually', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');

        expect(tag2).toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(true);

        await tag2.click();
        await page.waitForChanges();

        expect(tag2).toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(true);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
        expect(await element.getProperty('value')).toEqual('tag2');
      });

      it('should not emit events by setting checked programmatically to false [prop]', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');

        await tag2.setProperty('checked', false);
        await page.waitForChanges();

        expect(tag2).not.toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(false);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
        expect(await element.getProperty('value')).toEqual(null);
      });

      it('should not emit events by setting checked programmatically to false [attribute]', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');

        await tag2.removeAttribute('checked');
        await page.waitForChanges();

        expect(tag2).not.toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(false);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
        expect(await element.getProperty('value')).toEqual(null);
      });

      it('should select another tag manually and uncheck others', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');
        const tag3 = await page.find('sbb-tag#sbb-tag-3');

        await tag3.click();
        await page.waitForChanges();

        expect(tag3).toHaveAttribute('checked');
        expect(tag2).not.toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(false);
        expect(await tag3.getProperty('checked')).toBe(true);
        await waitForCondition(() => inputSpy.events.length === 1);
        expect(inputSpy).toHaveReceivedEventTimes(1);
        await waitForCondition(() => changeSpy.events.length === 1);
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(await element.getProperty('value')).toEqual('tag3');
        expect((await page.findAll('sbb-tag[checked]')).length).toBe(1);
      });

      it('should select another tag (before) manually and uncheck others', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag1 = await page.find('sbb-tag#sbb-tag-1');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');

        await tag1.click();
        await page.waitForChanges();

        expect(tag1).toHaveAttribute('checked');
        expect(tag2).not.toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(false);
        expect(await tag1.getProperty('checked')).toBe(true);
        await waitForCondition(() => inputSpy.events.length === 1);
        expect(inputSpy).toHaveReceivedEventTimes(1);
        await waitForCondition(() => changeSpy.events.length === 1);
        expect(changeSpy).toHaveReceivedEventTimes(1);
        expect(await element.getProperty('value')).toEqual('tag1');
        expect((await page.findAll('sbb-tag[checked]')).length).toBe(1);
      });

      it('should select another tag programmatically and uncheck others', async () => {
        const changeSpy = await page.spyOnEvent('change');
        const inputSpy = await page.spyOnEvent('input');
        const tag2 = await page.find('sbb-tag#sbb-tag-2');
        const tag3 = await page.find('sbb-tag#sbb-tag-3');

        await tag3.setProperty('checked', true);
        await page.waitForChanges();

        expect(tag2).not.toHaveAttribute('checked');
        expect(tag3).toHaveAttribute('checked');
        expect(await tag2.getProperty('checked')).toBe(false);
        expect(await tag3.getProperty('checked')).toBe(true);
        expect(inputSpy).not.toHaveReceivedEvent();
        expect(changeSpy).not.toHaveReceivedEvent();
        expect(await element.getProperty('value')).toEqual('tag3');
        expect((await page.findAll('sbb-tag[checked]')).length).toBe(1);
      });
    });

    describe('initialization', () => {
      it('should read value [template attribute]', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group value="tag2">
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');

        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual('tag2');
        expect(await element.find('sbb-tag#sbb-tag-1')).not.toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-2')).toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-3')).not.toHaveAttribute('checked');
      });

      it('should read value [prop]', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1">Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>        `);
        element = await page.find('sbb-tag-group');
        element.setProperty('value', 'tag2');

        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual('tag2');
        expect(await element.find('sbb-tag#sbb-tag-1')).not.toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-2')).toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-3')).not.toHaveAttribute('checked');
      });

      it('should ignore because value is an array', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group></sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');
        element.setProperty('value', []);

        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual([]);
      });

      it('should ensure only first option selected', async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2" checked>Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');
        await page.waitForChanges();
        await page.waitForChanges();

        expect((await element.findAll('sbb-tag[checked]')).length).toBe(1);
        expect(await element.getProperty('value')).toEqual('tag1');
      });
    });

    describe('value change', () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
          <sbb-tag-group>
            <sbb-tag id="sbb-tag-1" value="tag1" checked>Tag 1</sbb-tag>
            <sbb-tag id="sbb-tag-2" value="tag2">Tag 2</sbb-tag>
            <sbb-tag id="sbb-tag-3" value="tag3">Tag 3</sbb-tag>
          </sbb-tag-group>
        `);
        element = await page.find('sbb-tag-group');

        await page.waitForChanges();
      });

      it('should update group value if single value changes [prop]', async () => {
        expect(await element.getProperty('value')).toEqual('tag1');
        const tag1 = await element.find('sbb-tag#sbb-tag-1');

        tag1.setProperty('value', 'new value');
        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual('new value');
      });

      it('should update group value if single value changes [attribute]', async () => {
        expect(await element.getProperty('value')).toEqual('tag1');
        const tag1 = await element.find('sbb-tag#sbb-tag-1');

        tag1.setAttribute('value', 'new value');
        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual('new value');
      });

      it('should reflect group value change [prop]', async () => {
        expect(await element.getProperty('value')).toEqual('tag1');
        expect(await element.find('sbb-tag#sbb-tag-1')).toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-2')).not.toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-3')).not.toHaveAttribute('checked');

        element.setProperty('value', 'tag2');
        await page.waitForChanges();

        expect(await element.getProperty('value')).toEqual('tag2');
        expect(await element.find('sbb-tag#sbb-tag-1')).not.toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-2')).toHaveAttribute('checked');
        expect(await element.find('sbb-tag#sbb-tag-3')).not.toHaveAttribute('checked');
      });
    });
  });
});
