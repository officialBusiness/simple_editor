
export default {
	type: 'code',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'div',
			attributes: {
				class: 'code',
				block: true,
			},
			children: [
				{
					nodeName: 'div',
					attributes: {
						class: 'code_container'
					},
					children: {
						nodeName: 'code',
						attributes: {
							container: true,
						},
						style: {
							width: obj.width
						},
						children: obj.data
					}
				},
				{
					nodeName: 'div',
					if: !!obj.title,
					attributes: {
						class: 'code_title',
						container: true
					},
					children: obj.title
				}
			]
		});
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