(function ( $ ) {

  $.fn.mask = function () {

    return this.each(function () {

      var $this = $(this);

		$this.keypress( function (e) {
		  var raw = $this.val().replace(/[^\d]/g, '');
		  if (!raw.length) {
			return $(this).val('');
		  }
		  var masked = '(';
		  masked += raw.substring(0,3);
		  var prefix = raw.substring(3,6);
		  if (prefix.length) {
			masked += ') ' + prefix;
		  }
		  var suffix = raw.substring(6,10);
		  if (suffix.length) {
			masked += '-' + suffix;
		  }

		  $this.val(masked);

		  if ($this[0].setSelectionRange) {
		     var len = $this.val().length;
		     $this[0].setSelectionRange(len, len);
		  }

		}).on('blur', function (e) { 
			$(this).val($(this).val().substring(0,14)); 
		}).attr('maxlength', '14');
	});

  };
})(jQuery);

$('[data-phone_mask]').mask()
