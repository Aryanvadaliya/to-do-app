
const taskList = document.querySelector('.taskList')
const input = document.querySelector('.input')
let tasks = JSON.parse(localStorage.getItem("oldTasks")) || []
if (tasks.length > 0) renderTasks()

function addTask(){
    const taskDetail = { text: input.value, completed: false }
    tasks.push(taskDetail)
    renderTasks()
    input.value = ''
}

function renderTasks(){
    taskList.innerHTML = ''
    tasks.forEach((task, index) => {
        const newLi = document.createElement('li')
        newLi.innerHTML = `<input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
                           <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                           <button class="editBtn" onclick="editTask(${index})">Edit</button>
                           <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>`
        taskList.appendChild(newLi)
    })
    localStorage.setItem("oldTasks", JSON.stringify(tasks))
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed
    renderTasks()
}

function editTask(index){
    const currLi = document.querySelectorAll("li")[index]
    const currTaskEle = currLi.querySelector('.task-text')

    const currTask = currTaskEle.innerText
    currTaskEle.innerHTML = `<input type="text" value='${currTask}'>`

    const input = currTaskEle.querySelector('input')
    input.focus()

    input.addEventListener('blur', () => {
        const newTask = input.value
        tasks[index].text = newTask
        renderTasks()
    })
}

function deleteTask(index){
    tasks.splice(index, 1)
    renderTasks()
}
