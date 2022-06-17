import deleteOne from './default_container/operation/delete_one.js'

export default {
	type: 'code',
	isBlock: true,
	toDom(obj){
		let
			block = this.nodeApi.createElement('div', {
				class: 'code',
				block: true,
				singleBlock: true
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
				container: true
				// contenteditable: false
			});
			title.innerText = obj.title;
			block.appendChild(title);
		}
		return block;
	},
	toObj(dom){
		let 
			codeContainer = dom.childNodes[0],
			code = codeContainer.childNodes[0],
			title = dom.childNodes[1],
			obj = {
				type: 'code',
				data: code.innerText
			};

		if(code.style.width){
			obj.width = code.style.width;
		}
		if( title ){
			obj.title = title.innerText;
		}
		return obj;
	}
}