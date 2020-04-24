window.onload = function init() {
    var add = document.getElementById("add");

    add.onclick = addTodoList;

    function addTodoList() {
        var inputTag = document.getElementById("todo-content");
        var inputValue = inputTag.value;
        if("" == inputValue) {
            alert("값이 비었습니다!")
            return ;
        }
        
        inputTag.value="";
        var todoBody = document.getElementsByClassName("todo-body");

        var todoElement = document.createElement("div");
        todoElement.className="todo-element";

        var checkbox = document.createElement("input");
        checkbox.type="checkbox";

        var div = document.createElement("div");
        div.innerHTML=inputValue;
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML="삭제";
        deleteButton.className="delete";
        todoElement.appendChild(checkbox);
        todoElement.appendChild(div);
        todoElement.appendChild(deleteButton);

        todoBody[0].appendChild(todoElement);
        
        deleteButton.onclick = function() {
            todoBody[0].removeChild(todoElement);
        }
    }

    function deleteTodoList() {
        
    }
}