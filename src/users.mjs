const form = document.querySelector('.add-user');

const createUser = async (e) => {
  e.preventDefault();
  const firstName = form.querySelector('input[name="firstName"]').value;
  const lastName = form.querySelector('input[name="lastName"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const newUser = `0, ${firstName}, ${lastName}, ${email}`;
  await window.myAPI.writeCSV(newUser);
  window.myAPI.reloadMainWindow();
  window.close();
}

form.addEventListener('submit', createUser);