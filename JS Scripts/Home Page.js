window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHTML();
})

function createInnerHTML(){
    const headerHTML=
        "<th></th>"+
        "<th>Emp Name</th>"+
        "<th>Gender</th>"+
        "<th>Department</th>"+
        "<th>Salary</th>"+
        "<th>Start Date</th>"+
        "<th>Actions</th>";

    const innerHTML=`${headerHTML}
    <tr>
        <td><img class="profile" src="./Assets/profile-images/Ellipse -5.png"></td>
        <td>Narayan Mahadevan</td>
        <td>Male</td>
        <td><div class="dept-label">HR</div>
            <div class="dept-label">FINANCE</div>
        </td>
        <td>RS 300000</td>
        <td>1 Nov 2020</td>
        <td>
            <img id="1" onclick="remove()" alt="delete" src="./Assets/icons/delete-black-18dp.svg">
            <img id="1" onclick="update()" alt="edit" src="./Assets/icons/create-black-18dp.svg">
        </td>
    </tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHTML;
}