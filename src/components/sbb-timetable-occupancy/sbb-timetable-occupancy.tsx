import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { Occupancy } from '../../global/timetable';
import { i18nClass, i18nOccupancy } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-occupancy.scss',
  tag: 'sbb-timetable-occupancy',
})
export class SbbTimetableOccupancy {
  /** Occupancy object. */
  @Prop() public occupancy: Occupancy;

  /** Negative coloring variant flag. */
  @Prop({ reflect: true }) public negative = false;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  public render(): JSX.Element {
    const firstClassOccupancy: string = this.occupancy?.firstClass
      ? this.occupancy.firstClass.toLowerCase()
      : null;
    const secondClassOccupancy: string = this.occupancy?.secondClass
      ? this.occupancy.secondClass.toLowerCase()
      : null;

    return (
      (firstClassOccupancy || secondClassOccupancy) && (
        <ul class="sbb-timetable-occupancy" role="list">
          {[firstClassOccupancy, secondClassOccupancy].map((occupancy: string, index: number) => {
            const iconName = occupancy === 'unknown' ? 'none' : occupancy;
            const occupancyClass = index === 0 ? 'first' : 'second';
            return (
              occupancy && (
                <li>
                  <span aria-hidden="true">{index + 1}.</span>
                  <sbb-icon
                    class="sbb-timetable-occupancy__item"
                    name={`utilization-${iconName}`}
                  />
                  <sbb-icon
                    class="sbb-timetable-occupancy__item--negative"
                    name={`utilization-${iconName}-negative`}
                  />
                  <sbb-icon
                    class="sbb-timetable-occupancy__item--high-contrast"
                    name={`utilization-${iconName}-high-contrast`}
                  />
                  <span class="sbb-timetable-occupancy--visually-hidden">
                    {i18nOccupancy[occupancy] &&
                      `${i18nClass[occupancyClass][this._currentLanguage]} ${
                        i18nOccupancy[occupancy][this._currentLanguage]
                      }.`}
                  </span>
                </li>
              )
            );
          })}
        </ul>
      )
    );
  }
}
