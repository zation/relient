import { startsWith } from 'lodash/fp';

export default (url: string): string => (startsWith('http')(url) || startsWith('/')(url) ? url : `http://${url}`);
