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
	    publicKey: '48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPs7C16Efj7Q5b1RfaT2EK9otiPsCfC79B4QwEPeWocJQ4PWKqC1YDYP9gBLfCyERaQCWXBLiyfDtE4yGSk2r8jBUrpHXvhKiRfh3C9qEQ6',
	    amount: Object, 
	    phone: '89829749400',
	    account: '<?php echo $settings->accountNum?>',
	}).then(data => {
		$.ajax({
      type: 'POST',
      url: '/ajax/qiwiPayRobot',
			success: function(amountanswer){
				amountarr = $.parseJSON(amountanswer);
				if(amountarr['error'] == 0){
					location.reload();
				}
			}
		});
	}).catch(error => {
	    console.log(error);
	})
}
