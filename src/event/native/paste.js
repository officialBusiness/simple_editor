
export default function handleOnPaste(e){
	e.preventDefault();
	let clipboardData = e.clipboardData,
		index = 0,
		length = clipboardData.items.length,
		string = '';
	for(let item of clipboardData.items){
		index ++;
		if( item.kind === 'string' 
			&& item.type === 'text/plain' ){
			item.getAsString((str)=>{
				string += str;
				// console.log('item:', item);
				if( length === index ){
					console.info('paste 事件待完善');
					console.log('string:', string);
				}
			});
		}
	}
}