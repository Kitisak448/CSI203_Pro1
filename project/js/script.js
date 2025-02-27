const filesData = [];

function previewFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";

      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = e.target.result;
        fileItem.appendChild(img);
      } else {
        fileItem.textContent = file.name;
      }

      const removeButton = document.createElement("button");
      removeButton.textContent = "ลบไฟล์";
      removeButton.onclick = function () {
        document.getElementById("deleteModal").style.display = "block";
        deleteModal.fileItem = fileItem;
        deleteModal.fileName = file.name;
      };

      fileItem.appendChild(removeButton);
      document.getElementById("fileList").appendChild(fileItem);

      filesData.push({ name: file.name, file: file });
      console.log(filesData);
    };
    reader.readAsDataURL(file);
  }
}

function closeModal() {
  document.getElementById("deleteModal").style.display = "none";
}

function confirmDelete() {
  const index = filesData.findIndex((f) => f.name === deleteModal.fileName);
  if (index !== -1) {
    const deletedFile = filesData.splice(index, 1)[0];
    console.log(`Deleted: ${deletedFile.name}`);
  }
  deleteModal.fileItem.remove();
  closeModal();
}

function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}