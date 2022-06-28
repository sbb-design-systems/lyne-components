import { __nameUpperCase__ } from './__name__';
import { newSpecPage } from '@stencil/core/testing';

describe('__name__', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [__nameUpperCase__],
      html: '<__name__ />',
    });

    expect(root).toEqualHtml(`
        <__name__>
          <mock:shadow-root>
            <button class="some-class"></button>
          </mock:shadow-root>
        </__name__>
      `);
  });
});
