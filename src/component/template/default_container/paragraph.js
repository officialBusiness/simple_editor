import deleteOne from './delete_one.js';
import deleteOneOnStart from './delete_one_on_start.js';
import mergeNode from './merge_node.js';

export default {
	type: 'paragraph',
	isBlock: true,
	toDom(obj = {
			type: "paragraph"
		}){
		// console.log('this:', this);
		let paragraph = this.nodeApi.createElement('p', {
					class: 'paragraph',
					block: true,
					mergeBlock: true,
					container: true,
				});
		if( obj.data && Array.isArray(obj.data) ){
			obj.data.forEach((child)=>{
				let childDom = this.getComponentDom(child.type, child);
				if( childDom ){
					paragraph.appendChild( childDom );
				}
			});
		}

		this.bindCustomEvent(paragraph, {
			[this.customEventType.backspaceOne]: deleteOne,
			[this.customEventType.backspaceOnStart]: deleteOneOnStart,
			[this.customEventType.mergeNode]: mergeNode
		});
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