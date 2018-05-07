const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');
require('events').EventEmitter.prototype._maxListeners = 100;

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'bamazon_DB',
});

function quitApplication() {
  console.log('    Have a nice day!');
  console.log('\n<----------------------->\n');

  connection.end();
}

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
      if (err) throw err;
      // console.log(results);
      console.log('\n<----------------------->\n');
      console.log('These are the items currently for sale \n');
      console.table(results);
      console.log('\n<----------------------->\n');
      // itemInquiry();
      quitApplication();
    });
  });
}

function lowInv() {
  connection.connect(function() {
    connection.query('SELECT * FROM products', function(err, results) {
      if (err) {
        throw err;
      } else {
        const lowInventoryArray = [];
        for (let i = 0; i < results.length; i++) {
        //   console.log(results[i].stock_quantity);
          if (results[i].stock_quantity <= 5) {
            lowInventoryArray.push(results[i]);
            // itemInquiry();
          }
        }
        console.log('\n');
        console.table(lowInventoryArray);
        console.log('\n');
        console.log('\n<----------------------->\n');
        quitApplication();
      }
    });
  });
}

function addInv() {
//   console.log('add inventory app');
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
        // itemInquiry();
      }
    });
  });
  inquirer
    .prompt([

      {
        type: 'input',
        name: 'id',
        message: 'Which item would you like to add inventory to?\n',
        validate: function(value) {
          if (!isNaN(value)) {
            return true;
          }
          return false;
        },
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many of these items would you like to add? \n',
        validate: function(value) {
          if (!isNaN(value)) {
            return true;
          }
          return false;
        },
      },

    ]).then(function(answer) {
      connection.query('SELECT * FROM products WHERE ?', [{ item_id: answer.id }], function(err, res) {
        if (err) throw err;
        const currentQuantity = res[0].stock_quantity;
        const newQuantity = parseInt(currentQuantity) + parseInt(answer.quantity);
        console.log('\n<------------------------->\n');
        connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [newQuantity, answer.id]);
        connection.query('SELECT * FROM products', function(error, results) {
          console.log('Inventory available for next purchase:\n');
          console.table(results);
          //   itemInquiry();
          console.log('\n<----------------------->\n');
          console.log('Inventory has been updated\n');
          quitApplication();
        });
      });
    });
}

function addNewProduct() {
//   console.log('add new product app');
  connection.query('SELECT * FROM products', function(error, results) {
    if (error) throw error;
    inquirer.prompt([{
      name: 'name',
      type: 'input',
      message: 'What is the name of the item?',
    }, {
      name: 'department',
      type: 'input',
      message: 'What is the department of the item?',
    }, {
      name: 'price',
      type: 'input',
      message: 'What is the price of the item?',
    }, {
      name: 'stock',
      type: 'input',
      message: 'What is the stock quantity of the item',
    }]).then(function(answer) {
      connection.query('INSERT INTO products SET ?', {
        product_name: answer.name,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.stock,
      }, function(err) {
        if (err) throw err;
        console.log('\n<----------------------->\n');
        console.log('Item added');
        quitApplication();
      });
    });
  });
}
