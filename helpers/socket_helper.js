import io from 'socket.io-client';
import config from '../config/index';

const SocketHelper = {
	connect() {
		return io.connect(config.socket.host, {
			path: config.socket.path
		});
	}
};

export default SocketHelper;