let offsetbegin;

$(document).ready(function () {

    // safe reset (ONLY index page)
    localStorage.removeItem("desiredElement");

    offsetbegin = Math.floor($('.navbar').offset().top);

    getAllGames(); 
});



function removLoading() {
    $('body').css('overflow', 'auto');

    $(".loading").fadeOut(800, function () {
        $('.loading').removeClass('d-flex');
    });
}

$(window).on("load", function () {
    removLoading();
});

function DisplayLoading() {
    $(window).scrollTop(0);
    $('.loading').addClass('d-flex');
    $(".loading").fadeIn(1);
}



$(window).on("scroll", function () {
    let offsetWindow = $(window).scrollTop();

    if (offsetWindow >= offsetbegin) {
        $('.navbar').addClass('fixed-nav');
        $('.navbar').removeClass('translate-middle-y');
    } else {
        $('.navbar').removeClass('fixed-nav');
        $('.navbar').addClass('translate-middle-y');
    }
});


$('.nav-link').on('click', function () {
    DisplayLoading();

    $('.nav-link').removeClass('myActive');
    $(this).addClass('myActive');

    getCategory($(this).attr('id'));
});

$('.navbar-brand').on('click', function () {
    $('.nav-link').removeClass('myActive');
});


let games = [];
let addAllItems = [];


async function getAllGames() {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'YOUR_KEY',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games`, options);
        let response = await api.json();

        games = response;
        displayItems();

    } catch (err) {
        console.log(err);
    }
}

async function getCategory(Category) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'YOUR_KEY',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        let api = await fetch(
            `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${Category}`,
            options
        );

        let response = await api.json();

        games = response;
        displayItems();
        removLoading();

    } catch (err) {
        console.log(err);
    }
}


function displayItems() {

    addAllItems = "";

    games.forEach(element => {

        addAllItems += `
        <div id="${element.id}" class="p-2 col-lg-3 col-md-4 col-sm-6 AllCards">

            <div class="p-3 card-item text-white d-flex flex-column h-100 w-100 bg-dark-min">

                <img class="w-100 rounded-2" src="${element.thumbnail}" alt="">

                <div class="d-flex justify-content-between align-items-center py-3">
                    <h5 class="m-0">${element.title}</h5>
                    <div class="px-2 rounded-2 ItemPrice">Free</div>
                </div>

                <p class="text-white-50">
                    ${element.short_description}
                </p>

                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center">

                        <div class="bg-gray px-2 py-1 rounded-5">
                            ${element.genre}
                        </div>

                        <div class="bg-gray px-2 py-1 rounded-5">
                            ${element.platform.length > 14
                                ? element.platform.slice(0, 14) + "..."
                                : element.platform}
                        </div>

                    </div>
                </div>

            </div>
        </div>`;
    });

    $('#RowForItems').html(addAllItems);

    addClick();
}

function addClick() {

    $('.AllCards').on('click', function () {

        DisplayLoading();

        const id = $(this).attr("id");

        const selected = games.find(g => g.id == id);

        if (selected) {
            localStorage.setItem("desiredElement", JSON.stringify(selected));
            window.location.href = "./pageInfo.html";
        }
    });
}