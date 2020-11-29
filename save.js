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
	//Price = $('.roboPrice span').text().replace(/[^\d]/g, "");
	Price = 1.00;
	QiwiCheckout.createInvoice({
	    publicKey: '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPuffxgnihXAgfhkxxpep2zmYNPnekYdiVT4ygEF9e4ifDgRYoauFFLhWF2ehnjYf5eXTMzPURqfhztv3pJYyqEqNFokuGKvMoHCFxNtYpP',
	    amount: Price, 
	    phone: '89107300037',
	    successUrl: 'http://virobot.ru/cabinet/myRobot?sum='+Price+'&test=test',
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
	_amount_ = false;
	if( /sum=/.test(location.href) ){
	arr = location.href.split('?');
	    if( /&/.test(arr[1]) ){
		p = arr[1].split('&');
		for( i in p ){
		    if( /sum=/.test(p[i]) ){
			_amount_ = p[i].split('=')[1];
		    }
		}
	    }else{
		_amount_ = arr[1].split('=')[1];
	    }
	}
	if( _amount_ ){
		dat = {"sum":_amount_};
		$.ajax({
		    type: 'POST',
		    url: '/ajax/qiwiPayRobot',
		    data: dat,
		    success: function (response) {
			amount_arr = $.parseJSON(response);
			if(amount_arr['error'] == 0){
			    location.replace(arr[0]+'?test=test');
			}
		    }
		});
	}
}
