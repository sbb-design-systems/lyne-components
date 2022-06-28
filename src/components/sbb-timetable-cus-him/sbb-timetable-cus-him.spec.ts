import { SbbTimetableCusHim } from './sbb-timetable-cus-him';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-cus-him.sample-data';

const config = JSON.stringify(sampleData[1]);

describe('sbb-timetable-cus-him', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimetableCusHim],
      html: `<sbb-timetable-cus-him config='${config}' appearance="first-level-list"/>`,
    });

    expect(root).toEqualHtml(`
        <sbb-timetable-cus-him
            config="{&quot;cusHimItems&quot;:[{&quot;icon&quot;:&quot;alternative&quot;,&quot;text&quot;:&quot;Alternative connection due to the current service situation. Please check again for any changes shortly before starting your journey.&quot;},{&quot;icon&quot;:&quot;delay&quot;,&quot;text&quot;:&quot;Connection delayed.&quot;},{&quot;icon&quot;:&quot;disruption&quot;,&quot;text&quot;:&quot;Disruption!&quot;}]}"
            appearance="first-level-list"
        >
          <mock:shadow-root>
            <div class="cus-him cus-him--first-level-list">
                <ul
                    class="cus-him__list"
                    role="list"
                >
                    <li class="cus-him__list-item">
                        <span
                            aria-label="Alternative connection due to the current service situation. Please check again for any changes shortly before starting your journey."
                            class="cus-him__icon"
                            role="text"
                            title="Alternative connection due to the current service situation. Please check again for any changes shortly before starting your journey."
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="m0,1.99411C0,.893115.894993.000122,1.99398.000122H14.0059c1.101,0,1.994.893993,1.994,1.993988V14.006c0,1.101-.895,1.994-1.994,1.994H1.99398C.892993,16,0,15.105,0,14.006V1.99411z" fill="#eb0000"></path>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="m10.3905,1.9998h-1.5v8.3169H5.78153l1.72398-1.72495L6.44452,7.53176,2.90855,11.0687l3.53597,3.537,1.06099-1.061-1.72798-1.728h4.61297V1.9998z" fill="#fff"></path>
                          </svg>
                        </span>
                    </li>
                    <li class="cus-him__list-item">
                        <span
                            aria-label="Connection delayed."
                            class="cus-him__icon"
                            role="text"
                            title="Connection delayed."
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <rect width="16" height="16" rx="2" fill="#eb0000"></rect>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="m7.994,2C4.682,2,2,4.688,2,8s2.682,6,5.994,6C11.312,14,14,11.312,14,8s-2.688-6-6.006-6zM8,12.8c-2.652,0-4.8-2.148-4.8-4.8S5.348,3.2,8,3.2,12.8,5.348,12.8,8,10.652,12.8,8,12.8z" fill="#fff"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="m8.30002,5h-.9v3.54098L10.55,10.4,11,9.6741,8.30002,8.09836V5z" fill="#fff"></path>
                            </svg>
                        </span>
                    </li>
                    <li class="cus-him__list-item">
                        <span
                            aria-label="Disruption!"
                            class="cus-him__icon"
                            role="text"
                            title="Disruption!"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <rect width="16" height="16" rx="2" fill="#eb0000"></rect>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="m3.35025,14.4972.48006-3.4441,1.16511,1.2954,3.52206-4.38696L3,6.70786,7.24296,1.5h5.02114L6.09717,6.23724,12.5,7.68842,5.92829,13.2107,7.10643,14.5l-3.75618-.0028z" fill="#fff"></path>
                            </svg>
                        </span>
                    </li>
                </ul>
            </div>
          </mock:shadow-root>
        </sbb-timetable-cus-him>
      `);
  });
});
