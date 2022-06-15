export default {
	type: 'code',
	isBlock: true,
	toDom(obj){
		let
			block = this.nodeApi.createElement('div', {
				class: 'code',
				block: true
			}),
			codeContainer = this.nodeApi.createElement('div', {
				class: 'code_container'
			}),
			code = this.nodeApi.createElement('code', {
				container: true,
			})

		if(obj.width){
			code.style.width = obj.width;
		}
		code.innerText = obj.data;
		codeContainer.appendChild(code);
		block.appendChild(codeContainer);

		if( obj.title ){
			let title = this.nodeApi.createElement('div', {
				class: 'code_title',
				// container: true
				contenteditable: false
			});
			title.innerText = obj.title;
			block.appendChild(title);
		}
		return block;
	},
	toObj(dom){

	}
}