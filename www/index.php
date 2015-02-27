
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui"/>
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Hagley | Create a Custom Rug</title>
	<link rel="icon" type="image/png" href="/images/favicon.ico" />

    <!-- Include css files -->
    <link rel="stylesheet" type="text/css" href="css/styles.css" />

    <!-- Include js files -->
	<script src="js/jquery.min.js" type="text/javascript"></script>
	<script src="js/bootstrap.min.js" type="text/javascript"></script>
	
    <script src="//use.typekit.net/zpw2ygv.js"></script>
	<script>try{Typekit.load();}catch(e){}</script>

	<script src="js/jquery.vegas.min.js" type="text/javascript"></script>
    <script type="text/javascript">

    jQuery(document).ready(function($) {
        // Background Image for Header
        $.vegas({
            src:'images/bkg-front.jpg'
        });

        $('a.btn').click(function(){
        	location.replace('designer.php');
        })

    });
	</script>

    </head>

<body>
<div class="front">
<header>
	<img src="images/logo.jpg" class="logo" />
</header>

<!--////////////
//// SIDEBAR ////
////////////////-->
<section class="main">
	<div class="row row-1">

		<h1>Create a Rug!</h1>
		<div class="divider"></div>

		<ol>
			<li>Select a rug from the Rugs area</li>
			<li>Select images from the Images area</li>
			<li>Choose from over 200 images from any of the six image categories</li>
			<li>Images can be sized, rotated and have different colors</li>
			<li>Arrange images on the rug to tell your story.</li>
			<li>Enter you name and hit the Done! button at the top.</li>
			<li>Email or print your rug.</li>
		</ol>
		<a href="designer.php" class="btn">Tell Us Your Story!</a>
		
	</div><!--end of row-->
</section>



</div><!--end of front-->
</body>
</html>