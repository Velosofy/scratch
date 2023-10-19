import { api_key, createCardWithCarousel } from '../../helper.js';

var movieCarouselContainer;
var movieSlideWidth;
let movieScrollPosition = 0;

var tvCarouselContainer;
var tvSlideWidth;
let tvScrollPosition = 0;

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        data.results.slice(0, 10).forEach((movie, index) => {
            $('.movie-collection').append(createCardWithCarousel(movie, index));
        })
    })
    .then(() => {
        movieCarouselContainer = $("#movie-carousel .carousel-inner");
        movieSlideWidth = movieCarouselContainer.find(".carousel-item").first().outerWidth(true);
    })
    .catch(err => console.error(err));

fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=500&with_original_language=en&api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
        data.results.slice(0, 10).forEach((tv, index) => {
            $('.tv-collection').append(createCardWithCarousel(tv, index));
        });
    })
    .then(() => {
        tvCarouselContainer = $("#tv-carousel .carousel-inner");
        tvSlideWidth = tvCarouselContainer.find(".carousel-item").first().outerWidth(true);
    })
    .catch(err => console.error(err));


$(document).ready(function () {
    if ($(window).width() >= 768) {
        $("#movie-carousel, #tv-carousel").removeClass("slide");
    }

    $("#movie-carousel .carousel-control-prev").on("click", function () {
        movieScrollPosition -= movieSlideWidth;
        movieCarouselContainer.stop().animate({ scrollLeft: movieScrollPosition }, 1000);
        if (movieScrollPosition <= 0) {
            $(this).hide();
        }
        $("#movie-carousel .carousel-control-next").show();
    });
    $("#movie-carousel .carousel-control-next").on("click", function () {
        movieScrollPosition += movieSlideWidth;
        movieCarouselContainer.stop().animate({ scrollLeft: movieScrollPosition }, 1000);
        if (movieScrollPosition >= movieCarouselContainer[0].scrollWidth - movieCarouselContainer.width()) {
            $(this).hide();
        }
        $("#movie-carousel .carousel-control-prev").show();
    });

    $("#tv-carousel .carousel-control-prev").on("click", function () {
        tvScrollPosition -= tvSlideWidth;
        tvCarouselContainer.stop().animate({ scrollLeft: tvScrollPosition }, 1000);
        if (tvScrollPosition <= 0) {
            $(this).hide();
        }
        $("#tv-carousel .carousel-control-next").show();
    });

    $("#tv-carousel .carousel-control-next").on("click", function () {
        tvScrollPosition += tvSlideWidth;
        tvCarouselContainer.stop().animate({ scrollLeft: tvScrollPosition }, 1000);
        if (tvScrollPosition >= tvCarouselContainer[0].scrollWidth - tvCarouselContainer.width()) {
            $(this).hide();
        }
        $("#tv-carousel .carousel-control-prev").show();
    });
});

$(window).on('resize', function () {
    if ($(window).width() >= 768) {
        $("#movie-carousel, #tv-carousel").removeClass("slide");

        movieSlideWidth = movieCarouselContainer.find(".carousel-item").first().outerWidth(true);
        movieScrollPosition = Math.round(movieCarouselContainer.scrollLeft() / movieSlideWidth) * movieSlideWidth;
        movieCarouselContainer.stop().animate({ scrollLeft: movieScrollPosition }, 1000);

        tvSlideWidth = tvCarouselContainer.find(".carousel-item").first().outerWidth(true);
        tvScrollPosition = Math.round(tvCarouselContainer.scrollLeft() / tvSlideWidth) * tvSlideWidth;
        tvCarouselContainer.stop().animate({ scrollLeft: tvScrollPosition }, 1000);
    } else {
        $("#movie-carousel, #tv-carousel").addClass("slide");
    }
});
