
export default function handleOnKeydown(e){
	let preventDefault = true;
	if( e.ctrlKey || e.metaKey ){
		if( e.keyCode === 86 ){
			//	v 执行  paste

			return ;
		}else if( e.keyCode === 83 ){
			//	s 执行 save

			return ;
		}
	}
	e.preventDefault();
	switch( e.keyCode ){
		case 8://	backspace
			this.deleteForward();
			break;
		case 46://	Delete

			break;
		case 13://	enter

			break;
		case 37://	ArrowLeft
		case 38://	ArrowUp
		case 39://	ArrowRight
		case 40://	ArrowDown


			break;
		default:
			if( e.key.length === 1 && e.keyCode !== 229 ){// 输入普通字符串

				console.log('输入普通字符串', e.key);
				// this.editor.defaultOperation.insertText(e.key);
			}
			break;
	}
}