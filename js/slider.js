;( function( $, window, undefined ) {

	'use strict';

	// global
	var Modernizr = window.Modernizr;

	$.Slider = function( options, element ) {
		this.$el = $( element );
		this.init( options );
	};

	// the options
	$.Slider.defaults = {
		// default transition speed (ms)
		speed : 500,
		// default transition easing
		easing : 'ease'
	};

	$.Slider.prototype = {
		init : function( options ) {
			// options
			this.options = $.extend( true, {}, $.Slider.defaults, options );
            
			// cache some elements and initialize some variables
			this.setup();
            
			this.initEvents();
		},
        
		setup : function() {

			this.$list = this.$el.children( 'ul' );
			this.$items = this.$list.children( 'li' );
            
			this.itemTotal = this.$items.length;
            
			// support for CSS Transitions & transforms
			this.support = Modernizr.csstransitions && Modernizr.csstransforms;
			this.support3d = Modernizr.csstransforms3d;
            
			// transition end event name and transform name
			// transition end event name
			var transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				},
				transformNames = {
					'WebkitTransform' : '-webkit-transform',
					'MozTransform' : '-moz-transform',
					'OTransform' : '-o-transform',
					'msTransform' : '-ms-transform',
					'transform' : 'transform'
				};

            this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.slider';
            this.transformName = transformNames[ Modernizr.prefixed( 'transform' ) ];
            
			this.index = 0;
			this.lastIndex = 0;
            
			// check if the list is indexly moving
			this.isAnimating = false;
			// the list (ul) will have a width of 100% x itemTotal
			this.$list.css( 'width', 100 * this.itemTotal + '%' );
            
			// apply the transition
            this.$list.css( 'transition', this.transformName + ' ' + this.options.speed + 'ms ' + this.options.easing );
            
			// each item will have a width of 100 / itemTotal
			this.$items.css( 'width', 100 / this.itemTotal + '%' );
            
			// add navigation arrows and the navigation dots if there is more than 1 item
			if( this.itemTotal > 1 ) {

				// add navigation arrows (the previous arrow is not shown initially):
				this.$prevArrow = $( '<span class="prev">&lt;</span>' ).hide();
				this.$nextArrow = $( '<span class="next">&gt;</span>' );
				$( '<nav/>' ).append( this.$prevArrow, this.$nextArrow ).appendTo( this.$el );                
			}

		},
        
		initEvents : function() {
			
			var self = this;
			if( this.itemTotal > 1 ) {
				this.$prevArrow.on( 'click.slider', $.proxy( this.navigate, this, 'previous' ) );
				this.$nextArrow.on( 'click.slider', $.proxy( this.navigate, this, 'next' ) );
			}

		},
        
		navigate : function( direction ) {

			if( this.isAnimating ) {
				return false;
			}

			this.isAnimating = true;            
			this.lastIndex = this.index;
            
			if( direction === 'next' && this.index < this.itemTotal - 1 ) {
				++this.index;
			}
			else if( direction === 'previous' && this.index > 0 ) {
				--this.index;
			}

            this.slide();

		},
        
		slide : function() {

			// check which navigation arrows should be shown
			this.showNavigation();
			// translate value
			var translateVal = -1 * this.index * 100 / this.itemTotal;
            
            this.$list.css( 'transform', this.support3d ? 'translate3d(' + translateVal + '%,0,0)' : 'translate(' + translateVal + '%)' );
            
			var transitionendfn = $.proxy( function() {
				this.isAnimating = false;
			}, this );

			if( this.support ) {                
				this.$list.on( this.transEndEventName, $.proxy( transitionendfn, this ) );
                
			} else {
				transitionendfn.call();
			}

		},
        
		showNavigation : function() {

			// if the index item is the first one in the list, the left arrow is not shown
			// if the index item is the last one in the list, the right arrow is not shown
			switch( this.index ) {
				case 0 : this.$nextArrow.show(); this.$prevArrow.hide(); break;
				case this.itemTotal - 1 : this.$nextArrow.hide(); this.$prevArrow.show(); break;
				default : this.$nextArrow.show(); this.$prevArrow.show(); break;
			}

		},
        
        
		destroy : function() {

			if( this.itemTotal > 1 ) {
				this.$prevArrow.parent().remove();
			}
            
			this.$list.css( 'width', 'auto' );
            
			if( this.support ) {
				this.$list.css( 'transition', 'none' );
			}
            
			this.$items.css( 'width', 'auto' );

		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.Slider = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'slider' );
				if ( !instance ) {
					logError( "cannot call methods on slider prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for slider instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'slider' );
				if ( instance ) {
					instance.init();
				}
				else {
					instance = $.data( this, 'slider', new $.Slider( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );