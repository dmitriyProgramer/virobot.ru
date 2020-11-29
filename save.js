$(document).ready(function(){
  displayKey();
})
console.log('save');
qiwiPayRobot = function(){
  console.log('save');
}
displayKey = function(){
  if( /test/.test(location.search) ){
     $('[onclick^="qiwiPayRobot"]').css({"display": ""});
     $('[onclick^="payRobot"]').css({"display": "none"});
  }
}
