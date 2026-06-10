const totalContacts =document.getElementById('totalContacts')
const favoritesCount =document.getElementById('favoritesCount')
const emergencyCount =document.getElementById('emergencyCount')
const form = document.getElementById('contactForm')
const img =  document.getElementById('photoInput')
const fullName = document.getElementById('fullName')
const phoneNumber = document.getElementById('phoneNumber')
const emailAddress = document.getElementById('emailAddress')
const address = document.getElementById('address')
const group = document.getElementById('group')
const notes = document.getElementById('notes')
const isFavorite = document.getElementById('isFavorite')
const isEmergincy = document.getElementById('isEmergincy')
const saveContactBtn = document.getElementById('saveContactBtn')
const updateContactBtn = document.getElementById('updateContactBtn')
const contactsSection = document.getElementById('contactsSection')
const favouritesListContainer  = document.getElementById('favouritesList')
const emergincyListContainer = document.getElementById('emergincyList')
const rowData=document.getElementById('rowData')




let contactsList =JSON.parse(localStorage.getItem("contacts"))|| []
let favouritesList =JSON.parse(localStorage.getItem("favorites"))|| []
let emergincyList =JSON.parse(localStorage.getItem("emergincy"))|| []
let searchList =[]
displayContacts()
dispalyFavorites()
displayEmergincy()




let imageUpdate = ''
let updatedPhone=''



function addContact(){
if(validateInputs(fullName)&& validateInputs(phoneNumber)&& validateInputs(emailAddress)&&!isDuplicate(phoneNumber.value)){
    let imageName =''
    if(img.files.length ===0){
const names =   fullName.value.trim().split(" ")
const first = names[0][0].toUpperCase()
const last =names [names.length-1][0].toUpperCase()
 
imageName = first + last 
}
else{
imageName =`./images/${img.files[0].name}`

}


    const contact = {
    
    img: imageName,
    fullName:fullName.value.trim(),
    phoneNumber:phoneNumber.value.trim(),
    emailAddress:emailAddress.value.trim(),
    address:address.value,
    group:group.value,
    notes:notes.value.trim(),
    isFavorite : isFavorite.checked,
    isEmergincy : isEmergincy.checked,
}

contactsList.push(contact)
saveToLocalStorage('contacts',contactsList)
displayContacts()

if(contact.isFavorite){
favouritesList.push(contact)
saveToLocalStorage('favorites',favouritesList)
dispalyFavorites()
}
if(contact.isEmergincy){
emergincyList.push(contact)
saveToLocalStorage('emergincy',emergincyList)
displayEmergincy()

}

clearForm()
closeModal()



}

}
function addToFav(phone,ele){
const contact= contactsList.find((con)=>con.phoneNumber == phone)
contact.isFavorite =true
saveToLocalStorage('contacts',contactsList)
displayContacts()

ele.classList.toggle('active')

favouritesList.push(contact)
saveToLocalStorage('favorites',favouritesList)
dispalyFavorites()
}
 
function addToEmergincy(phone,ele){
    const contact= contactsList.find((con)=>con.phoneNumber == phone)
    contact.isEmergincy =true
    saveToLocalStorage('contacts',contactsList)
    displayContacts()
    
    ele.classList.toggle('active')
    
    emergincyList.push(contact)
    saveToLocalStorage('emergincy',emergincyList)
    displayEmergincy()
}
function removeContact(phone) {
    const contactAfterDeteltion=contactsList.filter((con)=>con.phoneNumber !=phone)
contactsList = contactAfterDeteltion
saveToLocalStorage('contacts',contactsList)
displayContacts()


const favAfterDeletion = favouritesList.filter((fav)=> fav.phoneNumber!= phone)
favouritesList =favAfterDeletion
saveToLocalStorage('favorites',favouritesList)
dispalyFavorites()

const emergincyAfetDeletion = emergincyList.filter((emer)=> emer.phoneNumber != phone)
    emergincyList =  emergincyAfetDeletion
    saveToLocalStorage('emergincy',emergincyList)
    displayEmergincy()

}


function removeFromFav(phone,ele) {
const contact= contactsList.find((con)=>con.phoneNumber == phone)
contact.isFavorite =false
saveToLocalStorage('contacts',contactsList)
displayContacts()

ele.classList.toggle('active')

const index=favouritesList.findIndex((fav)=> fav.phoneNumber == phone)
favouritesList.splice(index,1)
saveToLocalStorage('favorites',favouritesList)
dispalyFavorites()
}
function removeFromEmergincy(phone,ele){
    const contact= contactsList.find((con)=>con.phoneNumber == phone)
    contact.isEmergincy =false
    saveToLocalStorage('contacts',contactsList)
    displayContacts()
    
    ele.classList.toggle('active')
    
    const afetDeletion = emergincyList.filter((emer)=> emer.phoneNumber != phone)
    emergincyList = afetDeletion
    saveToLocalStorage('emergincy',emergincyList)
    displayEmergincy()



}
function getDataForForm(phone){
saveContactBtn.classList.toggle('d-none')
updateContactBtn.classList.toggle('d-none')
const contact =contactsList.find((con)=>con.phoneNumber==phone)
fullName.value = contact.fullName
phoneNumber.value = contact.phoneNumber
emailAddress.value = contact.emailAddress
address.value =contact.address
group.value = contact.group
notes.value = contact.notes
isFavorite.checked = contact.isFavorite
isEmergincy.checked = contact.isEmergincy
imageUpdate =contact.img
updatedPhone =contact.phoneNumber
}
function updateContact(){
const indexContact = contactsList.findIndex((con)=>con.phoneNumber== updatedPhone)
const indexFav = favouritesList.findIndex((con)=>con.phoneNumber== updatedPhone)
const indexEmer = emergincyList.findIndex((con)=>con.phoneNumber== updatedPhone)

if(validateInputs(fullName)&& validateInputs(phoneNumber)&& validateInputs(emailAddress)){
    let imageName =''
    if(img.files.length ===0){

const isExistImg =imageUpdate.includes('/')
if(isExistImg){
imageName = imageUpdate


}else{
    const names =   fullName.value.trim().split(" ")
const first = names[0][0].toUpperCase()
const last =names [names.length-1][0].toUpperCase()
 
imageName = first + last 

}
    
}
else{
imageName =`./images/${img.files[0].name}`

}


    const contact = {
    
    img: imageName,
    fullName:fullName.value.trim(),
    phoneNumber:phoneNumber.value.trim(),
    emailAddress:emailAddress.value.trim(),
    address:address.value,
    group:group.value,
    notes:notes.value.trim(),
    isFavorite : isFavorite.checked,
    isEmergincy : isEmergincy.checked,
}
contactsList[indexContact] =contact
saveToLocalStorage('contacts',contactsList)
displayContacts()

if(indexFav!= -1){
if(!contact.isFavorite){
favouritesList.splice(indexFav,1)
saveToLocalStorage('favorites',favouritesList)
dispalyFavorites()
}


}else{
if(contact.isFavorite){
   favouritesList.push(contact)
    saveToLocalStorage('favorites',favouritesList)
    dispalyFavorites()
    }

}

if(indexEmer!= -1){
    if(!contact.isEmergincy){
    emergincyList.splice(indexEmer,1)
    saveToLocalStorage('emergincy',emergincyList)
    displayEmergincy()
    }
    
    
    }else{
    if(contact.isEmergincy){
       emergincyList.push(contact)
        saveToLocalStorage('emergincy',emergincyList)
        displayEmergincy()
        }
    
    }
    saveContactBtn.classList.toggle('d-none')
    updateContactBtn.classList.toggle('d-none')
clearForm()
closeModal()
}

}

function displayContacts(){
if(contactsList.length === 0){
rowData.innerHTML =`<div
class="d-flex flex-column align-items-center justify-content-center text-center mt-5">
<div class="mb-3 text-muted"
    style="font-size: 3rem;">
    <i class="fa-solid fa-address-book"></i>
</div>
<h5 class="text-secondary fw-semibold mb-1">No
    contacts found</h5>
<p class="text-muted small">Click "Add Contact" to
    get started</p>

</div>`
return;

}
let cartona =''
for(let index = 0; index < contactsList.length ; index++){
const contact = contactsList[index]
cartona+=` <div class="col-md-6">
<div class="contact-card mt-5">
    <div class="contact-header d-flex">
        <div class="contact-avatar">
            <span>${contact.img.includes('/') ? `<img src=${contact.img}class='w-100 object-fit-cover'>`:contact.img}</span>
            <div class="emergency-badge">
                <i class="fas fa-heartbeat "></i>
            </div>
        </div>

        <div class="contact-info">
            <h3>${contact.fullName}</h3>

            <div class="phone-info">
                <div class="phone-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <span>${contact.phoneNumber}</span>
            </div>
        </div>
    </div>

    
    <div class="contact-details">

        <div class="detail-item">
            <div class="detail-icon email">
                <i class="fas fa-envelope"></i>
            </div>
            <span>${contact.emailAddress}</span>
        </div>

        <div class="detail-item">
            <div class="detail-icon location">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <span>${contact.address}</span>
        </div>

        <div class="emergency-text">
            <i class="far fa-heart"></i>
            Emergency
        </div>

    </div>

    
    <div class="contact-actions">
        <i class="fas fa-phone"></i>
        <i class="fas fa-envelope"></i>

        <div class="right-actions">
       ${contact.isFavorite?` <button class="contact-action star active   border-0" title="Star" onclick="removeFromFav('${contact.phoneNumber}',this)" >
       <i class="far fa-star"></i>
   </button>`:` <button class="contact-action star border-0" title="Star"onclick="addToFav('${contact.phoneNumber}',this)" >
   <i class="far fa-star"></i>
</button>`}
      ${contact.isEmergincy?` <button class="contact-action emergancy active border-0" title="Emergency" onclick="removeFromEmergincy(${contact.phoneNumber},this)">
      <i class="far fa-heart heart"></i>
     </button>`: `<button class="contact-action emergancy  border-0" title="Emergency" onclick="addToEmergincy('${contact.phoneNumber}',this)">
     <i class="far fa-heart heart"></i>
    </button>`}
    <button
    class="contact-action border-0"
    title="Edit"
    data-bs-toggle="modal"
    data-bs-target="#addContactModal"
    onclick="getDataForForm('${contact.phoneNumber}')">
    <i class="fas fa-edit"></i>
    </button>
       
       <button class="contact-action delet border-0 " title="Delet" onclick="removeContact(${contact.phoneNumber})">
        <i class="fas fa-trash"></i>
       </button>
    </div>
    </div>

</div>
</div>`


}
rowData.innerHTML = cartona
totalContacts.innerHTML =`${contactsList.length}`


}
 function dispalyFavorites(){
let cartona=''
for (let index = 0; index < favouritesList.length; index++) {
    const fav = favouritesList[index];
   cartona +=` <div class="sidebar-contact-card">
   <div class="sidebar-contact-avater" style="background-color: #3b82f6;">
   ${fav.img.includes('/') ? `<img src=${fav.img}class='w-100 object-fit-cover'>`:fav.img}
 </div>
 <div class="sidebar-contact-info">
       <h5>${fav.fullName}</h5>
  <p>${fav.phoneNumber}</p>
     </div>
    <button class="sidebar-call-btn favorites-call">
     <i class="fas fa-phone"></i>
    </button>

</div>` 
}
favoritesCount.innerHTML =`${favouritesList.length}`


favouritesListContainer.innerHTML = cartona
}
function displayEmergincy(){
    let cartona=''
for (let index = 0; index < emergincyList.length; index++) {
    const emergincy = emergincyList[index];
   cartona +=` <div class="sidebar-contact-card">
   <div class="sidebar-contact-avater" style="background-color: #3b82f6;">
   ${emergincy.img.includes('/') ? `<img src=${emergincy.img}class='w-100 object-fit-cover'>`:emergincy.img}
 </div>
 <div class="sidebar-contact-info">
       <h5>${emergincy.fullName}</h5>
  <p>${emergincy.phoneNumber}</p>
     </div>
    <button class="sidebar-call-btn favorites-call">
     <i class="fas fa-phone"></i>
    </button>

</div>` 
}
emergencyCount.innerHTML =`${emergincyList.length}`
emergincyListContainer.innerHTML = cartona
}

function saveToLocalStorage(name , list){
localStorage.setItem(name , JSON.stringify(list))
}

function validateInputs(input){
const regex = {
    fullName :/^[A-Z][a-z]+(?:[A-Z][a-z]+)+$/,
phoneNumber:/^01[0125][0-9]{8}/,
emailAddress:/^[^@\s]+@[^@\s]+\.[^@\s]+$/,

}
const message = {
    fullName :'name must be start by capital letter and greater than 3char',
    phoneNumber:'phone must be egyption number',
    emailAddress:'Examle :rania@gmail.com',
    
    }



if(input.value === ''){
 
    Swal.fire({
        title: `Missing ${input.id}`,
        text: `Please enter a ${input.id} for the contact!`,
        icon: "error"
      });
return false;
}
if(!regex[input.id].test(input.value)){
    Swal.fire({
        title: `InValid ${input.id}`,
        text: `${message[input.id]}`,
        icon: "error"
      });
return false;
}
return true;
}
function isDuplicate(phone){
const isDuplicate = contactsList.find((con)=> con.phoneNumber === phone)
if(Boolean(isDuplicate)){
    Swal.fire({
        title: `Duplicate phone Number`,
        text: `Enter new phone Number`,
        icon: "error"
      });
}

return Boolean(isDuplicate)

}

function clearForm(){
fullName.value = ''
phoneNumber.value = ''
emailAddress.value = ''
group.value = ''
notes.value = ''
address.value =''
isEmergincy.checked = false
isFavorite.checked = false
}
function closeModal(){
const addContactModal =document.getElementById('addContactModal')
 const modelInstance =  bootstrap.Modal.getInstance(addContactModal)
 modelInstance.hide()

}



