// These items are required in order to make the program work

const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

// Connects you to the database.

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'bamazon_DB',
});

function itemInquiry() {
  inquirer
    .prompt([

      {
        type: 'checkbox',
        name: 'supervisorOptions',
        message: 'Choose what you want to do.\n',
        choices: [
          {
            name: 'View Product Sales by Department',
          },
          {
            name: 'Create New Department',
          },
        ],

      },
    ]).then(function(answer) {
      switch (answer.supervisorOptions[0]) {
        case 'View Product Sales by Department':
          salesByDepartment();
          break;
        case 'Create New Department':
          newDepartment();
          break;
        default:
          console.log('\n<----------------------->\n');
          console.log('*** Please make a valid choice ***');
          console.log('\n<----------------------->\n');
          itemInquiry();
      }
    });
}

itemInquiry();

function salesByDepartment() {
  console.log('This will show the product sales by department');
}

function newDepartment() {
  console.log('This will allow user to create a new department');
}
