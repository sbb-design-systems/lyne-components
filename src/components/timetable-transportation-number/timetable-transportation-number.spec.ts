import sampleData from './sbb-timetable-transportation-number.sample-data';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-timetable-transportation-number';

const config = JSON.stringify(sampleData.bus);

describe('sbb-timetable-transportation-number', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-timetable-transportation-number config="${config}" />`);

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-transportation-number
            config="{&quot;direction&quot;:&quot;Richtung Bern Wankdorf, Bahnhof&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-bus-right&quot;,&quot;text&quot;:&quot;Bus&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;&quot;,&quot;text&quot;:&quot;B 20&quot;}}"
        >

        </sbb-timetable-transportation-number>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
            <p
                aria-label="Bus B 20  Richtung Bern Wankdorf, Bahnhof"
                class="transportation-number transportation-number--first-level"
                role="text"
             >
                <span
                    aria-hidden="true"
                    class="transportation-number--visual"
                    role="presentation"
                >
                    <span class="transportation-number__means-of-transport">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m22.5,0h-21C.675,0,0,.675,0,1.5v21c0,.825.675,1.5,1.5,1.5h21c.825,0,1.5-.675,1.5-1.5v-21c0-.825-.675-1.5-1.5-1.5z" fill="#2d327d"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m6.375,8.25H3V7.5h15.075c.6075,0,1.1475.4125,1.305.9975l1.575,5.8725c.03.1125.045.2325.045.3525v3.8025c0,.33-.27.6-.6.6h-6.975c-.33,0-.6-.27-.6-.6v-.075c0-1.905-1.545-3.45-3.45-3.45s-3.45,1.545-3.45,3.45v.075c0,.33-.27.6-.6.6H3V13.5h3.375c.21,0,.375-.165.375-.375v-4.5c0-.21-.165-.375-.375-.375zm11.0625,6.375c0,.21.165.375.375.375H19.86c.21,0,.375-.165.375-.375,0-.03-.0075-.0675-.015-.0975l-1.5825-5.91C18.57,8.355,18.33,8.175,18.06,8.175h-.015c-.33,0-.6.27-.6.6l-.0075,5.85zm-1.35.45c-.33,0-.6-.27-.6-.6v-5.7c0-.33.27-.6.6-.6s.6.27.6.6v5.7c0,.33-.27.6-.6.6zm-2.55-.6c0,.33.27.6.6.6s.6-.27.6-.6v-5.7c0-.33-.27-.6-.6-.6s-.6.27-.6.6v5.7zM7.875,13.5c-.21,0-.375-.165-.375-.375v-4.5c0-.21.165-.375.375-.375h4.5375c.21,0,.375.165.375.375v4.5c0,.21-.165.375-.375.375H7.875z" fill="#fff"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m11.9775,18.4725c0-1.4475-1.1775-2.625-2.62501-2.625-1.4475,0-2.625,1.1775-2.625,2.625s1.1775,2.625,2.625,2.625c1.44751,0,2.62501-1.1775,2.62501-2.625zm-1.125-.06c0,.825-.675,1.5-1.50001,1.5-.8325,0-1.5-.6675-1.5-1.5,0-.825.675-1.5,1.5-1.5.82501,0,1.50001.675,1.50001,1.5z" fill="#fff"></path>
                        </svg>
                    </span>
                    <span class="transportation-number__product-text">
                        B 20
                    </span>
                    <span class="transportation-number__direction">
                        <span class="transportation-number__direction-text">
                            Richtung Bern Wankdorf, Bahnhof
                        </span>
                    </span>
                </span>
                <span class="transportation-number--visually-hidden">
                    Bus B 20  Richtung Bern Wankdorf, Bahnhof
                </span>
             </p>
          `,
    );
  });
});
