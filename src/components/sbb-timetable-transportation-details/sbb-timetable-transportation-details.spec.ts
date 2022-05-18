import { SbbTimetableTransportationDetails } from './sbb-timetable-transportation-details';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-transportation-details.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-transportation-details', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbTimetableTransportationDetails],
      html: `<sbb-timetable-transportation-details config='${config}'>`
    });

    expect(root)
      .toEqualHtml(`
        <sbb-timetable-transportation-details
            config="{&quot;arrivalTime&quot;:{&quot;time&quot;:&quot;15:34&quot;,&quot;type&quot;:&quot;arrival&quot;},&quot;arrivalWalk&quot;:{&quot;distance&quot;:0,&quot;duration&quot;:0,&quot;type&quot;:&quot;arrival&quot;},&quot;departureTime&quot;:{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;},&quot;departureWalk&quot;:{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;},&quot;pearlChain&quot;:{&quot;legs&quot;:{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:25},{&quot;cancellation&quot;:false,&quot;duration&quot;:75}]},&quot;status&quot;:&quot;future&quot;},&quot;transportationNumber&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-zug-right&quot;,&quot;text&quot;:&quot;Train&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;ic-8&quot;,&quot;text&quot;:&quot;IC 8&quot;}}}"
        >
          <mock:shadow-root>

            <div class="transportation-details">
                <sbb-timetable-transportation-number config="{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-zug-right&quot;,&quot;text&quot;:&quot;Train&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;ic-8&quot;,&quot;text&quot;:&quot;IC 8&quot;}}"></sbb-timetable-transportation-number>
                <sbb-timetable-transportation-walk config="{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;}"></sbb-timetable-transportation-walk>
                <sbb-timetable-transportation-time config="{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;}"></sbb-timetable-transportation-time>
                <sbb-pearl-chain legs="{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:25},{&quot;cancellation&quot;:false,&quot;duration&quot;:75}]}" status="future"></sbb-pearl-chain>
                <sbb-timetable-transportation-time config="{&quot;time&quot;:&quot;15:34&quot;,&quot;type&quot;:&quot;arrival&quot;}"></sbb-timetable-transportation-time>
            </div>

          </mock:shadow-root>

        </sbb-timetable-transportation-details>

      `);
  });

});
