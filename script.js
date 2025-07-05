function downloadPDF() {
  const input = document.getElementById("file-input");
  const files = input.files;

  if (files.length === 0) {
    alert("Please select at least one image.");
    return;
  }

  const pdf = new jsPDF();

  let count = 0;

  Array.from(files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        const width = pdf.internal.pageSize.getWidth();
        const height = (img.height * width) / img.width;

        if (index !== 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, width, height);

        count++;
        if (count === files.length) {
          pdf.save("converted.pdf");
        }
      };
    };
    reader.readAsDataURL(file);
  });
}
