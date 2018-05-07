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

// Function that leads you through "buying" items from the
// list of items within the database

function itemInquiry() {
  inquirer
    .prompt([

      {
        type: 'input',
        name: 'id',
        message: 'Which item would you like to purchase?\n',
        // makes sure that the input given in the answer is
        // actually a number.
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
        message: 'How many of these items would you like to buy? \n',
        // makes sure that the input given in the answer is
        // actually a number.
        validate: function(value) {
          if (!isNaN(value)) {
            return true;
          }
          return false;
        },
      },

      // runs through the answer portion of the inquiry
    ]).then(function(answer) {
      // console.log(answer);
      // accesses the information within the database
      connection.query('SELECT * FROM products WHERE ?', [{ item_id: answer.id }], function(err, res) {
        if (err) throw err;
        // gives the inventory quantity of items in database.
        const currentQuantity = res[0].stock_quantity;
        // gives the price of items in database
        const itemPrice = res[0].price;
        // gives total customer price
        const customerPrice = itemPrice * answer.quantity;
        // gives new stock_quantity for items in the database
        // after a 'purchase' was made.
        const remainingQuantity = currentQuantity - answer.quantity;
        // calculates the total $ of product sold of each item
        const productSales = res[0].product_sales + customerPrice;

        if (currentQuantity > answer.quantity) {
          console.log(`\nYour total purchase price is $${customerPrice}.00.`);
          console.log('\n<------------------------->\n');
          console.log('Thanks for your business!');
          console.log('\n<------------------------->\n');
          connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [remainingQuantity, answer.id]);
          connection.query('UPDATE products SET product_sales=? WHERE item_id=?', [productSales, answer.id]);
          connection.query('SELECT * FROM products', function(error, results) {
            console.log('Inventory available for next purchase:\n');
            console.table(results);
          });
        } else {
          console.log('\nNot enough in stock. Please try again.');
        }

        connection.end();
      });
    });
}

// function that creates a table of all the items in database.

function createTable() {
  connection.connect(function() {
    connection.query('SELECT * FROM products', function(err, results) {
      if (err) {
        throw err;
      } else {
        // console.log(results);
        console.table(results);
        console.log('\n<----------------------->\n');
        itemInquiry();
      }
    });
  });
}
createTable();
