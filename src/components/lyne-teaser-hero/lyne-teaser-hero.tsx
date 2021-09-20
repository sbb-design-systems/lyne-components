import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-teaser-hero.scss',
  tag: 'lyne-teaser-hero'
})

export class LyneTeaserHero {

  public render(): JSX.Element {

    return (
      <div class='taser-hero'>
        <lyne-image
          class='teaser-hero__image'
          imageSrcExamples='https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg'
          customFocalPoint={true}
          hideFromScreenreader={true}
          imageSrc=''
          loading='eager'
          lqip
          performanceMark=''
        ></lyne-image>

        <lyne-panel
          class='teaser-hero__panel'
          buttonText='Sample button text'
          text='Sample panel text'
        ></lyne-panel>
      </div>
    );
  }
}
