import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})

export class MyComponent {

  /** Sample property */
	@Prop() sampleProperty: string = 'I am a property';

  render() {
    return <div>Hello, Lyne! You look awesome: {this.sampleProperty}</div>;
  }
}
