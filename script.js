let globalId = 0;
let myGlobalToDoList = [];

function addNewItem(t) {
    globalId++;
    i = {
        id: globalId,
        text: t,
        done: false,
    }
    console.log("pushing: " + i);
    myGlobalToDoList.push(i);
}
console.log("before" + myGlobalToDoList);

addNewItem("walk dog");
addNewItem("do dishes");
addNewItem("vacuum");
addNewItem("do groceries");
console.log("after" + myGlobalToDoList);
myGlobalToDoList.forEach((e) => {
    console.log(`deed:  ${e.text}  id: ${e.id}  status(done): ${e.done}`);
})