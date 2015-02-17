
<?php
$products_menu = isset($_POST['productsMenu']) ? $_POST['productsMenu'] : 'Products';
$designs_menu = isset($_POST['designsMenu']) ? $_POST['designsMenu'] : 'Designs';
$edit_elements_menu = isset($_POST['editElementsMenu']) ? $_POST['editElementsMenu'] : 'Edit Elements';
$fb_photos_menu = isset($_POST['fbPhotosMenu']) ? $_POST['fbPhotosMenu'] : 'Add Photos From Facebook';
$insta_photos_menu = isset($_POST['instaPhotosMenu']) ? $_POST['instaPhotosMenu'] : 'Add Photos From Instagram';

$edit_elements_headline = isset($_POST['editElementsHeadline']) ? $_POST['editElementsHeadline'] : 'Edit Elements';
$edit_elements_dropdown_none = isset($_POST['editElementsDropdownNone']) ? $_POST['editElementsDropdownNone'] : 'None';

$section_filling = isset($_POST['sectionFilling']) ? $_POST['sectionFilling'] : 'Filling';
$section_fonts_styles = isset($_POST['sectionFontsStyles']) ? $_POST['sectionFontsStyles'] : 'Fonts & Styles';
$section_curved_text = isset($_POST['sectionCurvedText']) ? $_POST['sectionCurvedText'] : 'Curved Text';
$section_helpers = isset($_POST['sectionHelpers']) ? $_POST['sectionHelpers'] : 'Helpers';

$customize_text_align_left = isset($_POST['textAlignLeft']) ? $_POST['textAlignLeft'] : 'Align Left';
$customize_text_align_center = isset($_POST['textAlignCenter']) ? $_POST['textAlignCenter'] : 'Align Center';
$customize_text_align_right = isset($_POST['textAlignRight']) ? $_POST['textAlignRight'] : 'Align Right';
$customize_text_bold = isset($_POST['textBold']) ? $_POST['textBold'] : 'Bold';
$customize_text_italic = isset($_POST['textItalic']) ? $_POST['textItalic'] : 'Italic';

$curved_text_info = isset($_POST['curvedTextInfo']) ? $_POST['curvedTextInfo'] : 'You can only change the text when you switch to normal text.';
$curved_text_spacing = isset($_POST['curvedTextSpacing']) ? $_POST['curvedTextSpacing'] : 'Spacing';
$curved_text_radius = isset($_POST['curvedTextRadius']) ? $_POST['curvedTextRadius'] : 'Radius';
$curved_text_reverse = isset($_POST['curvedTextReverse']) ? $_POST['curvedTextReverse'] : 'Reverse';
$curved_text_toggle = isset($_POST['curvedTextToggle']) ? $_POST['curvedTextToggle'] : 'Switch between curved and normal Text';

$customize_center_h = isset($_POST['centerH']) ? $_POST['centerH'] : 'Center Horizontal';
$customize_center_c = isset($_POST['centerV']) ? $_POST['centerV'] : 'Center Vertical';
$customize_center_move_down = isset($_POST['moveDown']) ? $_POST['moveDown'] : 'Move It Down';
$customize_center_move_up = isset($_POST['moveUp']) ? $_POST['moveUp'] : 'Move It Up';
$customize_reset = isset($_POST['reset']) ? $_POST['reset'] : 'Reset To His Origin';
$customize_center_trash = isset($_POST['trash']) ? $_POST['trash'] : 'Trash';

$fb_photos_headline = isset($_POST['fbPhotosHeadline']) ? $_POST['fbPhotosHeadline'] : 'Facebook Photos';
$fb_select_album = isset($_POST['fbSelectAlbum']) ? $_POST['fbSelectAlbum'] : 'Select an album';

$insta_photos_headline = isset($_POST['instaPhotosHeadline']) ? $_POST['instaPhotosHeadline'] : 'Instagram Photos';
$insta_feed_button = isset($_POST['instaFeedButton']) ? $_POST['instaFeedButton'] : 'My Feed';
$insta_recent_images_button = isset($_POST['instaRecentImagesButton']) ? $_POST['instaRecentImagesButton'] : 'My Recent Images';
$insta_load_next = isset($_POST['instaLoadNext']) ? $_POST['instaLoadNext'] : 'Load next Stack';

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">  
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Hagley | Create a Custom Rug</title>
	<link rel="icon" type="image/png" href="/images/favicon.ico" />

    <!-- Include css files -->
    <link rel="stylesheet" type="text/css" href="css/styles.css" />
    <!-- The plugins.css -->
    <link rel="stylesheet" type="text/css" href="css/plugins.min.css" />
    <!-- The CSS for the plugin itself -->
	<link rel="stylesheet" type="text/css" href="css/jquery.fancyProductDesigner.css" />

    <!-- Include js files -->
	<script src="js/jquery.min.js" type="text/javascript"></script>
	<script src="js/bootstrap.min.js" type="text/javascript"></script>
	<!-- HTML5 canvas library -->
	<script src="js/fabric.js" type="text/javascript"></script>
	<!-- Third-party plugins that are needed for Fancy Product Designer -->
	<script src="js/plugins.min.js" type="text/javascript"></script>
	<!-- The plugin itself -->
    <script src="js/jquery.fancyProductDesigner.min.js" type="text/javascript"></script>
    <!-- Include only if you would like to create a pdf from your product -->
    <script src="jspdf/jspdf.min.js" type="text/javascript"></script>

    <script src="//use.typekit.net/zpw2ygv.js"></script>
	<script>try{Typekit.load();}catch(e){}</script>

    <script type="text/javascript">
	    jQuery(document).ready(function(){

	    	var yourDesigner = $('#clothing-designer').fancyProductDesigner({
	    		editorMode: false,
	    		fonts: ['Arial', 'Fearless', 'Helvetica', 'Times New Roman', 'Verdana', 'Geneva', 'Gorditas'],
	    		customTextParameters: {colors: false, removable: true, resizable: true, draggable: true, rotatable: true, autoCenter: true, boundingBox: "Base"},
	    		customImagesParameters: {draggable: true, removable: true, colors: '#000', autoCenter: true, boundingBox: "Base"}
	    	}).data('fancy-product-designer');

	    	//print button
			$('#print-button').click(function(){
				yourDesigner.print();
				return false;
			});

			//create an image
			$('#image-button').click(function(){
				var image = yourDesigner.createImage();
				return false;
			});

			//create a pdf with jsPDF
			$('#pdf-button').click(function(){
				var image = new Image();
				image.src = yourDesigner.getProductDataURL('jpeg', '#ffffff');
				image.onload = function() {
					var doc = new jsPDF();
					doc.addImage(this.src, 'JPEG', 0, 0, this.width * 0.2, this.height * 0.2);
					doc.save('Product.pdf');
				}
				return false;
			});

			//checkout button with getProduct()
			$('#checkout-button').click(function(){
				var product = yourDesigner.getProduct();
				console.log(product);
				return false;
			});

			//event handler when the price is changing
			$('#clothing-designer')
			.bind('priceChange', function(evt, price, currentPrice) {
				$('#thsirt-price').text(currentPrice);
			});

			//recreate button
			$('#recreation-button').click(function(){
				var fabricJSON = JSON.stringify(yourDesigner.getFabricJSON());
				$('#recreation-form input:first').val(fabricJSON).parent().submit();
				return false;
			});

			//click handler for input upload
			$('#upload-button').click(function(){
				$('#design-upload').click();
				return false;
			});

			//save image on webserver
			$('#save-image-php').click(function() {
				$.post( "php/save_image.php", { base64_image: yourDesigner.getProductDataURL()} );
			});

			//send image via mail
			$('#send-image-mail-php').click(function() {
				$.post( "php/send_image_via_mail.php", { base64_image: yourDesigner.getProductDataURL()} );
			});

			//upload image
			document.getElementById('design-upload').onchange = function (e) {
				if(window.FileReader) {
					var reader = new FileReader();
			    	reader.readAsDataURL(e.target.files[0]);
			    	reader.onload = function (e) {

			    		var image = new Image;
			    		image.src = e.target.result;
			    		image.onload = function() {
				    		var maxH = 400,
			    				maxW = 300,
			    				imageH = this.height,
			    				imageW = this.width,
			    				scaling = 1;

							if(imageW > imageH) {
								if(imageW > maxW) { scaling = maxW / imageW; }
							}
							else {
								if(imageH > maxH) { scaling = maxH / imageH; }
							}

				    		yourDesigner.addElement('image', e.target.result, 'my custom design', {colors: $('#colorizable').is(':checked') ? '#000000' : false, zChangeable: true, removable: true, draggable: true, resizable: true, rotatable: true, autoCenter: true, boundingBox: "Base", scale: scaling});
			    		};
					};
				}
				else {
					alert('FileReader API is not supported in your browser, please use Firefox, Safari, Chrome or IE10!')
				}
			};
	    });
    </script>
    </head>

<body>
<header>
	<img src="images/logo.jpg" class="logo" />
	<h1>Create Your Own Rug!</h1>
	<a href="#" class="btn done">Done!</a>
</header>

<!--////////////
//// SIDEBAR ////
////////////////-->
<section class="main">
	<div class="row row-1">

			<div id="clothing-designer">
          		<div class="fpd-product" title="Shirt Front" data-thumbnail="images/yellow_shirt/front/preview.png">
	    			<img src="images/yellow_shirt/front/base.png" title="Base" data-parameters='{"x": 325, "y": 329, "colors": "#d59211", "price": 20}' />
			  		<img src="images/yellow_shirt/front/shadows.png" title="Shadow" data-parameters='{"x": 325, "y": 329}' />
			  		<img src="images/yellow_shirt/front/body.png" title="Hightlights" data-parameters='{"x": 322, "y": 137}' />
			  		<span title="Any Text" data-parameters='{"boundingBox": "Base", "x": 326, "y": 232, "zChangeable": true, "removable": true, "draggable": true, "rotatable": true, "resizable": true, "colors": "#000000"}' >Default Text</span>
			  		<div class="fpd-product" title="Shirt Back" data-thumbnail="images/yellow_shirt/back/preview.png">
		    			<img src="images/yellow_shirt/back/base.png" title="Base" data-parameters='{"x": 317, "y": 329, "colors": "Base", "price": 20}' />
		    			<img src="images/yellow_shirt/back/body.png" title="Hightlights" data-parameters='{"x": 333, "y": 119}' />
				  		<img src="images/yellow_shirt/back/shadows.png" title="Shadow" data-parameters='{"x": 318, "y": 329}' />
					</div>
				</div>
          		<div class="fpd-product" title="Sweater" data-thumbnail="images/sweater/preview.png">
	    			<img src="images/sweater/basic.png" title="Base" data-parameters='{"x": 332, "y": 311, "colors": "#D5D5D5,#990000,#cccccc", "price": 20}' />
			  		<img src="images/sweater/highlights.png" title="Hightlights" data-parameters='{"x": 332, "y": 311}' />
			  		<img src="images/sweater/shadow.png" title="Shadow" data-parameters='{"x": 332, "y": 309}' />
				</div>
				<div class="fpd-product" title="Scoop Tee" data-thumbnail="images/scoop_tee/preview.png">
	    			<img src="images/scoop_tee/basic.png" title="Base" data-parameters='{"x": 314, "y": 323, "colors": "#98937f, #000000, #ffffff", "price": 15}' />
			  		<img src="images/scoop_tee/highlights.png" title="Hightlights" data-parameters='{"x":308, "y": 316}' />
			  		<img src="images/scoop_tee/shadows.png" title="Shadow" data-parameters='{"x": 308, "y": 316}' />
			  		<img src="images/scoop_tee/label.png" title="Label" data-parameters='{"x": 314, "y": 140}' />
				</div>
				<div class="fpd-product" title="Hoodie" data-thumbnail="images/hoodie/preview.png">
	    			<img src="images/hoodie/basic.png" title="Base" data-parameters='{"x": 313, "y": 322, "colors": "#850b0b", "price": 40}' />
			  		<img src="images/hoodie/highlights.png" title="Hightlights" data-parameters='{"x": 311, "y": 318}' />
			  		<img src="images/hoodie/shadows.png" title="Shadow" data-parameters='{"x": 311, "y": 321}' />
			  		<img src="images/hoodie/zip.png" title="Zip" data-parameters='{"x": 303, "y": 216}' />
				</div>
				<div class="fpd-product" title="Shirt" data-thumbnail="images/shirt/preview.png">
	    			<img src="images/shirt/basic.png" title="Base" data-parameters='{"x": 327, "y": 313, "colors": "#6ebed5", "price": 10}' />
	    			<img src="images/shirt/collar_arms.png" title="Collars & Arms" data-parameters='{"x": 326, "y": 217, "colors": "#000000"}' />
			  		<img src="images/shirt/highlights.png" title="Hightlights" data-parameters='{"x": 330, "y": 313}' />
			  		<img src="images/shirt/shadow.png" title="Shadow" data-parameters='{"x": 327, "y": 312}' />
			  		<span title="Any Text" data-parameters='{"boundingBox": "Base", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "colors": "#000000"}' >Default Text</span>
				</div>
				<div class="fpd-product" title="Short" data-thumbnail="images/shorts/preview.png">
	    			<img src="images/shorts/basic.png" title="Base" data-parameters='{"x": 317, "y": 332, "colors": "#81b5eb", "price": 15}' />
			  		<img src="images/shorts/highlights.png" title="Hightlights" data-parameters='{"x": 318, "y": 331}' />
			  		<img src="images/shorts/pullstrings.png" title="Pullstrings" data-parameters='{"x": 307, "y": 195, "colors": "#ffffff"}' />
			  		<img src="images/shorts/midtones.png" title="Midtones" data-parameters='{"x": 317, "y": 332}' />
			  		<img src="images/shorts/shadows.png" title="Shadow" data-parameters='{"x": 320, "y": 331}' />
				</div>
				<div class="fpd-product" title="Basecap" data-thumbnail="images/cap/preview.png">
	    			<img src="images/cap/basic.png" title="Base" data-parameters='{"x": 318, "y": 311, "colors": "#ededed", "price": 5}' />
			  		<img src="images/cap/highlights.png" title="Hightlights" data-parameters='{"x": 309, "y": 300}' />
			  		<img src="images/cap/shadows.png" title="Shadows" data-parameters='{"x": 306, "y": 299}' />
				</div>
				<div class="fpd-product" title="Rug" data-thumbnail="images/rug/basic.png">
	    			<img src="images/rug/basic.png" title="Base" data-parameters='{"x": 318, "y": 400, "colors": "#ededed", "price": 5}' />
			  		<img src="images/rug/highlights.png" title="Hightlights" data-parameters='{"x": 309, "y": 300}' />
			  		<img src="images/rug/shadows.png" title="Shadows" data-parameters='{"x": 306, "y": 299}' />
			  		<span title="Any Text" data-parameters='{"boundingBox": "Base", "x": 326, "y": 232, "zChangeable": true, "removable": true, "draggable": false, "rotatable": false, "resizable": false, "colors": "#000000"}' >Enter your name</span>
				</div>
				

				<!--/////////////
				//// DESIGNS ////
				/////////////////-->
		  		<div class="fpd-design">

			  		<div class="fpd-category" title="Swirls">
				  		<img src="images/designs/swirl.png" title="Swirl" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 10, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/swirl2.png" title="Swirl 2" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 5, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/swirl3.png" title="Swirl 3" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "autoCenter": true}' />
					  	<img src="images/designs/heart_blur.png" title="Heart Blur" data-parameters='{"x": 215, "y": 200, "colors": "#bf0200", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 5, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/converse.png" title="Converse" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "autoCenter": true}' />
					  	<img src="images/designs/crown.png" title="Crown" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "autoCenter": true}' />
					  	<img src="images/designs/men_women.png" title="Men hits Women" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  		</div>
			  		<div class="fpd-category" title="Retro">
				  		<img src="images/designs/retro_1.png" title="Retro One" data-parameters='{"x": 210, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 7, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/retro_2.png" title="Retro Two" data-parameters='{"x": 193, "y": 180, "colors": "#ffffff", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.46, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/retro_3.png" title="Retro Three" data-parameters='{"x": 240, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.25, "price": 8, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/heart_circle.png" title="Heart Circle" data-parameters='{"x": 240, "y": 200, "colors": "#007D41", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "scale": 0.4, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/swirl.png" title="Swirl" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 10, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/swirl2.png" title="Swirl 2" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "price": 5, "boundingBox": "Base", "autoCenter": true}' />
					  	<img src="images/designs/swirl3.png" title="Swirl 3" data-parameters='{"x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true}' />
					  </div>
				</div><!-- end of fpd-design -->	
		  	</div><!-- end of clothing-designer-->  
		  	

			<!-- The form recreation -->
			<input type="file" id="design-upload" style="display: none;" />
			<form action="php/recreation.php" id="recreation-form" method="post">
			<input type="hidden" name="recreation_product" value="" />
			</form>

	</div><!--end of row-->
</section>


        



    </body>
</html>