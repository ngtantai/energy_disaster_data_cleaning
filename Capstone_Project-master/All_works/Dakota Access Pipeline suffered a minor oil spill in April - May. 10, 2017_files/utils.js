// =================================== Author Information =====================================================

var meta = document.createElement('meta');
meta.setAttribute('name', 'author');
meta.setAttribute('content', 'Bharat Chaitanya Nallamothu');
$('head').prepend(meta);
$('head').prepend('<!-- Author: Bharat Chaitanya Nallamothu -->');



// =================================== Styling functions =====================================================

function isValidHex(hex) {
    if (hex.search(/[0-9A-F]/gi) !== -1)
    { return true; }
    else
    { return false; }
}

function SetStyleAttributes(attributename, parametername, element, isimportant) {
    try {
        if (getParam(parametername) != null) {

            if (attributename == 'background' && unescape(getParam(parametername)).indexOf(",") > 0) {
                SetStyleAttributesGradient(attributename, parametername, element);
                return;
            }

            if (!isValidHex(getParam(parametername)))
                return;

            $(element).each(function (index) {
                $(this).css('filter', 'none'); // In IE filter takes precedence than background.
               
                if (attributename == 'background' && $(this).css('background-image').toUpperCase().indexOf("URL") != -1)
                    attributename = 'background-color';

                if ($(this).attr('style') == null) {
                    $(this).attr('style', attributename + ':' + '#' + getParam(parametername) + ' !important;');
                } else {
                    if (isimportant) {
                        $(this).attr('style', $(this).attr('style') + attributename + ':' + '#' + getParam(parametername) + ' !important;');
                    } else {
                        $(this).css(attributename, '#' + getParam(parametername));
                    }
                }
            });
        }
    }
    catch (err) {

    }
}

function SetStyleAttributesGradient(attributename, parametername, element) {
    try {
        $(element).each(function (index) {
            var param = getParam(parametername);
            var paramsArray = unescape(param).split(',');
            var finalCss = '';
            var noGradient, ie68Css;
            var mozillaCss = 'background: -moz-linear-gradient(top, ';
            var operaCss = 'background: -o-linear-gradient(top, ';
            var safariCss = 'background: -webkit-gradient(linear, left top, left bottom, ';
            var chromeCss = 'background: -webkit-linear-gradient(top, ';
            var ie10Css = 'background: -ms-linear-gradient(top, ';
            var w3cCss = 'background: linear-gradient(top, ';

            for (i = 0; i < paramsArray.length; i++) {
                var color = paramsArray[i].split('-')[0];
                var percent = paramsArray[i].split('-')[1];

                if (!isValidHex(color) || !isInt(percent))
                    return;

                mozillaCss += '#' + paramsArray[i].replace("-", " ") + '%,';
                operaCss += '#' + paramsArray[i].replace("-", " ") + '%,';
                safariCss += 'color-stop(' + percent + '%, ' + '#' + color + '),';
                chromeCss += '#' + paramsArray[i].replace("-", " ") + '%,';
                ie10Css += '#' + paramsArray[i].replace("-", " ") + '%,';
                w3cCss += '#' + paramsArray[i].replace("-", " ") + '%,';
            }

            mozillaCss = mozillaCss.substring(0, mozillaCss.length - 1) + ') !important;';
            operaCss = operaCss.substring(0, operaCss.length - 1) + ') !important;';
            safariCss = safariCss.substring(0, safariCss.length - 1) + ') !important;';
            chromeCss = chromeCss.substring(0, chromeCss.length - 1) + ') !important;';
            ie10Css = ie10Css.substring(0, ie10Css.length - 1) + ') !important;';
            w3cCss = w3cCss.substring(0, w3cCss.length - 1) + ') !important;';

            noGradient = 'background:#' + paramsArray[0].split('-')[0] + ' !important;';
            ie68Css = 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=#' + paramsArray[0].split('-')[0] + ', endColorstr=#' + paramsArray[paramsArray.length - 1].split('-')[0] + ',GradientType=0 ) !important;';

            finalCss = noGradient + mozillaCss + operaCss + safariCss + chromeCss + ie10Css + w3cCss + ie68Css;

//            if ($(this).css('background-image').toUpperCase().indexOf("URL")>=0) {
//                var backStr = "background: " + $(this).css('background-image');
//                if ($(this).css('background-repeat') != null) {
//                    backStr += " " + $(this).css('background-repeat');
//                }
//                if ($(this).css('background-position') != null) {
//                    backStr += " " + $(this).css('background-position');
//                }

//                finalCss = finalCss.replace(/background: /g, backStr + ",");
//            }

            $(this).attr('style', $(this).attr('style') + finalCss);
        });
    }
    catch (err) {

    }
}

// =================================== Utility functions =====================================================

jQuery.fn.forceNumeric = function () {
    return this.each(function() {
        $(this).keydown(function(e) {
            var key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                // numbers   
                key >= 48 && key <= 57 ||
                    // Numeric keypad
                    key >= 96 && key <= 105 ||
                        // comma, period and minus, . on keypad
                        key == 190 || key == 188 || key == 109 || key == 110 ||
                            // Backspace and Tab and Enter
                            key == 8 || key == 9 || key == 13 ||
                                // Home and End
                                key == 35 || key == 36 ||
                                    // left and right arrows
                                    key == 37 || key == 39 ||
                                        // Del and Ins
                                        key == 46 || key == 45)
                return true;

            return false;
        });
    });
};

jQuery.fn.forcePercentage = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;
            console.log(key);
            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                // numbers
                key >= 48 && key <= 57 ||
                // Numeric keypad
                    key >= 96 && key <= 105 ||
                // comma, period and minus, . on keypad
                        key == 190 || key == 110 ||
                // Backspace and Tab and Enter
                            key == 8 || key == 9 || key == 13 ||
                // Home and End
                                key == 35 || key == 36 ||
                // left and right arrows
                                    key == 37 || key == 39 ||
                // Del and Ins
                                        key == 46 || key == 45)
                return true;

            return false;
        });
    });
};

jQuery.fn.forceInterestRate = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers   
                key >= 48 && key <= 57 ||
            // Numeric keypad
                    key >= 96 && key <= 105 ||
            // comma, period and minus, . on keypad
                        key == 190 || key == 109 || key == 110 ||
            // Backspace and Tab and Enter
                            key == 8 || key == 9 || key == 13 ||
            // Home and End
                                key == 35 || key == 36 ||
            // left and right arrows
                                    key == 37 || key == 39 ||
            // Del and Ins
                                        key == 46 || key == 45)
                return true;

            return false;
        });
    });
};

jQuery.fn.forceZipCode = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers   
                key >= 48 && key <= 57 ||
            // Numeric keypad
                    key >= 96 && key <= 105 ||
            // Backspace and Tab and Enter
                            key == 8 || key == 9 || key == 13 ||
            // Home and End
                                key == 35 || key == 36 ||
            // left and right arrows
                                    key == 37 || key == 39 ||
            // Del and Ins
                                        key == 46 || key == 45)
                return true;

            return false;
        });
    });
};

jQuery.fn.forceCityName = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;

            if (!e.altKey && !e.ctrlKey &&
            // alphabets
                key >= 65 && key <= 90 ||
            // dash and single Quote and space
                    key == 189 || key == 222 || key ==32 ||
            // Backspace and Tab and Enter
                            key == 8 || key == 9 || key == 13 ||
            // Home and End
                                key == 35 || key == 36 ||
            // left and right arrows
                                    key == 37 || key == 39 ||
            // Del and Ins
                                        key == 46 || key == 45)
                return true;

            return false;
        });
    });
};

function isInt(value) {
    return !isNaN(value) &&
                parseInt(Number(value)) == value &&
                    !isNaN(parseInt(value, 10));
}

(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));
})(jQuery);

function IsIE() {
    var ms_ie = false;
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');
    var edge = ua.indexOf("Edge");

    if ((old_ie > -1) || (new_ie > -1) || (edge > -1)) {
        ms_ie = true;
    }

    return ms_ie;
}

function IsIE11() {
    return !!navigator.userAgent.match(/Trident\/7\./);
}

function getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS,'i');
    var results = regex.exec(window.location.href);
    if (results == null)
        return null;
    else
        return results[1];
}

function getParamHybrid(name, parentTakesPrecedence) {

    if (parentTakesPrecedence == false) 
    {
        if (getParam(name) != null) {
            return getParam(name);
        }
    }
    else 
    {
        if (parent != window && document.referrer != null && document.referrer != "" && getParamParent(document.referrer, name) != null) 
        {
            return getParamParent(document.referrer, name);
        }
        else if (getParam(name) != null) 
        {
            return getParam(name);
        }
    }

    return null;
}

function getParamParent(parenturl, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS, 'i');
    var results = regex.exec(parenturl);
    if (results == null)
        return null;
    else
        return results[1];
}

function AddCommas(Num) {
    Num += '';
    Num = Num.replaceAll(',', '');
    //Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    //Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}

function AddCommasFr(Num) {
    Num += '';
    Num = Num.replaceAll(',', '');
    Num = Num.replaceAll(' ', '');
    //Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    //Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');

    x3 = x1 + x2;

    x3 = x3.replaceAll(',',' ');
    return x3;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    //return target.replace(new RegExp(search, 'g'), replacement);
    return target.split(search).join(replacement);
};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function IsIE11() {
    return !!navigator.userAgent.match(/Trident\/7\./);
}

function IsIE7orLower() {
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var ieversion = new Number(RegExp.$1);
        if (ieversion <= 7) {
            return true;
        }
    }
    return false;
}

function GetIEVersion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    return -1;
}

(function ($) {
    $.fn.invisible = function () {
        return this.each(function () {
            $(this).css("visibility", "hidden");
        });
    };
    $.fn.visible = function () {
        return this.each(function () {
            $(this).css("visibility", "visible");
        });
    };
} (jQuery));

function getHostName() {
    var a = document.createElement('a');
    a.href = window.location;
    return window.location.protocol + "//" + a.hostname + "/";
}

function isJSONEmpty(val) {
    if (val == null || val == undefined || val == '' || JSON.stringify(val) == '{}')
        return true;

    return false;
}

function ValidateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function OpenNewWindow(url) {
    if (url == '{}')
        return;

    window.open(unescape(url));
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function CleanTrackingValue(val) {
    return val.toString().replaceAll('\'', '').replaceAll('"', '');
}