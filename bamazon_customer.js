const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'bamazon_DB',
});

function buyItem() {
  connection.query('SELECT * FROM products', function(err, res) {
    // for (let i = 0; i < res.length; i++) {
    //   console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | ${res[i].price} | ${res[i].stock_quantity}`);
    // }
    inquirer
      .prompt({
        name: 'buyItem',
        type: 'checkbox',
        message: 'Which item would you like to purchase?',
        choices:
        function() {
          const choiceArray = [];
          for (let i = 0; i < res.length; i++) {
            // console.log(res[i].item_id);
            choiceArray.push(res[i].item_id);
            // console.log(choiceArray);
          }
          return choiceArray;
        },
      })
      .then(function(answer) {
      //   console.log(answer);
      // based on their answer, either call the bid or the post functions
        // if (answer.postOrBid[0] === 'POST') {
        //   postAuction();
        // } else {
        //   bidAuction();
        // }
        console.log(answer);
      });
    console.log('-----------------------------------');
  });
}

connection.connect(function(err) {
  if (err) throw err;
  console.log('Items for sale:');
  buyItem();

  connection.end();
});

