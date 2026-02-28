let mega;

function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  mega = new Mega({
    email: email,
    password: password
  });

  mega.on('ready', () => {
    loadFolders(mega.root);
    alert("Login sukses");
  });
}

function loadFolders(node, path=""){
  const select = document.getElementById("folderSelect");

  node.children.forEach(folder=>{
    if(folder.directory){
      let option = document.createElement("option");
      option.value = folder.nodeId;
      option.text = path + folder.name;
      select.appendChild(option);

      loadFolders(folder, path + folder.name + "/");
    }
  });
}

function upload(){
  const files = document.getElementById("fileInput").files;
  const folderId = document.getElementById("folderSelect").value;
  const target = mega.find(folderId);

  [...files].forEach(file=>{

    const upload = target.upload(file);

    const progressBox = document.createElement("div");
    progressBox.className = "progress";

    const bar = document.createElement("div");
    bar.className = "bar";

    progressBox.appendChild(bar);
    document.getElementById("progressArea").appendChild(progressBox);

    upload.on('progress', (p)=>{
      bar.style.width = (p * 100) + "%";
    });

    upload.on('complete', ()=>{
      bar.style.background = "cyan";
    });

  });
}
