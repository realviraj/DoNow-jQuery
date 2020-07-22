
let todoItems = [];

function addTodo(text) {
  $("h1").animate({
    "font-size":"3rem"
  }, "slow");
  $('.container').animate({
    "borderWidth":"4px"
  }, "slow");
  
    // 1. create a todo
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    // 2. push a todo
    todoItems.push(todo);
    console.log(todoItems);
    // display the todo
    // const list = document.querySelector('.js-todo-list');
    // list.insertAdjacentHTML('beforeend', `
    $('.js-todo-list').append(`
    <li class="todo-item" data-key="${todo.id}">
        <input type="checkbox" id="${todo.id}"/>
            <label for="${todo.id}" class="tick js-tick"></label>
            <span> ${todo.text} </span>
            <button type="button" class="delete-todo js-delete-todo" aria-label="Close">
            <svg><use href="#delete-icon"></use></svg>
            </button>
    </li>`);
}

// const form = document.querySelector('.js-form');
// form.addEventListener('submit', event => {
$('.js-form').submit(function (event) {
  event.preventDefault();
  // const input = document.querySelector('.js-todo-input');
  // const text = input.value.trim();
  // if (text !== '') {
  //   addTodo(text);
  //   input.value = '';
  //   input.focus();
  // }
  const input = $.trim($('.js-todo-input').val());
  if (input !== '') {
    addTodo(input);
    $('.js-todo-input').val('');
    $('.js-todo-input').focus();
  }
});

function toggleDone(key) {
    // const item = document.querySelector(`[data-key='${key}']`);
    const item = $(`[data-key='${key}']`);
    // const index = todoItems.findIndex(item => item.id === Number(key));
    const index = todoItems.index(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    if (todoItems[index].checked) {
      // item.classList.add('done');
      $(item).addClass('done');
    } else {
      // item.classList.remove('done');
      $(item).removeClass('done');
    }
  }
  
  function deleteTodo(key) {
    todoItems = todoItems.filter(item => item.id !== Number(key));
    // const item = document.querySelector(`[data-key='${key}']`);
    const item = $(`[data-key='${key}']`);
    item.remove();
  }
  
    $('.js-todo-list').click(event => {
    const itemKey = event.target.parentElement.dataset.key;
    if (event.target.classList.contains('js-tick')){
      toggleDone(itemKey);
    }
    if (event.target.classList.contains('js-delete-todo')) {
      deleteTodo(itemKey);
    }
  
  });