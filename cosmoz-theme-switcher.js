/*global Polymer, document */
(function () {

	"use strict";

	Polymer({
		is: 'cosmoz-theme-switcher',
		properties: {
			theme: {
				type: String
			},
			themeDirectory: {
				type: String,
				value: 'themes'
			},
			_importElement: {
				type: Object
			}
		},

		observers: [
			'_createImportElement(themeDirectory, theme)'
		],

		_createImportElement: function (directory, theme) {
			if (!theme || theme.length === 0) {
				return;
			}
			var doc = this.ownerDocument || document,
				href = directory + '/' + theme + '.html',
				importElement = doc.createElement('link');

			importElement.setAttribute('async', '');
			importElement.setAttribute('href', href);
			importElement.setAttribute('rel', 'import');

			importElement.addEventListener('load', this.themeLoaded.bind(this, this._importElement, importElement, theme));
			importElement.addEventListener('error', this.themeError.bind(this, this._importElement, importElement, theme));

			doc.head.appendChild(importElement);
		},

		themeError: function (oldImport, newImport, theme, event) {
			if (newImport) {
				newImport.parentNode.removeChild(newImport);
			}
			this.fire('theme-error', {
				theme: theme
			});
		},

		themeLoaded: function (oldImport, newImport, theme, event) {
			if (oldImport) {
				oldImport.parentNode.removeChild(oldImport);
			}
			this._importElement = newImport;
			this.fire('theme-loaded', {
				theme: theme
			});
		}
	});
}());