const itemForm= document.getElementById('item-form')
const itemInput= document.getElementById('item-input')
const itemList= document.getElementById('item-list')
const clear= document.getElementById('clear')
const filter= document.getElementById('filter')
const formBtn= itemForm.querySelector('button')


let isEditMode= false;
function addItem(e) {
    e.preventDefault();
    const newItem= itemInput.value;
    if(newItem===''){
        alert("Please enter an item");
        return; 
    }

    if (isEditMode){
        const itemToEdit= itemList.querySelector(".edit-mode") 
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove();
        isEditMode=false;
    }

    addItemToDOM(newItem);

    addItemsToLocalStorage(newItem)

    checkUI();
    itemInput.value='';
}


function addItemToDOM(item) {
    const li = document.createElement('li'); 
    li.className='flex  border w-96 py-2 text- font-bold justify-between'
    li.appendChild(document.createTextNode(item));
    // console.log(li.className);
    const btn = createBtn('text-red-500 remove-item font-bold px-2')
    li.appendChild(btn);
    itemList.appendChild(li)

    // return li;
}

function addItemsToLocalStorage(item){
    const itemsFromLocalStorage= getItemsFromStorage();

    itemsFromLocalStorage.push(item)

    localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage))

}

function getItemsFromStorage() {
    let itemsFromLocalStorage;
    if(localStorage.getItem('items')===null){
          itemsFromLocalStorage=[]
    } else{
        itemsFromLocalStorage= JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromLocalStorage;

}
function createBtn(classes) {
    const btn= document.createElement('button')
    btn.className=classes;
    const icon = createIcon('fa-solid fa-xmark')
    btn.appendChild(icon)
    return btn;
}

function createIcon(classes) {
    const icon= document.createElement('i')
    icon.className=classes;

    return icon;
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
               
            removeItem(e.target.parentElement.parentElement)    
    }
    else{
        setItemToEdit(e.target)
        
        // console.log(e.target);
    }
}
function setItemToEdit(item) {
    isEditMode=true;

    itemList.querySelectorAll('li').forEach((i)=>{
            i.classList.remove('edit-mode')
    })
    formBtn.innerHTML= '<i class="fa-solid fa-pen"></i> Update Item' 
    formBtn.style.backgroundColor='#228b22'
    formBtn.style.color='#fff'
    itemInput.value= item.textContent;
    //  item.style.color='#ccc'
    item.classList.add('edit-mode')
    

}

function removeItem(item) {
        // console.log(item);
        if(confirm('Are you sure?')) {
            item.remove();

        removeItemFromStorage(item.textContent)
        //    console.log(item.textContent)
           checkUI()


   }
}

function removeItemFromStorage(item) {
    let itemsFromLocalStorage= getItemsFromStorage();

    itemsFromLocalStorage = itemsFromLocalStorage.filter((i)=>i !== item)

    console.log(itemsFromLocalStorage);
    localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage))

}
function clearItems() {
    // while (itemList.firstChild) {
    //     itemList.removeChild(itemList.firstChild)
    // }
    itemList.innerHTML=''

    localStorage.removeItem('items')
    checkUI()
    
}

function checkUI() {
    itemInput.value=''
    const items= itemList.querySelectorAll('li')

    if(items.length===0){
        filter.style.display='none'
        clear.style.display='none'
    } else{
        filter.style.display='block'
        clear.style.display='block'
    }

    formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item' 
    formBtn.style.background='#fff'
    formBtn.style.color='#4B5563'

    
}
function filterItems(e) {
    const items = itemList.querySelectorAll('li')
    const text= e.target.value.toLowerCase();

 items.forEach(item=>{
    const itemList = item.firstChild.textContent.toLowerCase()
    if (itemList.indexOf(text)!=-1){
        item.style.display='flex'
    }
    else{
        item.style.display="none"
    }

 })
}

function displayAddItems() {
    const itemsFromLocalStorage= getItemsFromStorage();
    itemsFromLocalStorage.forEach(item=>{
        addItemToDOM(item)
    })
    checkUI()
}

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', onClickItem)
clear.addEventListener('click', clearItems)
filter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayAddItems)


checkUI();




