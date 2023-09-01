let modal = null

const oppenModal = function(e){
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null;
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click",closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click",stopPropagation)
}

const closeModal = function(e){
   if (modal === null) return
    e.preventDefault()
    modal.style.display = "none";
    modal.removeEventListener('click', closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click",closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click",stopPropagation)
    modal =null
}

const stopPropagation= function(e){
    e.stopPropagation()
} 
document.querySelectorAll(".js-modal").forEach(a=> {
    a.addEventListener('click', oppenModal)
    
})


   async function generationModal(){
    
    
    const fetcher = await fetch ("http://localhost:5678/api/works")
    const PhotoModal = await fetcher.json()
    for(let i = 0; i<PhotoModal.length; i++){
    const article = PhotoModal[i];

    const sectionGallery = document.querySelector(".galleryModal");
    const articleElement = document.createElement("article");
    articleElement.classList.add("photosRealisation");
    articleElement.dataset.id = [i];
    
    const IconTrash = document.createElement("icon");
    IconTrash.classList.add("fa-regular", "fa-trash-can","fa-sm");
    IconTrash.setAttribute('id',article.id)
    IconTrash.addEventListener("click", function(){
        deletework()

    })
    
    const IconArrow = document.createElement("icon");
    IconArrow.classList.add("fa-solid", "fa-arrows-up-down-left-right","fa-am");


    const imageElementModal = document.createElement("img");
    imageElementModal.src = PhotoModal[i].imageUrl; 
    
    const titleElement = document.createElement("p");
    titleElement.innerText = "editer";

    sectionGallery.appendChild(articleElement);
    articleElement.appendChild(imageElementModal)
    articleElement.appendChild(titleElement);
    articleElement.appendChild(IconTrash)
    articleElement.appendChild(IconArrow)
    console.log(article)
    console.log(articleElement.id)
    }
    
    
   }; 
   generationModal()

  
   

   document.addEventListener("click", () => {
    const buttonsAjoutPhoto = document.querySelector(".buttonPhoto");
    const addsPhoto = document.querySelector(".modal2")
    const gallerysphoto = document.querySelector(".modal1")
    const backArrow = document.querySelector(".js-modal-back")
    
    buttonsAjoutPhoto.addEventListener("click",() =>{
    addsPhoto.style.display = "flex"
    gallerysphoto.style.display ="none"
    })
    backArrow.addEventListener("click",() =>{
        addsPhoto.style.display="none"
        gallerysphoto.style.display="flex"
    })
   })

   
function deletework() {

    fetch('http://localhost:5678/api/works/${id}', {
    method: "DELETE",
headers: {
Authorization: 'Bearer ${token}',
Accept: "*/*",
"content-type": "application/json",
}
   })
   .then(response =>{
    if(response.ok){
        console.log("ressource succes")
    } else{
        console.log("erreur")
    }
   })
   .catch(error => console.log(error));
}


async function addProject() {
    const selectedImg = imgUpload.files[0];
    const category = document.querySelector('select[name="category"]');
    const categoryOption = parseInt(category.value);
    console.log(categoryOption);
    //Liaison avec html pour les élts du formulaire :
    const formElement = document.querySelector("#form");
    const formData = new FormData();
    formData.append ("title", title.value); 
    formData.append("image", selectedImg);
    formData.append ("category", categoryOption);
    console.log(formData) ;
    const response = await fetch("http://localhost:5678/api/works", { 
    method: "POST",
    headers: {
    'accept': 'application/json',
    'Authorization': 'Bearer ${userToken}',
    'Content-Type': contentType,
    },
    body: formData
    });
    response. json ();
    if (response.ok) {
    console.log("Projet envoyé"); 
} else{
    console.log("erreur")
}}


function validationButton (){
if(uploadImg.files.length > 0 && title.value!== "" && choseCat.value !=="") {
    valid.classList.add("true")
console.log(uploadImg)
console.log(title)
console.log(choseCat)
console.log(valid)
}else{
    valid.classList.remove("true")
}
}
uploadImg.addEventListener("input", validationButton);
title.addEventListener("input", validationButton);
choseCat.addEventListener("input", validationButton);
