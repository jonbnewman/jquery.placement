jquery.placement
================

[![Build Status](https://travis-ci.org/reflectiveSingleton/jquery.placement.png?branch=master)](https://travis-ci.org/reflectiveSingleton/jquery.placement) [![Bower version](https://badge.fury.io/bo/jquery.placement.png)](http://badge.fury.io/bo/jquery.placement)

jquery.placement is a jQuery plugin providing an easy way of getting all of an elements layout information.

### Downloading jquery.placement.js

jquery.placement is available via [bower](http://bower.io/):

*Install via command line:*
```bash
# run this command in your public html folder
bower install jquery.placement
```

*Install via ```bower.json``` (recommended)*
```javascript
{
  "dependencies": {
    "jquery.placement": "*" // add jquery.placement under "dependencies"
  }
}
```
```bash
# run this in the same directory as your bower.json file
bower install
```

### Using jquery.placement

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

### Building jquery.placement from source and running tests

1) **Clone the repo from GitHub:**

```bash
git clone https://github.com/reflectiveSingleton/jquery.placement.git
cd jquery.placement
```

2) **Acquire build dependencies:**

Make sure you have [node.js](http://nodejs.org/) installed in your environment. jquery.placement additionally requires [gulp](http://gulpjs.com/) plus several [bower](http://bower.io/) and [NPM](https://www.npmjs.com/) dependencies when building from source...to install those run:

```bash
# install gulp (javascript task runner, http://gulpjs.com/)
npm install -g gulp # you may need to run this under sudo

# install bower (package manager, http://bower.io/)
npm install -g bower # you may need to run this under sudo

# download dependencies from npm (https://www.npmjs.com/) and bower (http://bower.io/)
npm install && bower install
```

3) **Run a gulp task to build/test/etc:**

```bash
# build everything (output in /dist) and run tests
gulp

# build everything (output in /dist)
gulp build
```

### License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

[![Analytics](https://ga-beacon.appspot.com/UA-52543452-1/jquery.placement/GITHUB-ROOT)](https://github.com/reflectiveSingleton/ga-beacon)
