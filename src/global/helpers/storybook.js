import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';

export function chromaticOutlineDecorator() {
  return (Story) => (
    <div style="padding: 1px">
      <div style={{ display: 'inline-block', outline: isChromatic() ? '1px solid blue' : 'none' }}>
        <Story />
      </div>
    </div>
  );
}
