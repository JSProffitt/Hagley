/*
 * Fancy Product Designer v2.1.32
 *
 * Copyright 2013, Rafael Dery
 *
 */

;(function($) {

	var FancyProductDesigner = function( elem, args) {

		var options = $.extend({}, $.fn.fancyProductDesigner.defaults, args);

		options.elementParameters = $.extend({}, $.fn.fancyProductDesigner.defaults.elementParameters, options.elementParameters);
		options.textParameters = $.extend({}, $.fn.fancyProductDesigner.defaults.textParameters, options.textParameters);
		options.customTextParameters = $.extend({}, $.fn.fancyProductDesigner.defaults.customTextParameters, options.customTextParameters);
		options.customImagesParameters = $.extend({}, $.fn.fancyProductDesigner.defaults.customImagesParameters, options.customImagesParameters);
		options.dimensions = $.extend({}, $.fn.fancyProductDesigner.defaults.dimensions, options.dimensions);
		options.labels = $.extend({}, $.fn.fancyProductDesigner.defaults.labels, options.labels);
		options.labels.colorpicker = $.extend({}, $.fn.fancyProductDesigner.defaults.labels.colorpicker, options.labels.colorpicker);
		options.sidebarLabels = $.extend({}, $.fn.fancyProductDesigner.defaults.sidebarLabels, options.sidebarLabels);
		options.productStageLabels = $.extend({}, $.fn.fancyProductDesigner.defaults.productStageLabels, options.productStageLabels);

		var thisClass = this,
			stage,
			$initText,
			$elem,
			$sidebar,
			$sidebarNavi,
			$sidebarContent,
			$productContainer,
			$productStage,
			$menubar,
			$toolbar,
			$helperButtons,
			$colorPicker,
			$fontsDropdown,
			$patternWrapper,
			$curvedTextWrapper,
			$elementTooltip,
			$products,
			$designs,
			$viewSelection,
			$editorBox,
			$productLoader,
			$designCategories = null,
			currentBoundingObject = null,
			viewsLength = 0,
			currentProductIndex = -1,
			currentProductTitle = null,
			currentViewIndex = 0,
			currentViews = null,
			currentElement = null,
			currentPrice = 0,
			responsiveScale = 1,
			zoomScale= 1,
			designCategories = {},
			rotateIcon = new Image(),
			resizeIcon = new Image(),
			removeIcon = new Image();

		//set data url rotate icon
		rotateIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkNGMzVGRDE0NENBMTFFMzlDNTlBQzY1MzlBMkNBNzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkNGMzVGRDI0NENBMTFFMzlDNTlBQzY1MzlBMkNBNzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQ0YzNUZDRjQ0Q0ExMUUzOUM1OUFDNjUzOUEyQ0E3MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQ0YzNUZEMDQ0Q0ExMUUzOUM1OUFDNjUzOUEyQ0E3MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj80kqoAAAHdSURBVHjalFO7agJREB2Xa6Hio1CIEbSIKIidptJOENJYCraBlGnyCX5BiF8gCUEhWClYhQULIaRUFlQEX4VKCp/gczJ3yW5iYsLmwHL3vs7MnDmX1Wo1IJyYTKYrvV5/hgT4AzqdTtjtdm+LxeJxv9+/AhE4x+PxC03wP5jP52NJkqLMaDRe2u328++RVqsV9Ho9oGhgsVjA6XQe7FPGdqvVegPdbjfzlXk6nWI6nUa/349UEgqCgDabDePxOJbLZflMoVDAVquFk8lEhE6nc6tcpn8MhUJcg1+/ZDKJZrMZ6/U6L+NZJaCUMRKJqAcZYxiLxTCVSqHP5/tB1Gw2cTabfRJks1l10+12Y6VSUcvabreYSCQOCBqNhkzAqC2yKLlcTmkTZDIZiEajqmClUgmq1SqQHvJcGTkYn1ALod1uywsulwtIsAPFA4EAiKKoXuRBPB4PkODAjhgFlKwUeL3eo6binhN4dM5MdcuLg8EAqF2gFYLiXGqPPHLCfD6vmYB34Y4rvVwuMRgMYjgcxuFwqMnOo9FIZDTOOJHBYIBisQhkbXA4HJqC87gCvaoH6ueQL3BltV7ebDZAVr7nGUj9fv+CHsY1ue/0wyh/vmjSaU5Bc+v1+uldgAEAQbiBjYjV1d0AAAAASUVORK5CYII=';

		//set data url resize icon
		resizeIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkY3RjhCMTI0NENEMTFFMzlDNTlBQzY1MzlBMkNBNzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkY3RjhCMTM0NENEMTFFMzlDNTlBQzY1MzlBMkNBNzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQ0YzNUZENzQ0Q0ExMUUzOUM1OUFDNjUzOUEyQ0E3MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQ0YzNUZEODQ0Q0ExMUUzOUM1OUFDNjUzOUEyQ0E3MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj7soO0AAAG9SURBVHjalFM9awJBEJ07TwstlPMKL4WFVlEsU5lGEMHKQizSSSBlmoA/wH+QP2AlhBSptLESBCtJIyqCH6BgETwFNeeBH+dmdskdhiR3yYMtdnf2zbw3s1y32wVEwOPx3DmdzjBBgAU4juN1XV9ut9un0+n0CkggK4rSIv8APiSqqir9fv9acLvdt5IkXU0mE2g0GsDzPOz3e/D5fJDJZEAQhJ+qAKxYwpgHvBcC9LDZbEI+n2cBsixDuVwGh8NhpYaSizxWpNONy+UyL7AiiEajLJMVqBre2GiaBsFgENLpNHQ6HYjH49But8EOJoEoilAqlaBarUIymYTpdArL5dKWgAY+Gs4aWCwWpNWyb8x8Pq8L584a8Pv9bJ0DE7AO/SrBCrVaDRKJBIxGI7Yfj8es1SypIcFqaHK5HJ1OEolESKVSIalUiux2O4Ie1W0JKFarFclms4yErnCYTTwj4P8iw+v1QqFQMAcL/4JpgYBE73YEw+EQisUixGIxOjwQCoUMYzXo9XqXm83mzUrC4XAgx+PxyxmaSAaDwQ2toD+bzdJY5j3O9sWnzm+f56zNHGZW1+v1M5K8fAgwAKZZlVqllD6aAAAAAElFTkSuQmCC';

		//set data url remove icon
		removeIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOEE2RDlFMzNBNzM3REJDNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQTNDNjY0RUUwRTcxMUUzQjIzMjgwOEVFRDlEQzYzRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQTNDNjY0REUwRTcxMUUzQjIzMjgwOEVFRDlEQzYzRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODAxMTc0MDcyMDY4MTE4QTZEOUUzM0E3MzdEQkM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE4QTZEOUUzM0E3MzdEQkM3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+LSpQ5wAAAbtJREFUeNqUUztrAkEQnju1slBSiKaxOCwOEUkfRP+A4KM5G21S5hekNajYpLO2CSlCythZWYVgpQgioiIYPdP4fm9mj9zixjMkHxzHzM58O/PNjlCr1QDhtFqtNxaLRSII+AWCIIj7/f5zPp8/Hg6Hd0ACl6qqb2iQv4LGzmYztdFoXEO73b47PhyPx2cTt9stWSwWzB4MBi+i2Wx26uWVy2Xw+/2QTqdPSl+v1xCJRCAQCECv19N8mHsB3W73QWcMhUK0f+3L5XLsptVqReLxODvLZDKafzQalTmCVqtFvF4vC8zn82Q6nZJoNMp8iURC8xkSUHQ6HY7E4/FwyVQHHYYEFP1+n6AWLJF+yWSS4Pi4OEogGs3a5XKBw+HgfJIkgSgahP+sYLlcknA4zG5GpU/EO9sCPg4uOZVKkWq1ymmSzWbPE8RiMU6w3W7HhJVlmZ0VCgVOA9ZYMBjU/oqiQLFYBJPJpNlutxtKpRLgRMBut4PP59NTRED2++O+KpWK9nCMQCvB3WH2cDh8hXq9Lk8mkw/yT2w2G9JsNhWBrjOO58pms92i4pffff660biNM3yNT0jy/CXAACPMXDtDjD7PAAAAAElFTkSuQmCC';


		$elem = $(elem).addClass('fpd-container fpd-clearfix fpd-'+options.layout+'').before('<p class="fpd-initiliazing">'+options.labels.initText+'<br /><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJibGFjayI+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4IDApIiBjeD0iMCIgY3k9IjE2IiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDsgNDsgMDsgMCIgZHVyPSIxLjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAiCiAgICAgIGtleXRpbWVzPSIwOzAuMjswLjc7MSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjYgMC40IDAuODswLjIgMC42IDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNiAwKSIgY3g9IjAiIGN5PSIxNiIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7IDQ7IDA7IDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjMiCiAgICAgIGtleXRpbWVzPSIwOzAuMjswLjc7MSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjYgMC40IDAuODswLjIgMC42IDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNCAwKSIgY3g9IjAiIGN5PSIxNiIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7IDQ7IDA7IDAiIGR1cj0iMS4ycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjYiCiAgICAgIGtleXRpbWVzPSIwOzAuMjswLjc7MSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjYgMC40IDAuODswLjIgMC42IDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+Cjwvc3ZnPg==" /></p>');

		$initText = $elem.prev('.fpd-initiliazing');

		$products = $elem.children('.fpd-product').remove();
		$designs = $elem.children('.fpd-design');

		if(options.layout == 'icon-sb-top' || options.layout == 'icon-sb-bottom') {
			$elem.addClass('fpd-horizontal');
		}

		//test if canvas is supported
		var canvasTest = document.createElement('canvas'),
			canvasIsSupported = Boolean(canvasTest.getContext && canvasTest.getContext('2d'));

		if(!canvasIsSupported) {
			$.post(options.templatesDirectory+'canvaserror.php', function(html) {
				$elem.append($.parseHTML(html));

				$elem.trigger('templateLoad', [this.url]);
			});

			$initText.remove();

			$elem.trigger('canvasFail')
			.fadeIn(500);

			return false;
		}

		//execute this because of a ff issue with localstorage
		window.localStorage.length;
		//window.localStorage.clear();

		//change fabricjs cursormap
		fabric.Canvas.prototype.cursorMap = [
			'default',
			'default',
			'default',
			'default',
			'default',
			'default',
			'default',
			'default'
		];

		//lowercase all keys in hexNames
		var key,
			keys = Object.keys(options.hexNames),
			n = keys.length,
			newHexNames = {};

		while (n--) {
		  key = keys[n];
		  newHexNames[key.toLowerCase()] = options.hexNames[key];
		}
		options.hexNames = newHexNames;


		//----------------------------------
		// ------- LOAD TEMPLATES ----------
		//----------------------------------

		var sidebarHtml,
			layoutAffix = '';

		if(options.layout == 'semantic') {
			layoutAffix = '-semantic';
		}

		//load sidebar html
		$.post(options.templatesDirectory+'sidebar'+layoutAffix+'.php',
			options.sidebarLabels,
			function(html){

				sidebarHtml = html;
				$elem.trigger('templateLoad', [this.url]);

				//load product stage html
				$.post(options.templatesDirectory+'productstage'+layoutAffix+'.php',
					options.productStageLabels,
					function(html){

						if(options.layout == 'icon-sb-left' || options.layout == 'icon-sb-top' || options.layout == 'semantic') {
							$elem.append($.parseHTML(sidebarHtml)).append($.parseHTML(html));
						}
						else {
							$elem.append($.parseHTML(html)).append($.parseHTML(sidebarHtml));
						}

						$sidebar = $elem.children('.fpd-sidebar');
						$sidebarNavi = $sidebar.children('.fpd-navigation');
						$sidebarContent = $sidebar.children('.fpd-content');
						$toolbar = $sidebarContent.find('.fpd-toolbar');
						$helperButtons = $toolbar.find('.fpd-helper-buttons-wrapper');
						$colorPicker = $toolbar.find('.fpd-color-picker');
						$patternWrapper = $toolbar.find('.fpd-patterns-wrapper');
						$curvedTextWrapper = $toolbar.find('.fpd-curved-text-wrapper');

						if(options.layout != 'semantic') {
							//flat horizontal layout
							if($elem.hasClass('fpd-horizontal')) {
								$sidebar.css('width', options.dimensions.sidebarSize);
								$sidebarNavi.find('.fpd-nav-item').css('line-height', options.dimensions.sidebarNavSize + 'px');
								$sidebarNavi.css('height', options.dimensions.sidebarNavSize);
							}
							//flat vertical layout
							else {
								$sidebar.css('height', options.dimensions.sidebarSize);
								$sidebarNavi.css('width', options.dimensions.sidebarNavSize);
								$sidebarContent.css('width', options.dimensions.sidebarContentWidth);
							}
						}
						//semantic layout
						else {
							$sidebar.css('width', options.dimensions.sidebarSize);
						}

						$productContainer = $elem.children('.fpd-product-container');
						$productStage = $productContainer.children('.fpd-product-stage').height(options.dimensions.productStageHeight);
						$elementTooltip = $productStage.children('.fpd-element-tooltip').html(options.labels.outOfContainmentAlert);
						$menubar = $productContainer.children('.fpd-menu-bar').addClass('fpd-'+options.menubarPosition);
						$productLoader = $productStage.append('<div class="fpd-product-loader"><div class="fpd-loading"></div></div>').children('.fpd-product-loader').hide();

						$elem.trigger('templateLoad', [this.url]);

						setTimeout(_init, 1);

					}
				);
			}
		);


		//----------------------------------
		// ------- PRIVATE METHODS ---------
		//----------------------------------

		var _init = function() {

			//create fabric stage
			var canvas = $productStage.children('canvas').get(0);
			stage = new fabric.Canvas(canvas, {
				selection: false,
				hoverCursor: 'pointer',
				rotationCursor: 'default',
				controlsAboveOverlay: true,
				centeredScaling: true
			});
			stage.setDimensions({width: $productContainer.width(), height: options.dimensions.productStageHeight});

			if( window.devicePixelRatio !== 1 ){

			    var htmlCanvas = stage.getElement();

			    // Scale the canvas up by two for retina
			    htmlCanvas.setAttribute('width', $productContainer.width()*window.devicePixelRatio);
			    htmlCanvas.setAttribute('height', options.dimensions.productStageHeight*window.devicePixelRatio);

			    // finally set the scale of the context
			    htmlCanvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);

			}

			if(options.tooltips) {

				$('.fpd-tooltip').tooltipster({offsetY: -3, theme: '.fpd-tooltip-theme', touchDevices: false});

			}


			//attach handlers to stage
			stage.on({
				'mouse:down': function(opts) {
					if(opts.target == undefined) {
						thisClass.deselectElement();
					}
					else {
						var pointer = stage.getPointer(opts.e),
							targetCorner = opts.target.findTargetCorner(pointer);

						//remove element
						if(targetCorner == 'tr' && currentElement.params.removable) {
							thisClass.removeElement(currentElement);
						}

					}
				},
				'text:changed': function(opts) {

					_changeText(opts.target, opts.target.text);

				},
				'object:moving': function(opts) {
					if((currentElement && currentElement.params.draggable) || options.editorMode) {
						currentElement.params.x = Math.round(opts.target.left / responsiveScale);
						currentElement.params.y = Math.round(opts.target.top / responsiveScale);
						_checkContainment(currentElement);
						_updateEditorBox(currentElement);
					}
				},
				'object:scaling': function(opts) {
					if((currentElement && currentElement.params.resizable) || options.editorMode) {
						currentElement.params.scale = Number(opts.target.scaleX / responsiveScale).toFixed(2);
						opts.target.setCoords();
						_checkContainment(currentElement);
						_updateEditorBox(currentElement);
					}
				},
				'object:rotating': function(opts) {
					if((currentElement && currentElement.params.rotatable) || options.editorMode) {
						currentElement.params.degree = Math.round(opts.target.angle / responsiveScale);
						_checkContainment(currentElement);
						_updateEditorBox(currentElement);
					}
				},
				'object:selected': function(opts) {
					thisClass.deselectElement(false);

					currentElement = opts.target;
					var elemParams = currentElement.params;

					if(currentElement.params.uploadZone && !options.editorMode) {
						currentElement.set('borderColor', 'transparent');
						$menubar.find('.fpd-input-image').data('fpd-placeholder', currentElement.title).click();
						thisClass.deselectElement();
						return false;
					}

					currentElement.set({
						borderColor: options.selectedColor,
						cornerColor: 'transparent',
						cornerSize: 16,
						rotatingPointOffset: 0,
						padding: currentElement.type == 'text' || currentElement.type == 'i-text' ? options.paddingControl : 0
					});

					$sidebarContent.find('.fpd-elements-dropdown').children('option[value="'+currentElement.id+'"]').prop('selected', true).parent().trigger('chosen:updated');

					//toggle colorpicker
					if(((Array.isArray(elemParams.colors) && _elementIsColorizable(currentElement) != false)) || currentElement.type == 'path-group') {

						//svg
						if(currentElement.type == 'path-group') {

							for(var i=0; i<currentElement.paths.length; ++i) {
								var path = currentElement.paths[i],
									color = tinycolor(path.fill);

								$colorPicker.append('<input type="text" value="'+color.toHexString()+'" />');
							}

							$colorPicker.addClass('fpd-colorpicker-group').find('input').spectrum({
								hexNames: options.hexNames,
								preferredFormat: "hex",
								showInput: true,
								chooseText: options.labels.colorpicker.change,
								cancelText: options.labels.colorpicker.cancel,
								change: function(color) {
									var pathIndex = $colorPicker.find('input').index(this);
									currentElement.paths[pathIndex].setFill(color.toHexString());
									stage.renderAll();
									var svgColors = [];
									for(var i=0; i<currentElement.paths.length; ++i) {
										var path = currentElement.paths[i],
											color = tinycolor(path.fill);
										svgColors.push(color.toHexString());
									}
									currentElement.params.currentColor = svgColors;
								}
							});

							if(options.layout == 'semantic') {
								$colorPicker.removeClass('ui button');
								$colorPicker.children('div').addClass('ui button')
							}

						}
						else {

							$colorPicker.append('<input type="text" value="'+(elemParams.currentColor ? elemParams.currentColor : elemParams.colors[0])+'" />');

							//color list
							if(elemParams.colors.length > 1) {
								$colorPicker.find('input').spectrum({
									hexNames: options.hexNames,
									preferredFormat: "hex",
									showPaletteOnly: true,
									showPalette: true,
									palette: elemParams.colors,
									chooseText: options.labels.colorpicker.change,
									cancelText: options.labels.colorpicker.cancel,
									change: function(color) {
										_changeColor(currentElement, color.toHexString());
									}
								});
							}
							//palette
							else {
								$colorPicker.find('input').spectrum("destroy").spectrum({
									hexNames: options.hexNames,
									preferredFormat: "hex",
									showInput: true,
									chooseText: options.labels.colorpicker.change,
									cancelText: options.labels.colorpicker.cancel,
									change: function(color) {
										_changeColor(currentElement, color.toHexString());
									}
								});
							}
						}

						$colorPicker.css('display', 'block').parent('div').show();
					}
					else {
						$colorPicker.hide().parent('div').hide();
					}


					//toggle fonts dropdown
					if(currentElement.type == "i-text"  || currentElement.type == 'curvedText') {

						if($fontsDropdown) {
							$fontsDropdown.children('option[value="'+elemParams.font+'"]').prop('selected', true).trigger('chosen:updated');
							$fontsDropdown.parent().show();
						}

						$toolbar.find('.fpd-text-styles').show().parent('div').show();

						if(elemParams.patternable && options.patterns.length) {
							$patternWrapper.show().parent('div').show();
						}

						if(elemParams.curved || elemParams.curvable) {
							$curvedTextWrapper.show();
							$curvedTextWrapper.find('.fpd-curved-text-radius').val(elemParams.curveRadius);
							$curvedTextWrapper.find('.fpd-curved-text-spacing').val(elemParams.curveSpacing);
							if(elemParams.curvable) {
								if(elemParams.curved) {
									$curvedTextWrapper.find('.fpd-curve-toggle').removeClass('fpd-button-submit green').addClass('fpd-button-danger red')
									.children('i').removeClass('fa-check').addClass('fa-times');

									$curvedTextWrapper.find('.fpd-curve-toggle-item').show();
								}
								else {
									$curvedTextWrapper.find('.fpd-curve-toggle').removeClass('fpd-button-danger red').addClass('fpd-button-submit green')
									.children('i').removeClass('fa-times').addClass('fa-check');

									$curvedTextWrapper.find('.fpd-curve-toggle-item').hide();
								}
								$curvedTextWrapper.find('.fpd-curve-toggle').show();
							}
						}

						if(elemParams.editable) {
							$toolbar.children('.fpd-text-format-section').find('textarea').val(currentElement.getText()).show();
						}
						else {
							$toolbar.children('.fpd-text-format-section').find('textarea').hide();
						}

					}

					//toggle center buttons
					elemParams.draggable ? $helperButtons.children('.fpd-center-horizontal, .fpd-center-vertical').show() : $helperButtons.children('.fpd-center-horizontal, .fpd-center-vertical').hide();

					//check if z-position is changeable
					elemParams.zChangeable ? $helperButtons.children('.fpd-move-down, .fpd-move-up').show() : $helperButtons.children('.fpd-move-down, .fpd-move-up').hide();

					//check if it can be removed
					elemParams.removable ? $helperButtons.children('.fpd-trash').show() : $helperButtons.children('.fpd-trash').hide();

					//check for a boundingbox
					if(elemParams.boundingBox && !options.editorMode) {

						var bbCoords = thisClass.getBoundingBoxCoords(currentElement);
						if(bbCoords) {
							currentBoundingObject = new fabric.Rect({
								left: bbCoords.left,
								top: bbCoords.top,
								width: bbCoords.width,
								height: bbCoords.height,
								stroke: options.boundingBoxColor,
								strokeWidth: 1,
								fill: false,
								selectable: false,
								evented: false,
								originX: 'left',
								originY: 'top',
								name: "bounding-box",
								params: {
									x: bbCoords.left,
									y: bbCoords.top,
									scale: 1
								}
							});
							stage.add(currentBoundingObject);
							currentBoundingObject.bringToFront();
						}
					}

					stage.renderAll().calcOffset();

					$toolbar.css('visibility', 'visible');

					$sidebarNavi.find('[data-target=".fpd-edit-elements"]').click();

					$(window).resize();

					_checkContainment(currentElement);
					_updateEditorBox(currentElement);

					$elem.trigger('elementSelect', [currentElement]);
				}
			});

			//create view array from DOM
			var views = [];

			for(var i=0; i < $products.length; ++i) {
				//get other views
				views = $($products.get(i)).children('.fpd-product');
				//get first view
				views.splice(0,0,$products.get(i));

				var viewsArr = [];
				views.each(function(i, view) {
					var $view = $(view);
					var viewObj = {title: view.title, thumbnail: $view.data('thumbnail'), elements: []};

					$view.children('img,span').each(function(j, element) {
						var $element = $(element),
							source;

						if($element.is('img')) {
							source = $element.data('src') == undefined ? $element.attr('src') : $element.data('src');
						}
						else {
							source = $element.text()
						}

						var elementObj = {
							type: $element.is('img') ? 'image' : 'text', //type
							source: source, //source
							title: $element.is('img') ? $element.attr('title') : $element.text(),  //title
							parameters: $element.data('parameters') == undefined ? {} : $element.data('parameters')  //parameters
						};
						viewObj.elements.push(elementObj);
					});

					viewsArr.push(viewObj);
				});
				thisClass.addProduct(viewsArr);
			}

			//load all designs
			if($designs.size() > 0) {
				//check if categories are used
				if($designs.children('.fpd-category').length > 0) {

					//create design chosen dropdown
					$designCategories = $sidebarContent.find('.fpd-designs').prepend('<select class="fpd-design-categories" tabindex="1"></select>')
					.children('.fpd-design-categories').change(function() {

						//get designs from selected category
						var designsInCat = designCategories[this.value];

						//empty list
						$sidebarContent.find('.fpd-designs .fpd-items-wrapper > picture').remove();

						//add designs from category to list
						for(var i=0; i < designsInCat.length; ++i) {
							_addDesignToList(designsInCat[i]);
						}

						//select right option
						$(this).trigger('chosen:updated');

					});

					//browse through all categories
					$designs.children('.fpd-category').each(function(i, cat) {

						var $cat = $(cat),
							categoryParams = $cat.data('parameters') ? $cat.data('parameters') : {};

						$cat.children('img').each(function(j, design) {
							var $design = $(design);
							thisClass.addDesign(
								$design.data('src') == undefined ? $design.attr('src') : $design.data('src'),
								$design.attr('title'),
								$.extend({}, categoryParams, $design.data('parameters')),
								cat.title,
								$design.data('thumbnail')
							);
						});

					});

					if(options._useChosen) {
						$designCategories.chosen();
					}

					$designCategories.change();

				}
				else {
					//append designs to list
					var $designImgs = $designs.children('img');
					for(var i=0; i < $designImgs.length; ++i) {
						var $design = $($designImgs[i]);
						thisClass.addDesign(
							$design.data('src') == undefined ? $design.attr('src') : $design.data('src'),
							$design.attr('title'),
							$design.data('parameters'),
							false,
							$design.data('thumbnail')
						);

						//thisClass.addDesign($($designImgs[i]).attr('src'), $designImgs[i].title, $($designImgs[i]).data('parameters'), false, $($designImgs[i]).data('thumbnail'));
					}
				}

				$designs.remove();
			}

			//show edit elements navi
			$sidebarNavi.find('[data-target=".fpd-edit-elements"]').css('display', 'inline-block');;

			//check if custom text is supported
			if(options.customTexts) {

				$menubar.find('.fpd-add-text').click(function(evt) {
					evt.preventDefault();
					thisClass.addElement('text', options.defaultText, options.defaultText, options.customTextParameters, currentViewIndex);
				}).show();

			}


			//trigger click on input upload
			var $imageInput = $menubar.find('.fpd-input-image');
			$menubar.find('.fpd-add-image').click(function(evt) {
				evt.preventDefault();
				$imageInput.click();
			});

			//listen when input upload changes
			$menubar.find('.fpd-upload-form').on('change', function(evt) {

				if(window.FileReader) {

					var reader = new FileReader();
					var designTitle = evt.target.files[0].name;
			    	reader.readAsDataURL(evt.target.files[0]);

			    	reader.onload = function (evt) {

						thisClass.addCustomImage(evt.target.result, designTitle);

					}

				}
				else {
					alert('FileReader API is not supported in your browser, please use Firefox, Safari, Chrome or IE10!');
					$imageInput.data('fpd-placeholder', '');
				}

				$imageInput.val('');

			});

			if(options.uploadDesigns) {
				$menubar.find('.fpd-add-image').show();
			}

			//check if user can add photos from facebook
			if(options.facebookAppId && options.facebookAppId.length > 0) {

				var $fbUserPhotos = $sidebarContent.children('.fpd-fb-user-photos'),
					$fbSelects = $fbUserPhotos.find('select').hide(),
					$fbUserPhotosList = $fbUserPhotos.find('.fpd-items-wrapper'),
					$fbLoaderGif = $fbUserPhotos.find('.fpd-loading');

				$sidebarNavi.find('[data-target=".fpd-fb-user-photos"]').css('display', 'inline-block');;

				if(options._useChosen) {
					$fbSelects.chosen();
				}

				var $fbAlbumsSelect = $fbUserPhotos.find('.fpd-fb-user-albums').change(function() {

					$fbLoaderGif.show();

					var albumId = $(this).children('option:selected').val();

					$fbUserPhotosList.css('visibility', 'hidden').children('picture').remove();

					//get photos from fb album
					FB.api('/'+albumId, function(response) {

						var albumCount = response.count;

						FB.api('/'+albumId+'?fields=photos.limit('+albumCount+')', function(response) {

							if(!response.error) {
								var photos = response.photos.data;

								for(var i=0; i < photos.length; ++i) {
									var photo = photos[i],
										photoImg = photo.images[photo.images.length-1] ? photo.images[photo.images.length-1].source : photo.source;

									$fbUserPhotosList.append('<picture><span class="fpd-loading"></span><img src="'+photoImg+'" title="'+photo.id+'" data-picture="'+photo.source+'" style="display: none;" /></picture>')
									.children('picture:last').click(function(evt) {

										evt.preventDefault();
										$productLoader.show();

										var $img = $(this).children('img');

										$.post(options.phpDirectory + 'get_image_data_url.php', { url: $img.data('picture') }, function(data) {

											if(data && data.error == undefined) {

												var picture = new Image();
												picture.src = data.data_url;
												picture.onload = function() {

													options.customImagesParameters.scale = thisClass.getScalingByDimesions(
														this.width,
														this.height,
														options.customImagesParameters.resizeToW,
														options.customImagesParameters.resizeToH
													);

													thisClass.addElement('image', this.src, $img.attr('title'), options.customImagesParameters, currentViewIndex);
												};

											}
											else {
												alert(data.error);
											}

											$productLoader.hide();

										}, 'json')
										.fail(function(evt) {

											$productLoader.hide();
											alert(evt.statusText);

										});



									})
									.children('img').load(function() {

										//fade in photo and remove loading gif
										$(this).fadeIn(500).prev('span').fadeOut(300, function() {
											$(this).remove();
											_createScrollbar($fbUserPhotosList);
										});

									})
									.error(function() {
										//image not found, remove associated list item
										$(this).parent().remove();
									});
								}

								$fbUserPhotosList.css('visibility', 'visible');
							}

							$fbLoaderGif.hide();

						});
					});
				});

				$.ajaxSetup({ cache: true });
				$.getScript('//connect.facebook.com/en_US/sdk.js', function(){

					//init facebook
					FB.init({
						appId: options.facebookAppId,
						status: true,
						cookie: true,
						xfbml: true,
						version: 'v2.0'
					});

					FB.Event.subscribe('auth.statusChange', function(response) {

						if (response.status === 'connected') {
							// the user is logged in and has authenticated your app

							$fbLoaderGif.show();
							FB.api('/me/albums', function(response) {

								var albums = response.data;
								//add all albums to select
								for(var i=0; i < albums.length; ++i) {
									var album = albums[i];
									$fbAlbumsSelect.append('<option value="'+album.id+'">'+album.name+'</option>');
								}

								if($fbAlbumsSelect.next('.chosen-container').size()) {
									$fbAlbumsSelect.trigger('chosen:updated').next('.chosen-container').show();
								}
								else {
									$fbAlbumsSelect.show();
								}

								$fbLoaderGif.hide();
							});

						}
						else {
							// the user isn't logged in to Facebook.
							$fbUserPhotosList.css('visibility', 'hidden').children('picture').remove();
							$fbSelects.children('option:not(:first)').remove();
							$fbSelects.hide().trigger('chosen:updated').next('.chosen-container').hide();
						}

					});

				});
			}


			//instagram
			if(options.instagramClientId.length) {

				$sidebarNavi.find('[data-target=".fpd-instagram-photos"]').css('display', 'inline-block');

				$sidebarContent.children('.fpd-instagram-photos').find('.fpd-insta-feed, .fpd-insta-recent-images').click(function(evt) {

					evt.preventDefault();
					var $this = $(this),
						endpoint = $this.hasClass('fpd-insta-feed') ? 'feed' : 'recent';

					//check if access token is stored in browser
					if(window.localStorage.getItem('fpd_instagram_access_token') == null) {
						_authenticateInstagram(function() {
							_loadInstaImages(endpoint);
						});
					}
					//load images by requested endpoint
					else {
						_loadInstaImages(endpoint);
					}
				});

			}

			//enable zoom buttons
			if(options.zoomFactor > 1) {

				$menubar.find('.fpd-zoom-in, .fpd-zoom-out, .fpd-zoom-reset').click(function() {

					var $this = $(this);

					if($this.hasClass('fpd-zoom-in')) {
						thisClass.zoomIn();
					}
					else if($this.hasClass('fpd-zoom-out')) {
						thisClass.zoomOut();
					}
					else {
						thisClass.zoomReset();
					}

				}).show();
			}
			else {
				$menubar.find('.fpd-zoom-in, .fpd-zoom-out, .fpd-zoom-reset').hide();
			}

			//allow user to save products in a list
			if(options.allowProductSaving && $elem.attr('id')) {

				$menubar.find('.fpd-save-product, .fpd-saved-products').show();

				$menubar.find('.fpd-save-product').click(function(evt) {
					evt.preventDefault();
					thisClass.deselectElement();

					//get key and value
					var product = thisClass.getProduct(false),
						thumbnail = thisClass.getViewsDataURL('png', 'transparent', 0.2)[0];

					//check if there is an existing products array
					var savedProducts = _getSavedProducts();
					if(savedProducts == null) {
						//create new
						savedProducts = new Array();
					}

					savedProducts.push({thumbnail: thumbnail, product: product});
					window.localStorage.setItem($elem.attr('id'), JSON.stringify(savedProducts));

					_addSavedProduct(thumbnail, product);

				});

				//load all saved products into list
				var savedProducts = _getSavedProducts();
				if(savedProducts != null) {
					for(var i=0; i < savedProducts.length; ++i) {
						var savedProduct = savedProducts[i];
						_addSavedProduct(savedProduct.thumbnail, savedProduct.product);
					}
				}

			}

			//check if jsPDF is included
			if(options.saveAsPdf && window.jsPDF) {

				$menubar.find('.fpd-save-pdf').click(function(evt) {
					evt.preventDefault();
					thisClass.deselectElement();

					var orientation = stage.getWidth() > stage.getHeight() ? 'l' : 'p';
					var doc = new jsPDF(orientation, 'mm', [options.dimensions.productStageWidth * 0.26, options.dimensions.productStageHeight * 0.26]),
						viewsDataURL = thisClass.getViewsDataURL('jpeg', 'white');

					for(var i=0; i < viewsDataURL.length; ++i) {
						doc.addImage(viewsDataURL[i], 'JPEG', 0, 0);
						if(i < viewsDataURL.length-1) {
							doc.addPage();
						}
					}

					doc.save('Product.pdf');

				}).show();
			}

			//set active object
			$sidebarContent.find('.fpd-elements-dropdown').change(function() {

				if(this.value == 'none') {
					thisClass.deselectElement();
				}
				else {
					var objects = stage.getObjects();
					for(var i=0; i < objects.length; ++i) {
						if(objects[i].id == this.value) {
							stage.setActiveObject(objects[i]);
							break;
						}
					}
				}
			});

			if(options.fonts.length > 0) {

				//change font family when dropdown changes
				$fontsDropdown = $toolbar.find('.fpd-fonts-dropdown').change(function() {
					var fallbackFontWidth = currentElement.getWidth();
					currentElement.setFontFamily(this.value);
					currentElement.params.font = this.value;

					_renderOnFontLoaded(this.value);

					_checkContainment(currentElement);
					stage.renderAll();
					$fontsDropdown.trigger('chosen:updated');
				});

				options.fonts.sort();
				for(var i=0; i < options.fonts.length; ++i) {
					// var fontName = options.fonts[i].indexOf(':') == -1 ? options.fonts[i] : options.fonts[i].substring(0, options.fonts[i].indexOf(':'));
					if (options.fonts[i].indexOf(':') == -1) 
						var fontName = options.fonts[i];
						if($fontsDropdown.children('option[value="'+fontName+'"]').size() == 0) {
							$fontsDropdown.append('<option value="'+fontName+'" style="font-family: '+fontName+';">'+fontName+'</option>');
						}
					else {
						var fontLabel = options.fonts[i].substring(0, options.fonts[i].indexOf(':'));
						var fontName = options.fonts[i].substring(options.fonts[i].indexOf(':')+1);
						if($fontsDropdown.children('option[value="'+fontName+'"]').size() == 0) {
							$fontsDropdown.append('<option value="'+fontName+'" style="font-family: '+fontName+';">'+fontLabel+'</option>');
						}
					}

					
				}

				if(options._useChosen) {
					$fontsDropdown.chosen({width: '100%'});
				}

			}

			//edit text
			$toolbar.find('.fpd-text-styles').children().click(function(evt) {
				evt.preventDefault();
				var $this = $(this);
				if($this.hasClass('fpd-align-left')) {
					currentElement.setTextAlign('left');
					currentElement.params.textAlign = 'left';
				}
				else if($this.hasClass('fpd-align-center')) {
					currentElement.setTextAlign('center');
					currentElement.params.textAlign = 'center';
				}
				else if($this.hasClass('fpd-align-right')) {
					currentElement.setTextAlign('right');
					currentElement.params.textAlign = 'right';
				}
				else if($this.hasClass('fpd-bold')) {
					_setStyle(currentElement, 'fontWeight', currentElement.getFontWeight() == 'bold' ? '' : 'bold');
				}
				else if($this.hasClass('fpd-italic')) {
					_setStyle(currentElement, 'fontStyle', currentElement.getFontStyle() == 'italic' ? '' : 'italic');
				}

				//call setfill again, otherwise font styles are not attached to curved text
				if(currentElement.type == 'curvedText') {
					currentElement.setFill(currentElement.fill);
				}

				stage.renderAll();
			});

			//curved text
			$curvedTextWrapper.find('.fpd-curved-text-radius').on('change keyup', function() {

				currentElement.set('radius', this.value);
				currentElement.params.curveRadius = this.value;
				_checkContainment(currentElement);
				stage.renderAll();

			});

			$curvedTextWrapper.find('.fpd-curved-text-spacing').on('change keyup', function() {

				currentElement.set('spacing', this.value);
				currentElement.params.curveSpacing = this.value;
				_checkContainment(currentElement);
				stage.renderAll();

			});

			$curvedTextWrapper.find('.fpd-curve-reverse').click(function() {

				currentElement.set('reverse', !currentElement.reverse);
				currentElement.params.curveReverse = currentElement.reverse;
				stage.renderAll();

			});

			$curvedTextWrapper.find('.fpd-curve-toggle').click(function() {

				var z = _getZPosition(currentElement),
					defaultText = currentElement.getText(),
					params = currentElement.params;

				params.z = z;
				params.curved = currentElement.type == 'i-text';

				function _onTextModeChanged(evt, textElement) {
					stage.setActiveObject(textElement);
					$elem.off('elementAdded', _onTextModeChanged);
				};
				$elem.on('elementAdded', _onTextModeChanged);

				thisClass.removeElement(currentElement);
				thisClass.addElement('text', defaultText, defaultText, params);

			});

			//patterns
			if(options.patterns && options.patterns.length > 0) {

				for(var i=0; i < options.patterns.length; ++i) {
					var patternUrl = options.patterns[i];
					$patternWrapper.children('.fpd-pattern-items').append('<div><img src="'+patternUrl+'" class="rounded ui image" /></div>')
					.children('div:last').click(function() {
						_setPattern($(this).children('img').attr('src'), currentElement);
					});
				}

				_createScrollbar($patternWrapper.children('.fpd-pattern-items'));

			}

			//center element
			$helperButtons.children('.fpd-center-horizontal, .fpd-center-vertical').click(function(evt) {
				evt.preventDefault();
				var $this = $(this);
				_centerObject(currentElement, $this.hasClass('fpd-center-horizontal'), $this.hasClass('fpd-center-vertical'), currentBoundingObject ? currentBoundingObject.getBoundingRect() : false);
			});

			//change z position
			$helperButtons.children('.fpd-move-down, .fpd-move-up').click(function(evt) {
				evt.preventDefault();
				var objects = stage.getObjects(),
					currentZIndex,
					lowestZIndex = null,
					highestZIndex = null;

				for(var i=0; i <objects.length; ++i) {
					//get lowest and highest z index of view
					if(objects[i].viewIndex == currentViewIndex) {
						if(lowestZIndex == null) {
							lowestZIndex = i;
						}
						if(highestZIndex == null) {
							highestZIndex = i;
						}
						else {
							highestZIndex++;
						}
					}
					//get z-index of the current element
					if(objects[i] == currentElement) {
						currentZIndex = i;
					}
				}

				if(currentZIndex > highestZIndex) {
					currentZIndex = highestZIndex;
				}
				if(currentZIndex < lowestZIndex) {
					currentZIndex = lowestZIndex;
				}

				if($(this).hasClass('fpd-move-down')) {
					if(currentZIndex != lowestZIndex) {
						currentElement.moveTo(currentZIndex-1);
					}
				}
				else {
					if(currentZIndex != highestZIndex) {
						currentElement.moveTo(currentZIndex+1);
					}
				}

				_bringToppedElementsToFront();

			});

			//reset element to his origin
			$helperButtons.children('.fpd-reset').click(function(evt) {
				evt.preventDefault();
				if(currentElement) {
					var originParams = currentElement.originParams;

					if(currentElement.type == 'i-text'  || currentElement.type == 'curvedText') {
						currentElement.fontSize = originParams.textSize;
						currentElement.setText(originParams.source);
						currentElement.setTextAlign(originParams.textAlign);
						currentElement.setFontStyle(originParams.fontStyle);
						currentElement.setFontWeight(originParams.fontWeight);
						$toolbar.children('.fpd-text-format-section').find('textarea').val(originParams.source);
						if(originParams.font) {
							currentElement.setFontFamily(originParams.font);
							if($fontsDropdown) {
								$fontsDropdown.children('option[value="'+originParams.font+'"]').prop('selected', 'selected').trigger("chosen:updated");
							}

						}

					}

					if(originParams.autoCenter) {
						_doCentering(currentElement);
						originParams.x = currentElement.left;
						originParams.y = currentElement.top;
					}
					else {
						currentElement.left = originParams.x;
						currentElement.top = originParams.y;
					}

					currentElement.scaleX = originParams.scale;
					currentElement.scaleY = originParams.scale;
					currentElement.angle = originParams.degree;

					if(originParams.colors && originParams.currentColor != originParams.colors[0]) {
						var colors = currentElement.type == 'path-group' ? originParams.colors : originParams.colors[0];
						_changeColor(currentElement, colors);
				    }

				     $(window).resize();

				    _checkContainment(currentElement);

				    stage.renderAll();

					currentElement.params = $.extend({}, originParams);
				}
			});

			//remove object
			$helperButtons.children('.fpd-trash').click(function(evt) {

				evt.preventDefault();
				thisClass.removeElement(currentElement);

			});

			//text changer
			$toolbar.children('.fpd-text-format-section').find('textarea').keyup(function() {

				_changeText(currentElement, this.value);

			});

			//download image handler
			if(options.imageDownloadable) {
				$menubar.find('.fpd-download-image').click(function(evt) {
					var a = document.createElement('a');
					if (typeof a.download != "undefined") {
					    $menubar.find('.fpd-download-anchor').attr('href', thisClass.getProductDataURL()).attr('download', 'Product.png')[0].click();
					}
					else {
						thisClass.createImage(true, true);
					}

				}).show();
			}


			//print product handler
			if(options.printable) {
				$menubar.find('.fpd-print').click(function(evt) {
					evt.preventDefault();
					thisClass.print();
				}).show();
			}

			//reset product handler
			if(options.resettable) {
				$menubar.find('.fpd-reset-product').click(function(evt) {
					evt.preventDefault();
					thisClass.loadProduct(currentViews);
				}).show();
			}

			//chosen css modifications
			if(options._useChosen) {
				$sidebarContent.find('.fpd-elements-dropdown').chosen({width: '100%'});
			}
			//$elem.find('.chosen-container').addClass('fpd-border-color');

			//load editor box if requested
			if(options.editorMode) {
				$.post(
					options.templatesDirectory+'editorbox.php',
					function(html){
						$elem.after($.parseHTML(html));
						$editorBox = $elem.next('.fpd-editor-box');
					}
				)
			}

			$initText.remove();

			$elem.fadeIn(500, function() {
				$elem.trigger('ready')
			});

			//window resize handler
			$(window).resize(function() {

				responsiveScale = $productContainer.outerWidth() < options.dimensions.productStageWidth ? $productContainer.outerWidth() / options.dimensions.productStageWidth : 1;
				responsiveScale = Number(responsiveScale.toFixed(2));
				responsiveScale = responsiveScale > 1 ? 1 : responsiveScale;

				stage.setDimensions({width: $productContainer.width() * zoomScale, height: options.dimensions.productStageHeight * zoomScale * responsiveScale});
				$productStage.height(options.dimensions.productStageHeight * responsiveScale);

				var objects = stage.getObjects();

				for(var i = 0; i < objects.length; ++i) {
					var object = objects[i];
					object.scaleX = object.params.scale * responsiveScale * zoomScale;
			        object.scaleY = object.params.scale * responsiveScale * zoomScale;
			        object.left = object.params.x * responsiveScale * zoomScale;
			        object.top = object.params.y * responsiveScale * zoomScale;
					object.setCoords();
				}
				stage.renderAll().calcOffset();

			}).resize();

			//click handler for the tabs navigation
			$sidebarNavi.find('.fpd-nav-item').click(function(evt) {

				evt.preventDefault();
				var $this = $(this);
				if(!$this.hasClass('active')) {

					$this.parent().children().removeClass('fpd-secondary-bg-color fpd-primary-text-color active').addClass('fpd-secondary-text-color');
					$this.removeClass('fpd-secondary-text-color').addClass('fpd-secondary-bg-color fpd-primary-text-color active');

					$sidebarContent.children('div').hide();
					$sidebarContent.children($this.data('target')).show();

				}

				stage.calcOffset();

			}).filter(':visible:first').click();

			//load first product
			if($sidebarContent.find('.fpd-products .fpd-items-wrapper > picture:first').size() > 0) {
				$sidebarContent.find('.fpd-products .fpd-items-wrapper > picture:first').click();
			}
			else {
				$productLoader.hide();
			}

		}

		//if an object is editable, set the modification parameters
		var _setModification = function(element) {

			var elemParams = element.params;

			if(	typeof elemParams.colors === 'object' ||
				elemParams.removable ||
				elemParams.draggable ||
				elemParams.resizable ||
				elemParams.rotatable ||
				elemParams.zChangeable ||
				elemParams.editable ||
				elemParams.patternable
				|| elemParams.uploadZone) {

				element.isEditable = element.evented = true;
				element.set('selectable', true);

				if(element.viewIndex == currentViewIndex && !elemParams.uploadZone) {
					$sidebarContent.find('.fpd-elements-dropdown')
					.append('<option value="'+element.id+'">'+element.title+'</option>')
					.trigger("chosen:updated");
				}

			}

			if(options.editorMode) {
				return false;
			}

			if(elemParams.draggable && !elemParams.uploadZone) {
				element.lockMovementX = element.lockMovementY = false;
			}

			if(elemParams.rotatable && !elemParams.uploadZone) {
				element.lockRotation = false;
			}

			if(elemParams.resizable && !elemParams.uploadZone) {
				element.lockScalingX = element.lockScalingY = false;
			}

			if((elemParams.resizable || elemParams.rotatable || elemParams.removable)  && !elemParams.uploadZone) {
				element.hasControls = true;
			}

		};

		var _elementCreated = function(element) {

			var params = element.params;

			//set modification options
			_setModification(element);

			//replace element
			if(params.replace && params.replace != '') {
				var objects = stage.getObjects();
				for(var i = 0; i < objects.length; ++i) {
					var object = objects[i];
					if(object.params != undefined && object.clipFor == undefined && object.params.replace == params.replace && object.type == element.type && object.visible) {
						params.z = _getZPosition(object);
						params.x = object.params.x;
						params.y = object.params.y;
						params.autoCenter = false;
						thisClass.removeElement(object);
						break;
					}
				}
			}

			//add to stage
			stage.add(element);

			//center element
			if(params.autoCenter) {
				_doCentering(element);
			}

			//change element color
			if(params.currentColor && params.pattern == null) {
				_changeColor(element, params.currentColor);
			}

			//clip element
			_clipElement(element);

			//set z position
			if(params.z >= 0) {
				_setZIndex(element, params.z);
			}

			//select element
			if(params.autoSelect && element.isEditable) {
				stage.setActiveObject(element);
				element.setCoords();
			}

			//check for other topped elements
			_bringToppedElementsToFront();

			//bring element to front
			if(params.topped) {
				element.bringToFront();
			}

			stage.renderAll().calcOffset();

			$(window).resize();

		};

		var _createSingleView = function(title, elements) {

			var element = elements[0];
			//check if view contains at least one element
			if(element) {
				var countElements = 0;
				//iterative function when element is added, add next one
				function _onElementAdded(evt, addedElement) {

					countElements++;
					//add all elements of a view
					if(countElements < elements.length) {
						var element = elements[countElements];
						thisClass.addElement( element.type, element.source, element.title, element.parameters, viewsLength-1);
					}
					//all elements are added
					else {
						$elem.off('elementAdded', _onElementAdded);
						$elem.trigger('viewCreate', [elements, title]);
					}

				};
				//listen when element is added
				$elem.on('elementAdded', _onElementAdded);
				//add first element of view
				thisClass.addElement( element.type, element.source, element.title, element.parameters, viewsLength-1);
			}
			//no elements in view, view is created without elements
			else {
				$elem.trigger('viewCreate', [elements, title]);
			}

		}

		var _checkContainment = function(target) {

			if(currentBoundingObject && !target.params.boundingBoxClipping) {

				target.setCoords();

				var targetCoordsTL = target.oCoords.tl,
					isOut = false,
					tempIsOut = target.isOut;

				var isOut = !target.isContainedWithinRect(
					{x: currentBoundingObject.oCoords.tl.x, y: currentBoundingObject.oCoords.tl.y},
					{x: currentBoundingObject.oCoords.br.x, y: currentBoundingObject.oCoords.br.y}
				);

				if(isOut) {
					target.borderColor = options.outOfBoundaryColor;
					if(options.tooltips ) {
						$elementTooltip.css({
							right: stage.getWidth() - targetCoordsTL.x - 20,
							top: targetCoordsTL.y - $elementTooltip.outerHeight() - 10
						}).show();
					}
					target.isOut = true;
				}
				else {
					target.borderColor = options.selectedColor;
					$elementTooltip.hide();
					target.isOut = false;
				}


				if(tempIsOut != target.isOut && tempIsOut != undefined) {
					if(isOut) {
						$elem.trigger('elementOut');
					}
					else {
						$elem.trigger('elementIn');
					}
				}
			}

		};

		var _changeColor = function(element, hex, temp) {

			temp = typeof temp === 'undefined' ? false : temp;

			if(hex.length == 4) {
				hex += hex.substr(1, hex.length);
			}

			if(element.type == 'i-text'  || element.type == 'curvedText') {
				//set color of a text element
				element.setFill(hex);
				stage.renderAll();
				if(temp == false) { element.params.pattern = null; }
				$colorPicker.find('input').spectrum("set", hex);
			}
			else if(element.type == 'path-group') {
				for(var i=0; i<hex.length; ++i) {
					element.paths[i].setFill(hex[i]);
					$colorPicker.find('input').eq(i).spectrum("set", hex[i]);
				}
			}
			else {

				var colorizable = _elementIsColorizable(element);
				if(colorizable == 'png' || colorizable == 'dataurl') {
					element.filters.push(new fabric.Image.filters.Tint({color: hex, opacity: 1}));
					try {
						element.applyFilters(stage.renderAll.bind(stage));
					}
					catch(evt) {
						alert("Image element could not be colorized. Please be sure that the image is hosted under the same domain and protocol, in which you are using the product designer!");
					}

				}
				else if(colorizable == 'svg') {
					element.setFill(hex);
				}

				$colorPicker.find('input').spectrum("set", hex);

			}

			if(temp == false) { element.params.currentColor = hex; }


			_checkColorControl(element, hex);
			_updateEditorBox(element);

		};

		var _changeSVGColor = function(svgGroup, hex, index) {


			if(hex.length == 4) {
				hex += hex.substr(1, hex.length);
			}

			element.setFill(hex);


		};

		//checks if the color of another element is controlled by the current element color
		var _checkColorControl = function(object, color) {
			if(object.colorControlFor) {

				var objects = object.colorControlFor;
				for(var i=0; i < objects.length; ++i) {
					_changeColor(objects[i], color);
				}
			}
		}

		//returns an object with the saved products for the current showing product
		var _getSavedProducts = function() {

			return JSON.parse(window.localStorage.getItem($elem.attr('id')));

		};

		//check if key is valid and available
		var _checkStorageKey = function(key) {

			//check if a key is set
			if(key == null) { return -1; }
			//check if key is not empty
			else if(key == "") { return 0; }

			//everything is fine
			return 1;

		};

		var _doCentering = function(object) {

			_centerObject(object, true, true, thisClass.getBoundingBoxCoords(object));
			object.params.autoCenter = false;

		};

		//center object
		var _centerObject = function(object, hCenter, vCenter, boundingBox) {

			var left, top;

			if(hCenter) {

				if(boundingBox) {

					//originX = left
					if(object.originX == 'left') {
						left = boundingBox.left + boundingBox.width * 0.5 - object.width * 0.5;

					}
					//oringX = center
					else {
						left = boundingBox.left + boundingBox.width * 0.5;
					}

				}
				else {

					if(object.originX == 'left') {
						left = stage.getWidth() * 0.5 - object.width * 0.5;
					}
					else {
						left = stage.getWidth() * 0.5;
					}

				}

				object.left = left;

			}

			if(vCenter) {
				if(boundingBox) {

					//originX = left
					if(object.originX == 'left') {
						top = boundingBox.top + boundingBox.height * 0.5 - object.width * 0.5;
					}
					//oringX = center
					else {
						top = boundingBox.top + boundingBox.height * 0.5;
					}

				}
				else {

					if(object.originX == 'left') {
						top = stage.getHeight() * 0.5 - object.height * 0.5;
					}
					else {
						top = stage.getHeight() * 0.5;
					}

				}

				object.top = top;

			}

			_checkContainment(object);
			stage.renderAll();
			object.setCoords();

			if(left != undefined) {
				object.params.x = left;
			}

			if(top != undefined) {
				object.params.y = top;
			}

		};

		var _addSavedProduct = function(thumbnail, product) {


			//create new list item

			var $list = $menubar.find('.fpd-saved-products');

			$list.find('.menu').append('<div class="item fpd-clearfix"><img src="'+thumbnail+'" /><i class="fpd-primary-text-color fa fa-times"></i></div>')
			.children('div:last').click(function(evt) {
				//load product
				thisClass.loadProduct($(this).data('product'));
				currentProductIndex = -1;
			}).data('product', product)
			//remove stored product
			.children('i').click(function(evt) {
				evt.stopPropagation();

				//confirm delete
				var result = confirm(options.labels.confirmProductDelete);
				if(!result) { return false; }

				var $items = $list.find('.menu > .item'),
					index = $items.index($(this).parent('.item').remove()),
					savedProducts = _getSavedProducts();

				savedProducts.splice(index, 1);

				window.localStorage.setItem($elem.attr('id'), JSON.stringify(savedProducts));

			});

			$list.hover(
				function() {
					$list.find('.menu').slideDown();
				},
				function() {
					$list.find('.menu').stop().slideUp();
				}
			);

		};

		var _createScrollbar = function($target) {

			if($target.hasClass('ps-container')) {
				$target.perfectScrollbar('update').scrollTop(0);
			}
			else {
				$target.perfectScrollbar({includePadding: true})
				.mouseenter(function(){
					$(this).perfectScrollbar('update');
				});
			}

		};

		var _sortByName = function (a, b) {

		    var x = a.name.toLowerCase();
		    var y = b.name.toLowerCase();
		    return ((x < y) ? -1 : ((x > y) ? 1 : 0));

		};

		var _updateEditorBox = function(element) {

			if($editorBox == undefined) {
				return false;
			}

			var params = element.params;
			$editorBox.find('.fpd-current-element').text(element.title);
			$editorBox.find('.fpd-position').text('x: ' + params.x + ' y: '+ params.y);
			$editorBox.find('.fpd-dimensions').text('width: ' + Math.round(element.getWidth()) + ' height: '+ Math.round(element.getHeight()));
			$editorBox.find('.fpd-scale').text(Number(params.scale) % 360);
			$editorBox.find('.fpd-degree').text(params.degree);
			$editorBox.find('.fpd-color').text(params.currentColor);

		};

		var _renderOnFontLoaded = function(fontName) {

			WebFont.load({
				custom: {
				  families: [fontName]
				},
				fontactive: function(familyName, fvd) {
					stage.renderAll();
				}
			});

		};

		var _elementIsColorizable = function(element) {

			if(element.type == 'i-text'  || element.type == 'curvedText') {
				return 'text';
			}

			//check if url is a png or base64 encoded
			var imageParts = element.source.split('.');
			//its base64 encoded
			if(imageParts.length == 1) {
				if(imageParts[0].search('data:image/png;') == -1) {
					element.params.currentColor = element.params.colors = false;
					return false;
				}
				else {
					return 'dataurl';
				}
			}
			//its a url
			else {
				//not a png, not colorization
				if($.inArray('png', imageParts) == -1 && $.inArray('svg', imageParts) == -1) {
					element.params.currentColor = element.params.colors = false;
					return false;
				}
				else {
					if($.inArray('svg', imageParts) == -1) {
						return 'png';
					}
					else {
						return 'svg';
					}
				}
			}
		};

		var _setPattern = function(url, element) {

			if(element.type == 'image') {

				/*fabric.Image.fromURL(url, function(img) {

					img.scaleToWidth(100);
					var patternSourceCanvas = new fabric.StaticCanvas();
					patternSourceCanvas.add(img);

					var pattern = new fabric.Pattern({
						source: function() {
							patternSourceCanvas.setDimensions({
								width: img.getWidth(),
								height: img.getHeight()
							});
							return patternSourceCanvas.getElement();
						},
						repeat: 'repeat'
					});

					element.setFill(pattern);
					stage.renderAll();
				});*/

			}
			else if(element.type == 'i-text'  || element.type == 'curvedText') {

				fabric.util.loadImage(url, function(img) {

					element.setFill(new fabric.Pattern({
						source: img,
						repeat: 'repeat'
					}));
					stage.renderAll();
					element.params.pattern = url;
				});

			}

		};

		//set the z-index of an element
		var _setZIndex = function(element, z) {

			var objects = stage.getObjects(),
				viewZIndexes = 0;

			for(var i=0; i < objects.length; ++i) {
				var object = objects[i];
				//only objects of the current view
				if(object.visible) {
					//detect when required z-index of view reached
					if(viewZIndexes == z) {
						element.moveTo(i);
						break;
					}
					viewZIndexes++;
				}
			}
		};

		var _addDesignToList = function(design) {

			var $designsList = $sidebarContent.find('.fpd-designs .fpd-items-wrapper');

			$designsList.append('<picture data-source="'+design.source+'"><span class="fpd-loading"></span><img src="'+design.thumbnail+'" title="'+design.title+'" style="display: none;" /></picture>')
			.children('picture:last').click(function(evt) {
				evt.preventDefault();

				var $this = $(this),
					designParams = $this.data('parameters');

				thisClass.addElement('image', $this.data('source'), $this.children('img').attr('title'), designParams, currentViewIndex);

			}).data('parameters', design.parameters)
			.children('img').load(function() {

				$(this).fadeIn(500).prev('span').fadeOut(300, function() {
					$(this).remove();
					_createScrollbar($designsList);
				});

			});

		};

		var _setStyle = function(object, styleName, value) {
			object[styleName] = object.params[styleName] = value;
		};

		var _getZPosition = function(element) {

			var objects = stage.getObjects(),
				zCounter = 0;

			for(var i = 0; i < objects.length; ++i) {
				if(objects[i].visible) {
					if(element === objects[i]) {
						return zCounter;
						break;
					}
					zCounter++;
				}
			}

		};

		var _authenticateInstagram = function(callback) {

			var popupLeft = (window.screen.width - 700) / 2,
				popupTop = (window.screen.height - 500) / 2;

			var popup = window.open(options.phpDirectory+'/instagram_auth.php', '', 'width=700,height=500,left='+popupLeft+',top='+popupTop+'');
			// _popupBlockerAlert(popup);

			popup.onload = new function() {

				if(window.location.hash.length == 0) {
					popup.open('https://instagram.com/oauth/authorize/?client_id='+options.instagramClientId+'&redirect_uri='+options.instagramRedirectUri+'&response_type=token', '_self');
				}

				var interval = setInterval(function() {
					try {
						if(popup.location.hash.length) {
							clearInterval(interval);
							window.localStorage.setItem('fpd_instagram_access_token', popup.location.hash.slice(14));
							popup.close();
							if(callback != undefined && typeof callback == 'function') callback();
						}
					}
					catch(evt) {
						//permission denied
					}

				}, 100);
			}

		};

		var _loadInstaImages = function(endpoint) {

			var endpointUrl,
				instaAccessToken = window.localStorage.getItem('fpd_instagram_access_token');

			switch(endpoint) {
				case 'feed':
					endpointUrl = 'https://api.instagram.com/v1/users/self/feed?access_token='+instaAccessToken;
				break;
				case 'recent':
					endpointUrl = 'https://api.instagram.com/v1/users/self/media/recent?access_token='+instaAccessToken;
				break;
				default:
					endpointUrl = endpoint;
			}

			var $instaPhotosList = $sidebarContent.children('.fpd-instagram-photos').children('.fpd-items-wrapper').css('visibility', 'hidden'),
				$instaLoadNext = $sidebarContent.children('.fpd-instagram-photos').find('.fpd-insta-load-next');

			$instaPhotosList.children('picture').remove();

			$.ajax({
		        method: 'GET',
		        url: endpointUrl,
		        dataType: 'jsonp',
		        jsonp: 'callback',
		        jsonpCallback: 'jsonpcallback',
		        cache: false,
		        success: function(data) {

		        	if(data.data) {

		        		if(data.pagination && data.pagination.next_url) {

							$instaLoadNext.removeClass('disabled').data('href', data.pagination.next_url).off('click').on('click', function() {
								_loadInstaImages($(this).data('href'));
								$instaLoadNext.addClass('disabled').off('click');
							});
		        		}
		        		else {
			        		$instaLoadNext.addClass('disabled').off('click');
		        		}

			        	$.each(data.data, function(i, item) {
			        		if(item.type == 'image') {
				        		$instaPhotosList.append('<picture><span class="fpd-loading"></span><img src="'+item.images.thumbnail.url+'" title="'+item.id+'" data-picture="'+item.images.standard_resolution.url+'" style="display: none;" /></picture>')
								.children('picture:last').click(function(evt) {

									evt.preventDefault();
									$productLoader.show();

									var $img = $(this).children('img');

									$.post(options.phpDirectory + 'get_image_data_url.php', { url: $img.data('picture') }, function(data) {

										if(data && data.error == undefined) {

											var picture = new Image();
											picture.src = data.data_url;
											picture.onload = function() {

												options.customImagesParameters.scale = thisClass.getScalingByDimesions(
													this.width,
													this.height,
													options.customImagesParameters.resizeToW,
													options.customImagesParameters.resizeToH
												);

												thisClass.addElement('image', this.src, $img.attr('title'), options.customImagesParameters, currentViewIndex);
											};

										}
										else {
											alert(data.error);
										}

										$productLoader.hide();

									}, 'json')
									.fail(function(evt) {

										$productLoader.hide();
										alert(evt.statusText);

									});

								})
								.children('img').load(function() {

									//fade in photo and remove loading gif
									$(this).fadeIn(500).prev('span').fadeOut(300, function() {
										$(this).remove();
										 _createScrollbar($instaPhotosList);
									});

								})
								.error(function() {
									//image not found, remove associated list item
									$(this).parent().remove();
								});

			        		}

			            });

			            $instaPhotosList.css('visibility', 'visible');

		        	}
		        	else {
			        	_authenticateInstagram(function() {
				        	_loadInstaImages(endpoint);
			        	});
		        	}

		        },
		        error: function(jqXHR, textStatus, errorThrown) {
		            alert("Could not load data from instagram. Please try again!");
		        }
		    });

		};

		var _clipElement = function(element) {

			var params = element.params;

			if(params.boundingBox && params.boundingBoxClipping) {

				var bbCoords = thisClass.getBoundingBoxCoords(element);
				if(bbCoords) {

					var clippingArea = new fabric.Rect({
						left: bbCoords.left,
						top: bbCoords.top,
						width: bbCoords.width,
						height: bbCoords.height,
						originX: 'left',
						originY: 'top',
						fill: 'transparent',
						selectable: false,
						evented: false,
						clipFor: element.id,
						viewIndex: element.viewIndex,
						visible: false,
						params: {
							x: bbCoords.left,
							y: bbCoords.top,
							scale: params.scale
						}
					});
					stage.add(clippingArea);

					element.setClipTo(function(ctx) {
						_clipById(ctx, this);
					});

				}

			}

		};

		var _findByClipId = function(id) {

			var objects = stage.getObjects();
			for(var i = 0; i < objects.length; ++i) {
				if(objects[i].clipFor == id) {
					return objects[i];
					break;
				}
			}

		};

		var _clipById = function (ctx, _this) {

		    var clipRect = _findByClipId(_this.id);
		    var scaleXTo1 = (1 / _this.scaleX);
		    var scaleYTo1 = (1 / _this.scaleY);
		    ctx.save();
		    ctx.translate(0,0);
		    ctx.rotate(fabric.util.degreesToRadians(_this.angle * -1));
		    ctx.scale(scaleXTo1, scaleYTo1);
		    ctx.beginPath();
		    ctx.rect(
		        clipRect.left - _this.left - (_this.originX == 'left' ? _this.width * .5 : 0),
		        clipRect.top - _this.top - (_this.originY == 'top' ? _this.height * .5 : 0),
		        clipRect.width * zoomScale* responsiveScale,
		        clipRect.height * zoomScale* responsiveScale
		    );
		    ctx.fillStyle = 'transparent';
		    ctx.fill();
		    ctx.closePath();
		    ctx.restore();

		};

		var _changeText = function(element, text) {

			if(element.params.maxLength != 0 && text.length > element.params.maxLength) {
				text = text.substr(0, element.params.maxLength);
				element.selectionStart = element.params.maxLength;
			}

			$sidebarContent.find('.fpd-elements-dropdown').children('option[value="'+element.id+'"]').text(text).trigger("chosen:updated");
			$toolbar.children('.fpd-text-format-section').find('textarea').val(text);

			element.params.text = element.title = text;
			element.setText(text);
			stage.renderAll();

			_checkContainment(element);

		};

		var _positionElements = function(scale) {

			var objects = stage.getObjects();

			for(var i = 0; i < objects.length; ++i) {
				var object = objects[i];
				object.scaleX = object.params.scale * scale * zoomScale;
		        object.scaleY = object.params.scale * scale * zoomScale;
		        object.left = object.params.x * scale * zoomScale;
		        object.top = object.params.y * scale * zoomScale;
				object.setCoords();
			}

			return objects;

		};

		var _bringToppedElementsToFront = function() {

			var objects = stage.getObjects(),
				bringToFrontObj = [];

			for(var i = 0; i < objects.length; ++i) {
				var object = objects[i];
				if(object.visible && object.params.topped) {
					bringToFrontObj.push(object);
				}
			}

			for(var i = 0; i < bringToFrontObj.length; ++i) {
				bringToFrontObj[i].bringToFront();
			}
		};

		/*var _popupBlockerAlert = function(popup) {

			if (popup == null || typeof(popup)=='undefined') {
				alert('Please disable your pop-up blocker and try again.');
			}

		};*/

		var _isUrl = function(s) {
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			return regexp.test(s);
		};



		//----------------------------------
		// ------- PUBLIC METHODS ----------
		//----------------------------------


		this.getBoundingBoxCoords = function(element) {

			var params = element.params;
			if(params.boundingBox || params.uploadZone) {
				var boundingBox;
				if(typeof params.boundingBox == "object") {
					return {
						left: params.boundingBox.x,
						top:params.boundingBox.y,
						width: params.boundingBox.width,
						height: params.boundingBox.height
					};
				}
				else {
					var objects = stage.getObjects();
					for(var i=0; i < objects.length; ++i) {
						//get all layers from first view
						var object = objects[i];
						if(object.viewIndex == currentViewIndex) {
							if(params.boundingBox == object.title) {

								var bbRect = object.getBoundingRect();
								return {
									left: bbRect.left / responsiveScale / zoomScale,
									top: bbRect.top / responsiveScale / zoomScale,
									width: bbRect.width / responsiveScale / zoomScale,
									height: bbRect.height / responsiveScale / zoomScale
								};

								break;
							}
						}
					}
				}
			}

			return false;

		};

		//Returns JSON representation of canvas
		this.getFabricJSON = function() {

			thisClass.deselectElement();
			var json = stage.toJSON(['viewIndex']);
			json.width = stage.width;
			json.height = stage.height;

			return json;

		};

		/*
		*	Returns the current price for the product
		*
		*/
		this.getPrice = function() {

			return currentPrice;

		};

		/*
		*	Returns the current product with all views
		*	onlyEditableElements (boolean): If set to true, it will only returns the editable elements in a view
		*
		* 	Returns an array with all views
		*/
		this.getProduct = function(onlyEditableElements) {
			 onlyEditableElements = typeof onlyEditableElements !== 'undefined' ? onlyEditableElements : false;

			thisClass.deselectElement();
			thisClass.zoomReset();

			var objects = stage.getObjects();
			for(var i=0; i<objects.length;++i) {
				var object = objects[i];
				if(object.isOut) {
					alert('"'+object.title+'":' + options.labels.outOfContainmentAlert);
					return false;
				}
			}

			var product = [];
			//add views
			for(var i=0; i<currentViews.length; ++i) {
				var view = currentViews[i];
				product.push({title: view.title, thumbnail: view.thumbnail, elements: []});
			}

			for(var i=0; i<objects.length;++i) {
				var object = objects[i];
				var jsonItem = {title: object.title, source: object.source, parameters: object.params, type: (object.type == 'i-text' || object.type == 'curvedText') ? 'text' : 'image'};

				if(object.clipFor == undefined) {
					if(onlyEditableElements) {
						if(object.isEditable) {
							product[object.viewIndex].elements.push(jsonItem);
						}
					}
					else {
						product[object.viewIndex].elements.push(jsonItem);
					}
				}

			}

			//returns an array with all views
			return product;

		};

		/*
		*	Returns the product index
		*
		* 	Returns a number
		*/
		this.getProductIndex = function() {

			return currentProductIndex;

		};


		/*
		*	Returns the responsive scale value
		*
		* 	Returns a number
		*/
		this.getResponsiveScale = function() {

			return responsiveScale;

		};

		/*
		*	Returns an array with the image data urls of the current views in the stage
		*
		*/
		this.getViewsDataURL = function(format, backgroundColor, multiplier) {

			format = typeof format !== 'undefined' ? format : 'png';
			backgroundColor = typeof backgroundColor !== 'undefined' ? backgroundColor : 'transparent';
			multiplier = typeof multiplier !== 'undefined' ? multiplier : 1;

			thisClass.deselectElement();
			thisClass.zoomReset();

			var dataURLs = [],
				tempStageWidth = stage.getWidth(),
				tempStageHeight = stage.getHeight();

			stage.setDimensions({width:options.dimensions.productStageWidth, height: options.dimensions.productStageHeight}).setBackgroundColor(backgroundColor, function() {

				var objects = _positionElements(1);

				for(var i=0; i<viewsLength;++i) {
					for(var j=0; j<objects.length; ++j) {
						var object = objects[j];
						object.visible = object.viewIndex == i;
					}
					try {
						dataURLs.push(stage.toDataURL({format: format, multiplier: multiplier}));
					}
					catch(evt) {
						alert("Error: Please be sure that the images are hosted under the same domain and protocol, in which you are using the product designer!");
					}

				}

				//hide elements again that are not in the current view index
				for(var i=0; i<objects.length; ++i) {
					var object = objects[i];
					object.visible = object.viewIndex == currentViewIndex;
				}

				_positionElements(responsiveScale)
				stage.setDimensions({width: tempStageWidth, height: tempStageHeight}).setBackgroundColor('transparent').renderAll();

			});

			return dataURLs;

		};

		/*
		*	Returns an array with with the current views in SVG format
		*
		*/
		this.getViewsSVG = function() {

			thisClass.deselectElement();
			thisClass.zoomReset();

			var SVGs = [],
				tempStageWidth = stage.getWidth(),
				tempStageHeight = stage.getHeight();

			stage.setDimensions({width:options.dimensions.productStageWidth, height: options.dimensions.productStageHeight});

			var objects = _positionElements(1);

			for(var i=0; i < viewsLength; ++i) {

				for(var j=0; j<objects.length; ++j) {
					var object = objects[j];
					object.visible = object.viewIndex == i;

					if(object.type == 'path-group') {
						object.left = (object.params.x * 1) - object.getWidth() * 0.5;
						object.top = (object.params.y * 1) - object.getHeight() * 0.5;
						object.setCoords();
					}
				}

				var svg = stage.toSVG(),
					$svg = $(svg);

				$svg.children('rect').remove(); //remove bounding boxes
				$svg.children('g').children('[style*="visibility: hidden"]').parent('g').remove(); //remove hidden elements
				svg = $('<div>').append($svg.clone()).html().replace(/(?:\r\n|\r|\n)/g, '');

				SVGs.push(svg);

			}

			//hide elements again that are not in the current view index
			for(var i=0; i<objects.length; ++i) {
				var object = objects[i];
				object.visible = object.viewIndex == currentViewIndex;

				if(object.type == 'path-group') {
					object.left = (object.params.x * responsiveScale);
					object.top = (object.params.y * responsiveScale);
					object.setCoords();
				}
			}

			_positionElements(responsiveScale)
			stage.setDimensions({width: tempStageWidth, height: tempStageHeight}).renderAll();

			return SVGs;

		};

		/*
		*	Returns the base64 data url of all views
		*
		*/
		this.getProductDataURL = function(format, backgroundColor, multiplier) {

			format = typeof format !== 'undefined' ? format : 'png';
			backgroundColor = typeof backgroundColor !== 'undefined' ? backgroundColor : 'transparent';
			multiplier = typeof multiplier !== 'undefined' ? multiplier : 1;

			thisClass.deselectElement();
			thisClass.zoomReset();
			thisClass.selectView(0);

			var dataUrl,
				tempStageWidth = stage.getWidth(),
				tempStageHeight = stage.getHeight();

			stage.setBackgroundColor(backgroundColor, function() {

				//increase stage height and reposition objects
				stage.setDimensions({width: options.dimensions.productStageWidth, height: options.dimensions.productStageHeight * viewsLength});

				var objects = _positionElements(1);
				for(var i=0; i<objects.length; ++i) {
					var object = objects[i];
					object.visible = true;
					object.top = object.top + (object.viewIndex * options.dimensions.productStageHeight);
				}

				//get data url
				try {
					dataUrl = stage.toDataURL({format: format, multiplier: multiplier});
				}
				catch(evt) {
					alert("Error: Please be sure that the images are hosted under the same domain and protocol, in which you are using the product designer!");
				}

				//set stage height to default
				for(var i=0; i<objects.length; ++i) {
					var object = objects[i];
					object.visible = object.viewIndex == 0;
					object.top = object.top - (object.viewIndex * options.dimensions.productStageHeight);
				}
				_positionElements(responsiveScale);
				stage.setDimensions({width: tempStageWidth, height: tempStageHeight}).setBackgroundColor('transparent').renderAll();

			});

			return dataUrl;

		};

		/*
		*	Returns the amount of products in the products sidebar
		*
		*/
		this.getProductsLength = function() {

			return $sidebarContent.find('.fpd-products .fpd-items-wrapper > picture').size();

		};

		/*
		*	Returns the current view object
		*
		*/
		this.getView = function() {

			return currentViews[currentViewIndex];

		};

		/*
		*	Returns the base64 data url of the current view
		*
		*/
		this.getViewDataURL = function(format, backgroundColor, multiplier) {

			format = typeof format !== 'undefined' ? format : 'png';
			backgroundColor = typeof backgroundColor !== 'undefined' ? backgroundColor : 'transparent';
			multiplier = typeof multiplier !== 'undefined' ? multiplier : 1;

			thisClass.deselectElement();
			thisClass.zoomReset();

			var dataURL = '',
				tempStageWidth = stage.getWidth(),
				tempStageHeight = stage.getHeight();

			stage.setDimensions({width: options.dimensions.productStageWidth, height: options.dimensions.productStageHeight}).setBackgroundColor(backgroundColor, function() {

				_positionElements(1);

				try {
					dataURL = stage.toDataURL({format: format, multiplier: multiplier});
				}
				catch(evt) {
					alert("Error: Please be sure that the images are hosted under the same domain and protocol, in which you are using the product designer!");
					return false;
				}

				_positionElements(responsiveScale);
				stage.setDimensions({width: tempStageWidth, height: tempStageHeight}).setBackgroundColor('transparent').renderAll();

			});

			if(dataURL.length) {
				return dataURL;
			}
			else {
				return false;
			}


		};

		/*
		*	Returns the current view as SVG
		*
		*   String
		*/
		this.getViewSVG = function() {

			thisClass.deselectElement();
			thisClass.zoomReset();

			var tempStageWidth = stage.getWidth(),
				tempStageHeight = stage.getHeight();

			stage.setDimensions({width: options.dimensions.productStageWidth, height: options.dimensions.productStageHeight});

			_positionElements(1);

			for(var i=0; i < stage.getObjects().length; ++i) {
				var object = stage.getObjects()[i];
				if(object.type == 'path-group') {
					object.left = (object.params.x * 1) - object.getWidth() * 0.5;
					object.top = (object.params.y * 1) - object.getHeight() * 0.5;
					object.setCoords();
				}

			}

			var svg = stage.toSVG(),
				$svg = $(svg);

			$svg.children('rect').remove(); //remove bounding boxes
			$svg.children('g').children('[style*="visibility: hidden"]').parent('g').remove(); //remove hidden elements
			svg = $('<div>').append($svg.clone()).html().replace(/(?:\r\n|\r|\n)/g, ''); //replace all newlines

			for(var i=0; i < stage.getObjects().length; ++i) {
			var object = stage.getObjects()[i];
				if(object.type == 'path-group') {
					object.left = (object.params.x * responsiveScale);
					object.top = (object.params.y * responsiveScale);
					object.setCoords();
				}

			}

			_positionElements(responsiveScale);


			stage.setDimensions({width: tempStageWidth, height: tempStageHeight}).renderAll();

			return svg;

		};

		/*
		*	Returns the current view index
		*
		*/
		this.getViewIndex = function() {

			return currentViewIndex;

		};

		/*
		*	Returns the fabric canvas
		*/
		this.getStage = function() {

			return stage;

		};

		/*
		*	Returns the scale value to crop image in area
		*/
		this.getScalingByDimesions = function(imgW, imgH, resizeToW, resizeToH) {

			var scaling = 1;
			if(imgW > imgH) {
				if(imgW > resizeToW) { scaling = resizeToW / imgW; }
				if(scaling * imgH > resizeToH) { scaling = resizeToH / imgH; }
			}
			else {
				if(imgH > resizeToH) { scaling = resizeToH / imgH; }
				if(scaling * imgW > resizeToW) { scaling = resizeToW / imgW; }
			}

			return scaling;

		};

		/*
		*	Adds a new product to products sidebar
		*	views (array): An array containing all views for the product. A view element is an object with title,thumbnail and elements attributes, where the elements
		*	attribute is also an object {type, source, title, parameters}
		*
		*/
		this.addProduct = function(views) {

			//load product by click
			var $productItemsWrapper = $sidebarContent.find('.fpd-products .fpd-items-wrapper');
			$productItemsWrapper.append('<picture ><span class="fpd-loading"></span><img src="'+views[0].thumbnail+'" title="'+views[0].title+'" style="display:none;" /></picture>')
			.children('picture:last').click(function(evt) {

				var $this = $(this),
					index = $productItemsWrapper.children('picture').index($this);

				thisClass.selectProduct(index);

				evt.preventDefault();

			}).data('views', views)
			.children('img').load(function() {
				$(this).fadeIn(500).prev('span').fadeOut(300, function() {
					$(this).remove();
				});
			});

			//show products in sidebar when there is more than 1
			if($productItemsWrapper.children('picture').length == 2) {
				$sidebarNavi.find('[data-target=".fpd-products"]').css('display', 'inline-block');
				_createScrollbar($productItemsWrapper);
			}

			$productItemsWrapper.perfectScrollbar('update');

		};

		/*
		*	Loads a new product into the stage
		*	views (array): An array containing all views for the product. A view element is an object with title,thumbnail and elements attributes, where the elements
		*	attribute is also an object {type, source, title, parameters}
		*
		*/
		this.loadProduct = function(views) {

			if($productLoader.is(':visible')) {
				return false;
			}

			thisClass.clear();
			$productLoader.stop().show();

			currentViews = views;

			currentProductTitle = currentViews[0].title;

			var viewSelectionHtml = '<div class="fpd-views-selection fpd-clearfix fpd-'+options.viewSelectionPosition+' '+(options.viewSelectionFloated ? 'fpd-float-items' : '')+'"></div>';

			if(options.viewSelectionPosition == 'outside') {
				$productStage.after(viewSelectionHtml);
			}
			else {
				$productStage.append(viewSelectionHtml);
			}

			$elem.on('viewCreate', _onViewCreated);

			function _onViewCreated() {
				//add all views of product till views end is reached
				if(viewsLength < currentViews.length) {
					thisClass.addView(currentViews[viewsLength]);
				}
				//all views added
				else {
					$elem.off('viewCreate', _onViewCreated);
					$elem.trigger('productCreate', [currentProductTitle]);
					$productLoader.stop().hide();
					thisClass.selectView(0);

					var objects = stage.getObjects();
					for(var i=0; i < objects.length; ++i) {
						var obj = objects[i];
						 if(obj.viewIndex == currentViewIndex && obj.params && obj.params.autoSelect) {
							 stage.setActiveObject(obj);
							 obj.setCoords();
						 }
					}
				}

			};

			thisClass.addView(currentViews[0]);

		};

		/*
		*	Selects a product from the products sidebar by index
		*	index (number): A value between 0 and n-1, at which n is the amount of products in the products sidebar. If the set index is bigger than the products length, it will select the last product
		*
		*/
		this.selectProduct = function(index) {
			if(index == currentProductIndex) {	return false; }

			currentProductIndex = index;
			if(index < 0) { currentProductIndex = 0; }
			else if(index > thisClass.getProductsLength()-1) { currentProductIndex = thisClass.getProductsLength()-1; }

			var views = $sidebarContent.find('.fpd-products .fpd-items-wrapper > picture').eq(currentProductIndex).data('views');
			thisClass.loadProduct(views);

		};

		/*
		*	Selects a view from the current showing product
		*	index (number): A value between 0 and n-1, at which n is the amount of views in the current showing product. If the set index is bigger than the views length, it will select the last view
		*
		*/
		this.selectView = function(index) {

			currentViewIndex = index;
			if(index < 0) { currentViewIndex = 0; }
			else if(index > $viewSelection.children().size()-1) { currentViewIndex = $viewSelection.children().size()-1; }

			$viewSelection.children('div').removeClass('fpd-view-active')
			.eq(index).addClass('fpd-view-active');

			thisClass.deselectElement();
			$sidebarContent.find('.fpd-elements-dropdown').children('option:not([value="none"])').remove();
			var objects = stage.getObjects();
			for(var i=0; i < objects.length; ++i) {
				var object = objects[i];
				object.visible = object.viewIndex == currentViewIndex;
				if(object.viewIndex == currentViewIndex && object.isEditable && !object.params.uploadZone) {
					$sidebarContent.find('.fpd-elements-dropdown').append('<option value="'+object.id+'">'+object.title+'</option>');
				}
			}
			$sidebarContent.find('.fpd-elements-dropdown').trigger("chosen:updated");
			stage.renderAll();

		};

		/*
		*	Removes a product from the products sidebar by index
		*	index (number): A value between 0 and n-1, where n is the length of products in the products sidebar. If the set index is bigger than the products length, it will select the last product
		*
		*/
		this.removeProduct = function(index) {

			if(index < 0) { index = 0; }
			else if(index > thisClass.getProductsLength()-1) { index = thisClass.getProductsLength()-1; }

			$sidebarContent.find('.fpd-products .fpd-items-wrapper > picture').eq(index).remove();
			$sidebarContent.find('.fpd-products .fpd-items-wrapper').perfectScrollbar('update');

			if(index == currentProductIndex) {
				thisClass.clear();
				currentProductIndex = -1;
			}

		};

		/*
		*	Adds a view to the current selected product
		*	view (object): A object containing title, thumbnail and elements[]
		*
		*/
		this.addView = function(view) {

			viewsLength++;

			$viewSelection = $productContainer.find('.fpd-views-selection');

			var cssClass = options.viewSelectionPosition == 'outside' ? 'stacked' : '';
			$viewSelection.append('<div class="fpd-secondary-bg-color fpd-border-color ui '+cssClass+' segment"><img src="'+view.thumbnail+'" title="'+view.title+'" class="fpd-tooltip" /></div>')
			.children('div:last').click(function(evt) {

				evt.preventDefault();
				thisClass.selectView($viewSelection.children('div').index($(this)));

			});

			_createSingleView(view.title, view.elements);

			viewsLength > 1 ? $viewSelection.show() : $viewSelection.hide();

		};

		/*
		*	Adds an new element to the view
		*	type (string): image or text
		*	source (string): URL to the png when type is "image" or the text when type is "text"
		*	title (string): The title for the element
		*	params (object): An object containing the element parameters
		*	containerIndex (number): The view index where the element should be added to
		*
		* 	Returns an array with all views
		*/
		this.addElement = function(type, source, title, params, containerIndex) {

			containerIndex = typeof containerIndex !== 'undefined' ? containerIndex : currentViewIndex;

			thisClass.deselectElement();

			if(typeof params != "object") {
				alert("The element "+title+" does not have a valid JSON object as parameters! Please check the syntax, maybe you set quotes wrong.");
				return false;
			}

			params = $.extend({}, options.elementParameters, params);
			if(type == 'text' || type == 'i-text' || type == 'curvedText') {
				params = $.extend({}, options.textParameters, params);
			}
			if(params.topped) {
				params.zChangeable = false;
			}

			params.source = source;

			var pushTargetObject = false,
				targetObject = null;
			//store current color and convert colors in string to array
			if(params.colors && typeof params.colors == 'string') {
				//check if string contains hex color values
				if(params.colors.indexOf('#') == 0) {
					//convert string into array
					var colors = params.colors.replace(/\s+/g, '').split(',');
					params.colors = colors;
				}
				else if(viewsLength > 1) {
					//get all layers from first view
					var objects = stage.getObjects();
					for(var i=0; i < objects.length; ++i) {
						var object = objects[i];
						if(object.viewIndex == 0) {
							//look for the target object where to get the color from
							if(params.colors == object.title && targetObject == null) {
								targetObject = object;
								//push all objects in array that should have a color control from the target object
								pushTargetObject = true;
							}
						}
					}
				}
			}

			var fabricParams = {
				source: source,
				title: title,
				top: params.y,
				left: params.x,
				originX: params.originX,
				originY: params.originY,
				scaleX: params.scale,
				scaleY: params.scale,
				angle: params.degree,
				opacity: params.opacity,
				id: String(new Date().getTime()),
				visible: containerIndex == currentViewIndex,
				viewIndex: containerIndex,
				lockUniScaling: true,
				lineHeight: 1.2
			};

			if(options.editorMode) {
				params.removable = params.resizable = params.rotatable = params.zChangeable = true;
			}
			else {
				$.extend(fabricParams, {
					selectable: false,
					lockRotation: true,
					lockScalingX: true,
					lockScalingY: true,
					lockMovementX: true,
					lockMovementY: true,
					hasControls: false,
					evented: false
				});
			}

			if(type == 'image' || type == 'path') {

				var _fabricImageLoaded = function(fabricImage, params) {

					var w = fabricImage.width * params.scale,
						h = fabricImage.height * params.scale;

					$.extend(fabricParams, {params: params, originParams: $.extend({}, params), crossOrigin: "anonymous"});
					fabricImage.set(fabricParams);

					//color control for images
					if(pushTargetObject) {
						if(targetObject.colorControlFor) {
							targetObject.colorControlFor.push(fabricImage);
						}
						else {
							targetObject.colorControlFor = [];
							targetObject.colorControlFor.push(fabricImage);
						}
					}

					_elementCreated(fabricImage);

					$elem.trigger('elementAdded', [fabricImage]);

				};

				//load svg or image from url
				var imageParts = source.split('.');
				if($.inArray('svg', imageParts) != -1) {
					fabric.loadSVGFromURL(source, function(objects, options) {
						var svgGroup = fabric.util.groupSVGElements(objects, options);
						params.colors = [];
						for(var i=0; i < objects.length; ++i) {
							var color = tinycolor(objects[i].fill);
							params.colors.push(color.toHexString());
						}
						_fabricImageLoaded(svgGroup, params);
					});
				}
				//load png/jpeg from url
				else {
					new fabric.Image.fromURL(source, function(fabricImg) {
						_fabricImageLoaded(fabricImg, params);
					});
				}

			}
			else if(type == 'text' || type == 'i-text' || type == 'curvedText') {

				params.text = params.text ? params.text : params.source;
				params.font = params.font ? params.font : options.fonts[0];
				if(params.font == undefined) {
					params.font = 'Arial';
				}

				$.extend(fabricParams, {
					fontSize: params.textSize,
					fontFamily: params.font,
					fontStyle: params.fontStyle,
					fontWeight: params.fontWeight,
					textAlign: params.textAlign,
					textBackgroundColor: params.textBackgroundColor,
					lineHeight: params.lineHeight,
					textDecoration: params.textDecoration,
					fill: params.colors[0] ? params.colors[0] : "#000000",
					editable: params.editable,
					spacing: params.curveSpacing,
					radius: params.curveRadius,
					reverse: params.curveReverse,
					params: params,
					originParams: $.extend({}, params)
				});

				//make text curved
				if(params.curved) {
					var fabricText = new fabric.CurvedText(params.text.replace(/\\n/g, '\n'), fabricParams);
				}
				//just interactive text
				else {
					var fabricText = new fabric.IText(params.text.replace(/\\n/g, '\n'), fabricParams);
				}

				_elementCreated(fabricText);

				//set pattern
				if(params.pattern) {
					_setPattern(params.pattern, fabricText);
				}

				//render font
				_renderOnFontLoaded(params.font);

				$elem.trigger('elementAdded', [fabricText]);
			}
			else {
				alert('Sorry. This type of element is not allowed!');
				return false;
			}

			if(params.price && !params.uploadZone) {
				currentPrice += params.price;
				$elem.trigger('priceChange', [params.price, currentPrice]);
			}

		};

		/*
		* Adds a new design to the design sidebar
		*
		*/
		this.addDesign = function(source, title, parameters, category, thumbnail) {

			thumbnail = typeof thumbnail == 'undefined' ? source : thumbnail;

			//categories are not used
			if($designCategories === null || $designCategories === false) {
				_addDesignToList({source: source, title: title, parameters: parameters, thumbnail: thumbnail});
			}
			//categories are used
			else {
				category = typeof category == 'undefined' ? $designCategories.val() : category;

				//check if category exists, otherwise create one

				if(designCategories[category] == undefined) {
					designCategories[category] = new Array();
					$designCategories.append('<option value="'+category+'">'+category+'</option>').trigger("chosen:updated");
				}

				//push design in category object
				designCategories[category].push({source: source, title: title, parameters: parameters, thumbnail: thumbnail});

				//add design to list if category is the same like the current showing one
				if($designCategories.val() == category) {
					_addDesignToList({source: source, title: title, parameters: parameters, thumbnail: thumbnail});
				}
			}

			//show designs in sidebar
			$sidebarNavi.find('[data-target=".fpd-designs"]').css('display', 'inline-block');

		};

		/*
		* Adds a customer image to the product stage
		*
		*/
		this.addCustomImage = function(source, title) {

			thisClass.zoomReset();

			var $imageInput = $menubar.find('.fpd-input-image'),
				image = new Image;
	    		image.src = source;

    		image.onload = function() {

    			var imageH = this.height,
    				imageW = this.width,
    				scaling = 1;

    			if(imageW > options.customImagesParameters.maxW ||
    			imageW < options.customImagesParameters.minW ||
    			imageH > options.customImagesParameters.maxH ||
    			imageH < options.customImagesParameters.minH) {
	    			alert(options.labels.uploadedDesignSizeAlert);
	    			return false;
    			}

				//check if its too big
				options.customImagesParameters.scale = thisClass.getScalingByDimesions(imageW, imageH, options.customImagesParameters.resizeToW, options.customImagesParameters.resizeToH);

				var imageParams = options.customImagesParameters;

				if($imageInput.data('fpd-placeholder') && $imageInput.data('fpd-placeholder') != '') {
					var element = thisClass.getElementByTitle($imageInput.data('fpd-placeholder')),
						bbRect = element.getBoundingRect();

					imageParams = $.extend({}, imageParams, {
							boundingBox: $imageInput.data('fpd-placeholder'),
							boundingBoxClipping: element.params.boundingBoxClipping,
							scale: thisClass.getScalingByDimesions(imageW, imageH, (bbRect.width / responsiveScale)-1, (bbRect.height / responsiveScale)-1),
							autoCenter: true,
							removable: true,
							zChangeable: false,
							rotatable: element.params.rotatable,
							draggable: element.params.draggable,
							resizable: element.params.resizable,
							price: element.params.price,
							replace: $imageInput.data('fpd-placeholder')
						}
					);
				}

	    		thisClass.addElement(
	    			'image',
	    			source,
	    			title,
		    		imageParams
	    		);
				//add to design sidebar
	    		thisClass.addDesign(source, title, imageParams, options.labels.myUploadedImgCat);

	    		$imageInput.data('fpd-placeholder', '');

    		}

    		image.onerror = function(evt) {
    			alert('Image could not be loaded!');
    			$imageInput.data('fpd-placeholder', '');
    		}

		};


		/*
		* Prints the current product
		*
		*/
		this.print = function() {

			var viewsDataURL = thisClass.getViewsDataURL(),
				images = new Array(),
				imageLoop = 0;

			//load all images first
			for(var i=0; i < viewsDataURL.length; ++i) {

				var image = new Image();
				image.src = viewsDataURL[i];
				image.onload = function() {

					images.push(this);
					imageLoop++;

					//add images to popup and print popup
					if(imageLoop == viewsDataURL.length) {

						// var popup = window.open('','','width='+images[0].width+',height='+(images[0].height*viewsDataURL.length)+',location=no,menubar=no,scrollbars=yes,status=no,toolbar=no');
						// _popupBlockerAlert(popup);

						// popup.document.title = "Print Image";
						for(var j=0; j < images.length; ++j) {
							// $(popup.document.body).append('<img src="'+images[j].src+'" style="margin:auto; display:block;" />');
							$('#printview').contents().find('body').append('<img src="'+images[j].src+'" style="margin:auto; display:block;" />');
						}

						setTimeout(function() {
							// popup.print();
							$('#printview').get(0).contentWindow.print();
						}, 1000);

					}
				}

			}

			return false;

		};


		/*
		* Creates an image, that can be opened in a pop-up and downloaded
		*
		*/
		this.createImage = function(openInPopup, forceDownload) {

			if(typeof(openInPopup)==='undefined') openInPopup = true;
			if(typeof(forceDownload)==='undefined') forceDownload = false;

			var dataUrl = thisClass.getProductDataURL();
			var image = new Image();
			image.src = dataUrl;

			image.onload = function() {
				if(openInPopup) {

					var popup = window.open('','','width='+this.width+',height='+this.height+',location=no,menubar=no,scrollbars=yes,status=no,toolbar=no');
					// _popupBlockerAlert(popup);

					popup.document.title = "Product Image";
					$(popup.document.body).append('<img src="'+this.src+'" />');

					if(forceDownload) {
						window.location.href = popup.document.getElementsByTagName('img')[0].src.replace('image/png', 'image/octet-stream');
					}
				}
				$elem.trigger('imageCreate', [dataUrl]);
			}

			return image;

		};

		//removes all elements from the product container
		this.clear = function() {

			thisClass.deselectElement();
			thisClass.zoomReset();
			if($viewSelection) { $viewSelection.remove(); }
			$sidebarContent.find('.fpd-elements-dropdown').children('option:not([value="none"])').remove();
			$sidebarContent.find('.fpd-elements-dropdown').trigger("chosen:updated");
			stage.clear();
			viewsLength = currentViewIndex = currentPrice = 0;
			currentViews = currentElement = null;
			$elem.trigger('stageClear');

		};

		//deselect the current selected element
		this.deselectElement = function(discardActiveObject) {

			discardActiveObject = typeof discardActiveObject == 'undefined' ? true : discardActiveObject;

			$colorPicker.removeClass('fpd-colorpicker-group').empty();
			if(options.layout == 'semantic') {
				$colorPicker.addClass('ui button')
			}
			$elementTooltip.hide();

			if(currentBoundingObject) {
				currentBoundingObject.remove();
				currentBoundingObject = null;
			}

			if(discardActiveObject) {
				stage.discardActiveObject();
			}

			$sidebarContent.find('.fpd-elements-dropdown').children('option:first').prop('selected', true).trigger('chosen:updated');
			$toolbar.css('visibility', 'hidden')
			.children('.fpd-filling-wrapper, .fpd-text-format-section, .fpd-curved-text-wrapper').hide()
			.parent().find('.fpd-color-picker, .fpd-fonts-dropdown-wrapper, .fpd-text-styles').hide();

			$toolbar.children('.fpd-text-format-section').find('textarea').val('');

			$patternWrapper.hide();
			$curvedTextWrapper.hide().find('.fpd-curve-toggle').hide();

			currentElement = null;

			if($editorBox) {
				$editorBox.find('i').text('');
			}

			stage.renderAll().calcOffset();
		};

		/*
		* Removes an element from the stage
		*
		* element (object|string): The fabric object or the title of the element
		*/
		this.removeElement = function(element) {

			if(typeof element === 'string') {
				element = thisClass.getElementByTitle(element);
			}

			if(element.params.price != 0 && !element.params.uploadZone) {
				currentPrice -= element.params.price;
				$elem.trigger('priceChange', [element.params.price, currentPrice]);
			}

			$sidebarContent.find('.fpd-elements-dropdown').children('option[value="'+element.id+'"]').remove().trigger("chosen:updated");

			stage.remove(element);
			$elem.trigger('elementRemove', [element]);
			thisClass.deselectElement();

		};

		/*
		* Gets an element by title
		*
		* title (string): The title of the element you want to get
		*/
		this.getElementByTitle = function(title) {

			var objects = stage.getObjects();
			for(var i = 0; i < objects.length; ++i) {
				if(objects[i].title == title) {
					return objects[i];
					break;
				}
			}

		};

		this.zoomIn = function() {

			zoomScale = zoomScale * options.zoomFactor;
			if(zoomScale > options.zoomRange[1]) {
				return false;
			}

			var objects = stage.getObjects();
		    for(var i = 0; i < objects.length; ++i) {
		    	var object = objects[i];
		        object.scaleX = object.scaleX * options.zoomFactor;
		        object.scaleY = object.scaleY * options.zoomFactor;
		        object.left = object.left * options.zoomFactor;
		        object.top = object.top * options.zoomFactor;
		        object.setCoords();
		    }

			stage.setDimensions({width: stage.getWidth() * options.zoomFactor, height: stage.getHeight() * options.zoomFactor})
			.calcOffset().renderAll();

			if(zoomScale > 1) {
				$productStage.perfectScrollbar();
			}

		};

		this.zoomOut = function() {

			zoomScale = zoomScale / options.zoomFactor;
			if(zoomScale < options.zoomRange[0]) {
				return false;
			}

			var objects = stage.getObjects();
		    for(var i = 0; i < objects.length; ++i) {
		    	var object = objects[i];
		        object.scaleX = object.scaleX * (1 / options.zoomFactor);
		        object.scaleY = object.scaleY * (1 / options.zoomFactor);
		        object.left = object.left * (1 / options.zoomFactor);
		        object.top = object.top * (1 / options.zoomFactor);
		        object.setCoords();
		    }

			stage.setDimensions({width: stage.getWidth() * (1 / options.zoomFactor), height: stage.getHeight() * (1 / options.zoomFactor)})
			.calcOffset().renderAll();

			if(zoomScale <= 1) {
				$productStage.perfectScrollbar('destroy');
			}

		};

		this.zoomReset = function() {

			zoomScale = 1;

			var objects = stage.getObjects();
		    for(var i = 0; i < objects.length; ++i) {
				var object = objects[i];
		        object.scaleX = objects[i].params.scale * responsiveScale;
		        object.scaleY = objects[i].params.scale * responsiveScale;
		        object.left = objects[i].params.x * responsiveScale;
		        object.top = objects[i].params.y * responsiveScale;
		        object.setCoords();
		    }

			stage.setDimensions({width: $productContainer.width(), height: options.dimensions.productStageHeight * responsiveScale})
			.calcOffset().renderAll();

			if(zoomScale <= 1) {
				$productStage.perfectScrollbar('destroy');
			}

		};

		this.setStageDimensions = function(width, height) {

			options.dimensions.productStageWidth = width;
			options.dimensions.productStageHeight = height;

			$productContainer.width(width);
			$productStage.height(height * responsiveScale);
			stage.setDimensions({width: $productContainer.width(), height: options.dimensions.productStageHeight * responsiveScale})
			.calcOffset().renderAll();

		};


		//----------------------------------
		// ------- Fabric.js Methods ----------
		//----------------------------------

		fabric.Object.prototype._drawControl = function(control, ctx, methodName, left, top) {
	      var size = this.cornerSize;

	      if (this.isControlVisible(control)) {
	        this.transparentCorners || ctx.clearRect(left, top, size, size);
	        if(control == 'tr' || control == 'br' || control == 'mtr') {
	        	var icon;
	        	switch(control) {
		        	case 'tr':
		        		icon = this.params.removable ? removeIcon : false;
		        	break;
		        	case 'br':
		        		icon = this.params.resizable ? resizeIcon : false;
		        	break;
		        	case 'mtr':
		        		icon = this.params.rotatable ? rotateIcon : false;
		        	break;
	        	}

	        	if(icon !== false) {
		        	 ctx.drawImage(icon, left, top, size, size);
					 ctx[methodName](left, top, size, size);
	        	}

	        }

	      }
	    };


	   fabric.Object.prototype.findTargetCorner = function(pointer) {
	      if (!this.hasControls || !this.active) return false;

	      var ex = pointer.x,
	          ey = pointer.y,
	          xPoints,
	          lines;

	      for (var i in this.oCoords) {

	        if (!this.isControlVisible(i)) {
	          continue;
	        }

	        if (i === 'mtr' && !this.hasRotatingPoint) {
	          continue;
	        }

	        if (this.get('lockUniScaling') &&
	           (i === 'mt' || i === 'mr' || i === 'mb' || i === 'ml')) {
	          continue;
	        }

	        lines = this._getImageLines(this.oCoords[i].corner);

	        xPoints = this._findCrossPoints({ x: ex, y: ey }, lines);
	        if (xPoints !== 0 && xPoints % 2 === 1) {
	          this.__corner = i;
	          return i;
	        }
	      }
	      return false;
	    };

	    fabric.IText.prototype.initHiddenTextarea = function() {
		    this.hiddenTextarea = fabric.document.createElement('textarea');

		    this.hiddenTextarea.setAttribute('autocapitalize', 'off');
		    this.hiddenTextarea.style.cssText = 'position: absolute; top: 0; left: -100px; opacity: 0; width: 0; height: 0; z-index: -99999;';

			this.canvas.wrapperEl.appendChild(this.hiddenTextarea);

		    fabric.util.addListener(this.hiddenTextarea, 'keydown', this.onKeyDown.bind(this));
		    fabric.util.addListener(this.hiddenTextarea, 'keypress', this.onKeyPress.bind(this));
		    fabric.util.addListener(this.hiddenTextarea, 'copy', this.copy.bind(this));
		    fabric.util.addListener(this.hiddenTextarea, 'paste', this.paste.bind(this));

		    if (!this._clickHandlerInitialized && this.canvas) {
		      fabric.util.addListener(this.canvas.upperCanvasEl, 'click', this.onClick.bind(this));
		      this._clickHandlerInitialized = true;
		    }
		 };

	}; //plugin class ends

	jQuery.fn.fancyProductDesigner = function( args ) {

		return this.each(function() {

			var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('fancy-product-designer')) { return };

            var fpd = new FancyProductDesigner(this, args);

            // Store plugin object in this element's data
            element.data('fancy-product-designer', fpd);

		});
	};

	$.fn.fancyProductDesigner.defaults = {
		_useChosen: true,
		elementParameters: { //common parameters
			x: 0, //the x-position
			y: 0, //the y-position
			z: -1, //Allows to set the z-index of an element, -1 means it will be added to the top
			colors: false, //false, a string with hex colors separated by commas for static colors or a single color value for enabling the colorpicker
			removable: false, //false or true
			draggable: false,  //false or true
			rotatable: false, // false or true
			resizable: false,  //false or true
			zChangeable: false, //false or true
			scale: 1, // the scale factor
			degree: 0, //the degree for the rotation
			price: 0, //how much does the element cost
			boundingBox: false, //false, an element by title or an object with x,y,width,height
			autoCenter: false, //when the element is added to stage, center it automatically
			opacity: 1, //opacity (0-1)
			originX: 'center', //left,center
			originY: 'center', //top,center
			replace: '', //replaces anelement, if an element is added to stage and another element with the same type and replace parameter enabled is on the stage
			boundingBoxClipping: false, //will cut off the area of the element that is outside of the bounding box
			autoSelect: false, //select the element when its added to stage
			topped: false, //set the element always on top
			uploadZone: false //enables an image as an upload zone where users can add images to
		},
		textParameters: { //parameters for text elements, will merge with elementParameters
			font: false, //If false it will use the first font from the fonts option (alphabetic order), otherwise it will use the font family set here
			fontWeight: '', //set the font weight - bold or normal
			fontStyle: '', //set the font style - italic or normal
			textSize: 18, //Textsize in px.
			patternable: false, //User can choose a pattern for the text element
			editable: true, //Can the text be changed by the user?
			lineHeight: 1, //line height, space between lines
			textAlign: 'left', //left, center, right
			textBackgroundColor: '', //backgroundcolor - hex,rgb,rgba
			textDecoration: '', //underline,overline,line-through
			maxLength: 0, //the max. allowed characters, 0 means unlimited characters
			curved: false, //make text curved
			curvable: false, //user can switch between curved and normal text
			curveSpacing: 10, //spacing for curved text
			curveRadius: 80, //radius for curved text
			curveReverse: false //reverse curved
		},
		customImagesParameters: { //additional parameters for uploaded images, will merge with the elementParameters
			minW: 100, //the minimum upload size width
			minH: 100, //the minimum upload size height
			maxW: 1500, //the maximum upload size width
			maxH: 1500, //the maximum upload size height
			resizeToW: 300, //resizes the uploaded image to this width, when width is larger than height
			resizeToH: 300 //resizes the uploaded image to this height, when height is larger than width,
		},
		customTextParameters: { //additional parameters for the custom text, will merge with elementParameters and textParameters
		},
		uploadDesigns: true, //users can upload own designs via the menu bar
		customTexts: true, //user can add custom text via the menu bar
		imageDownloadable: true,//shows the button to download the image
		saveAsPdf: true, //shows the button to save product as pdf
		printable: true,//shows the button to print the product
		allowProductSaving: true, //allows the users to save their products in the browser
		resettable: true,//shows the button to reset a product
		tooltips: true, //enable/disable tooltips
		editorMode: false, //enable the editor mode
		menubarPosition: 'outside', //above or inside the product stage
		viewSelectionPosition: 'tr', //tl,tr,br,bl,outside
		viewSelectionFloated: false, //if true the view selection items will be aligned in one line
		fonts: ['Arial', 'Helvetica', 'Times New Roman', 'Verdana', 'Geneva'], //an array containing all available fonts
		templatesDirectory: 'templates/', //the directory that contains the templates
		phpDirectory: 'php/', //the path to the directory that contains php scripts that are used for some functions of the plugin
		patterns: [], //an array with the urls to the patterns
		layout: 'icon-sb-left', //icon-sb-left,icon-sb-top,icon-sb-right,icon-sb-bottom, semantic
		facebookAppId: '', //to add photos from facebook, you have to set your own facebook api key
		instagramClientId: '', //the instagram client ID - http://instagram.com/developer/
		instagramRedirectUri: '', //this URI needs to be pointed to the php/instagram-auth.php
		zoomFactor: 1.2, //the zoom factor. Set it to 1 to hide the zoom buttons in the menu bar
		zoomRange: [0.2, 2], //0: minimum, 1: maximum
		defaultText: 'Double-click to change text', //the default text when an user adds a custom text
		hexNames: {}, //set custom names for your hexdecimal colors. key=hexcode without #, value: name of the color (e.g. {000000: 'dark'} )
		selectedColor: '#d5d5d5', //the border color of the selected element
		boundingBoxColor: '#005ede', //the border color of the bounding box
		outOfBoundaryColor: '#990000', //the border color of the element when its outside of his bounding box
		paddingControl: 7,
		dimensions: { //the dimensions for the product designer
			sidebarNavSize: 50, //only for flat layout
			sidebarContentWidth: 200, //only for flat/vertical layout
			sidebarSize: 700, //sidebar width for flat layout, width/height for flat layout, min. height of flat/horizontal layout is 600
			productStageWidth: 750, //for all layouts
			productStageHeight: 600 //for all layouts
		},
		labels: { //different labels used for the UI
			outOfContainmentAlert: 'Move it in his containment!', //the alert when a element is moving out of his containment
			confirmProductDelete: "Delete saved product?",
			colorpicker : {cancel: "Cancel", change: "Change Color"},
			uploadedDesignSizeAlert: "Sorry! But the uploaded image size does not conform our indication of size.",
			initText: "Initializing product designer",
			myUploadedImgCat: "Your uploaded images"
		},
		sidebarLabels: { //all labels in the sidebar
			productsMenu: 'Products',
			designsMenu: 'Designs',
			editElementsMenu: 'Edit Elements',
			fbPhotosMenu: 'Add Photos From Facebook',
			instaPhotosMenu: 'Add Photos From Instagram',
			editElementsHeadline: 'Edit Elements',
			editElementsDropdownNone: 'None',
			sectionFilling: 'Filling',
			sectionFontsStyles: 'Font & Style',
			sectionCurvedText: 'Curved Text',
			sectionHelpers: 'Helpers',
			textAlignLeft: 'Align Left',
			textAlignCenter: 'Align Center',
			textAlignRight: 'Align Right',
			textBold: 'Bold',
			textItalic: 'Italic',
			curvedTextInfo: 'You can only change the text when you switch to normal text.',
			curvedTextSpacing: 'Spacing',
			curvedTextRadius: 'Radius',
			curvedTextReverse: 'Reverse',
			curvedTextToggle: 'Switch between curved and normal Text',
			centerH: 'Center Horizontal',
			centerV: 'Center Vertical',
			moveDown: 'Bring It Down',
			moveUp: 'Bring It Up',
			reset: 'Reset',
			trash: 'Trash',
			fbPhotosHeadline: 'Facebook Photos',
			fbSelectAlbum: 'Select an album',
			instaPhotosHeadline: 'Instagram Photos',
			instaFeedButton: 'My Feed',
			instaRecentImagesButton: 'My Recent Images',
			instaLoadNext: 'Load next stack'
		},
		productStageLabels: { //all labels in the product stage
			addImageTooltip: 'Add your own Image',
			addTextTooltip: 'Add your own Text',
			zoomInTooltip: 'Zoom In',
			zoomOutTooltip: 'Zoom Out',
			zoomResetTooltip: 'Zoom Reset',
			downloadImageTooltip: 'Download Product Image',
			printTooltip: 'Print',
			pdfTooltip: 'Save As PDF',
			saveProductTooltip: 'Save product',
			savedProductsTooltip: 'Your saved products',
			resetTooltip: 'Reset Product'
		}
	};

})(jQuery);