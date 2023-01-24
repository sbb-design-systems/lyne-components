import { SbbTimeInput } from './sbb-time-input';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-time-input', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimeInput],
      html: '<sbb-time-input />',
    });

    expect(root).toEqualHtml(`
      <sbb-time-input>
        <mock:shadow-root>
          <input placeholder="HH:MM" type="text">
        </mock:shadow-root>
      </sbb-time-input>
    `);
  });

  it('renders readonly', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimeInput],
      html: '<sbb-time-input readonly="true"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-time-input readonly="true">
        <mock:shadow-root>
          <input placeholder="HH:MM" type="text" readonly="">
        </mock:shadow-root>
      </sbb-time-input>
    `);
  });

  it('renders required with value', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimeInput],
      html: '<sbb-time-input required="true" value="1200"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-time-input required="true" value="1200">
        <mock:shadow-root>
          <input placeholder="HH:MM" type="text" required="" value="12:00">
        </mock:shadow-root>
      </sbb-time-input>
    `);
  });

  it('renders disabled with value and form', async () => {
    const { root } = await newSpecPage({
      components: [SbbTimeInput],
      html: '<sbb-time-input disabled="true" value="123" form="myForm"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-time-input disabled="" value="123" form="myForm">
        <mock:shadow-root>
          <input placeholder="HH:MM" type="text" disabled="" value="01:23" form="myForm">
        </mock:shadow-root>
      </sbb-time-input>
    `);
  });
});
