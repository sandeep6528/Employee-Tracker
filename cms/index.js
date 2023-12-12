const inquirer = require('inquirer');
const Department = require('./lib/department.js');
const Role = require('./lib/role.js');
const Employee = require('./lib/employee.js');

const questions = [
  {
    name: 'action',
    type: 'list',
    message: 'Action: ',
    choices: [
      {
        name: 'View all departments',
        value: 'viewDepartment'
      }, {
        name: 'View all roles',
        value: 'viewRole'
      }, {
        name: 'View all employees',
        value: 'viewEmployee'
      },
      {
        name: 'Add departments',
        value: 'addDepartment'
      }, {
        name: 'Add roles',
        value: 'addRole'
      }, {
        name: 'Add employees',
        value: 'addEmployee'
      },
    ],
  },
];

function actions(answers) {
  switch (answers.action) {
    case 'viewDepartment': {
      const department = new Department();
      department.getData().then(function(data) {
        console.table(data);
        init();
      });
      break
    }

    case 'viewRole': {
      const role = new Role();
      role.view().then(function() {
        init();
      });
      break
    }

    case 'viewEmployee': {
      const employee = new Employee();
      employee.view().then(function() {
        init();
      });
      break
    }

    case 'addDepartment': {
      const department = new Department();
      department.add().then(function() {
        init();
      });
      break
    }

    case 'addRole': {
      const role = new Role();
      role.add().then(function() {
        init();
      });
      break
    }
  }
}

function init() {
  inquirer
  .prompt(questions)
  .then((answers) => {
    actions(answers);
  })
  .catch((error) => {
    console.log(error);
  });
}

init();