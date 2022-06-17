
export let customEventType = {
	backspaceOne: 'backspaceOne',
	backspaceOnStart: 'backspaceOnStart',

	mergeNode: 'mergeNode',
	getMergeNode: 'getMergeNode',

	backspaceRange: 'backspaceRange',


	enterOne: 'enterOne',
	enterRange: 'enterRange'
}

export function bindCustomEvent(dom, event){
	let domEvents = this.customEventMap.get(dom);
	if( !domEvents ){
		domEvents = {};
		this.customEventMap.set(dom, domEvents);
	}
	for(let key in event){
		domEvents[key] = event[key];
	}
}

export function dispatchCustomEvent(dom, eventType, params){
	let domEvents = this.customEventMap.get(dom);
	if( domEvents ){
		let event = domEvents[eventType];
		if( event ){
			return event.apply(this, params);
		}
	}
}