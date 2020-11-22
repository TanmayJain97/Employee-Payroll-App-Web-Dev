const getElement=document.querySelector('#get_services');
const getURL="http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        getElement.textContent="Get User Data: "+responseText
    })
    .catch(error =>{
        getElement.textContent="GET Error Status: "+JSON.stringify(error);
    });

const deleteElement=document.querySelector('#delete_services');
const deleteURL="http://localhost:3000/employees/3";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        deleteElement.textContent="Del User Data: "+responseText;
    })
    .catch(error =>{
        deleteElement.textContent="DEL Error Stat: "+JSON.stringify(error);
    });

const postElement=document.querySelector('#post_services')
const postURL="http://localhost:3000/employees";
const empData = 
{
    "_name": "Amarpa Shashanka Keerthi Kumar",
    "_gender": "female",
    "_department": [
      "Sales"
    ],
    "_salary": "400000",
    "_startDate": "29 Oct 2019",
    "_note": "",
    "_profilePic": "../assets/profile-images/Ellipse -1.png",
  };
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        postElement.textContent="Post User Data: "+responseText;
    })
    .catch(error =>{
        postElement.textContent="POST Error Status: "+JSON.stringify(error);
    });