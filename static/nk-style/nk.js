; (function (window, $) {
  //启用返回顶部
  var enableScrollUp = function () {
    var $btnScrollUp = $('#btn-scroll-up');
    if ($btnScrollUp.length === 0) {
      $btnScrollUp = $('<a id="btn-scroll-up" class="btn-scroll-up btn btn-sm"><i class="fa fa-chevron-up fa-2x"></i></a>');
      $('body').append($btnScrollUp);
    }
    $btnScrollUp.on('click', function () {
      $('html,body').animate({ scrollTop: 0 }, 200);
    });
    var scrollBtnIsShow = false;
    $(window).on('scroll', function () {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (!scrollBtnIsShow && scrollTop > 100) {
        scrollBtnIsShow = true;
        $btnScrollUp.show();
      } else if (scrollBtnIsShow && scrollTop <= 100) {
        scrollBtnIsShow = false;
        $btnScrollUp.hide();
      }
    });
  };
  //
  var registerMenuEvents = function () {
    $('.nk-menu li').on('click', function (e) {
      var $this = $(this);
      var $childUl = $this.find('ul');
      if ($childUl.length > 0) {
        var $angle = $this.find('i.nk-menu-angle');
        if ($angle.length > 0) {
          if ($angle.hasClass('fa-angle-left')) {
            $angle.removeClass('fa-angle-left').addClass('fa-angle-down');
          } else {
            $angle.addClass('fa-angle-left').removeClass('fa-angle-down');
          }
        }
        $childUl.css('display', $childUl.css('display') !== 'none' ? 'none' : 'block');
      } else {
        // 跳转
        alert('go');
      }
      return false;
    });
  };
  window.Nk = {
    enableScrollUp: enableScrollUp,
    registerMenuEvents: registerMenuEvents
  };
})(window, window.jQuery);