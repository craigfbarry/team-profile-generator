// Module and Node package declarations.

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


//We have 4 functions to collect user inputs. One to prompt which type is selected and 3 sets of questions to enter user data.
//First Function to select either Engineer, Intern or confirm whether the user is finished added team members.

function employeeTypeSelector(){
    return inquirer.prompt([
        
        {   
            type:       "list",
            name:       "selection",
            message:    "Please add the team member type or select 'finished' when done.",
            choices:    ["Engineer","Intern","Finished"]
        },

    ]);
}

//The Manager question prompts.

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

//The Engineer question prompts.

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

//The Intern question prompts.

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

//Asynchronous function to collect all the employee information until the user is done. Need to continue with a loop until finished.
//Utilizing a switch statement to proceed with employee type selected or end the loop.
//All the constructed classes are pushed to an array holding all of the employees information

async function init(){
    let employees = [];
    let userPromptFinished = false;
    
    try {
        console.log("Please add the team members."); 
        let managerData = await managerPrompt();
        employees.push(new Manager(managerData.ManagerName,managerData.ManagerID,managerData.ManagerEmail,managerData.ManagerOffice));
        do {
        let userSelection = await employeeTypeSelector();
            switch(`${userSelection.selection}`){

                case "Engineer":
                    let engineerData = await engineerPrompt();
                    employees.push(new Engineer(engineerData.EngineerName,engineerData.EngineerID,engineerData.EngineerEmail,engineerData.EngineerGithub));
                    break;
                case "Intern":
                    let internData = await internPrompt();
                    employees.push(new Intern(internData.InternName,internData.InternID,internData.InternEmail,internData.internSchool));

                    break;
                case "Finished":
                    userPromptFinished = true;
                    break;
            }
        }
        while (userPromptFinished === false);
        console.log(employees);
        render(employees);


    }
    catch(err){
        console.log(err)
    }
}

init();

//render(allEmployees);


//call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

