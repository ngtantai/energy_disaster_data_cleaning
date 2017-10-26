function Tracking(ajax)
{
    //setup properties
    //setup ajax stuff
    this.ajax = ajax;   
    this.ajax.options.error = false;
    this.ajax.options.success = false;
    this.trackingData = {
        screen: {
            scrollX: false,
            scrollY: false,
            width: false,
            height: false
        },
        clickCount: 0,
        embedded: null,
        dataBag: null,
        eventType: null
    }
    this.clickLimit = 128;

    this.init = function() {
        var self = this;
        //bindings
        $('[data-track-click]').off('click');
        $('[data-track-click]').on('click', function(event) {
            self.trackClick(event, this);
        });
    }

    this.trackClick = function(event, selector) {
        //track the click count
        if(this.trackingData.clickCount > this.clickLimit){
            console.log('Exceeded click tracking count.');
            return;
        } else {
            this.trackingData.clickCount++;
        }
        //set the click data
        var clickData = this.getData();
        //add embedded data
        clickData.embedded = $(selector).data('trackingData');
        clickData.dataBag = this.getBag(selector);
        clickData.eventType = $(selector).data('trackingEventType');
        clickData.click_event = {
            x: event.pageX,
            y: event.pageY
        }
        //send the data
        delete clickData.clickCount;
        this.ajax.get('/tracking/click', clickData);
    }

    this.getData = function() {
        //add the screen data at the time of the event
        this.trackingData.screen.height = window.innerHeight;
        this.trackingData.screen.width = window.innerWidth;
        this.trackingData.screen.scrollX = window.scrollX;
        this.trackingData.screen.scrollY = window.scrollY;
        return this.trackingData;
    }

    this.getBag = function(selector)
    {
        var bagName = $(selector).data('trackingBag');
        var bagKey = "tracking-bag-"+bagName+"-item";
        var bagItems = $("[data-"+bagKey+"]");
        var bag = [];
        $.each(bagItems, function(index) {
            bag.push($(bagItems[index]).data(bagKey));
        });
        return bag;
    }

    //fire
    this.init();
}
