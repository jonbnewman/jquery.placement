(function (factory) {
  if( typeof define === 'function' && define.amd ) {
    define(['jquery'], factory);
  } else if( typeof exports === 'object' ) {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function ($) {
  var $window = $(window);

  function CalcProp( $element, positionMethod, options ) {
    var cached = {};
    var self = this;

    this.placement = function() {
      return cached.placement || ( cached.placement = $element[ positionMethod ]() );
    };

    this.top = function() {
      return cached.top || ( cached.top = this.placement().top + ( parseInt( options.adjustment.top, 10 ) || 0) );
    };

    this.bottom = function() {
      return cached.bottom || ( cached.bottom = self.top() + self.height() + ( parseInt( options.adjustment.bottom, 10 ) || 0) );
    };

    this.left = function() {
      return cached.left || ( cached.left = this.placement().left + ( parseInt( options.adjustment.left, 10 ) || 0) );
    };

    this.leftOffset = function() {
      return cached.leftOffset || ( cached.leftOffset = $window.width() - self.left() );
    };

    this.right = function() {
      return cached.right || ( cached.right = self.left() + self.width() + ( parseInt( options.adjustment.right, 10 ) || 0) );
    };

    this.rightOffset = function() {
      return cached.rightOffset || ( cached.rightOffset = $window.width() - self.right() );
    };

    this.height = function() {
      return cached.height || ( cached.height = $element.outerHeight() + ( parseInt( options.adjustment.height, 10 ) || 0) );
    };

    this.width = function() {
      return cached.width || ( cached.width = $element.outerWidth() + ( parseInt( options.adjustment.width, 10 ) || 0) );
    };

    this.getCache = function() {
      return cached;
    };

    return this;
  }
      
  $.fn.placement = function( options ) {
    var defaultOptions = {
      prop: [ 'top', 'bottom', 'height', 'width', 'left', 'leftOffset', 'right', 'rightOffset' ],
      adjustment: { },
      context: 'document'
    };
    
    var options = ( typeof options !== 'undefined' && $.extend( {}, defaultOptions, options ) ) || defaultOptions;
    var props = [];
    var positionMethod = ( options.context === 'document' ? 'offset' : 'position' );

    this.each(function() {
      var $element = $(this);
      var prop = {};
      var calc = new CalcProp( $element, positionMethod, options );

      $.each( options.prop, function( index, property ) {
        prop[ property ] = calc[ property ]();
      });

      props.push( prop );
    });

    if( props.length > 1 ) {
      return props;
    }

    return props[0];
  };
}));