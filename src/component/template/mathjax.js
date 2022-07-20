let first = true;
export default {
	type: 'mathjax',
	toDom(obj){
		// if( first ){
		// 	console.log('obj:', obj.data);
		// 	console.log('window.V:', window.V);
		// 	console.log("data:image/svg+xml;base64," + 
		// 			btoa( unescape(encodeURIComponent(
		// 				xmlSerializer.serializeToString(
		// 					MathJax.tex2svg(window.V).childNodes[0] 
		// 				)
		// 			) )	))
		// 	console.log('obj.data === window.V', obj.data === window.V)
		// 	first = false;
		// }
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
		    margin: obj.margin ? obj.margin : null,
		    'max-height': obj.height ? 'initial' : null
			},
		})
	},
	toObj(dom){
		// let obj = {
		// 	type: 'mathjax',
		// 	data: dom.getAttribute("tex"),
		// }
		// if( dom.style.display ){
		// 	obj.display = dom.style.display;
		// }
		// if( dom.style.height ){
		// 	obj.height = dom.style.height;
		// }
		// if( dom.style.margin ){
		// 	obj.margin = dom.style.margin;
		// }
		// return obj;
		
		let obj = {
			type: 'mathjax',
			data: dom.getAttribute("tex"),
		},
		style = {}
		if( dom.style.display ){
			style.display = dom.style.display;
		}
		if( dom.style.height ){
			style.height = dom.style.height;
		}
		if( dom.style.margin ){
			style.margin = dom.style.margin;
		}
		if( Object.keys(style).length > 0){
			obj.style = style;
		}
		return obj;
	}
}