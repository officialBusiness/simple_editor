import deleteOne from './operation/delete_one.js';
import deleteOneOnStart from './operation/delete_one_on_start.js';
import deleteRange from './operation/delete_range.js';
import mergeNode from './operation/merge_node.js';
import enterOne from './operation/enter_one.js';

export default {
	type: 'header',
	isBlock: true,
	toDom(obj = {
		type: "header"
	}){
		let header = this.nodeApi.createElement(obj.level, {
			class: 'header',
			block: true,
			mergeBlock: true,
			container: true,
		});

		if(Array.isArray(obj.data)){
			obj.data.forEach((child)=>{
				let childDom = this.getComponentDom(child.type, child);
				if( childDom ){
					header.appendChild( childDom );
				}
			});
		}else if( typeof obj.data === 'string' ){
			header.innerText = obj.data;
		}

		this.bindCustomEvent(header, {
			[this.customEventType.backspaceOne]: deleteOne,
			[this.customEventType.backspaceOnStart]: deleteOneOnStart,
			[this.customEventType.mergeNode]: mergeNode,
			[this.customEventType.backspaceRange]: deleteRange,
			[this.customEventType.enterOne]: enterOne
		});
		return header;
	},
	toObj(dom){
		let obj = {
			type: 'header',
			level: dom.nodeName.toLowerCase()
		};
		if(dom.childNodes.length > 1){
			obj.data = [];
			dom.childNodes.forEach((child)=>{
				obj.data.push(this.getComponentObj(child));
			});
		}else{
			obj.data = dom.innerText;
		}
		return obj;
	}
}