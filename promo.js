//promo banner cookie
(function () {
    //hide dismissed promo
    if (GetCookie("dismissed-notifications")) {
        $(GetCookie("dismissed-notifications")).hide();
    }
    //fire ze promo cookie!
    $(".os-promo-close").click(function () {
        var alertId = $(this).closest(".os-navbar-meta").attr("id"); //get the id of the promo container to be hidden
        var dismissedNotifications = GetCookie("dismissed-notifications") + ",#" + alertId; //new value with array of promo's to be hidden, setup for multiple containers just in case
        $(this).closest(".os-navbar-meta").fadeOut('slow'); //animation to hide promo
        SetCookie("dismissed-notifications", dismissedNotifications.replace('null,', '')) //update ze cookie!
    });

    // Create ze cookie with the specified name and value.
    function SetCookie(sName, sValue) {
        document.cookie = sName + "=" + escape(sValue);
        // Expires the cookie in one minute (fixes when the browser refresh expires the cookie early because of reasons)
        var date = new Date();
        date.setMinutes(date.getMinutes() + 1);
        document.cookie += ("; expires=" + date.toUTCString());
    }

    // Retrieve the value of the cookie with the promo name.
    function GetCookie(sName) {
        // multiple cookies are separated by semicolons
        var aCookie = document.cookie.split("; ");
        for (var i = 0; i < aCookie.length; i++) {
            // a name/value pair (a crumb) is separated by an equal sign
            var aCrumb = aCookie[i].split("=");
            if (sName == aCrumb[0])
                return unescape(aCrumb[1]);
        }
        // return nothing in case cookie doesnt exist.
        return null;
    }
    //add category link to Keep Shopping button in PDP
    var ksCategoryLink = $(".breadcrumb > li:eq(2)").html();
    $(".os-cta-continueshopping").html($(ksCategoryLink).text('Continue Shopping'));

    //pdp - scroll to top if size not selected, on mobile only, for sticky Add To Cart Button
    if ($(window).width() <= 768) {
        $('.os-cta-addtocart').on('click', function () {
            var sizeId = $.onestop.product.viewModel.selectedSizeId();
            if (sizeId != null) {
                return true
            } else {
                $('html,body').animate({ scrollTop: 600 }, 'fast'); return false;
            }
        });
    }
})();