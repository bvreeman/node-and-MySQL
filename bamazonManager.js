const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

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
        name: 'managerOptions',
        message: 'What would you like to do?\n',
        choices: [
          {
            name: 'Products for Sale',
          },
          {
            name: 'View Low Inventory',
          },
          {
            name: 'Add to Inventory',
          },
          {
            name: 'Add New Product',
          },
          {
            name: 'Quit Application',
          },
        ],
      },
    ]).then(function(answer) {
    //   console.log(answer.managerOptions[0]);
      switch (answer.managerOptions[0]) {
        case 'Products for Sale':
          forSale();
          break;
        case 'View Low Inventory':
          lowInv();
          break;
        case 'Add to Inventory':
          addInv();
          break;
        case 'Add New Product':
          addNewProduct();
          break;
        case 'Quit Application':
          quitApplication();
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

function forSale() {
  connection.connect(function() {
    connection.query('SELECT * FROM products', function(err, results) {
      if (err) {
        throw err;
      } else {
        // console.log(results);
        console.log('\n<----------------------->\n');
        console.log('These are the items currently for sale \n');
        console.table(results);
        console.log('\n<----------------------->\n');
        itemInquiry();
      }
    });
  });
}

function lowInv() {
  console.log('low inventory app');
}

function addInv() {
  console.log('add inventory app');
}

function addNewProduct() {
  console.log('add new product app');
}

function quitApplication() {
  connection.end();
}
