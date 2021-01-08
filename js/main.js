$(document).ready(function () {

    let img_url = "https://image.tmdb.org/t/p/w500";
    let defultFetch = "now_playing";
    let AllMovies = [];

    async function getMovies(defultFetch, movieOrTrendMovie = "movie") {

        let Movies = await fetch(`https://api.themoviedb.org/3/${movieOrTrendMovie}/${defultFetch}?api_key=9a53ab755b982f261f4762f78d90f9ff`);

        Movies = await Movies.json();

        AllMovies = Movies.results;

        displayMovies();

    };

    function displayMovies() {

        let movieLayer = ``

        for (let i = 0; i < AllMovies.length; i++) {

            movieLayer += `
            <div class="col-md-4 mb-4 m-auto">

                <div class="position-relative overflow-hidden movie">

                    <img class="w-100 movie_img" src="${img_url}${AllMovies[i].poster_path}" alt="">

                        <div class="layer text-dark d-flex align-items-center text-center justify-content-center">
                            <div>
                                <h2 class="headline fs-1 fw-bolder">${AllMovies[i].original_title}</h2>
                                    <p class="fs-6 fw-bold">${AllMovies[i].overview}</p>
                                    <p class="fs-5 fw-bold">Rate : ${AllMovies[i].vote_average}</p>
                                    <p class="fs-5 fw-bold">${AllMovies[i].release_date}</p>
                            </div>
                        </div>

                </div>

            </div>
            `
        }

        $("#movies").html(movieLayer);

    }

    getMovies(defultFetch);

    $(".Name").on("blur", function () {
        let rejex = /^[A-Z][a-z]{2,}$/
        check(rejex, this);
    });

    $(".Email").on("blur", function () {
        let rejex = /^[(A-z)(0-9)(_&)]{1,}@[(A-z)(0-9)]{3,}[.](com|net|org)$/
        check(rejex, this);

    });

    $(".Phone_number").on("blur", function () {
        let rejex = /^(011|012|010|015)[0-9]{8}$/
        check(rejex, this);
    });

    $(".Age").on("blur", function () {
        let rejex = /^([1-9]?[0-9]|100)$/
        check(rejex, this);
    })

    $(".Password").on("blur", function () {
        let rejex = /^[A-Z][\w?\d]{5,20}$/
        check(rejex, this);
    })

    $(".RePassword").on("blur", function () {
        let rejex = /^[A-Z][\w?\d]{5,20}$/
        check(rejex, this);
        if (this.value == $(".Password").val()) {
            this.classList.add("is-valid");
            this.classList.remove("is-invalid");
        } else {
            this.classList.add("is-invalid");
            $(this).next().addClass("invalid-feedback")
            $(this).next().removeClass("d-none")
            this.classList.remove("is-valid");
        }
    })

    function check(rejex, checker) {
        if (rejex.test(checker.value) == true) {
            checker.classList.add("is-valid");
            checker.classList.remove("is-invalid");
        }
        else {
            checker.classList.add("is-invalid");
            $(checker).next().addClass("invalid-feedback")
            $(checker).next().removeClass("d-none")
            checker.classList.remove("is-valid");
        }
    }

    $(".close").on("click", function () {
        $(".close").toggleClass("fa-times");
        $(".close").toggleClass("fa-bars");

        let widthOfMenu = $(".MovieOption").parent().css("width");

        let leftOfMenu = $("nav").css("left");

        if (leftOfMenu == "0px") {

            $("nav").css("left", `-${widthOfMenu}`);
            $(".option").eq(0).animate({ bottom: "-100%", opacity: "0" }, 1200)
            $(".option").eq(1).animate({ bottom: "-100%", opacity: "0" }, 1000)
            $(".option").eq(2).animate({ bottom: "-100%", opacity: "0" }, 800)
            $(".option").eq(3).animate({ bottom: "-100%", opacity: "0" }, 600)
            $(".option").eq(4).animate({ bottom: "-100%", opacity: "0" }, 400)
            $(".option").eq(5).animate({ bottom: "-100%", opacity: "0" }, 300)
            $(".GoToContact").animate({ bottom: "-100%", opacity: "0" }, 200)

        } else {
            $("nav").css("left", `0px`);
            $(".option").eq(0).animate({ top: "0", opacity: "1" }, 800)
            $(".option").eq(1).animate({ bottom: "0", opacity: "1" }, 1000)
            $(".option").eq(2).animate({ bottom: "0", opacity: "1" }, 1200)
            $(".option").eq(3).animate({ bottom: "0", opacity: "1" }, 1400)
            $(".option").eq(4).animate({ bottom: "0", opacity: "1" }, 1600)
            $(".option").eq(5).animate({ bottom: "0", opacity: "1" }, 1800)
            $(".GoToContact").animate({ bottom: "0", opacity: "1" }, 1800)
        }
    })

    $(".option").on("click", function () {

        if ($(this).html() == "Trending") {

            getMovies("all/week", "trending");

        } else {
            let newFetch = $(this).attr("value");

            defultFetch = newFetch;

            getMovies(defultFetch);
        }

    })

    function getSearch(searchTrem) {

        let container = ``

        for (let i = 0; i < AllMovies.length; i++) {

            if (AllMovies[i].original_title.toLowerCase().includes(searchTrem.toLowerCase()))

                container += `
                <div class="col-md-4 mb-4">

                <div class="position-relative overflow-hidden movie">

                    <img class="img-fluid movie_img" src="${img_url}${AllMovies[i].poster_path}" alt="">

                        <div class="layer text-dark d-flex align-items-center text-center justify-content-center">
                            <div>
                                <h2 class="headline fs-1 fw-bolder">${AllMovies[i].original_title}</h2>
                                    <p class="fs-6 fw-bold">${AllMovies[i].overview}</p>
                                    <p class="fs-5 fw-bold">Rate : ${AllMovies[i].vote_average}</p>
                                    <p class="fs-5 fw-bold">${AllMovies[i].release_date}</p>
                            </div>
                        </div>

                </div>

            </div>`

        }

        document.getElementById("movies").innerHTML = container;

    }

    $(".by_word").on("keyup", function () {
        getSearch(this.value);
    })

    $("search").on("keyup", function () {
        getSearch(this.value);
    })
});

