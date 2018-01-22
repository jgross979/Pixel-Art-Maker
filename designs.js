$(function(){
  let UIController = (function() {
    let DOMstrings = {
      colorPicker: "#colorPicker",
      height: "#input_height",
      width: "#input_width",
      pixelCanvas: "#pixel_canvas",
      submitButton: "#submit_button"
    };
    return {
      getDOM: function() {
        return {
          color: $(DOMstrings.colorPicker),
          height: $(DOMstrings.height),
          width: $(DOMstrings.width),
          canvas: $(DOMstrings.pixelCanvas),
          submit: $(DOMstrings.submitButton)
        };
      }
    };
})()

  let controller = (function(UICtrl) {
    //Get DOM elements
    let DOM = UICtrl.getDOM();
    //Initial grid
    makeGrid();
    //Submit/Clear Methods
    DOM.submit.on("click", function() {
      makeGrid();
    });
    $("body").on("keypress", function(e) {
      if (e.which === 13) {
        makeGrid();
      }
    });
    //Changing Border Color
    $(DOM.color).on("change", function() {
      console.log(DOM.color.val());
      $(".border").css({ border: "5px dashed" + DOM.color.val() });
    });

    function clearGrid() {
      let row = $("tr");
      let col = $("td");
      row.remove();
      col.remove();
    }

    function makeGrid() {
      clearGrid();
      for (row = 1; row <= DOM.height.val(); row++) {
        DOM.canvas.append("<tr></tr>");
      }
      $("tr").each(function() {
        for (col = 1; col <= DOM.width.val(); col++) {
          $(this).append("<td></td>");
        }
      });
    }
    //Draw on click with specified color
    let dragging = false;
    DOM.canvas.on("mousedown", function() {
      dragging = true;
    });
    $('body').on("mouseup", function() {
      dragging = false;
    });
    DOM.canvas.on("mouseover", "td", function(e) {
      if (dragging) {
        $(this).css("background", DOM.color.val());
      }
    });
      DOM.canvas.on("click", "td", function(e) {
        $(this).css("background", DOM.color.val());
    });
})(UIController);
})
