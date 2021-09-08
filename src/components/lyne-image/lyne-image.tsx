import {
  Component,
  h,
  Prop
} from '@stencil/core';

import { InterfaceImageAttributes } from './lyne-image.custom.d';

@Component({
  shadow: true,
  styleUrl: 'lyne-image.scss',
  tag: 'lyne-image'
})

export class LyneImage {

  @Prop() public alt?: string;

  @Prop() public aspectRatio: InterfaceImageAttributes['aspectRatio'] = '16/9';

  @Prop() public caption?: string;

  @Prop() public hideFromScreenreader: InterfaceImageAttributes['hideFromScreenreader'] = false;

  @Prop() public imageFormat: InterfaceImageAttributes['imageFormat'] = 'auto';

  @Prop() public imageSrc!: string;

  @Prop() public loading: InterfaceImageAttributes['loading'] = 'eager';

  @Prop() public performanceMark?: string;

  @Prop() public width?: '100%';

  public render(): JSX.Element {

    const attributes: InterfaceImageAttributes = {};

    const aspectRatio = this.aspectRatio.replace(/\//, 'x')
    const imageClass = `lyne-image__img lyne-image__img--${aspectRatio}`;

    if (this.hideFromScreenreader) {
      attributes.ariaHidden = 'true';
      attributes.role = 'presentation';
    }

    if (this.loading === 'lazy') {
      attributes.decoding = 'async';
    }

    const imageUrl = `${this.imageSrc}?auto=compress,enhance&w=${this.width}&fm=${this.imageFormat}`

    return <figure class="lyne-image__figure">
      <img
      alt={this.alt}
      class={imageClass}
      src={imageUrl}
      width={this.width}
      loading={this.loading}
      {...attributes}
      />
    </figure>;
  }

}
