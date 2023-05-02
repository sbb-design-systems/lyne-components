/* eslint-disable jest/no-commented-out-tests */
// import { SbbOption } from './sbb-option';
// import { newSpecPage } from '@stencil/core/testing';

describe('sbb-option', () => {
  describe('autocomplete', () => {
    it('renders selected and active', async () => {
      // const { root } = await newSpecPage({
      //   components: [SbbOption],
      //   html: `
      //     <sbb-autocomplete>
      //       <sbb-option value="1" selected="true" active="true">Option 1</sbb-option>
      //     </sbb-autocomplete>
      //   `,
      // });
      expect(true).toBe(true);

      // expect(root).toEqualHtml(`
      //   <sbb-option selected="" active="" aria-disabled="false" aria-selected="true" data-variant="autocomplete" id="sbb-option-1" role="option" value="1">
      //     <mock:shadow-root>
      //       <div class="sbb-option__container">
      //         <div class="sbb-option">
      //           <span class="sbb-option__icon sbb-option__icon--empty">
      //             <slot name="icon"></slot>
      //           </span>
      //           <span class="sbb-option__label">
      //             <slot></slot>
      //           </span>
      //         </div>
      //       </div>
      //     </mock:shadow-root>
      //     Option 1
      //   </sbb-option>
      // `);
    });

    // it('renders disabled', async () => {
    //   const { root } = await newSpecPage({
    //     components: [SbbOption],
    //     html: `
    //       <sbb-autocomplete>
    //         <sbb-option value="1" disabled="true">Option 1</sbb-option>
    //       </sbb-autocomplete>
    //     `,
    //   });

    //   expect(root).toEqualHtml(`
    //     <sbb-option disabled="true" aria-disabled="true" aria-selected="false" data-variant="autocomplete" id="sbb-option-2" role="option" value="1">
    //       <mock:shadow-root>
    //         <div class="sbb-option__container">
    //           <div class="sbb-option">
    //             <span class="sbb-option__icon sbb-option__icon--empty">
    //               <slot name="icon"></slot>
    //             </span>
    //             <span class="sbb-option__label">
    //               <slot></slot>
    //             </span>
    //           </div>
    //         </div>
    //       </mock:shadow-root>
    //       Option 1
    //     </sbb-option>
    //   `);
    // });
  });
});
