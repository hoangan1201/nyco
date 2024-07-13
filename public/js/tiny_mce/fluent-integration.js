var django = django || {
  "jQuery": jQuery.noConflict(true)
};

(function ($) {
  function initTinyMCE($e) {
    if ($e.parents('.empty-form').length == 0) {  // Don't do empty inlines
      var mce_conf = $.parseJSON($e.attr('data-mce-conf'));

      // There is no way to pass a JavaScript function as an option
      // because all options are serialized as JSON.
      var fns = [
        'color_picker_callback',
        'file_browser_callback',
        'file_picker_callback',
        'images_dataimg_filter',
        'images_upload_handler',
        'paste_postprocess',
        'paste_preprocess',
        'setup',
        'urlconverter_callback',
      ];
      $.each(fns, function(i, fn_name) {
        if (typeof mce_conf[fn_name] != 'undefined') {
          if (mce_conf[fn_name].indexOf('(') != -1) {
            mce_conf[fn_name] = eval('(' + mce_conf[fn_name] + ')');
          }
          else {
            mce_conf[fn_name] = window[mce_conf[fn_name]];
          }
        }
      });

      var id = $e.attr('id');
      if ('elements' in mce_conf && mce_conf['mode'] == 'exact') {
        mce_conf['elements'] = id;
      }
      if ($e.attr('data-mce-gz-conf')) {
        tinyMCE_GZ.init($.parseJSON($e.attr('data-mce-gz-conf')));
      }
      if (!tinyMCE.editors[id]) {
        tinyMCE.init(mce_conf);
      }
    }
  }

  $(function() {
    var length = $('.tinymce').length;

    function reinitTinyMCE() {
      $('.tinymce').each(function () {
        initTinyMCE($(this));
      });
    }
    
    // when user click .cp-plugin-add-button reinitilize tinymce
    $(document.body).on('click', '.cp-plugin-add-button', function (e) {
      setTimeout(function() {
        var curLength = $('.tinymce').length;
        if (curLength !== length) {
          reinitTinyMCE();
          length = curLength;
        }
      }, 100);
    })
  })
}((typeof django === 'undefined' || typeof django.jQuery === 'undefined') && jQuery || django && django.jQuery));