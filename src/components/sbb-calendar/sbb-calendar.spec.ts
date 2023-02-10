import { SbbCalendar } from './sbb-calendar';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-calendar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SbbCalendar],
      html: "<sbb-calendar selected-date='2023-01-20T00:00:00'/>",
    });

    expect(page.root).toEqualHtml(`
      <sbb-calendar selected-date="2023-01-20T00:00:00">
        <mock:shadow-root>
          <div class="sbb-calendar__wrapper">
            <div class="sbb-calendar__controls">
              <sbb-button iconname="chevron-small-left-small" size="m" variant="secondary"></sbb-button>
              <div class="sbb-calendar__controls-month">
                <span class="sbb-calendar__controls-month-label">January 2023</span>
              </div>
              <sbb-button iconname="chevron-small-right-small" size="m" variant="secondary"></sbb-button>
            </div>
            <div class="sbb-calendar__table-container">
              <table class="sbb-calendar__table">
                <thead class="sbb-calendar__table-header">
                  <tr class="sbb-calendar__table-header-row">
                    <th>
                      <span class="visually-hidden">Monday</span>
                      <span aria-hidden="true">M</span>
                    </th>
                    <th>
                      <span class="visually-hidden">Tuesday</span>
                      <span aria-hidden="true">T</span>
                    </th>
                    <th>
                      <span class="visually-hidden">Wednesday</span>
                      <span aria-hidden="true">W</span>
                    </th>
                    <th>
                      <span class="visually-hidden">Thursday</span>
                      <span aria-hidden="true">T</span>
                    </th>
                    <th>
                      <span class="visually-hidden">Friday</span>
                      <span aria-hidden="true">F</span>
                    </th>
                    <th>
                      <span class="visually-hidden">Saturday</span>
                      <span aria-hidden="true">S</span>
                    </th>
                    <th>
                      <span class="visually-hidden">Sunday</span>
                      <span aria-hidden="true">S</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="sbb-calendar__table-body">
                  <tr>
                    <td colspan="6" data-day="0 1 2023"></td>
                    <td>
                      <button aria-disabled="false" aria-label="1 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="1 1 2023" tabindex="-1">
                        1
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button aria-disabled="false" aria-label="2 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="2 1 2023" tabindex="-1">
                        2
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="3 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="3 1 2023" tabindex="-1">
                        3
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="4 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="4 1 2023" tabindex="-1">
                        4
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="5 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="5 1 2023" tabindex="-1">
                        5
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="6 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="6 1 2023" tabindex="-1">
                        6
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="7 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="7 1 2023" tabindex="-1">
                        7
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="8 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="8 1 2023" tabindex="-1">
                        8
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button aria-disabled="false" aria-label="9 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="9 1 2023" tabindex="-1">
                        9
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="10 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="10 1 2023" tabindex="-1">
                        10
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="11 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="11 1 2023" tabindex="-1">
                        11
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="12 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="12 1 2023" tabindex="-1">
                        12
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="13 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="13 1 2023" tabindex="-1">
                        13
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="14 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="14 1 2023" tabindex="-1">
                        14
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="15 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="15 1 2023" tabindex="-1">
                        15
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button aria-disabled="false" aria-label="16 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="16 1 2023" tabindex="-1">
                        16
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="17 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="17 1 2023" tabindex="-1">
                        17
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="18 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="18 1 2023" tabindex="-1">
                        18
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="19 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="19 1 2023" tabindex="-1">
                        19
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="20 1 2023" aria-pressed="true" class="sbb-datepicker__day sbb-datepicker__day-selected" data-day="20 1 2023" tabindex="0">
                        20
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="21 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="21 1 2023" tabindex="-1">
                        21
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="22 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="22 1 2023" tabindex="-1">
                        22
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button aria-disabled="false" aria-label="23 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="23 1 2023" tabindex="-1">
                        23
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="24 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="24 1 2023" tabindex="-1">
                        24
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="25 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="25 1 2023" tabindex="-1">
                        25
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="26 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="26 1 2023" tabindex="-1">
                        26
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="27 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="27 1 2023" tabindex="-1">
                        27
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="28 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="28 1 2023" tabindex="-1">
                        28
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="29 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="29 1 2023" tabindex="-1">
                        29
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button aria-disabled="false" aria-label="30 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="30 1 2023" tabindex="-1">
                        30
                      </button>
                    </td>
                    <td>
                      <button aria-disabled="false" aria-label="31 1 2023" aria-pressed="false" class="sbb-datepicker__day" data-day="31 1 2023" tabindex="-1">
                        31
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-calendar>
    `);
  });

  it('renders with min and max', async () => {
    const page = await newSpecPage({
      components: [SbbCalendar],
      html: "<sbb-calendar selected-date='2023-01-20T00:00:00' min='2023-01-09T00:00:00' max='2023-01-29T00:00:00'/>",
    });

    const buttonPrevDay = page.root.shadowRoot.querySelector(
      "sbb-button[iconname='chevron-small-left-small']"
    );
    expect(buttonPrevDay).toHaveAttribute('disabled');
    const buttonNextDay = page.root.shadowRoot.querySelector(
      "sbb-button[iconname='chevron-small-right-small']"
    );
    expect(buttonNextDay).toHaveAttribute('disabled');

    const firstCell = page.root.shadowRoot.querySelector("[data-day='0 1 2023']");
    expect(firstCell).toEqualAttribute('colspan', '6');

    const lastDisabledMinDate = page.root.shadowRoot.querySelector("[data-day='8 1 2023']");
    expect(lastDisabledMinDate).toHaveAttribute('disabled');
    expect(lastDisabledMinDate).toEqualAttribute('aria-disabled', 'true');
    const firstNotDisabledMinDate = page.root.shadowRoot.querySelector("[data-day='9 1 2023']");
    expect(firstNotDisabledMinDate).not.toHaveAttribute('disabled');
    expect(firstNotDisabledMinDate).toEqualAttribute('aria-disabled', 'false');

    const lastNotDisabledMaxDate = page.root.shadowRoot.querySelector("[data-day='29 1 2023']");
    expect(lastNotDisabledMaxDate).not.toHaveAttribute('disabled');
    expect(lastNotDisabledMaxDate).toEqualAttribute('aria-disabled', 'false');
    const firstDisabledMaxDate = page.root.shadowRoot.querySelector("[data-day='30 1 2023']");
    expect(firstDisabledMaxDate).toHaveAttribute('disabled');
    expect(firstDisabledMaxDate).toEqualAttribute('aria-disabled', 'true');
  });
});
