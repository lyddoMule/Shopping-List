const itemForm= document.getElementById('item-form')
const itemInput= document.getElementById('item-input')
const itemList= document.getElementById('item-list')
const clear= document.getElementById('clear')

function addItem(e) {
    e.preventDefault();
    const newItem= itemInput.value;
    if(newItem===''){
        alert("Please enter an item");
        return; 
    }

    const li = document.createElement('li');
    li.className='flex border w-96 py-2  font-bold justify-between'
    li.appendChild(document.createTextNode(newItem));
    console.log(li.className);
    const btn= createBtn('text-red-500 font-bold px-2')
    li.appendChild(btn);
    itemList.appendChild(li)

    itemInput.value='';

}
function createBtn(classes) {
    const btn= document.createElement('button')
    btn.className=classes;
    btn.innerHTML="X"
    return btn;
}

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
           e.target.parentElement.remove();
    } 
}
function clearItems() {
    // while (itemList.firstChild) {
    //     itemList.removeChild(itemList.firstChild)
    // }
    itemList.innerHTML=''
}

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem)
clear.addEventListener('click', clearItems)



