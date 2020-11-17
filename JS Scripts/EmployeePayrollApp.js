window.addEventListener('DOMContentLoaded',(event)=>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function () {
        if (name.value.length == 0) {
            textError.textContent = "*Name field is empty!!";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
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

    get id() {return this._id;}
    set id(id){
        this._id=id;
    }
    get name(){ return this._name;}
    set name(name){
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$')
        if(nameRegex.test(name)) this._name = name;
        else throw "Name is Invalid!";
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
        if(newDate<=new Date()) this._startDate = newDate;
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

        employeeData.name = document.getElementById('name').value;
        employeeData.profilePic = getRadioValue(document.getElementsByName('profile'));
        employeeData.gender = getRadioValue(document.getElementsByName('gender'));
        employeeData.department = getCheckBoxValue(document.getElementsByClassName('checkbox'));
        employeeData.salary = output.textContent;

        let start=new Array();
        start.push(document.getElementById('day').value);
        start.push(document.getElementById('month').value);
        start.push(document.getElementById('year').value);
        employeeData.startDate = start;

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

const resetForm = ()=>{
    setValue('#salary',400000);
    const output = document.querySelector('.salary-output');
    output.textContent = 400000;
    const textError = document.querySelector('.text-error');
    textError.textContent = "";
}
const setValue = (id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
}