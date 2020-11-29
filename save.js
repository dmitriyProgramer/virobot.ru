$(document).ready(function(){
  displayKeys();
})
console.log('save');
qiwiPayRobot = function(){
  console.log('save');
}
displayKeys = function(){
  if( /test/.test(location.search) ){
     $('[onclick^="qiwiPayRobot"]').css({"display": ""});
     $('[onclick^="payRobot"]').css({"display": "none"});
  }
}
