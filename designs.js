$(function(){
  let UIController = (function() {
    let DOMstrings = {
      background: "#backgroundColor",
      penColorPicker: "#penColorPicker",
      height: "#input_height",
      width: "#input_width",
      pixelCanvas: "#pixel_canvas",
      submitButton: "#submit_button",
      container: '#container',
      title: ".title",
      settings: ".settings",
      canvas_container: ".canvas_container"
    };
    return {
      getDOM: function() {
        return {
          background: $(DOMstrings.background),
          color: $(DOMstrings.penColorPicker),
          height: $(DOMstrings.height),
          width: $(DOMstrings.width),
          canvas: $(DOMstrings.pixelCanvas),
          submit: $(DOMstrings.submitButton),
          container: $(DOMstrings.container),
          title: $(DOMstrings.title),
          settings: $(DOMstrings.settings),
          canvasContainer: $(DOMstrings.canvasContainer)

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

    function clearGrid() {
      let row = $("tr");
      let col = $("td");
      row.remove();
      col.remove();
    }

    function makeGrid() {
      if(DOM.width.val() < 61 && DOM.height.val() < 61){
        clearGrid();
        for (row = 1; row <= DOM.height.val(); row++) {
          DOM.canvas.append("<tr></tr>");
        }
        $("tr").each(function() {
          for (col = 1; col <= DOM.width.val(); col++) {
            $(this).append("<td></td>");
          }
        });
        $('td').css('background', DOM.background.val())
      }else(
        alert('Values must be less than 60, please try again!')
      )


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

    //Set proper heights
    $(function(){
      let containerHeight = DOM.container.height();
      let titleHeight = DOM.title.height();
      let canvasHeight = DOM.canvasContainer.height();
      $(window).css('height', containerHeight)
      $('.settings').css('height', canvasHeight )
    })

    let color = hexToRgb(DOM.background.val());
    let background = `rgb(${color.r}, ${color.g}, ${color.b})`;

    DOM.background.change(function(){
      $('td').each(function(){
        if($(this).css('background-color') === background){
          $(this).css('background-color', DOM.background.val())
        }
        })
        color = hexToRgb(DOM.background.val())
        background = `rgb(${color.r}, ${color.g}, ${color.b})`;

        return color, background;
    })


    function hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
    }




})(UIController);
})
