// ? get todos from Localstorage
let todos = localStorage.getItem("todos");

// ? try parse data or null
try {
  todos = JSON.parse(todos);
  todos = todos.length ? todos : null;
} catch (e) {
  todos = null;
}

// ? set default value if todos == null
if (!todos) {
  todos = [
    { content: "reading book", status: true },
    { content: "Watch videos", status: true },
    { content: "Practicing programming", status: true },
  ];
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ? func to create or update todos list in ui
function createTodos(todos) {
  let todosList = document.querySelector("#todos-list");
  todosList.innerHTML = "";

  // ? create list tag for each todo
  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.className = "list-group-item";
    let content = document.createElement("span");
    content.style.textDecoration = todo.status ? "initial" : "line-through";
    content.textContent = todo.content;
    let deleteBtn = document.createElement("img");
    deleteBtn.src = "media/delete.png";
    deleteBtn.alt = "delete icon";
    deleteBtn.className = "float-end";

    // ? append content deleteBTn to li
    li.append(content);
    li.append(deleteBtn);

    // ? append li to todosList
    todosList.append(li);
    // ? add deleteBtn functionality
    deleteBtn.addEventListener("click", (e) => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      createTodos(todos);
    });

    // ? add complete functionality
    content.addEventListener("click", (e) => {
      todos[index].status = !todos[index].status;
      localStorage.setItem("todos", JSON.stringify(todos));
      createTodos(todos);
    });
  });
}
createTodos(todos);

// ? action add & search
let actions = document.querySelector("#actions");
let formWrapper = document.querySelector("#form-warapper");
Array.from(actions.children).forEach((action) => {
  // ? add todo
  if (action.dataset.action == "add") {
    action.addEventListener("click", (e) => {
      formWrapper.innerHTML = `<form id="add">
        <input class="form-control" name="add" placeholder="Add todo ..">
      </form>`;
      createTodos(todos);
      let add = document.querySelector("#add")
      add.addEventListener("submit" , e =>{
        e.preventDefault()
        if(add.add.value){
          todos.push({content: add.add.value, status: true})
          localStorage.setItem("todos", JSON.stringify(todos));
          createTodos(todos);
        }
      })
    });
    // ? search todo
  } else if (action.dataset.action == "search") {
    action.addEventListener("click", (e) => {
      formWrapper.innerHTML = `<form id="search">
        <input class="form-control" name="search" placeholder="search todo ..">
      </form> `;
      let search = document.querySelector("#search")
      search.addEventListener("keyup" , e =>{
        e.preventDefault()
        if(search.search.value){
         let filterd_todos = todos.filter(todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase()))
         createTodos(filterd_todos);
        }else{
         createTodos(todos);

        }
      })
    });
  }
});
