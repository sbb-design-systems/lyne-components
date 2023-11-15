import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import sampleData from './timetable-occupancy.sample-data';
import './timetable-occupancy';

const config = JSON.stringify(sampleData[3]);

describe('sbb-timetable-occupancy', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-timetable-occupancy config="${config}"></sbb-timetable-occupancy>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-occupancy
            config="{&quot;occupancyItems&quot;:[{&quot;class&quot;:&quot;1&quot;,&quot;icon&quot;:&quot;utilization-low&quot;,&quot;occupancy&quot;:&quot;low&quot;},{&quot;class&quot;:&quot;2&quot;,&quot;icon&quot;:&quot;utilization-medium&quot;,&quot;occupancy&quot;:&quot;medium&quot;}]}"
        >

        </sbb-timetable-occupancy>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
            <ul
                class="occupancy__list"
                role="list"
            >
                <li class="occupancy__list-item">
                    <span class="occupancy__class">
                        <span
                            aria-hidden="true"
                            class="occupancy__class--visual"
                        >
                            1.
                        </span>
                        <span class="occupancy__class--visually-hidden">
                            First Class. Low to medium occupancy expected.
                        </span>
                    </span>
                    <span
                        aria-hidden="true"
                        class="occupancy__icon"
                        role="presentation"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 16">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m2.49997,3.00015c.82699,0,1.49998-.67299,1.49998-1.49998,0-.826995-.67299-1.499987-1.49998-1.499987S.999989.673175.999989,1.50017c0,.82699.672991,1.49998,1.499981,1.49998z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m0,4.00014v5.99996h.999989V16H3.99995v-5.9999h.99999V4.00014H0z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m9.5038,3.00015c.827,0,1.5-.67299,1.5-1.49998,0-.826995-.673-1.499987-1.5-1.499987-.82699,0-1.49999.672992-1.49999,1.499987,0,.82699.673,1.49998,1.49999,1.49998z" fill="#bdbdbd"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m16.5076,3.00015c.827,0,1.5-.67299,1.5-1.49998,0-.826995-.673-1.499987-1.5-1.499987s-1.5.672992-1.5,1.499987c0,.82699.673,1.49998,1.5,1.49998z" fill="#bdbdbd"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m7.00383,9.99958h.99998v5.99992h2.99999V9.99958h1V3.99965H7.00383v5.99993z" fill="#bdbdbd"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m13.9998,4.00014v5.99996h1V16h3v-5.9999h1V4.00014h-5z" fill="#bdbdbd"></path>
                        </svg>
                    </span>
                </li>
                <li class="occupancy__list-item">
                    <span class="occupancy__class">
                        <span
                            aria-hidden="true"
                            class="occupancy__class--visual"
                        >
                            2.
                        </span>
                        <span class="occupancy__class--visually-hidden">
                            Second Class. High occupancy expected.
                        </span>
                    </span>
                    <span
                        aria-hidden="true"
                        class="occupancy__icon"
                        role="presentation"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 16">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m2.49997,3.00015c.82699,0,1.49998-.67299,1.49998-1.49998,0-.826995-.67299-1.499987-1.49998-1.499987S.999989.673175.999989,1.50017c0,.82699.672991,1.49998,1.499981,1.49998z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m0,4.00014v5.99996h.999989V16H3.99995v-5.9999h.99999V4.00014H0z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m9.5038,3.00015c.827,0,1.5-.67299,1.5-1.49998,0-.826995-.673-1.499987-1.5-1.499987-.82699,0-1.49999.672992-1.49999,1.499987,0,.82699.673,1.49998,1.49999,1.49998z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m7.00383,4.00014v5.99996h.99998V16h2.99999v-5.9999h1V4.00014H7.00383z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m16.5076,3.00015c.827,0,1.5-.67299,1.5-1.49998,0-.826995-.673-1.499987-1.5-1.499987s-1.5.672992-1.5,1.499987c0,.82699.673,1.49998,1.5,1.49998z" fill="#bdbdbd"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m13.9998,4.00014v5.99996h1V16h3v-5.9999h1V4.00014h-5z" fill="#bdbdbd"></path>
                        </svg>
                    </span>
                </li>
            </ul>
          `,
    );
  });
});
