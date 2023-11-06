import sampleData from './timetable-barrier-free.sample-data';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './timetable-barrier-free';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-barrier-free', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-timetable-barrier-free config="${config}" />`);

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-barrier-free
            config="{&quot;icon&quot;:&quot;wheelchair&quot;,&quot;text&quot;:&quot;Independent boarding/alighting possible.&quot;}"
        >

        </sbb-timetable-barrier-free>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
            <p
                aria-label="Barrier-free travel. Independent boarding/alighting possible."
                class="barrier-free barrier-free--second-level"
                role="text"
            >
                <span class="barrier-free__text--visually-hidden">
                    Barrier-free travel. Independent boarding/alighting possible.
                </span>
                <span
                    aria-hidden="true"
                    class="barrier-free__text"
                    role="presentation"
                >
                    <span class="barrier-free__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m9.5,6.00024c0-.55214.44786-1,1-1,.5521,0,1,.44786,1,1,0,.55215-.4479,1-1,1-.55214,0-1-.44785-1-1zm.5,7.49956V7.99976h1v5.00004h5v6h-1v-5h-5v-.5zm-1.5239-3.0134c-1.46029.7442-2.47097,2.2644-2.47097,4.0135,0,2.4741,2.02585,4.5,4.49997,4.5,1.7952,0,3.3513-1.0657,4.0721-2.5903l-.9041-.4274c-.5632,1.1913-1.7772,2.0177-3.168,2.0177-1.92183,0-3.49997-1.5782-3.49997-3.5,0-1.355.78332-2.5407,1.92502-3.1225l-.45405-.891z"></path>
                        </svg>
                    </span>
                    Independent boarding/alighting possible.
                </span>
            </p>
          `,
    );
  });
});
