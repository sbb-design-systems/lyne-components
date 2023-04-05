import config, * as stories from './scrollbar.stories';
import { chromaticStoryConfig, combineStories } from '../../../global/helpers/chromatic';

export const chromaticStories = combineStories(config, stories);

export default chromaticStoryConfig(config);
