
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
					block: true
				}, {
					// backspaceOnStart: function(e){
					// 	console.log('触发了 backspaceOnStart 事件:', e);
					// }
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
			obj.data.push(this.getComponentObj(dom));
		});
		return obj;
	}
}