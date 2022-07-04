import { SbbPanel } from './sbb-panel';
import { newSpecPage } from '@stencil/core/testing';

beforeAll(() => {
  const mutationObserverMock = jest
    .fn<MutationObserver, [MutationCallback]>()
    .mockImplementation(() => {
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        takeRecords: jest.fn(),
      };
    });
  global.MutationObserver = mutationObserverMock;
});

describe('sbb-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbPanel],
      html: '<sbb-panel />',
    });

    expect(root).toEqualHtml(`
        <sbb-panel>
          <mock:shadow-root>
            <div class="panel">
              <div class="panel__text">
                <slot name="text"></slot>
              </div>
              <div class="panel__link">
                <slot name="link"></slot>
              </div>
          </mock:shadow-root>
        </sbb-panel>
      `);
  });
});
