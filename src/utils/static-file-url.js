import { startsWith } from 'lodash/fp';
import { getConfig } from '../config';

export default url => (startsWith('http')(url) || startsWith('//')(url)
  ? url : `http://${getConfig('DNS_DOMAIN')}/${url}`);

