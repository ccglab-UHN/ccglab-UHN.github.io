(function ($) {
  "use strict";

  $(function () {
    var $window = $(window);
    var $navbar = $(".navbar-fixed-top");
    var $navLinks = $('.custom-navbar .nav a[href^="#"]');
    var $sections = $('main > section[id]');
    var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateNavigationState() {
      var scrollPosition = $window.scrollTop() + ($navbar.outerHeight() || 0) + 80;
      var activeId = 'home';
      $sections.each(function () {
        if ($(this).offset().top <= scrollPosition) activeId = this.id;
      });
      $navLinks.removeAttr('aria-current').parent().removeClass('active');
      $navLinks.filter('[href="#' + activeId + '"]').attr('aria-current', 'location').parent().addClass('active');
    }

    $('a.smoothScroll[href^="#"]').on('click', function (event) {
      var targetId = this.hash;
      var target = document.getElementById(targetId.slice(1));
      if (!target) return;
      event.preventDefault();
      var menuOpen = $('.navbar-collapse').hasClass('in');
      function navigate() {
        var destination = Math.max(0, $(target).offset().top - ($navbar.outerHeight() || 0) + 1);
        window.history.pushState(null, '', targetId);
        window.scrollTo({ top: destination, behavior: motionPreference.matches ? 'instant' : 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        updateNavigationState();
      }
      if (menuOpen) {
        $('.navbar-collapse').one('hidden.bs.collapse', navigate).collapse('hide');
      } else {
        navigate();
      }
    });

    updateNavigationState();
    $window.on('scroll resize', updateNavigationState);
    $window.on('load', updateNavigationState);

    var video = document.querySelector('.hero-video');
    var videoButton = document.querySelector('.video-toggle');
    if (video && videoButton) {
      videoButton.hidden = false;
      function updateVideoButton() {
        videoButton.textContent = video.paused ? 'Play background video' : 'Pause background video';
      }
      function respectMotionPreference() {
        if (motionPreference.matches) video.pause();
        updateVideoButton();
      }
      video.addEventListener('play', updateVideoButton);
      video.addEventListener('pause', updateVideoButton);
      videoButton.addEventListener('click', function () {
        if (video.paused) video.play().catch(updateVideoButton);
        else video.pause();
      });
      motionPreference.addEventListener('change', respectMotionPreference);
      respectMotionPreference();
    }
  });
})(jQuery);
