/*global Polymer, document */
(function () {

	"use strict";

	Polymer({
		is: 'cosmoz-theme-switcher',
		properties: {
			theme: {
				type: String,
				value: 'dark-side'
			},
			themeDirectory: {
				type: String,
				value: '../bower_components/polymer-themes'
			},
			_importElement: {
				type: Object,
				computed: '_computeImportElement(themeDirectory, theme)'
			}
		},

		_computeImportElement: function (directory, theme) {
			if (!theme || theme.length === 0) {
				return;
			}
			var doc = this.ownerDocument || document,
				href = directory + '/' + theme + '.html',
				importElement = doc.createElement('link');

			importElement.setAttribute('rel', 'import');
			importElement.setAttribute('async', '');
			importElement.addEventListener('load', this.themeLoaded.bind(this));
			importElement.addEventListener('error', this.themeError.bind(this));
			importElement.setAttribute('href', href);
			if (this._importElement) {
				this._importElement.parentNode.removeChild(this._importElement);
			}
			doc.head.appendChild(importElement);
			return importElement;
		},

		themeError: function (event) {
			console.log('themeError', event);
			this.fire('theme-error');
		},

		themeLoaded: function (event) {
			console.log('themeLoaded', event);
			this.fire('theme-loaded');
		}
	});
}());