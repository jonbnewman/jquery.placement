'use strict';

describe('sanity', function () {
  it('is present on jQuery.fn', function() {
    expect(jQuery.fn.placement).to.be.a('function');
  });
});