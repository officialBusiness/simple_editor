
export default function handleOnKeydown(e){
	console.log('keydown e:', e);
	let preventDefault = true;
	this.events.keydown.forEach((triggerEvent)=>{
		triggerEvent(editor);
	});
	if( e.ctrlKey || e.metaKey ){
		if( e.keyCode === 86 ){
			// v 执行  paste
			preventDefault = false;
		}else if( e.keyCode === 83 ){
			// s 执行 save

		}
	}else{
		if( e.keyCode === 8 ){
			// backspace
		}else if( e.keyCode === 13 ){
			// enter

		}else if( e.key.length === 1 ){
			// 输入普通字符串

		}
	}
	if( preventDefault ){
		e.preventDefault();
	}
}