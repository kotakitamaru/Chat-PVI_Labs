
function addStudent()
{
    var cellText = getValues()
    var rows = document.getElementById("TableBody").insertRow(-1);
    var cells = []
    for(var i = 0; i < cellText.length; i++)
    {
        cells[i] = rows.insertCell(i);
    }
    for(var i = 0; i < cells.length; i++){
        cells[i].innerHTML = cellText[i];
    }
    resetInputs()
    closeAddStudent()
}

function editStudent(button)
{
  var row = button.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");
  var cellText = getValues();
  for(var i = 0; i < cells.length; i++){
    cells[i].innerHTML = cellText[i];
  }
  resetInputs()
  closeAddStudent()
}

function deleteStudent(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function openAddStudent(){
  const overlay = document.getElementById('add-student-overlay');
  var myButton = document.getElementById('submit-button');
  myButton.onclick = addStudent;
  overlay.style.display = 'flex';
}

function openEditStudent(button){
  const overlay = document.getElementById('add-student-overlay');
  var myButton = document.getElementById('submit-button');
  myButton.onclick = function(){
    editStudent(button);
  }
  overlay.style.display = 'flex';
}

function closeAddStudent(){
  const overlay = document.getElementById('add-student-overlay');
  overlay.style.display = 'none';
}


function resetInputs()
{
  document.querySelector('.select-group').value = "";
  document.querySelector('.first-name').value = "";
  document.querySelector('.last-name').value = "";
  document.querySelector('.gender').value = "";
  document.querySelector('.birthday').value = "";
}

function getValues()
{
  return [ '<input type = checkbox>',
    document.querySelector('.select-group').value,
    document.querySelector('.first-name').value+" "+document.querySelector('.last-name').value,
    document.querySelector('.gender').value == 'male'?"M":"F",
    document.querySelector('.birthday').value,
    '<input type= checkbox class = "status-button"/>',
    '<button onclick="openEditStudent(this)" style = "background-image: url(\'pencil.png\'); background-size:auto 50%; background-repeat: no-repeat; background-position: center;"></button><button onclick="deleteStudent(this)" style = "background-image: url(\'delete.png\'); background-size:auto 50%; background-repeat: no-repeat; background-position: center; margin-left: 4px"></button>'];
}