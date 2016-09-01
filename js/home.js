var main = {} || "";

main.init = function(){
    main.onNavbarScroll();
    main.onIconTransition();
    main.initCountDown();
    main.onMenuClick();
    main.onClickBrandLogo();
    main.onClickIntroButton();
    main.onFormSubmit();
}

main.onFormSubmit = function (){
    $("#form-content").submit(function(){
       $("#ss-submit").attr("disabled", true);
        setTimeout(function(){
            $("#ss-submit").attr("disabled", false);
        }, 1000);
    });

    $("#hidden_iframe").on('load',function () {
        $("#myModal").modal('show');
        $("#form-content")[0].reset();
        setTimeout(function(){
            $("#myModal").modal('hide');
        }, 2000);
    });
}

main.onClickIntroButton = function(){
    var introButton = $(".intro-header .intro-button");
    introButton.on("click",function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - 80
                }, 700);
                return false;
            }

        }
    });
};

main.onClickBrandLogo = function(){
    var brandlogo = $('nav.navbar-default .container .navbar-header .navbar-brand');
    $(function() {
        $('brandlogo').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: $($(this).attr('href')).offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });
};

main.onMenuClick = function(){
    $(document).on("scroll", onScroll);
    $('.navbar-menu a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active-menu');
        })
        $(this).addClass('active-menu');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 0
        }, 700, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop() + 96;
        $('.navbar-menu a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top  + refElement.height() > scrollPos) {
                $('.navbar-menu a').removeClass("active-menu");
                currLink.addClass("active-menu");
            }
            else{
                currLink.removeClass("active-menu");
            }
        });
    }

};

main.onNavbarScroll = function(){
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50 && $(document).width() >= 992) {
            $('nav').addClass('navbar-shrink');
        }

        else if ($(document).width() <= 991){
            $('nav').addClass('navbar-shrink');
        }
        else {
            $('nav').removeClass('navbar-shrink');
        }
    });

    if ($(document).width() <= 991) {
        $('nav').addClass('navbar-shrink');
    }
}

main.onIconTransition = function() {
    $('#icon-transition').on('click', function () {
        $(this).toggleClass('open');
    });
}

main.initCountDown = function(){
    // var beforeWedding = new Date('2016/04/24 15:01:50');
    var beforeWedding = new Date('2016/12/05');
    $('#countdown-day').countdown(beforeWedding, {elapse: true}).on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime('<span class="countdown-number">%-D</span>'));
        if(event.elapsed){
            $("#countdown .content-header").text("Forever and Counting");
        }
        else{
            $("#countdown .content-header").text("How long do we have to wait?");
        }
    });

    $('#countdown-hour').countdown(beforeWedding, {elapse: true}).on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime('<span class="countdown-number">%-H</span>'));
    });

    $('#countdown-minute').countdown(beforeWedding, {elapse: true}).on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime('<span class="countdown-number">%-M</span>'));
    });

    $('#countdown-second').countdown(beforeWedding, {elapse: true}).on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime('<span class="countdown-number">%-S</span>'));
    });
}

$(function(){
    main.init();
});