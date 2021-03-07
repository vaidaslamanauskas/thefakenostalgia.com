(function() {
  var buttons = document.querySelectorAll('[data-toggle]');

  [].forEach.call(buttons, function(button) {

    var element = button.nextElementSibling;

    button.addEventListener('click', function() {
      element.classList.toggle('is-doorsUp');
    });

  });
})();