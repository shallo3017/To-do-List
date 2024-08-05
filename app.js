let userInput = document.querySelector(".container .add-task-box input");
let addBtn = document.querySelector(".container .add-task-box .add-btn");
let allTasksBox = document.querySelector(".container .all-tasks");
let no_of_tasks_txt = document.querySelector(".container .others .no-of-tasks");
let todos = JSON.parse(localStorage.getItem("all-todos") || "[]");
let clearAllBtn = document.querySelector(".container .others .clear-all-btn");
let othersBox = document.querySelector(".container .others");

addBtn.addEventListener("click",() => {
    if(userInput.value != ""){
        createTodo(userInput.value);
    }
});

let createTodo =(userTask) =>{
    let taskInfo = { task: userTask, status: "pending"};
    todos.push(taskInfo); //Pushing new task to todos
    localStorage.setItem("all-todos" , JSON.stringify(todos)); //converting todos into JSON objects and then storing it under the key all-todos
    userInput.value = "";
    showTasks();
    count_no_of_tasks();
 }

 let showTasks = () => {
    let li = "";
    todos.forEach((todo, id) => {
        let isCompleted = todo.status == "completed" ? "checked" : "";
        li += `
            <div class="task">
                <input type="checkbox" name="" id="${id}" onclick="taskComplete(this)" ${isCompleted}>
                <span class="userTask ${isCompleted ? 'checked' : ''}">${todo.task}</span>
                <div class="btns">
                    <button class="dlt-btn" onclick="deleteTasks(${id})">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    });
    allTasksBox.innerHTML = li || '<p class = "clipboard-icon"><i class="fa-solid fa-clipboard"></i></p> <p class = "no-task-message">No Tasks yet</p>';
    count_no_of_tasks();
    if(todos.length == 0){
        othersBox.style.display = "none";
    }else{
        othersBox.style.display = "block";
    }
}


let taskComplete =(elem)=>{
    if(elem.checked){
       elem.nextElementSibling.classList.add("checked");
       todos[elem.id].status = "completed";
    }else{
        elem.nextElementSibling.classList.remove("checked");
        todos[elem.id].status = "pending";
    }
    localStorage.setItem("all-todos" , JSON.stringify(todos));
}
 
let deleteTasks =(deleteId)=>{
    todos.splice(deleteId,1);
    localStorage.setItem("all-todos" , JSON.stringify(todos));
    showTasks();
}
let count_no_of_tasks = () => {
    let numberOFTasks = todos.length;
    no_of_tasks_txt.innerHTML = `You have <strong>${numberOFTasks}</strong> task${numberOFTasks !== 1 ? 's' : ''}`;
}

clearAllBtn.addEventListener("click",()=>{
    todos = [];
    localStorage.setItem("all-todos" , JSON.stringify(todos));
    showTasks();
})

showTasks();
