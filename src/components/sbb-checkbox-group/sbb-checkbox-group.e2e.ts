import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-checkbox-group', () => {
  let element: E2EElement, page: E2EPage;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-checkbox-group>
        <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);

    element = await page.find('sbb-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });

  // FIXME test is not working: the children checkboxes are not disabled (same for required)
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('disabled status', async () => {
  //   page = await newE2EPage();
  //   await page.setContent(`
  //     <sbb-checkbox-group>
  //       <sbb-checkbox id="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
  //       <sbb-checkbox id="checkbox-2" value="checkbox-2">Label 2</sbb-checkbox>
  //     </sbb-checkbox-group>
  //   `);
  //
  //   element = await page.find('sbb-checkbox-group');
  //   expect(element).toEqualHtml(`
  //     <sbb-checkbox-group orientation="horizontal" class="hydrated">
  //       <mock:shadow-root>
  //         <div class="sbb-checkbox-group">
  //           <slot></slot>
  //         </div>
  //       </mock:shadow-root>
  //       <sbb-checkbox id="checkbox-1" value="checkbox-1" class="hydrated" icon-placement="end" size="s">
  //           Label 1
  //       </sbb-checkbox>
  //       <sbb-checkbox id="checkbox-2" value="checkbox-2" class="hydrated" icon-placement="end" size="s">
  //           Label 2
  //       </sbb-checkbox>
  //     </sbb-checkbox-group>
  //   `);
  //
  //   element.setAttribute('disabled', 'true');
  //   await page.waitForChanges();
  //   expect(element).toEqualHtml(`
  //     <sbb-checkbox-group orientation="horizontal" class="hydrated" disabled="">
  //       <mock:shadow-root>
  //         <div class="sbb-checkbox-group">
  //           <slot></slot>
  //         </div>
  //       </mock:shadow-root>
  //       <sbb-checkbox id="checkbox-1" value="checkbox-1" class="hydrated" icon-placement="end" size="s" disabled="">
  //           Label 1
  //       </sbb-checkbox>
  //       <sbb-checkbox id="checkbox-2" value="checkbox-2" class="hydrated" icon-placement="end" size="s" disabled="">
  //           Label 2
  //       </sbb-checkbox>
  //     </sbb-checkbox-group>
  //   `);
  //   element = await page.find('sbb-checkbox-group');
  //   expect(element).toHaveClass('hydrated');
  //   expect(element).toEqualAttribute('disabled', '');
  //   await page.waitForChanges();
  //   const checkboxOne = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-1');
  //   const checkboxTwo = await page.find('sbb-checkbox-group > sbb-checkbox#checkbox-2');
  //   expect(checkboxOne).not.toBeNull();
  //   expect(checkboxTwo).not.toBeNull();
  //   expect(checkboxOne.getAttribute('disabled')).toEqual('true');
  //   expect(checkboxTwo.getAttribute('disabled')).toEqual('true');
  // });
});
