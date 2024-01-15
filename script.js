const itemForm= document.getElementById('item-form')
const itemInput= document.getElementById('item-input')
const itemList= document.getElementById('item-list')


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
    // btn.appendChild(btn.innerHTML)
    return btn;
    // btn.addEventListener('click', deleteItem)
}

itemForm.addEventListener('submit', addItem);





