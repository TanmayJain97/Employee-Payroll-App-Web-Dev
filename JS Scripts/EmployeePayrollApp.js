window.addEventListener('DOMContentLoaded',(event)=>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function () {
            if (name.value.length == 0) {
                textError.textContent = "*Name field is empty!!";
                return;
            }
            try {
                let names=name.value;
                let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
                if(!(nameRegex.test(names))) textError.textContent = "*Invalid Name";
                else textError.textContent = "";
            } catch (exception) {
                textError.textContent = exception;
            }
        });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });
});

class EmployeePayrollData{
    //properties
    id;
    name;
    profilePic;
    gender;
    department;
    salary;
    startDate;
    notes;

    get id() {return this._id;}
    set id(id){
        this._id=id;
    }
    get name(){ return this._name;}
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
        if(nameRegex.test(name)) this._name = name;
        else throw "Name is Incorrect!";
    }

    get profilePic() {return this._profilePic;}
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }

    get gender() {return this._gender;}
    set gender(gender){
        this._gender = gender;
    }

    get department() {return this._department;}
    set department(department){
        this._department = department;
    }

    get salary() {return this._salary;}
    set salary(salary){
        this._salary = salary;
    }

    get startDate() {return this._startDate;}
    set startDate(startDate){
        let newDate = new Date(startDate[2],startDate[1],startDate[0]);
        let startDateCompare = dates.compare(newDate,new Date());
        if(startDateCompare<=0) this._startDate = newDate;
        else throw 'Start Date is incorrect';
    }

    get notes() {return this._notes}
    set notes(notes){
        this._notes = notes;
    }

    //toString method
    toString(){
        return "id="+this.id+" : name="+this.name+
                " : gender="+this.gender+" : Dept="+this.department+
                " : salary="+this.salary+" : Start Date="+empDate+
                " : Notes="+this.notes;
    }
}

let employees=new Array();
let employeeData = new EmployeePayrollData();

function save() {
    try {
        const output = document.querySelector('.salary-output');

        let names = document.getElementById('name').value;
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
        if(nameRegex.test(names)) employeeData.name=names;
        else throw "Name is Incorrect!";

        employeeData.profilePic = getRadioValue(document.getElementsByName('profile'));
        employeeData.gender = getRadioValue(document.getElementsByName('gender'));
        employeeData.department = getCheckBoxValue(document.getElementsByClassName('checkbox'));
        employeeData.salary = output.textContent;

        let start=new Array();
        start.push(document.getElementById('day').value);
        start.push(document.getElementById('month').value);
        start.push(document.getElementById('year').value);
        let newDate = new Date(start[2],start[1],start[0]);
        if(newDate<=new Date()) employeeData.startDate = newDate;
        else throw 'Start Date is incorrect';

        employeeData.notes = document.getElementById('notes').value;
        console.log(employeeData);
    }
    catch (exception) {
        console.error(exception);
    }
    employees.push(employeeData);
    console.log(employees);
    createAndUpdateStorage(employeeData);
}

function getRadioValue(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}
function getCheckBoxValue(boxes) {
    let boxlist = new Array();
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            boxlist.push(boxes[i].value)
        }
    }
    return boxlist;
}

function createAndUpdateStorage(employeeData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeeData);
    }else{
        employeePayrollList=[employeeData];
    }
    console.log(employeePayrollList);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}