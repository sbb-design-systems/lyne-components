import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'test4.css',
  tag: 'lyne-test4'
})
export class Test4 {

  /** Just a sample text */
  @Prop() public text = 'Sample text';

  public render(): JSX.Element {
    return (
      <p>{this.text}</p>
    );
  }

}
