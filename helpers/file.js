const _ = require('lodash');

const fileHelper = {
	fileToDataUrl: file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	},
	dataUrlToBlob: dataUrl => {
		/*
		 * base from: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata#answer-5100158
		 */
		var byteString;
		if (dataUrl.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataUrl.split(',')[1]);
		else byteString = unescape(dataUrl.split(',')[1]);

		// separate out the mime component
		var mimeString = dataUrl
			.split(',')[0]
			.split(':')[1]
			.split(';')[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], { type: mimeString });
	},
	getExtension: function(fileName) {
		if (!fileName || !_.isString(fileName)) {
			return '';
		}
		const arr = fileName.split('.');
		if (arr.length === 1) {
			return '';
		}
		return arr[arr.length - 1];
	}
};

module.exports = fileHelper;
