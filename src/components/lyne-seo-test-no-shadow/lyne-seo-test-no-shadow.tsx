import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: 'lyne-seo-test-no-shadow.scss',
  tag: 'lyne-seo-test-no-shadow'
})

export class LyneSeoTestNoShadow {

  /** Title for the Test */
  @Prop() public heading = 'Default heading';

  /** Text for the Test */
  @Prop() public text = 'Default text';

  public render(): JSX.Element {

    return <div>
      <h1>{this.heading}</h1>
      <p>{this.text}</p>
    </div>;
  }
}
