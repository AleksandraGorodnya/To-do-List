const tasks = [
  {
    _id: '5fr50ojgvirjvro',
    completed: true,
    body:
      'Nunc sed velit dignissim sodales ut. Justo donec enim diam vulputate ut pharetra. Convallis posuere morbi leo urna molestie at elementum. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Enim sit amet venenatis urna cursus eget nunc scelerisque. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Mauris a diam maecenas sed enim ut sem viverra.\r\n',
      title: 'Ut morbi tincidunt augue interdum.',
  },
  {
    _id: '3r50609okgforkgmor',
    completed: false,
    body: 
      'Metus dictum at tempor commodo. Ultrices in iaculis nunc sed. Natoque penatibus et magnis dis parturient montes nascetur. Et netus et malesuada fames ac turpis egestas integer. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Ultricies tristique nulla aliquet enim tortor at.\r\n',
      title: 'Libero justo laoreet sit amet cursus.',
  },
  {
    _id: '38gtrlg0906jgfi',
    completed: true,
    body: 
      'Nunc sed velit dignissim sodales ut. Justo donec enim diam vulputate ut pharetra. Convallis posuere morbi leo urna molestie at elementum. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Enim sit amet venenatis urna cursus eget nunc scelerisque. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper.\r\n',
      title: ' Leo in vitae turpis massa sed elementum tempus.',
  },
  {
    _id: '2pkrmf5t09095',
    completed: false,
    body: 
      'Velit laoreet id donec ultrices tincidunt arcu. Volutpat est velit egestas dui id ornare arcu. Arcu odio ut sem nulla pharetra. Sit amet porttitor eget dolor. Luctus venenatis lectus magna fringilla urna porttitor rhoncus.\r\n',
      title: 'Dolor magna eget est lorem ipsum dolor sit.',
  },
];

(function(arrOfTasks) {
   const objOfTasks = arrOfTasks.reduce((acc, task) => {
     acc[task._id] = task;
     return acc;
   }, {});

   //Elements UI
   const listContainer = document.querySelector(
     '.tasks-list-section .list-group', 
     );
     const form = document.forms['addTask'];
     const inputTitle = form.elements['title'];
     const inputBody = form.elements['body'];
     
   //Events
   renderAllTasks(objOfTasks);
   form.addEventListener('submit', onFormSubmitHandler);
   listContainer.addEventListener('click', onDeletehandler);


   function renderAllTasks(tasksList) {
      if (!tasksList) {
        console.error("Передайте список!");
        return ;
   }

   const fragment = document.createDocumentFragment();
   Object.values(tasksList).forEach(task => {
     const li = listItemTemplate(task);
     fragment.appendChild(li);
   });
   listContainer.appendChild(fragment);
  }

  function listItemTemplate({_id, title, body} = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
      );
      li.setAttribute('data-task-id', _id);
    
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = "bold";

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(deleteBtn); 
    li.appendChild(article);
    
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    
    if (!titleValue || !bodyValue) {
      alert("Пожалуйста введите title и body");
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Точно вы хотите удалить эту задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeletehandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
    }
  }
})(tasks);
