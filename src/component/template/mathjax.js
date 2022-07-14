
export default {
	type: 'mathjax',
	toDom(obj){
		return this.nodeApi.createComonentDom({
			nodeName: 'img',
			attributes: {
				class: 'mathjax',
				tex: obj.data,
				src: "data:image/svg+xml;base64," + 
					btoa( unescape(encodeURIComponent(
						new XMLSerializer().serializeToString(
							MathJax.tex2svg(obj.data).childNodes[0] 
						)
					) )	),
			},
			style: {
				display: obj.display ? obj.display : null,
				height: obj.height ? obj.height : null,
		    'max-height': obj.height ? 'initial' : null,
		    margin: obj.margin ? obj.margin : null
			},
		})
	},
	toObj(dom){
		let obj = {
			type: 'mathjax',
			data: dom.getAttribute("tex"),
		}
		if( dom.style.display ){
			obj.display = dom.style.display;
		}
		if( dom.style.height ){
			obj.height = dom.style.height;
		}
		if( dom.style.margin ){
			obj.margin = dom.style.margin;
		}
		return obj;
	}
}