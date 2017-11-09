import { startsWith } from 'lodash/fp';

const { S3_DOMAIN } = global.CONFIG;

export default url => (startsWith('http')(url) || startsWith('//')(url)
  ? url : `http://${S3_DOMAIN}/${url}`);

