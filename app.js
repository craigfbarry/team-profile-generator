const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function managerPrompt(){
    return inquirer.prompt([
        {
            type:       "input",
            name:       "ManagerName",
            message:    "What is your manager's name?"
        },
        {
            type:       "input",
            name:       "ManagerID",
            message:    "What is your manager's ID number?"
        },
        {
            type:       "input",
            name:       "ManagerEmail",
            message:    "What is your manager's email address?"
        },
        {
            type:       "input",
            name:       "ManagerOffice",
            message:    "What is your manager's office number?"
        }
    ]);
}

function engineerPrompt(){
    return inquirer.prompt([
        {
            type:       "input",
            name:       "EngineerName",
            message:    "What is your engineer's name?"
        },
        {
            type:       "input",
            name:       "EngineerID",
            message:    "What is your engineer's ID number?"
        },
        {
            type:       "input",
            name:       "EngineerEmail",
            message:    "What is your engineer's email address?"
        },
        {
            type:       "input",
            name:       "EngineerGithub",
            message:    "What is your engineer's Github username?"
        }
    ]);
}

function internPrompt(){

    return inquirer.prompt([
        {
            type:       "input",
            name:       "InternName",
            message:    "What is your intern's name?"
        },
        {
            type:       "input",
            name:       "InternID",
            message:    "What is your intern's ID number?"
        },
        {
            type:       "input",
            name:       "InternEmail",
            message:    "What is your intern's email address?"
        },
        {
            type:       "input",
            name:       "internSchool",
            message:    "What was your intern's school?"
        }
    ]);

    
}
async function init(){
    let allEmployees = [];
    
    try {

        
        const managerData = await managerPrompt();
        allEmployees.push(managerData)
        const engineerData = await engineerPrompt();
        allEmployees.push(engineerData)
        const internData = await internPrompt();
        allEmployees.push(internData)

        console.log(allEmployees);

    }
    catch(err){
        console.log(err)
    }
}

init();
  
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
