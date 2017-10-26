/*
 * CSRF
 */
function Csrf()
{
    this.token;

    var _set_forms = function(self)
    {
        var forms = $('form');
        $.each(forms, function(index){
            $(forms[index]).find('input[name="csrf_token"]').remove();
            $(forms[index]).append(
                '<input type="hidden" name="csrf_token" value="' + self.token + '">'
            );
        });
    }

    this.init = function(token)
    {
        if(token){
            this.token = token;
        }        
        _set_forms(this);
    }

    this.init(csrf_token);
}

$(document).ready(function() {
    csrf = new Csrf();
});
