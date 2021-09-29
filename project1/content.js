console.log("I am a test extension");
// watch for creation of an element which satisfies the selector ".test-elem"
$("body").arrive(`[aria-label="Post"]`, function (e) {
  console.log("Create post is now opened");
  $(e)
    .parent()
    .append(
      `<div class="make_it_bold" style="background: red; cursor: pointer;">Bold</div>
      <div class="make_it_italic" style="background: green; cursor: pointer;">italic</div>`
   
    );
});

const textFormatOption = (type) => {

  
if((`[aria-label="Post"]`).length)  {
  var stringSelected = window.getSelection().toString();
  console.log("rammoy")
  if((`[aria-label="Post"]`).length && type=== 0)
  {
  try {
  
    $(` [contenteditable="true" ]`).toggleClass("bold")
  } catch (error) {
    console.log(error)
    
  }


  //$(` [contenteditable="true" ]`).toggleClass("bold")


}
else if ((`[aria-label="Post"]`).length && type=== 1){
  try {
  
    $(` [contenteditable="true" ]`).toggleClass("italic")
  } catch (error) {
    console.log(error)
//     var para = document.createElement("P");               
// para.innerText = "This is a paragraph";


  }


}
}
}



$(document).on("click", ".make_it_bold", () => {
  textFormatOption(0);
});

$(document).on("click", ".make_it_italic", () => {
  textFormatOption(1);
});
