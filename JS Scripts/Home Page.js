let empPayrollList=new Array();

window.addEventListener("DOMContentLoaded", (event) => {
    if (site_properties.from_local) getEmpDataFromLocalStorage();
    else getEmpDataFromJSONServer();
});


function getEmpDataFromLocalStorage(){
    empPayrollList=localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
    
    processLocalStorageResponse()
};

function getEmpDataFromJSONServer(){
    let getURL=site_properties.json_host_server;
    makePromiseCall("GET",getURL,true)
        .then(responseText => {
        empPayrollList=(JSON.parse(responseText));
        console.log(empPayrollList);
        processLocalStorageResponse()
    }).catch(error => {
        console.log("GET Error Staus: " + JSON.stringify(error));
    });
}

function processLocalStorageResponse(){
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHTML();
    localStorage.removeItem("editEmp");
}

function createInnerHTML(){
    const headerHTML=
        "<th></th>"+
        "<th>Emp Name</th>"+
        "<th>Gender</th>"+
        "<th>Department</th>"+
        "<th>Salary</th>"+
        "<th>Start Date</th>"+
        "<th>Actions</th>";

    if (empPayrollList.length==0){
        console.log(empPayrollList);
        console.log("No data found");
        return;
    }
    let innerHTML=`${headerHTML}`;
    for(const empData of empPayrollList){
        innerHTML=`${innerHTML}
        <tr>
            <td><img class="profile" src="${empData._profilePic}" alt="Profile Pic"></td>
            <td>${empData._name}</td>
            <td>${empData._gender}</td>
            <td>${getDeptHTML(empData._department)}</td>
            <td>RS ${empData._salary}</td>
            <td>${stringifyDate(empData._startDate)}</td>
            <td>
                <img id="${empData.id}" onclick="remove(this)" alt="delete" src="./Assets/icons/delete-black-18dp.svg">
                <img id="${empData.id}" onclick="update(this)" alt="edit" src="./Assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHTML;
}

function getDeptHTML(deptList){
    let deptHTML = '';
    for(const dept of deptList){
        deptHTML = `${deptHTML}<div class="dept-label">${dept}</div>`
    }
    return deptHTML;
}

function createEmployeePayrollJson(){
    let empPayrollLocalList = [
        {
            _name:'Narayan Mahadevan',
            _gender:'Male',
            _department:['Engineering','Finance'],
            _salary:'500000',
            _startDate:'29 Oct 2019',
            _note:'',
            id: new Date().getTime(),
            _profilePic:'./Assets/profile-images/Ellipse -5.png'
        },
        {
            _name:'Amarpa Shashanka',
            _gender:'Female',
            _department:['Sales'],
            _salary:'400000',
            _startDate:'18 Nov 2020',
            _note:'',
            id: new Date().getTime()+1,
            _profilePic:'./Assets/profile-images/Ellipse -7.png'
        }
    ]
    return empPayrollLocalList;
}

function remove(node){
    let empPayrollData = empPayrollList.find(empData=>empData.id == node.id);
    if(!empPayrollData){
        console.log("No entry found!!");
        return;
    }
    const index = empPayrollList.map(empData=>empData.id)
                                .indexOf(empPayrollData.id);
    empPayrollList.splice(index,1);

    if(site_properties.from_local){
        localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
        document.querySelector(".emp-count").textContent = empPayrollList.length;
        createInnerHTML();
    }else{
        let delURL=site_properties.json_host_server+empPayrollData.id;
        makePromiseCall("DELETE", delURL, false)
            .then(responseText => {
            console.log("Del: "+employeePayrollObj._name);
            document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHTML();
        }).catch(error => {
            console.log("DEL Error Staus: " + JSON.stringify(error));
        });
    }
}

function update(node){
    let empPayrollData = empPayrollList.find(empData=>empData.id == node.id);
    if(!empPayrollData){
        console.log("No entry found!!");
        return;
    }
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData,'\t', 2));
    window.location.replace(site_properties.add_emp_payroll_page);
}