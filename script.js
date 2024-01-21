const studentId = document.getElementById('studentId');
const studentName = document.getElementById('studentName');
const studentEmail = document.getElementById('studentEmail');
const tableBody = document.getElementById('table-body');
const updateMessage = document.querySelector('h4');
document.addEventListener('DOMContentLoaded', () => {
    for (i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedData = JSON.parse(localStorage.getItem(key));
        display(storedData);   
    }
})


function createStudent() {
   if (studentId.value.trim() != '' && studentName.value.trim() != '' && studentEmail.value.trim() != '' ) {

    setTimeout(() => {
        updateMessage.textContent = 'Click on the information you want to change';
    }, 2000);

    // Store in localStorage
    const student = [studentId.value, studentName.value, studentEmail.value];
    localStorage.setItem(studentId.value, JSON.stringify(student));

    // Get data from localStorage
    const retrievedData = JSON.parse(localStorage.getItem(studentId.value));

    // display it on DOM
    display(retrievedData);

    studentId.value = '';
    studentName.value = '';
    studentEmail.value = '';
    return;
   }
   alert('Please fill in all empty input!');
}

function display(data) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td id="id">${data[0]}</td>
    <td id="name">${data[1]}</td>
    <td id="email">${data[2]}</td>
    <td><button class="remove">Remove</button></td>
    `
    tableBody.appendChild(tr);
    tableBody.addEventListener('click', deleteStudent);
    
}

function updateStudent(e) {
    // Implement logic to update a student
    if (e.target.tagName === 'TD') {
        const newValue = prompt(`Change: ${e.target.textContent}`);

        if (newValue.trim() !== '') {
            const id = e.target.parentElement.querySelector('#id').textContent;
            const existingData = JSON.parse(localStorage.getItem(id));

            if (e.target.id === 'name') {
                existingData[1] = newValue;
            } else if (e.target.id === 'email') {
                existingData[2] = newValue;
            } else {
                existingData[0] = newValue;
            }

            localStorage.setItem(id, JSON.stringify(existingData));
        }else if (newValue == null){}
         else {
            alert('Please Type in Something');
        }
    }
}

tableBody.addEventListener('click', updateStudent)

// Remove Function
function deleteStudent(e) {
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        localStorage.removeItem(id);
        removeFromDOM(id);
    }
}

// remove from DOM
function removeFromDOM(id) {
    const tdElements = tableBody.querySelectorAll('td#id');
    tdElements.forEach((tdId) => {
        if (tdId.textContent === id) {
            tdId.parentElement.remove();
        }
    });
}



// Modal
function openModal() {
    document.getElementById('myModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === document.getElementById('myModal')) {
        closeModal();
    }
};