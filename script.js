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

  const mainText = document.getElementById("textInput").value;
  const toText = document.getElementById("toInput")?.value || "";
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

    const centerY = canvas.height / 2;
    const padding = 60;
    const maxWidth = canvas.width - padding * 2;
    const lineHeight = 60;

    ctx.font = `bold 48px ${font}`;
    if (toText) {
      ctx.fillText(
        toText,
        canvas.width / 2,
        centerY - 200
      );
    }

    ctx.font = `bold 48px ${font}`;
    drawWrappedText(
      ctx,
      mainText,
      canvas.width / 2,
      centerY - 60,
      maxWidth,
      lineHeight
    );

    ctx.font = `bold 48px ${font}`;
    if (senderText) {
      ctx.fillText(
        senderText,
        canvas.width / 2,
        centerY + 200
      );
    }
  };
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!text) return;

  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  const maxLines = Math.floor(300 / lineHeight);
  lines = lines.slice(0, maxLines);

  lines.forEach((l, index) => {
    ctx.fillText(l.trim(), x, y + index * lineHeight);
  });
}

function download() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "تصميمك.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function setPresetText(text) {
  document.getElementById("textInput").value = text;
  generate();
}

["textInput", "toInput", "fromInput", "colorInput"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", generate);
});

document.getElementById("fontSelect").addEventListener("change", generate);

document.getElementById("presetTextSelect").addEventListener("change", function () {
  document.getElementById("textInput").value = this.value;
  generate();
});
