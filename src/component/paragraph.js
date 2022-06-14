
export default {
	type: 'paragraph',
	isBlock: true,
	toDom(obj = {
			type: "paragraph"
		}){
		let paragraph = this.nodeApi.createElement('p', {
					class: 'paragraph',
					container: 'true',
					block: 'true'
				}, {
					// backspaceOnStart: function(e){
					// 	console.log('触发了 backspaceOnStart 事件:', e);
					// }
				});
		if( obj.data && Array.isArray(obj.data) ){
			obj.data.forEach((child)=>{
				// if( getComponent(child.type) ){
					// paragraph.appendChild(getComponent(child.type).toDom(child));
				// }
			});
		}
		return paragraph;
	},
	toObj(dom){
		
	}
}