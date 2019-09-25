import changePage from './changePage';
$(function(){
	let $body=$('body');
	$body.on('click','a',e=>{
		e.preventDefault();
		changePage();
		return false;
	});
	click增强;
	滚动监听增强;
});