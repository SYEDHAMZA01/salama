const uploadFileElems = document.querySelectorAll('.uploadFile');

for (const uploadFileElem of uploadFileElems) {
  uploadFileElem.addEventListener('change', handleUploadFileChange);
}

function handleUploadFileChange(event) {
  const target = event.target;

  if (!target.classList.contains('uploadFile')) {
    return;
  }

  const imgUpElem = target.closest('.file-upload');
  if (!imgUpElem) {
    return;
  }

  const imgElem = imgUpElem.querySelector('.imagePreview');
  const chooseImage = imgUpElem.querySelector('.imagePreview2');
  const fileNameElem = imgUpElem.querySelector('.file-name');

  if (!imgElem || !chooseImage || !fileNameElem) {
    return;
  }

  const files = target.files;

  if (files.length === 0 || !files[0].type.startsWith('image/')) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function() {
    imgElem.src = reader.result;
    imgElem.style.marginBottom = '20px';
    chooseImage.src = reader.result;
    chooseImage.style.marginBottom = '20px';
    fileNameElem.textContent = files[0].name;

    const modalElems = document.querySelectorAll('#exampleModalToggle1, #exampleModalToggle2, #exampleModalToggle3, #exampleModalToggle4, #exampleModalToggle5, #exampleModalToggle6');
    let modal;

    for (const modalElem of modalElems) {
      if (modalElem.classList.contains('show')) {
        modal = bootstrap.Modal.getInstance(modalElem);
        break;
      }
    }

    if (modal) {
      modal.hide();
    } else {
      console.log('Modal not found or not shown');
    }
  };

  reader.readAsDataURL(files[0]);
}


