$(function() {
    $(document).on("change", ".uploadFile", function() {
      var uploadFile = $(this);
      var files = !!this.files ? this.files : [];
      
      if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
      
      if (/^image/.test(files[0].type)) { // only image file
        var reader = new FileReader(); // instance of the FileReader
        
        // Read the local file
        reader.readAsDataURL(files[0]); 
        
        // Set up a callback function to run when the FileReader has finished reading the file
        reader.onloadend = function() {
          uploadFile.closest(".imgUp").find('img').attr('src', this.result);
          uploadFile.closest(".imgUp").find('img').css('margin-bottom', '20px');
          
          // Get the file name and display it
        //   var fileName = uploadFile.val().split("\\").pop();
        //   uploadFile.closest(".imgUp").find('.fileName').text(fileName);
        }
      }
    });
  });
  


