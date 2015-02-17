<?php
//labels
$add_image_tooltip = isset($_POST['addImageTooltip']) ? $_POST['addImageTooltip'] : 'Add your own Image';
$add_text_tooltip = isset($_POST['addTextTooltip']) ? $_POST['addTextTooltip'] : 'Add your own Text';
$zoom_in_tooltip = isset($_POST['zoomInTooltip']) ? $_POST['zoomInTooltip'] : 'Zoom In';
$zoom_out_tooltip = isset($_POST['zoomOutTooltip']) ? $_POST['zoomOutTooltip'] : 'Zoom Out';
$zoom_reset_tooltip = isset($_POST['zoomResetTooltip']) ? $_POST['zoomResetTooltip'] : 'Zoom Reset';
$download_image_tooltip = isset($_POST['downloadImageTooltip']) ? $_POST['downloadImageTooltip'] : 'Download Product Image';
$print_tooltip = isset($_POST['printTooltip']) ? $_POST['printTooltip'] : 'Print';
$pdf_tooltip = isset($_POST['pdfTooltip']) ? $_POST['pdfTooltip'] : 'Save As PDF';
$save_product_tooltip = isset($_POST['saveProductTooltip']) ? $_POST['saveProductTooltip'] : 'Save product';
$saved_products_tooltip = isset($_POST['savedProductsTooltip']) ? $_POST['savedProductsTooltip'] : 'My saved products';
$reset_tooltip = isset($_POST['resetTooltip']) ? $_POST['resetTooltip'] : 'Reset Product';
?>

<section class="fpd-product-container container">
	<!-- Kinetic Stage -->
	<div class="fpd-product-stage">
		<canvas></canvas>
	</div>
</section>