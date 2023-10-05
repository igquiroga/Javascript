const div = document.getElementById('app')

function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
function createDivPoke(poke){
	const divPoke = document.createElement('div')
	const divCardImage= document.createElement('div')
	const divCardImageInner = document.createElement('div')
	divCardImage.classList.add('card-image')
	divCardImageInner.classList.add('card-image-inner')
	divPoke.classList.add('card')
	divPoke.setAttribute("id", "poke")
	const divImageFront = document.createElement('div')
	divImageFront.classList.add('card-image-front')
	const imgFront = document.createElement('img')
	imgFront.setAttribute("id","poke-image-front")
	imgFront.src = poke.imgFront
	const divImageBack = document.createElement('div')
	divImageBack.classList.add('card-image-back')
	const imgBack = document.createElement('img')
	imgBack.setAttribute("id","poke-image-back")
	imgBack.src = poke.imgBack
	const p = document.createElement('p')
	p.classList.add('poke-name')
	p.setAttribute("id","pokename")
	p.textContent = poke.name
	divImageFront.append(imgFront)
	divImageBack.append(imgBack)
	divCardImageInner.append(divImageFront)
	divCardImageInner.append(divImageBack)
	divCardImage.append(divCardImageInner)
	divPoke.append(divCardImage)
	divPoke.append(p)
	div.append(divPoke)
}
function cleanSearch(divPoke,textError,textApiError){
	if(textError){
		textError.remove()
	}
	if(textApiError){
		textApiError.remove()
	}
	if(divPoke){
		divPoke.remove()
	}
}
function pokeapi(){
	const divPoke = document.getElementById('poke')
	const textError = document.getElementById('searchError')
	const textApiError = document.getElementById('apiError')

	const input = document.getElementsByName('namePoke')[0]
	const searchPoke = input.value.toLowerCase()

	if(searchPoke){
		cleanSearch(divPoke,textError,textApiError)
		const divLoading = document.createElement('div')
		divLoading.setAttribute('id',"searchPoke")
		divLoading.classList.add("custom-loader")
		div.append(divLoading)
		fetch("https://pokeapi.co/api/v2/pokemon/"+searchPoke)
		.then(res => res.json())
		.then(data=>{
			wait(200).then(() => { 
				divLoading.remove()
			})
			wait(200).then(() => { 
				const pokeName = data.name
				const poke = {id: data.id ,name: pokeName.charAt(0).toUpperCase() + pokeName.slice(1),imgFront:data.sprites.front_default,imgBack:data.sprites.back_default}
				if(!divPoke){
					createDivPoke(poke)
				}else{
					div.append(divPoke)
					const imageFront = document.getElementById("poke-image-front")
					const imageBack = document.getElementById("poke-image-back")
					const name = document.getElementById("pokename")
					imageFront.src = poke.imgFront
					imageBack.src = poke.imgBack
					name.textContent = poke.name
				}
			})			
		})
		.catch( error => {
			
			wait(200).then(() => { 
				divLoading.remove()
			})
			wait(200).then(() => { 

				if(!textApiError){
					if(divPoke){
						divPoke.remove()
					}
					const textApiError = document.createElement('p')
					textApiError.setAttribute('id',"apiError")
					textApiError.classList.add('error')
					textApiError.textContent = "Pokemon not Found"
					div.append(textApiError)
				}else {
					div.append(textApiError)
				}
			})
		})
	}else{
		cleanSearch(divPoke,textError,textApiError)
		if(!textError){
			const error = document.createElement('p')
			error.setAttribute('id',"searchError")
			error.textContent = "Search must be filled out"
			error.classList.add('error')
			div.append(error)
		}else{
			div.append(error)
		}

	}
	
}

