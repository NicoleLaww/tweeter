$(document).ready(function() {
  $("textarea").keyup(function(event) {
    const counter = $(".counter");
    let value = 140 - $(this).val().length;
    counter.text(value);
    if (value < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
  });
});
