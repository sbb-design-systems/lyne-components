import sampleData from './sbb-timetable-travel-hints.sample-data';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-timetable-travel-hints';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-travel-hints', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-timetable-travel-hints config="${config}" appearance="first-level-list" />`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-timetable-travel-hints
            config="{&quot;travelHintsItems&quot;:[{&quot;icon&quot;:&quot;sa-sb&quot;,&quot;text&quot;:&quot;Description what sa-sb means...&quot;},{&quot;icon&quot;:&quot;sa-rr&quot;,&quot;text&quot;:&quot;Description what sa-rr means...&quot;},{&quot;icon&quot;:&quot;sa-zm&quot;,&quot;text&quot;:&quot;Description what sa-zm means...&quot;}]}"
            appearance="first-level-list"
        >

        </sbb-timetable-travel-hints>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
            <div class="travel-hints travel-hints--first-level-list">
                <ul
                    class="travel-hints__list"
                    role="list"
                >
                    <li class="travel-hints__list-item">
                        <span
                            aria-label="Description what sa-sb means..."
                            class="travel-hints__icon travel-hints__icon--sa-sb"
                            role="text"
                            title="Description what sa-sb means..."
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 16">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="m8.302,3.13252c1.019,0,2.08.29177,2.9.69889l.66-2.23043C10.722,1.15509,9.462,1,8.241,1,5.56,1,3.04,2.24074,3.04,5.09153c0,1.97842,1.43273,2.75499,2.72645,3.45621C6.83132,9.12493,7.802,9.65106,7.802,10.7543c0,1.454-1.321,2.1132-2.662,2.1132-1.2,0-2.34-.4469-3.42-.9315L1,14.2439C2.26,14.6898,3.64,15,4.98,15c3.061,0,5.742-1.202,5.742-4.518,0-2.13786-1.53749-3.01699-2.86504-3.77608C6.84839,6.12923,5.961,5.62182,5.961,4.68441c0-1.16319,1.34-1.55189,2.341-1.55189zm9.5596,3.56799h-1.101l.74-3.33449h.981c1.06,0,2.341.05816,2.341,1.35706,0,1.59066-1.541,1.97743-2.961,1.97743zM16.4406,12.6347h-.96l.841-3.91703h.899c1.501,0,2.861.21325,2.861,1.62943,0,2.0938-1.921,2.2876-3.641,2.2876zm2.961-11.40219h-4.141l-2.921,13.53469h3.982c2.08,0,6.56-.3102,6.56-4.1884,0-1.45402-.68-2.61722-2.24-2.84985v-.03878c1.62-.25202,2.98-1.57128,2.98-3.21913,0-2.46307-2.04-3.23853-4.22-3.23853z"></path>
                            </svg>
                        </span>
                    </li>
                    <li class="travel-hints__list-item">
                        <span
                            aria-label="Description what sa-rr means..."
                            class="travel-hints__icon travel-hints__icon--sa-rr"
                            role="text"
                            title="Description what sa-rr means..."
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="m1,1h13.9046v14H1V1zm1.26405,12.7273H13.6405V2.27273H2.26405V13.7273zM5.42544,3.54545h2.76069c.84439,0,1.49411.19982,1.95297.59819.4576.40091.6851.96854.6851,1.70545,0,1.18746-.5751,1.89891-1.72416,2.13564.26419.06236.46264.168.5941.322.13273.154.25913.40472.38046.75345l1.1743,3.39432H9.53614l-.88863-2.90432c-.19087-.62363-.59537-.93545-1.21602-.93545h-.38933v3.83977H5.42544V3.54545zm1.7229,3.77873h.56503c.45759,0,.81026-.11963,1.06054-.36145.24776-.24055.3729-.57655.3729-1.00546,0-.462-.10871-.78527-.32486-.97618-.21489-.18964-.57767-.28509-1.08961-.28509h-.69018v2.62691h.10618v.00127z"></path>
                            </svg>
                        </span>
                    </li>
                    <li class="travel-hints__list-item">
                        <span
                            aria-label="Description what sa-zm means..."
                            class="travel-hints__icon travel-hints__icon--sa-zm"
                            role="text"
                            title="Description what sa-zm means..."
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 16">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="m13.803,1H4.221l-.48,2.20583h6.101L1.44,12.7942,1,15h9.802l.46-2.2058H4.901l8.422-9.58837L13.803,1zm6.7792,0h-4.621l-2.961,14h2.66l2.561-11.59364h.04L19.3822,15h2.68l6.321-11.59364h.04L25.7832,15h2.96l2.981-14h-4.66l-5.502,10.0897h-.04L20.5822,1z"></path>
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
          `,
    );
  });
});
