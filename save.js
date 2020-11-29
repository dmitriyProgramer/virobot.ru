$(document).ready(function(){
  displayKeys();
})

displayKeys = function(){
  if( /test/.test(location.search) ){
     $('[onclick^="qiwiPayRobot"]').css({"display": ""});
     $('[onclick^="payRobot"]').css({"display": "none"});
  }
}

amount = function() {
	QiwiCheckout.createInvoice({
	    publicKey: '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPuffxgnihXAgfhkxxpep2zmYNPnekYdiVT4ygEF9e4ifDgRYoauFFLhWF2ehnjYf5eXTMzPURqfhztv3pJYyqEqNFokuGKvMoHCFxNtYpP',
	    amount: 1.00, 
	    phone: '89107300037',
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
