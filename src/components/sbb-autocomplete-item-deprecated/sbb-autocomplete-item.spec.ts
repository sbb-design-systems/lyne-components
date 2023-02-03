// import { SbbAutocompleteItem } from './sbb-autocomplete-item-deprecated';
// import { newSpecPage } from '@stencil/core/testing';

// describe('sbb-autocomplete-item', () => {
//   it('renders', async () => {
//     const { root } = await newSpecPage({
//       components: [SbbAutocompleteItem],
//       html: '<sbb-autocomplete-item text="lorem ipsum item1 dolor sit" highlight="tem"></sbb-autocomplete-item>',
//     });

//     expect(root).toEqualHtml(`
//         <sbb-autocomplete-item highlight="tem" text="lorem ipsum item1 dolor sit">
//           <mock:shadow-root>
//             <li class="autocomplete-item" role="option">
//               <slot name="pre-text"></slot>
//               <span>
//                 lorem ipsum i
//               </span>
//               <span class="autocomplete-item__highlight">
//                 tem
//               </span>
//               <span>
//                 1 dolor sit
//               </span>
//               <slot name="post-text"></slot>
//             </li>
//           </mock:shadow-root>
//         </sbb-autocomplete-item>
//       `);
//   });
// });
