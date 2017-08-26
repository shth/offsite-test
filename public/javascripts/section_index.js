(function (window) {
  window.TEMPLATES = window.TEMPLATES || {};

  window.TEMPLATES['blog_listing'] = function (data) {
    var items = [];

    if (data['article_list']) {
      for (var i in data['article_list']) {
        var item = data['article_list'][i];
        var publish_time = moment(item.publish_start_time, 'YYYY-MM-DD HH:mm:ss', true);

        if (publish_time.isValid()) {
          if(publish_time.diff(moment(), 'hours') <= -23){
            publish_time = moment(publish_time).format('LL');
          } else {
            publish_time = publish_time.fromNow();
          }
        }

        items.push(
          '<div class="blog_listing__item normal">' +
            '<a target="_blank" href="' + item.link + '">' +
              '<div class="blog_listing__item__img ' + (item.has_video ? 'video' : '') + '">' +
                '<img src="' + item.main_image.path_16_9 + '">' +
                  (+item.is_sponsor == '1' ?
                    '<div class="sponsor_tag">贊助內容</div>'
                  : '') +
                  // (+item.is_featured ?
                  //   '<div class="editor_pick">精選</div>'
                  // : '') +
              '</div>' +
              '<div class="blog_listing__item__content">' +
                '<div class="blog_listing__item__content__tag">' +
                  '<tag>' + item.main_category + '</tag>' +
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
