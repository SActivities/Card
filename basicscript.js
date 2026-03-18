let selectedImage = null;

function selectDesign(img) {
  document
    .querySelectorAll(".designs img")
    .forEach(i => i.classList.remove("selected"));

  img.classList.add("selected");
  selectedImage = img.src;
  generate();
}

function generate() {
  if (!selectedImage) return;

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const senderText = document.getElementById("fromInput")?.value || "";
  const color = document.getElementById("colorInput").value;
  const font = document.getElementById("fontSelect").value;

  const img = new Image();
  img.src = selectedImage;

  img.onload = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.direction = "rtl";
    ctx.font = `bold 48px ${font}`;

    if (senderText) {
      ctx.fillText(
        senderText,
        canvas.width / 2,
        (canvas.height / 2) + 220
      );
    }
  };
}

function download() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "تصميمك.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

["fromInput", "colorInput"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", generate);
});

document.getElementById("fontSelect").addEventListener("change", generate);