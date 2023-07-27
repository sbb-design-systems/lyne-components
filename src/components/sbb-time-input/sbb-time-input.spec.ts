import { SbbTimeInput } from './sbb-time-input';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-time-input', () => {
  it('renders', async () => {
    const { doc } = await newSpecPage({
      components: [SbbTimeInput],
      html: '<span><sbb-time-input input="id-1"></sbb-time-input><input id="id-1" /></span>',
    });

    expect(doc.querySelector('span')).toEqualHtml(`
      <span>
        <sbb-time-input input="id-1">
          <mock:shadow-root></mock:shadow-root>
        </sbb-time-input>
        <input id="id-1" placeholder="HH:MM" type="text" maxlength="5" value="null">
      </span>
    `);
  });
});
