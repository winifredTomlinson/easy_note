; (function(window, $) {
  //启用返回顶部
  var enableScrollUp = function() {
    var $btnScrollUp = $('#btn-scroll-up');
    if ($btnScrollUp.length === 0) {
      $btnScrollUp = $('<a id="btn-scroll-up" class="btn-scroll-up btn btn-sm"><i class="fa fa-chevron-up fa-2x"></i></a>');
      $('body').append($btnScrollUp);
    }
    $btnScrollUp.on('click', function() {
      $('html,body').animate({ scrollTop: 0 }, 200);
    });
    var scrollBtnIsShow = false;
    $(window).on('scroll', function() {
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
  var registerMenuEvents = function() {
    var $allLi = $('.nk-menu li');
    $allLi.on('click', function() {
      var $li = $(this);
      if($li.find('ul').length > 0){
        $li.toggleClass('open');
      }else{
        $allLi.removeClass('active p-active');
        $li.addClass('active');
        $li.parents('li').addClass('p-active');
      }
      return false;
    });
  };
  window.Nk = {
    enableScrollUp: enableScrollUp,
    registerMenuEvents: registerMenuEvents
  };
})(window, window.jQuery);