(function () {
	'use strict';

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

		_createImportElement(directory, theme) {
			if (!theme || theme.length === 0) {
				return;
			}
			const doc = this.ownerDocument || document,
				href = directory + '/' + theme + '.html',
				importElement = doc.createElement('link');

			importElement.setAttribute('async', '');
			importElement.setAttribute('href', href);
			importElement.setAttribute('rel', 'import');

			importElement.addEventListener('load', this.themeLoaded.bind(this, this._importElement, importElement, theme));
			importElement.addEventListener('error', this.themeError.bind(this, this._importElement, importElement, theme));

			doc.head.appendChild(importElement);
		},

		themeError(oldImport, newImport, theme) {
			if (newImport) {
				newImport.parentNode.removeChild(newImport);
			}
			this.fire('theme-error', {
				theme: theme
			});
		},

		themeLoaded(oldImport, newImport, theme) {
			if (oldImport) {
				oldImport.parentNode.removeChild(oldImport);
			}
			this._importElement = newImport;
			this.fire('theme-loaded', {
				theme: theme
			});
			Polymer.updateStyles();
		}
	});
}());
