"use strict";
(function () {
	var sidebarCollapseHidden = false,
		sidebarSmall = false,
		sidebarShouldBeSmall = false,
		sidebarForcedVisible = false,
		$body = $(document.body),
		$sidebar = $(".sidebar"),
		$sidebarcollapse = $(".sidebar .collapse");

	function makeSidebarSmall() {
		sidebarSmall = true;
		$body.addClass("sidebar-toggled");
		$sidebar.addClass("toggled");
		sidebarCollapseHidden = true;
		$sidebarcollapse.collapse("hide");
	}

	function makeSidebarNormal() {
		sidebarSmall = false;
		$body.removeClass("sidebar-toggled");
		$sidebar.removeClass("toggled");
	}

	$("#sidebarToggle").on("click", function (e) {
		if (sidebarSmall) {
			sidebarShouldBeSmall = false;
			makeSidebarNormal();
		} else {
			sidebarShouldBeSmall = true;
			makeSidebarSmall();
		}
	});

	$("#sidebarToggleTop").on("click", function (e) {
		if (sidebarForcedVisible) {
			sidebarForcedVisible = false;
			$sidebar.addClass("d-none");
			$sidebar.removeClass("d-flex");
		} else {
			sidebarForcedVisible = true;
			$sidebar.addClass("d-flex");
			$sidebar.removeClass("d-none");
		}
	});

	// Close any open menu accordions when window is resized below 768px
	function windowResize() {
		if (!sidebarCollapseHidden) {
			if (window.innerWidth < 768) {
				sidebarCollapseHidden = true;
				$sidebarcollapse.collapse("hide");
			}
		} else {
			if (window.innerWidth >= 768) {
				sidebarCollapseHidden = false;
			}
		}

		if (sidebarSmall) {
			if (window.innerWidth < 768)
				makeSidebarNormal();
		} else if (sidebarShouldBeSmall) {
			if (window.innerWidth >= 768)
				makeSidebarSmall();
		}
	}

	$(window).resize(windowResize);

	// Prevent the content wrapper from scrolling when the fixed side navigation hovered over
	$("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function(e) {
		if ($(window).width() >= 768) {
			var e0 = e.originalEvent,
				delta = e0.wheelDelta || -e0.detail;
			this.scrollTop += (delta < 0 ? 1 : -1) * 30;
			e.preventDefault();
		}
	});

	windowResize();
})();
