jquery.placement
================

[![Build Status](https://travis-ci.org/reflectiveSingleton/jquery.placement.png?branch=master)](https://travis-ci.org/reflectiveSingleton/footwork) [![Bower version](https://badge.fury.io/bo/jquery.placement.png)](http://badge.fury.io/bo/jquery.placement)

jQuery plugin providing an easy way of getting all of an elements layout information.

A couple of example usages (more documentation soon):

```html
<html>
  <!-- imaginary view port is 1000px X 1000px -->
  <body>
    <div id="someElement" style="position: absolute; top: 10; left: 20; width: 100px; height: 100px;"></div>
  </body>

  <script>
    var placement;

    placement = $('#someElement').placement();
    placement === {
      width: 100, // width of the element
      height: 100, // height of element
      top: 10, // top side distance from top of view port
      left: 20, // left side distance from left of view port
      right: 120, // right side distance from left of view port
      leftOffset: 980, // left side distance from right of view port
      rightOffset: 880, // right side distance from right of view port
    };

    // It is also possible to only grab what you want (lesser computationally intensive)
    placement = $('#someElement').placement({ props: [ 'width', 'height', 'rightOffset' ] });
    placement === {
      width: 100, // width of the element
      height: 100, // height of element
      rightOffset: 880, // right side distance from right of view port
    };

    // support for relative position (not document offset) is not yet supported (upcomming):
    placement = $('#someElement').placement({ context: 'relative' });
  </script>
</html>
```
