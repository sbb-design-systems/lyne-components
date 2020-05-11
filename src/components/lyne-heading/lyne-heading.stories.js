import { radios, text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Heading Text';
const textDefaultValue = 'Sample Heading';
const levelLabel = 'Heading Level';
const visualLevelLabel = 'Visual Heading Level';
const levelOptions = {
  'Level 1': '1',
  'Level 2': '2',
  'Level 3': '3'
};

export const level1 = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '1')}
  visual-level={radios(visualLevelLabel, levelOptions, '1')}
  text={text(textLabel, textDefaultValue)}
/>;

export const level2 = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '2')}
  visual-level={radios(visualLevelLabel, levelOptions, '2')}
  text={text(textLabel, textDefaultValue)}
/>;

export const level3 = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '3')}
  visual-level={radios(visualLevelLabel, levelOptions, '3')}
  text={text(textLabel, textDefaultValue)}
/>;

export const level3german = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '3')}
  visual-level={radios(visualLevelLabel, levelOptions, '3')}
  text={text(textLabel, 'Beispiel Titel')}
/>;

export const level3spanish = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '3')}
  visual-level={radios(visualLevelLabel, levelOptions, '3')}
  text={text(textLabel, 'Título de ejemplo')}
/>;

export const level3russian = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '3')}
  visual-level={radios(visualLevelLabel, levelOptions, '3')}
  text={text(textLabel, 'Пример заголовка')}
/>;

export const level3korean = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '3')}
  visual-level={radios(visualLevelLabel, levelOptions, '3')}
  text={text(textLabel, '제목 예')}
/>;

export const level3albanian = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '3')}
  visual-level={radios(visualLevelLabel, levelOptions, '3')}
  text={text(textLabel, 'Titulli i shembullit')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Heading',
  parameters: {
    chromatic: {
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      extractComponentDescription: () => {
        return readme;
      }
    }
  }
};
