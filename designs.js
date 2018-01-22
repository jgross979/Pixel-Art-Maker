let UIController = (function(){
  let DOMstrings = {colorPicker: '#colorPicker',
             height: '#input_height',
             width: '#input_width',
             pixelCanvas: '#pixel_canvas',
             submitButton: '#submit_button'
             }
  return{
    getDOM: function(){
      return{
        color: $(DOMstrings.colorPicker),
        height: $(DOMstrings.height),
        width: $(DOMstrings.width),
        canvas: $(DOMstrings.pixelCanvas),
        submit: $(DOMstrings.submitButton)
      }
    }
  };
})();


let controller = (function(UICtrl){
  //Get DOM elements
  let DOM = UICtrl.getDOM();
  //Initial grid
  makeGrid();

  DOM.submit.on('click', function(){
    makeGrid();
  });

  $('body').on('keypress', function(e){
    if(e.which === 13){
      makeGrid();
    };
  })

  function clearGrid(){
    let row = $('tr');
    let col = $('td');
    row.remove();
    col.remove();
  }

  function makeGrid() {
    clearGrid();
    for(row=1; row<= DOM.height.val(); row++){
      DOM.canvas.append('<tr></tr>');
    }
    $('tr').each(function(){
      for(col=1; col<=DOM.width.val();col++){
        $(this).append('<td></td>')
      }
    })
  }
//Draw on click with specified color
  DOM.canvas.on('mouseover', 'td', function(e){
    $(this).css('background', DOM.color.val());
  })


})(UIController);
