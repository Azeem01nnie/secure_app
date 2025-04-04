document.addEventListener("DOMContentLoaded", loadEmployees);

function loadEmployees() {
    fetch("./api/employee_api.php")
        .then(response => response.json())
        .then(data => {
            let employeeTableBody = document.getElementById("employeeTableBody");
            employeeTableBody.innerHTML = "";

            if (data.status === "success") {
                data.employee.forEach(emp => {
                    employeeTableBody.innerHTML += `
                        <tr>
                            <td>${emp.id}</td>
                            <td>${emp.first_name}</td>
                            <td>${emp.middle_name}</td>
                            <td>${emp.last_name}</td>
                            <td>${emp.mobile_number}</td>
                            <td>${emp.email}</td>
                            <td>${emp.sex}</td>
                            <td>${emp.job_title}</td>
                            <td class="actions">
                                <button class="edit-btn" onclick="openEditModal(${emp.id}, '${emp.first_name}', '${emp.middle_name}', '${emp.last_name}', '${emp.email}', '${emp.mobile_number}', '${emp.sex}', '${emp.job_title}')">Edit</button>
                                <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
                            </td>
                        </tr>`;
                });
            }
        })
        .catch(error => console.error("Error fetching employees:", error));
}

function addEmployee() {
    let firstName = document.getElementById("first_name").value.trim();
    let mi = document.getElementById("middle_name").value.trim();
    let lastName = document.getElementById("last_name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile_number").value.trim();
    let sex = document.getElementById("sex").value.trim();
    let jobTitle = document.getElementById("job_title").value.trim();

    if (!firstName || !lastName || !email || !mobile || !sex || !jobTitle) {
        alert("All fields except Middle Initial are required");
        return;
    }

    fetch("../api/employee_api.php", {
        method: "POST",
        body: JSON.stringify({
            first_name: firstName,
            middle_name: mi,
            last_name: lastName,
            email: email,
            mobile_number: mobile,
            sex: sex,
            job_title: jobTitle
        }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("first_name").value = "";
        document.getElementById("middle_name").value = "";
        document.getElementById("last_name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobile_number").value = "";
        document.getElementById("sex").value = "";
        document.getElementById("job_title").value = "";
        loadEmployees();
    })
    .catch(error => console.error("Error adding employee:", error));
}

function updateEmployee() {
    let id = document.getElementById("editId").value;
    let firstName = document.getElementById("editFirstName").value.trim();
    let mi = document.getElementById("editMiddleInitial").value.trim();
    let lastName = document.getElementById("editLastName").value.trim();
    let email = document.getElementById("editEmail").value.trim();
    let mobile = document.getElementById("editMobileNumber").value.trim();
    let sex = document.getElementById("editSex").value.trim();
    let jobTitle = document.getElementById("editJobTitle").value.trim();

    if (!id || !firstName || !lastName || !email || !mobile || !sex || !jobTitle) {
        alert("All fields except Middle Initial are required!");
        return;
    }

    fetch("../api/employee_api.php", {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            first_name: firstName,
            middle_name: mi,
            last_name: lastName,
            email: email,
            mobile_number: mobile,
            sex: sex,
            job_title: jobTitle
        }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeModal();
        loadEmployees();
    })
    .catch(error => console.error("Error updating employee:", error));
}

function deleteEmployee(id){
    
}

function filterEmployees() {
    let searchText = document.getElementById("searchBox").value.toLowerCase();
    let filterSex = document.getElementById("filterSex").value.toLowerCase();
    let filterJobTitle = document.getElementById("filterJobTitle").value.toLowerCase();
    let rows = document.querySelectorAll("#employeeTableBody tr");

    rows.forEach(row => {
        let firstName = row.children[1].textContent.toLowerCase();
        let lastName = row.children[3].textContent.toLowerCase();
        let sex = row.children[6].textContent.toLowerCase();
        let jobTitle = row.children[7].textContent.toLowerCase();

        let matchesSearch = firstName.includes(searchText) || lastName.includes(searchText) || jobTitle.includes(searchText);
        let matchesFilter = filterSex === "" || sex === filterSex;
        let matchesJobFilter = filterJobTitle === "" || jobTitle === filterJobTitle;

        row.style.display = (matchesSearch && matchesFilter && matchesJobFilter) ? "" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const modals = ["addEmployeeModal", "editModal"];

    modals.forEach(modal => {
        document.getElementById(modal).style.display = "none";
    });
});

// Function to open the Add Employee modal
function openAddEmployeeModal() {
    document.getElementById("addEmployeeModal").style.display = "flex";
}

function closeAddEmployeeModal(){
    
}

function openEditModal(id, firstName, middle_initial, lastName, email, mobile, sex, jobTitle) {
    document.getElementById("editId").value = id;
    document.getElementById("editFirstName").value = firstName;
    document.getElementById("editMiddleInitial").value = middle_initial !== "null" ? middle_initial : "";
    document.getElementById("editLastName").value = lastName;
    document.getElementById("editEmail").value = email;
    document.getElementById("editMobileNumber").value = mobile;
    document.getElementById("editSex").value = sex;
    document.getElementById("editJobTitle").value = jobTitle; // Added job title field

    let modal = document.getElementById("editModal");
    modal.style.display = "flex"; // Use flex for centering
}

// Close edit modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function closeModal(){
    
}