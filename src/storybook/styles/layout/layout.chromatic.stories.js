import config, * as stories from './layout.stories';
import { chromaticStoryConfig, combineStories } from '../../../global/helpers/chromatic';

export const chromaticStories = combineStories(config, stories);

export default chromaticStoryConfig(config);
