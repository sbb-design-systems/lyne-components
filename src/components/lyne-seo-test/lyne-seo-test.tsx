import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-seo-test.scss',
  tag: 'lyne-seo-test'
})

export class LyneSeoTest {

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
