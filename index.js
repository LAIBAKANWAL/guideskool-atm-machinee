#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
let myBalance = 20000;
let myPin = 112233;
const guideskool_atm_Machine = async () => {
    console.log(chalk.bgCyan.bold("\n Welcome to 'Guideskool ATM Machine' \n"));
    let getPin = await inquirer.prompt({
        name: "pinNo",
        message: "Enter your Pin ",
        type: "password",
    });
    if (getPin.pinNo == myPin) {
        console.log(chalk.green("Correct Pin Code :)"));
        let actionAns = await inquirer.prompt({
            name: "action",
            message: "What do you want to do?",
            type: "list",
            choices: ["Withdraw", "Check Balance", "Deposit", "Exit"],
        });
        switch (actionAns.action) {
            case "Withdraw":
                await withdraw();
                break;
            case "Check Balance":
                checkBalance();
                break;
            case "Deposit":
                await deposit();
                break;
            case "Exit":
                console.log(chalk.yellow("Exiting..."));
                break;
            default:
                console.log(chalk.red("Invalid choice"));
        }
    }
    else {
        console.log(chalk.red("Incorrect Pin Code :("));
    }
};
const withdraw = async () => {
    const withdrawAmount = await inquirer.prompt({
        name: "wAmount",
        message: "Select amount to withdraw",
        type: "list",
        choices: ["1000", "2000", "5000", "10000", "15000", "20000", "35000"],
    });
    if (parseInt(withdrawAmount.wAmount) <= myBalance) {
        let amountLeft = myBalance - parseInt(withdrawAmount.wAmount);
        console.log(chalk.green(`Successfully withdrawn ${withdrawAmount.wAmount}. Remaining balance is ${amountLeft}`));
    }
    else {
        console.log(chalk.red("Insufficient Balance"));
    }
};
const checkBalance = () => {
    console.log(chalk.cyan(`Your balance is ${myBalance}`));
};
const deposit = async () => {
    const depositAmount = await inquirer.prompt({
        name: "dAmount",
        message: "Enter amount to deposit",
        default: 0,
        type: "number",
        validate: (value) => (value > 0 ? true : chalk.red("Please enter a valid amount")),
        filter: (value) => Math.abs(value)
    });
    myBalance += depositAmount.dAmount;
    console.log(chalk.green(`Successfully deposited ${depositAmount.dAmount}. Your new balance is ${myBalance}`));
};
guideskool_atm_Machine();
