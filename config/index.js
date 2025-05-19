import development from './environment/development';
import testing from './environment/testing';
import testing2 from './environment/testing2';
import production from './environment/production';
import uat from './environment/uat';

const configs = {
	development,
	testing,
	testing2,
	production,
	uat
};

export default configs[process.env.NODE_ENV] || configs.development;
