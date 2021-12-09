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
      html: `<lyne-timetable-transportation-details config='${config}' role='gridcell' />`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-timetable-transportation-details
            config="{&quot;arrivalTime&quot;:{&quot;time&quot;:&quot;15:34&quot;,&quot;type&quot;:&quot;arrival&quot;},&quot;arrivalWalk&quot;:{&quot;distance&quot;:0,&quot;duration&quot;:0,&quot;type&quot;:&quot;arrival&quot;},&quot;departureTime&quot;:{&quot;time&quot;:&quot;15:14&quot;,&quot;type&quot;:&quot;departure&quot;},&quot;departureWalk&quot;:{&quot;distance&quot;:178,&quot;duration&quot;:2,&quot;type&quot;:&quot;departure&quot;},&quot;pearlChain&quot;:{&quot;legs&quot;:{&quot;legs&quot;:[{&quot;cancellation&quot;:false,&quot;duration&quot;:25},{&quot;cancellation&quot;:false,&quot;duration&quot;:75}]},&quot;status&quot;:&quot;future&quot;},&quot;transportationNumber&quot;:{&quot;direction&quot;:&quot;Direction Romanshorn&quot;,&quot;marketingName&quot;:&quot;&quot;,&quot;meansOfTransport&quot;:{&quot;picto&quot;:&quot;transportation-zug-right&quot;,&quot;text&quot;:&quot;Train&quot;},&quot;product&quot;:{&quot;icon&quot;:&quot;ic-8&quot;,&quot;text&quot;:&quot;IC 8&quot;}}}"
            role="gridcell"
        >
          <mock:shadow-root>
            <div
                class="transportation-details"
                role="none"
            >
                <lyne-timetable-transportation-number role="none">
                    <mock:shadow-root>
                      <p
                          aria-label="Train IC 8  Direction Romanshorn"
                          class="transportation-number"
                          role="text"
                      >
                          <span
                              aria-hidden="true"
                              class="transportation-number--visual"
                              role="presentation"
                          >
                              <span class="transportation-number__means_of_transport">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m22.5,0h-21C.675,0,0,.675,0,1.5v21c0,.825.675,1.5,1.5,1.5h21c.825,0,1.5-.675,1.5-1.5v-21c0-.825-.675-1.5-1.5-1.5z" fill="#2d327d"></path>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m20.715,18.8625c.21,0,.375-.165.375-.375,0-.015,0-.0375,0-.0525l-.3225-2.235H16.875v2.6625h3.84z" fill="#fff"></path>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m11.6325,8.19001H3v-.69h7.05l-2.2125-1.5L12,3.63751l4.14,2.3625h.0225l-2.2125,1.5h4.5975c.5625,0,1.035.4125,1.1175.9675l1.005,7.01999H3V11.775h8.6325c.2025,0,.3675-.165.3675-.3675s-.165-.3675-.3675-.3675H3v-.69h8.6325c.2025,0,.3675-.165.3675-.36749,0-.2025-.165-.3675-.3675-.3675H3v-.69h8.6325c.2025,0,.3675-.165.3675-.3675s-.165-.3675-.3675-.3675zM16.65,11.4c0,.21.165.375.375.375h1.9575c.21,0,.375-.165.375-.375v-.0525l-.405-2.83499c-.03-.1875-.1875-.3225-.375-.3225H17.025c-.21,0-.375.165-.375.375V11.4zm-1.845-5.33999-2.1225,1.44h-1.365l-2.13-1.4475L12,4.45501l2.805,1.605z" fill="#fff"></path>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m7.79251,18.0225c0-1.0575.855-1.9125,1.9125-1.9125,1.05749,0,1.91249.855,1.91249,1.9125s-.855,1.9125-1.91249,1.9125c-1.0575,0-1.9125-.855-1.9125-1.9125z" fill="#fff"></path>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m12.3,18.0225c0-1.0575.855-1.9125,1.9125-1.9125s1.9125.855,1.9125,1.9125-.855,1.9125-1.9125,1.9125S12.3,19.08,12.3,18.0225z" fill="#fff"></path>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m21,3v.375H3V3h18z" fill="#fff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="m3,21v-.7125h18V21H3z" fill="#fff"></path>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m2.85001,16.3125V16.2h4.125v2.6625h-4.125v-2.55z" fill="#fff"></path>
                                  </svg>
                              </span>
                              <span class="transportation-number__product-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 20">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m2,0C.89543,0,0,.895431,0,2v16c0,1.1046.895431,2,2,2h55c1.1046,0,2-.8954,2-2V2c0-1.104569-.8954-2-2-2H2z" fill="#eb0000"></path>
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="m38.3331,9.59037c-.5002-.15794-.934-.47781-1.2337-.90957-.2962-.45543-.4461-.99101-.4296-1.53457-.0231-.95685.4402-1.85985,1.2298-2.39687.7545-.53643,1.6614-.81389,2.5858-.79102,1.1352,0,2.0629.3138,2.7829.9414.6572.53499,1.0346,1.34199,1.0247,2.19102.0156.55147-.1355,1.09476-.4335,1.5584-.2975.43909-.7291.76938-1.2298.94121.3628.09703.7066.25485,1.0171.46683.7303.5326,1.0955,1.3104,1.0957,2.3334.0359,1.101-.4676,2.15-1.348,2.8082-.7568.5853-1.7292.878-2.9171.8779-1.2876,0-2.3124-.3217-3.0743-.965-.7827-.6451-1.2226-1.6182-1.1905-2.634,0-1.0178.3521-1.8062,1.0564-2.3653.3153-.24526.6775-.42295,1.0641-.52203zm2.105.87013c-.5155-.02-1.0172.1697-1.3914.5262-.3612.3532-.5572.8428-.5399,1.3486-.0195.5158.1795,1.0159.5477,1.3764.3844.3607.897.5516,1.4229.5298.6622,0,1.1589-.1951,1.4901-.5853.3145-.358.4858-.8201.481-1.2973.0171-.5163-.1833-1.0159-.5521-1.3763-.3958-.3647-.9218-.553-1.4583-.5221zM39.232,6.17728c.3385-.29254.7757-.44398,1.2219-.42324.4618-.02786.9178.1157,1.281.40332.3147.28546.4842.69818.4613,1.12324.0219.4357-.1449.85965-.4574,1.16289-.3443.29904-.7908.4522-1.2454.42715-.4588.02355-.909-.13078-1.2575-.43105-.3166-.29634-.488-.71694-.4691-1.15098-.0159-.42117.1543-.82791.4652-1.11133z" fill="#fff"></path>
                                      <path d="m9.22072,4.19995h4.05608L8.25878,15.8H4.18579L9.22072,4.19995zm6.72758,0h14.3949l-1.4906,3.44547H18.5724l-2.0413,4.70908h10.2847L25.3259,15.8h-14.395l5.0174-11.60005z" fill="#fff"></path>
                                  </svg>
                              </span>
                              <span class="transportation-number__direction">
                                  <span class="transportation-number__direction_text"> Direction Romanshorn</span>
                              </span>
                          </span>
                          <span class="transportation-number--visually-hidden">Train IC 8  Direction Romanshorn</span>
                      </p>
                    </mock:shadow-root>
                </lyne-timetable-transportation-number>

                <lyne-timetable-transportation-walk>
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
                            <span
                                aria-hidden="true"
                                class="walk__text--visual"
                                role="presentation"
                            >
                                2'
                            </span>
                            <span class="walk__text--visually-hidden">
                                2 minutes of walking time before departure. (Distance 178 Meters)
                            </span>
                        </p>
                    </mock:shadow-root>
                </lyne-timetable-transportation-walk>

                <lyne-timetable-transportation-time>
                    <mock:shadow-root>
                        <p
                            aria-label="Departure 15:14."
                            class="time time--departure"
                            role="text"
                        >
                            <span
                                aria-hidden="true"
                                class="time__text"
                                role="presentation"
                            >
                                15:14
                            </span>
                            <span class="time__text--visually-hidden">
                                Departure 15:14.
                            </span>
                        </p>
                    </mock:shadow-root>
                </lyne-timetable-transportation-time>

                <lyne-pearl-chain class="hydrated">
                    <mock:shadow-root>
                        <div class="pearl-chain">
                            <div class="pearl-chain__leg" style="flex-basis: 25%;"></div>
                            <div class="pearl-chain__leg" style="flex-basis: 75%;"></div>
                        </div>
                    </mock:shadow-root>
                </lyne-pearl-chain>

                <lyne-timetable-transportation-time>
                    <mock:shadow-root>
                        <p
                            aria-label="Arrival 15:34."
                            class="time time--arrival"
                            role="text"
                        >
                            <span
                                aria-hidden="true"
                                class="time__text"
                                role="presentation"
                            >
                                15:34
                            </span>
                            <span class="time__text--visually-hidden">
                                Arrival 15:34.
                            </span>
                        </p>
                    </mock:shadow-root>
                </lyne-timetable-transportation-time>

          </mock:shadow-root>
        </lyne-timetable-transportation-details>
      `);
  });

});
