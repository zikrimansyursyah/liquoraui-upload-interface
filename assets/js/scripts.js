const dropArea = document.querySelector(".upload-form");
const uploadWrap = document.querySelector(".upload-wrapper");
const fileWrap = document.querySelector(".the-file");
const Alert = document.querySelector(".alert");
const AlertDesc = document.querySelector(".alert-desc");
const btnCloseAlert = document.querySelector(".btn-close-alert");
const inputFile = document.querySelector("#file");
const btnUpload = document.querySelector(".btn-upload");
const btnResult = document.querySelector(".btn-result");
const logBody = document.querySelector(".uploading-body");
const uploading = document.querySelector(".uploading-wrapper");

let file, filename, extension;
const exampleData = [
  "initialize",
  "preparing..",
  "Start Compressing",
  "[DEBUG] [0m20211219195119 REQUEST APDU ICC : 00C20A01084FE7EF38876A12E3",
  "SAM APDU send, slotSam=4:",
  "[DEBUG] [0m20211219195119 RESPON APDU ICC : 0701059000",
  "RESPON APDU ICC : 053500C4000030093BF52C3C5248F35DB91395E3CA12",
  "REQUEST APDU ICC : 00C300003222CBC2E1EB52B104738002",
  "[DEBUG] [0m20211219195119 REQUEST APDU ICC : 00C20A01084FE7EF38876A12E3",
  "SAM APDU send, slotSam=4:",
  "[DEBUG] [0m20211219195119 RESPON APDU ICC : 0701059000",
  "RESPON APDU ICC : 053500C4000030093BF52C3C5248F35DB91395E3CA12",
  "REQUEST APDU ICC : 00C300003222CBC2E1EB52B104738002",
  "[DEBUG] [0m20211219195119 REQUEST APDU ICC : 00C20A01084FE7EF38876A12E3",
  "SAM APDU send, slotSam=4:",
  "[DEBUG] [0m20211219195119 RESPON APDU ICC : 0701059000",
  "RESPON APDU ICC : 053500C4000030093BF52C3C5248F35DB91395E3CA12",
  "REQUEST APDU ICC : 00C300003222CBC2E1EB52B104738002",
];

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  input();
});

inputFile.onchange = () => {
  file = inputFile.files[0];
  input();
};

document
  .querySelector(".btn-close-file")
  .addEventListener("click", function () {
    file = null;
    dropArea.classList.remove("have-file");
    fileWrap.classList.remove("active");
    dropArea.classList.remove("active");
  });

btnCloseAlert.addEventListener("click", function () {
  Alert.classList.remove("show");
});

function input() {
  const fileType = ["video/mp4", "video/webm", "video/ogg"];
  filename = file.name.split(".");
  extension = filename.pop();
  console.log(file);

  if (fileType.includes(file.type)) {
    document.querySelector(".file-wrapper .name .filename").textContent =
      filename.join(" ");
    document.querySelector(
      ".file-wrapper .name .extension"
    ).textContent = `.${extension}`;
    document.querySelector(".file-wrapper .size").textContent = formatBytes(
      file.size
    );
    dropArea.classList.remove("active");
    dropArea.classList.add("have-file");
    fileWrap.classList.add("active");
  } else {
    AlertDesc.textContent = "the file is not video type";
    Alert.classList.add("show");
    setTimeout(() => {
      AlertDesc.textContent = null;
      Alert.classList.remove("show");
    }, 5000);
    dropArea.classList.remove("active");
  }
}

btnUpload.addEventListener("click", async () => {
  uploadWrap.classList.remove("active");
  uploading.classList.add("active");
  let i = 0;
  await setInterval(() => {
    if (i < exampleData.length) {
      const divData = document.createElement("div");
      divData.classList.add("data");
      const textnode = document.createTextNode(exampleData[i]);
      divData.appendChild(textnode);
      logBody.appendChild(divData);
    } else if (i == exampleData.length) {
      const divData = document.createElement("div");
      divData.classList.add("data");
      const textnode = document.createTextNode("Upload Video Success");
      divData.appendChild(textnode);
      logBody.appendChild(divData);
      btnResult.removeAttribute("disabled");
      document.querySelector(".uploading-header .title").textContent =
        "Video has been Compressed";
      document.querySelector(".video-name .filename").textContent = filename;
      document.querySelector(
        ".video-name .extension"
      ).textContent = `.${extension}`;
      document.querySelector(".before .size").textContent = formatBytes(
        file.size
      );
      document.querySelector(".after .size").textContent = formatBytes(
        (file.size * 40) / 100
      );
      document.querySelector(".result").classList.add("active");
    } else return;
    logBody.scrollTop = logBody.scrollHeight;
    i++;
  }, 1000);
});

function formatBytes(a, b = 2, k = 1024) {
  with (Math) {
    let d = floor(log(a) / log(k));
    return 0 == a
      ? "0 Bytes"
      : parseFloat((a / pow(k, d)).toFixed(max(0, b))) +
          " " +
          ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d];
  }
}
