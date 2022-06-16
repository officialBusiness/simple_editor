import deleteOne from './delete_one.js'
import deleteOneOnStart from './delete_one_on_start.js'

export default {
	type: 'header',
	alias: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	isBlock: true,
	toDom(obj){
		let header = this.nodeApi.createElement(obj.type, {
			class: 'header',
			block: true,
			container: true,
			merge: true,
		}, {
			[this.customEventType.backspaceOne]: deleteOne.bind(this),
			[this.customEventType.backspaceOnStart]: deleteOneOnStart.bind(this),
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
		return header;
	},
	toObj(dom){
		let obj = {
			type: dom.nodeName.toLowerCase()
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