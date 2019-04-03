var cluckBody = document.getElementById("cluckBody");
var clucks = document.getElementById("clucks");

async function submitCluck() {
  if (cluckBody.value.length > 280) {
    alert("Your cluck is too long. Please shorten it.");
    return;
  }
  var data = {
    text: cluckBody.value
  };
  await fetch("/clucks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  loadClucks();
}

async function loadClucks() {
  while (clucks.firstChild) {
    clucks.removeChild(clucks.firstChild);
  }
  var response = await fetch("/clucks");
  var json = await response.json();
  var reversedClucks = json.clucks.reverse();
  for (var i in reversedClucks) {
    var cluck = reversedClucks[i];
    var li = document.createElement("li");
    var contents = cluck.text;
    if (cluck.name) {
      contents = cluck.name + ": " + cluck.text;
    }
    li.textContent = contents;
    clucks.appendChild(li);
  }
}

window.onload = loadClucks;
