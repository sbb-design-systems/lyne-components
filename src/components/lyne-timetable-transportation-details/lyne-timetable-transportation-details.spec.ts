import { LyneTimetableDetails } from './lyne-timetable-transportation-details';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './lyne-timetable-transportation-details.sample-data';

const config = JSON.stringify(sampleData['bus']);

describe('lyne-timetable-transportation-details', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTimetableDetails],
      html: `<lyne-timetable-transportation-details config="{&quot;arrivalTime&quot;:{&quot;time&quot;:&quot;15:34&quot;,&quot;type&quot;:&quot;arrival&quot;},&quot;arrivalWalk&quot;:{&quot;distance&quot;:0,&quot;duration&quot;:0,&quot;type&quot;:&quot;arrival&quot;},&quot;departureTime&quot;:{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;},&quot;departureWalk&quot;:{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;},&quot;pearlChain&quot;:{&quot;legs&quot;:{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:25},{&quot;cancellation&quot;:false,&quot;duration&quot;:75}]},&quot;status&quot;:&quot;future&quot;},&quot;transportationNumber&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-zug-right&quot;,&quot;text&quot;:&quot;Train&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;ic-8&quot;,&quot;text&quot;:&quot;IC 8&quot;}}}" role="gridcell">`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-transportation-details
            config="{&quot;arrivalTime&quot;:{&quot;time&quot;:&quot;15:34&quot;,&quot;type&quot;:&quot;arrival&quot;},&quot;arrivalWalk&quot;:{&quot;distance&quot;:0,&quot;duration&quot;:0,&quot;type&quot;:&quot;arrival&quot;},&quot;departureTime&quot;:{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;},&quot;departureWalk&quot;:{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;},&quot;pearlChain&quot;:{&quot;legs&quot;:{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:25},{&quot;cancellation&quot;:false,&quot;duration&quot;:75}]},&quot;status&quot;:&quot;future&quot;},&quot;transportationNumber&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-zug-right&quot;,&quot;text&quot;:&quot;Train&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;ic-8&quot;,&quot;text&quot;:&quot;IC 8&quot;}}}"
            role="gridcell"
        >
          <mock:shadow-root>

            <div class="transportation-details">
                <lyne-timetable-transportation-number config="{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-zug-right&quot;,&quot;text&quot;:&quot;Train&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;ic-8&quot;,&quot;text&quot;:&quot;IC 8&quot;}}"></lyne-timetable-transportation-number>
                <lyne-timetable-transportation-walk config="{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;}"></lyne-timetable-transportation-walk>
                <lyne-timetable-transportation-time config="{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;}"></lyne-timetable-transportation-time>
                <lyne-pearl-chain legs="{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:25},{&quot;cancellation&quot;:false,&quot;duration&quot;:75}]}" status="future"></lyne-pearl-chain>
                <lyne-timetable-transportation-time config="{&quot;time&quot;:&quot;15:34&quot;,&quot;type&quot;:&quot;arrival&quot;}"></lyne-timetable-transportation-time>
            </div>

          </mock:shadow-root>

        </lyne-timetable-transportation-details>

      `);
  });

});
