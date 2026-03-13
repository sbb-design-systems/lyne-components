import { assert, aTimeout, expect } from '@open-wc/testing';
import type { SbbSecondaryButtonElement } from '@sbb-esta/lyne-elements/button/secondary-button/secondary-button.component.js';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { EventSpy, waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { SbbPopoverElement } from '@sbb-esta/lyne-elements/popover/popover.component.js';
import { html } from 'lit/static-html.js';

import { mapRawDataToSeatReservation } from '../common/mapper/mapper.ts';
import type {
  CoachNumberOfFreePlaces,
  Place,
  PlaceSelection,
  SeatReservation,
} from '../common/types.ts';
import type { SbbSeatReservationAreaElement } from '../seat-reservation-area/seat-reservation-area.component.ts';
import type { SbbSeatReservationNavigationCoachElement } from '../seat-reservation-navigation-coach/seat-reservation-navigation-coach.component.ts';
import { SbbSeatReservationPlaceControlElement } from '../seat-reservation-place-control/seat-reservation-place-control.component.ts';

import { SeatReservationBaseElement } from './seat-reservation-base-element.ts';
import { SbbSeatReservationElement } from './seat-reservation.component.ts';

import '../../seat-reservation.ts';

class SeatReservationSpec extends SeatReservationBaseElement {
  public override currSelectedPlaceElementId: string | null = '';
  public override currSelectedCoachIndex: number = -1;
  public override seatReservationWithoutNavigationHasFocus: boolean = false;

  public override onFocusTableCoachAndPreselectPlace(focusCoachIndex: number): void {
    super.onFocusTableCoachAndPreselectPlace(focusCoachIndex);
  }

  public override getAvailableFreePlacesNumFromCoach(
    places: Place[] | undefined,
  ): CoachNumberOfFreePlaces {
    return super.getAvailableFreePlacesNumFromCoach(places);
  }
}

window.customElements.define('seat-reservation-spec', SeatReservationSpec);

/**
 * Helper function to get the number of service icons in a coach.
 * @param coach
 */
const getServiceIconCount = (coach: HTMLElement): number => {
  return (
    coach.shadowRoot
      ?.querySelector('sbb-seat-reservation-navigation-services')
      ?.shadowRoot?.querySelectorAll('sbb-seat-reservation-graphic').length ?? 0
  );
};

/**
 * Helper function to check that the travel direction wrapper is not rendered.
 * @param element
 */
const hasNoTravelDirectionWrapper = (element: SbbSeatReservationElement): HTMLDivElement | null => {
  return element.shadowRoot!.querySelector<HTMLDivElement>('.sbb-sr-travel-direction-wrapper');
};

/**
 * Helper function to check that the correct arrow icon is rendered according to the given travel direction.
 * @param iconName
 * @param element
 */
const checkArrowDirection = (
  iconName: string,
  element: SbbSeatReservationElement,
): HTMLElement | null => {
  return element.shadowRoot!.querySelector<HTMLElement>('sbb-icon[name="' + iconName + '"]');
};

let element: SbbSeatReservationElement;
const dataFull: SeatReservation[] = [mapRawDataToSeatReservation('TRAIN')];

describe(`sbb-seat-reservation`, () => {
  describe('Core checks', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation
          .seatReservations=${dataFull}
          max-seat-reservations="4"
          has-navigation
          align-vertical
          base-grid-size="16"
        ></sbb-seat-reservation>`,
      );
      await waitForLitRender(element);
    });
    it('renders', async () => {
      assert.instanceOf(element, SbbSeatReservationElement);
    });

    it('should correctly set seatReservations from dataFull', async () => {
      assert.deepEqual(element.seatReservations, dataFull);
    });

    it('should have TRAIN as vehicleType in seatReservations', async () => {
      assert.equal(element.seatReservations[0].vehicleType, 'TRAIN');
    });

    it('should not have BUS as vehicleType in seatReservations', async () => {
      await expect(element.seatReservations[0].vehicleType).to.not.equal('BUS');
    });

    it('should have coachItems array in seatReservations', async () => {
      assert.isArray(element.seatReservations[0].coachItems);
      assert.isAbove(element.seatReservations[0].coachItems.length, 0);
    });

    it('should have hoverable seat areas which opens a popover element', async () => {
      const areaElement: SbbSeatReservationAreaElement | null =
        element.shadowRoot!.querySelector<SbbSeatReservationAreaElement>(
          'sbb-seat-reservation-area',
        );

      //aria-expanded to check if it is closed
      expect(areaElement).to.have.attribute('aria-expanded', 'false');

      const popover = element.shadowRoot!.querySelector<SbbPopoverElement>(
        'sbb-popover[trigger="' + areaElement?.id + '"]',
      );

      // assert that popover is found corresponding to the area element
      assert.instanceOf(popover, SbbPopoverElement);

      const openSpy = new EventSpy(SbbPopoverElement.events.open, popover);
      popover?.open();

      await expect(openSpy.count).to.be.equal(1);
      //aria-expanded to check if it is open
      expect(areaElement).to.have.attribute('aria-expanded', 'true');
    });
  });

  describe('navigation checks', () => {
    const maxCoachesInTrain = dataFull[0].coachItems.length - 1;
    const TIMEOUT_NAVIGATION: number = 1200;

    let btn: SbbSecondaryButtonElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation
          .seatReservations=${dataFull}
          max-seat-reservations="4"
          has-navigation
          align-vertical
          base-grid-size="16"
        ></sbb-seat-reservation>`,
      );

      btn = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
        '#sbb-sr-navigation__wrapper-button-direction--left',
      ) as SbbSecondaryButtonElement;

      element.preselectCoachIndex = 0;
      await waitForLitRender(element);
    });

    it('should render the navigation-wrapper because hasNavigation is true', async () => {
      const navigationWrapper = element.shadowRoot!.querySelector<HTMLDivElement>(
        '.sbb-sr-navigation-wrapper',
      );

      expect(navigationWrapper).not.to.be.null;
    });

    it('should not render the navigation-wrapper because hasNavigation is false', async () => {
      element.hasNavigation = false;
      await waitForLitRender(element);

      const navigationWrapper = element.shadowRoot!.querySelector<HTMLDivElement>(
        '.sbb-sr-navigation-wrapper',
      );

      expect(navigationWrapper).to.be.null;
    });

    it('should have a first navigation btn with disabled-interactive attr; no selectable coach in front', async () => {
      expect(btn).not.to.be.null;
      expect(btn?.hasAttribute('disabled-interactive'));
      expect(btn?.hasAttribute('disabled'));
    });

    it('should have no clickable first navigation btn; no selectable coach in front', async () => {
      const clickSpy = new EventSpy('click');
      btn.click();
      await expect(clickSpy.count).to.be.equal(0);
    });

    it('should stop propagating click if first navigation btn is not clickable', async () => {
      const clickSpy = new EventSpy('click');
      btn.click();
      btn.dispatchEvent(new PointerEvent('click'));
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should not have more than 3 navigation service icons even if the backend delivered more', async () => {
      const navCoaches = element.shadowRoot?.querySelectorAll<HTMLElement>(
        'sbb-seat-reservation-navigation-coach',
      );

      navCoaches?.forEach((coach) => {
        expect(getServiceIconCount(coach)).to.be.at.most(3);
      });
    });

    it('should NOT have a first navigation btn with disabled-interactive attr; selectable coaches are in front', async () => {
      element.preselectCoachIndex = 1;
      await waitForLitRender(element);
      await aTimeout(TIMEOUT_NAVIGATION);

      expect(btn).not.to.be.null;
      expect(btn.getAttribute('disabled-interactive')).to.be.null;
      expect(btn.getAttribute('disabled')).to.be.null;
    });

    it('should have a clickable last navigation btn even if there are no selectable coaches behind because last coach is selected', async () => {
      btn = element.shadowRoot!.querySelector<SbbSecondaryButtonElement>(
        '#sbb-sr-navigation__wrapper-button-direction--right',
      ) as SbbSecondaryButtonElement;

      element.preselectCoachIndex = maxCoachesInTrain - 1; // preselect second last coach because last one is a driver area
      await waitForLitRender(element);
      await aTimeout(TIMEOUT_NAVIGATION); // wait until navigation is re-rendered (takes a lot of time :/)

      const clickSpy = new EventSpy('click');
      btn.click();
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should select the corresponding coach using preselected coach index', async () => {
      element.preselectCoachIndex = maxCoachesInTrain - 1; // preselect second last coach because last one is a driver area
      await waitForLitRender(element);

      const selectedScreenreaderElement: HTMLElement | null =
        element.shadowRoot!.querySelector<HTMLElement>(
          `#sbb-sr-coach-caption-${element.preselectCoachIndex} sbb-screen-reader-only`,
        );

      expect(selectedScreenreaderElement?.textContent).to.include(' selected.');
    });

    it('should select the correct NavButton if a place is selected which is not in the currently focused coach', async () => {
      await aTimeout(TIMEOUT_NAVIGATION); // wait until navigation is re-rendered (takes a lot of time :/)

      const navigationFirstCoachElemeent: SbbSeatReservationNavigationCoachElement | null =
        element.shadowRoot!.querySelector('sbb-seat-reservation-navigation-coach[index="0"]');

      const navigationSecondCoachElement: SbbSeatReservationNavigationCoachElement | null =
        element.shadowRoot!.querySelector('sbb-seat-reservation-navigation-coach[index="1"]');

      expect(navigationFirstCoachElemeent).not.to.be.null;
      expect(navigationSecondCoachElement).not.to.be.null;

      const navButtonFirstCoach: HTMLDivElement | null =
        navigationFirstCoachElemeent!.shadowRoot!.querySelector<HTMLDivElement>(
          '.sbb-sr-navigation__item-coach',
        );

      const navButtonSecondCoach: HTMLDivElement | null =
        navigationSecondCoachElement!.shadowRoot!.querySelector<HTMLDivElement>(
          '.sbb-sr-navigation__item-coach',
        );

      //expect first nav button to be selected
      expect(navButtonFirstCoach).not.to.be.null;
      expect(navButtonSecondCoach).not.to.be.null;

      // Initially, first coach should be selected (index=0 preselected)
      expect(navButtonFirstCoach).to.have.class('sbb-sr-navigation__item-coach--selected');
      expect(navButtonSecondCoach).to.not.have.class('sbb-sr-navigation__item-coach--selected');

      //now select a place in the second coach
      const placeControlSecondCoach: SbbSeatReservationPlaceControlElement =
        element.shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '#seat-reservation__place-button-0-1-16',
        ) as SbbSeatReservationPlaceControlElement;

      // Select the place in the second coach
      const selectPlaceSpy = new EventSpy<CustomEvent<PlaceSelection>>('selectplace', element);
      placeControlSecondCoach!.click();
      await waitForLitRender(element);
      await aTimeout(TIMEOUT_NAVIGATION); // wait for navigation to update

      // Verify the selectplace event was emitted
      await expect(selectPlaceSpy.count).to.equal(1);
      await expect(selectPlaceSpy.events[0].detail.coachIndex).to.equal(1);

      // Now the second coach should be selected in navigation
      expect(navButtonFirstCoach).to.not.have.class('sbb-sr-navigation__item-coach--selected');
      expect(navButtonSecondCoach).to.have.class('sbb-sr-navigation__item-coach--selected');
    });
  });

  describe('alignment checks', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation
          .seatReservations=${dataFull}
          max-seat-reservations="4"
          has-navigation
          align-vertical
          base-grid-size="16"
        ></sbb-seat-reservation>`,
      );
    });

    it('should have vertical alignment because alignVertical is true', async () => {
      element.alignVertical = true;
      await waitForLitRender(element);
      expect(element.hasAttribute('align-vertical')).to.be.true;
    });

    it('should have no vertical alignment because alignVertical is false', async () => {
      element.alignVertical = false;
      await waitForLitRender(element);
      expect(element.hasAttribute('align-vertical')).to.be.false;
    });
  });

  describe('place control checks', () => {
    beforeEach(async () => {
      element = await fixture(
        html` <sbb-seat-reservation
          .seatReservations=${dataFull}
          max-seat-reservations="1"
          max-bicycle-reservations="1"
          has-navigation
          base-grid-size="16"
        ></sbb-seat-reservation>`,
      );

      await waitForLitRender(element);
    });

    it('should have only one selected seat-reservation at once', async () => {
      const clickSpy = new EventSpy('click');
      const placeControls: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control',
        );

      expect(placeControls.length).to.be.greaterThan(0);

      placeControls[0].click();
      await waitForLitRender(element);
      expect(
        placeControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).to.be.null;
      expect(
        placeControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).not.to.be.null;

      placeControls[1].click();
      await waitForLitRender(element);
      expect(
        placeControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).not.to.be.null;
      expect(
        placeControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).to.be.null;

      expect(
        placeControls[1].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).to.be.null;
      expect(
        placeControls[1].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).not.to.be.null;

      // clicks are allowed in spite of max-seat-reservations restriction on all elements
      await expect(clickSpy.count).to.be.equal(2);
    });

    it('should have only one selected bicycle seat-reservation at once', async () => {
      const clickSpy = new EventSpy('click');

      const bicyclePlaceControls: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control[TYPE="BICYCLE"]',
        );

      bicyclePlaceControls[0].click();
      await waitForLitRender(element);
      expect(
        bicyclePlaceControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).to.be.null;
      expect(
        bicyclePlaceControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).not.to.be.null;

      bicyclePlaceControls[1].click();
      await waitForLitRender(element);
      expect(
        bicyclePlaceControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).not.to.be.null;
      expect(
        bicyclePlaceControls[0].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).to.be.null;

      expect(
        bicyclePlaceControls[1].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-free',
        ),
      ).to.be.null;
      expect(
        bicyclePlaceControls[1].shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
          '.sbb-sr-place-ctrl--state-selected',
        ),
      ).not.to.be.null;

      // clicks are allowed in spite of max-seat-reservations restriction on all elements
      await expect(clickSpy.count).to.be.equal(2);
    });

    it('should not allow selectplace on restricted or allocated seats', async () => {
      const selectPlaceEvent = new EventSpy(
        SbbSeatReservationPlaceControlElement.events.selectplace,
        null,
        {
          capture: true,
        },
      );

      const placeControls: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control',
        );

      const restrictedPlaceControls: SbbSeatReservationPlaceControlElement[] = Array.from(
        placeControls,
      ).filter(
        (placeControl: SbbSeatReservationPlaceControlElement) =>
          placeControl.shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
            '.sbb-sr-place-ctrl--state-restricted',
          ) !== null,
      );

      const allocatedPlaceControl: SbbSeatReservationPlaceControlElement[] = Array.from(
        placeControls,
      ).filter(
        (placeControl: SbbSeatReservationPlaceControlElement) =>
          placeControl.shadowRoot?.querySelector<SbbSeatReservationPlaceControlElement>(
            '.sbb-sr-place-ctrl--state-allocated',
          ) !== null,
      );

      //neither restricted nor allocated seats should forward the click to the selectplace event
      restrictedPlaceControls.forEach((placeControl: SbbSeatReservationPlaceControlElement) => {
        placeControl.click();
      });
      allocatedPlaceControl.forEach((placeControl: SbbSeatReservationPlaceControlElement) => {
        placeControl.click();
      });

      await expect(selectPlaceEvent.count).to.be.equal(0);
    });

    it('should not allow selectplace on any seat', async () => {
      element.preventPlaceClick = true;
      await waitForLitRender(element);

      const selectPlaceEvent = new EventSpy(
        SbbSeatReservationPlaceControlElement.events.selectplace,
        null,
        {
          capture: true,
        },
      );

      const allPlaces: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control',
        );

      //no seat should forward the click to the selectplace event
      allPlaces.forEach((placeControl: SbbSeatReservationPlaceControlElement) => {
        placeControl.click();
      });

      await expect(selectPlaceEvent.count).to.be.equal(0);
    });

    it('should have a title in the seat-reservation-place-control element if showTitleInfo = true', async () => {
      element.showTitleInfo = true;
      await waitForLitRender(element);

      const placeControl = element.shadowRoot?.querySelector(
        '#seat-reservation__place-button-0-0-45',
      ) as HTMLElement;

      expect(placeControl).not.to.be.null;
      expect(placeControl).attribute('title').not.to.be.empty;
      expect(placeControl).attribute('title').to.contain('Seat 45 is available');
    });

    it('should not have a title in the seat-reservation-place-control element if showTitleInfo = false per default', async () => {
      const placeControl = element.shadowRoot?.querySelector(
        '#seat-reservation__place-button-0-0-45',
      ) as HTMLElement;

      expect(placeControl).not.to.be.null;
      expect(placeControl).to.not.have.attribute('title');
    });

    // this test is maybe not necessary because it's a duplicate
    // @see also seat-reservation-place-control.spec.ts test "'should emit full placeSelection detail on click'"
    it('emit details of selected place ', async () => {
      const selectSpy = new EventSpy<CustomEvent<PlaceSelection>>('selectplace', element);
      const placeControls: NodeListOf<SbbSeatReservationPlaceControlElement> =
        element.shadowRoot!.querySelectorAll<SbbSeatReservationPlaceControlElement>(
          'sbb-seat-reservation-place-control',
        );
      await waitForLitRender(element);
      placeControls[0].click();

      const evt = selectSpy.events[0];
      await expect(evt.detail.id).to.equal(placeControls[0].getAttribute('id'));
      await expect(evt.detail.deckIndex).to.equal(+!placeControls[0].getAttribute('deck-index'));
      await expect(evt.detail.coachIndex).to.equal(+!placeControls[0].getAttribute('coach-index'));
      await expect(evt.detail.number).to.equal(placeControls[0].getAttribute('text'));
      await expect(evt.detail.placeType).to.equal(placeControls[0].getAttribute('type'));
      await expect(evt.detail.state).to.equal(placeControls[0].getAttribute('state'));

      await expect(selectSpy.count).to.equal(1);
    });
  });

  describe('travel direction checks', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation .seatReservations=${dataFull}></sbb-seat-reservation>`,
      );
      //await waitForLitRender(element);
    });

    it('should not be shown per default', async () => {
      expect(hasNoTravelDirectionWrapper(element)).to.be.null;
    });

    it('should not be shown, when UNDEFINED is given', async () => {
      element.travelDirection = 'NONE';
      expect(hasNoTravelDirectionWrapper(element)).to.be.null;
    });

    it('should be shown and have arrow icon showing left, when LEFT is given in horizontal mode', async () => {
      element.travelDirection = 'LEFT';
      await waitForLitRender(element);
      expect(checkArrowDirection('arrow-left-small', element)).not.to.be.null;
    });

    it('should be shown and have arrow icon showing right, when RIGHT is given in horizontal mode', async () => {
      element.travelDirection = 'RIGHT';
      await waitForLitRender(element);
      expect(checkArrowDirection('arrow-right-small', element)).not.to.be.null;
    });

    it('should be shown and have arrow icon showing up, when LEFT is given in vertical mode', async () => {
      element.travelDirection = 'LEFT';
      element.alignVertical = true;
      await waitForLitRender(element);
      expect(checkArrowDirection('arrow-up-small', element)).not.to.be.null;
    });

    it('should be shown and have arrow icon showing down, when RIGHT is given in vertical mode', async () => {
      element.travelDirection = 'RIGHT';
      element.alignVertical = true;
      await waitForLitRender(element);
      expect(checkArrowDirection('arrow-down-small', element)).not.to.be.null;
    });
  });

  describe('data errors', () => {
    beforeEach(async () => {
      element = await fixture(html` <sbb-seat-reservation></sbb-seat-reservation>`);
    });

    it('should work without throwing errors if no data is available', async () => {
      const itemCoachContainer =
        element.shadowRoot!.querySelector<HTMLLIElement>('.sbb-sr__item-coach');

      assert.instanceOf(element, SbbSeatReservationElement);
      expect(itemCoachContainer).to.be.null;
      expect(() => element.focus()).to.not.throw();
    });
  });

  describe('raw unit testing', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-seat-reservation .seatReservations=${dataFull}></sbb-seat-reservation>`,
      );
      await waitForLitRender(element);
    });

    it('should call methods in BaseElement Class with fake class', async () => {
      const root = new SeatReservationSpec();
      root.hasNavigation = false;
      root.seatReservationWithoutNavigationHasFocus = false;

      //call void method and check if it changes the currSelectedCoachIndex as expected
      root.onFocusTableCoachAndPreselectPlace(1);
      await expect(root.currSelectedCoachIndex).to.equal(0);

      // call method with return value and check if it returns the expected number of free places for the given coach
      const freePlacesNum = root.getAvailableFreePlacesNumFromCoach(
        element.seatReservations[0].coachItems[1].places,
      );
      expect(freePlacesNum).not.to.be.null;
      await expect(freePlacesNum.seats).to.equal(53);
      await expect(freePlacesNum.bicycles).to.equal(4);
    });
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'seat-reservation-spec': SeatReservationSpec;
  }
}
