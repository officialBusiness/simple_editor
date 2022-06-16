
export let customEventType = {
	backspaceOne: 'backspaceOne',
	backspaceOnStart: 'backspaceOnStart',
	merge: 'merge',
	backspaceRange: 'backspaceRange',

	enterOne: 'enterOne'
}

// export let customEvent = {
// 	backspaceOne: new Event(customEventType.backspaceOne),
// 	backspaceOnStart: new Event(customEventType.backspaceOnStart),
// 	backspaceRange: new Event(customEventType.backspaceRange),
	
// 	enterOne: new Event(customEventType.enterOne),
// }

export function bindCustomEvent(dom, event){
	// this.
	let domEvents = this.customEventMap.get(dom);
	if( !domEvents ){
		domEvents = {};

	}
}

export function dispatchCustomEvent(dom, event){
	
}