var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
    listElement.innerHTML = '';
    for (const todo of todos) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.setAttribute('href', '#');
        li.textContent = todo + ' ';
        a.textContent = 'Excluir';

        var pos = todos.indexOf(todo);
        a.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        li.appendChild(a);
        listElement.prepend(li);
    }

}
renderTodos();

function handleEnter() {
    document.addEventListener('keypress', (event) => {
        const keyName = event.key;

        if (keyName === "Enter") {
            var value = inputElement.value.trim();
            if (value != '') {
                todos.push(value);
                inputElement.value = '';
                renderTodos();
                saveStorage();
                return;
            } else {
                // alert('Você está tentando adicionar um To-Do vaziu!');
                return;
            }
        } else {
            return;
        }
    });
}

inputElement.focus = handleEnter();

function addTodo() {
    var value = inputElement.value.trim();

    if (value == '') {
        // alert('Você está tentando adicionar um To-Do vaziu!');
        return;
    } else {
        todos.push(value);
        inputElement.value = '';
        renderTodos();
        saveStorage();
    }
}

buttonElement.onclick = addTodo;

function deleteTodo(pos) {
    todos.splice(pos, 1);
    renderTodos();
    saveStorage();
}

function saveStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}