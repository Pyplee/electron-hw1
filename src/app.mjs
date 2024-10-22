const usersTable = document.querySelector('.table');

const createRow = (user) => {
  const tr = document.createElement('tr');
  const [, firstName, lastName, email] = user;
  [, firstName, lastName, email].forEach((data) => {
    const td = document.createElement('td');
    td.textContent = data;
    tr.appendChild(td);
  });
  usersTable.appendChild(tr);
  return tr;
}

const renderTable = async (table) => {
  const fragment = document.createDocumentFragment();
  const users = await window.myAPI.parseCSV();
  users.forEach((user) => {
    fragment.appendChild(createRow(user));
  });
  table.appendChild(fragment);
}

renderTable(usersTable);

const createUserButton = document.querySelector('.createUser')
createUserButton.addEventListener('click', async () => {
  await window.myAPI.openNewTable();
})