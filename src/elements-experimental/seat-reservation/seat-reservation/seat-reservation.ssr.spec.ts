import { ssrHydratedFixture } from '@lit-labs/testing/fixtures.js';
import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { SbbSeatReservationElement } from './seat-reservation.component.ts';

describe(`sbb-seat-reservation ssr`, () => {
  let root: SbbSeatReservationElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-seat-reservation>
        <div class="sbb-sr__component">
          <div class="sbb-sr-navigation-wrapper">
            <nav id="sbb-sr-navigation" class="sbb-sr-navigation">
              <div class="sbb-sr-navigation__wrapper-button-direction">
                <sbb-secondary-button
                  class="sbb-sr__navigation-control-button"
                  size="m"
                  type="button"
                  role="button"
                  id="sbb-sr-navigation__wrapper-button-direction--left"
                  icon-name="chevron-small-left-small"
                  aria-label="Start Graphic Seat Reservation"
                  disabled=""
                  disabled-interactive=""
                  ><template
                    ><span class="sbb-action-base sbb-secondary-button">
                      <slot name="icon">
                        <sbb-icon name="chevron-small-left-small"
                          ><template
                            ><span class="sbb-icon-inner"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#000"
                                  fill-rule="evenodd"
                                  d="m9.373 11.644 3.95-3.904.703.711L10.436 12l3.588 3.548-.703.711-3.948-3.904-.36-.355z"
                                  clip-rule="evenodd"
                                ></path></svg></span></template
                        ></sbb-icon>
                      </slot>

                      <span class="sbb-button__label">
                        <slot></slot>
                      </span> </span></template
                ></sbb-secondary-button>
              </div>
              <ul
                id="sbb-sr__navigation-list-coaches"
                class="sbb-sr-navigation__list-coaches"
                aria-label="Seat reservation navigation"
              >
                <li>
                  <sbb-seat-reservation-navigation-coach index="0"
                    ><template>
                      <div class=" sbb-sr-navigation__item-coach ">
                        <button
                          type="button"
                          class=" sbb-sr-navigation__ctrl-button sbb-sr-navigation-driver-area "
                          aria-describedby="nav-coach-service-descriptions-0"
                        >
                          <sbb-screen-reader-only id="nav-coach-service-descriptions-0"
                            ><template><slot></slot></template>

                            <div>Locomotive</div>
                          </sbb-screen-reader-only>
                        </button>
                      </div>
                    </template>
                  </sbb-seat-reservation-navigation-coach>
                </li>
                <li>
                  <sbb-seat-reservation-navigation-coach index="1"
                    ><template>
                      <div class=" sbb-sr-navigation__item-coach ">
                        <button
                          type="button"
                          class=" sbb-sr-navigation__ctrl-button "
                          aria-describedby="nav-coach-service-descriptions-1"
                        >
                          <span class="sbb-sr-navigation--first-class"></span>

                          <div class="sbb-sr-navigation__additional-information">
                            <div class="sbb-sr-navigation__item-coach-number" aria-hidden="true">
                              10
                            </div>
                            <div
                              class="sbb-sr-navigation__item-coach-travelclass"
                              aria-hidden="true"
                            >
                              1
                            </div>
                          </div>

                          <sbb-screen-reader-only id="nav-coach-service-descriptions-1"
                            ><template><slot></slot></template>

                            <div>
                              Navigate to coach 10 with First class compartment. 0 seats available.
                              0 available bicycle spaces.
                            </div>

                            <div>Available services: Wheelchair zone.</div>
                          </sbb-screen-reader-only>
                        </button>
                        <sbb-seat-reservation-navigation-services
                          ><template>
                            <div class="sbb-sr-navigation__signs">
                              <sbb-screen-reader-only
                                ><template><slot></slot></template>Available services:Wheelchair
                                zone</sbb-screen-reader-only
                              >

                              <sbb-seat-reservation-graphic
                                class="auto-width"
                                aria-hidden="true"
                                name="WHEELCHAIR_ICON"
                                ><template
                                  ><span class=" sbb-sr-icon ">
                                    <sbb-icon aria-hidden="false" name="sa-rs" aria-label=""
                                      ><template
                                        ><span class="sbb-icon-inner"
                                          ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13"
                                            height="16"
                                            fill="none"
                                            viewBox="0 0 13 16"
                                          >
                                            <path
                                              fill="#000"
                                              fill-rule="evenodd"
                                              d="M5.718 3.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5M9.334 11l.862 2.38a.94.94 0 0 0 .872.62c.645 0 1.1-.65.873-1.26l-1.289-3.58a.98.98 0 0 0-.931-.66H7.194V5.75c0-.83-.664-1.5-1.487-1.5-.822 0-1.486.67-1.486 1.5V9.5c0 .83.664 1.5 1.486 1.5zm-.743.68.614 1.7v.01c-.862.98-2.1 1.61-3.498 1.61C3.111 15 1 12.87 1 10.25c0-1.7.892-3.18 2.23-4.02V8.2a3.24 3.24 0 0 0-.744 2.05c0 1.79 1.447 3.25 3.221 3.25 1.269 0 2.359-.75 2.884-1.82"
                                              clip-rule="evenodd"
                                            ></path></svg></span></template
                                    ></sbb-icon> </span></template
                              ></sbb-seat-reservation-graphic></div></template
                        ></sbb-seat-reservation-navigation-services>
                      </div>
                    </template>
                  </sbb-seat-reservation-navigation-coach>
                </li>
                <li>
                  <sbb-seat-reservation-navigation-coach index="2"
                    ><template>
                      <div class=" sbb-sr-navigation__item-coach ">
                        <button
                          type="button"
                          class=" sbb-sr-navigation__ctrl-button sbb-sr-navigation-driver-area "
                          aria-describedby="nav-coach-service-descriptions-2"
                        >
                          <sbb-screen-reader-only id="nav-coach-service-descriptions-2"
                            ><template><slot></slot></template>

                            <div>Locomotive</div>
                          </sbb-screen-reader-only>
                        </button>
                      </div>
                    </template>
                  </sbb-seat-reservation-navigation-coach>
                </li>
                <li>
                  <sbb-seat-reservation-navigation-coach index="3"
                    ><template>
                      <div class=" sbb-sr-navigation__item-coach ">
                        <button
                          type="button"
                          class=" sbb-sr-navigation__ctrl-button "
                          aria-describedby="nav-coach-service-descriptions-3"
                        >
                          <span class="sbb-sr-navigation--first-class"></span>

                          <div class="sbb-sr-navigation__additional-information">
                            <div class="sbb-sr-navigation__item-coach-number" aria-hidden="true">
                              9
                            </div>
                            <div
                              class="sbb-sr-navigation__item-coach-travelclass"
                              aria-hidden="true"
                            >
                              1
                            </div>
                          </div>

                          <sbb-screen-reader-only id="nav-coach-service-descriptions-3"
                            ><template><slot></slot></template>

                            <div>
                              Navigate to coach 9 with First class compartment. 27 seats available.
                              0 available bicycle spaces.
                            </div>

                            <div>Available services: Wheelchair zone.</div>
                          </sbb-screen-reader-only>
                        </button>
                        <sbb-seat-reservation-navigation-services
                          ><template>
                            <div class="sbb-sr-navigation__signs">
                              <sbb-screen-reader-only
                                ><template><slot></slot></template>Available services:Wheelchair
                                zone</sbb-screen-reader-only
                              >

                              <sbb-seat-reservation-graphic
                                class="auto-width"
                                aria-hidden="true"
                                name="WHEELCHAIR_ICON"
                                ><template
                                  ><span class=" sbb-sr-icon ">
                                    <sbb-icon aria-hidden="false" name="sa-rs" aria-label=""
                                      ><template
                                        ><span class="sbb-icon-inner"
                                          ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13"
                                            height="16"
                                            fill="none"
                                            viewBox="0 0 13 16"
                                          >
                                            <path
                                              fill="#000"
                                              fill-rule="evenodd"
                                              d="M5.718 3.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5M9.334 11l.862 2.38a.94.94 0 0 0 .872.62c.645 0 1.1-.65.873-1.26l-1.289-3.58a.98.98 0 0 0-.931-.66H7.194V5.75c0-.83-.664-1.5-1.487-1.5-.822 0-1.486.67-1.486 1.5V9.5c0 .83.664 1.5 1.486 1.5zm-.743.68.614 1.7v.01c-.862.98-2.1 1.61-3.498 1.61C3.111 15 1 12.87 1 10.25c0-1.7.892-3.18 2.23-4.02V8.2a3.24 3.24 0 0 0-.744 2.05c0 1.79 1.447 3.25 3.221 3.25 1.269 0 2.359-.75 2.884-1.82"
                                              clip-rule="evenodd"
                                            ></path></svg></span></template
                                    ></sbb-icon> </span></template
                              ></sbb-seat-reservation-graphic></div></template
                        ></sbb-seat-reservation-navigation-services>
                      </div>
                    </template>
                  </sbb-seat-reservation-navigation-coach>
                </li>
              </ul>

              <div class="sbb-sr-navigation__wrapper-button-direction">
                <sbb-secondary-button
                  class="sbb-sr__navigation-control-button"
                  size="m"
                  type="button"
                  role="button"
                  id="sbb-sr-navigation__wrapper-button-direction--right"
                  icon-name="chevron-small-right-small"
                  aria-label="Exit Graphic Seat Reservation"
                  tabindex="0"
                  ><template
                    ><span class="sbb-action-base sbb-secondary-button">
                      <slot name="icon">
                        <sbb-icon name="chevron-small-right-small"
                          ><template
                            ><span class="sbb-icon-inner"
                              ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#000"
                                  fill-rule="evenodd"
                                  d="m10.678 7.74 3.949 3.904.36.356-.36.356-3.95 3.904-.703-.712L13.564 12l-3.59-3.548z"
                                  clip-rule="evenodd"
                                ></path></svg></span></template
                        ></sbb-icon>
                      </slot>

                      <span class="sbb-button__label">
                        <slot></slot>
                      </span> </span></template
                ></sbb-secondary-button>
              </div>
            </nav>
          </div>
          <div class="sbb-sr__wrapper-coach-decks">
            <div class="sbb-sr__wrapper-deck-labels"></div>
            <div id="sbb-sr__wrapper-scrollarea" class="sbb-sr__wrapper-scrollarea" tabindex="-1">
              <div id="sbb-sr__parent-area" class="sbb-sr__parent">
                <ul class=" sbb-sr__list-decks ">
                  <li class="sbb-sr__list-item-deck">
                    <ul class="sbb-sr__list-coaches" role="presentation">
                      <li class="sbb-sr__item-coach">
                        <sbb-seat-reservation-scoped
                          style="--sbb-seat-reservation-scoped-width:896;--sbb-seat-reservation-scoped-height:160;"
                        >
                          <sbb-seat-reservation-graphic
                            name="COACH_BORDER_MIDDLE"
                            role="presentation"
                            style="--sbb-seat-reservation-graphic-width:704;--sbb-seat-reservation-graphic-height:172;--sbb-seat-reservation-graphic-top:-6;--sbb-seat-reservation-graphic-left:96;--sbb-seat-reservation-graphic-position:absolute;"
                            stretch=""
                          ></sbb-seat-reservation-graphic>

                          <sbb-seat-reservation-graphic
                            aria-hidden="true"
                            style="--sbb-seat-reservation-graphic-width:96;--sbb-seat-reservation-graphic-height:172;--sbb-seat-reservation-graphic-top:-6;--sbb-seat-reservation-graphic-left:0;--sbb-seat-reservation-graphic-position:absolute;--sbb-seat-reservation-graphic-rotation:0;"
                            name="DRIVER_AREA_NO_VERTICAL_WALL"
                            stretch=""
                          ></sbb-seat-reservation-graphic>
                          <sbb-seat-reservation-graphic
                            aria-hidden="true"
                            style="--sbb-seat-reservation-graphic-width:96;--sbb-seat-reservation-graphic-height:172;--sbb-seat-reservation-graphic-top:-6;--sbb-seat-reservation-graphic-left:800;--sbb-seat-reservation-graphic-position:absolute;--sbb-seat-reservation-graphic-rotation:180;"
                            name="DRIVER_AREA_NO_VERTICAL_WALL"
                            stretch=""
                          ></sbb-seat-reservation-graphic>

                          <table
                            class="sbb-sr-coach-wrapper__table"
                            id="sbb-sr-coach-0"
                            aria-describedby="sbb-sr-coach-caption-0"
                            tabindex="0"
                          >
                            <caption tabindex="-1" id="sbb-sr-coach-caption-0">
                              <sbb-screen-reader-only>Locomotive</sbb-screen-reader-only>
                            </caption>
                          </table>
                        </sbb-seat-reservation-scoped>
                      </li>

                      <li class="sbb-sr__item-coach">
                        <sbb-seat-reservation-scoped
                          style="--sbb-seat-reservation-scoped-width:912;--sbb-seat-reservation-scoped-height:160;"
                        >
                          <sbb-seat-reservation-graphic
                            name="COACH_BORDER_MIDDLE"
                            role="presentation"
                            style="--sbb-seat-reservation-graphic-width:880;--sbb-seat-reservation-graphic-height:172;--sbb-seat-reservation-graphic-top:-6;--sbb-seat-reservation-graphic-left:16;--sbb-seat-reservation-graphic-position:absolute;"
                            stretch=""
                          ></sbb-seat-reservation-graphic>

                          <sbb-seat-reservation-area
                            background="dark"
                            aria-hidden="true"
                            id="popover-trigger-0-1-560--6"
                            class=" sbb-seat-reservation-area--cursor-pointer "
                            style="--sbb-seat-reservation-area-width:64;--sbb-seat-reservation-area-height:13;--sbb-seat-reservation-area-top:-4;--sbb-seat-reservation-area-left:560;"
                            mounting="upper-border"
                            aria-haspopup="dialog"
                            aria-controls="sbb-popover-1"
                            aria-expanded="false"
                          >
                            <sbb-seat-reservation-graphic
                              role="img"
                              aria-hidden="true"
                              class="auto-width"
                              style="--sbb-seat-reservation-graphic-max-width:64;--sbb-seat-reservation-graphic-height:16;--sbb-seat-reservation-graphic-rotation:90;"
                              name="ENTRY_EXIT"
                            ></sbb-seat-reservation-graphic>
                          </sbb-seat-reservation-area>

                          <sbb-popover
                            hover-trigger=""
                            trigger="popover-trigger-0-1-560--6"
                            popover="manual"
                            id="sbb-popover-1"
                          >
                            <p class="sbb-text-s sbb-sr-popover">Exit / entrance</p>
                          </sbb-popover>

                          <sbb-seat-reservation-area
                            background="dark"
                            aria-hidden="true"
                            id="popover-trigger-0-1-128--6"
                            class=" sbb-seat-reservation-area--cursor-pointer "
                            style="--sbb-seat-reservation-area-width:48;--sbb-seat-reservation-area-height:35;--sbb-seat-reservation-area-top:-4;--sbb-seat-reservation-area-left:128;"
                            mounting="upper-border"
                            aria-haspopup="dialog"
                            aria-controls="sbb-popover-2"
                            aria-expanded="false"
                          >
                            <sbb-seat-reservation-graphic
                              role="img"
                              aria-hidden="true"
                              class="auto-width"
                              style="--sbb-seat-reservation-graphic-max-width:48;--sbb-seat-reservation-graphic-height:16;--sbb-seat-reservation-graphic-rotation:0;"
                              name="LUGGAGE_AREA"
                            ></sbb-seat-reservation-graphic>
                          </sbb-seat-reservation-area>

                          <sbb-popover
                            hover-trigger=""
                            trigger="popover-trigger-0-1-128--6"
                            popover="manual"
                            id="sbb-popover-2"
                          >
                            <p class="sbb-text-s sbb-sr-popover">Luggage zone</p>
                          </sbb-popover>

                          <table
                            class="sbb-sr-coach-wrapper__table"
                            id="sbb-sr-coach-1"
                            aria-describedby="sbb-sr-coach-caption-1"
                            tabindex="0"
                          >
                            <caption tabindex="-1" id="sbb-sr-coach-caption-1">
                              <sbb-screen-reader-only
                                >Coach 10 selected. 0 seats available. 0 available bicycle spaces..
                                . Available services: Wheelchair zone, Luggage zone, Toilet
                                area.</sbb-screen-reader-only
                              >
                            </caption>

                            <tr id="row-1-0" data-row-index="0">
                              <td class="graphical-element" id="cell-0-1-0-0">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:176;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-25"
                                  text="25"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-1">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:256;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-26"
                                  text="26"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-2">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:304;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-35"
                                  text="35"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-3">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:384;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-36"
                                  text="36"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-4">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:416;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-45"
                                  text="45"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-5">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:496;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-46"
                                  text="46"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-6">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:656;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-55"
                                  text="55"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-7">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:720;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-56"
                                  text="56"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-8">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:768;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-66"
                                  text="66"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-0-9">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:0;--sbb-seat-reservation-place-control-left:864;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-76"
                                  text="76"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>
                            </tr>

                            <tr id="row-1-1" data-row-index="1">
                              <td class="graphical-element" id="cell-0-1-1-0">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:16;--sbb-seat-reservation-place-control-left:800;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-75"
                                  text="75"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>
                            </tr>

                            <tr id="row-1-2" data-row-index="2">
                              <td class="graphical-element" id="cell-0-1-2-0">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:32;--sbb-seat-reservation-place-control-left:176;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-23"
                                  text="23"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-2-1">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:32;--sbb-seat-reservation-place-control-left:256;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-24"
                                  text="24"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-2-2">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:32;--sbb-seat-reservation-place-control-left:304;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-33"
                                  text="33"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-2-3">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:32;--sbb-seat-reservation-place-control-left:384;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-34"
                                  text="34"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-2-4">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:32;--sbb-seat-reservation-place-control-left:416;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-43"
                                  text="43"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-2-5">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:32;--sbb-seat-reservation-place-control-left:496;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-44"
                                  text="44"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-2-6">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:32;--sbb-seat-reservation-place-control-left:656;--sbb-seat-reservation-place-control-rotation:0;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-53"
                                  text="53"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>

                              <td class="graphical-element" id="cell-0-1-2-7">
                                <sbb-seat-reservation-place-control
                                  exportparts="sbb-sr-place-part"
                                  class="seat-reservation-place-control"
                                  style="--sbb-seat-reservation-place-control-text-scale-value:32;--sbb-seat-reservation-place-control-width:32;--sbb-seat-reservation-place-control-height:32;--sbb-seat-reservation-place-control-top:32;--sbb-seat-reservation-place-control-left:720;--sbb-seat-reservation-place-control-rotation:180;--sbb-seat-reservation-place-control-text-rotation:0;"
                                  id="seat-reservation__place-button-0-1-54"
                                  text="54"
                                  type="SEAT"
                                  state="ALLOCATED"
                                  travel-direction="NONE"
                                  coach-index="1"
                                  deck-index="0"
                                  data-deck-index="0"
                                  tabindex="-1"
                                ></sbb-seat-reservation-place-control>
                              </td>
                            </tr>
                          </table>
                        </sbb-seat-reservation-scoped>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </sbb-seat-reservation>`,

      {
        modules: ['./seat-reservation.component.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSeatReservationElement);
  });
});
