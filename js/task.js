var listOfItems = []; //Store all items' id in an array

function addNewItem(list, itemText){
    var date = new Date();
    var id = ""+date.getFullYear() +date.getDate()+date.getHours()+date.getMinutes()+date.getMilliseconds();
    var listItem = document.createElement("li");
    listItem.id = "li" + id;
    listOfItems.push(listItem.id);
    listItem.ondblclick = renameItem;
    
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "cb" + id;
    checkBox.onclick = updateItem;
    
    var label = document.createElement("span");
    label.id = "lb" + id;
    label.innerText = itemText;
    
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    list.appendChild(listItem);
}

function updateItem(){
    var itemId = this.id.replace("cb","");
    var labelId = document.getElementById("lb" + itemId);
    
    if(this.checked){
        labelId.className="checked";
    }else{
        labelId.className="";
    }
}

function renameItem(){
    var renameItemId = "lb" + this.id.replace("li","");
    var newText = prompt("Enter a new task","");
    if(!newText || newText=="" || newText==" "){
        return false;
    }
    var renameItem = document.getElementById(renameItemId);
    renameItem.innerText = newText;
}

var btnRemoveSelect = document.getElementById("btnRemoveSelect");
btnRemoveSelect.onclick = function(){
    removeSelectedItem();
}

function removeSelectedItem(){
    var confirmation = confirm("Confirm to delete selected?");
    var totalItem = listOfItems.length;
    var countDelete = 0;
    if(confirmation){
        for(var i = 0 ; i <totalItem; i++){
            var id = listOfItems[i].replace("li","cb");
            var removeItem = document.getElementById(id);
            if(removeItem.checked){
                var remove = document.getElementById(listOfItems[i]);
                var containerItem = remove.parentNode;
                containerItem.removeChild(remove);
                listOfItems.splice(i,1);
                countDelete++;
            }
        }
        console.log("Items deleted: " + countDelete);
        console.log("Left: " + listOfItems.length);
    }else{
        return false;
    }
}

var btnDeleteAll = document.getElementById("btnDeleteAll");
btnDeleteAll.onclick = function(){
    deleteAll();
}

function deleteAll(){
    var confirmation = confirm("Confirm to delete all?");
    if(confirmation){
        console.log("Items deleted: " + listOfItems.length);
        for(var i = 0 ; i <listOfItems.length; i++){
            var removeItem = document.getElementById(listOfItems[i]);
            var containerItem = removeItem.parentNode;
            containerItem.removeChild(removeItem);
        }
        listOfItems = [];
    }else{
        return false;
    }
}

var btnNew = document.getElementById("btnAdd");
var itemText = document.getElementById("itemText");
//itemText.focus();

btnNew.onclick = function(){
    var text = itemText.value;
    if(text=="" || text==" "){
        return false;
    }
    addNewItem(document.getElementById("taskList"), text);
    document.getElementById('itemText').value='';
    //itemText.focus();
}