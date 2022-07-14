
export default function initMathjax(){
	let
		mathjaxButton = document.getElementById('mathjaxButton'),
		mathjaxContainer = document.getElementById('mathjaxContainer'),
		imgConatienr = mathjaxContainer.getElementsByClassName('img')[0],
		// mathjaxImg = document.getElementById('mathjaxImg'),
		mathjaxTexContainer = document.getElementById('mathjaxTexContainer'),
		// mathjaxTex = document.getElementById('mathjaxTex'),
		comfirmMathjaxButton = document.getElementById('comfirmMathjaxButton'),
		cancelMathjaxButton = document.getElementById('cancelMathjaxButton'),
		addMathjaxButton = document.getElementById('addMathjaxButton'),
		reduceMathjaxButton = document.getElementById('reduceMathjaxButton');


	mathjaxButton.onmousedown = showMathjax;

	cancelMathjaxButton.onclick = hiddenMathjax
	comfirmMathjaxButton.onclick = comfirmMathjax
	addMathjaxButton.onclick = ()=>{
		// 添加 textarea
		addMathjaxTex();
	}
	reduceMathjaxButton.onclick = ()=>{
		mathjaxTexContainer.removeChild(
			mathjaxTexContainer.childNodes[mathjaxTexContainer.childNodes.length - 1]
		)
		initMathjaxTexImage();
	}

	// editorEnglish.addComponentEvent('mathjax', 'imgMousedown', (edtior, mathjaxObj)=>{
	// 	if( edtior === editorEnglish ){
	// 		showMathjax();
	// 		// console.log('mathjaxObj.data:', Array.isArray(mathjaxObj.data));
	// 		if( Array.isArray(mathjaxObj.data) ){
	// 			initMathjaxTex(mathjaxObj.data.length);
	// 			for( let i = 0, len = mathjaxObj.data.length; i < len; i++ ){
	// 				// console.log('mathjaxTexContainer.childNodes[i]:', mathjaxTexContainer.childNodes[i]);
	// 				mathjaxTexContainer.childNodes[i].value = mathjaxObj.data[i];
	// 			}
	// 		}else{
	// 			mathjaxTexContainer.childNodes[0].value = mathjaxObj.data;
	// 		}
	// 		initMathjaxTexImage();
	// 	}
	// });

	function initMathjaxTexImage(){
		window.editor.nodeApi.emptyAllChild(imgConatienr);
		let texDom = getMathjaxTexDom();
		if( Array.isArray(texDom) ){
			texDom.forEach((dom)=>{
				imgConatienr.appendChild(dom);
			});
		}else{
			imgConatienr.appendChild(texDom);
		}
	}

	function initMathjaxTex(num = 1){
		window.editor.nodeApi.emptyAllChild(mathjaxTexContainer);
		for( let i = 0; i < num; i++ ){
			addMathjaxTex();
		}
	}

	// 添加 textarea
	function addMathjaxTex(){
		let mathjaxTex = document.createElement('textarea');
		mathjaxTex.className = 'mathjaxTex';

		mathjaxTex.oninput = function(e){
			initMathjaxTexImage();
		}
		mathjaxTex.onkeydown = function(e){
			// console.log('e:', e);
			if( e.key === 'Enter' ){
				e.preventDefault();
				comfirmMathjax();
			}else if( e.key === 'Escape' ){
				hiddenMathjax();
			}
		}
		mathjaxTexContainer.appendChild(mathjaxTex);
		setTimeout(()=>{
			mathjaxTex.focus();
		}, 0);
	}
	// getMathjaxTexValue
	function getMathjaxTexDom(){
		let tex, dom ;
		if( mathjaxTexContainer.childNodes.length > 1 ){
			tex = [];
			dom = [];
			for( let i = 0, len = mathjaxTexContainer.childNodes.length; i < len; i++ ){
				let mathjaxTex = mathjaxTexContainer.childNodes[i];
				if( mathjaxTex.value && mathjaxTex.value.trim() ){

					dom.push(window.editor.getComponentDom({
						type: 'mathjax',
						data: mathjaxTex.value
					}));
				}
			}

		}else{
			tex = mathjaxTexContainer.childNodes[0].value;
			dom = window.editor.getComponentDom({
				type: 'mathjax',
				data: tex
			})
		}
		return dom;
	}

	function comfirmMathjax(){
		hiddenMathjax();
		let texDom = getMathjaxTexDom();
		if( texDom ){
			let range = window.editor.range,
					{ startContainer, startOffset } = range;
			console.log('startContainer:', startContainer);
			window.editor.dealOperaion(startContainer, 'insertElement', [
				texDom,
				startContainer,
				startOffset
			]);

			// window.editor.insertElement( window.editor.getComponentDom({
			// 	type: 'mathjax',
			// 	data: tex
			// }), range.startContainer, range.startOffset );
		}
	}

	function showMathjax(){
		mathjaxContainer.style.display = 'flex';
		initMathjaxTex(1);
	}

	function hiddenMathjax(){
		mathjaxContainer.style.display = 'none';
	}

	function getBase64(tex){
		try{
			var svgData = new XMLSerializer().serializeToString( MathJax.tex2svg(tex).childNodes[0] );
			return "data:image/svg+xml;base64," + btoa( unescape(encodeURIComponent(svgData)) );
		}catch(e){
			return new Error(e)
		}
	}
}