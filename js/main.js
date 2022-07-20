// Anselm

// Robert
const input= document.getElementById ("input");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");
const mark = document.getElementById("markAllItems")
//console.log("button",button)

function addToDo() {
    let myValue= input.value
    let ul = document.getElementById("list-wrapper") 
    let li = document.createElement("li")
    const newListItem = `<li class="listItem" id="1">
    <!--  the li id is unique and is incremented each time a new item is added   -->
    <span class="itemText">${input.value}</span>
    <span class="delete">
      <form>
        <label name="deleteButton">delete</label>
        <input class="deleteCheckbox" type="checkbox" name="deleteButton">
      </form>
    </span>
    <span class="edit">
      <form>
        <label name="editButton">edit</label>
        <input type="checkbox" name="editButton">
      </form>
    </span>
    <span class="isDone">
      <form>
        <label name="doneButton">cross Off</label>
        <input type="checkbox" name="doneButton">
      </form>
    </span>
    <hr>

</li>`
    //li.appendChild(document.createTextNode(myValue))
    //li.setAttribute("id", values.length +1)
    ul.insertAdjacentHTML("afterbegin", newListItem)
    //ul.appendChild(li)
    console.log(li)
    addButton.style.color = "red";
}

function markAll() {
    const checkBoxes = document.getElementsByClassName("deleteCheckbox")
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].type == 'checkbox') checkBoxes[i].checked = true;
      }

    
}

function deleteAll() {
    document.getElementById("list-wrapper").innerHTML = "";
   // const markAll = document.querySelectorAll(".deleteCheckbox")
    //console.log("markAll")
    //markAll.forEach(checkbox => checkbox.checked = true)
    //deleteButton.addEventListener("click", deleteAll)
    //console.log("clicked")
    //document.querySelector("#list-wrapper").remove()
}




addButton.addEventListener("click", addToDo);
deleteButton.addEventListener("click", deleteAll)
mark.addEventListener("click", markAll )

//console.log(input.value)

// Daiden