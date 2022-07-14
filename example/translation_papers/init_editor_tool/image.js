export default function initImage(editorEnglish, editorChinese){
	let imageButton = document.getElementById('imageButton'),
			imageContainer = document.getElementById('imageContainer'),
			imageComfirm = document.getElementById('imageComfirm'),
			imageCancel = document.getElementById('imageCancel'),
			image = document.getElementById('image'),
			imageDrag = document.getElementById('imageContent'),
			imageShow = document.getElementById('showImage'),
			imageImport = document.getElementById('imageImport'),
			titleInput = document.getElementById('titleInput')

	imageButton.onmousedown = showImage;

	imageComfirm.onclick = comfirmImage;
	imageCancel.onclick = hiddenImage;


	imageDrag.ondragstart = imageDrag.ondragover = (e)=>{
		e.preventDefault();
	}
	imageDrag.ondrop = (e)=>{
		e.preventDefault();
		let
			files = e.dataTransfer.files,
			file = files[0],
			reader = new FileReader();

		reader.onload = ()=>{
			imageShow.src = reader.result;
		};
		if( file ){
			reader.readAsDataURL(file);
		}
	}

	imageImport.onchange = (e)=>{
		let
			files = e.target.files,
			file = files[0],
			reader = new FileReader();

		reader.onload = ()=>{
			imageShow.src = reader.result;
		};
		if( file ){
			reader.readAsDataURL(file);
		}
	}

	// editorEnglish.addComponentEvent('image', 'mousedown', (edtior, imageObj)=>{
	// 	if( edtior === editorEnglish ){
	// 		showImage();
	// 		titleInput.value = imageObj.title;
	// 		imageShow.src = imageObj.src;
	// 	}
	// });

	function comfirmImage(){
		hiddenImage();
		let title = titleInput.value,
				imageSrc = imageShow.src,

				editor = window.editor,

				range = editor.range,
				block = editor.nodeApi.getBlock(range.startContainer),
				imageDom = editor.getComponentDom({
					type: 'image',
					src: imageSrc,
					title,
					width: '400px',
					alignment: 'center'
				});

		editor.nodeApi.insertAfter(imageDom, block);

	}
	function showImage(){
		imageContainer.style.display = 'flex';

	}
	function hiddenImage(){
		imageContainer.style.display = 'none';
	}
}