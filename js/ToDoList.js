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
            if (debug) console.log("pushing: " + it);
            this._myList.push(it);
            return it;
        }
        //----------
    deleteItem(id) {
            this._myList = this._myList.filter((v) => v.id != id);
            if (debug) console.log(myGlobalToDoList);
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
            liTemplate += "<label name=\"deleteButton\">delete</label>" + nl
            liTemplate += "<input type=\"button\" name=\"deleteButton\">" + nl
            liTemplate += "</span>" + nl;
            liTemplate += "</li>" + nl;
            liTemplate += "<hr>" + nl;
            ni.innerHTML = liTemplate;
            ni.setAttribute("id", `id${item.id}`);
            ni.setAttribute("itemText", text);

            listContainer.appendChild(ni);

            /*        ni.setAttribute("itemText", text);
                    const delBut = document.querySelector(".delete [type = button]");
                    console.log(delBut);
                    delBut.addEventListener('click', deleteItem(globalId));
                    const list = document.querySelector(".list");
                    list.appendChild(ni);
                
                    console.log(newItem);
                    */
        } // for loop
    }
}

export default ToDoList;