const itemForm= document.getElementById('item-form')
const itemInput= document.getElementById('item-input')
const itemList= document.getElementById('item-list')
const clear= document.getElementById('clear')
const filter= document.getElementById('filter')

function addItem(e) {
    e.preventDefault();
    const newItem= itemInput.value;
    if(newItem===''){
        alert("Please enter an item");
        return; 
    }

    addItemToDOM(newItem);

    addItemsToLocalStorage(newItem)

    checkUI();
    itemInput.value='';

}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.className='flex remove-item   border w-96 py-2  font-bold justify-between'
    li.appendChild(document.createTextNode(item));
    console.log(li.className);
    const btn= createBtn('text-red-500 font-bold px-2')
    li.appendChild(btn);
    itemList.appendChild(li)
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
    btn.innerHTML="X"
    return btn;
}

 

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
           if(confirm('Are you sure?')) {
            e.target.parentElement.remove()
        }
    } 
    checkUI()
}
function clearItems() {
    // while (itemList.firstChild) {
    //     itemList.removeChild(itemList.firstChild)
    // }
    itemList.innerHTML=''
    checkUI()

}

function checkUI() {
    const items= itemList.querySelectorAll('li')

    if(items.length===0){
        filter.style.display='none'
        clear.style.display='none'
    } else{
        filter.style.display='block'
        clear.style.display='block'
    }
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
itemList.addEventListener('click', removeItem)
clear.addEventListener('click', clearItems)
filter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayAddItems)


checkUI();




