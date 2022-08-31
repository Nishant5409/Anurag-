
// Getting Elements by id or class names to implement validation on our form
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const address = document.getElementById('address');
const city = document.getElementById('city');
const pincode = document.getElementById('pincode');
const state = document.getElementById('state');
const date = document.getElementById('date');
const month = document.getElementById('month');
const year = document.getElementById('year');
const form = document.getElementById('form');
const reset = document.getElementById('res');
const boards = document.getElementsByClassName('tb-inp-brd');
const marks = document.getElementsByClassName('tb-inp-mr');
const yearOfPassing = document.getElementsByClassName('tb-inp') ;
const bca = document.getElementById('bca');
const bcom = document.getElementById('bcom');
const bsc = document.getElementById('bsc');
const ba = document.getElementById('ba');
const male = document.getElementById('male');
const fmale = document.getElementById('fmale');


let data = {};


function createDropDown(element,ele_name,months=['January','Feburary','March','April','May','June','July','August','September','October','November','December'],date=1,year=1998){
    if(ele_name==='DATE'){
        for(let i=date;i<32;i++){
            const node = document.createElement('option');
            node.innerText=i;
            element.appendChild(node);
        }
    }else if(ele_name==='MONTH'){
        months.map((month)=>{
            const node = document.createElement('option');
            node.innerText=month;
            element.appendChild(node);
        })
    }else if(ele_name==='YEAR'){
        for(let i=year;i<2022;i++){
            const node = document.createElement('option');
            node.innerText=i;
            element.appendChild(node);
        }
    }
}


function checkName(fname){
    let regex = /^[a-zA-Z ]{2,30}$/;
    if(regex.test(fname.toLowerCase())) return true;
    return false;
}

function validateEmail(email){
    let regex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(regex.test(email)) return true;
    return false;
}

function validateNumber(number){
    if(number.trim().length===10) return true;
    return false;
}

// Checking address
function checkAddress(address){
    if(address.trim().length>5) return true;
    return false
}

// Checking pincode of location
function checkPin(pincode){
    if(pincode.trim().length>5) return true;
    return false; 
}

// Checking boards name
function checkBoard(boards){
    for(let i=0;i<4;i++){
        if(boards[i].value.length === 0 || boards[i].value.length>10){
            return false;
        }
    }
    return true;
}

// Checking board percentage
function checkPercentage(marks){
    for(let i=0;i<4;i++){
        let mark = marks[i].value.split('.');
        console.log(mark)
        if(marks[i].value.length===0 || Number(marks[i].value)>100){
            return false;
        }

    }
    return true;
}

// Checking year of paasing
function checkYearOfPassing(yearOfPassing){
    for(let i=0;i<4;i++){
        if(yearOfPassing[i].value.length!==4){
            return false;
        }
    }
    return true;
}

// Checking date of birth
function checkDob(date,month,year){
    if(date=="DATE" || month=="MONTH" || year==="YEAR"){
        return false;
    }
    return true;
}

// Checking enrolled course
function checkCourse(bca,bsc,bcom,ba){
    if(bca.checked===true){
        data.course = 'BCA';
        return true;
    }else if(bsc.checked===true){
        data.course = 'B.sc'
        return true
    }else if(bcom.checked==true){
        data.course = 'B.com'
        return true
    }else if(ba.checked===true){
        data.course = 'B.A'
        return true
    }
    return false
}

// Checking gender
function checkGender(fmale,male){
    console.log(fmale.checked)
    if(fmale.checked===true){
        data.gender = 'female'
        return true;
    }else if(male.checked===true){
        data.gender = 'male'
        return true;
    }
    return false;
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // Applying Validation and give alert prompt on wrong value enterd
    if(!(checkName(fname.value) && checkName(lname.value))){
        alert('Please Enter Correct First or Lastname');
    }else if(!validateEmail(email.value)){
        alert('Please Enter Valid Email address!');
    }else if(!validateNumber(mobile.value)){
        alert('Please Enter Valid Number');
    }else if(!checkAddress(address.value)){
        alert('please Enter Address of valid length');
    }else if(!checkName(city.value)){
        alert('Please Enter City of valid Length!');
    }else if(!checkPin(pincode.value)){
        alert('Please Check Your Pincode')
    }else if(!checkName(state.value)){
        alert('Please Enter Valid State name')
    }else if(!checkBoard(boards)){
        alert('Please bord name range 1-10 characters only')
    }else if(!checkPercentage(marks)){
        alert('Please Enter Valid Percentage')
    }else if(!checkYearOfPassing(yearOfPassing)){
        alert('Please Enter Valid Year of passing');
    }else if(!checkDob(date,year,month)){
        alert('Please Enter Valid Date of birth');
    }else if(!checkCourse(bca,bsc,bcom,ba)){
        alert('Please Select a course');
    }else if(!checkGender(fmale,male)){
        alert('Please Select Gender');
    }else{
        // Adding our data to data object
        data.firstName = fname.value;
        data.lastName = lname.value;
        data.email = email.value;
        data.mobile = mobile.value;
        data.address = address.value;
        data.city = city.value;
        data.state = state.value;
        data[boards[0].value]= marks[0].value+' '+yearOfPassing[0].value;
        data[boards[1].value]= marks[1].value+' '+yearOfPassing[1].value;
        data[boards[2].value]= marks[2].value+' '+yearOfPassing[2].value;
        data.dateOfBirth = date.value+'-'+month.value+'-'+year.value;
 
        localStorage.setItem("data", JSON.stringify(data));
        alert('Your Form is submitted successfully!')
        window.location.href = "display.html";
    }
})

reset.addEventListener('click',()=>{
    form.reset()
})

function insertDates(){
    createDropDown(date,'DATE');
    createDropDown(month,'MONTH');
    createDropDown(year,'YEAR');
}

insertDates();
