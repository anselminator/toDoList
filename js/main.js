//import ToDoList from "./ToDoList.js"
const debug = true;
class ToDoList {

    constructor() {
            this._globalId = 0;
            this._myList = [];
        }
        //----------
    addNewItem(t) {
            this._globalId++;
            let it = {
                id: this._globalId,
                text: t,
                done: false,
            }
            this._myList.push(it);
            if (debug) console.log(this._myList);
            return it;
        }
        //----------
    deleteItem(id) {
            console.log("I am deleting, why am i doing that?")
            this._myList = this._myList.filter((v) => v.id != id);
            if (debug) console.log(this._myList);
        }
        //----------
        //--kill all the listitems on the HMTL an repopulate with current content of myList
    redraw() {
            const listContainer = document.getElementById("myList")
            let i;
            //delete all
            listContainer.innerHTML = ""
                //repopulate
            for (i = 0; i < this._myList.length; i++) {
                const item = this._myList[i]
                if (debug) console.log(item)
                let id = item.id
                let text = item.text
                let done = item.done
                const nl = "\n";
                const ni = document.createElement('li');
                let liTemplate = `<li class=\"listItem\" id=\"${item.id}>` + nl;
                liTemplate += `<span class=\"itemText\" >${item.text}</span>` + nl;
                liTemplate += "<span class=\"delete\">" + nl;
                liTemplate += `<input value=\"X\" type=\"button\" name=\"${item.id}\">` + nl
                liTemplate += "</span>" + nl;
                liTemplate += "</li>" + nl;
                liTemplate += "<hr>" + nl;
                ni.innerHTML = liTemplate;
                const newdelBut = ni.querySelector(".delete [type = button]");
                newdelBut.addEventListener('click', deleteListener)
                listContainer.appendChild(ni);
            } // for loop
        } // redraw
}





//const debug = true;

let myToDoList = new ToDoList();



myToDoList.addNewItem("walk dog");
myToDoList.addNewItem("do dishes");
myToDoList.addNewItem("vacuum");
myToDoList.addNewItem("do groceries");

myToDoList.redraw()



//-------------Anselm
const myListElement = document.querySelector(".list");
const submitButton = document.querySelector(".newItem [type = submit]");
const newItemBox = document.getElementById("newItemBox");


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    myToDoList.addNewItem(newItemBox.value);
    myToDoList.redraw();
});


function deleteListener(e) {
    e.preventDefault();
    const targetId = parseInt(e.target.name);
    //console.log("e.target.name?" + e.target.name + " aka" + targetId + "and" + id);
    myToDoList.deleteItem(targetId);
    myToDoList.redraw();
}


//-------------Daiden

//-------------Robert