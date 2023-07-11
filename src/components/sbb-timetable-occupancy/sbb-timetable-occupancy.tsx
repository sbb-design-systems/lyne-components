import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import icons from '../../global/icons/timetable.json';
import { i18nClass, i18nOccupancy } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-occupancy.scss',
  tag: 'sbb-timetable-occupancy',
})
export class SbbTimetableOccupancy {
  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Prop() public config!: string;

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
    const { occupancyItems } = JSON.parse(this.config);

    return (
      <ul class="occupancy__list" role="list">
        {occupancyItems.map((occupancyItem) => {
          const occupancyText = i18nOccupancy[occupancyItem.occupancy][this._currentLanguage];

          const classText = occupancyItem.class === '1' ? 'first' : 'second';

          const a11yLabel = `${i18nClass[classText][this._currentLanguage]}. ${occupancyText}.`;

          return (
            <li class="occupancy__list-item">
              <span class="occupancy__class">
                <span aria-hidden="true" class="occupancy__class--visual">
                  {occupancyItem.class}.
                </span>
                <span class="occupancy__class--visually-hidden">{a11yLabel}</span>
              </span>
              <span
                aria-hidden="true"
                class="occupancy__icon"
                innerHTML={icons[occupancyItem.icon]}
                role="presentation"
              ></span>
            </li>
          );
        })}
      </ul>
    );
  }
}
