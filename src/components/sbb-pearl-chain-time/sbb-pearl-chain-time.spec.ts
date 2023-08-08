import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChainTime } from './sbb-pearl-chain-time';

const now = new Date('2022-08-16T15:00:00Z').valueOf();

describe('sbb-pearl-chain-time', () => {
  it('should render component with time', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainTime],
      html: `
        <sbb-pearl-chain-time
          departure-time='2022-08-16T12:00:00'
          arrival-time='2022-08-16T15:00:00'
          data-now="${now}">
        </sbb-pearl-chain-time>
      `,
    });
    page.rootInstance.legs = [
      {
        __typename: 'PTRideLeg',
      },
    ];
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <sbb-pearl-chain-time arrival-time="2022-08-16T15:00:00" departure-time="2022-08-16T12:00:00" data-now="1660662000000">
        <mock:shadow-root>
          <div class="sbb-pearl-chain__time">
            <time class="sbb-pearl-chain__time-time" datetime="2022-08-16T12:00:00">
              <span class="sbb-screenreaderonly">
                Departure:
              </span>
              12:00
            </time>
            <sbb-pearl-chain class="sbb-pearl-chain__time-chain" data-now="1660662000000"></sbb-pearl-chain>
            <time class="sbb-pearl-chain__time-time" datetime="2022-08-16T15:00:00">
              <span class="sbb-screenreaderonly">
                Arrival:
              </span>
              15:00
            </time>
          </div>
        </mock:shadow-root>
      </sbb-pearl-chain-time>
      `);
  });

  it('should render component with departure walk', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainTime],
      html: `
        <sbb-pearl-chain-time
          departure-time='2022-08-16T12:00:00'
          arrival-time='2022-08-16T15:00:00'
          departure-walk="10"
          data-now="${now}">
        </sbb-pearl-chain-time>
      `,
    });
    page.rootInstance.legs = [
      {
        __typename: 'PTRideLeg',
      },
    ];
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
        <sbb-pearl-chain-time departure-time='2022-08-16T12:00:00' arrival-time='2022-08-16T15:00:00' departure-walk="10" data-now="1660662000000">
          <mock:shadow-root>
            <div class="sbb-pearl-chain__time">
              <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--left">
                <sbb-icon name="walk-small"></sbb-icon>
                <time datetime="10M">
                  <span class="sbb-screenreaderonly">
                    minutes of walking time before departure:
                  </span>
                  10
                  <span aria-hidden="true">
                    '
                  </span>
                </time>
              </span>
              <time class="sbb-pearl-chain__time-time" datetime="2022-08-16T12:00:00">
                <span class="sbb-screenreaderonly">
                  Departure:
                </span>
                12:00
              </time>
              <sbb-pearl-chain class="sbb-pearl-chain__time-chain" data-now="1660662000000"></sbb-pearl-chain>
              <time class="sbb-pearl-chain__time-time" datetime="2022-08-16T15:00:00">
                <span class="sbb-screenreaderonly">
                  Arrival:
                </span>
                15:00
              </time>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
  });

  it('should render component with arrival walk', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainTime],
      html: `
        <sbb-pearl-chain-time departure-time='2022-08-16T12:00:00' arrival-time='2022-08-16T15:00:00' arrival-walk="10" data-now="${now}">
        </sbb-pearl-chain-time>
      `,
    });
    page.rootInstance.legs = [
      {
        __typename: 'PTRideLeg',
      },
    ];
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
        <sbb-pearl-chain-time arrival-time="2022-08-16T15:00:00" departure-time="2022-08-16T12:00:00" arrival-walk="10" data-now="1660662000000">
          <mock:shadow-root>
            <div class="sbb-pearl-chain__time">
              <time class="sbb-pearl-chain__time-time" datetime="2022-08-16T12:00:00">
                <span class="sbb-screenreaderonly">
                  Departure:
                </span>
                12:00
              </time>
              <sbb-pearl-chain class="sbb-pearl-chain__time-chain" data-now="1660662000000"></sbb-pearl-chain>
              <time class="sbb-pearl-chain__time-time" datetime="2022-08-16T15:00:00">
                <span class="sbb-screenreaderonly">
                  Arrival:
                </span>
                15:00
              </time>
              <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--right">
                <sbb-icon name="walk-small"></sbb-icon>
                <time datetime="10M">
                  <span class="sbb-screenreaderonly">
                    minutes of walking time after arrival:
                  </span>
                  10
                  <span aria-hidden="true">
                    '
                  </span>
                </time>
              </span>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
  });

  it('should render' + ' component with departure and arrival walk', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainTime],
      html: `
        <sbb-pearl-chain-time
          departure-time='2022-08-16T12:00:00'
          arrival-time='2022-08-16T15:00:00'
          departure-walk="20"
          arrival-walk="10"
          data-now="${now}">
        </sbb-pearl-chain-time>
      `,
    });
    page.rootInstance.legs = [
      {
        __typename: 'PTRideLeg',
      },
    ];
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
        <sbb-pearl-chain-time arrival-time="2022-08-16T15:00:00" departure-time="2022-08-16T12:00:00" departure-walk="20" arrival-walk="10" data-now="1660662000000">
        <mock:shadow-root>
            <div class="sbb-pearl-chain__time">
              <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--left">
                <sbb-icon name="walk-small"></sbb-icon>
                <time datetime="20M">
                  <span class="sbb-screenreaderonly">
                    minutes of walking time before departure:
                  </span>
                  20
                  <span aria-hidden="true">
                    '
                  </span>
                </time>
              </span>
              <time class="sbb-pearl-chain__time-time" datetime="2022-08-16T12:00:00">
                <span class="sbb-screenreaderonly">
                  Departure:
                </span>
                12:00
              </time>
              <sbb-pearl-chain class="sbb-pearl-chain__time-chain" data-now="1660662000000"></sbb-pearl-chain>
              <time class="sbb-pearl-chain__time-time" datetime="2022-08-16T15:00:00">
                <span class="sbb-screenreaderonly">
                  Arrival:
                </span>
                15:00
              </time>
              <span class="sbb-pearl-chain__time-walktime sbb-pearl-chain__time-walktime--right">
                <sbb-icon name="walk-small"></sbb-icon>
                <time datetime="10M">
                  <span class="sbb-screenreaderonly">
                    minutes of walking time after arrival:
                  </span>
                  10
                  <span aria-hidden="true">
                    '
                  </span>
                </time>
              </span>
            </div>
          </mock:shadow-root>
        </sbb-pearl-chain>
      `);
  });
});
