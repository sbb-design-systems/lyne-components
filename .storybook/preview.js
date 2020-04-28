import { addParameters } from '@storybook/html';
import {defineCustomElements} from '../dist/esm/loader';

addParameters({ docs: { page: null } });
defineCustomElements();
