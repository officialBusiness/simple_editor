
export default function enter(){
	let 
		{ rangeApi, nodeApi, customEventType } = this,
		range = rangeApi.getRange();
	if( !range ){
		return ;
	}

	let	{ collapsed, startContainer, startOffset, endContainer, endOffset } = range;
	if(collapsed){
			this.dispatchCustomEvent(
				nodeApi.getContainer(startContainer),
				customEventType.enterOne,
				[startContainer, startOffset]
			);
	}else{
		console.log('enter 事件待完善');
	}

}