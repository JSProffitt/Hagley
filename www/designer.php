<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui"/>
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
	<script src="js/plugins.js" type="text/javascript"></script>
	<!-- The plugin itself -->
    <script src="js/jquery.fancyProductDesigner.js" type="text/javascript"></script>
    <!-- Include only if you would like to create a pdf from your product -->
    <script src="jspdf/jspdf.min.js" type="text/javascript"></script>

    <script src="//use.typekit.net/zpw2ygv.js"></script>
	<script>try{Typekit.load();}catch(e){}</script>

    <script type="text/javascript">
	    
	    // Define idle timer variable
	    idleTimer = null;

	    // Define timeout duration
	    timeoutDuration = 600000;

	    jQuery(document).ready(function($){

	    	// Hide email form on load
	    	$('form#email').hide();



	    	// Modal Window
	    	$('#myModal').on('shown.bs.modal', function () {
			   $('#myInput').focus()
			})

			// Show form after clicking email button
			$('#myModal #email-button').click(function() {
				$('form#email').fadeIn('slow');
			});

	    	// start the timer
	    	startTimer(timeoutDuration);

	    	// Clear and restart the timer if the user clicks on the page
	    	$('body').click(function() {
	    		window.clearTimeout(idleTimer);
	    		startTimer(timeoutDuration);
	    	});

	    	var yourDesigner = $('#clothing-designer').fancyProductDesigner({
	    		editorMode: false,
	    		fonts: ['Cursive', 'Arial', 'Fearless', 'Helvetica', 'Times New Roman', 'Verdana', 'Geneva', 'Gorditas'],
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
			$('form#email').submit(function(event) {
				event.preventDefault();
				var emailTo = $("input[name='email']").val();
				var emailsend = $.post( "php/send_image_via_mail.php", { base64_image: yourDesigner.getProductDataURL(), email: emailTo} );

				emailsend.done(function(data) {
					console.log(data);
				});

				emailsend.fail(function() {
					console.log('error');
				})
			})
			

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

		
		/**
		 * Create a timer to redirect to the intro screen
		 * @param  int duration Time before redirect (in milliseconds)
		 * @return NULL
		 */
		function startTimer(duration)
		{
			idleTimer = window.setTimeout(function() {
	    		location.replace('index.php');
	    	}, duration);

		}
    </script>
    </head>

<body>
<header>
	<img src="images/logo.jpg" class="logo" />
	<h1>Create Your Own Rug!</h1>
	<a class="btn done" data-toggle="modal" data-target="#myModal">Done!</a>
</header>

<!--////////////
//// SIDEBAR ////
////////////////-->
<section class="main">
	<div class="row row-1">

			<div id="clothing-designer">
          		
				<div class="fpd-product" title="Rug" data-thumbnail="images/rugs/1/rug.png">
	    			<img src="images/rugs/1/base.png" title="Base" data-parameters='{"x": 375, "y": 295, "colors": "#ededed"}' />
	    			<img src="images/rugs/1/texture.png" title="Texture" data-parameters='{"x": 375, "y": 295}' />
	    			<img src="images/rugs/1/border.png" title="Border" data-parameters='{"x": 375, "y": 295}' />
	    			<img src="images/rugs/1/center.png" title="Center" data-parameters='{"x": 375, "y": 295}' />
			  		<span title="Any Text" data-parameters='{"boundingBox": "Base", "x": 375, "y": 295, "zChangeable": true, "removable": true, "draggable": false, "rotatable": false, "resizable": false, "colors": "#000000"}' >Enter your name</span>
				</div>

				<div class="fpd-product" title="Rug" data-thumbnail="images/rugs/2/rug.png">
	    			<img src="images/rugs/2/base.png" title="Base" data-parameters='{"x": 375, "y": 295, "colors": "#ededed"}' />
	    			<img src="images/rugs/2/texture.png" title="Texture" data-parameters='{"x": 375, "y": 295}' />
	    			<img src="images/rugs/2/border.png" title="Border" data-parameters='{"x": 375, "y": 295}' />
	    			<img src="images/rugs/2/center.png" title="Center" data-parameters='{"x": 375, "y": 295}' />
			  		<span title="Any Text" data-parameters='{"boundingBox": "Base", "x": 375, "y": 295, "zChangeable": true, "removable": false, "draggable": false, "rotatable": false, "resizable": false, "colors": "#000000"}' >Enter your name</span>
				</div>
				
			

				<!--/////////////
				//// DESIGNS ////
				/////////////////-->
		  		<div class="fpd-design">
		  			<div class="fpd-category" title="Create Your Family">
		  				<img src="images/designs/family/baby.png" title="Baby" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/boy.png" title="Boy" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/boy2.png" title="Boy" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/cat.png" title="Cat" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/dog.png" title="Dog" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/girl.png" title="Girl" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/girl2.png" title="Girl" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/horse.png" title="Horse" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/man.png" title="Working Man" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/man2.png" title="Man" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/woman.png" title="Working Woman" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/family/woman2.png" title="Woman" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  		</div>
			  		<div class="fpd-category" title="Delaware Specific">
		  				<img src="images/designs/de/Bombay-Hook.png" title="Bombay Hook" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/DCAD.png" title="DCAD" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Delaware-Art-Museum.png" title="Delaware Art Museum" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Delaware-Beaches.png" title="Delaware Beaches" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Delaware-Childrens-Museum.png" title="Delaware Childrens Museum" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Delaware-Parks.png" title="Delaware Parks" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Delaware-State-University.png" title="Delaware State University" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Delaware-Technical-and-Community-College.png" title="Delaware Technical and Community College" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Firefly-Festival.png" title="Firefly Festival" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Goldey-Beacom.png" title="Goldey Beacom" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Grand-Opera-House.png" title="Grand Opera House" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />	
			  			<img src="images/designs/de/Hagley.png" title="Hagley" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Kalmar-Nyckel.png" title="Kalmar Nyckel" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Legislative-Hall-Building.png" title="Legislative Hall Building" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/New-Castle-Town-Hall.png" title="New Castle Town Hall" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Pumpkin-Chunkin.png" title="Pumpkin Chunkin" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Rock-Concert.png" title="Rock Concert" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/University-of-Delaware.png" title="University of Delaware" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Wesley-College.png" title="Wesley College" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Widener.png" title="Widener" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Wilmington-University.png" title="Wilmington University" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Wilmington-Zoo.png" title="Wilmington Zoo" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/Wilmington.png" title="Wilmington" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/de/World-Cafe-Queen.png" title="World Cafe Queen" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  		</div>

			  		<div class="fpd-category" title="Sports Teams">
				  		<img src="images/designs/teams/Baltimore-Orioles.png" title="Baltimore Orioles" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Baltimore-Ravens.png" title="Baltimore Ravens" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Dallas-Cowboys.png" title="Dallas Cowboys" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Giants_helmet.png" title="Giants Helmet" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Los-Angeles-Dodgers.png" title="Los Angeles Dodgers" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/new_york_jets_helmet_rightface.png" title="New York Jets" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/New-England-Patriots.png" title="New England Patriots" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/New-York-Knicks.png" title="New York Knicks" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/New-York-Yankees.png" title="New York Yankees" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Philadelphia-76ers.png" title="Philadelphia 76ers" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Philadelphia-Eagles.png" title="Philadelphia Eagles" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Philadelphia-Flyers.png" title="Philadelphia Flyers" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Philadelphia-Phillies.png" title="Philadelphia Phillies" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Philadelphia-Union.png" title="Philadelphia Union" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/teams/Wilmington-Blue-Rocks.png" title="Wilmington Blue Rocks" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  	</div>
			  		<div class="fpd-category" title="Hobbies">
				  		<img src="images/designs/hobbies/Acting-Drama.png" title="Acting Drama" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Airplane-flying.png" title="Airplane flying" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Archery.png" title="Archery" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Astronomy.png" title="Astronomy" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Baseball.png" title="Baseball" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Basketball.png" title="Basketball" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Beach.png" title="Beach" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/beer.png" title="Beer" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Bird-watching.png" title="Bird Watching" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Bowling.png" title="Bowling" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Cheerleading.png" title="Cheerleading" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Chess.png" title="Chess" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Computer-Programming.png" title="Computer Programming" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Cooking.png" title="Cooking" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Dancing.png" title="Dancing" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Doctor.png" title="Doctor" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Fishing.png" title="Fishing" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Football.png" title="Football" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Gymnastics.png" title="Gymnastics" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Hiking.png" title="Hiking" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Hockey.png" title="Hockey" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Horse-Riding.png" title="Horse Riding" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Ice-Skating.png" title="Ice Skating" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/IMAX-Movie-Theater.png" title="IMAX Movie Theater" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Kayaking.png" title="Kayaking" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Listening-Music.png" title="Listening Music" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/magic.png" title="Magic" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Martial-Arts.png" title="Martial Arts" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Mountain-Climber.png" title="Mountain Climber" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Painting.png" title="Painting" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Photography.png" title="Photography" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Poker.png" title="Poker" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Pottery.png" title="Pottery" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Puzzles.png" title="Puzzles" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Reading-Books.png" title="Reading Books" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Running.png" title="Running" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Science.png" title="Science" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Scuba-Diving.png" title="Scuba Diving" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Shopping.png" title="Shopping" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Singing.png" title="Singing" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Skateboarding.png" title="Skateboarding" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Skiing.png" title="Skiing" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Snowboarding.png" title="Snowboarding" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Soccer.png" title="Soccer" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Space-Travel.png" title="Space Travel" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Stock-Car-racing.png" title="Stock Car Racing" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Swimming.png" title="Swimming" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Tennis.png" title="Tennis" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Texting.png" title="Texting" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Video-Games.png" title="Video Games" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/weightlifting.png" title="weightlifting" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Wine.png" title="Wine" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Writing.png" title="Writing" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			<img src="images/designs/hobbies/Yoga.png" title="Yoga" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
			  			
			  		</div>
			  		<div class="fpd-category" title="States">
				  		<img src="images/designs/state/Alabama.png" title="Alabama" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Alaska.png" title="Alaska" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Arizona.png" title="Arizona" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Arkansas.png" title="Arkansas" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/California.png" title="California" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Colorado.png" title="Colorado" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Connecticut.png" title="Connecticut" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Delaware.png" title="Delaware" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Florida.png" title="Florida" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Georgia.png" title="Georgia" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />

				  		<img src="images/designs/state/Hawaii.png" title="Hawaii" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Idaho.png" title="Idaho" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Illinois.png" title="Illinois" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Indiana.png" title="Indiana" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Iowa.png" title="Iowa" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Kansas.png" title="Kansas" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Kentucky.png" title="Kentucky" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Louisiana.png" title="Louisiana" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Maine.png" title="Maine" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Maryland.png" title="Maryland" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />

				  		<img src="images/designs/state/Massachusetts.png" title="Massachusetts" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Michigan.png" title="Michigan" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Minnesota.png" title="Minnesota" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Mississippi.png" title="Mississippi" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Missouri.png" title="Missouri" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Montana.png" title="Montana" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Nebraska.png" title="Nebraska" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Nevada.png" title="Nevada" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/New-Hampshire.png" title="New Hampshire" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/New-Jersey.png" title="New Jersey" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />

				  		<img src="images/designs/state/New-Mexico.png" title="New Mexico" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/New-York.png" title="New York" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/North-Carolina.png" title="North Carolina" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/North-Dakota.png" title="North Dakota" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Ohio.png" title="Ohio" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Oklahoma.png" title="Oklahoma" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Oregon.png" title="Oregon" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Pennsylvania.png" title="Pennsylvania" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Rhode-Island.png" title="Rhode Island" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/South-Carolina.png" title="South Carolina" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />

				  		<img src="images/designs/state/South-Dakota.png" title="South Dakota" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Tennessee.png" title="Tennessee" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Texas.png" title="Texas" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Utah.png" title="Utah" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Vermont.png" title="Vermont" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Virginia.png" title="Virginia" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Washington.png" title="Washington" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/West-Virginia.png" title="West Virginia" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Wisconsin.png" title="Wisconsin" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/state/Wyoming.png" title="Wyoming" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />

			  		</div>
			  		<div class="fpd-category" title="Vehicles">
				  		<img src="images/designs/vehicles/Boat.png" title="Boat" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/vehicles/Bus.png" title="Bus" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/vehicles/Classic-Car.png" title="Classic-Car" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/vehicles/Convertible-car.png" title="Convertible-car" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/vehicles/Cooper-mini.png" title="Cooper-mini" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/vehicles/Hummer.png" title="Hummer" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/vehicles/Hybrid.png" title="Hybrid" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/vehicles/Jeep.png" title="Jeep" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />

			  		</div>
			  		<div class="fpd-category" title="Zodiac Signs">
				  		<img src="images/designs/zodiac/Aquarius.png" title="Aquarius" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Aries.png" title="Aries" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Cancer.png" title="Cancer" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Capricorn.png" title="Capricorn" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/gemini.png" title="gemini" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Leo.png" title="Leo" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Libra.png" title="Libra" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Pisces.png" title="Pisces" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Sagittarius.png" title="Sagittarius" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Scorpio.png" title="Scorpio" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Taurus.png" title="Taurus" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />
				  		<img src="images/designs/zodiac/Virgo.png" title="Virgo" data-parameters='{"zChangeable": true, "x": 215, "y": 200, "colors": "#000000", "removable": true, "draggable": true, "rotatable": true, "resizable": true, "boundingBox": "Base", "autoCenter": true}' />

			  		</div>
			  		
				</div><!-- end of fpd-design -->	

		  	</div><!-- end of clothing-designer-->  
		  	

			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">

					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i aria-hidden="true" class="fa fa-times"></i></button>

					<h1 id="myModalLabel">Your Almost Done!</h1>
					<p>Print or Email your rug.</p>

					<button id="print-button" type="button" class="btn print">Print</button>
				    <button id="email-button" type="button" class="btn">Email</button>

				    <form method="post" id="email" action="php/send_image_via_mail.php">
					<input type="email" name="email" placeholder="Enter E-mail Address"  />
					<input id="send-image-mail-php" type="submit" class="btn email">Submit</button>
					</form>

					<div style="clear:both;"></div>
				   
			    </div>
			  </div>
			</div>



	</div><!--end of row-->
</section>




</body>
</html>