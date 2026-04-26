(function ($) {

    "use strict";

    $(window).on('load', function () {
      $('.preloader').delay(250).slideUp('slow');
    });

    $(function () {
      var $window = $(window);
      var $navbar = $(".navbar-fixed-top");
      var $navLinks = $('.custom-navbar .nav a[href^="#"]');
      var $sections = $('section[id]');

      function scrollToTarget(targetId, animate) {
        var $target = $(targetId);

        if (!$target.length) {
          return;
        }

        var destination = Math.max(0, $target.offset().top - ($navbar.outerHeight() || 0) + 1);

        if (animate) {
          var hashUpdated = false;
          $('html, body').stop().animate({ scrollTop: destination }, 550, function () {
            if (!hashUpdated && window.history && window.history.pushState) {
              window.history.pushState(null, '', targetId);
              hashUpdated = true;
            }
            updateNavigationState();
          });
        } else {
          $('html, body').scrollTop(destination);
          updateNavigationState();
        }
      }

      $('a.smoothScroll[href^="#"]').off('click').on('click', function (event) {
        var targetId = this.hash;

        event.preventDefault();
        $(".navbar-collapse").collapse('hide');
        scrollToTarget(targetId, true);
      });

      function updateNavigationState() {
        if ($window.scrollTop() > 50) {
          $navbar.addClass("top-nav-collapse");
        } else {
          $navbar.removeClass("top-nav-collapse");
        }

        var scrollPosition = $window.scrollTop() + ($navbar.outerHeight() || 0) + 80;
        var activeId = 'home';

        $sections.each(function () {
          if ($(this).offset().top <= scrollPosition) {
            activeId = this.id;
          }
        });

        $navLinks.parent().removeClass('active');
        $navLinks.filter('[href="#' + activeId + '"]').parent().addClass('active');
      }

      updateNavigationState();
      $window.on('scroll', updateNavigationState);
      if (window.location.hash) {
        scrollToTarget(window.location.hash, false);
        $window.on('load', function () {
          scrollToTarget(window.location.hash, false);
        });
      }

      if ($.fn.parallax && window.matchMedia('(min-width: 1024px)').matches) {
        $('#home').parallax("60%", 100);
      }

      var owl = $("#owl-team");
      if (owl.length && $.fn.owlCarousel) {
        owl.owlCarousel({
          autoPlay: 6000,
          items: 4,
          itemsDesktop: [1199, 3],
          itemsDesktopSmall: [979, 3],
          itemsTablet: [768, 2],
          itemsTabletSmall: false,
          itemsMobile: [479, 1],
          Speedfast: 200
        });
      }
    });

})(jQuery);
