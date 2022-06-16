import { SbbTimetableRow } from './sbb-timetable-row';
import { newSpecPage } from '@stencil/core/testing';
import sampleData from './sbb-timetable-row.sample-data';

const config = JSON.stringify(sampleData[0]);

describe('sbb-timetable-row', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [SbbTimetableRow],
      html: `<sbb-timetable-row config='${config}' role='row'/>`
    });

    expect(root)
      .toEqualHtml(`
        <sbb-timetable-row
            config="{&quot;cusHim&quot;:{&quot;cusHimItems&quot;:[{&quot;icon&quot;:&quot;alternative&quot;,&quot;text&quot;:&quot;Alternative connection due to the current service situation. Please check again for any changes shortly before starting your journey.&quot;}]},&quot;details&quot;:{&quot;arrivalTime&quot;:{&quot;time&quot;:&quot;15:34&quot;,&quot;type&quot;:&quot;arrival&quot;},&quot;arrivalWalk&quot;:{&quot;distance&quot;:0,&quot;duration&quot;:0,&quot;type&quot;:&quot;arrival&quot;},&quot;departureTime&quot;:{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;},&quot;departureWalk&quot;:{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;},&quot;pearlChain&quot;:{&quot;legs&quot;:{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:25},{&quot;cancellation&quot;:false,&quot;duration&quot;:10},{&quot;cancellation&quot;:false,&quot;duration&quot;:50},{&quot;cancellation&quot;:false,&quot;duration&quot;:15}]},&quot;status&quot;:&quot;future&quot;},&quot;transportationNumber&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-zug-right&quot;,&quot;text&quot;:&quot;Train&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;ic-8&quot;,&quot;text&quot;:&quot;IC 8&quot;}}},&quot;duration&quot;:{&quot;hours&quot;:0,&quot;minutes&quot;:37},&quot;occupancy&quot;:{&quot;occupancyItems&quot;:[{&quot;class&quot;:&quot;1&quot;,&quot;icon&quot;:&quot;utilization-low&quot;,&quot;occupancy&quot;:&quot;low&quot;},{&quot;class&quot;:&quot;2&quot;,&quot;icon&quot;:&quot;utilization-medium&quot;,&quot;occupancy&quot;:&quot;medium&quot;}]},&quot;parkAndRail&quot;:{&quot;distance&quot;:178},&quot;platform&quot;:{&quot;platform&quot;:&quot;13A/C&quot;},&quot;rowHeader&quot;:{&quot;departure&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;productMarketingName&quot;:&quot;&quot;,&quot;productText&quot;:&quot;IC 8&quot;,&quot;time&quot;:&quot;15:14&quot;}},&quot;travelHints&quot;:{&quot;travelHintsItems&quot;:[{&quot;icon&quot;:&quot;sa-sb&quot;,&quot;text&quot;:&quot;Description what sa-sb means...&quot;},{&quot;icon&quot;:&quot;sa-rr&quot;,&quot;text&quot;:&quot;Description what sa-rr means...&quot;},{&quot;icon&quot;:&quot;sa-zm&quot;,&quot;text&quot;:&quot;Description what sa-zm means...&quot;}]}}"
            role="row"
        >
          <mock:shadow-root>
            <div class="timetable__row timetable__row--departure-walk" role="none">
                <sbb-timetable-row-header config="{&quot;departure&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;productMarketingName&quot;:&quot;&quot;,&quot;productText&quot;:&quot;IC 8&quot;,&quot;time&quot;:&quot;15:14&quot;}}" role="rowheader"></sbb-timetable-row-header>
                <sbb-timetable-transportation-details config="{&quot;arrivalTime&quot;:{&quot;time&quot;:&quot;15:34&quot;,&quot;type&quot;:&quot;arrival&quot;},&quot;arrivalWalk&quot;:{&quot;distance&quot;:0,&quot;duration&quot;:0,&quot;type&quot;:&quot;arrival&quot;},&quot;departureTime&quot;:{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;},&quot;departureWalk&quot;:{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;},&quot;pearlChain&quot;:{&quot;legs&quot;:{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:25},{&quot;cancellation&quot;:false,&quot;duration&quot;:10},{&quot;cancellation&quot;:false,&quot;duration&quot;:50},{&quot;cancellation&quot;:false,&quot;duration&quot;:15}]},&quot;status&quot;:&quot;future&quot;},&quot;transportationNumber&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-zug-right&quot;,&quot;text&quot;:&quot;Train&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;ic-8&quot;,&quot;text&quot;:&quot;IC 8&quot;}}}" role="gridcell"></sbb-timetable-transportation-details>
                <sbb-timetable-row-button role="gridcell"></sbb-timetable-row-button>
                <sbb-timetable-platform config="{&quot;platform&quot;:&quot;13A/C&quot;}" role="gridcell"></sbb-timetable-platform>
                <sbb-timetable-occupancy config="{&quot;occupancyItems&quot;:[{&quot;class&quot;:&quot;1&quot;,&quot;icon&quot;:&quot;utilization-low&quot;,&quot;occupancy&quot;:&quot;low&quot;},{&quot;class&quot;:&quot;2&quot;,&quot;icon&quot;:&quot;utilization-medium&quot;,&quot;occupancy&quot;:&quot;medium&quot;}]}" role="gridcell"></sbb-timetable-occupancy>
                <sbb-timetable-travel-hints config="{&quot;travelHintsItems&quot;:[{&quot;icon&quot;:&quot;sa-sb&quot;,&quot;text&quot;:&quot;Description what sa-sb means...&quot;},{&quot;icon&quot;:&quot;sa-rr&quot;,&quot;text&quot;:&quot;Description what sa-rr means...&quot;},{&quot;icon&quot;:&quot;sa-zm&quot;,&quot;text&quot;:&quot;Description what sa-zm means...&quot;}]}" role="gridcell"></sbb-timetable-travel-hints>
                <sbb-timetable-duration config="{&quot;hours&quot;:0,&quot;minutes&quot;:37}" role="gridcell"></sbb-timetable-duration>
                <sbb-timetable-cus-him config="{&quot;cusHimItems&quot;:[{&quot;icon&quot;:&quot;alternative&quot;,&quot;text&quot;:&quot;Alternative connection due to the current service situation. Please check again for any changes shortly before starting your journey.&quot;}]}" role="gridcell"></sbb-timetable-cus-him>
            </div>
          </mock:shadow-root>
        </sbb-timetable-row>
      `);
  });

});
