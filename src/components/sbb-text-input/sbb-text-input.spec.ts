import { SbbTextInput } from './sbb-text-input';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-text-input', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTextInput],
      html: '<sbb-text-input icon="" input-autocomplete-section-name="none" input-autocomplete-value="off" input-id="input-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" input-name="textfield" input-max-length="" input-min-length="" input-pattern="" input-placeholder="Placeholder Text" label="Label" label-visible=""></sbb-text-input>',
    });

    expect(root).toEqualHtml(`
        <sbb-text-input
            icon=""
            input-autocomplete-section-name="none"
            input-autocomplete-value="off"
            input-id="input-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
            input-name="textfield"
            input-max-length=""
            input-min-length=""
            input-pattern=""
            input-placeholder="Placeholder Text"
            label="Label"
            label-visible=""
        >
          <mock:shadow-root>
            <div class="input-wrapper">
                <div class="input-wrapper__inner">
                    <input
                        autocapitalize="off"
                        class="input"
                        id="input-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                        name="textfield"
                        placeholder="Placeholder Text"
                        value=""
                    >
                    <label
                        aria-label="Label (optional)."
                        class="input-label"
                        htmlFor="input-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                    >
                        <span
                            aria-hidden="true"
                            class="input-label--text"
                        >
                            Label
                        </span>
                        <span
                            aria-hidden="true"
                            class="input-label--optional"
                        >
                            &nbsp;(optional)
                        </span>
                    </label>
                </div>
            </div>
          </mock:shadow-root>
        </sbb-text-input>
      `);
  });
});
