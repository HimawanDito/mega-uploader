let mega;

// tombol
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("uploadBtn").addEventListener("click", upload);

function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  mega = new Mega({
    email: email,
    password: password
  });

  mega.on("ready", () => {
    alert("Login sukses");
    loadFolders(mega.root);
  });

}

function loadFolders(node, path = "") {

  const select = document.getElementById("folderSelect");

  node.children.forEach(folder => {

    if (folder.directory) {

      let option = document.createElement("option");
      option.value = folder.nodeId;
      option.textContent = path + folder.name;

      select.appendChild(option);

      loadFolders(folder, path + folder.name + "/");

    }

  });

}

function upload() {

  const files = document.getElementById("fileInput").files;
  const folderId = document.getElementById("folderSelect").value;

  const target = mega.find(folderId);

  [...files].forEach(file => {

    const up = target.upload(file);

    const box = document.createElement("div");
    box.className = "progress";

    const bar = document.createElement("div");
    bar.className = "bar";

    box.appendChild(bar);
    document.getElementById("progressArea").appendChild(box);

    up.on("progress", p => {
      bar.style.width = (p * 100) + "%";
    });

    up.on("complete", () => {
      bar.style.background = "cyan";
    });

  });

}
