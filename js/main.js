const debug = false;
class ToDoList {
    constructor(list, id) {
            this._globalId = id;
            this._myList = list;
        }
        //----------
    addNewItem(t) {
            this._globalId++;
            let it = {
                id: this._globalId,
                text: t,
                done: false,
                modifying: false,
            }
            this._myList.push(it);
            localStorage.setItem('toDoList', JSON.stringify(this._myList));
            localStorage.setItem('gId', this._globalId);
            if (debug) console.log(this._myList);
            //return it;
        }
        //----------
    deleteItem(id) {
        this._myList = this._myList.filter((v) => v.id != id);
        localStorage.setItem('toDoList', JSON.stringify(this._myList));
        if (debug) console.log(this._myList);
    }
    modifyItem(id, text) {
        let index = this._myList.findIndex((e) => e.id === id);
        this._myList[index].text = text;
        localStorage.setItem('toDoList', JSON.stringify(this._myList));
    }
    toggleDone(id) {
        let index = this._myList.findIndex((e) => e.id === id);
        this._myList[index].done = !this._myList[index].done;
        localStorage.setItem('toDoList', JSON.stringify(this._myList));
        if (debug) console.log(this._myList);
    }
    toggleModify(id) {
            let index = this._myList.findIndex((e) => e.id === id);
            this._myList[index].modifying = !this._myList[index].modifying;
            localStorage.setItem('toDoList', JSON.stringify(this._myList));
        }
        //----------
        //--kill all the listitems in the HMTL and repopulate with current content of myList
    redraw() {
            const listContainer = document.getElementById("myList")
            let i;
            //delete all
            listContainer.innerHTML = ""
                //repopulate
            for (i = 0; i < this._myList.length; i++) {
                const item = this._myList[i]
                if (debug) console.log(item)
                const nl = "\n";
                //create new list Item Element
                const ni = document.createElement('li');
                // construct it's content
                let liTemplate = `<li class=\"listItem\" id=\"${item.id}>` + nl;
                if (!item.modifying) {
                    liTemplate += `<span class=\"itemText\" style=${item.done?"text-decoration:line-through;":" "}>${item.text}</span>` + nl;
                } else {
                    liTemplate += `<span class=\"itemText\"} >` + nl;
                    liTemplate += `<input type=\"text\" name=\"${item.id}\" style=${item.done?"text-decoration:line-through;":"color:black"} value=\"${item.text}\">` + nl;
                    liTemplate += "</span>" + nl;
                }
                liTemplate += "<span class=\"modify\">" + nl;
                liTemplate += `<input value=\"edit\" type=\"button\">` + nl
                liTemplate += "</span>" + nl;
                liTemplate += "<span class=\"crossOut\">" + nl;
                liTemplate += `<input value=\"-\" type=\"button\">` + nl
                liTemplate += "</span>" + nl;
                liTemplate += "<span class=\"delete\">" + nl;
                liTemplate += `<input value=\"X\" type=\"button\">` + nl
                liTemplate += "</span>" + nl;
                liTemplate += "</li>" + nl;
                liTemplate += "<hr>" + nl;
                // fill new items inner HTML with the complete content
                ni.innerHTML = liTemplate;
                const newmodifyBut = ni.querySelector(".modify [type = button]");
                newmodifyBut.addEventListener('click', (e) => {
                    if (item.modifying) {
                        console.log("why am i not doing this?");
                        // couldn't find the content of the edit form :(((((
                        this.modifyItem(item.id, "new text");
                    }
                    this.toggleModify(item.id);
                    this.redraw();
                })
                const newdelBut = ni.querySelector(".delete [type = button]");
                newdelBut.addEventListener('click', () => {
                    this.deleteItem(item.id);
                    this.redraw();
                })
                const newcrosBut = ni.querySelector(".crossOut [type = button]");
                newcrosBut.addEventListener('click', () => {
                    this.toggleDone(item.id);
                    this.redraw();
                });
                // append now complete element to the HMTL List
                listContainer.appendChild(ni);
            } // for loop
        } // redraw()
} // class ToDoList

function onsubmit() {
    console.log("does it work now?")
}

//on page load: setup and run 
const savedList = JSON.parse(localStorage.getItem('toDoList')) || [];
const savedId = localStorage.getItem('gId') || 0;

if (debug) console.log("stuff i loaded:" + savedId + " and " + savedList);

//Make instance from Class, maybe with initial values from local storage 
let myToDoList = new ToDoList(savedList, savedId);

if (savedList.length == 0) {
    //if list is emtpy, pre-populate for demo
    //dirty hack: reset globalID when loaded list was empty  
    myToDoList._globalId = 0;
    myToDoList.addNewItem("walk dog");
    myToDoList.addNewItem("sweep floor");
    myToDoList.addNewItem("build raft for kids");
    myToDoList.addNewItem("ski mountain");
    myToDoList.addNewItem("codewars to kyu 5 ");
}

myToDoList.redraw()

const submitButton = document.querySelector(".newItem [type = submit]");
const newItemBox = document.getElementById("newItemBox");

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    myToDoList.addNewItem(newItemBox.value);
    newItemBox.value = "";
    myToDoList.redraw();
});