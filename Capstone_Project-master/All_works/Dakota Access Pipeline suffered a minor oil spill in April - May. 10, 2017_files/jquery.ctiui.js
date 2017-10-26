//file to collect all dom ready functions used on various pages
function Ui(){

    //set up variables for different types of credit cards per client
     this.credit_card_types = {
        'tu' : {
            'mastercard' : 'MC',
            'visa' : 'VI',
            'amex' : 'AX',
            'discover' : 'DI'
        },
        'll' : {
            'mastercard' : 'MASTERCARD',
            'visa' : 'VISA',
            'amex' : 'AMEX',
            'discover' : 'DISCOVER'
        },
        'eq' : {
            'mastercard' : 'MASTERCARD',
            'visa' : 'VISA',
            'amex' : 'AMEX',
            'discover' : 'DISCOVER'
        }
    };

    this.init = function(){
        //this just sets up the jquery function
        _autotab();
        this.binds();
        this.autoFocus();
        this.pageLoaded();
        if (_are_cookies_enabled()==false) {
            $('#mustHaveCookies').modal();
        }
        $("[data-toggle=tooltip]").tooltip();
        $("[data-toggle=popover]").popover();

    }
    
    //General binding and unbinding function.
    //This function is called on page load an after each ajax response.
    //If you add a bind, be sure to add the unbind before
    this.binds = function(){
        var self = this;
        //home same a billing form input toggles
        $("input:radio[name=homesameasbilling]").unbind('change');
        $("input:radio[name=homesameasbilling]").bind('change', function(){
            self.toggleBillingAddress();
        });
        //address changed in last six months
        $("input:radio[name=lived_more_six_months]").unbind('change');
        $("input:radio[name=lived_more_six_months]").change(function () {
            self.toggleLastAddress();
        });
        //specify element to autotab
        $.when($('[data-autotab]')).then(function() {
            // get all child input ids
            var containers = $('[data-autotab]');
            // iterate through each autotab container and apply autotab function to its child inputs    
            $(containers).each(function() {
                var inputs = $(this).find('input'),
                    inputIds = [];
                // iterate through each input and add its id to an array
                $(inputs).each(function() {
                    var elId = '#'+this.id;
                    inputIds.push(elId);
                })
                // make array comma separated values
                inputIds = inputIds.join(",");
                // enable autotab
                $(inputIds).autotab('destroy');
                $(inputIds).autotab();
            })
        });
        //print terms pop out
        $('#printTerms').unbind('click');
        $('#printTerms').bind('click', function(){
            self.printPopOut($('#termsContent'));
        });

        //allow other elements to call the print function
        $('[data-print]').unbind('click');
        $('[data-print]').bind('click', function(){
            self.printPopOut($($(this).data("print")));
        });

        //show terms
        $('#showTerms').unbind('click');
        $('#showTerms').bind('click', function() {
            $('.termsArea').toggle();
        });
        //cc type automation
        $('input[name="cc_num"]').unbind('keyup change blur');
        $('input[name="cc_num"]').bind('keyup change blur', function(){
            self.setCreditCardType(this);
        });

        //dob change
        $('[name^="dateofbirth"]').unbind("change");
        $('[name^="dateofbirth"]').bind('change',function() {
            self.updateDobOptions();
        });

        //dob change
        $('[name^="cc_exp_month"]').unbind("change");
        $('[name^="cc_exp_month"]').bind('change',function() {
            self.updateCcExpYear();
        });
        
        //EQ Login form submit
        $('#eqFormSubmit').unbind('click');
        $('#eqFormSubmit').bind('click', function(){
            _eq_login_submit();
        });

        //Allow other links to form submit
        $('[data-form-submit]').unbind('click');
        $('[data-form-submit]').bind("click", function () {
            self.formSubmit($(this));
        });
    }

    this.toggleBillingAddress = function(){
        var val_check = $("input:radio[name=homesameasbilling]:checked").val();
        if (val_check == "no") {
            $("#toggled-fields").show();
            $("#toggled-fields input, #toggled-fields select").val("");
        } else {
            $("#toggled-fields").hide();
            $("#billing_address1").val($("#address1").val());
            $("#billing_city").val($("#city").val());
            $("#billing_state").val($("#state").val());
            $("#billing_zip").val($("#zip").val())
        }
    }

    this.toggleLastAddress = function(){
        var val_check = $("input:radio[name=lived_more_six_months]:checked").val();
        if (val_check == "no") {
            $("#toggled-fields").show();
            $("#toggled-fields input, #toggled-fields select").val("");
        } else {
            $("#toggled-fields").hide();
            $("#prev_address1").val($("#address1").val());
            $("#prev_city").val($("#city").val());
            $("#prev_state").val($("#state").val());
            $("#prev_zip").val($("#zip").val())
        }
    }

    //print pop out
    this.printPopOut = function(element) {
        //document.getElementById("demo").innerHTML = "Hello World";
        w=window.open();
        w.document.write(element.html());
        w.print();
        w.close();
    }

    this.setCreditCardType = function(ccNumElement){
        //if there exists a credit card type field
        if ($('input[name="cc_type"]').length >= 1 && $('input[name="cc_num"]').val().length >= 4) {
            //get client from data attribute of form
            var client = $(ccNumElement).closest('form').data("client");
            //get credit card type based on credit card number
            var ccType = _getCreditCardTypeByNumber($('input[name="cc_num"]').val());
            if(ccType){
                //get the value required for the specific client
                var ccTypeValue = this.credit_card_types[client][ccType];
                $('input[name="cc_type"]').val(ccTypeValue);
            }
        }
    }

    //adjust dob day and year options when month is changed
    this.updateDobOptions = function(){
        var today = new Date();

        //init
        var year, month, day, birthdate;

        //selected values
        year  = parseInt($('[name="dateofbirthyear"]').val());
        month = parseInt($('[name="dateofbirthmonth"]').val(), 10) - 1;
        day   = parseInt($('[name="dateofbirthday"]').val(), 10);

        //empty options
        $('select[name="dateofbirthyear"] > option').remove();
        $('select[name="dateofbirthday"] > option').remove();

        //18 years ago
        var start = today.getFullYear()-18;

        //birthday hasn't happened yet
        (month > today.getMonth()) && start--;
        (month == today.getMonth() && day > today.getDate()) && start--;

        $('select[name="dateofbirthyear"]').append('<option value="0">Year</option>');

        //18-125 years ago
        for (var i=0; i<107; i++) {
            $('select[name="dateofbirthyear"]').append('<option value="'+start+'">'+start+'</option>');
            start--;
        }

        //reset to selected year
        $('select[name="dateofbirthyear"]').val(year);

        var days;

        //days in month
        switch (month) {
            case 0: //jan
            case 2: //mar
            case 4: //may
            case 6: //jul
            case 7: //aug
            case 9: //oct
            case 11: //dec
                days = 31;
                break;
            case 1: //feb
                days = 28;
                ( (2036-year)%4 == 0 ) && days++; //leap year
                break;
            case 3: //apr
            case 5: //jun
            case 8: //sep
            case 10: //nov
                days = 30;
                break;
        }

        //set default
        $('select[name="dateofbirthday"]').append('<option value="0">Day</option>');
        var pad = function (n) {
            return (n<10&&n>0) ? '0'+n : n
        };

        //append options
        for (var i=1; i<=days; i++) {
            var value = pad(i);
            $('select[name="dateofbirthday"]').append('<option value="'+value+'">'+i+'</option>');
        }

        //reset to selected day
        $('select[name="dateofbirthday"]').val(pad(day));

    }

    //adjust cc_exp year when month is changed
    this.updateCcExpYear = function() {

        //get current date
        var today = new Date();

        //get selected month
        var skip = 1;
        if($('form').data('client') == 'tu'){
            skip = 2
        }
        var selectedMonth = parseInt($('[name="cc_exp_month"]').val(), 10) - skip;

        //if selected month is before current month
        if (selectedMonth<today.getMonth()) {

            //remove current year as option
            $("#cc_exp_year option[value='"+today.getFullYear()+"']").remove();

        }
        else {//otherwise selected month is after current month

            //if we have already removed current year then add it back in
            if ($("#cc_exp_year option[value='"+today.getFullYear()+"']").length < 1) {

                $('#cc_exp_year option:first').after($('<option />', { "value": today.getFullYear(), text: today.getFullYear()}));

            }
        }
    }

    //autoFocus on the first input
    this.autoFocus = function() {
        $('form').find('input[type=text],textarea,select').filter(':visible:first').focus();
    }

    //allow second button to trigger form submit
    this.formSubmit = function (element) {
        var formId = element.data("form-submit");
        if ($('#' + formId).length > 0) {
            if (element.data("target")) {
                $('#' + formId).attr("target", element.data("target"));
            }
            $('#' + formId).trigger("submit");
        }
    }

    //functions to run once the page has been loaded
    this.pageLoaded = function() {

        //move terms content into the terms modal
        $('#modalServiceAgreement').on('show.bs.modal', function (event) {
            var modal = $(this)
            modal.find('.modal-body #termsContentModal').html($('#termsContent').html())
        })
    }

    _getCreditCardTypeByNumber = function(accountNumber) {
        var dc = [6011, 622126, 622127, 
            622129, 62213, 62214, 62215,
            62216, 62217, 62218, 62219,
            6222, 6223, 6224, 6225, 6226,
            6227, 6228, 62290, 62291,
            622920, 622921, 622922, 622923,
            622924, 622925, 644, 645, 646,
            647, 648, 649, 65];
        var pattern = '^(?=' + dc.join('|') + ')\\d+$';
        var re = new RegExp(pattern);
        //start without knowing the credit card type
        var result = false;
        //first check for MasterCard
        if (/^5[1-5]\d{14}$/.test(accountNumber)) {
            result = "mastercard";
        } else if (/^4\d{15}$/.test(accountNumber)) {
            result = "visa";
        } else if (/^3[47]\d{13}$/.test(accountNumber)) {
            result = "amex";
        } else if (re.test(accountNumber)) {
            result = "discover";
        }
        return result;
    }

    _autotab = function(){
        $.fn.autotab = function(focus) {
            for (var i = 0; i < this.length; i++) {
                var n = i + 1;
                var p = i - 1;
                if (i > 0 && n < this.length) $(this[i]).autotabFunction({
                    target: $(this[n]),
                    previous: $(this[p])
                });
                else if (i > 0) $(this[i]).autotabFunction({
                    previous: $(this[p])
                });
                else $(this[i]).autotabFunction({
                    target: $(this[n])
                });
                if (focus != null && (isNaN(focus) && focus == $(this[i]).attr('id')) || (!isNaN(focus) && focus == i)) $(this[i]).focus()
            }
            return this
        };
        $.fn.autotabFunction = function(options) {
            var defaults = {
                maxlength: 2147483647,
            };
            $.extend(defaults, options);
            var maxlength = $(this).attr('maxlength');
            if (defaults.maxlength == 2147483647 && maxlength != 2147483647) {
                defaults.maxlength = maxlength
            } else if (defaults.maxlength > 0) {
                $(this).attr('maxlength', defaults.maxlength)
            } else {
                defaults.target = null
            }
            return $(this).bind('keydown', function(e) {
                if (e.which == 8 && this.value.length == 0 && defaults.previous) {
                    defaults.previous.focus().val(defaults.previous.val())
                }
            }).bind('keyup', function(e) {
                var keys = [8, 9, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];
                if (e.which != 8) {
                    var val = $(this).val();
                    if ($.inArray(e.which, keys) == -1 && val.length == defaults.maxlength && defaults.target) {
                        defaults.target.focus()
                    }
                }
            })
        };
    }

    _are_cookies_enabled = function () {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
        {
            document.cookie="testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    }

    _eq_login_submit = function() {
        //show the eq redirect modal
        $('div#eqPopup').modal('show');
        $('#gotoEq').submit();
    }

    this.init();
}
