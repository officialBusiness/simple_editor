import deleteOne from './delete_one.js'
import deleteOneOnStart from './delete_one_on_start.js'

export default {
	type: 'paragraph',
	isBlock: true,
	toDom(obj = {
			type: "paragraph"
		}){
		// console.log('this:', this);
		let paragraph = this.nodeApi.createElement('p', {
					class: 'paragraph',
					container: true,
					block: true,
					merge: true,
				}, {
					[this.customEventType.backspaceOne]: deleteOne.bind(this),
					[this.customEventType.backspaceOnStart]: deleteOneOnStart.bind(this),
				});
		if( obj.data && Array.isArray(obj.data) ){
			obj.data.forEach((child)=>{
				let childDom = this.getComponentDom(child.type, child);
				if( childDom ){
					paragraph.appendChild( childDom );
				}
			});
		}
		return paragraph;
	},
	toObj(dom){
		let obj = {
			type: "paragraph",
			data: []
		};
		dom.childNodes.forEach((child)=>{
			obj.data.push(this.getComponentObj(child));
		});
		return obj;
	}
}