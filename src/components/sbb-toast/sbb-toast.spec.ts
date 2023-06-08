import { SbbToast } from './sbb-toast';
import { newSpecPage } from '@stencil/core/testing';

// TODO
describe('sbb-toast', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToast],
      html: '<div />',
    });

    expect(root).toEqualHtml(`
        <div>
        </div>
      `);
  });
});
