"use strict";

/* TODO: might need this for sign in/up */
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}


(function($){
	//console.log("Subscribe.js loaded");
	$('#btnSubmit').click(function(e){
		e.preventDefault();
		$(this).prop('disabled', true);
		//var email = $("#subscribe :input[name='email']").val();
		var email = $(this).parent().parent().find("input[name='email']").val();
		var emailObj = $(this).parent().parent().find("input[name='email']");
		var result = isValidEmailAddress(email);
		if(result){
			$(this).html('處理中...');
			$.ajax({
				type: "POST",
				url: "/Pages/subscribe",
				data: {ns_email:email},
				cache: false,
				success: function(result){
					$('#btnSubmit').parent().html('多謝支持，你已成功登記。\n《香港01》將稍後向你發放網站的特選內容。');
					$(emailObj).val( '' );
				},
				error: function(result){
					$('#btnSubmit').prop('disabled', false);
					$('#btnSubmit').html('<span class="icon-arrow-right"></span>立即訂閱');
				}
			});
		} else {
			alert('請填寫正確電郵地址');
			$(this).prop('disabled', false);
		}
	});

})(jQuery);


(function($){
	$('#submitNow').click(function(e){
		e.preventDefault();
		$(this).prop('disabled', true);
		var em = $("#em").val();
		var mc = $("#mc").val();
		var attendance = $("input[type='radio'][name='attendance']:checked").val();
		
		if(em && mc && attendance){
			$(this).html('處理中...');
			$.ajax({
				type: "POST",
				url: "/Pages/invitationSubmit",
				data: {em:em,mc:mc,attendance:attendance},
				cache: false,
				success: function(result){
					if (result == 'success') {
									$("#form_submit").hide();
									$("#msgThanks").show();
					}else {
									$("#form_submit").hide();
									$("#msgError").show();
					}
				},
				error: function(result){
					$("#form_submit").hide();
					$("#msgError").show();							
				}
			});
		}
	});

})(jQuery);


(function($){
     $('#btnSpaceSubmit').click(function(e){
         e.preventDefault();
         $(this).prop('disabled', true);
         $('#sMsg1').css('visibility', 'hidden');
         $('#sMsg2').css('visibility', 'hidden');
         $('#sMsg3').css('visibility', 'hidden');
        
         $('#spaceFormMessage').css('visibility', 'hidden');
        
         var sGender = $("input[type='radio'][name='sGender']:checked").val();
         var sLname  = $("#sLname").val();
         var sFname  = $("#sFname").val();
         var sEmail = $(this).parent().parent().find("input[name='sEmail']").val();
         var emailObj = $(this).parent().parent().find("input[name='sEmail']");
         if(sLname=="") $('#sMsg1').css('visibility', 'visible');
         if(sFname=="") $('#sMsg2').css('visibility', 'visible');
         var result = isValidEmailAddress(sEmail);
         if(result==false) $('#sMsg3').css('visibility', 'visible');
        
         if(result && sLname!="" && sFname!="" ){
             $(this).html('處理中...');
             $.ajax({
                 type: "POST",
                 url: "/space/spaceSubmit",
                 data: {sGender:sGender,sFname:sFname,sLname:sLname,sEmail:sEmail},
                 cache: false,
                 success: function(output){
                     var resultoutput = jQuery.parseJSON(output);
                     var messageOutput = "";
                     if(resultoutput.state=="duplicate"){
                         messageOutput = "多謝支持，您已成功登記。";
                     }else{
                         messageOutput = "多謝支持，您已成功登記。01空間將會寄出確認電郵到您的電子郵箱，請檢查及確認登記的資料。";
                     }
                     $('#sLname').val( '' );
                     $('#sFname').val( '' );
                     $(emailObj).val( '' );
                     $('#sMsgSuccess').parent().html(messageOutput);
                     $('#spaceForm').css('display', 'none');
                     $('#spaceFormMessage').css('visibility', 'visible');
                 },
                 error: function(output){
                     $('#btnSpaceSubmit').prop('disabled', false);
                     $('#btnSpaceSubmit').html('<span class="icon-arrow-right"></span>確認發送');
                 }
             });
         } else {
            
             $(this).prop('disabled', false);
         }
     });
 })(jQuery);

 (function($){
     $('#btnSubmitForm').click(function(e){
        e.preventDefault();
        $(this).prop('disabled', true);

        var items = [];
        var form_obj = $('[data-id=' + $(this).data('target-id') + ']');
        var api = $(form_obj).data('api');
        var result = true;
        var template = '<div class="left" style="color:red; display:none"> (請填寫{INPUT})</div>'
        var messageType = $(this).data('message-type');
		console.log(messageType);
		
        var message = [];   
        message['DEFAULT'] = '多謝支持，您已成功登記。<br>01空間將會寄出【報名確認】電郵到您的電子郵箱，請檢查並於當日入場時出示電郵。';
        message['0608END'] = '多謝支持，我們將於講座前電郵通知您有關直播詳情及提供講者準備之筆記。<br>如有查詢，請電郵：<a href="mailto:hk01space@hk01.com">hk01space@hk01.com</a>'
        message['0625'] = '多謝支持，您已成功登記。<br>01空間將會寄出【報名確認】電郵到您的電子郵箱，請檢查並於當日入場時出示電郵。';
		message['07161'] = '多謝支持，您已成功加為後補名單。<br>01空間將會寄出【登記確認】電郵到您的電子郵箱，請檢查並留意有關後補位置的電郵。';
		message['seminar_20160924'] = '多謝支持！<br><br>如成功報名，01空間將於9月19日前寄出【報名確認】電郵到您的電子郵箱，請檢查並於當日入場時出示該電郵。<br><br>是次活動安排，香港國際攝影節擁有最終決定權。';
		message['seminar_20160916'] = '多謝支持！<br><br>成功登記參加人士，將會在9月16日下午4時收到香港01發出的【報名確認】電郵訊息，電郵內並會附上直播連結。<br><br>是次活動安排，香港01及相關主辦單位將保留最終決定權。';

		message['seminar_20161027'] = '<div style="color:green;text-align:center;font-size: x-large;">';
		message['seminar_20161027'] += '健康農莊的優惠推廣碼為hk01<br>';
		message['seminar_20161027'] += '推廣碼有效期為2016年11月1日至2017年4月30日<br>';
		message['seminar_20161027'] += '逾期無效</div><br>';
		message['seminar_20161027'] += '<div style="color:black;text-align:left;">';
		message['seminar_20161027'] += '使用方法<br>';
		message['seminar_20161027'] += '步驟一：到<a href="http://kasetfarm.com.hk/" target=_blank>健康農莊</a>的功能列表中，選「訂購表格」<br>';
		message['seminar_20161027'] += '步驟二：於訂購表格的「姓氏」欄中，輸入姓氏後，再輸入優惠推廣碼以作識別<br>';
		message['seminar_20161027'] += '步驟三：選購產品然後提交<br>';
		message['seminar_20161027'] += '步驟四：健康農莊的客戶服務部會聯絡閣下確認訂單及預約送貨時間<br>';
		message['seminar_20161027'] += '步驟五：送貨當天，貨到現金收付，不設找贖<br><br>';
		message['seminar_20161027'] += '條款及細則: <a href="http://www.hk01.com/article/48002" target=_blank>http://www.hk01.com/article/48002</a></div>';
		
		message['seminar_20161028'] = '<div style="color:green;text-align:center;font-size: x-large;">';
		message['seminar_20161028'] += '零食大王的優惠劵代碼為hk01member2017<br>';
		message['seminar_20161028'] += '有效期為2016年11月1日至2017年12月31日<br>';
		message['seminar_20161028'] += '逾期無效</div><br>';
		message['seminar_20161028'] += '<div style="color:black;text-align:left;">';
		message['seminar_20161028'] += '使用方法<br>';
		message['seminar_20161028'] += '步驟一：登入或註冊成為<a href="http://www.lingsik.com/" target=_blank>零食大王</a>會員<br>';
		message['seminar_20161028'] += '步驟二：選購零食「加入購買車」<br>';
		message['seminar_20161028'] += '步驟三：選購後，在右上方「我的購買車」選「我的購買車」（請勿選「結賬」）<br>';
		message['seminar_20161028'] += '步驟四：核對購物車內的商品後，輸入「優惠劵代碼」，然後按「繼續結賬」<br>';
		message['seminar_20161028'] += '步驟五：填寫「送貨資料 及 賬單資料」、「付款方法」及「查看訂單」後，按「確認訂單」，即完成購買程序<br><br>';
		message['seminar_20161028'] += '條款及細則: <a href="http://www.hk01.com/article/50488" target=_blank>http://www.hk01.com/article/50488</a></div>';		
		
		message['seminar_20161104'] = '<div style="color:green;text-align:center;font-size: x-large;">';
		message['seminar_20161104'] += 'Melissa的折扣代碼為:<br>1. 正價貨品: MelissaHK01RP<br>2. FW2016 Flower boot: MelissaHK01FB<br>';
		message['seminar_20161104'] += '推廣碼有效期為2016年11月7日至2017年5月6日<br>';
		message['seminar_20161104'] += '逾期無效</div><br>';
		message['seminar_20161104'] += '<div style="color:black;text-align:left;">';
		message['seminar_20161104'] += '使用方法<br>';
		message['seminar_20161104'] += '步驟一：到<a href="http://www.mdreams.com" target=_blank>網站</a>登入或註冊成為會員<br>';
		message['seminar_20161104'] += '步驟二：選購後, 添加到購買車<br>';
		message['seminar_20161104'] += '步驟三：核對購物車內的商品後，輸入「折扣代碼」，然後按「結賬」<br>';
		message['seminar_20161104'] += '步驟四：填寫「賬單信息」、「運送信息」、「運送方式」及「支付信息」後，按「確認訂單」，即完成購買程序<br>';
		message['seminar_20161104'] += '條款及細則: <a href="http://www.hk01.com/article/52094" target=_blank>http://www.hk01.com/article/52094</a></div>';		
		
        if(typeof messageType == 'undefined' || messageType == "")
            messageType = 'DEFAULT';

        $('input[type=text]').each(function(i){
         	var fieldname = $(this).attr('name');
         	var error = '';

         	if(fieldname != '' || typeof fieldname != 'undefined'){
         		if( $(this).val() == ""){
	         		result = false;
	         		error = template.replace('{INPUT}', $(this).attr('title'));
         		}
         		if(fieldname == 'email' && error == ''){
         			var valid_email = isValidEmailAddress( $(this).val() );
         			result = result && valid_email;
         			if(!valid_email)
         				error = template.replace('{INPUT}',  '正確' + $(this).attr('title'));
	         	}

	         	if( !$(this).next().hasClass('input_checking') )
					$(this).next().remove();

	         	if(error != ''){
					$(this).after(error);
					items.push($(this).next());
	         	}
         	}
        });

        $(items).each(function(i){
	        $(this).show();
	    });

        if(result){
         	$(this).val('處理中...');
         	$.ajax({
                 type: "POST",
                 url: api,
                 data: $(form_obj).serialize(),
                 cache: false,
                 success: function(output){
					try {
						output = JSON.parse(output);
					} catch (ex) {
						output = null;
					}
					
                 	var messageOutput = '';
                 	//console.log(output);
					//console.log(output.status);                 	
					//console.log(output.cc);                 	
					if(output && output.status=='2') {
						messageOutput = message[messageType];
						//messageOutput = '多謝支持，您已成功登記。<br>01空間將會寄出【報名確認】電郵到您的電子郵箱，請檢查並於當日入場時出示電郵。';
						$('#sMsgSuccess').css('color', 'green');
						$('#sMsgSuccess').html(messageOutput);
					}else if(output && output.status) {
						if(output.cc==false){
							$('#quota_message').css('display', 'block');							
						}else{
							var paymentIdentifier = output._temp_payment_id;
							$('[type=hidden][name=return]').val($('[type=hidden][name=return]').val().replace('{{PAYMENT_ID}}', paymentIdentifier));
							$('#paypalButton').css('display', 'block');							
						}

                 	} else { 
                 		messageOutput = '服務錯誤，請稍後再試。';
						$('#sMsgSuccess').css('color', 'red');
					}

                 	$('input[type=text]').each(function(i){
			         	$(this).val( '' );
			        });

                 	$(form_obj).css('display', 'none');
                 },
                 error: function(output){
                     $(this).prop('disabled', false);
                     $(this).html('<span class="icon-arrow-right"></span>確認發送');
                 }
             });
         } else {
             $(this).prop('disabled', false);
         }
     });
 })(jQuery);