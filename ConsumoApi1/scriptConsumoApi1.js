let boton = document.querySelector("button");
let galeriaEspacio = document.querySelector(".galeria");

boton.addEventListener("click", ()=>{
    if(galeriaEspacio.innerHTML !== "") {
        galeriaEspacio.innerHTML = "";
    }
    boton.disabled = true;
    boton.innerHTML = 'Cargando...';    
    mostrarImagenes();
})

function peticionApi () {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            let api = "https://jsonplaceholder.typicode.com/photos";

            fetch(api)
            .then(Response => Response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
            .finally(() => {
                boton.disabled = false;
                boton.innerHTML = 'Cargar Imágenes';
            });
        }, 1500);
    })
}

async function mostrarImagenes() {
    try {
        const galeria = await peticionApi();
        
        for(let i = 0; i<10; i++) {
            let indiceAleatorio = Math.floor(Math.random() * galeria.length);
            let item = galeria[indiceAleatorio];

            galeriaEspacio.innerHTML += `
            <div class="col">
                <div class="card m-3" style= "width: 18rem;">
                    <img src="${item.thumbnailUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Image ID: ${item.id}  Album ID: ${item.albumId}</p>
                    </div>
                </div>
            </div>  
            `
        }
        
    } catch (error) {
        console.log(error);
    }
}