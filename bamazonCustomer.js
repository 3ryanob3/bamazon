var mysql = require("mysql");  
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Success" + connection.threadId);
});


// const Joi = require('@hapi/joi');

// const schema = Joi.object().keys({
//     item_id: Joi.string().alphanum().min(2).max(30).required(),
//     product_name: Joi.string(),
//     department_name: Joi.string(),
//     price: Joi.number().integer(),
//     email: Joi.string().email({
//         minDomainSegments: 2
//     })
// });

function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true 

    }])

}





var displayProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14] 
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        purchasePrompt();
    });
}
function purchasePrompt() {
    inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "Please enter Item ID .",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number
        },

        {
            name: "Quantity",
            type: "input",
            message: "How many items do you wish to purchase?",
            validate: function (value) {
                var valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number
        },


    ]).then(function (answers) {
        var qtyNeed = answers.Quantity;
        var IDrequested = answers.ID;
        purchaseOrder(IDrequested, qtyNeed);
    });
};

function purchaseOrder(ID, amtNeed) {
    connection.query('Select * FROM products WHERE item_id = ' + ID, function (err, res) {
        if (err) {
            console.log(err)
        };
        if (amtNeed <= res[0].stock_quantity) {
            var totalCost = res[0].price * amtNeed;
            console.log("Good news your order is in stock!");
            console.log("Your total cost for " + amtNeed + " " + res[0].product_name + " is " + totalCost + " Thank you!");

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeed + "WHERE item_id = " + ID);
        } else {
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + " to complete your order.");
        };
        displayProducts();
    });
};


displayProducts();
