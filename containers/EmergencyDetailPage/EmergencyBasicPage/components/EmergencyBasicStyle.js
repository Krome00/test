import reactCSS from 'reactcss';

const EmergencyBasicStyle = {
	textStyles: reactCSS({
		'default': {
		  color: {
				width: '400px',
				height: '22px',
				borderRadius: '2px'
		  },
		  swatch: {
				background: '#fff',
				borderRadius: '1px',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				display: 'inline-block',
				cursor: 'pointer'
		  },
		  popover: {
				position: 'absolute',
				zIndex: '2'
		  },
		  cover: {
				position: 'fixed',
				top: '0px',
				right: '0px',
				bottom: '0px',
				left: '0px'
		  }
		}
	  }),
	backgroundStyles: reactCSS({
		'default': {
			color: {
				  width: '400px',
				  height: '22px',
				  borderRadius: '2px'
			},
			swatch: {
				  background: '#fff',
				  borderRadius: '1px',
				  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				  display: 'inline-block',
				  cursor: 'pointer'
			},
			popover: {
				  position: 'absolute',
				  zIndex: '2'
			},
			cover: {
				  position: 'fixed',
				  top: '0px',
				  right: '0px',
				  bottom: '0px',
				  left: '0px'
			}
		  }
	})
};

export default EmergencyBasicStyle;