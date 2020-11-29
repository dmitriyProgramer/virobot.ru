$(document).ready(function(){
	displayKeys();
	amount2();
})

displayKeys = function(){
  if( /test/.test(location.search) ){
     $('[onclick^="qiwiPayRobot"]').css({"display": ""});
     $('[onclick^="payRobot"]').css({"display": "none"});
  }
}

amount = function() {
	QiwiCheckout.createInvoice({
	    publicKey: '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPs7C16Efj7Q5b1RfaT2EK9otiPsCfC79B4QwEPeWocJQ4PWKqC1YDYP9gBLfCyERaQCWXBLiyfDtE4yGSk2r8jBUrpHXvhKiRfh3C9qEQ6',
	    amount: 1.00, 
	    phone: '89829749400',
	    successUrl: 'http://virobot.ru/cabinet/myRobot?cum='+$('.roboPrice span').text().replace(/[^\d]/g, "")+'&test=test',
	}).then(data => {
		dat = {"sum":data.amount};
		$.ajax({
		    type: 'POST',
		    url: '/ajax/qiwiPayRobot',
		    data: dat,
		    success: function (response) {
			amountarr = $.parseJSON(response);
			if(amountarr['error'] == 0){
			    location.reload();
			}
		    }
		});
	}).catch(error => {
	    console.log(error);
	})
}

amount2 = function() {
	amount = false;
	if( /sum=/.test(location.href) ){
	arr = location.href.split('?');
	    if( /&/.test(arr[1]) ){
		p = arr[1].split('&');
		for( i in p ){
		    if( /sum=/.test(p[i]) ){
			amount = p[i].split('=')[1];
		    }
		}
	    }else{
		amount = arr[1].split('=')[1];
	    }
	}
	if( amount ){
		dat = {"sum":amount};
		$.ajax({
		    type: 'POST',
		    url: '/ajax/qiwiPayRobot',
		    data: dat,
		    success: function (response) {
			amountarr = $.parseJSON(response);
			if(amountarr['error'] == 0){
			    location.replace(arr[0]);
			}
		    }
		});
	}
}
