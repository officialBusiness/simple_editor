
export default {
	type: 'code',
	toDom(obj){
		return this.nodeApi.createComonentDom({
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
						// on: {
						// 
						// },
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
						[this.nodeLabel.container]: true,
					},
					// on: {
					// 
					// },
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
	},
	supportOperation: {
		getLastContainer(code){
			return code.childNodes[1] ? code.childNodes[1] : code.childNodes[0].childNodes[0];
		}
	}
}