const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#input-field");
const taskInput2 = document.querySelector("#input-field2");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");


loadEventListeners();

function loadEventListeners()
{
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
}


function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const removeLink = document.createElement('a');
        removeLink.className = 'delete-item secondary-content';
        removeLink.innerHTML = 'X';
        li.appendChild(removeLink);

        taskList.appendChild(li);
    });
}

function addTask(event)
{
    if(taskInput.value === "" || taskInput2.value === "")
    {
        alert("Add a task!");
    }
    const li = document.createElement("li");
    console.log(li);
    li.className = "collection-item";
    li.appendChild(document.createTextNode("Book\'s name: " + taskInput.value + ";      " + "Author\'s name: " + taskInput2.value));
    const removeLink = document.createElement("a");
    removeLink.className = "delete-item secondary-content";
    removeLink.innerHTML = "X";
    li.appendChild(removeLink);
    taskList.appendChild(li);
    
    storeInLocalStorage(taskInput.value, taskInput2.value);

    taskInput.value = "";
    taskInput2.value = "";
    
    event.preventDefault();
}

function storeInLocalStorage(book, author)
{
    let tasks;
    if(localStorage.getItem("tasks") === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    let bookNauthor = "Book\'s name: " + book + ";      " + "Author\'s name: " + author;
    tasks.push(bookNauthor);
    localStorage.setItem("tasks", JSON.stringify(tasks));
	
	return tasks;
}

function removeTask(event)
{
    if(event.target.classList.contains("delete-item"))
    {
        if(confirm("Are you sure you want to delete te task?"))
        {
            event.target.parentElement.remove();
            removeFromLocalStorage(event.target.parentElement);
        }
        console.log("remove element clicked");   
    }
}



function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =  [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent.slice(0, -1) === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    // Removing elements with while loop and removeChild
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}




















