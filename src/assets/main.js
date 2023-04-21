const API = 'https://youtube138.p.rapidapi.com/search/?q=Mujeres%20en%20ciencia&hl=en&gl=US';

const content = null || document.getElementById('videosrelated'); 
console.log(content); 

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '15df2d1b84mshe4818cb6cfa8d88p1c7ecfjsn3452a804e068',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

async function fetchData (urlAPI) {
    const response = await fetch(urlAPI, options); //llamado
    const data = await response.json(); //transformar información, objeto que se puede iterar
    return data; 
}; 

//consecuencia de llamar la función, crear una función que se llama a si misma y luego las consecuencias de la lógica serán desencadenadas 
//con try y catch se añade la lógica para hacer el llamado a API, obtener los elementos y mostrarlos en HTML 
(async() => {
    try {
        const videos = await fetchData(API); 
        let view = `
            ${videos.contents.map( elemento => {
                if (elemento.type === "video") {
                    return `
                        <div class="group relative">
                            <a href="https://www.youtube.com/watch?v=${elemento.video.videoId}">
                                <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                                    <img src="${elemento.video.thumbnails[0].url}" alt=${elemento.video.descriptionSnippet}" class="w-full">
                                </div>
                            </a>
                            <div class="mt-4 flex justify-between">
                                <h3 class="text-sm text-gray-700">
                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                    ${elemento.video.title}
                                </h3>
                            </div>
                        </div>
                    `;
                } else {
                    return ""; // Omitir elementos que no sean videos
                }
            }).slice(0,5).join('')}
        `; 
        content.innerHTML= view; 
    } catch (error) {
        console.log(error); 
    }


}) (); //sentencia que va a permitir cuando esta cargando el archivo ejecutar la función