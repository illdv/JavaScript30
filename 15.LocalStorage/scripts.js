const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem (e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item')).value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList (plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
      <label for="item${i}">${plate.text}</label>
    </li>
    `).join('');
}

function toggleDone (e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const { index } = el.dataset;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);

const checkedAll = document.querySelector('#checkedAll');
const deleteChecked = document.querySelector('#deleteChecked');

function checked () {
  if (checkedAll.checked) {
    items.forEach((item) => {
      if (!item.done) {
        item.done = true;
        populateList(items, itemsList);
        localStorage.setItem('items', JSON.stringify(items));
      }
    });
  }
  if (!checkedAll.checked) {
    items.forEach((item) => {
      if (item.done) {
        item.done = false;
        populateList(items, itemsList);
        localStorage.setItem('items', JSON.stringify(items));
      }
    });
  }
}

checkedAll.addEventListener('change', checked);

deleteChecked.addEventListener('click', (e) => {
  e.preventDefault();
  items = [];
  populateList(items, itemsList);
  localStorage.clear();
});
