'use strict';

describe('sanity', function () {
  it('$.fn.placement() is present', function() {
    expect( $.fn.placement ).to.be.a('function');
  });

  it('Check of test object shows correct left, right, top, bottom, width, height values', function() {
    expect( $('.test-element').placement({ prop: [ 'width', 'height', 'left', 'right', 'top', 'bottom' ] }) ).to.eql({
      width: 100,
      height: 100,
      left: 20,
      right: 120,
      top: 10,
      bottom: 110
    });
  });
});