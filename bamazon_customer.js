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
  connection.query('SELECT * FROM products', function(err, results) {
    if (err) throw err;
    // for (let i = 0; i < res.length; i++) {
    //   console.log(`${res[i].item_id} | ${res[i].product_name} |
    //   ${res[i].department_name} | ${res[i].price} | ${res[i].stock_quantity}`);
    // }
    console.log('<----------------------------------->');
    for (let i = 0; i < results.length; i++) {
      console.log(results[i].product_name);
    }
    console.log('<----------------------------------->');
    inquirer
      .prompt([
        {
          name: 'buyItem',
          type: 'checkbox',
          choices:
            function() {
              const choiceArray = [];
              for (let i = 0; i < results.length; i++) {
                // console.log(res[0]);
                choiceArray.push(`Item name: ${results[i].product_name}\n     Quantity Available: ${results[i].stock_quantity}`);
                // console.log(choiceArray);
              }
              return choiceArray;
            },
          message: 'Which item would you like to purchase?',
        },
        {
          name: 'quantity',
          type: 'input',
          message: 'How many would you like to buy?',
        },
      ])
      .then(function(answer) {
        console.log(answer.quantity);

        let chosenItem;
        for (let i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.choice) {
            chosenItem = results[i];
          }
        }
        // // determine if bid was high enough
        // if (chosenItem.stock_quantity < parseInt(answer.bid)) {
        //   // bid was high enough, so update db, let the user know, and start over
        //   connection.query(
        //     'UPDATE auctions SET ? WHERE ?',
        //     [
        //       {
        //         highest_bid: answer.bid,
        //       },
        //       {
        //         id: chosenItem.id,
        //       },
        //     ],
        //     function(error) {
        //       if (error) throw err;
        //       console.log('Bid placed successfully!');
        //       buyItem();
        //     },
        //   );
        // } else {
        //   // bid wasn't high enough, so apologize and start over
        //   console.log('Your bid was too low. Try again...');
        //   buyItem();
        // }
      });
  });
}

connection.connect(function(err) {
  if (err) throw err;
  console.log('Items for sale:');
  buyItem();

  connection.end();
});

