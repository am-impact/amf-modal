var FW = FW || {};

;(function($, window, document, undefined) {
	// Define constructor
	Modal = function() {
		this.closeButton = null;
		this.modal = null;
		this.overlay = null;
		this.document = document;

		// Determine proper prefix
		this.transitionEnd = transitionSelect();

		// Create options by extending defaults with the passed in arugments
		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = extendDefaults( Modal.defaults, arguments[0] );
		}
	};

	/**
	 * Defaults
	 */
	Modal.defaults = {
		closeButton: true,
		content: '',
		maxWidth: null,
		minWidth: null,
		overlay: true,
		confirmOnClose: false,
		confirmOnCloseText: 'Weet u zeker dat u dit venster wilt sluiten?',
        copyFormValues: true,
		onClose: null,
		onOpen: null
	};


	/**
	 *
	 * Public Methods
	 *
	 */

	/**
	 * Close Modal
	 */
	Modal.prototype.close = function() {
		var self = this;

		/**
		 * Confirm box when closing modal
		 */
		if( this.options.confirmOnClose && !window.confirm( this.options.confirmOnCloseText ) ) {
			return;
		}

        if( this.options.copyFormValues ) {
            copyFormValues.call(this, 'close');
        }

		this.modal.className = this.modal.className.replace(' modal--open', '');
		this.overlay.className = this.overlay.className.replace(' modal__overlay--open', '');
		document.documentElement.className = document.documentElement.className.replace(' modal-opened', '');

		// After CSS transition remove Modal and Overlay from DOM
		this.modal.addEventListener(this.transitionEnd, function() {
			if( self.modal.parentNode ) {
				self.modal.parentNode.removeChild(self.modal);
			}
		});

		this.overlay.addEventListener(this.transitionEnd, function() {
			if (self.overlay.parentNode) {
				self.overlay.parentNode.removeChild(self.overlay);
			}
		});

		/**
		 * Close callback
		 */
		if (typeof this.options.onClose === 'function') {
			this.options.onClose.call(this);
		}
	};

	/**
	 * Open Modal
	 */
	Modal.prototype.open = function() {
		buildModal.call(this);

        if( this.options.copyFormValues ) {
            copyFormValues.call(this, 'open');
        }

		// Bind events
		bindEvents.call(this);

		// After adding elements to the DOM, use getComputedStyle
		// to force the browser to recalc and recognize the elements
		// that we just added. This is so that CSS animation has a start point
		window.getComputedStyle(this.modal).height;

		this.modal.className = this.modal.className + ' modal--open';
		this.overlay.className = this.overlay.className + ' modal__overlay--open';
		document.documentElement.className = document.documentElement.className + ' modal-opened';

		/**
		 * Open callback
		 */
		if (typeof this.options.onOpen === 'function') {
			this.options.onOpen.call(this);
		}
	};


	/**
	 *
	 * Private methods
	 *
	 */

	/**
	 * Build Modal
	 */
	function buildModal() {
		var content, contentHolder, docFrag;

		// Is content a string or DOM object?
		if (typeof this.options.content === 'string') {
			content = this.options.content;
		} else {
			content = this.options.content.innerHTML;
		}

		// Create element
		docFrag = document.createDocumentFragment();

		// Modal
		this.modal = document.createElement('div');
		this.modal.className = 'modal';
		if (this.options.minWidth) {
			this.modal.style.minWidth = this.options.minWidth + 'px';
		}
		if (this.options.maxWidth) {
			this.modal.style.maxWidth = this.options.maxWidth + 'px';
		}

		if (this.options.closeButton === true) {
			this.closeButton = document.createElement('span');
			this.closeButton.className = 'modal__close';
			this.modal.appendChild(this.closeButton);
		}

		if (this.options.overlay === true) {
			this.overlay = document.createElement('div');
			this.overlay.className = 'modal__overlay';
			docFrag.appendChild(this.overlay);
		}

		// Content in Modal
		contentHolder = document.createElement('div');
		contentHolder.className = 'modal__content';
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		// Add Modal to element
		docFrag.appendChild(this.modal);

		// Add element to body
		document.body.appendChild(docFrag);
	}

    /**
     * Copy form values from origin to modal or vice versa
     */
    function copyFormValues( dir ) {
        var inputElements,
            destinyElement;

        // Only possible with dom elements as source
        if( typeof this.options.content === 'string' ) {
            return;
        }

        if( dir === 'open' ) {
            inputElements = this.options.content.querySelectorAll('input, textarea');
            destinyElement = document.querySelector('.modal__content');
        }
        else {
            inputElements = document.querySelectorAll('.modal__content input, .modal__content textarea');
            destinyElement = this.options.content;
        }

        for( var i = 0, len = inputElements.length; i < len; i++ ) {
            if( inputElements[i].name !== '' ) {
                switch( inputElements[i].type ) {
                    case 'checkbox':
                    case 'radio':
                        destinyElement.querySelector('[name="' + inputElements[i].name + '"][value="' + inputElements[i].value + '"]').checked = inputElements[i].checked;
                        break;
                    default:
                        destinyElement.querySelector('[name="' + inputElements[i].name + '"]').value = inputElements[i].value;
                        break;
                }
            }
        }
    }

	/**
	 * Bind events
	 */
	function bindEvents() {
		var self = this;

		if (this.closeButton) {
			this.closeButton.addEventListener('click', this.close.bind(this));
		}

		if (this.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
		}

		this.document.addEventListener('keydown', function(e) {
			if( e.which === 27 && self.modal.className.indexOf('modal--open') > -1 ) {
				self.close();
			}
		});
	}

	/**
	 * Utility method to extend defaults with user options
	 */
	function extendDefaults(source, properties) {
		var property;

		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}

		return source;
	}

	/**
	 * Utility method to determine which transistionend event is supported
	 */
	function transitionSelect() {
		var el = document.createElement("div");
		if (el.style.WebkitTransition) return "webkitTransitionEnd";
		if (el.style.OTransition) return "oTransitionEnd";
		return 'transitionend';
	}

	/**
	 * Default elements which opens a Modal
	 *  - uses jQuery
	 */
	if( typeof $ !== undefined ) {
		var amfModal;

        $('body').on('click', '[data-openmodal]', function() {
			var $modal = $('[data-modal="' + $(this).data('openmodal') + '"]');

            amfModal = new FW.Modal({
				content: $modal[0],
                closeButton: $modal.data('modal-closebutton') === 'false' || $modal.data('modal-closebutton') === false ? false : true,
				maxWidth: parseFloat( $modal.data('modal-width') ) || 600
			});

			amfModal.open();
		});

        $('body').on('click', '[data-closemodal]', function() {
            if( amfModal ) {
                amfModal.close();
                amfModal = null;
            }
        });
	}

	/**
	 * Add Modal to FW object
	 */
	FW.Modal = Modal;
})(window.Zepto || window.jQuery, window, document);
