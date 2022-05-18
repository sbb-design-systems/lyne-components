import { LyneTimetableTransportationWalk } from './lyne-timetable-transportation-walk';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-transportation-walk.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('lyne-timetable-transportation-walk', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableTransportationWalk],
      html: `<lyne-timetable-transportation-walk config='${config}' appearance='first-level'/>`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-transportation-walk
            config="{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;}"
            appearance="first-level"
        >
          <mock:shadow-root>
            <p
                aria-label="2 minutes of walking time before departure. (Distance 178 Meters)"
                class="walk walk--first-level walk--departure"
                role="text"
                title="2 minutes of walking time before departure. (Distance 178 Meters)"
            >
                <span class="walk__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="m11.5,4.99976c-.2569,0-.5.24314-.5.5,0,.25753.2428.5.5.5s.5-.24247.5-.5c0-.25686-.2431-.5-.5-.5zm-1.5.5c0-.80915.6909-1.5,1.5-1.5s1.5.69085,1.5,1.5c0,.81046-.6912,1.5-1.5,1.5s-1.5-.68954-1.5-1.5zm1,3.5v4.00004h1V8.99976h-1zm-1,.43425v6.91439l-1.91603,2.874.83206.5547,1.99997-3,.084-.126v-2.6513h1.2929L14,15.7069v4.2929h1v-4.7072l-2-2V9.70686l1.1464,1.14644.1465.1465H17V9.99976h-2.2929L12.8536,8.1462l-.1465-.14644h-2.3585l-.126.08397L7.22265,10.0837,7,10.2322v3.7676h1v-3.2325l2-1.33329z"></path>
                    </svg>
                </span>
                <span aria-hidden="true" class="walk__duration--visual" role="presentation">2'</span>
                <span class="walk__text--visually-hidden">2 minutes of walking time before departure. (Distance 178 Meters)</span>
            </p>
          </mock:shadow-root>
        </lyne-timetable-transportation-walk>
      `);
  });

});
