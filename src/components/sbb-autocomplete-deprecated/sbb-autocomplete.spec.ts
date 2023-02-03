// import { SbbAutocomplete } from './sbb-autocomplete-deprecated';
// import { newSpecPage } from '@stencil/core/testing';
// import sampleData from './sbb-autocomplete.sample-data';

// describe('sbb-autocomplete', () => {
//   it('renders', async () => {
//     const { root } = await newSpecPage({
//       components: [SbbAutocomplete],
//       html: `
//         <sbb-autocomplete
//           items='${sampleData}'
//           inputName='test-input'
//           inputLabel='input-label'
//           minChars='2'
//         ></sbb-autocomplete>
//       `,
//     });

//     expect(root).toEqualHtml(`
//       <sbb-autocomplete inputlabel="input-label" inputname="test-input" items="[{&quot;text&quot;: &quot;Bern&quot;},{&quot;text&quot;: &quot;Bern, Hauptbahnhof&quot;},{&quot;text&quot;: &quot;Bern (Marzilibahn)&quot;},{&quot;text&quot;: &quot;Bern Marzili&quot;},{&quot;text&quot;: &quot;Bern Matte&quot;},{&quot;text&quot;: &quot;Bern Münsterplattform&quot;},{&quot;text&quot;: &quot;Bern Europaplatz, Bahnhof&quot;},{&quot;text&quot;: &quot;Bern, Bahnhof&quot;},{&quot;text&quot;: &quot;Bern, Brunnadernstrasse&quot;},{&quot;text&quot;: &quot;Bern, Bärenplatz&quot;}]" minchars="2">
//           <mock:shadow-root>
//             <div class="autocomplete">
//               <sbb-form-field>
//                 <input aria-autocomplete="list" aria-controls="autocomplete-list" autocomplete="off" role="combobox" type="text">
//               </sbb-form-field>
//               <p
//                   class="autocomplete__accessibility-hint"
//                   role='status'
//                   tabindex='-1'
//               >
//               </p>
//               <ul aria-hidden="" class="autocomplete__list" id="autocomplete-list" role="presentation">
//                 <sbb-autocomplete-item ariaposinset="1" ariasetsize="10" text="Bern"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="2" ariasetsize="10" text="Bern, Hauptbahnhof"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="3" ariasetsize="10" text="Bern (Marzilibahn)"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="4" ariasetsize="10" text="Bern Marzili"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="5" ariasetsize="10" text="Bern Matte"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="6" ariasetsize="10" text="Bern Münsterplattform"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="7" ariasetsize="10" text="Bern Europaplatz, Bahnhof"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="8" ariasetsize="10" text="Bern, Bahnhof"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="9" ariasetsize="10" text="Bern, Brunnadernstrasse"></sbb-autocomplete-item>
//                 <sbb-autocomplete-item ariaposinset="10" ariasetsize="10" text="Bern, Bärenplatz"></sbb-autocomplete-item>
//               </ul>
//             </div>
//           </mock:shadow-root>
//         </sbb-autocomplete>
//       `);
//   });
// });
