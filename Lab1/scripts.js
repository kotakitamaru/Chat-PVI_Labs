
function addStudent()
{
    var cellText = getValues()
    if (cellText == false)
      return;
    var rows = document.getElementById("TableBody").insertRow(-1);
    var cells = []
    for(var i = 0; i < cellText.length; i++)
    {
      cells[i] = rows.insertCell(i);
    }
    for(var i = 0; i < cells.length; i++){
      cells[i].innerHTML = cellText[i];
    }
    closeAddStudent()
}

function editStudent(button)
{
  var row = button.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");
  var cellText = getValues();
  if(cellText == false)
    return;
  for(var i = 0; i < cells.length; i++){
    cells[i].innerHTML = cellText[i];
  }
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

  var row = button.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");
  document.querySelector('.select-group').value = cells[1].textContent.trim();
  document.querySelector('.first-name').value = cells[2].textContent.trim().split(" ")[0];
  document.querySelector('.last-name').value = cells[2].textContent.trim().split(" ")[1];
  document.querySelector('.gender').value = cells[3].textContent.trim();
  document.querySelector('.birthday').value = cells[4].textContent.trim();


  myButton.onclick = function(){
    editStudent(button);
  }
  overlay.style.display = 'flex';
}

function closeAddStudent(){
  const overlay = document.getElementById('add-student-overlay');
  overlay.style.display = 'none';
  resetInputs()
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
  if(document.querySelector('.select-group').value == "" ||
  document.querySelector('.first-name').value == "" ||
  document.querySelector('.last-name').value == "" ||
  document.querySelector('.gender').value == "" ||
  document.querySelector('.birthday').value == "")
  {
    alert("Please fill out all fields");
    return false;
  }
  return [ '<input type = checkbox>',
    document.querySelector('.select-group').value,
    document.querySelector('.first-name').value+" "+document.querySelector('.last-name').value,
    document.querySelector('.gender').value,
    document.querySelector('.birthday').value,
    '<input type= checkbox class = "status-button"/>',
    '<button onclick="openEditStudent(this)" style = "background-image: url(\'pencil.png\'); background-size:auto 50%; background-repeat: no-repeat; background-position: center;"></button><button onclick="deleteStudent(this)" style = "background-image: url(\'delete.png\'); background-size:auto 50%; background-repeat: no-repeat; background-position: center; margin-left: 4px"></button>'];
}