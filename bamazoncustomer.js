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
        type: 'input',
        name: 'id',
        message: 'Which item would you like to purchase?\n',
        validate: function(value) {
          if (!isNaN(value) && value < 11) {
            return true;
          }
          return false;
        },
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many of these items would you like to buy? \n',
        validate: function(value) {
          if (!isNaN(value)) {
            return true;
          }
          return false;
        },
      },

    ]).then(function(answer) {
      // console.log(answer);
      connection.query('SELECT * FROM products WHERE ?', [{ item_id: answer.id }], function(err, res) {
        if (err) throw err;
        const currentQuantity = res[0].stock_quantity;
        const itemPrice = res[0].price;
        const customerPrice = itemPrice * answer.quantity;
        const remainingQuantity = currentQuantity - answer.quantity;
        if (currentQuantity > answer.quantity) {
          console.log(`\nYour total purchase price is $${customerPrice}.00.`);
          console.log('\n<------------------------->\n');
          console.log('Thanks for your business!');
          console.log('\n<------------------------->\n');
          connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [remainingQuantity, answer.id]);
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
