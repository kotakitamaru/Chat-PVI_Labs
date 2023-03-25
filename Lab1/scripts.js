var linesFilled = 1;

function addStudent()
{
    if(linesFilled >= 4)
        return;

    var cellText = [ '<input type = checkbox>',
    'PZ-24',
    'Markiv Olena',
    'F',
    '18.01.2005',
    '<input type= checkbox class = "status-button"/>',
    '<button style = "background-image: url(\'pencil.png\'); background-size:auto 50%; background-repeat: no-repeat; background-position: center;"></button><button onclick="deleteStudent(this)" style = "background-image: url(\'delete.png\'); background-size:auto 50%; background-repeat: no-repeat; background-position: center; margin-left: 4px"></button>'];

    var rows = document.querySelectorAll('#TableBody tr');
    var cells = rows[linesFilled%4].querySelectorAll('th');

    for(var i = 0; i < cells.length; i++){
        cells[i].innerHTML = cellText[i];
    }
    linesFilled++;
    closeAddStudent()
}

function deleteStudent(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  var rows = document.querySelectorAll('#TableBody tr');
  if (rows.length > 1) {
    var cells = rows[rows.length - 1].querySelectorAll('th');
    var cellValues = [];
    for (var i = 0; i < cells.length; i++) {
      cellValues.push(cells[i].innerHTML);
    }
    var newRow = document.createElement('tr');
    for (var i = 0; i < 7; i++) {
      var newCell = document.createElement('th');
      newRow.appendChild(newCell);
    }
    document.querySelector('#TableBody').appendChild(newRow);
    cells = rows[rows.length - 1].querySelectorAll('th');
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = cellValues[i];
    }
  }
  linesFilled--;
}

function closeAddStudent(){
  const overlay = document.getElementById('add-student-overlay');
  overlay.style.display = 'none';
}

function openAddStudent(){
  const overlay = document.getElementById('add-student-overlay');
  overlay.style.display = 'flex';
}