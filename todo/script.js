const tableBody = document.querySelector("#todoTable tbody");
const addRowBtn = document.getElementById("addRowBtn");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");

// 行追加
addRowBtn.addEventListener("click", () => addRow());

function addRow(){
  const tr = document.createElement("tr");

  // チェックボックス
  const checkTd = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkTd.appendChild(checkbox);
  tr.appendChild(checkTd);

  // タスク名
  const taskTd = document.createElement("td");
  const taskDiv = document.createElement("div");
  taskDiv.contentEditable = "true";
  taskDiv.className = "editable-cell";
  taskDiv.setAttribute("placeholder","タスク名を入力");
  taskTd.appendChild(taskDiv);
  tr.appendChild(taskTd);

  // ステータス
  const statusTd = document.createElement("td");
  const statusSelect = document.createElement("select");
  statusSelect.className = "status-select";
  ["未着手","進行中","完了"].forEach(val=>{
    const option = document.createElement("option");
    option.value = val;
    option.textContent = val;
    statusSelect.appendChild(option);
  });
  statusSelect.addEventListener("change", (e)=>{
    if(e.target.value==="進行中") e.target.style.backgroundColor="#2196F3";
    else if(e.target.value==="完了") e.target.style.backgroundColor="#4CAF50";
    else e.target.style.backgroundColor="transparent";
  });
  statusTd.appendChild(statusSelect);
  tr.appendChild(statusTd);

  // 期日
  const dateTd = document.createElement("td");
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateTd.appendChild(dateInput);
  tr.appendChild(dateTd);

  // 優先度
  const priorityTd = document.createElement("td");
  const prioritySelect = document.createElement("select");
  prioritySelect.className = "priority-select";
  ["高","中","低"].forEach(val=>{
    const option = document.createElement("option");
    option.value = val;
    option.textContent = val;
    prioritySelect.appendChild(option);
  });
  prioritySelect.addEventListener("change", (e)=>{
    if(e.target.value==="高") e.target.style.backgroundColor="#ff8a80";
    else if(e.target.value==="中") e.target.style.backgroundColor="#fff176";
    else if(e.target.value==="低") e.target.style.backgroundColor="#ccff90";
  });
  priorityTd.appendChild(prioritySelect);
  tr.appendChild(priorityTd);

  // 説明
  const descTd = document.createElement("td");
  const descDiv = document.createElement("div");
  descDiv.contentEditable = "true";
  descDiv.className = "editable-cell";
  descDiv.setAttribute("placeholder","説明を入力");
  descTd.appendChild(descDiv);
  tr.appendChild(descTd);

  // 削除
  const actionTd = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";
  deleteBtn.className = "action-btn";
  deleteBtn.addEventListener("click", () => {
    if(confirm("削除してよろしいですか？")){
      tr.remove();
    }
  });
  actionTd.appendChild(deleteBtn);
  tr.appendChild(actionTd);

  tableBody.appendChild(tr);
}

// 期日列ヘッダークリックで昇順/降順切替
const dateHeader = document.querySelector("#todoTable th:nth-child(4)");
let dateSortAsc = true;
dateHeader.addEventListener("click", () => {
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  rows.sort((a,b) => {
    const aDate = a.children[3].querySelector("input").value;
    const bDate = b.children[3].querySelector("input").value;
    if(!aDate) return 1;
    if(!bDate) return -1;
    return dateSortAsc ? new Date(aDate)-new Date(bDate) : new Date(bDate)-new Date(aDate);
  });
  rows.forEach(r => tableBody.appendChild(r));
  dateSortAsc = !dateSortAsc;
});

// 選択削除
deleteSelectedBtn.addEventListener("click", () => {
  const selectedRows = Array.from(tableBody.querySelectorAll("tr")).filter(tr => tr.querySelector("input[type=checkbox]").checked);
  if(selectedRows.length===0) return alert("削除する行を選択してください");
  if(confirm(`選択した ${selectedRows.length} 行を削除してよろしいですか？`)){
    selectedRows.forEach(r => r.remove());
  }
});
