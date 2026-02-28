let megaClient;

document.getElementById("loginBtn").onclick = login;
document.getElementById("uploadBtn").onclick = upload;

function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  megaClient = new mega({
    email,
    password
  });

  megaClient.on("ready", () => {
    alert("Login sukses");
    loadFolders(megaClient.root);
  });

}

function loadFolders(node, path = "") {

  const select = document.getElementById("folderSelect");

  node.children.forEach(folder => {

    if (folder.directory) {

      let opt = document.createElement("option");
      opt.value = folder.nodeId;
      opt.textContent = path + folder.name;

      select.appendChild(opt);

      loadFolders(folder, path + folder.name + "/");
    }

  });

}

function upload() {

  const files = document.getElementById("fileInput").files;
  const folderId = document.getElementById("folderSelect").value;

  const target = megaClient.find(folderId);

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

  });

}
