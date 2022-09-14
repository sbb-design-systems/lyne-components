import { SbbAlertGroup } from './sbb-alert-group';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-alert-group', () => {
  it('should render', async () => {
    const { root } = await newSpecPage({
      components: [SbbAlertGroup],
      html: `
  <sbb-alert-group accessibility-title='Disruptions' accessibility-level='3'>
    <sbb-alert title-content='Interruption between Genève and Lausanne' href='https://www.sbb.ch'>
      The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
    </sbb-alert>
  </sbb-alert-group>
`,
    });

    expect(root).toEqualHtml(`
        <sbb-alert-group accessibility-title='Disruptions' accessibility-level='3' role='alert'>
          <mock:shadow-root>
            <div class="sbb-alert-group">
              <slot></slot>
            </div>
          </mock:shadow-root>
          <sbb-alert title-content='Interruption between Genève and Lausanne' href='https://www.sbb.ch'>
            The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          </sbb-alert>
        </sbb-alert-group>
      `);
  });

  it('should render with slots', async () => {
    const { root } = await newSpecPage({
      components: [SbbAlertGroup],
      html: `
  <sbb-alert-group accessibility-level='3'>
    <span slot='accessibility-title'>Interruptions</span>
    <sbb-alert title-content='Interruption between Genève and Lausanne' href='https://www.sbb.ch'>
      The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
    </sbb-alert>
  </sbb-alert-group>
`,
    });

    expect(root).toEqualHtml(`
        <sbb-alert-group accessibility-level='3' role='alert'>
          <mock:shadow-root>
            <div class="sbb-alert-group">
              <slot></slot>
            </div>
          </mock:shadow-root>
          <span slot="accessibility-title">
            Interruptions
          </span>
          <sbb-alert title-content='Interruption between Genève and Lausanne' href='https://www.sbb.ch'>
            The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          </sbb-alert>
        </sbb-alert-group>
      `);
  });
});
