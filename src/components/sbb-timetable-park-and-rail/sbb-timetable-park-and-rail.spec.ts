import sampleData from './sbb-timetable-park-and-rail.sample-data';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-timetable-park-and-rail';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-park-and-rail', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-timetable-park-and-rail config="${config}"></sbb-timetable-park-and-rail>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-park-and-rail
            config="{&quot;distance&quot;:178}"
        >

        </sbb-timetable-park-and-rail>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
            <div class="park-and-rail park-and-rail--first-level">
                <span
                    aria-label="available at departure station. (178 Meters of walking distance to departing station.)"
                    class="park-and-rail__icon"
                    role="text"
                    title="available at departure station. (178 Meters of walking distance to departing station.)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,24,24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="m21.0025,6H3.00146V5H21.0025v1zm0,13.0005H3.00146v-1H21.0025v1zm-16.267-7.2594V9.47507h1.467c.478,0,.823.073,1.034.219.292.197.438.49603.438.89803,0,.398-.126.698-.377.903-.205.164-.539.246-1.002.246h-1.56zm1.483-3.74403h-3.229v8.00103h1.746v-2.883h1.795c.46,0,.847-.045,1.161-.134s.592-.236.837-.441c.577-.478.865-1.135.865-1.97,0-.94203-.349-1.64603-1.046-2.11303-.252-.171-.533-.291-.845-.358-.312-.068-.74-.102-1.284-.102zM9.4126,12.1045h1.542v-1.542h.884v1.542h1.548v.883h-1.548v1.542h-.884v-1.542h-1.542v-.883zm6.3539-.5329V9.37156h1.74c.511,0,.885.087,1.122.263.238.174.356.45204.356.83104,0,.391-.139.683-.416.876-.219.153-.597.23-1.133.23h-1.669zm2.129-3.57404h-3.875v8.00104h1.746v-3.147h1.57c.559,0,.953.109,1.185.326.232.216.37.608.414,1.173.043.635.079,1.041.106,1.215.028.176.073.32.134.433h1.822l-.076-.093c-.105-.135-.184-.48-.235-1.034-.069-.756-.126-1.239-.17-1.45-.044-.212-.129-.414-.257-.608-.201-.306-.478-.504-.832-.591.401-.149.714-.397.939-.744.224-.347.337-.753.337-1.221,0-.41204-.09-.78204-.269-1.11104-.179-.328-.438-.591-.777-.788-.409-.24-.996-.361-1.762-.361z"></path>
                    </svg>
                </span>
            </div>
          `,
    );
  });
});
