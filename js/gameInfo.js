
let desiredElement = JSON.parse(localStorage.getItem("desiredElement"));
let detalis=''
let itemId=`${desiredElement.id}`
getDetalis(itemId)

async function getDetalis(itemId) {


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '64b5e48e58msh1be071d2c667576p10393bjsnb84c06ed7cb4',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };


    api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${itemId}`, options)
    let response = await api.json()
    
    detalis= response
    console.log(detalis.description);
    fillItem()

}

   
    

function fillItem()
{
    let item=`
<div class="col-lg-4">
                <img class="w-100" src="${desiredElement.thumbnail}" alt="">
            </div>
            <div class="col-lg-8 text-white">
                <h1 id="titel ">
                    Title: ${desiredElement.title}
                </h1>
                <div class="d-flex flex-column mt-3 gap-2">
                <h6>Category:<span class="px-2 rounded-2 ItemCaPlSta">${desiredElement.genre}</span> </h6>
                <h6>Platform:<span class="px-2 rounded-2 ItemCaPlSta">${desiredElement.platform}</span> </h6>
                <h6>Status:<span class="px-2 rounded-2 ItemCaPlSta">Live</span> </h6>
                <p class="fs-6">${detalis.description}</p>
               <a class="btn btn-info" target="_blank" href="${desiredElement.game_url}">show Game</a>
            </div>
            </div>
`
$('#gameInfo').html(item)
}
