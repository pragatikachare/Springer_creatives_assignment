function Openform()
{
document.getElementById("form1").style.visibility = "visible";
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("jdate").value = "";
    document.getElementById("ldate").value = "";
    selectedRow = null;
}

function readFormData() {
    
    var formData = {};
    formData["email"] = document.getElementById("email").value;
    formData["fullName"] = document.getElementById("fullName").value;
    var jvalue=new Date(document.getElementById("jdate").value);
    var lvalue=new Date(document.getElementById("ldate").value);
    var months= monthDiff(jvalue,lvalue);
    var year=Math.floor(months/12);
    var monthr= months-(year*12);
    var diffyear_month= year +" " +'years'+ " "+ monthr +" "+'months';
    formData["jdate"] = diffyear_month;
   
    if(months<=0){
        alert("Joining date should be less than Date of leaving OR Your Experience is less than 1 month!");
        exit();
    }
    return formData;

}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML='<img name="image" id="image" src="download.png" alt="Avatar" class="avatar">'
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.email;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.fullName;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.jdate;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = '<a onClick="onDelete(this)">Delete</a>';
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;

    if (document.getElementById("fullName").value == "") {
        alert("Name must be filled out");
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
     
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }

    if(document.getElementById("jdate").value == ""){
        alert("please enter joining date");
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
        console.log(jdate);
        
    }

    else {
     
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }

    if(document.getElementById("ldate").value == ""){
        alert("please enter leaving date");
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
       
    }
    else {
      
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }

    return isValid;
}



