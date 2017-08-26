'use strict';

(function ($) {
  $.scrollTo = function (el, offset) {
    // $('body').animate({ scrollTop: el.position().top || el.offset().top + offset }, 200);
    $('body').animate({ scrollTop: (offset ? el.offset().top + offset : el.offset().top) }, 200);
  };
})(jQuery);

(function initTimeFunction(moment, times) {
  moment.locale('zh-tw', {
    relativeTime: {
      future: "%s後",
      past: "%s前",
      s:  "秒",
      m:  "1分鐘",
      mm: "%d分鐘",
      h:  "1小時",
      hh: "%d小時",
      d:  "1日",
      dd: "%d日",
      M:  "1個月",
      MM: "%d個月",
      y:  "1年",
      yy: "%d年"
    }
  });

  if (times && times.size() > 0) {
    times.each(function (i, el) {
      var $el = $(el);
      var time = moment($el.text(), 'YYYY-MM-DD HH:mm:ss');
      if (time.isValid()) {
        if(time.diff(moment(), 'hours') <= -23){
          $el.text(moment(time).format('LL'));
        } else {
          $el.text(time.fromNow());
        }
      }
    });
  }
})(moment, $('.clock'));

(function initYoutube(youtube){
  var window_width = $(window).width();
  var resized = false;

  $(youtube).each(function(i){
    $(youtube[i]).css('width', '100%');
  });

  function evaluateYoutubeHeight(){
    $(youtube).each(function(i){
      var ywidth = $(youtube[i]).width();
      var yheight = (ywidth / 16) * 9;
      $(youtube[i]).height(yheight);
    });
  }

  $(document).ready(function(){
    evaluateYoutubeHeight();
  });

  setInterval(function(){
    var new_window_width = $(window).width();
    if(new_window_width != window_width){
      window_width = new_window_width;
      resized = true;
    }

    if(resized){
      evaluateYoutubeHeight();
      resized = false;
    }
  }, 800);
})($('.video16-9'));

(function initWeather(weather){
  updateTime();

  function updateTime(){
    var weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var now = new Date();
    var now_str = '';
    // now_str += (now.getDate() < 10 ? '0' : '') + now.getDate() + ' / ';
    // now_str += ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1) + ' / ' + now.getFullYear();
    // time
    // now_str += ' ';
    // now_str += (now.getHours() < 10 ? '0' : '') + now.getHours() + ' : ';
    // now_str += (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

    // $('.week', weather).text(weekdays[now.getDay()]);
    // $('.date', weather).text(now_str);

    now_str += now.getFullYear() + '.';
    now_str += (now.getMonth() + 1) + '.';
    now_str += now.getDate() + '&nbsp;';
    //time
    now_str += '&nbsp;';
    now_str += (now.getHours() < 10 ? '0' : '') + now.getHours() + ':';
    now_str += (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

    $('.week', weather).html('&nbsp;'　+ weekdays[now.getDay()] + '&nbsp;&nbsp;');
    $('.date', weather).html(now_str);
  }

  setInterval(updateTime, 1000);
// })($('.menu__top__weather--today'));
})($('#popup_datetime .weather, .menu__top__weather--today'));

(function initSubMenu(menu){
  //expects there to be only 1 submenu
  var window_width = $(window).width();
  var resized = false;

  var arrowTemplate = $('<li class="btn_more"><span></span><span></span></li>');
  arrowTemplate.hide();

  function evaluateSubMenu(){
    var menuWidth = menu.width();
    var listWidth = 0;
    $('li', menu).each(function(i){
      listWidth += $(this).outerWidth();
    });

    if( $('.btn_more', menu).length <= 0 ){
      menu.parent().append(arrowTemplate);
    }

    if(listWidth > menuWidth){
      arrowTemplate.show();
    } else {
      arrowTemplate.hide();
    }
  }

  $(document).ready(function(){
    evaluateSubMenu();
  });

  setInterval(function(){
    var new_window_width = $(window).width();
    if(new_window_width != window_width){
      window_width = new_window_width;
      resized = true;
    }

    if(resized){
      evaluateSubMenu();
      resized = false;
    }
  }, 800);
})($('nav.channel_menubar .channel_menubar__menu'));

(function menuToggle(obj){
  obj = obj.length > 0 ? $(obj[0]) : null;
  var open_class = $(obj).data('open-class');
  var target_obj = $('[data-id='+ $(obj).data('target-id') +']');
  target_obj = target_obj.length > 0 ? target_obj[0] : null;

  if(typeof target_obj !== 'undefined' && target_obj !== null){
    if(typeof obj !== 'undefined' && obj !== null){
      obj.on('click', function(){
        if(typeof open_class !== 'undefined' && open_class != ''){
          $(this).toggleClass(open_class);
        }
        $(target_obj).fadeToggle();
      });
    }
  }
})($('[data-id=menu-toggle-btn]'));

(function initHeaderFooter($) {
  var window_width = $(window).innerHeight();
  var channel_sticky_top = false;
  var footer__lower_cor = $(".footer__lower").length != 0 ? $(".footer__lower").offset().top : $('body').innerHeight();
  var resized = true;
  // console.log('init');
  // updateBodyContainer();

  function menuButtonTop() {
    // if( $(".menu__top_popup").is(':visible') ){
    //   $(".menu__top_popup").fadeOut();
    // }
    // $(".menu__top_popup").fadeOut();
    $(".menu__main .btn_more .menu-toggle-btn").toggleClass("open");
    $(".menu__submenu").fadeToggle();
    var btn_text = $(".btn_more b").text() == '更多' ? '關閉' : '更多';
    $(".btn_more b").text(btn_text);
  }

  function menuButtonFix() {
    $('.menu__top__search').fadeOut();
    $('.menu__top__member').fadeOut();
    $(".menu__main--fix .btn_more .menu-toggle-btn").toggleClass("open");
    var btn_text = $(".btn_more b").text() == '更多' ? '關閉' : '更多';
    $(".btn_more b").text(btn_text);
    $(".menu__submenu").fadeToggle();
    if ($(".menu__submenu").hasClass("fix")){
      setTimeout(function(){
        $(".menu__submenu").toggleClass("fix");
      }, 500);
    }
    else $(".menu__submenu").toggleClass("fix");
  }

  function menuTopPopup(this_class) {
    $(".menu__top_popup").each(function(i){
      $(this).removeClass("sticky");
      if( !$(this).hasClass(this_class) )
        $(this).hide();
    });

    if( $('.' + this_class).is(":visible") ){
      $('.' + this_class).fadeOut();
      $(".mask").css("height", 0);
    } else {
      $('.' + this_class).fadeIn();
      $(".mask").css("height", $(window).height());
      if( $(".menu__submenu").is(':visible') ){
        menuButtonTop();
      }
    }
  }

  function menuButtonTopSearch() {
    if( $(".menu__top__search").is(":visible") ){
      $(".menu__top__search").fadeOut();
      $(".menu__top #popup_search").removeClass("open");
      $(".mask").css("height", 0);
    } else {
      $(".menu__top__search").fadeIn();
      $(".menu__top #popup_search").addClass("open");
      $(".mask").css("height", $(window).height());
      if( $(".menu__submenu").is(':visible') ){
        menuButtonTop();
      }
    }

    $(".menu__top__search").removeClass("sticky");
    // $(".menu__top #popup_search").addClass("open");
    // $(".menu__top__search").removeClass("sticky");
  }

  function menuButtonFixSearch() {
    $(".menu__main--fix .btn_search").addClass("open");
    $(".menu__top__search").addClass("sticky");
    if ($(".menu__main--fix .btn_more .menu-toggle-btn").hasClass("open")){
      menuButtonFix();
    }
    if ($(".menu__main--fix .btn_member").hasClass("open")){
      $(".menu__main--fix .btn_member").removeClass("open");
      $(".menu__top__member").removeClass("sticky");
      $(".menu__top__member").fadeOut();
    }

    if( $(".menu__top__search").is(":visible") ){
      $(".menu__top__search").fadeOut();
    } else {
      $(".menu__top__search").fadeIn();
    }
    // $(".menu__top__search").fadeIn();
    // $(".mask").css( "height", $( window ).height());
  }

  function menuButtonFixMember() {
    $(".menu__main--fix .btn_member").addClass("open");
    $(".menu__top__member").addClass("sticky");
    if ($(".menu__main--fix .btn_more .menu-toggle-btn").hasClass("open")){
      menuButtonFix();
    }
    if ($(".menu__main--fix .btn_search").hasClass("open")){
      $(".menu__main--fix .btn_search").removeClass("open");
      $(".menu__top__search").removeClass("sticky");
      $(".menu__top__search").fadeOut();
    }

    if( $(".menu__top__member").is(":visible") ){
      $(".menu__top__member").fadeOut();
      $(".menu__top__member").removeClass("sticky");
    } else {
      $(".menu__top__member").fadeIn();
    }
    // $(".menu__top__search").fadeIn();
    // $(".mask").css( "height", $( window ).height());
  }

  function checkFooterSpacer() {
    if ($(".footer__upper").hasClass("sticky")) {
      $('.footer__upper_spacer').css("display", "block");
    } else {
      $('.footer__upper_spacer').css("display", "none");
    }

    if ($(".footer__socialshare").hasClass("sticky")) {
      $('.footer__upper_spacer').css("display", "block");
    } else {
      $('.footer__upper_spacer').css("display", "none");
    }

    if($('.footer__upper--content').is(':visible')){
      // $('.footer__upper__btn_expand').text('隱藏');
      $('.footer__upper__btn_expand').text('關閉');
    } else {
      $('.footer__upper__btn_expand').text('展開');
    }
  }

  function initMenuContainer() {
    $(".channel_menubar").clone().prependTo(".channel_menubar_expand");
    //console.log( $( ".channel_menubar_expand".position().top)

    $(".channel_menubar .btn_more").click(function() {
      $(".channel_menubar_expand").fadeIn();
      $(".channel_menubar_expand .btn_more").fadeIn();
    });

    $(".channel_menubar_expand .btn_more").click(function() {
      $(".channel_menubar_expand").fadeOut();
    });

    $(".menu__main .btn_more").click(function(){
      menuButtonTop();
      $(".menu__top_popup").fadeOut();
      $(".menu__top #popup_search").removeClass("open");
      $(".mask").css("height", 0);
    });
    $(".menu__main--fix .btn_more").click(menuButtonFix);
    $(".menu__main--fix .btn_search").click(menuButtonFixSearch);
    $(".menu__main--fix .btn_member").click(menuButtonFixMember);

    $(".menu__top a").click(function() {
      var popup_id = $(this).attr('id');
      var windowHeight = $(window).height();
      var actionDefined = false;

      if (popup_id == 'popup_search') {
        actionDefined = true;
        $(".menu__top_popup").each(function(i){
          if( !$(this).hasClass('menu__top__search') )
            $(this).hide();
        });
        // $(".menu__top_popup").hide();
        // $(".menu__top__search").fadeIn();
        menuButtonTopSearch();
        updateSearchPopup();
      } else if (popup_id == 'popup_weather') {
        actionDefined = true;
        // $(".menu__top_popup").hide();
        // $(".menu__top__weather").fadeIn();
        menuTopPopup('menu__top__weather');
      } else if (popup_id == 'popup_notification') {
        actionDefined = true;
        // $(".menu__top_popup").hide();
        // $(".menu__top__notification").fadeIn();
        menuTopPopup('menu__top__notification');
      } else if (popup_id == 'popup_member') {
        actionDefined = true;
        // $(".menu__top_popup").hide();
        // $(".menu__top__member").fadeIn();
        menuTopPopup('menu__top__member');
      } else {
        actionDefined = false;
        $(".menu__top_popup").hide();
      }

      // if(actionDefined){
      //   $(".mask").css("height", windowHeight);
      // } else {
      //   $(".mask").css("height", 0);
      // }
    });

    $(".mask").click(function() {
      $(".menu__top_popup").fadeOut();
      $(".mask").css("height", 0);
    });
  }

  function updateBodyContainer(){
    var section_obj = $('body>section');
    var window_height = $(window).innerHeight();
    $(section_obj).css('min-height', '');

    var body_height = $('body').height();
    var header_height = $('header').innerHeight();
    var footer_height = $('footer').height();
    var footer_spacer = $('.footer__upper_spacer');
    var footer_spacer_height = $(footer_spacer).is(':visible') ? $(footer_spacer).height() : 0;


    if( window_height > body_height - (footer_height - footer_spacer_height) ){
      var new_section_height = window_height - (header_height + footer_height - footer_spacer_height);
      $('.footer__upper').removeClass('sticky');
      $(footer_spacer).hide();
      $(section_obj).css('min-height', new_section_height);
    } else {
      $(section_obj).css('min-height', '');
    }
    // console.log($(section_obj).height());
  }

  function updateSearchPopup(){
    var search_pupup = $('.menu__top__search');
    var member__top_button = $('#popup_member');
    $(search_pupup).css('right', '');

    if(!$(search_pupup).hasClass('sticky')){
      var right = $(member__top_button).innerWidth();
      $(search_pupup).css('right', right + 'px');
    }
  }

  function updateMenuContainer() {
    var menu_main_width = 0;
    var menu_main_fix_width = 0;
    var menu_channel_width = 0;
    var menu_wrapper_width = $('.menu__main--fix .wrapper').outerWidth();
    var current_channel_width = $('.menu__main--fix--current').outerWidth(true);
    var sticky_rightbtns = 150;
    if ($('body').hasClass('guest')){
      sticky_rightbtns = 100;
    }
    var rest_content = current_channel_width + 87 + sticky_rightbtns;
    // var rest_content = current_channel_width + 102 + 60 + 60;

    //main menu
    $('.menu__main__scroll ul li').each(function () {
      var $this = $(this);
      menu_main_width += $this.outerWidth();
      $(".menu__main_container").css( "width", menu_main_width+120);
    });

    //fix menu
    $('.menu__main--fix__scroll').css('width', 'calc(100% - ' + rest_content + 'px)');

    $('.menu__main--fix__scroll ul .menu__main--fix--tit').each(function() {
      var $this = $(this);
      menu_main_fix_width += $this.outerWidth(true);
      $('.menu__main--fix_container').css( 'width', menu_main_fix_width + 1 + 'px');
    });

    $('.channel_menubar__menu:first ul li').each(function() {
      var $this = $(this);
      menu_channel_width += $this.outerWidth();
      $(".channel_menubar__menu ul").css("width", menu_channel_width + 60);
    });
  }

  $(document).ready(function () {
    if( $('#channel_title_sticky').length > 0 && $('#channel_title_sticky').length == 1){
      channel_sticky_top = $('#channel_title_sticky').offset().top;
    }
    initMenuContainer();
    updateMenuContainer();
    recalcHeaderFooter();
    updateSearchPopup();
  });
  $(window).resize(updateMenuContainer);
  $(window).scroll(function () {
    recalcHeaderFooter();
  });

  function recalcHeaderFooter(){
    if( $('.menu__main').length > 0 && $('.menu__main').length == 1){
      var menu__main_cor = $('.menu__main').offset().top;
      footer__lower_cor = $(".footer__lower").offset().top;

      if ($(window).scrollTop() >= menu__main_cor + $('.menu__main').height()) {
        $("nav.menu__main--fix").addClass("sticky");

        if ($(".menu__main .btn_more .menu-toggle-btn").hasClass("open")) {
          menuButtonTop();
        }

        if ($(".menu__top #popup_search").hasClass("open")) {
          $(".menu__top #popup_search").removeClass("open");
          // $('.menu__top__search').css("display", "none");
          // $(".mask").css("height", 0);
        }
        if($('.menu__top_popup').is(':visible')){
          $('.menu__top_popup').css("display", "none");
          $(".mask").css("height", 0);
        }
      } else {
        $("nav.menu__main--fix").removeClass("sticky");

        if ($(".menu__main--fix .btn_more .menu-toggle-btn").hasClass("open")) {
          menuButtonFix();
        }

        if ($(".menu__main--fix .btn_search").hasClass("open")) {
          $(".menu__main--fix .btn_search").removeClass("open");
          $('.menu__top__search').css("display", "none");
          $(".mask").css("height", 0);
        }

        if ($(".menu__main--fix .btn_member").hasClass("open")) {
          $(".menu__main--fix .btn_member").removeClass("open");
          $('.menu__top__search').css("display", "none");
          $(".mask").css("height", 0);
        }
      }
    }

    // var detect_scrollBottom = footer__lower_cor + ($('.footer__upper').hasClass('sticky') ? $('.footer__upper').height() : 0) - $(window).height();

    // var stuckToBottom = $(window).scrollTop() < detect_scrollBottom;

    // $(".footer__upper").toggleClass("sticky", stuckToBottom);
    if( $('#channel_title_sticky').length > 0 && channel_sticky_top !== false ){
      if ($(window).scrollTop() >= channel_sticky_top - $('.menu__main--inner').height()) {
        $("#channel_title_sticky").addClass("sticky");
      } else{
        $("#channel_title_sticky").removeClass("sticky");
      }
    }

    // var detect_scrollBottom = footer__lower_cor - $(window).height();
    var detect_scrollBottom = footer__lower_cor + ($('.footer__upper').hasClass('sticky') ? $('.footer__upper').height() : 0) - $(window).height();

    if( $('body>section').hasClass('legco2016') ){
      detect_scrollBottom = $('.footer__lower').offset().top - $(window).innerHeight();
    }
    var stuckToBottom = $(window).scrollTop() < detect_scrollBottom;

    $(".footer__upper").toggleClass("sticky", stuckToBottom);

    if ($(window).scrollTop() >= detect_scrollBottom) {
      $(".footer__upper").removeClass("sticky");
    } else {
      $(".footer__upper").addClass("sticky");
    }

    if ($(window).scrollTop() >= detect_scrollBottom) {
      $(".footer__socialshare").removeClass("sticky");
    } else {
      $(".footer__socialshare").addClass("sticky");
    }

    checkFooterSpacer();
  }

  setInterval(function(){
    var new_window_width = $(window).width();
    if(new_window_width != window_width){
      window_width = new_window_width;
      resized = true;
    }

    if(resized){
      // console.log('resize');
      updateBodyContainer();
      resized = false;
    }
  }, 800);
})(jQuery);

(function initTicker($ticker) {
  if ($ticker.length > 0) {
    if ($ticker.find('li').length > 1) {
      $ticker.vTicker();
    }
  }
})($('.breaking_news_container'));

(function initOverlayButtons($leftArrow, $rightArrow) {
  // Article Navigation
  $leftArrow.add($rightArrow).hover(function () {
    $(this).animate({ width: '250px' }, 500);
  }, function () {
    $(this).animate({ width: '0' }, 500);
  });
})($('.page_overlay_arrows--left'), $('.page_overlay_arrows--right'));

/* TODO: might need this for infinite scrolling */
(function initLazyScrolling($widget) {
  if ($widget.size() === 0) {
    return;
  }

  var isScrolledIntoView = function (elem) {
    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  };

  var times_scrolled = 1;
  // var max_allowed_scroll = 4;
  var timer;
  var running = false;
  var $loader = $widget.find('.lazyload_container');
  var $window = $(window);

  var load = function () {
    if (!running && isScrolledIntoView($loader)) {
      running = true;

      var api = $widget.attr('data-lazyload-api');
      var template = $widget.attr('data-lazyload-template');
      var initialPage = +$widget.attr('data-lazyload-initialpage') || 0;
      var excerpt_length = $widget.attr('data-lazyload-length');
      if (!$widget.is('[data-lazyload-page]')) {
        $widget.attr('data-lazyload-page', initialPage);
      }

      var currentPage = +$widget.attr('data-lazyload-page');

      // if(times_scrolled < max_allowed_scroll){
      $.ajax({
        method: 'get',
        url: api.replace('{INCREMENT_VALUE}', currentPage).replace('{EXERPT_LENGTH}', excerpt_length),
        dataType: 'html',
        data: {TEMPLATES : template},
        beforeSend: function () {
          $loader.css('visibility', 'visible');
        },
        success: function (data, status, xhr) {
          // if (template in window.TEMPLATES) {
            $loader.before(data);
          // }
          currentPage++;
          $widget.attr('data-lazyload-page', currentPage);
        },
        complete: function (xhr) {
          $loader.css('visibility', 'hidden');
          running = false;
            times_scrolled ++;
        }
      });
      // }
    }
  };

  $window.scroll(function (e) {
    clearTimeout(timer);
    if (running) return;

    timer = setTimeout(function () {
      load();
    }, 50);
  });
})($('[data-lazyload=true]'));

(function initPagination($widget) {
  if ($widget.size() === 0) {
    return;
  }
  var running = [];
  var $loader = [];
  var $paginationHolder = [];

  function loadPage(id, page){
    if (!running[id]) {
      running[id] = true;

      var api = $($widget[id]).attr('data-pagination-api');
      var template = $($widget[id]).attr('data-pagination-template');
      var totalPages = $($widget[id]).attr('data-pagination-total-pages');

      $.ajax({
        method: 'get',
        url: api.replace('{INCREMENT_VALUE}', page),
        dataType: 'json',
        beforeSend: function () {
          $($loader[id]).css('visibility', 'visible');
          if(template != "issue_listing_detail")
            $(window).scrollTop(0);
        },
        success: function (data, status, xhr) {
          if (template in window.TEMPLATES) {
            $($loader[id]).prevAll().remove();
            $($loader[id]).before(window.TEMPLATES[template](xhr.responseJSON));
          }
          $($widget[id]).attr('data-pagination-page', page);

          var $pageElements = $($paginationHolder[id]).find('.btn_prev').nextUntil('.btn_next');
          var segmentCount = $($pageElements).length;
          var startPage = Math.max(1, page - Math.floor(segmentCount / 2));
          var endPage = Math.min(totalPages, parseInt(page) + Math.floor(segmentCount / 2));

          if (startPage == 1 && endPage - startPage < segmentCount) {
            endPage = startPage + segmentCount - 1;
          }
          if (endPage == totalPages && endPage - startPage < segmentCount) {
            startPage = endPage - segmentCount + 1;
          }

          $pageElements.remove();
          for (var i = startPage; i <= endPage; i++) {
            $($paginationHolder[id]).find('.btn_next').before(
              '<li class="btn' + (i == page ? ' current' : '') + '" data-pagination-page="' + i + '" data-pagination-role="jump">' +
                '<a href="javascript:void(0)">' + i + '</a>' +
              '</li>'
            );
          }
        },
        complete: function (xhr) {
          $($loader[id]).css('visibility', 'hidden');
          running[id] = false;
        }
      });
    }
  }

  function checkHash(i, goto_page){
    var link_hash = window.location.hash;
    var regex = new RegExp('.i=' + i);
    var page = 1;
    var totalPages = +$($widget[i]).attr('data-pagination-total-pages');
    var hashes = [];

    goto_page = (typeof goto_page != 'undefined' ? parseInt(goto_page) : 'default');

    if(window.location.hash != ''){
      var hash = link_hash.split(regex);

      if (hash.length >= 2){
        page = hash[1].split('&');
        if(page[0].indexOf('p=') !== -1){
          page = page[0].split('p=')[1];
        }
      }
    }

    if (page >= 1 && page <= totalPages){
      page = page;
    } else{
      page = 1;
    }

    if (goto_page !== 'default'){
      if (goto_page >= 1 && goto_page <= totalPages){
        goto_page = goto_page;
      } else{
        goto_page = 1;
      }

      if(link_hash != ''){
        var found = false;

        hashes = link_hash.split('&');
        $(hashes).each(function(j){
          if(hashes[j].indexOf('i=' + i) !== -1){
            hashes[j] = 'i=' + i + 'p=' + goto_page;
            found = true;
          }
        });

        if(!found){
          hashes.push('i=' + i + 'p=' + goto_page);
        }
      } else {
        hashes[0] = 'i=' + i + 'p=' + goto_page;
      }

      page = goto_page;
      hashes = hashes.join('&');
      window.location.hash = hashes;
    }

    return page;
  }

  $widget.each(function(i){
    running[i] = false;
    $loader[i] = $($widget[i]).find('.pageload_container');
    $paginationHolder[i] = $($widget[i]).find('[data-pagination-role=nav-holder]');
    if($paginationHolder[i].length == 0){
      var pagination_id = $($widget[i]).data('pagination-target');
      $paginationHolder[i] = $('body').find('#' + pagination_id);
    }

    loadPage(i, checkHash(i));
  });

  $(document).ready(function(){
    $widget.each(function(i){

      $($paginationHolder[i]).on('click', '[data-pagination-role][data-pagination-role!="nav-holder"]', function(){
        var $element = $(this);
        switch ($element.data('pagination-role')) {
          case 'jump':
            var page = +$element.data('pagination-page');
            loadPage(i, checkHash(i, page));
            break;

          case 'prev':
            var currentPage = +$($widget[i]).attr('data-pagination-page');
            if (currentPage >= 2) {
              var page = currentPage - 1;
              loadPage(i, checkHash(i, page));
            }
            break;

          case 'next':
            var currentPage = +$($widget[i]).attr('data-pagination-page');
            var totalPages = +$($widget[i]).attr('data-pagination-total-pages');
            if (currentPage < totalPages) {
              var page = currentPage + 1;
              loadPage(i, checkHash(i, page));
            }
            break;

          case 'first':
            var currentPage = +$($widget[i]).attr('data-pagination-page');
            if (currentPage > 1) {
              var page = 1;
              loadPage(i, checkHash(i, page));
            }
            break;

          case 'last':
            var currentPage = +$($widget[i]).attr('data-pagination-page');
            var totalPages = +$($widget[i]).attr('data-pagination-total-pages');
            if (currentPage != totalPages) {
              var page = totalPages;
              loadPage(i, checkHash(i, page));
            }
            break;
        }
      });
    });
  });
})($('[data-pagination=true]'));

(function initPhotoswipe($galleryPhotos) {
  var t = $galleryPhotos.parent(); //2016-05-19: added by alex
  if ($galleryPhotos.size() === 0) {
    return;
  }

  var slides = [];

  $galleryPhotos.each(function (i, photo) {
    var $photo = $(photo);
    var src = $photo.attr('src');
     slides.push({
     src: src,
     w: $photo.width(),// * 2,
     h: $photo.height(),// * 2,
     title: $photo.attr('title') || ''
    });
  });

  slides.forEach(function (s, i) {
    (function (img, index) {
      var newImg = new Image();
      newImg.onload = function () {
        s.w = newImg.width;
        s.h = newImg.height;
      };
      newImg.src = img.src;
    })(s, i);
  });

  $(t).on('click', function(e){ //2016-05-19: revise by alex. Start.
    var src = $(this).children().attr('src');
  // var src = $(this).attr('src'); //2016-05-19: revise by allex. End.
    var index = slides.findIndex(function (s) {
      return s.src === src;
    });

    var pswp = new PhotoSwipe(
      document.querySelectorAll('.pswp')[0],
      PhotoSwipeUI_Default,
      slides,
      { index: index }
    );

  // Send pageview to GA
    pswp.listen('afterChange', function () {
			var cIndex = pswp.getCurrentIndex()+1;
			var page = document.querySelector('meta[name="ga_url"]').content + '/pid=' + cIndex;
      var artid = document.querySelector('meta[name="artid"]').content;
      ga('set','dimension5',artid);
      ga('set', 'page', page);
			ga('send', 'pageview', page);
    });
    pswp.init();
  });
})($('[data-gallery-image=true]'));

(function initPhotoswipe($galleryPhotos) {
  var t = $galleryPhotos.parent(); //2016-05-19: added by alex
  if ($galleryPhotos.size() === 0) {
    return;
  }

  var slides = [];
  var photo_a = [];

  $galleryPhotos.each(function (i, photo) {
    var $photo = $(photo);
    var src = $photo.attr('src');
    if (src ===undefined)
    src =  $photo.attr('data-src');
    if(photo.tagName === "IMG") {
      photo_a.push(i);
      slides.push({
        src: src,
        w: $photo.width(),// * 2,
        h: $photo.height(),// * 2,
        title: $photo.attr('title') || ''
      });
    }
  });

  $(t).on('click', function(e){ //2016-05-19: revise by alex. Start.
    var src = $(this).children().attr('src');
    var index = slides.findIndex(function (s) {
      return s.src === src;
    });

    var pswp = new PhotoSwipe(
      document.querySelectorAll('.pswp')[0],
      PhotoSwipeUI_Default,
      slides,
      { index: index, preload:[1,3]}
    );

  // Send pageview to GA
  var s = $(".photo_image")[0].swiper;
  pswp.listen('afterChange', function () {
    var cIndex = pswp.getCurrentIndex()+1;
    var page = document.querySelector('meta[name="ga_url"]').content + '/pid=' + cIndex;
    var artid = document.querySelector('meta[name="artid"]').content;
    ga('set','dimension5',artid);
    ga('send', 'pageview', page);
    s.slideTo(photo_a[pswp.getCurrentIndex()]);
  });

  // resize image
  pswp.listen('gettingData', function(index, item) {
    var img = new Image();
    img.onload = function() {
      item.w = this.width;
      item.h = this.height;
      pswp.updateSize(true);
    }
    img.src = item.src; // let's download image
  });

  pswp.init();
  });
})($('[data-photostory-image=true]'));


(function initSwiper($) {
  $(document).ready(function () {
    $('.slider, .imageslider').each(function () {
      var $item = $(this);

      if ($item.is('[data-defer-swiper-init]')) {
        return;
      }

      new Swiper($item, {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        pagination: '.swiper-pagination',
        paginationClickable: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
        loop: true
      });
    });
  });
})(jQuery);

(function initHotnewsTabs($) {
  $(".hotnews__container").hide();
  $(".hotnews__container").first().show();
  $(".tab_hotnews__item").removeClass("current");
  $(".tab_hotnews__item").first().addClass("current");
  $(".tab_hotnews__item").click(function () {
    var current_id = $(this).attr('id')
    $(".tab_hotnews__item").removeClass("current");
    $(this).addClass("current");
    $(".hotnews__container").hide();
    $('.hotnews--' + current_id).show();
  });
})(jQuery);

(function initSearch($searchForm) {
  $searchForm.each(function (i, form) {
    var $form = $(form);
    var $searchBox = $form.find('[name=keyword]');
    var $searchButton = $form.find('.btn, [type=button]')

    $searchBox.on('keydown', function (e) {
      if (e.keyCode === 13) {
        window.performKeywordSearch($searchBox.val());
      }
      if (e.keyCode === 27) {
        $searchBox.blur();
      }
    });

    $searchButton.on('click', function (e) {
      window.performKeywordSearch($searchBox.val());
    });
  });
})($('[data-search-form]'));

// (function initTagButton(tag_obj){
//   var api_actions = ['unsubscribe_tag', 'subscribe_tag'];

//   tag_obj.on('click', function(){
//     var api = $(this).data('tag-api');
//     var tag_id = $(this).data('tag-id');
//     var action = api_actions[1];
//     if( $(this).hasClass('add') )   action = api_actions[1];
//     if( $(this).hasClass('del') )   action = api_actions[0];

//     $.ajax({
//         method: 'get',
//         url: api.replace('{API_ACTION}', action),
//         dataType: 'json',
//         success: function (data, status, xhr) {
//           console.log('data', data);
//           console.log('status', status);
//           console.log('xhr', xhr);

//           //after success
//           if( $(this).hasClass('add') ){
//             var same_tags = $('[data-tag-id= '+ tag_id + ']');
//             same_tags.removeClass('add');
//             same_tags.addClass('del');
//             same_tags.data('tag-action', api_actions[0]);
//           }
//           if( $(this).hasClass('del') ){
//             var same_tags = $('[data-tag-id= '+ tag_id + ']');
//             same_tags.removeClass('del');
//             same_tags.addClass('add');
//             same_tags.data('tag-action', api_actions[1]);
//           }
//         }
//       });
//   });
// })($('.tag_btn'));

/* TODO: might need this for sign in/up */
(function initTagButton(obj){
  var actions = ['add', 'remove'];
  var tooltip = ['加入我的標籤', '從我的標籤移除'];
  var api;
  var action;
  var tag_id;

  var baseURL = $(obj).data('base-url');
  var target_class = $(obj).data('target-class');
  var target_obj = $('[data-class='+ target_class +']');
  var max_count = $(obj).data('max-count');
  var fancybox_html = [];
  var tag_list = [];
  var tags;

  //not logged in
  fancybox_html[0] =  '<div id="mychoice">' +
                      '<div class="brief add_tag">' +
                      '<h2>加入「我的自選標籤」</h2>' +
                      '<div class="points point_1">' +
                      '<img src="' + baseURL + 'assets/images/img_mychoice_pic1.png">' +
                      '<b>功能一：</b><br>' +
                      '每當有文章與「我的自選標籤」相同，會優先推送給你' +
                      '</div><!-- end of point 1 -->' +
                      '<div class="points point_2">' +
                      '<img src="' + baseURL + 'assets/images/img_mychoice_pic2.png">' +
                      '<b>功能二：</b><br>' +
                      '你可以快速簡易在「我的自選標籤」中找到相關文章' +
                      '</div><!-- end of point 2 -->' +
                      '<div class="points point_3">' +
                      '<img src="' + baseURL + 'assets/images/img_mychoice_pic3.png">' +
                      '<b>功能三：</b><br>' +
                      '你可以在手機或電腦中增加或刪取標籤，自選不同題材的文章' +
                      '</div><!-- end of point 3 -->' +
                      '</div><!-- end of brief -->' +
                      '<div class="login">' +
                      '<h2>登入或註冊</h2>' +
                      '<a href="' + baseURL + 'member/login" class="alreadymember">登入</a>' +
                      '<a href="' + baseURL + 'member/registration" class="notyetmember">註冊成為會員</a>' +
                      '</div>' +
                      '</div>';
  fancybox_html[1] = '已加入至<br/>我的自選標籤'; //logged in
  fancybox_html[2] = '已從我的自選標籤移除';
  fancybox_html[3] = '自選標籤己達上限';

  get_tag_localstorage();
  $(obj).each(function(i){
    var action_key;
    var status = -1;
    tag_id = $(this).data('tag-id');

    checkMyChoice( parseInt(tag_id), tag_list );
  });

  obj.on('click', function(){
    api = $(this).data('api');
    action = $(this).data('action');
    tag_id = $(this).data('tag-id');
    get_tag_localstorage();

    $.ajax({
          method: 'get',
          url: api.replace('{ACTION}', action),
          dataType: 'json',
          xhrFields: {withCredentials: true },
          headers: { 'X-Requested-With': 'XMLHttpRequest'},
          success: function (data, status, xhr) {
            var result = data.subscribed_tags;
            var return_tags = result;
            var status = -1;
            var action_key;

            $(return_tags).each(function(i){
              return_tags[i] = parseInt(return_tags[i]);
            });

            checkMyChoice( parseInt(tag_id), return_tags );

            //set local storage || cookie for IOS private mode
            set_localstorage("hk01_subscribed_tag", result);
            if(result[0] === 0){
              $(target_obj).html(fancybox_html[0]);
            }
          },
          complete: function (xhr) {
            $.fancybox(
              $(target_obj).html(),
              {
                beforeLoad: function(){
                  $("html").addClass("fancy_no_animation");
                },
                afterClose: function(){
                  $("html").removeClass("fancy_no_animation");
                },
                'padding'         : 20,
                'maxWidth'        : 960,
                'maxHeight'       : 600,
                'width'           : '90%',
                'height'          : '100%',
                'openEffect'      : 'none',
                'closeEffect'     : 'none'
              }
            );
          }
        });
  });

  function checkMyChoice(tag_id, tag_list){
    var status = -1;
    var action_key;
    status = $.inArray( parseInt(tag_id), tag_list );
    if (status == -1){
      action_key = 0;
      $('[data-tag-id='+ tag_id +']').each(function(){
        $('btn', this).removeClass('active');
        $(this).data('action', actions[action_key]);
        $(this).attr('title', tooltip[action_key]);
      });
      $(target_obj).html(fancybox_html[2]);
      if(tag_list.length == max_count)
        $(target_obj).html(fancybox_html[3]);
    }
    if (status >= 0){
      action_key = 1;
      $('[data-tag-id='+ tag_id +']').each(function(){
        $('btn', this).addClass('active');
        $(this).data('action', actions[action_key]);
        $(this).attr('title', tooltip[action_key]);
      });
      $(target_obj).html(fancybox_html[1]);
    }

    if(tags === null){
      $(target_obj).html($(fancybox_html[0]));
    }
  }

  function get_tag_localstorage(){
    tags = get_localstorage("hk01_subscribed_tag");

    if(tags == null){
      $(target_obj).html(fancybox_html[0]);
      tag_list = [];
    }

    if(tags != null){
      $.each( tags, function(key, value){
        tag_list.push(parseInt(value));
      });
    }
    return true;
  }
})($('[data-class=tag-subscription]'));

function http_init_localstorage(){
  if(check_localstorage('hk01_subscribed_bookmark') || check_localstorage('hk01_subscribed_tag')){
      var api = $("#http_init_localstorage").data('api');
      $.ajax({
          method: 'get',
          url: api,
          dataType: 'json',
          crossDomain: true,
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          xhrFields: { withCredentials: true },
          success: function (data, status, xhr) {
            set_localstorage("hk01_subscribed_tag", data.tags);
            set_localstorage("hk01_subscribed_bookmark", data.bookmarks);
          }
      });
  }
}

function delet_localstorage(){
  localStorage.removeItem('hk01_subscribed_tag');
  localStorage.removeItem('hk01_subscribed_bookmark');
}

/* TODO: might need this for sign in/up */
(function initCaptchaRegenButton(captcha_obj){
  captcha_obj.on('click', function(){
    var api = $(this).data('captcha-api');
    var self = $(this);
    var parent = $(this).parent();

    $.ajax({
        method: 'get',
        url: api,
        dataType: 'json',
        success: function (data, status, xhr) {
          var html = data['captcha'];

          $("img", parent).remove();
          $(html).insertBefore(self);
        }
      });
  });
})($('#refresh_captcha'));

/* TODO: might need this for sign in/up */
//web qr code fancybox
(function qrcode_fancybox(obj){


  var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
  var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
  if (isiDevice || isAndroid) {
    obj.on('click', function(){
      var target_id =  $(this).data('target-id');
      var target = $('#' + target_id);
      var uudi = $(this).data('uuid');
      var qr_code = $(this).data('qrcode');
      var fancybox_html = '<img src="'+qr_code+'" width="100%" />'+
                          '<p style="line-height:150%; padding:10px 0 0 0; text-align: center">'+
                          '<span style="font-size:12px;">掃描上面的QR code 確認會員身份</span> <br />'+
                          '會員編號：<span class="members_number">'+uudi+'</span></p>';
      target.html(fancybox_html);
      $.fancybox(
        $(target).html(),
        {
          beforeLoad: function(){
            $("html").addClass("fancy_no_animation");
          },
          afterLoad : function(){
            $('div.fancybox-inner').css('display' , 'table-cell');
            $('div.fancybox-inner').css('vertical-align' , 'middle');
            $('div.fancybox-inner').css('color' , '#fff');
            $('div.fancybox-inner').css('font-size' , '16px');
            $('div.fancybox-inner').css('line-height' , '16px');
            $('div.fancybox-inner').css('text-align' , 'center');
          },
          afterClose: function(){

            $("html").removeClass("fancy_no_animation");
          },

          'padding'         : 40,
          'maxWidth'        : 280,
          'maxHeight'       : 355,
          'minWidth'        : 0,
          'minHeight'       : 0,
          'width'           : '90%',
          'height'          : '90%',
          'openEffect'      : 'none',
          'closeEffect'     : 'none'
        }
      );
    });
  }else{
    $('a.myqrcode.fancybox').remove();
  }
})($('a.myqrcode.fancybox'));

/* TODO: might need this for sign in/up */
(function initFancyBox(obj){
  var fancybox_html = [];
  var href  = window.location.host + "/member/login";
  fancybox_html[0] = "<p style='line-height:125%;'>登入已逾期，請重新登入</p><br><br>"+
                      "<a onclick='redirect_login()'><div class='btn_confirm' >登入</div></a>";
  fancybox_html[1] = "<p style='line-height:125%;'>確認電郵已發出，請檢查你的郵箱，並按電郵內指示完成電郵確認程序。</p>";

  obj.on('click', function(){
    var self = $(this);
    var target_id = $(this).data('target-id');
    var target = $('#' + target_id);
    var api = $(this).data('api');
    // console.log(api);

    if(api){
      $.ajax({
          method: 'get',
          url: api,
          dataType: 'json',
          success: function (data, status, xhr) {
            // console.log(data);
            var result = data.response;

            if(result === true){
              $(target).html(fancybox_html[1]);
            } else {
              $(target).html(fancybox_html[0]);
            }
          },
          complete: function (xhr) {
            // console.log('complete');
            $.fancybox(
              $(target).html(),
              {
                beforeLoad: function(){
                  $("html").addClass("fancy_no_animation");
                },
                afterClose: function(){
                  $("html").removeClass("fancy_no_animation");
                },
                'padding'         : 20,
                'maxWidth'        : 320,
                'maxHeight'       : 270,
                'minWidth'        : 0,
                'minHeight'       : 0,
                'width'           : '90%',
                'height'          : '90%',
                'openEffect'      : 'none',
                'closeEffect'     : 'none'
              }
            );
          }
      });
    }
  });

})($('[data-class=fancybox]'));

(function Verify_message(obj){
  obj.on('click', function(){
    var target_id = $(this).data('target-id');
    var target = $('#' + target_id);
    var name = $(this).data('name');
    var api = $(this).data('api');
    var fancybox_html =
    "<p style='line-height:125%; text-align:left'>您的註冊電郵未認証，請登入郵箱，根據「認証電郵」的指示，完成確認程序。"+
    "<br><br>若未收到確認電郵，請檢查垃圾郵件匣；也可要求重發認証電郵。"+
    "</p><br><br><a class='fancybox'  onclick='send_verify_message()'"+
    "data-target-id='inline1'+ data-api='"+api+"'><div class='btn_identify'>重發認証電郵</div></a>";

    target.html(fancybox_html);

    callFancybox(target);
  });
})($('[data-class=verify_message]'));

function callFancybox(target){
  $.fancybox(
    $(target).html(),
    {
      beforeLoad: function(){
        $("html").addClass("fancy_no_animation");
      },
      afterClose: function(){
        $("html").removeClass("fancy_no_animation");
      },
      'padding'         : 20,
      'maxWidth'        : 320,
      'maxHeight'       : 270,
      'minWidth'        : 0,
      'minHeight'       : 0,
      'width'           : '90%',
      'height'          : '90%',
      'openEffect'      : 'none',
      'closeEffect'     : 'none'
    }
  );
}

function send_verify_message(){
  var send_message = $('#verify_message').children('a.fancybox');
  var send_message = $('#verify_message').children('a');
  var target_id = send_message.data('target-id');
  var target = $('#' + target_id);

  var wating_send_msg =
  "<p style='line-height:125%; text-align:left'>您的註冊電郵未認証，請登入郵箱，根據「認証電郵」的指示，完成確認程序。"+
  "<br><br>若未收到確認電郵，請檢查垃圾郵件匣；也可要求重發認証電郵。"+
  "</p><br><br><div class='btn_confirm'>發送中...</div>";
  var sending_html = $("#verify_message");
  $(sending_html).html(wating_send_msg),
  $(sending_html).css("background-color", "#green");


  $.fancybox(
    $(sending_html).html(),
    {
      beforeLoad: function(){
        $("html").addClass("fancy_no_animation");
      },
      afterClose: function(){
        $("html").removeClass("fancy_no_animation");
      },
      'padding'         : 20,
      'maxWidth'        : 320,
      'maxHeight'       : 160,
      'minWidth'        : 0,
      'minHeight'       : 0,
      'width'           : '90%',
      'height'          : '90%',
      'openEffect'      : 'none',
      'closeEffect'     : 'none'
    }
  );

  var fancybox_html = [];
  fancybox_html[0] = "<p style='line-height:125%;'>登入已逾期，請重新登入</p><br><br>"+
                      "<a onclick='redirect_login()'><div class='btn_confirm' >登入</div></a>";
  fancybox_html[1] = "<p style='line-height:125%;'>確認電郵已發出，請檢查你的郵箱，並按電郵內指示完成電郵確認程序。</p>";
  var api = send_message.data('api');
    if(api){
      $.ajax({
          method: 'get',
          url: api,
          dataType: 'json',
          success: function (data, status, xhr) {
            var result = data.response;

            if(result === true){
              $(target).html(fancybox_html[1]);
            } else {
              $(target).html(fancybox_html[0]);
            }
          },
          complete: function (xhr) {
            $.fancybox(
              $(target).html(),
              {
                beforeLoad: function(){
                  $("html").addClass("fancy_no_animation");
                },
                afterClose: function(){
                  $("html").removeClass("fancy_no_animation");
                },
                'padding'         : 20,
                'maxWidth'        : 320,
                'maxHeight'       : 160,
                'minWidth'        : 0,
                'minHeight'       : 0,
                'width'           : '90%',
                'height'          : '90%',
                'openEffect'      : 'none',
                'closeEffect'     : 'none'
              }
            );
          }
      });
    }
}

function redirect_login(){
  var href  = "//"+window.location.host+"/member/login";
  window.location.href = href;
}


(function initFancyBoxAuto(obj){
  $(document).ready(function() {
    $.fancybox(
      $(obj).html(),
      {
        beforeLoad: function(){
          $("html").addClass("fancy_no_animation");
        },
        afterClose: function(){
          $("html").removeClass("fancy_no_animation");
        },
        'padding'     : 20,
        'maxWidth'    : 320,
        'maxHeight'   : 160,
        'width'       : '90%',
        'height'      : '90%',
        'openEffect'  : 'none',
        'closeEffect' : 'none'
      }
    );
  });
})($('[data-class=fancybox_auto]'));

(function initUploadImg(img_obj){
  var no_file_text = '尚未選取檔案';

  $(img_obj).each(function(i){
    var filename_target = $('[data-id=' + $($(img_obj)[i]).data('preview-target-id') + ']');
    // $(filename_target).text(no_file_text);

    $($(img_obj)[i]).on('click', function(){
      var self = $(this);
      var target_id = $(this).data('target-id');
      var target = $('[data-id=' + target_id + ']');
      var preview = $('[data-id=' + $(target).data('preview-target-id') + ']');
      var previewName = $('[data-id=' + $(target).data('filename-target-id') + ']');

      target.click();
      target.on('change', function(){
        viewImgURL(target, previewName, preview);
      });
    });
  });

  function viewImgURL(input, target, target_img) {
    $(target_img).css('width', '');
    $(target_img).css('height', '');
    $(target_img).css('position', '');
    $(target_img).css('top', '');
    $(target_img).css('left', '');

    if ($(input)[0].files && $(input)[0].files[0]) {
        // $(target).text($(input)[0].files[0].name);
        $(target).text('');
        var reader = new FileReader();

        reader.onload = function (e) {
          $(target_img).css('width', '');
          $(target_img).css('height', '');
          var preview_height = $(target_img).height();
          var preview_width = $(target_img).width();
          var target_real_width;
          var target_real_height;
          var w_over_h_ratio;

          var top;
          var left;

          $(target_img).attr('src', e.target.result);
          $(target_img).css('width', 'auto');
          $(target_img).css('height', 'auto');

          target_real_width = $(target_img).width();
          target_real_height = $(target_img).height();
          w_over_h_ratio = target_real_width/target_real_height;

          // console.log('preview_height', preview_height);
          // console.log('preview_width', preview_width);
          // console.log('target_real_width', target_real_width);
          // console.log('target_real_height', target_real_height);

          //start handle display for 1:1 ratio
          if(w_over_h_ratio == 1){
            $(target_img).css('width', '');
            $(target_img).css('height', '');
            $(target_img).css('position', '');
            $(target_img).css('top', '');
            $(target_img).css('left', '');
          }

          if(w_over_h_ratio > 1){
            $(target_img).css('width', 'auto');
            $(target_img).css('height', preview_height);

            left = -(($(target_img).width() - preview_width) / 2);

            $(target_img).css('position', 'relative');
            $(target_img).css('top', '');
            $(target_img).css('left', left);
          }

          if(w_over_h_ratio < 1){
            $(target_img).css('width', preview_width);
            $(target_img).css('height', 'auto');

            top = -(($(target_img).height() - preview_height) / 2);

            $(target_img).css('position', 'relative');
            $(target_img).css('top', top);
            $(target_img).css('left', '');
          }
          //end handle display for 1:1 ratio
        };

        reader.readAsDataURL($(input)[0].files[0]);
    } else {
      // $(target).text(no_file_text);

      $(target_img).css('width', '1px');
      $(target_img).css('height', '1px');
      $(target_img).attr('src', 'http://placehold.it/1x1');
    }
  }
})($('[data-class=triggerUpload]'));

(function initMyChoice(obj){
  var api = obj.data('api');
  var target_id = obj.data('target-id');
  var target = $('#' + target_id);
  var action = obj.data('action');
  var active_class = obj.data('active-class');
  var max_count = obj.data('max-count');
  var current_count = obj.data('current-count');

  var fancybox_html = [];
  fancybox_html[0] = '自選標籤己達上限';

  $.each($(target).children(), function(i){
    $(this).on('click', function(){
      $(this).toggleClass(active_class);
      // var count = $(target).children('.' + active_class).length + current_count;
      var count = current_count;
      if (action === "remove")
        count = count - $(target).children('.' + active_class).length;
      else if(action === "add")
        count = count + $(target).children('.' + active_class).length;
      if(count > max_count){
        $(this).removeClass(active_class);
        $.fancybox(
            fancybox_html[0],
            {
              beforeLoad: function(){
                $("html").addClass("fancy_no_animation");
              },
              afterClose: function(){
                $("html").removeClass("fancy_no_animation");
              },
              'padding'         : 20,
              'maxWidth'        : 320,
              'maxHeight'       : 160,
              'width'           : '90%',
              'height'          : '90%',
              'openEffect'      : 'none',
              'closeEffect'     : 'none'
            }
          );
        }
    });
  });

  obj.on('click', function(){
    var self = $(this);
    var tags = [];

    $.each($(target).children('.' + active_class), function(i){
      tags.push($(this).data('tag-id'));
    });

    redirect(api, 'post', tags);
  });

  function redirect (url, method, data){
    data = JSON.stringify(data);
    var form = $('<form>', {
                  method: method,
                  action: url
                });
    var input = $('<input>', {
                  name: 'values',
                  type: 'text',
                  value: data
                });

    form.append(input);
    form.hide();
    $('body').append(form);
    form.submit();
  };

})($('.member__mychoice_tag #member_choice_confirm'));

(function initExpandMyChoice(obj){
  var display_text = ['展開所有標籤', '隱藏部分標籤'];
  var target_id = obj.data('target-id');
  var target = $('#' + target_id);
  var active_class = obj.data('active-class');
  var default_child_class = '[data-tag-id]';
  var width = $(target).width();
  var resized = false;
  var target_child_tag = $(default_child_class)[0];

  var tag_padding_top = 0;
  var tag_padding_bottom = 0;
  var tag_padding_left = 0;
  var tag_padding_right = 0;

  var tag_border_top = 0;
  var tag_border_bottom = 0;
  var tag_border_left = 0;
  var tag_border_right = 0;

  var tag_margin_top = 0;
  var tag_margin_bottom = 0;
  var tag_margin_left = 0;
  var tag_margin_right = 0;

  var target_inner_width = $(target).innerWidth();
  var target_inner_height = $(target).innerHeight();
  var max_tags_width = target_inner_width;
  var max_tags_height = 0;
  var max_tags_width_check = 0;
  var max_tags_height_check = 0;
  var row_counter = 0;
  var tag_height_calc = 0;

  $(document).ready(function(){
    evaluateMyChoice();

    if($(target).hasClass(active_class)){
      $(target).css('height', max_tags_height_check);
    } else {
      $(target).css('height', max_tags_height);
    }
  });

  $(obj).on('click', function(){
    evaluateMyChoice();
    if($(target).hasClass(active_class)){
      $(target).css('height', max_tags_height);
      $(target).removeClass(active_class);
      $(obj).text(display_text[0]);
    } else {
      $(target).css('height', max_tags_height_check);
      $(target).addClass(active_class);
      $(obj).text(display_text[1]);
    }
  });

  setInterval(function(){
    var new_width = $(target).width();
    if(new_width != width){
      width = new_width;
      resized = true;
    }

    if(resized){
      evaluateMyChoice();
      if($(target).hasClass(active_class)){
        $(target).css('height', max_tags_height_check);
      } else {
        $(target).css('height', max_tags_height);
      }
      resized = false;
    }
  }, 800);

  function evaluateMyChoice(){
    tag_padding_top = 0;
    tag_padding_bottom = 0;
    // tag_padding_left = 0;
    // tag_padding_right = 0;

    tag_border_top = 0;
    tag_border_bottom = 0;
    // tag_border_left = 0;
    // tag_border_right = 0;

    tag_margin_top = 0;
    tag_margin_bottom = 0;
    // tag_margin_left = 0;
    // tag_margin_right = 0;

    target_inner_width = $(target).innerWidth();
    target_inner_height = $(target).innerHeight();
    max_tags_width = target_inner_width;
    max_tags_height = 0;
    max_tags_width_check = 0;
    max_tags_height_check = 0;
    row_counter = 0;
    tag_height_calc = 0;

    if(typeof $(target_child_tag) !== 'undefined'){
      tag_padding_top = parseFloat($(target_child_tag).css('padding-top')) ? parseFloat($(target_child_tag).css('padding-top')) : 0;
      tag_padding_bottom = parseFloat($(target_child_tag).css('padding-bottom')) ? parseFloat($(target_child_tag).css('padding-bottom')) : 0;
      // tag_padding_left = parseFloat($(target_child_tag).css('padding-left'));
      // tag_padding_right = parseFloat($(target_child_tag).css('padding-right'));

      tag_border_top = parseFloat($(target_child_tag).css('border-top')) ? parseFloat($(target_child_tag).css('border-top')) : 1;
      tag_border_bottom = parseFloat($(target_child_tag).css('border-bottom')) ? parseFloat($(target_child_tag).css('border-bottom')) : 1;
      // tag_border_left = parseFloat($(target_child_tag).css('border-left'));
      // tag_border_right = parseFloat($(target_child_tag).css('border-right'));

      tag_margin_top = parseFloat($(target_child_tag).css('margin-top')) ? parseFloat($(target_child_tag).css('margin-top')) : 0;
      tag_margin_bottom = parseFloat($(target_child_tag).css('margin-bottom')) ? parseFloat($(target_child_tag).css('margin-bottom')) : 0;
      // tag_margin_left = parseFloat($(target_child_tag).css('margin-left'));
      // tag_margin_right = parseFloat($(target_child_tag).css('margin-right'));

      tag_height_calc = $(target_child_tag).height() + tag_padding_top + tag_padding_bottom +
                            tag_border_top + tag_border_bottom +
                            tag_margin_top + tag_margin_bottom; //+ 3; // add 3 pixels due to position spacing

      var width_checker = 0;
      $.each($(default_child_class), function(i){
        var tag_width_calc = 0;
        tag_width_calc = $(this).parent().width();
        max_tags_width_check += tag_width_calc;
        width_checker += tag_width_calc;

        if(width_checker > max_tags_width){
          row_counter ++;
          width_checker = tag_width_calc;
        }
      });

      if(width_checker > 0) row_counter ++;

      max_tags_height_check = row_counter * tag_height_calc;
      max_tags_height = 2 * tag_height_calc;

      if(max_tags_height_check >= max_tags_height){
        $(obj).show();
      }
    }
  }
})($('[data-class=tag_explan]'));

(function initBookmarkListing(obj){
  var api = obj.data('api');
  var target_id = obj.data('target-id');
  var target = $('#' + target_id);

  $.each($('.bookmark_menu__clickall'), function(i){
    $(this).on('click', function(){
      if ( $('[type=checkbox]', this).prop('checked') ){
        $('.bookmark_menu__clickall [type=checkbox]').prop('checked', true);
        $(target).children().find('[type=checkbox]').prop('checked', true);
      } else {
        $('.bookmark_menu__clickall [type=checkbox]').prop('checked', false);
        $(target).children().find('[type=checkbox]').prop('checked', false);
      }
    });
  });

  obj.on('click', function(){
    var self = $(this);
    var article_ids = [];

    $.each($(target).children().find('[type=checkbox]'), function(i){
      if( $(this).prop('checked') )
        article_ids.push($(this).data('article-id'));
    });
    redirect(api, 'post', article_ids);
  });

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function redirect (url, method, data){
    data = JSON.stringify(data);
    var form = $('<form>', {
                  method: method,
                  action: url
                });
    var input = $('<input>', {
                  name: 'values',
                  type: 'text',
                  value: data
                });

    form.append(input);
    form.hide();
    $('body').append(form);
    form.submit();
  };

})($('[data-class=bookmark_list_remove]'));

(function initBookmarkListingAddRemove(obj){
  var actions = ['add', 'remove'];
  var tooltip = ['加入書簽', '從書簽移除'];
  var api;
  var action;
  var article_id = $(obj).data('article-id');
  var baseURL = $(obj).data('base-url');
  var target_class = $(obj).data('target-class');
  var target_obj = $('[data-class='+ target_class +']');
  var fancybox_html = [];
  var bookmarks;
  var bookmark_list = [];

  //not logged in
  fancybox_html[0] =  '<div id="mychoice">' +
                      '<div class="brief">' +
                      '<h2>加入「我的收藏文章」</h2>' +
                      '<div class="points point_1">' +
                      '<img src="' + baseURL + 'assets/images/img_bookmark_pic1.png">' +
                      '<b>功能一：</b><br>' +
                      '將文章儲起，稍後閱讀' +
                      '</div><!-- end of point 1 -->' +
                      '<div class="points point_2">' +
                      '<img src="' + baseURL + 'assets/images/img_bookmark_pic2.png">' +
                      '<b>功能二：</b><br>' +
                      '最多可儲起125篇文章' +
                      '</div><!-- end of point 2 -->' +
                      '</div><!-- end of brief -->' +
                      '<div class="login">' +
                      '<h2>登入或註冊</h2>' +
                      '<a href="' + baseURL + 'member/login" class="alreadymember">登入</a>' +
                      '<a href="' + baseURL + 'member/registration" class="notyetmember">註冊成為會員</a>' +
                      '</div>' +
                      '</div>';
  fancybox_html[1] = '已加入至<br/>我的收藏文章'; //logged in
  fancybox_html[2] = '已從我的收藏文章移除'; //logged in

  get_bookmark_localstorage();
  checkBookmark(parseInt(article_id), bookmark_list);

  obj.on('click', function(e){
    api = $(this).data('api');
    action = $(this).data('action');
    get_bookmark_localstorage();

    $.ajax({
          method: 'get',
          url: api.replace('{ACTION}', action),
          dataType: 'json',
          crossDomain: true,
          // headers: {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin' : '*'},
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          xhrFields: { withCredentials: true },
          success: function (data, status, xhr) {
            var result = data.bookmarked_ids;
            var return_bookmarks = result;
            var status = -1;
            var action_key;

            $(return_bookmarks).each(function(i){
              return_bookmarks[i] = parseInt(return_bookmarks[i]);
            });

            checkBookmark(parseInt(article_id), return_bookmarks);
            set_localstorage("hk01_subscribed_bookmark", result);

            if(result === false){
              $(target_obj).html(fancybox_html[0]);
            }
          },
          complete: function (xhr) {
            $.fancybox(
              $(target_obj).html(),
              {
                beforeLoad: function(){
                  $("html").addClass("fancy_no_animation");
                },
                afterClose: function(){
                  $("html").removeClass("fancy_no_animation");
                },
                'padding'         : 20,
                'maxWidth'        : 960,
                'maxHeight'       : 600,
                'width'           : '90%',
                'height'          : '90%',
                'openEffect'      : 'none',
                'closeEffect'     : 'none'
              }
            );
          }
        });
  });

  function checkBookmark(article_id, article_list){
    var status = -1;
    var action_key;
    status = $.inArray( (article_id), article_list );
    if (status == -1){
      action_key = 0;
      $('[data-class=bookmark]').each(function(){
        $(this).removeClass('active');
        $(this).data('action', actions[action_key]);
        $(this).attr('title', tooltip[action_key]);
      });
      $(target_obj).html(fancybox_html[2]);
    }
    if (status >= 0){
      action_key = 1;
      $('[data-class=bookmark]').each(function(){
        $(this).addClass('active');
        $(this).data('action', actions[action_key]);
        $(this).attr('title', tooltip[action_key]);
      });
      $(target_obj).html(fancybox_html[1]);
    }

    if(article_list === null){
      $(target_obj).html(fancybox_html[0]);
    }
  }


  function get_bookmark_localstorage(){
    bookmarks = get_localstorage('hk01_subscribed_bookmark');
    if(bookmarks == "" || bookmarks == null ){
      $(target_obj).html(fancybox_html[0]);
      bookmark_list = [];
    }

    if(bookmarks !== "" || bookmarks != null){
      $.each( bookmarks, function(key, value){
        bookmark_list.push(parseInt(value));
      });
    }
    return true;
  }

})($('[data-class=bookmark]'));

/* TODO: might need this for sign in/up */
(function initProfileMenuSticky(obj){
  var width = $(obj).innerWidth();
  var min_width = false;
  var max_width = false;
  var target = $('[data-id=' + $(obj).data('target-id') + ']');
  var target_height = $('[data-id=' + $(target).data('target-id') + ']').parent().height();
  var window_width = window.innerWidth;
  var window_height = $(window).innerHeight();
  var top_check = $('header').height();
  var sticky_top = $('header .menu__main--inner').height();
  var scroll_top;
  var bottom_check;
  var sticky_bottom;
  var resized = true;

  $(obj).parent().css('height', target_height);

  if(typeof $(obj).data('min-width') !== 'undefined' && !isNaN(parseInt($(obj).data('min-width')))){
    min_width = parseInt($(obj).data('min-width'));
  }
  if(typeof $(obj).data('max-width') !== 'undefined' && !isNaN(parseInt($(obj).data('max-width')))){
    max_width = parseInt($(obj).data('max-width'));
  }
  doProfileSticky();

  $(window).on('scroll', function(){
    doProfileSticky();

  });

  function doProfileSticky(){
    var is_sticky_range = false;
    scroll_top = $(window).scrollTop();
    $(obj).parent().css('height', '');

    $(obj).css('width', '');
    $(obj).css('position', '');
    $(obj).css('top', '');

    target_height = $('[data-id=' + $(target).data('target-id') + ']').parent().height();

    if( min_width == false || (min_width != false && window_width >= min_width) ){
      is_sticky_range = true;
    } else {
      is_sticky_range = false;
    }

    if( max_width == false || (max_width != false && window_width < max_width) ){
      is_sticky_range = is_sticky_range && true;
    } else {
      is_sticky_range = is_sticky_range && false;
    }

    if(is_sticky_range){
      $(obj).parent().css('height', target_height);

      bottom_check = $('footer .sticky').length > 0 ? $('footer .sticky').height() : $('footer').height();
      sticky_bottom = bottom_check;

      if(scroll_top > top_check){
        $(obj).css('width', 'inherit');
        $(obj).css('position', 'fixed');
        $(obj).css('top', sticky_top);
      } else {
        $(obj).css('width', '');
        $(obj).css('position', '');
        $(obj).css('top', '');
      }
      if( window_height - sticky_top - sticky_bottom - $(obj).height() <= 0 ){
        var diff_top = window_height - sticky_bottom - $(obj).height();
        $(obj).css('top', diff_top);
      }
    }

    // setTimeout(function(){
    //   var right_content = $('[data-id=right_content]');
    //   var right_side_height = $(right_content).innerHeight() + parseInt($(right_content).css('padding-top')) + parseInt($(right_content).css('padding-bottom'));
    //                           //+ parseInt($(right_content).css('margin-top')) + parseInt($(right_content).css('margin-bottom'));
    //   if(is_sticky_range){
    //     $(obj).parent().css('height', right_side_height);
    //   }
    // }, 500);
  }

  $('[data-id=my_profile_content_toggle]').on('click', function(){
    var target = $('[data-id=' + $(this).data('target-id') + ']');
    var toggleClass = [];
    toggleClass[1] = 'on';
    toggleClass[0] = 'off';

    if( $(target).hasClass(toggleClass[1]) ){
      $(target).removeClass(toggleClass[1]);
      $(target).addClass(toggleClass[0]);
    } else {
      $(target).removeClass(toggleClass[0]);
      $(target).addClass(toggleClass[1]);
    }
  });

  setInterval(function(){
    var new_window_width = window.innerWidth;
    if(new_window_width != window_width){
      window_width = new_window_width;
      $(obj).css('height', '');
      resized = true;
    }

    if(resized){
      doProfileSticky();
      resized = false;
    }
  }, 800);

})($('[data-class=profile_menu_sticky]'));

window.addEventListener('load', function() {
  var box2 = document.getElementById('touch_submenu_wrapper_container'),
  boxtop, // left position of moving box
  starty, // starting x coordinate of touch point
  dist = 0, // distance traveled by touch point
  touchobj = null, // Touch object holder
  submenu_height = 0,
  menu_submenu_dh = $(window).height();

  $('header .menu__submenu #touch_submenu_wrapper_container').css("top", 0);

  if(box2){
    box2.addEventListener('touchstart', function(e){
      var topmenubtn_pos = 0;
      if (  $(".menu__main .menu-toggle-btn").hasClass("open")){
        if ($("menu__main--fix").hasClass("sticky")){
          topmenubtn_pos = $(window).scrollTop() - $('.menu__main').offset().top;
        }
        else{
          topmenubtn_pos = $(window).scrollTop() - $('.menu__main').offset().top + 10;
        }
      }
      touchobj = e.changedTouches[0] // reference first touch point
      boxtop = parseInt(box2.style.top) // get top position of box
      starty = parseInt(touchobj.clientY) // get y coord of touch point
      submenu_height = $('header .menu__submenu').outerHeight(true);
      menu_submenu_dh = $(window).height() - submenu_height + topmenubtn_pos - 60;
    }, false)

    box2.addEventListener('touchmove', function(e){
      touchobj = e.changedTouches[0] // reference first touch point for this event
      var dist = parseInt(touchobj.clientY) - starty // calculate dist traveled by touch point
      if(menu_submenu_dh < 0 ){
        box2.style.top = ( (boxtop + dist < menu_submenu_dh)? menu_submenu_dh : (boxtop + dist > 0)? 0 : boxtop + dist ) + 'px'
      }
      e.preventDefault()
    }, false)
  }

}, false);

(function (window) {
  window.TEMPLATES = window.TEMPLATES || {};

  window.TEMPLATES['blogger_article_list'] = function (data) {
    var items = [];

    if (data.article_list && Array.isArray(data.article_list)) {
      data = data.article_list;
      for (var i in data) {
        var item = data[i];
        var lead = (item.lead || '');
        //lead = lead.substring(0, <?= EXCERPT_LENGTH_SECTION_LISTING ?>);
        items.push(
'<div class="blog_listing__item">' +
  '<a target="_blank" href="' + item.ajax_article_link + '">' +
    '<div class="blog_listing__item__img ' + (item.has_video && item.has_video == true ? 'video' : '') + '">' +
      '<img src="' + item.ajax_main_image + '">' +
        (item.is_sponsor && item.is_sponsor == "1" ?
          '<div class="sponsor_tag">贊助內容</div>'
        : '') +
        (item.is_featured && item.is_featured == "1" ?
          '<div class="editor_pick">精選</div>'
        : '') +
    '</div>' +
    '<div class="blog_listing__item__content">' +
      '<div class="blog_listing__item__content__tag">' +
        '<tag>' + item.main_category + '</tag>' +
      '</div>' +
      '<div class="blog_listing__item__content__tit"><h3 class="name">' + item.ajax_blogger_name + '</h3><h3>' + (item.title || '') + '</h3></div>' +
      '<div class="blog_listing__item__content__caption">' + lead + '</div>' +
      '<div class="blog_listing__item__content__time"><span class="clock">' + moment(item.publish_start_time, 'YYYY-MM-DD HH:mm:ss', true).fromNow() + '</span></div>' +
    '</div>' +
  '</a>' +
'</div>'
        );
      }
    }

    return items.join('');
  };
})(window);

(function (window) {
  window.TEMPLATES = window.TEMPLATES || {};

  window.TEMPLATES['blogger_list'] = function (data) {
    var items = [];

    if (data.blogger && Array.isArray(data.blogger)) {
      data = data.blogger;
      for (var i in data) {
        var item = data[i];
        items.push(
          '<a target="_blank" href="' + item.ajax_blogger_link + '" class="blogger_listing_profile__item">' +
              '<div class="blogger_listing_profile__item__img"><img src="' + item.ajax_avatar + '">' +
                  (false && item.is_vip && item.is_vip == "1" ?
                  '<div class="blog_tag">名人</div>'
                  : '') +
                  (false && item.is_favor && item.is_favor == "1" ?
                  '<div class="blog_tag">達人</div>'
                  : '') +
              '</div>' +
              '<div class="blogger_listing_profile__item__content">' +
                  '<div class="blogger_listing_profile__item__content__name">' + (item.publish_name ? item.publish_name : '') + '</div>' +
                  '<div class="blogger_listing_profile__item__content__info">' + (item.title ? item.title : '') + '</div>' +
              '</div>' +
          '</a>'
        );
      }
    }

    return items.join('');
  };


  window.TEMPLATES['blog_grid_16to9'] = function (data) {
    var items = [];
    if (data['article_list']) {
      for (var i in data['article_list']) {
        var item = data['article_list'][i];
        items.push(
          '<div class="blog_grid_16to9__item">' +
            '<a target="_blank" href="' + item.link + '">' +
              '<div class="blog_grid_16to9__img ' + (item.has_video ? 'video' : '') + '">' +
                '<img src="' + item.main_image.path_16_9 + '">' +
                (+item.is_sponsor ?
                  '<div class="sponsor_tag">贊助內容</div>'
                : '') +
              '</div>' +
              '<div class="blog_grid_16to9__content">' +
                '<div class="blog_grid_16to9__content__tit">' + item.title + '</div>' +
              '</div>' +
            '</a>' +
          '</div>'
        );
      }
    }
    return items.join('');
  };

  window.TEMPLATES['blog_grid_16to9_large'] = function (data) {
    var items = [];

    if (data['article_list']) {
      for (var i in data['article_list']) {
        var item = data['article_list'][i];
        items.push(
          '<div class="blog_grid_16to9__item large">' +
            '<a target="_blank" href="' + item.link + '">' +
              '<div class="blog_grid_16to9__img ' + (item.has_video ? 'video' : '') + '">' +
                '<img src="' + item.main_image.path_16_9_large + '">' +
                (+item.is_sponsor ?
                  '<div class="sponsor_tag">贊助內容</div>'
                : '') +
              '</div>' +
              '<div class="blog_grid_16to9__content">' +
                '<div class="blog_grid_16to9__content__tit"><h3>' + item.title + '</h3></div>' +
              '</div>' +
            '</a>' +
          '</div>'
        );
      }
    }
    return items.join('');
  };




  window.TEMPLATES['my_choice'] = function (data) {
    var items = [];

    if (Array.isArray(data)) {
      for (var i in data) {
        var item = data[i];
        var tags = item.tags;
        var tag_html = '';
        var publish_time = moment(item.publish_start_time, 'YYYY-MM-DD HH:mm:ss', true);

        $(tags).each(function(tag_index){
          tag_html += '<tag>' + tags[tag_index].name + '</tag>';
        });

        if (publish_time.isValid()) {
          if(publish_time.diff(moment(), 'hours') <= -23){
            publish_time = moment(publish_time).format('LL');
          } else {
            publish_time = publish_time.fromNow();
          }
        }

        items.push(
          '<div class="blog_listing__item">' +
            '<a href="' + item.link + '">' +
              '<div class="blog_listing__item__img ' + (item.has_video && item.has_video == true ? 'video' : '') + '">' +
                '<img src="' + item.image + '">' +
                  (+item.is_sponsor == '1' ?
                    '<div class="sponsor_tag">贊助內容</div>'
                  : '') +
                  // (+item.is_feature == '1' ?
                  //   '<div class="editor_pick">精選</div>'
                  // : '') +
              '</div>' +
              '<div class="blog_listing__item__content">' +
                '<div class="blog_listing__item__content__tag">' +
                '<tag>' + item.main_category + '</tag>' +
                tag_html +
                '</div>' +
                '<div class="blog_listing__item__content__tit"><h3>' + (item.title || '') + '</h3></div>' +
                '<div class="blog_listing__item__content__caption">' + (item.lead || '') + '</div>' +
                '<div class="blog_listing__item__content__time"><span class="clock">' + publish_time + '</span></div>' +
              '</div>' +
            '</a>' +
          '</div>'
        );
      }
    }

    return items.join('');
    };


    window.TEMPLATES['member_bookmark'] = function (data) {
    var items = [];

    if (Array.isArray(data)) {
      for (var i in data) {
        var item = data[i];
        var tags = item.tags;
        var tag_html = '';
        var publish_time = moment(item.publish_start_time, 'YYYY-MM-DD HH:mm:ss', true);

        $(tags).each(function(tag_index){
          tag_html += '<tag>' + tags[tag_index].name + '</tag>';
        });

        if (publish_time.isValid()) {
          if(publish_time.diff(moment(), 'hours') <= -23){
            publish_time = moment(publish_time).format('LL');
          } else {
            publish_time = publish_time.fromNow();
          }
        }

        items.push(
          '<div class="blog_listing__item">' +
            '<div class="blog_listing__item__img ' + (item.has_video && item.has_video == true ? 'video' : '') + '">' +
              '<div class="bookmark_checkbox"><input type="checkbox" data-article-id="' + item.article_id + '"></div>' +
              '<img src="' + item.image + '">' +
                (+item.is_sponsor == '1' ?
                  '<div class="sponsor_tag">贊助內容</div>'
                : '') +
                // (+item.is_feature == '1' ?
                //   '<div class="editor_pick">精選</div>'
                // : '') +
            '</div>' +
            '<a href="' + item.link + '">' +
              '<div class="blog_listing__item__content">' +
                '<div class="blog_listing__item__content__tag">' +
                  '<tag>' + item.main_category + '</tag>' +
                  tag_html +
                '</div>' +
                '<div class="blog_listing__item__content__tit"><h3>' + (item.title || '') + '</h3></div>' +
                '<div class="blog_listing__item__content__caption">' + (item.lead || '') + '</div>' +
                '<div class="blog_listing__item__content__time"><span class="clock">' + publish_time + '</span></div>' +
              '</div>' +
            '</a>' +
          '</div>'
        );
      }
    }

    return items.join('');
    };

})(window);
