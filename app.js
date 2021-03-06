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
            message:    "What is the manager's name?"
        },
        {
            type:       "number",
            name:       "ManagerID",
            message:    "What is the manager's ID number?"
        },
        {
            type:       "input",
            name:       "ManagerEmail",
            message:    "What is the manager's email address?"
        },
        {
            type:       "number",
            name:       "ManagerOffice",
            message:    "What is the manager's office number?"
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
            type:       "number",
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
            type:       "number",
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
        //Validate data and if failed run the prompts again.
        if(isNaN(managerData.ManagerID) || isNaN(managerData.ManagerOffice) || (managerData.ManagerEmail).includes("@")==false){
            console.log("That's an invalid entry. Re-enter data.");
            managerData = await managerPrompt();
        }
        //Add the data to the employees array
        employees.push(new Manager(managerData.ManagerName,managerData.ManagerID,managerData.ManagerEmail,managerData.ManagerOffice));

        //Loop through the employee adding process until finished.
        do {
        let userSelection = await employeeTypeSelector();
            switch(`${userSelection.selection}`){

                case "Engineer":
                    let engineerData = await engineerPrompt();
                    if(isNaN(engineerData.EngineerID) || (engineerData.EngineerEmail).includes("@")==false){
                        console.log("That's an invalid entry. Re-enter data.");
                        engineerData = await engineerPrompt();
                    }
                    employees.push(new Engineer(engineerData.EngineerName,engineerData.EngineerID,engineerData.EngineerEmail,engineerData.EngineerGithub));
                    break;
                case "Intern":
                    let internData = await internPrompt();

                    if(isNaN(internData.InternID) || (internData.InternEmail).includes("@")==false){
                        console.log("That's an invalid entry. Re-enter data.");
                        internData = await internPrompt();
                    }
                    employees.push(new Intern(internData.InternName,internData.InternID,internData.InternEmail,internData.internSchool));

                    break;
                case "Finished":
                    userPromptFinished = true;
                    break;
            }
        }
        while (userPromptFinished === false);
        let MainHTML = render(employees).split(',').join("");

        fs.writeFileSync(outputPath, MainHTML, function(err){
            if (err){
                return console.log(err);
            }
            console.log("Success!");
        });
    }
    catch(err){
        console.log(err)
    }
}

init();

