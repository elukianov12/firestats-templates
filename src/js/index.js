import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';

$('.carouselTest').on('slide.bs.carousel', function () {
  console.log('start slide!');
})
