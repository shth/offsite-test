(function (container) {
	var adplace = $("section.homepage").data("adplace");
	if(typeof(adplace) === 'undefined') adplace = "";
	var section_id = $(container).data("sectionid");
	var channel_id = $(container).data("channelid");
	var dfp_ads_timer;
	var phone_version = get_phone_version();
	
	if(container) {
		googletag.cmd.push(function () {
			var adSlot = googletag.defineOutOfPageSlot('/108346865/HK01_MobileWebsite_SplashAd', "overlay_ad_without_banner")
			.setTargeting("category_id",section_id)
			.setTargeting("channel_id",channel_id)
			.setTargeting("ads_place",adplace)
			.setTargeting("phone_version",phone_version)
			.setTargeting("banner","NO")
			.addService(googletag.pubads());
			googletag.pubads().collapseEmptyDivs();
			googletag.pubads().enableSingleRequest
			googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				if(event.slot === adSlot) {
					if(!event.isEmpty) {
						$(container).css('display','inline-block');
						$(container).popup('show');
					} else {
						$(container).css('display','none');
						$(container).popup('hide');
					}
				}
			});
			googletag.enableServices();
		});
		
		$(container).popup({
			autoopen: false,
			scrolllock: false,
			background: true,
			closebutton: true,
			horizontal: 'center',
			transition: 'all 0.5s',
			vertical: 'middle',
			onopen: function() {
				dfp_ads_timer = setInterval(function(){
					$(container).css('display','none');
					$(container).popup('hide');
				}, 15000);
			},
			onclose: function() {
				$(container).css('display','none');
				clearInterval(dfp_ads_timer);
			}
		});
	}
	
	function get_phone_version() {
		var pv = "OTHER"
		if(navigator.userAgent.match(/iPhone/i) !== null) {
			if(window.screen.height <= 480) pv = "IP4";
			else if(window.screen.height <= 568) pv = "IP5";
			else if(window.screen.height <= 667) pv = "IP6";
			else pv = "IPP";
		} else if(navigator.userAgent.match(/Android/i) !== null) {
			pv = "ANDROID";
		}
		return pv;
	}
})(document.getElementById("overlay_ad_without_banner"));

(function (container) {
	var adplace = $("section.homepage").data("adplace");
	if(typeof(adplace) === 'undefined') adplace = "";
	var section_id = $(container).data("sectionid");
	var channel_id = $(container).data("channelid");
	var isBottom = false;
	var banner = ".bn_ads";
	var sticky = "sticky_0";
	var dfp_ads_timer;
	var phone_version = get_phone_version();
	var banner_img_link = $(banner).data("banner");
	
	if(container) {
		googletag.cmd.push(function () {
			var adSlot = googletag.defineOutOfPageSlot('/108346865/HK01_MobileWebsite_SplashAd', "overlay_ad_with_banner")
			.setTargeting("category_id",section_id)
			.setTargeting("channel_id",channel_id)
			.setTargeting("ads_place",adplace)
			.setTargeting("phone_version",phone_version)
			.setTargeting("banner","YES")
			.addService(googletag.pubads());
			googletag.pubads().collapseEmptyDivs();
			googletag.pubads().enableSingleRequest
			googletag.pubads().addEventListener('slotRenderEnded', function(event) {
				if(event.slot === adSlot) {
					if(!event.isEmpty) {
						$(banner).css("background-image","url('"+banner_img_link+"')");
						$(container).css('display','inline-block');
						$(container).popup('show');
					} else {
						$(container).css('display','none');
						$(container).popup('hide');
					}
				}
			});
			googletag.enableServices();
		});
		
		$(container).popup({
			autoopen: false,
			scrolllock: false,
			background: true,
			closebutton: true,
			horizontal: 'center',
			transition: 'all 0.5s',
			vertical: 'middle',
			onopen: function() {
				$(banner).fadeOut(1000);
				$("body").css("margin","0");
				dfp_ads_timer = setInterval(function(){
					$(container).css('display','none');
					$(container).popup('hide');
				}, 15000);
			},
			onclose: function() {
				if($('footer').has('.sticky').length > 0) sticky = "sticky_50";
				if(!isBottom) $(banner).addClass(sticky);
				
				$(banner).fadeIn(1000);
				$("body").css("overflow", "auto");
				$("body").css("position", "initial");
				$(container).css('display','none');
				clearInterval(dfp_ads_timer);
			}
		});
		
		$(banner).on('click',function() {
			$(container).css('display','inline-block');
			$(container).popup('show');
		});

		var timeout = null;
		$(window).on('scroll',function() {
			var windowHeight = $(window).height();
			var windowScrollBottom = $(window).scrollTop() + windowHeight;
			var footer_lower_offset_top = $('.footer__lower').offset().top-50;
			if(windowScrollBottom >= footer_lower_offset_top) {
				if($('footer').not(banner).has('.sticky').length <= 0) $(banner).removeClass(sticky);
				isBottom = true;
			} else {
				$(banner).addClass(sticky);
				isBottom = false;
			}
			
			$(banner).css('opacity','0.6');
			clearTimeout(timeout);
			timeout = setTimeout(function(){
				$(banner).css('opacity','1');
			},100);
		});

		$(banner + ' > div').on('click',function() {
			$(banner).unbind('click');
			$(banner).fadeOut(1000);
		});
	}
	
	function get_phone_version() {
		var pv = "OTHER"
		if(navigator.userAgent.match(/iPhone/i) !== null) {
			if(window.screen.height <= 480) pv = "IP4";
			else if(window.screen.height <= 568) pv = "IP5";
			else if(window.screen.height <= 667) pv = "IP6";
			else pv = "IPP";
		} else if(navigator.userAgent.match(/Android/i) !== null) {
			pv = "ANDROID";
		}
		return pv;
	}
})(document.getElementById("overlay_ad_with_banner"));