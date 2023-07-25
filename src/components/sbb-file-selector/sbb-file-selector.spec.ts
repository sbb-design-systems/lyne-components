import { SbbFileSelector } from './sbb-file-selector';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-file-selector', () => {
  it('renders default', async () => {
    const { root } = await newSpecPage({
      components: [SbbFileSelector],
      html: '<sbb-file-selector />',
    });

    expect(root).toEqualHtml(`
      <sbb-file-selector>
        <mock:shadow-root>
          <div class="sbb-file-selector">
            <div class="sbb-file-selector__input-container">
              <sbb-button icon-name="folder-open-small" size="m" variant="secondary">
                Choose a file
              </sbb-button>
              <label hidden="" htmlfor="sbb-file-selector__hidden-input">
                Choose a file
                <input id="sbb-file-selector__hidden-input" type="file">
              </label>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-file-selector>
    `);
  });

  it('renders with dropzone area', async () => {
    const { root } = await newSpecPage({
      components: [SbbFileSelector],
      html: '<sbb-file-selector variant="dropzone"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-file-selector variant="dropzone">
        <mock:shadow-root>
          <div class="sbb-file-selector">
            <div class="sbb-file-selector__input-container">
              <div class="sbb-file-selector__dropzone-area">
                <div class="sbb-file-selector__dropzone-area--icon">
                  <sbb-icon name="folder-open-medium"></sbb-icon>
                </div>
                <div class="sbb-file-selector__dropzone-area--title"></div>
                <div class="sbb-file-selector__dropzone-area--subtitle">
                  Drag &amp; Drop your files here
                </div>
                <div class="sbb-file-selector__dropzone-area--button">
                  <sbb-button size="m" variant="secondary">
                    Choose a file
                  </sbb-button>
                </div>
              </div>
              <label hidden="" htmlfor="sbb-file-selector__hidden-input">
                Choose a file
                <input id="sbb-file-selector__hidden-input" type="file">
              </label>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-file-selector>
    `);
  });
});
