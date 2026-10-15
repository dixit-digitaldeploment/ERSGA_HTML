/* ==========================================================================
   Custom JS - Organized Structure
   ========================================================================== */

/* ==========================================================================
   DOCUMENT READY
   ========================================================================== */

$(document).ready(function () {
  /* ------------------------------------------------------------------
       Accessibility & ARIA
    ------------------------------------------------------------------ */

  // Main wrapper role
  $(".main_wrapper").attr("role", "main").attr("id", "page_content");
  $(".ajaxsearchpro").each(function () {
    var closeBtn = $(this).find(".proclose");
    var magnifier = $(this).find(".promagnifier");

    closeBtn.insertBefore(magnifier);
  });

  // Search toggle accessibility
  $(".search_txt")
    .attr("tabindex", "0")
    .attr("role", "button")
    .attr("aria-expanded", "false")
    .on("click keydown", function (e) {
      if (
        e.type === "click" ||
        (e.type === "keydown" && (e.key === "Enter" || e.key === " "))
      ) {
        e.preventDefault();
        const $this = $(this);
        const $container = $this.parent().find(".asp_w_container");
        const isOpen = $container.is(":visible");
        $container.stop(true, true).slideToggle();
        $this.attr("aria-expanded", String(!isOpen));
      }
    });

  // PDF links open in new tab
  $('a[href$=".pdf"]').each(function () {
    $(this).attr("target", "_blank");
  });
  $(".main_wrapper a").each(function () {
    if (this.hostname && this.hostname !== location.hostname) {
      $(this).addClass("external-link");
    }
  });

  /* ------------------------------------------------------------------
       DOM Modifications & Class Cleanup
    ------------------------------------------------------------------ */

  // Remove layout class
  $(".wp-block-group, .wp-block-columns, .wp-block-column").removeClass(
    "is-layout-flow"
  );

  // Add class helpers
  $(".rel_forms").parent(".col_right").addClass("has_forms");
  $(".alerticon").parent(".rtTitle").addClass("p-left");
  $(".text_card_block .btn_sm")
    .parents(".img_text_card_col")
    .find(".text-img-wrap")
    .addClass("has-button");

  // Wrap tables
  $(".center-grp .wp-block-table").each(function () {
    $(this).wrap('<div class="table-wrapper"></div>');
  });

  // Wrap image blocks
  $(".img_block .img_block_descr").each(function () {
    if ($(this).find("p").length === 0) {
      $(this).closest(".img_block").addClass("no-p-tag");
    }
  });

  // Carousel: hide controls if single slide
  $(".carousel-inner").each(function () {
    if ($(this).children("div").length === 1) {
      $(this)
        .siblings(
          ".carousel-indicators, .carousel-control-prev, .carousel-control-next"
        )
        .hide();
    }
  });

  // Email address line-break helper
  $(".dp_sidebar .cont_row p a, .contact_col p a").each(function () {
    const text = $(this).text().trim();
    if (text.includes("@")) {
      $(this).html(text.replace("@", "<wbr>@<wbr>"));
    }
  });

  // Move table headers from tbody to thead (kb-table)
  $(".kb-table").each(function () {
    const $table = $(this);
    const $tbody = $table.find("tbody").first();
    if (!$tbody.length) return;
    const $firstRow = $tbody.find("tr").first();
    if (!$firstRow.length) return;
    if ($firstRow.find("th").length > 0) {
      const $thead = $("<thead></thead>");
      $thead.append($firstRow);
      $table.prepend($thead);
    }
  });

  /* ------------------------------------------------------------------
       Bootstrap Tabs – URL Hash Handling
    ------------------------------------------------------------------ */

  // Activate tab based on URL hash
  var hash = window.location.hash;
  if (hash) {
    $('.nav-link[href="' + hash + '"]').tab("show");
  }

  // Update URL hash on tab change
  $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    history.pushState(null, null, e.target.hash);
  });

  // Scroll to hash target
  if (window.location.hash) {
    var $target = $(window.location.hash);
    if ($target.length) {
      var offset = $(".advgb-tabs-panel").outerHeight() + 30;
      $("html, body").animate(
        { scrollTop: $target.offset().top - offset },
        1000
      );
    }
  }

  /* ------------------------------------------------------------------
       Navbar & Mobile Menu
    ------------------------------------------------------------------ */

  // Hamburger toggle
  $(".navbar-toggler").on("click", function () {
    $(this).toggleClass("active");
    $(".main_header").toggleClass("headerActive");
  });

  // Dropdown hover fix
  $(".dropdown-menu a").on("mouseenter", function () {
    $(".dropdown-menu a:focus").blur();
  });

  // Mobile: append plusMinus toggles and mobile table wraps
  //Navbar
  if (jQuery(window).width() < 1200) {
    $(".navbar-nav  > li.has-dropdown").append(
      '<div class="plusMinus" tabindex="0" aria-expanded="false" role="button" aria-label="Toggle Dropdown"></div>'
    );

    jQuery(".navbar-nav  > li.has-dropdown  > .plusMinus")
      .off("click keydown")
      .click(function () {
        var $li = jQuery(this).parent();
        var $dropdown = $li.find(".dropdown-menu");
        const isOpen = jQuery(this).attr("aria-expanded") === "true";
        console.log(isOpen);
        // // // hide other menu items
        // jQuery(this)
        //   .closest(".navbar-nav")
        //   .children()
        //   .children()
        //   .not(".dropdown-menu")
        //   .hide();

        // add back button if not already added
        //         if ($dropdown.find(".menu-back").length === 0) {
        //           $dropdown.prepend(`<a href="#" class="menu-back"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        //   <path d="M3.23125 10.5438C3.08438 10.4 3 10.2063 3 10C3 9.79375 3.08438 9.6 3.23125 9.45625L8.73125 4.20625C9.03125 3.91875 9.50625 3.93125 9.79063 4.23125C10.075 4.53125 10.0656 5.00625 9.76562 5.29063L5.62188 9.25H16.25C16.6656 9.25 17 9.58438 17 10C17 10.4156 16.6656 10.75 16.25 10.75H5.62188L9.76875 14.7063C10.0688 14.9938 10.0781 15.4656 9.79375 15.7656C9.50937 16.0656 9.03438 16.075 8.73438 15.7906L3.23438 10.5406L3.23125 10.5438Z" fill="#1C5DEA"/>
        // </svg>Back</a>`);
        //         }

        $dropdown.slideToggle("fast");
        $li.toggleClass("activeBlue");
        // $li.siblings(".nav-item").hide();
        // $li
        //   .closest(".navbar-collapse")
        //   .find(".top_header,.select_language,.top_search,.btn_sm")
        //   .hide();
        jQuery(this)
          .toggleClass("minsicon")
          .attr("aria-expanded", String(!isOpen));
      });

    // back button click
    jQuery(".navbar-nav").on("click", ".menu-back", function (e) {
      e.preventDefault();

      var $dropdown = jQuery(this).closest(".dropdown-menu");
      var $nav = jQuery(this).closest(".navbar-nav");

      $dropdown.slideUp("fast");

      $nav.children().children().not(".dropdown-menu").show();

      $dropdown.parent().removeClass("activeBlue");
      $dropdown.parent().siblings(".nav-item").show();
      $dropdown
        .closest(".navbar-collapse")
        .find(".top_header,.select_language,.top_search,.btn_sm")
        .show();
      console.log($dropdown.parent().children(".plusMinus"));
      $dropdown.parent().children(".plusMinus").removeClass("minsicon");

      // ✅ remove all back buttons inside this dropdown
      $dropdown.find(".menu-back").remove();
    });

    // close menus after clicking a link
    jQuery(".navbar-nav").on("click", "a", function (e) {
      if (jQuery(this).hasClass("menu-back")) {
        return;
      }

      var $nav = jQuery(this).closest(".navbar-nav");

      // close all dropdowns
      $nav.find(".dropdown-menu,.submenu").slideUp("fast");

      // show all menu items
      $nav.children().children().not(".dropdown-menu").show();
      $nav.children(".nav-item").show();
      // remove active classes
      $nav.find(".activeBlue").removeClass("activeBlue");
      $nav.find(".minsicon").removeClass("minsicon");
      $(".navbar-toggler").removeClass("active");
      $(".navbar-collapse").removeClass("show");
    });


    //$(".select_language ").insertBefore('.navbar-toggler  ');
    // $(".soc_nav_wrap ").insertAfter('.nav_bottom');
    // $(".social_media ").insertAfter('.nav_bottom  ');
    $(".megamenu_drop  li.menu-item-has-children  ").append(
      '<div class="pls_minus"></div>'
    );

    jQuery(".megamenu_drop  li.menu-item-has-children  .pls_minus")
      .off("click keydown")
      .click(function () {
        $(this).parent().find(".sub-menu").slideToggle("fast");
        $(this).parent().toggleClass("active-item");
        $(this).toggleClass("minus-info");
      });
    $(".wp-block-advgb-table").each(function () {
      $(this).wrap('<div class="table-wrap"></div>');
    });
    $(".wp-block-group > table").wrap('<div class="table-wrapper"></div>');
  }

  // Keep search at the top of the mobile menu; move login and language below the nav
  (function ($) {
    var $topHeader = $(".top_header");
    var $search = $(".top_search");
    var $topMenu = $search.parent();
    var $originalParent = $topHeader.parent();
    var $originalNext = $topHeader.next().length ? $topHeader.next() : null;
    var mobileQuery = window.matchMedia("(max-width: 1199.9px)");

    function moveTopHeader() {
      if (mobileQuery.matches) {
        $search.prependTo(".navbar-collapse");
        $topHeader.insertAfter(".nav_bottom");
      } else if ($topMenu.length) {
        $search.prependTo($topMenu);
        if ($originalNext && $originalNext.length) {
          $topHeader.insertBefore($originalNext);
        } else if ($originalParent && $originalParent.length) {
          $originalParent.append($topHeader);
        }
      }
    }

    moveTopHeader();
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", moveTopHeader);
    } else {
      mobileQuery.addListener(moveTopHeader);
    }
  })(jQuery);

  jQuery(".navbar-nav > li").on("mouseleave", function () {
    // Remove focus only from elements inside this li
    $(this).find(":focus").blur();
  });

  // Add a focusable toggle div
  $(".dropdown-menu > li.has-submenu").prepend(
    '<div class="plus-minus" tabindex="0" aria-expanded="false" role="button" aria-label="Toggle submenu"></div>'
  );

  $(".dropdown-menu")
    .off("click keydown")
    .on("click keydown", ".plus-minus", function (e) {
      // Handle click or Enter/Space key
      if (
        e.type === "click" ||
        (e.type === "keydown" && (e.key === "Enter" || e.key === " "))
      ) {
        e.preventDefault(); // Prevent scrolling on Space

        const $this = $(this);
        const $submenu = $this.parent().find("> .submenu");
        const isOpen = $this.attr("aria-expanded") === "true";

        // Toggle current
        $submenu.slideToggle("fast");
        $this.toggleClass("minus-icon").attr("aria-expanded", String(!isOpen));

        // Close others
        $this.parent().siblings("li").find("> .mega-submenu").slideUp("fast");
        $this
          .parent()
          .siblings("li")
          .find(".plus-minus")
          .removeClass("minus-icon")
          .attr("aria-expanded", "false");
      }
    });

  // Mega submenu inner toggles
  $(".mega-submenu > li.menu-item-has-children").prepend(
    '<div class="plus-minus"></div>'
  );

  jQuery(".mega-submenu > li.menu-item-has-children > .plus-minus").click(
    function () {
      jQuery(this).parent().find("> .mega-submenu").slideToggle("fast");
      jQuery(this)
        .parent()
        .siblings("li")
        .find("> ul.mega-submenu")
        .slideUp("fast");
      jQuery(this)
        .parent()
        .siblings("li")
        .find(".plus-minus")
        .removeClass("minus-icon");
      jQuery(this).toggleClass("minus-icon");
    }
  );

  /* ------------------------------------------------------------------
       Match Height
    ------------------------------------------------------------------ */

  $(".links li .expand_det").matchHeight({
    byRow: true,
    property: "height",
    target: null,
    remove: false,
  });
  $(".img_text_card_col .text_card_block").matchHeight({
    byRow: true,
    property: "height",
    target: null,
    remove: false,
  });
  $(".dd_content h3").matchHeight({
    byRow: true,
    property: "height",
    target: null,
    remove: false,
  });
  $(".img_btn_col .img_block_title").matchHeight({
    byRow: true,
    property: "height",
    target: null,
    remove: false,
  });

  /* ------------------------------------------------------------------
       Google Translate Keyboard Accessibility
    ------------------------------------------------------------------ */

  setTimeout(function () {
    let $translateButton = $(".gt_selected");
    let $translateMenu = $(".gt_option");

    if ($translateButton.length && $translateMenu.length) {
      $translateButton.on("click", function () {
        setTimeout(function () {
          let $iframe = $(".gt_option");
          if ($iframe.length) {
            $iframe.attr("tabindex", "-1").focus();
          }
        }, 500);
      });

      $(document).on("keydown", function (event) {
        if (event.key === "Escape") {
          let $iframe = $(".gt_option");
          if ($iframe.length) {
            $iframe.hide();
            $translateButton.focus();
          }
        }
      });
    }
  }, 2000);

  /* ------------------------------------------------------------------
       Tooltip Init
    ------------------------------------------------------------------ */

  $('[data-toggle="tooltip"]').tooltip();
}); // END document.ready

/* ==========================================================================
   WINDOW SCROLL
   ========================================================================== */

// Header shrink on scroll
$(document).on("scroll", function () {
  if ($(document).scrollTop() > 0) {
    $(".main_header").addClass("shrink");
  } else {
    $(".main_header").removeClass("shrink");
  }
});

/* ==========================================================================
   WINDOW LOAD
   ========================================================================== */

$(window).on("load", function () {
  // Wrap aligned images
  $(".wp-block-image.alignleft, .wp-block-image.alignright").wrap(
    '<div class="left_right_wraper"></div>'
  );

  // Check tab overflow
  checkOverflow();

  // Set header padding
  setHeaderPadding();
});

/* ==========================================================================
   WINDOW RESIZE
   ========================================================================== */

$(window).on("resize", function () {
  checkOverflow();
  setHeaderPadding();
});

/* ==========================================================================
   UTILITY FUNCTIONS
   ========================================================================== */

// Check if tabs overflow their container
function checkOverflow() {
  $(".kt-tabs-wrap").each(function () {
    var $tabs = $(this).find(".kt-tabs-title-list");
    if ($tabs.length && $tabs[0].scrollWidth > $tabs[0].clientWidth) {
      $(this).addClass("overflowing");
    } else {
      $(this).removeClass("overflowing");
    }
  });
}

// Set top padding on main wrapper to match header height
// function setHeaderPadding() {
//     if ($(window).width() > 1200) {
//         var headerHeight = $('.main_header').outerHeight(true);
//         $('.main_wrapper , .main_banner').css('padding-top', headerHeight + 'px');
//     } else {
//         $('.main_wrapper , .main_banner').css('padding-top', '');
//     }
// }
function setHeroHeight() {
  var headerHeight = jQuery("header").outerHeight();
  var alertbar = jQuery(".alert-area").is(":visible")
    ? jQuery(".alert-area").outerHeight()
    : 0;
  jQuery(".main_wrapper, .main_banner").css("padding-top", headerHeight + "px");
  // if (jQuery("#wpadminbar").length) {
  //   jQuery(".alert-area").css("top", headerHeight + 30 + "px");
  //   jQuery(".kt-tabs-title-list").css(
  //     "top",
  //     headerHeight + alertbar + 30 + "px"
  //   );
  // } else {
  //   jQuery(".alert-area").css("top", headerHeight + "px");
  //   jQuery(".kt-tabs-title-list").css("top", headerHeight + alertbar + "px");
  // }
}

//   Initial run
setHeroHeight();

//   Observe header size changes
const header = document.querySelector("header");

if (header && "ResizeObserver" in window) {
  const resizeObserver = new ResizeObserver(() => {
    setHeroHeight();
  });
  resizeObserver.observe(header);
}

// Reset padding on close button click
$(".close").on("click", function () {
  $(".main_wrapper").css("padding-top", "");
});

/* ==========================================================================
   ANCHOR / HASH SCROLL ADJUSTMENT
   ========================================================================== */

(function ($, window) {
  var adjustAnchor = function () {
    var $anchor = $(":target");
    var fixedElementHeight = 150;
    if ($anchor.length > 0) {
      $("html, body")
        .stop()
        .animate({ scrollTop: $anchor.offset().top - fixedElementHeight }, 200);
      window.scrollTo(0, $anchor.offset().top - fixedElementHeight);
    }
  };
  $(window).on("hashchange load", function () {
    adjustAnchor();
  });
})(jQuery, window);

/* ==========================================================================
   ACCORDION – Main (.accmain)
   ========================================================================== */

(function ($) {
  $(".acctitle")
    .attr("tabindex", "0")
    .attr("role", "button")
    .attr("aria-expanded", "false");

  function toggleAccordion(elem, event) {
    var dropDown = elem.closest(".acccard").find(".accpanel");
    elem.closest(".accmain").find(".accpanel").not(dropDown).slideUp();
    elem
      .closest(".accmain")
      .find(".acctitle.active")
      .removeClass("active")
      .attr("aria-expanded", "false");

    if (elem.hasClass("active")) {
      elem.removeClass("active").attr("aria-expanded", "false");
    } else {
      elem.addClass("active").attr("aria-expanded", "true");
    }

    dropDown.stop(false, true).slideToggle();
    event.preventDefault();
  }

  $(".accmain .acctitle")
    .on("click", function (e) {
      toggleAccordion($(this), e);
    })
    .on("keydown", function (e) {
      if (
        e.key === "Enter" ||
        e.key === " " ||
        e.keyCode === 13 ||
        e.keyCode === 32
      ) {
        toggleAccordion($(this), e);
      }
    });
})(jQuery);

/* ==========================================================================
   ACCORDION – Secondary (.acc__main)
   ========================================================================== */

(function ($) {
  function toggleAccordion($title) {
    var dropDown = $title.closest(".acc__card").find(".acc__panel");
    $title.closest(".acc__main").find(".acc__panel").not(dropDown).slideUp();

    if ($title.hasClass("active")) {
      $title.removeClass("active");
    } else {
      $title
        .closest(".acc__main")
        .find(".acc__title.active")
        .removeClass("active");
      $title.addClass("active");
    }

    dropDown.stop(false, true).slideToggle();
  }

  $(".acc__main .acc__title")
    .attr("tabindex", "0")
    .attr("role", "button")
    .attr("aria-expanded", "false")
    .on("click", function (e) {
      e.preventDefault();
      toggleAccordion($(this));
    })
    .on("keydown", function (e) {
      if (
        e.key === "Enter" ||
        e.key === " " ||
        e.keyCode === 13 ||
        e.keyCode === 32
      ) {
        e.preventDefault();
        toggleAccordion($(this));
      }
    });
})(jQuery);

/* ==========================================================================
   TRIBE EVENTS – Layout Wrap & Month View
   ========================================================================== */

jQuery(function ($) {
  function wrapTribe() {
    var $filter = $(".tribe-filter-bar--vertical");
    var $view = $(
      ".tribe-events-calendar-list, .tribe-events-calendar-month, .tribe-events-pro-photo"
    );

    if (!$filter.length || !$view.length) return;

    if (!$(".tribe-events-layout .container .event_info").length) {
      $filter
        .add($view)
        .wrapAll(
          '<div class="tribe-events-layout">' +
            '<div class="container">' +
            '<div class="event_info"></div>' +
            "</div>" +
            "</div>"
        );
    }

    var $layout = $(".tribe-events-layout");
    if ($(".tribe-events-calendar-month").length) {
      $layout.addClass("is-month-view");
    } else {
      $layout.removeClass("is-month-view");
    }
  }

  wrapTribe();

  var observer = new MutationObserver(function () {
    wrapTribe();
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

/* ==========================================================================
   TRIBE EVENTS – Clickable Event Rows
   ========================================================================== */

jQuery(document).ready(function ($) {
  $(".tribe-events-calendar-list__event-row").each(function () {
    var $row = $(this);
    var mainLink = $row
      .find(".tribe-events-calendar-list__event-title-link")
      .attr("href");

    if (!mainLink) return;

    $row.css("cursor", "pointer").on("click", function (e) {
      if ($(e.target).closest("a").length) return;
      window.location.href = mainLink;
    });

    $row.attr("tabindex", "0").on("keypress", function (e) {
      if (e.which === 13) {
        window.location.href = mainLink;
      }
    });
  });
});

/* ==========================================================================
   AJAX SEARCH PRO – Accessible Close Button
   ========================================================================== */

jQuery(document).ready(function ($) {
  function makeProCloseAccessible() {
    $(".proclose").each(function () {
      if (!$(this).attr("tabindex")) {
        $(this).attr({
          tabindex: "0",
          role: "button",
          "aria-label": "Clear search",
        });
      }
    });
  }

  makeProCloseAccessible();

  $(document).on("asp_init_search_bar", function () {
    makeProCloseAccessible();
  });

  $(document).on("keydown", ".proclose", function (e) {
    if (e.which === 13 || e.which === 32) {
      e.preventDefault();
      $(this).click();
    }
  });
});

//For inner pages sidebar
$(document).ready(function () {
  $(".menu-wrapper .toggle-btn").click(function (e) {
    e.preventDefault();
    e.stopPropagation(); // prevent link clicks

    const parentLi = $(this).closest("li");

    if (parentLi.hasClass("active")) {
      parentLi.removeClass("active").children("ul").slideUp();
    } else {
      $(".menu-wrapper li").removeClass("active").children("ul").slideUp();
      parentLi.addClass("active").children("ul").slideDown();
    }
  });
  let lastScrollTop = 0;
  const header = $(".main_header");

  $(window).on("scroll", function () {
    const currentScroll = $(this).scrollTop();

    if (currentScroll > lastScrollTop && currentScroll > 50) {
      // scrolling down
      header.addClass("hide");
    } else {
      // scrolling up
      header.removeClass("hide");
    }

    lastScrollTop = currentScroll;
  });
});

jQuery(document).ready(function ($) {
  const $menuWrapper = $(".menu-wrapper"); // limit to this container

  // 1️⃣ Add + / - icon for items with children
  $menuWrapper.find(".menu-item-has-children").each(function () {
    if (!$(this).find("> .plus-mins").length) {
      $(this).prepend(
        '<div class="plus-mins" tabindex="0" aria-expanded="false" role="button" aria-label="Toggle submenu">+</div>'
      );
    }
  });

  // 2️⃣ Toggle submenu on click or keyboard
  $menuWrapper.on("click keypress", ".plus-mins", function (e) {
    if (e.type === "click" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const $toggle = $(this);
      const $submenu = $toggle.siblings("ul").first();

      $submenu.slideToggle(200);
      const isOpen = $toggle.attr("aria-expanded") === "true";

      $toggle.attr("aria-expanded", !isOpen);
      $toggle.text(isOpen ? "+" : "–");
    }
  });

  // 3️⃣ On page load: open only active paths within this menu
  $menuWrapper
    .find(
      ".current-menu-item, .current_page_item, .current_page_parent, .current-menu-ancestor"
    )
    .each(function () {
      const $activeLi = $(this);

      // Open its own submenu if present
      const $submenu = $activeLi.children("ul");
      if ($submenu.length) {
        $submenu.css("display", "block");
        const $toggle = $activeLi.children(".plus-mins");
        $toggle.text("–").attr("aria-expanded", "true");
      }

      // Open all ancestor submenus leading to this item
      $activeLi.parents("ul").each(function () {
        $(this).css("display", "block");
        const $toggle = $(this).siblings(".plus-mins");
        $toggle.text("–").attr("aria-expanded", "true");
      });
    });
  $(".sidebar_title").on("click", function () {
    if ($(window).width() < 1200) {
      $(".menu-wrapper").toggleClass("expanded");
    }
  });

  // Optional: remove expanded class when resizing above 1200px
  $(window).on("resize", function () {
    if ($(window).width() >= 1200) {
      $(".menu-wrapper").removeClass("expanded");
    }
  });
});
