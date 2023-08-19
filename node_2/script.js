const person = {
  name: 'максим лескин',
  dateBirth: '10.03.1987',
  purpose: 'карьерный рост'
}

const randomId = (length) => {
  let result = ''
  const elems = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    result += elems.charAt(Math.floor(Math.random() * elems.length));
  }

  return result;
};

const dataObj = (data) => {
  const personData = {};

  const entries = Object.entries(data);

  personData.id = randomId(10);
  personData.firstName = entries[0][1].split(' ')[0][0].toUpperCase() + entries[0][1].split(' ')[0].slice(1);
  personData.lastName = entries[0][1].split(' ')[1][0].toUpperCase() + entries[0][1].split(' ')[1].slice(1);
  personData.dateBirth = entries[1][1];
  personData.age = new Date().getFullYear() - new Date(entries[1][1].split('.').reverse().join('-')).getFullYear();
  personData.purpose = entries[2][1].charAt(0).toUpperCase() + entries[2][1].slice(1);

  console.log(personData);
};

dataObj(person);
