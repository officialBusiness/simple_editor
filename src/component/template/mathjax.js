let mathjax = {
	type: 'mathjax',
	eventInterface: {
		imgMousedown: ()=>{}
	},
	toDom(obj){
		let imgMousedown = (e)=>{
			if( this.editable ){
				this.rangeApi.endNodeRange(e.target);
			}
			mathjax.eventInterface.imgMousedown(this, obj);
		}
		try{
			if(Array.isArray(obj.data)){
				let node = this.nodeApi.createElement('span', {
					class: 'mathjax',
				})
				obj.data.forEach((tex)=>{
					node.appendChild(
						this.nodeApi.createElement('img', {
							tex: tex,
							src: "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent( new XMLSerializer().serializeToString( MathJax.tex2svg(tex).childNodes[0] ))) )
						}, {
							mousedown: imgMousedown
						})
					);
				});
				return node;
			}else{
				return this.nodeApi.createElement('img', {
					class: 'mathjax',
					tex: obj.data,
					src: "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent( new XMLSerializer().serializeToString( MathJax.tex2svg(obj.data).childNodes[0] ))) )
				}, {
					mousedown: imgMousedown
				})
			}
		}catch(e){
			console.error('mathjax 生成出错', obj, 'e:', e);
			return new Error(e)
		}
	},
	toObj(dom){
		if(dom.childNodes.length){
			let obj = {
				type: 'mathjax',
				data: []
			}
			dom.childNodes.forEach((img)=>{
				obj.data.push(img.getAttribute('tex'));
			});
			return obj;
		}else{
			return {
				type: 'mathjax',
				data: dom.getAttribute("tex")
			}
		}
	}
}

export default mathjax;