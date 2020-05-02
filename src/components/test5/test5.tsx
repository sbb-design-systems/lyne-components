import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'test5.css',
  tag: 'lyne-test5'
})
export class Test5 {

  /** Just a sample text */
  @Prop() public text = 'Sample text';

  public render(): JSX.Element {
    return (
      <p>{this.text}</p>
    );
  }

}
