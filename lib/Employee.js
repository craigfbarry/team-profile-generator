// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name,id,email){
            this.name = name;
            this.id = id;
            this.email = email;
    }


    getName(Employee){
        return Employee.name;
    }

    getID(Employee){
        return Employee.id;
    }

    getEmail(Employee){
        return Employee.email;
    }

    getRole(){
        return "Employee"
    }
}

const worker = new Employee("Bob",304,"bob@email.com");
console.log(worker);




module.exports = Employee;
