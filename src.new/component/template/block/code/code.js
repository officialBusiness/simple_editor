
export default {
	type: 'code',
	toDom(obj){
		return this.nodeApi.createDom({
			nodeName: 'div',
			attributes: {
				class: 'code',
				[this.nodeLabel.block]: true,
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
							[this.nodeLabel.container]: true,
						},
						style: obj.codeStyle,
						children: obj.data
					}
				},
				{
					nodeName: 'div',
					if: !!obj.title,
					attributes: {
						class: 'code_title',
						[this.nodeLabel.container]: true,
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
			},
			codeStyle = this.nodeApi.getNodeStyle(code);

		if( title ){
			obj.title = title.innerText;
		}
		if( codeStyle ){
			obj.codeStyle = codeStyle;
		}
		return obj;
	}
}