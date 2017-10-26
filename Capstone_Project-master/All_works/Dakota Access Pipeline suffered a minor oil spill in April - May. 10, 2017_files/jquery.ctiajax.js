/*
 * AJAX
 */
function Ajax(validateInstance)
{
    this.validate = validateInstance;

    //Options
    this.options = {
        //Params
        url: null,
        type: 'get',
        data: null,
        //Calllbacks
        beforeSend: null,
        complete: null,
        error: null,
        success: null,
        //custom option to do redirects after Success Callback
        redirect_after: false,
        //Ovverides
        accepts: {
            json: 'text/json'
        },
        async: true,
        cache: false,
        cross_domain: false,
        dataType: 'json',
        global: true,
        headers: null,
        jsonp: null,
        jsonpCallback: null,
        timeout: 0
    }

    //Ajax Call
    this.execute = function()
    {
        var self = this;
        var beforeSendCallback = this.options.beforeSend;
        this.options.beforeSend = function() {
            //un hide hidden fields (eg on short form) so that they can be validated on front end
            $("form .hide").removeClass("hide");
            _beforeSend(self, beforeSendCallback);
        }
        var successCallback = this.options.success;
        this.options.success = function(data) {
            _success(self, successCallback, data);
        }
        var completeCallback = this.options.complete;
        this.options.complete = function() {
            _complete(completeCallback);
        }
        var errorCallback = this.options.error;
        this.options.error = function(jqXHR, textStatus, errorThrown) { 
            if(typeof(errorCallback) == 'undefined'){
                window.location = "/error";
            }
            _error(errorCallback, self, jqXHR, textStatus, errorThrown);
        }
        $.ajax(this.options);
    }

    //Get method
    this.get = function(url, data, success)
    {
        this.options.type = 'get';
        this.options.url = url;
        this.options.data = data;
        this.options.success = success;
        this.execute();
    }

    //Post method
    this.post = function(url, data, success)
    {
        this.options.type = 'post';
        this.options.url = url;
        this.options.data = data;
        this.options.success = success;
        this.execute();
    }

    this.actions = function(data) 
    {
        return _actions(data);
    }

    this.validation = function(data)
    {
        return _validation(this, data);
    }
    
    var _actions = function(action)
    {
        if(typeof(action.selector) == 'undefined')
            return false;
        var selector = action.selector;

        if(typeof(action.content) != 'undefined')
            var content = action.content;
        else
            var content = '';

        var jq_obj = $(selector);
        if(typeof(action.method) == 'undefined')
            return false;
        switch(action.method)
        {
            case 'append':
                $(jq_obj).append(content);
                break;
            case 'prepend':
                $(jq_obj).prepend(content);
                break;
            case 'replaceWith':
                $(jq_obj).replaceWith(content);
                break;
            case 'remove':
                $(jq_obj).remove();
                break;
            case 'empty':
                $(jq_obj).empty();
                break;
            case 'html':
                $(jq_obj).html(content);
                break;
            case 'fadeIn':
                $(jq_obj).fadeIn(content, 200);
                break;
            case 'val':
                $(jq_obj).val(content);
                break;
            case 'show':
                $(jq_obj).show();
                break;
            case 'hide':
                $(jq_obj).hide();
                break;
            case 'slideDown':
                $(jq_obj).slideDown();
                break;
            case 'addClass':
                $(jq_obj).addClass(content);
                break;
            case 'removeClass':
                $(jq_obj).removeClass(content);
                break;
        }
    }

    var _beforeSend =  function(self, callback)
    {
        //Custom before call
        if(typeof(callback) == 'function'){
            callback();
        }
        //any always fireing before call stuff
        self.validate.clear_errors();
    }

    var _complete =  function(callback)
    {
        //Custom complete call
        if(typeof(callback) == 'function'){
            callback();
        }
        //any always fireing complete call stuff
    }

    var _error = function(callback, request, jqXHR, textStatus, errorThrown)
    {
        //fire any request specific error
        if(typeof(callback) == 'function'){
            callback();
        }
        //log the error
        _log({
            message: 'Request Failed',
        responseCode: textStatus,
        error: errorThrown,
        errorObject: jqXHR,
        requestObject: request
        });
    }

    //this function fires when the class is selfantiated
    var _init = function(self)
    {
        if(typeof(self.validate) == 'undefined') {
            _log("ERROR: jQuery Validation is missing");
        }

    }

    var _log = function(message)
    {
        try{
            console.log(message);
        }
        catch(e) {
        }
    }

    //Success Handler
    var _success = function(request, success, data)
    {
        if(typeof(data) == 'undefined'){
            return;
        }
        request.response = data;
        //redirect if required
        if(!request.options.redirect_after) {
            //redirect if required
            if(typeof(data.redirect) != 'undefined'){
                return _redirect(data.redirect);
            }
        }
        //update the csrf
        if(typeof(data.csrf_token) != 'undefined'){
            csrf.init(data.csrf_token);
        }
        // Execute script
        if(typeof(data.script) != 'undefined') {
            eval(data.script);
        }
        //run the success callback
        if(typeof(success) == 'function') {
            success(data);
        }
        //run any actions
        if(typeof(data.actions) != 'undefined') {
            for (var a = 0; a < data.actions.length; a++)
                _actions(data.actions[a]);
        }
        //check for the validation object
        if(typeof(data.validation) != 'undefined' && data.validation){
            _validation(request, data.validation);
            // scroll to error
            var firstError = $('#' + data.validation[0].name);
            $('html, body').animate({scrollTop: firstError.offset().top}, "slow");

            //unhide the fields that were  hidden on short form
            $("form .hide").removeClass("hide");
        }
        //show success messages
        if(typeof(data.successes) != 'undefined') {
            for(var s = 0; s < data.successes.length; s++) {
                _show_success(data.successes[s]);        
            }
        }    
        //show any soft errors
        if(typeof(data.errors) != 'undefined') {
            for(var e = 0; s < data.errors.length; e++) {
                _show_error(data.errors[e]);        
            }
        }                                        
        //redirect
        if(request.options.redirect_after) {
            if(typeof(data.redirect) != 'undefined'){
                return _redirect(data.redirect);
            }
        }

        //Popup related functions
        if(typeof(data.window_close) != 'undefined') {
            window.close();
        }
        //Redirect popup
        if(typeof(data.redirect_opener) != 'undefined') {
            window.opener.location = data.redirect_opener;
        }
        //rebind any ui specific functions
        ui.binds();
    }

    var _redirect = function(url)
    {
        window.location = url;
    }

    var _show_success = function(message)
    {
        alert('Success: '.message);
    }

    var _show_error = function(message)
    {
        alert('Error: '.message);
    }

    var _validation = function(self, data)
    {
        for(var i = 0; i < data.length; i++) {
            //load the jquery element
            var element_name = data[i].name;
            var element = $('[name="' + element_name + '"]');
            if(element.length > 0 && $(element).is(':visible')) {
                //show the data error if its array
                if(data[i].message.length > 0) {
                    var message = '';
                    //build up the message
                    for(m = 0; m < data[i].message.length; m++) {
                        if(data[i].message[m].length > 0 && data[i].message[m]) {
                            message += data[i].message[m]; 
                        }
                    }
                    self.validate.show_error(element, self.validate.message(element, {message: message}));    
                }        
            } else {
                var message = '';
                for(m = 0; m < data[i].message.length; m++) {
                    if(data[i].message[m].length > 0 && data[i].message[m]) {
                        message += data[i].message[m]; 
                    }
                }
                self.validate.modal(message);
            }
        }
        if(typeof(data[0]) != 'undefined'){
            var tmpElement = $('[name="' + data[0].name + '"]');
            tmpElement.focus();
        }
    }

    _init(this);
}

/*
 * AJAX
 */
function Auto_Submit_Form(ajaxInstance)
{
    this.auto_submit_form_selector = 'form.auto_submit';
    this.forms = null;
    this.ajax = ajaxInstance;
    this.loader_id = 'auto-submit-loader';
    this.loader = '<div id="' + this.loader_id + '"><img src="/img/ajax-loader.gif"/></div>';

    this.callbacks = {
        beforeSend: null,
        complete: null,
        success: null
    }

    var _callback_options = {
        beforeSend: 'auto_submit_before_send',
        complete: 'auto_submit_complete',
        success: 'auto_submit_success'
    }

    var _config = function(self, form)
    {
        if(typeof($(form).data(_callback_options.beforeSend)) != 'undefined' && eval("typeof "  + $(form).data(_callback_options.beforeSend)) == "function") {
           self.callbacks.beforeSend = eval($(form).data(_callback_options.beforeSend));
        }
        if(typeof($(form).data(_callback_options.complete)) != 'undefined' && eval("typeof " + $(form).data(_callback_options.complete)) == "function") {
           self.callbacks.complete = eval($(form).data(_callback_options.complete));
        }
        if(typeof($(form).data(_callback_options.success)) != 'undefined' && eval("typeof " + $(form).data(_callback_options.success)) == "function") {
           self.callbacks.success = eval($(form).data(_callback_options.success));
        }
    }

    this.submit = function(form)
    {
        //store the active inputs and submits
        var active_inputs = $(form).find('input:enabled, select:enabled');
        var active_submit = $(form).find('[type="submit"]').first();
        $(active_submit).attr('disabled', 'disabled');
        //fire the ajax
        var self = this;
        this.ajax.options.data = $(form).serialize();
        this.ajax.options.url = $(form).attr('action');
        this.ajax.options.type = (typeof($(form).attr('method')) == 'undefined'
                ? 'get'
                : $(form).attr('method')).toLowerCase();
        this.ajax.options.redirect_after = ($(form).data('redirect_after') == 'undefined')
                ? true
                : false;
        this.ajax.options.beforeSend = function() {
            //show loading
            $(active_inputs).attr('disabled', 'disabled');
            $(active_submit).addClass('buttonLoading');
            if(self.callbacks.beforeSend != null){
                self.callbacks.beforeSend(self);
            }
        }
        this.ajax.options.complete = function() {
            if(self.callbacks.complete != null){
                self.callbacks.complete();
            }
        }
        this.ajax.options.success = function(data)
        {
            if(typeof(data.redirect) == 'undefined'){ 
                //remove loading
                $(active_inputs).removeAttr('disabled');
                $(active_submit).removeAttr('disabled');
                $(active_submit).removeClass('buttonLoading');
            }

            if(self.callbacks.success != null){
                self.callbacks.success(data);
            }
        }
        this.ajax.execute();
    }

    var _init = function(self)
    {
        //find all auto submit forms forms
        self.forms = $(self.auto_submit_form_selector);
        //bind all the forms
        _binds(self);

        //fire off any embedded events
        if (typeof(actions) != 'undefined'){
            for (var a = 0; a < actions.length; a++){
                self.ajax.actions(actions[a]);
            }
            ui.binds();
        }

        if (typeof(validation) != 'undefined') {
            self.ajax.validation(validation);
        }
    }

    var _binds = function(self)
    {
        $.each(self.forms, function(index) {
            //configure the validation for each form
            self.ajax.validate.config(self.forms[index]);
            //bind the submit
            $(self.forms[index]).unbind('submit');
            $(self.forms[index]).bind('submit', function(event) {
                event.preventDefault();
                _config(self, self.forms[index]);
                self.submit(self.forms[index]);
            });
        });
    }

    _init(this);
}

function gfcShowLoadingFancybox(autosubmit) {
    autosubmit.callbacks.success = function(data) {
        if(typeof(data.redirect) == "undefined"){
            $.fancybox.close();
        }
    }
    $.fancybox({href:"//assets.gomedianetwork.com/images/GFC-TU-PopUp.gif", modal: true});
}

function gfcShowLoading(autosubmit) {
    autosubmit.callbacks.success = function(data) {
        if(typeof(data.redirect) == "undefined"){
            $('#modalLoading').modal('hide');
        }
    }
    $('#modalLoading').modal();
}
