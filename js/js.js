let offsetbegin;

$(document).ready(function () {
    offsetbegin = Math.floor($('.navbar').offset().top);
});

function removLoading() {
     $('body').css('overflow','auto');
    $(".loading").fadeOut(1000,
        function()
        {
            $('.loading').removeClass('d-flex')
        }
    );
}

$(window).on("load", function () {
    removLoading()
});

function DisplayLoading() {
    $(window).scrollTop(0)
    //  $('body').css('overflow','hidden');
     $('.loading').addClass('d-flex')
    $(".loading").fadeIn(1);
}


$(window).scroll(function () {
    let offsetWindow = $(window).scrollTop();
    if (offsetWindow >= offsetbegin) {
        $('.navbar').addClass('fixed-nav');
        $('.navbar').removeClass('translate-middle-y');
    } else {
        $('.navbar').removeClass('fixed-nav');
        $('.navbar').addClass('translate-middle-y');
    }
});

$('.nav-link').click(function () {
    // $(window).scrollTop(0)
    DisplayLoading()
    $('.nav-link').removeClass('myActive');
    $(this).addClass('myActive');
   
    
    getCategory($(this).attr('id'))
    
})


$('.navbar-brand').click(function () {
    $('.nav-link').removeClass('myActive');
})


let games;

async function getAllGames() {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64b5e48e58msh1be071d2c667576p10393bjsnb84c06ed7cb4',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games`, options)
    let response = await api.json();
    games = response;
    displayItems()
    
   

}

async function getCategory(Category) {
console.log(Category);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64b5e48e58msh1be071d2c667576p10393bjsnb84c06ed7cb4',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${Category}`, options)
    let response = await api.json();


    games = response;
    
    displayItems()
    removLoading()

}

getAllGames();
let addAllItems = []


function displayItems() {
    addAllItems =[]
console.log(games);

    games.forEach(element => {


        addAllItems += `<div id="${element.id}" class="p-2 col-lg-3 col-md-4 col-sm-6 AllCards">

            <div class="p-3 card-item text-white d-flex flex-column h-100 w-100 bg-dark-min">

                <!-- IMAGE -->
                <img class="w-100 rounded-2" src="${element.thumbnail}" alt="">

                <!-- TITLE + PRICE -->
                <div class="d-flex justify-content-between align-items-center py-3">
                    <h5 class="m-0">${element.title}</h5>
                    <div class="px-2 rounded-2 ItemPrice">Free</div>
                </div>

                <!-- DESCRIPTION -->
                <p class="text-white-50">
                    ${element.short_description}
                </p>

                <!-- PUSH TO BOTTOM -->
                <div class="mt-auto">
                    <div class="width-90"></div>
                    <div class="d-flex justify-content-between align-items-center">

                        <div class="bg-gray px-2 py-1 rounded-5 d-flex justify-content-center align-items-center">
                            ${element.genre}
                        </div>

                        <div class="bg-gray px-2 py-1 rounded-5 d-flex justify-content-center align-items-center">
                            ${element.platform.length > 14 
                            ? element.platform.slice(0, 14) + "..." 
                            : element.platform}
                        </div>
                    </div>
                </div>

            </div>
        </div>`


    });

    $('#RowForItems').html(addAllItems)
    addClick()



}

function addClick() {
  $('.AllCards').click(function(e){
    DisplayLoading()
    games.forEach(element => {
      if(element.id==this.id)  {
        
        desiredElement=element
        localStorage.setItem("desiredElement", JSON.stringify(desiredElement));
        console.log(desiredElement);
        window.location.href = "./pageInfo.html";
      }
    });
    
}) 

  
}
