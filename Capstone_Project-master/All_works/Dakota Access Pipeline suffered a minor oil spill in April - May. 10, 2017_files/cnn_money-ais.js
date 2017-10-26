//CNN Money AdFuel Modules
//
//Deployed: 2017-09-08 20:09:23

////////////////////////////////////////////
//A9 1.3
////////////////////////////////////////////

/*!
    Amazon A9 AdFuel Module - Version 1.3
    - Updated PubId Switching Logic
!*/
(function createAdFuelModule() {

    var objectProto = Object.prototype;
    var toString = objectProto.toString;
    var noop = function() {};

    var MODULE_NAME = "Amazon A9";

    var metricApi = {
        metrics: {},
        addMetric: noop,
        getMetricById: noop,
        getMetricsByType: noop,
        getMetricTypes: noop
    };

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    function readCookie(name) {
        if (!document.cookie) {
            // there is no cookie, so go no further
            return null;
        } else { // there is a cookie
            var ca = document.cookie.split(';');
            var nameEQ = name + "=";
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    //delete spaces
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }
    }

    function getViewport() {
        var viewportWidth;
        var viewportHeight;
        if (typeof window.innerWidth != 'undefined') {
            viewportWidth = window.innerWidth,
            viewportHeight = window.innerHeight;
        } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            viewportWidth = document.documentElement.clientWidth,
            viewportHeight = document.documentElement.clientHeight;
        } else {
            viewportWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportHeight = document.getElementsByTagName('body')[0].clientHeight;
        }
        return [viewportWidth, viewportHeight];
    }

    var log = noop;
    var logTime = noop;
    var logTimeEnd = noop;

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function( /* arguments */ ) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ']'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
        logTime = function( /* arguments */ ) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' TIMER] '];
            args.push.apply(args, arguments);
            var timeKey = args.join('');
            window.console.time(timeKey);
        };
        logTimeEnd = function( /* arguments */ ) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' TIMER] '];
            args.push.apply(args, arguments);
            var timeKey = args.join('');
            window.console.timeEnd(timeKey);
        };
    }

    var countryCode = readCookie('countryCode') || (readCookie('CG') ? readCookie('CG').substr(0, 2) : '');
    log("Country Code: ", countryCode);

    var a9bids;
    var bidSlots = [];

    function keyGPTSlots(slots){
        return slots.reduce(function(o, slot){
            var slotId = slot.getSlotElementId();
            o[slotId] = slot;
            return o;
        }, {});
    }

    function handleA9Bids(bids, gptSlots, done){
        log("Handling A9 Bids:", bids, gptSlots);
        logTime("Handling A9 Bids");
        window.googletag.cmd.push(function(){
            function getURLParam(name) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)";
                var regex = new RegExp(regexS);
                if (document.location.search) {
                    var results = regex.exec(document.location.search);
                    if (results) {
                        return results[1];
                    } else {
                        return "";
                    }
                } else {
                    return "";
                }
            }
            var slots = keyGPTSlots(gptSlots);
            bids.forEach(function(bid){
                var gptSlot = slots[bid.slotID] || null;
                if (gptSlot !== null){
                    var targets = {};
                    window.apstag.targetingKeys('display').forEach(function(key){
                        if (getURLParam("debug") == "true"){
                            console.log("[AdFuelModule - Amazon A9] Setting A9 Targeting: ", {key: key, value: bid[key]});
                        }
                        targets[key] = bid[key];
                        gptSlot.setTargeting(key, bid[key]);
                    });      
                    metricApi.addMetric({
                        type: 'vendor',
                        id: 'Amazon A9',
                        data: {targeting: targets}
                    });
                }
            })
        });
        window.googletag.pubads().addEventListener('slotRenderEnded', function(e){
            var gptSlots = keyGPTSlots(window.googletag.pubads().getSlots());
            var gptSlot = gptSlots[e.slot.getSlotElementId()];
            window.apstag.targetingKeys('display').forEach(function(key){
                gptSlot.setTargeting(key, '');
            });
        });
        logTimeEnd("Handling A9 Bids");
        done();
    }

    function preQueueCallback(asset, done){
        logTime("A9 Slot Building");
        // Only sizes in this array will be sent in the request to Amazon.
        var validSizes = [ '160x600', '300x250', '300x600', '320x50', '728x90', '970x90', '970x250' ];
        // Any slot id with any of the following slot types will be excluded from the request to Fastlane.
        var invalidMappings = [ '_ns_', '_nfs_' ];
        // Any slot with any of the following ad unit segments in the slot ad unit will be excluded from the request to Fastlane.
        var invalidAdUnitSegments = [ 'super-ad-zone', 'super_ad_zone' ];
        var browser = getViewport();
        log("Browser Dimensions: ", browser);
        for (var x = 1; x < asset.length; x++){
            var slotId = asset[x].originalElementId || asset[x].rktr_slot_id;
            var pieces = slotId.split("_");
            pieces.splice(0,1);
            slotId = pieces.join("_")
            log("Checking slot and sizes for validity: ", slotId);
            var responsiveSizes = [];
            var isValid = true;
            var viewportChecked = false;
            for (var viewportId = 0; viewportId < asset[x].responsive.length; viewportId++){
                var viewport = asset[x].responsive[viewportId];
                if (!viewportChecked) log("Checking For Responsive Viewport: ", viewport[0].join('x'));
                if (!viewportChecked && viewport[0][0] < browser[0] && viewport[0][1] < browser[1]){
                    log("Match found.");
                    viewportChecked = true;
                    responsiveSizes = viewport[1];
                    if (viewport[1][0] == "suppress" || responsiveSizes == "suppress"){
                        log("Slot is responsive and being suppressed.  Filtering slot.");
                        isValid = false;
                    }
                }
            }
            if (responsiveSizes.length > 0 && isValid){
                 log("Slot is responsive and not being suppressed.  Using responsive sizes: ", responsiveSizes);
                 asset[x].sizes = responsiveSizes;
            }
            if (isValid){
                for (var y = 0; y < asset[x].sizes.length; y++){
                    var size = asset[x].sizes[y].join('x')
                    if (validSizes.indexOf(size) < 0){
                        log("Filtering out Invalid Size: ", size);
                        asset[x].sizes.splice(y, 1)
                        y = y - 1;
                    }
                }
                if (asset[x].sizes.length == 0){
                    log("No Valid Sizes: ", asset[x].sizes);
                    isValid = false;
                }
                for (var invalidMapping in invalidMappings) {
                    if (asset[x].rktr_slot_id.indexOf(invalidMappings[invalidMapping]) >= 0) {
                        log("Filtering out invalid slot type: ", invalidMappings[invalidMapping], asset[x]);
                        isValid = false;
                    }
                }
                for (var invalidAdUnitSegment in invalidAdUnitSegments){
                    if (asset[x].rktr_ad_id.indexOf(invalidAdUnitSegments[invalidAdUnitSegment]) >= 0) {
                        log("Filtering out invalid ad unit segment: ", invalidAdUnitSegments[invalidAdUnitSegment], asset[x]);
                        isValid = false;
                    }
                }
                if (isValid){
                    log("Valid Slot: ", asset[x]);
                    var obj = {slotID: asset[x].rktr_slot_id, sizes: asset[x].sizes};
                    bidSlots.push(obj);
                }
            }
        }
        logTimeEnd("A9 Slot Building");
        logTime("A9 Bid Fetching");
        function processBids(bids){
            logTimeEnd("A9 Bid Fetching");
            a9bids = bids;
            bidSlots = [];
            done();
        }
        if (bidSlots.length > 0){
            window.apstag.fetchBids({
                slots: bidSlots
            }, processBids);
        }else{
            log("No valid slots.");
            logTimeEnd("A9 Bid Fetching");
        }
    }

    function preDispatchCallback(asset, done){
        setTimeout(function(){
            var gptSlots = window.googletag.pubads().getSlots();
            if (a9bids) handleA9Bids(a9bids, gptSlots, done);
            if (!a9bids){
                log("No Bids.");
                done();
            }
        },500);
    }

    function preRefreshCallback(asset, done){
        a9bids = null;
        logTime("Refreshing A9 Bids");
        window.apstag.fetchBids({
            slots: bidSlots
        }, function(bids){
            a9bids = bids;
            logTimeEnd("Refreshing A9 Bids");
            var gptSlots = window.googletag.pubads().getSlots();
            handleA9Bids(a9bids,gptSlots, done)
        });
    }

    function registerModuleWithAdFuel(){
        log("Registering " + MODULE_NAME + " module with AdFuel");
        window.AdFuel.setOptions({
            queueCallbackTimeoutInMilliseconds: 1000,
            dispatchCallbackTimeoutInMilliseconds: 1000,
            refreshCallbackTimeoutInMilliseconds: 2000,
        });
        metricApi = window.AdFuel.registerModule(MODULE_NAME, {
            preQueueCallback: preQueueCallback,
            preDispatchCallback: preDispatchCallback,
            preRefreshCallback: preRefreshCallback
        }) || metricApi;
    }

    function configureA9Library(){
        !function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function()
        {q("f",arguments)},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}
        ("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");
        var pubId = 3159;
        var hostname = window.location.hostname.toLowerCase();
        log("Country Code: ", countryCode);
        if (countryCode == '' || countryCode == null){
            if (hostname.search(/^(edition|arabic|cnnespanol|cnne\-test)\./) >= 0){
                pubId = '3288';
            }
        }else if (countryCode !== 'US' && countryCode !== 'CA'){
            if (hostname.search(/^(money|edition|arabic|cnnespanol|cnne\-test|www\.cnn)\./) >= 0){
                pubId = '3288';
            }
        }
        log("Pub ID: ", pubId);
        window.apstag.init({
            pubID: pubId,
            adServer: 'googletag',
            bidTimeout: 2e3
        });

    }

    function init() {
        configureA9Library();
        if (window.AdFuel && window.AdFuel.cmd) {
            //AdFuel loaded first
            window.AdFuel.cmd.push(registerModuleWithAdFuel);
        }else if (window.AdFuel){
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener("AdFuelCreated", registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    log("Initializing " + MODULE_NAME + " Module...");
    init();

})();


////////////////////////////////////////////
//Amazon 1.1
////////////////////////////////////////////

/*! Amazon Module v1.1
  - Add Custom Target when Amazon hits timeout
  - Secure Pathing
  - Single ADMB Inclusion
*/
window.AmazonDirectMatchBuy = (function CreateAmazonModule() {

    var arrayProto = Array.prototype;
    var objectProto = Object.prototype;

    var hasOwnProperty = objectProto.hasOwnProperty;
    var slice = arrayProto.slice;
    var toString = objectProto.toString;

    function hasOwn(object, key) {
        return object != null && hasOwnProperty.call(object, key);
    }

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function once(fn) {
        return function() {
            if (fn) {
                fn.apply(this, arguments);
                fn = null;
            }
        };
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = function() {}; //noop

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function( /* arguments */ ) {
            var args = ['[AdFuelModule - Amazon]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }

    var amznkey = window.location.hostname.toLowerCase().match(/^edition\.cnn\.com/) ? "3288" : "3159";
    var timeoutForGetAdsCallback = 1000; //1 second
    var initialized = false;

    function isAmazonApiAvailable() {
        return !!window.amznads;
    }

    function refreshAdFuelPageLevelTargets(callback) {
        //remove amznslots
        log('removing PageLevelTarget: amznslots');
        window.AdFuel.removePageLevelTarget('amznslots');

        if (!isAmazonApiAvailable()) {
            return (callback ? callback() : true);
        }

        var callbackWrapper = once(function() {
            //amazon has refreshed, update AdFuel targeting
            var targeting = window.amznads.getTargeting();

            log('setting amazon targeting', targeting);

            window.AdFuel.setBulkTargeting(targeting);
            window.AdFuel.removePageLevelTarget('azn_to', '1');
            window.AdFuel.addPageLevelTarget('azn_to', '0');

            return (callback ? callback() : true);
        });

        try {
            window.amznads.getAdsCallback(amznkey, callbackWrapper, timeoutForGetAdsCallback);
        } catch (e) {
            log('Exception thrown while requesting Amazon ads:', e);
            // manually execute callback if it hasn't run
            window.AdFuel.removePageLevelTarget('azn_to', '1');
            window.AdFuel.addPageLevelTarget('azn_to', '0');
            callbackWrapper();
        }
    }

    function getTargetingData() {
        var data = {};

        if (isAmazonApiAvailable()) {
            data = window.amznads.getTargeting();
            if (!isObject(data)) {
                data = {};
            }
        }

        return data;
    }

    var keyMap = (function() {
        var map = {};

        function has(id) {
            return id in map;
        }

        function addKey(id, key) {
            if (!has(id)) {
                map[id] = [];
            }

            map[id].push(key);
        }

        function getKeys(id) {
            return has(id) ? slice.call(map[id]) : [];
        }

        function clearKeys(id) {
            if (has(id)) {
                map[id].length = 0;
                return true;
            }
            return false;
        }

        return ({
            has: has,
            clearKeys: clearKeys,
            getKeys: getKeys,
            addKey: addKey
        });
    }());

    function clearPreviousKeyValuePairs(player) {
        var playerId = player.getId();

        if (keyMap.has(playerId)) {
            var keys = keyMap.getKeys(playerId);
            if (keys.length) {
                log('clearing previous ad key-values: ' + keys.join(', '));

                for (var i = 0, endi = keys.length; i < endi; ++i) {
                    player.setAdKeyValue(keys[i], null);
                }

                keyMap.clearKeys(playerId);
            }
        }
    }

    function setAdKeyValue(player, key, value) {
        log('setting ad key-value: ' + key + ' = "' + value + '"');

        keyMap.addKey(player.getId(), key);
        player.setAdKeyValue(key, value);
    }

    function handleTargetingData(player) {
        var targeting = getTargetingData();

        // Clear previous key-value pairs.
        clearPreviousKeyValuePairs(player);

        // Set new key-value pairs.
        for (var key in targeting) {
            if (!hasOwn(targeting, key)) continue;

            var val = targeting[key];

            if (val instanceof Array) {
                // val = val.join(',');
                for (var i = 0, endi = val.length; i < endi; ++i) {
                    setAdKeyValue(player, val[i], "1");
                }
            } else {
                setAdKeyValue(player, key, val);
            }
        }
    }

    //this is only called by the CVP object
    function setAdKeyValuePairs(player) {
        if (player.getPlayerType() !== CVP.FLASH) return;

        log('setAdKeyValuePairs(player)');
        handleTargetingData(player);
    }

    /* allows optional configuration:
      
        amznkey: Turner's Amazon key (default is '3159')
        timeout: duration in milliseconds for Amazon to call GetAdsCallback (default is 2000)
    */
    function init(config) {
        log('initializing', config);

        if (config) {
            //allow overrides
            amznkey = config.amznkey || amznkey;
            timeoutForGetAdsCallback = config.timeout || timeoutForGetAdsCallback;
        }

        if (!initialized) {
            //only do this once
            initialized = true;

            function registerModuleWithAdFuel() {
                window.AdFuel.registerModule('amazon', {
                    //when dispatching or refreshing slots, set amazon targeting
                    preDispatchCallback: function(builtSlots, asyncCallback) {
                        try {
                            log('preDispatch');
                            refreshAdFuelPageLevelTargets(asyncCallback);
                        } catch (err) {
                            log('error setting targeting prior to dispatch', err);
                            asyncCallback(err);
                        }
                    },

                    preRefreshCallback: function(slotsIdsToRefresh, asyncCallback) {
                        try {
                            log('preRefresh');
                            refreshAdFuelPageLevelTargets(asyncCallback);
                        } catch (err) {
                            log('error refreshing targeting prior to refresh', err);
                            asyncCallback(err);
                        }
                    }
                });
                window.AdFuel.addPageLevelTarget('azn_to', '1');
            }

            if (window.AdFuel) {
                //AdFuel loaded first
                registerModuleWithAdFuel();
            } else {
                //wait for AdFuel to load
                if (document.addEventListener) {
                    document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
                } else if (document.attachEvent) {
                    document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
                }
            }
        }
    }

    function requireInit(fn) {
        return function() {
            if (!initialized) {
                log('ERROR: init() must be called first!');
                return;
            }

            fn.apply(this, arguments);
        };
    }

    return ({
        requestAdRefresh: requireInit(refreshAdFuelPageLevelTargets),
        getTargetingData: requireInit(getTargetingData),
        setAdKeyValuePairs: requireInit(setAdKeyValuePairs),
        isAmazonApiAvailable: isAmazonApiAvailable,
        init: init
    });

}());
(function(callback) {
    var a = document,
        b = a.createElement("script"),
        c = a.getElementsByTagName("script")[0],
        d = /^(complete|loaded)$/,
        e = false;
    b.type = "text/javascript";
    b.async = true;
    b.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//c.amazon-adsystem.com/aax2/amzn_ads.js';
    b.onload = b.onreadystatechange = function() {
        if (!e && !(('readyState' in b) && d.test(b.readyState))) {
            b.onload = b.onreadystatechange = null;
            e = true;
            callback();
        }
    };
    if (window.amznads) {
        callback();
    } else {
        c.parentNode.insertBefore(b, c);
    }
})(function() {
    window.AmazonDirectMatchBuy.init();
});

////////////////////////////////////////////
//Criteo 1.1
////////////////////////////////////////////

/*! Criteo Module v1.1
  - Add Custom Target when Criteo hits timeout
  - Prevent multiple requests on a single page view
*/

(function createAdFuelCriteoModule(){
    var priorTargetings = {};

    //backward compatibility- support registry files which reference window.crtg_content
    //if registries are executed prior to the criteo script below completing, they will need to
    //access this value, so make sure it exists
    window.crtg_content = '';

    var objectProto = Object.prototype;
    var toString = objectProto.toString;
    var scriptLoaded = false;

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = function() {}; //noop

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function(/* arguments */) {
            var args = ['[AdFuelModule - Criteo]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }

    function setTargetingForCriteo(callback) {

        var crtg_cookiename = 'crtg_trnr';
        var crtg_varname = 'crtg_content';
        var crtg_nid = '4157';
        var crtg_rnd = Math.floor(Math.random() * 99999999999);

        function crtg_getCookie(c_name) {
            var i, x, y, ARRCookies = document.cookie.split(";");
            for (i = 0; i < ARRCookies.length; i++) {
                x = ARRCookies[i].substr(0, ARRCookies[i].indexOf("="));
                y = ARRCookies[i].substr(ARRCookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return decodeURIComponent(y);
                }
            }
            return '';
        }

        function processCookie() {
            //script has executed, grab cookie
            var targetings = {};

            var crtg_content = crtg_getCookie(crtg_cookiename);

            //backward compatibility- support registry files which reference window.crtg_content
            window.crtg_content = crtg_content;

            if (crtg_content) {
                var crtg_split = crtg_content.split(";");
                for (var i = 0; i < crtg_split.length-1; i++) {
                    var pieces = crtg_split[i].split("=");
                    var key = pieces[0];
                    var value = pieces[1];

                    //save targeting
                    targetings[key] = value;

                    //add new targeting
                    if (!priorTargetings.key) {
                        window.AdFuel.addPageLevelTarget(key, value);
                    }
                }
            }

            //remove targetings no longer valid
            for (var targetingKey in priorTargetings) {
                if (priorTargetings.hasOwnProperty(targetingKey) && !targetings[targetingKey]) {
                    window.AdFuel.removePageLevelTarget(targetingKey);
                }
            }

            log('set criteo targeting', targetings);

            //save targetings, so we can reconcile them on subsequent calls
            priorTargetings = targetings;

            if (callback) {
                window.AdFuel.removePageLevelTarget('crt_to', '1');
                window.AdFuel.addPageLevelTarget('crt_to', '0');
                callback();
            }
        }

        if (!scriptLoaded){
            scriptLoaded = true;
            //add script to set Criteo cookie based on user's other cookies
            (function(callback) {
                var crtg_url = location.protocol + '//rtax.criteo.com/delivery/rta/rta.js?netId=' + encodeURIComponent(crtg_nid);
                crtg_url += '&cookieName=' + encodeURIComponent(crtg_cookiename);
                crtg_url += '&rnd=' + crtg_rnd;
                crtg_url += '&varName=' + encodeURIComponent(crtg_varname);

                var a = document,
                    b = a.createElement("script"),
                    c = a.getElementsByTagName("script")[0],
                    d = /^(complete|loaded)$/,
                    e = false;
                b.type = "text/javascript";
                b.async = true;
                b.src = crtg_url;
                b.onload = b.onreadystatechange = function() {
                    if (!e && !(('readyState' in b) && d.test(b.readyState))) {
                        b.onload = b.onreadystatechange = null;
                        e = true;                        
                        callback();
                    }
                };

                c.parentNode.insertBefore(b, c);
            })(processCookie);
        }else{
            processCookie();
        }
    }

    function init() {

        function registerModuleWithAdFuel() {
            window.AdFuel.registerModule('criteo', {
                //when dispatching or refreshing slots, set criteo targeting
                preDispatchCallback: function(builtSlots, asyncCallback) {
                    try {
                        log('preDispatch');
                        setTargetingForCriteo(asyncCallback);
                    } catch(err){
                        log('error setting targeting prior to dispatch', err);
                        asyncCallback(err);
                    }
                },

                preRefreshCallback: function(slotsIdsToRefresh, asyncCallback) {
                    try {
                        log('preRefresh');
                        setTargetingForCriteo(asyncCallback);
                    } catch(err){
                        log('error setting targeting prior to refresh', err);
                        asyncCallback(err);
                    }
                }
            });
            window.AdFuel.addPageLevelTarget('crt_to', '1');            
        }

        if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    init();

})();

////////////////////////////////////////////
//Fastlane 1.7
////////////////////////////////////////////

/*! Fastlane AdFuel Module - Version 1.7
    - Fix: HL_CREATIVE_RENDERED Listener
!*/
(function createFastlaneModule() {
    window.rubicontag = window.rubicontag || {};
    window.rubicontag.cmd = window.rubicontag.cmd || [];
    var objectProto = Object.prototype;
    var toString = objectProto.toString;

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    function getViewport() {
        var viewportWidth;
        var viewportHeight;
        if (typeof window.innerWidth != 'undefined') {
            viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight;
        } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight;
        } else {
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
        }
        return [viewPortWidth, viewPortHeight];
    }

    function readCookie(name) {

        var lsSupport = false;

        // Check for native support
        if (localStorage) {
            lsSupport = true;
        }

        // No value supplied, return value
        if (typeof value === "undefined") {
            // Get value
            if (lsSupport) { // Native support
                data = localStorage.getItem(name);
            } else { // Use cookie
                data = readTheCookie(name);
            }

            // Try to parse JSON...
            try {
               data = JSON.parse(data);
            }
            catch(e) {
               data = data;
            }

            return data;

        }
        /**
         * Returns contents of cookie
         * @param  key       The key or identifier for the store
         */
        function readTheCookie(key) {
            if (!document.cookie) {
                // there is no cookie, so go no further
                return '';
            } else { // there is a cookie
                var ca = document.cookie.split(';');
                var nameEQ = name + "=";
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        //delete spaces
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return '';
            }
        }

    };

    var log = function() {}; //noop
    var topBannerAdUnit = "";
    var disabled = false;

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function(/* arguments */) {
            var args = ['[AdFuelModule - Fastlane/Rubicon]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }

    function addFastlaneScript() {
        log("Adding Fastlane library to head of page.");
        var hostname = window.location.hostname.toLowerCase();
        var account_id = 11078;
        var espanol = hostname.search(/^cnnespanol\./) >= 0 || hostname.search(/^cnne-test\./) >= 0;
        var countryCodeCookies = ['countryCode', '_dy_geo', 'CG', 'geoData', 'kxgeo'];
        var countryCode = "";
        for (var x = 0; x < countryCodeCookies.length; x++){
            var cookieName = countryCodeCookies[x];
            countryCode = readCookie(countryCodeCookies[x]) || '';
            if (countryCode){
                switch(cookieName){
                    case "_dy_geo":
                        countryCode = countryCode.substring(0,countryCode.indexOf('.'));
                        break;
                    case "CG":
                        countryCode = countryCode.substring(0,countryCode.indexOf(':'));
                        break;
                    case "geoData":
                        countryCode = countryCode.split("|")[3];
                        break;
                    case "kxgeo":
                        countryCodeKeys = countryCode.split("&");
                        for (var y = 0; y < countryCodeKeys.length; y++){
                            if (countryCodeKeys[y].split("=")[0] == "country"){
                                countryCode = countryCodeKeys[y].split("=")[1].toUpperCase();
                            }
                        }
                        break;
                }
            }
        }
        log("Country Code: ", countryCode);
        if ((countryCode == null && hostname.search(/^(edition|arabic|cnnespanol|cnne\-test)\./) >= 0) || hostname == "arabic.cnn.com"){
            // User location is null and the site is international --or-- Site is Arabic
            log("No location - International site or Arabic")
            account_id = 11016;
        }else if (countryCode == null && hostname.search(/^(edition|arabic|cnnespanol|cnne\-test)\./) < 0)  {
            // User location is null and site is not international
            log("No location - Domestic site")
            account_id = 11078;
        }else if ((countryCode !== 'US' && countryCode !== 'CA' && countryCode.length === 2) || ((countryCode == '' || countryCode == null) && hostname.search(/^(edition|arabic|cnnespanol)\./) >= 0)) {
            // User location is international (or not set and the site is international)
            log("International Location or No Location - International site")
            account_id = 11016;
        }
        if (hostname.search(/^(money|edition|arabic|cnnespanol|cnne\-test|www\.cnn)\./) < 0){
            // Site is 100% domestic
            log("Full Domestic Site.  Disregard Location.");
            account_id = 11078;
        }else if ((countryCode == "" || countryCode == null) && hostname.search(/^(cnne\-test|cnnespanol)\./) >= 0){
            log("CNN Espanol with no location - Defaulting to International")
            account_id = 11016;
        }
        
        log("Rubicon Account ID: " + account_id);
        if (!(account_id == 11078 && espanol)){
            var rct = document.createElement('script');
            rct.type = 'text/javascript';
            rct.async = true;
            rct.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//ads.rubiconproject.com/header/' + account_id + '.js';
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.appendChild(rct);
        }else{
            disabled = true;
            log("Espanol Domestic user detected. CountryCode: " + countryCode + ".  Fastlane Disabled.");
        }
    }

    function _generateSingletonId() {
        //return_<9-digit-random-hex>
        var singletonId = '';
        for (var i = 0; i < 9; i++) {
            singletonId += Math.floor(Math.random() * 16).toString(16);
        }
        return singletonId;
    }

    function _updateSlot(slot) {

        var orig_slot_id = slot.rktr_slot_id;
        var new_slot_id = orig_slot_id;
        var idArray = orig_slot_id.split("_");
        var incrementer = idArray[idArray.length - 1];

        while (window.rubiconSlotDictionary[new_slot_id]) {
            //slot exists, so increment
            if (idArray.length == 3) {
                incrementer = _generateSingletonId();
            } else {
                incrementer = parseInt(incrementer) + 1;
                if (incrementer < 10) {
                    incrementer = "0" + String(incrementer);
                } else {
                    incrementer = String(incrementer);
                }
            }
            idArray[idArray.length - 1] = incrementer;
            new_slot_id = idArray.join("_");
        }
        log("Incrementing Div Id: ", slot.rktr_slot_id, new_slot_id);

        slot.rktr_slot_id = new_slot_id;

        return slot;
    }

    window.rubiconSlotDictionary = {};
    window.refreshableRubiconSlots = {};
    var preQueueTimeouts = [];

    function clearSlotsAndTimeout(timeout){
        clearTimeout(timeout);
        preQueueTimeouts.length = 0;
    }

    function buildSlotsForFastlane(registry, callback){
        if (!disabled){
            log("Building slots for Fastlane", JSON.stringify(registry));
            var preQueueTimeout = setTimeout(function(){
                // Track the timeout.
                log("PreQueue Timeout Occurred.");
                window.AdFuel.addPageLevelTarget('fln_pqto', '1');
            }, 1000);
            preQueueTimeouts.push(preQueueTimeout);
            window.rubicontag.cmd.push(function() {
                var rubiconSlots = [];

                for(var i = 1; i < registry.length; i++) {
                    log("Checking Slot: ", registry[i].rktr_slot_id);
                    var rocketeerSlot = registry[i];
                    var rubiconSlot;
                    if (topBannerAdUnit == "" || rocketeerSlot.rktr_slot_id.indexOf("bnr_atf_01") > 0){
                        log("Setting KW Ad Unit: ", rocketeerSlot.rktr_ad_id);
                        topBannerAdUnit = rocketeerSlot.rktr_ad_id;
                    }
                    // Any slot that is not _atf_ or _btf_ or _mod_ will be excluded from the request to Fastlane.
                    var validMappings = {
                        '_atf_': 'atf',
                        '_btf_': 'btf',
                        '_mod_': 'atf',
                    };
                    // Only sizes in this array will be sent in the request to Fastlane.
                    var validSizes = [ '160x600', '300x250', '300x600', '320x50', '728x90', '970x90', '970x250' ];
                    // Any slot id with any of the following slot types will be excluded from the request to Fastlane.
                    var invalidMappings = [ '_ns_', '_nfs_' ];
                    // Any slot with any of the following ad unit segments in the slot ad unit will be excluded from the request to Fastlane.
                    var invalidAdUnitSegments = [ 'super-ad-zone', 'super_ad_zone' ];
                    // Any slot with an ad unit that matches any of the following ad units will be excluded from the request to Fastlane.
                    var invalidAdUnits = [ 'CNN/health', 'CNN/health/healthgrades', 'CNN/health/leaf', 'CNN/health/list', 'CNN/health/photos', 'CNN/health/specials', 'CNN/health/video', 'CNN/student-news' ];


                    //require valid mapping match
                    for (var validMapping in validMappings) {
                        if (validMappings.hasOwnProperty(validMapping)) {
                            if (rocketeerSlot.rktr_slot_id && rocketeerSlot.rktr_slot_id.indexOf(validMapping) >= 0) {
                                var isValid = true;
                                var viewportChecked = false;
                                //exclude invalid mapping matches
                                for (var invalidMapping in invalidMappings) {
                                    if (rocketeerSlot.rktr_slot_id.indexOf(invalidMappings[invalidMapping]) >= 0) {
                                        log("Filtering out invalid slot type: ", invalidMappings[invalidMapping], rocketeerSlot);
                                        isValid = false;
                                    }
                                }
                                for (var invalidAdUnitSegment in invalidAdUnitSegments){
                                    if (rocketeerSlot.rktr_ad_id.indexOf(invalidAdUnitSegments[invalidAdUnitSegment]) >= 0) {
                                        log("Filtering out invalid ad unit segment: ", invalidAdUnitSegments[invalidAdUnitSegment], rocketeerSlot);
                                        isValid = false;
                                    }
                                }
                                for (var invalidAdUnit in invalidAdUnits){
                                    if (rocketeerSlot.rktr_ad_id == invalidAdUnits[invalidAdUnit]) {
                                        log("Filtering out invalid ad unit: ", invalidAdUnits[invalidAdUnit], rocketeerSlot);
                                        isValid = false;
                                    }
                                }
                                var responsiveSizes = [];
                                for (var viewportId = 0; viewportId < rocketeerSlot.responsive.length; viewportId++){
                                    var browser = getViewport();
                                    var viewport = rocketeerSlot.responsive[viewportId];
                                    if (!viewportChecked && viewport[0][0] < browser[0] && viewport[0][1] < browser[1]){
                                        viewportChecked = true;
                                        responsiveSizes = viewport[1];
                                        if (viewport[1][0] == "suppress" || responsiveSizes == "suppress"){
                                            isValid = false;
                                        }
                                    }
                                }
                                if (isValid && responsiveSizes.length > 0){
                                    log("Setting Sizes To Responsive Sizes: ", responsiveSizes);
                                    rocketeerSlot.sizes = responsiveSizes;
                                }
                                if (isValid) {
                                    for (var rocketeerSize = 0; rocketeerSize < rocketeerSlot.sizes.length; rocketeerSize++){
                                        var matchingSize = rocketeerSlot.sizes[rocketeerSize];
                                        if (matchingSize !== "suppress"){
                                            matchingSize = matchingSize.join('x');
                                        }
                                        if (validSizes.indexOf(matchingSize) < 0) {
                                            log("Filtering out invalid size: ", matchingSize, rocketeerSlot);
                                            rocketeerSlot.sizes.splice(rocketeerSize, 1);
                                        }
                                    }
                                }
                                if (rocketeerSlot.sizes.length == 0){
                                    isValid = false;
                                    log("Filtering out slot with no valid sizes.", rocketeerSlot.rktr_slot_id, rocketeerSlot.rktr_ad_id);
                                }
                                if (isValid) {
                                    log("Slot is a valid item for Rubicon Fastlane.");
                                    var foldPosition = validMappings[validMapping];
                                    var alreadyRendered = document.getElementById(rocketeerSlot.rktr_slot_id) ? document.getElementById(rocketeerSlot.rktr_slot_id).className.indexOf("adfuel-rendered") >= 0 : false;
                                    log("Checking for cached Fastlane response for: ", rocketeerSlot.rktr_slot_id);
                                    if (typeof window.rubiconSlotDictionary[rocketeerSlot.rktr_slot_id] == "undefined" && !alreadyRendered){
                                        log("Cached response not found. Defining Slot: ", "/8664377/" + rocketeerSlot.rktr_ad_id, rocketeerSlot.sizes, rocketeerSlot.rktr_slot_id);
                                        rubiconSlot = window.rubicontag.defineSlot("/8664377/" + rocketeerSlot.rktr_ad_id, rocketeerSlot.sizes, rocketeerSlot.rktr_slot_id);
                                        log("Setting Position: ", foldPosition);
                                        rubiconSlot.setPosition(foldPosition);
                                        var slotTargets = rocketeerSlot.targeting;
                                        for (var tIndex = 0; tIndex < slotTargets.length; tIndex++){
                                            var target = slotTargets[tIndex];
                                            if (target[0] == "pos") {
                                                if (Array.isArray(target[1])) {
                                                    log('Setting POS Keyword For '+ rocketeerSlot.rktr_slot_id, target[1][0]);
                                                    rubiconSlot.setFPI('pos', target[1][0]);
                                                } else {
                                                    log('Setting POS Keyword For '+ rocketeerSlot.rktr_slot_id, target[1]);
                                                    rubiconSlot.setFPI('pos', target[1]);
                                                }
                                            }
                                        }
                                        log('Setting Keyword For ' + rocketeerSlot.rktr_slot_id, rocketeerSlot.rktr_ad_id);
                                        rubiconSlot.addKW(rocketeerSlot.rktr_ad_id);
                                        rubiconSlots.push(rubiconSlot);
                                        window.rubiconSlotDictionary[rocketeerSlot.rktr_slot_id] = rubiconSlot;
                                    }else if (typeof window.rubiconSlotDictionary[rocketeerSlot.rktr_slot_id] == "undefined" && alreadyRendered){
                                        log("Element has already been rendered with an ad.  Skipping Fastlane auction for: ", rocketeerSlot.rktr_slot_id);
                                    }else{
                                        log("Using cached Fastlane response for: ", rocketeerSlot.rktr_slot_id);
                                    }
                                }
                            }
                        }
                    }
                }
                var adUnitPieces = topBannerAdUnit.split("/");
                var adUnitPieceNames = ['site', 'section', 'subsection'];
                for (var y = 0; y < adUnitPieces.length && y < 3; y++) {
                    log('Setting FPI', adUnitPieceNames[y], adUnitPieces[y]);
                    window.rubicontag.setFPI(adUnitPieceNames[y], adUnitPieces[y]);
                }
                if (window.CNN && window.CNN.getCapTopics){
                    window.rubicontag.setFPI('cap_topics', Object.getOwnPropertyNames(window.CNN.getCapTopics()));
                }
                window.rubicontag.setFPI('ssl', document.location.protocol === 'https:' ? 1 : 0);
                window.rubicontag.run(function() {
                    clearSlotsAndTimeout(preQueueTimeout);
                    callback();
                }, {slots: rubiconSlots});
            });
        }else{
            log("Not building slots. Fastlane disabled.");
            callback();
        }
    }

    function setTargetingForFastlane(slots) {
        if (!disabled){
            log("setting fastlane targeting");
            window.googletag.cmd.push(function(){
                var gptSlots = window.AdFuel.pageSlots;
                log({slots: slots, gptSlots: gptSlots});
                var addedTargeting = {};
                for (var x = 0; x < slots.length; x++) {
                    var slot = slots[x];
                    log("Slot ID: ", slot.rktr_slot_id);
                    if (gptSlots[slot.rktr_slot_id]) {
                        var gptSlot = gptSlots[slot.rktr_slot_id];
                        if (window.rubicontag && window.rubicontag.setTargetingForGPTSlot){
                            log("calling window.rubicontag.setTargetingForGPTSlot...");
                            window.rubicontag.setTargetingForGPTSlot(gptSlot);
                            window.refreshableRubiconSlots[slot.rktr_slot_id] = window.rubiconSlotDictionary[slot.rktr_slot_id];
                            delete window.rubiconSlotDictionary[slot.rktr_slot_id];
                            var targeting = gptSlot.getTargetingKeys();
                            var data = {};
                            var timeoutTargetSet = false;
                            for (var y = 0; y < targeting.length; y++) {
                                if (targeting[y].indexOf("rpfl_") >= 0) {
                                    log("removing fln_to=1 and setting fln_to=0 for "+gptSlot.getSlotElementId());
                                    if (!timeoutTargetSet){
                                        window.AdFuel.addSlotLevelTarget(gptSlot.getSlotElementId(), 'fln_to', '0');
                                        timeoutTargetSet = true;
                                    }
                                    log("Setting Fastlane Targeting...", {
                                        slot: gptSlot.getSlotElementId(),
                                        target: {key: targeting[y], value: gptSlot.getTargeting(targeting[y])}
                                    });
                                    data[targeting[y]] = gptSlot.getTargeting(targeting[y]);
                                }
                            }
                            addedTargeting[slot.rktr_slot_id] = data;
                        }
                    }
                }
            });
        }else{
            log("Not setting targeting. Fastlane disabled.");
            callback();
        }
    }

    function processRenderedCreative(args){
        log("Fastlane Creative Rendered: ", args);
    }

    function preDispatch(slots, callback) {
        window.rubicontag.cmd.push(function(){
            window.rubicontag.addEventListener('HL_CREATIVE_RENDERED', processRenderedCreative);
            if (!disabled){
                log('preDispatch');
                setTargetingForFastlane(slots);
            }
        })
        callback();
    }

    function preRefresh(slotIds, callback){
        if (!disabled){
            log('preRefresh');
            var rubiconSlots = [];
            var pseudoRocketeerSlots = [];
            var gptSlots = window.AdFuel.pageSlots;
            if (!slotIds){
                slotIds = Object.getOwnPropertyNames(gptSlots);
            }
            for (var x = 0; x < slotIds.length; x++) {
                var slotId = slotIds[x];
                log("Slot ID: ", slotId);
                if (gptSlots[slotId]) {
                    var gptSlot = gptSlots[slotId];
                    //clear fastlane slot level targeting
                    var slotTargets = gptSlot.getTargetingKeys();
                    for (var targetId in slotTargets) {
                        if(slotTargets.hasOwnProperty(targetId)){
                            var key = slotTargets[targetId];
                            if (key.indexOf("rpfl") >= 0) {
                                window.AdFuel.removeSlotLevelTarget(slotId, key);
                            }
                        }
                    }

                    if (window.refreshableRubiconSlots[slotId])
                        rubiconSlots.push(window.refreshableRubiconSlots[slotId]);
                    pseudoRocketeerSlots.push({rktr_slot_id: slotId});
                }

            }

            log('refreshing slots', {slotsToRefresh: rubiconSlots});
            window.rubicontag.run(function() {
                setTargetingForFastlane(pseudoRocketeerSlots);
                callback();
            }, {slots: rubiconSlots});
        }else{
            log("Not refreshing bids. Fastlane disabled.");
            callback();
        }
    }

    function registerModuleWithAdFuel() {
        addFastlaneScript();
        if (!disabled){
            window.AdFuel.setOptions({queueCallbackTimeoutInMilliseconds: 1200, dispatchCallbackTimeoutInMilliseconds: 1200, refreshCallbackTimeoutInMilliseconds: 1200});
            window.AdFuel.registerModule('Fastlane', {
                preQueueCallback: buildSlotsForFastlane,
                preDispatchCallback: preDispatch,
                preRefreshCallback: preRefresh
            });
        }else{
            log("Fastlane disabled. Not registering module.")
        }
    }

    function init() {
        if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener("AdFuelCreated", registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    init();
})();


////////////////////////////////////////////
//GUID 1.1
////////////////////////////////////////////

/*!
 GUID AdFuel Module - Version 1.1
 - CSD-1129: Protocol-less url for GUID cookie
 !*/

//todo: may be privatized
window.cnnad_haveCookie = function(name) {
    return document.cookie && (document.cookie.indexOf("; " + name + "=") >= 0 || document.cookie.indexOf(name + "=") == 0);
};

//todo: may be privatized
window.cnnad_readCookie = function(name) {
    if (document.cookie) {
        var ca = document.cookie.split(';');
        var nameEQ = name + "=";
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length); //delete spaces
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
};

//used by freewheel helper
window.turner_getGuid = function() {
    return window.cnnad_readCookie("ug");
};

(function cnnad_ugsync() {

    var objectProto = Object.prototype;
    var toString = objectProto.toString;

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = function() {}; //noop

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function( /* arguments */ ) {
            var args = ['[AdFuelModule - Guid]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }

    function processCookie() {

        function registerModuleWithAdFuel() {
            //todo: remove AdFuel.readCookie("ug") once everyone is on new ais.js
            var guid = window.turner_getGuid();

            log('setting guid targeting', {
                guid: guid
            });

            window.AdFuel.addPageLevelTarget('guid', guid);
        }

        if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    };

    if (window.cnnad_haveCookie('ugs')) {
        processCookie();
    } else {
        //execute script to set cookie
        var guid_url = "//www.ugdturner.com/xd.sjs";

        var a = document,
            b = a.createElement("script"),
            c = a.getElementsByTagName("script")[0],
            d = /^(complete|loaded)$/,
            e = false;

        b.type = "text/javascript";
        b.async = true;
        b.src = guid_url;

        b.onload = b.onreadystatechange = function() {
            if (!e && !(('readyState' in b) && d.test(b.readyState))) {
                b.onload = b.onreadystatechange = null;
                e = true;
                processCookie();
            }
        };

        c.parentNode.insertBefore(b, c);
    }

})();

////////////////////////////////////////////
//Krux 1.1
////////////////////////////////////////////

/* 
   <arguments>
        {
            "controlTag" : {
                "isRequired": false,
                "isBoolean": false,
                "defaultValue": ""
            }
        }
   </arguments>
*/

/*!
 Krux AdFuel Module - Version 1.1
 - Refactor to remove the CNN/CNNi addon
 !*/

window.Krux || ((window.Krux = function() {
    window.Krux.q.push(arguments);
}).q = []);
window.kvs = [];
(function getKruxData() {
    function retrieve(n) {
        var m, k = 'kx' + n;
        if (window.localStorage) {
            return window.localStorage[k] || "";
        } else if (navigator.cookieEnabled) {
            m = document.cookie.match(k + '=([^;]*)');
            return (m && decodeURIComponent(m[1])) || "";
        } else {
            return '';
        }
    }
    window.Krux.user = retrieve('user');
    window.Krux.segments = retrieve('segs') && retrieve('segs').split(',') || [];
    for (var i = 0; i < window.Krux.segments.length; i++) {
        if (window.kvs.length < 20) {
            window.kvs.push(window.Krux.segments[i]);
        }
    }
})();

window.krux_getDESegments = function() {
    var segmentString = "&kxid=";
    if (window.Krux.user) {
        segmentString += window.Krux.user;
    }
    segmentString += '&kxseg=' + window.kvs.join(",");
    return segmentString;
};

window.krux_getFWSegments = function() {
    return 'kxseg=' + window.kvs.join(",kxseg=");
};

window.krux_getUser = function() {
    return window.Krux.user;
};

window.krux_getFWKeyValues = function(prefix, limit) {
    var segPrefix = prefix || "_fwu:386123:";
    var segLimit = limit || 35;
    var fwKVP = {};
    for (var x = 0; x < window.Krux.segments.length; x++) {
        if (x < segLimit) fwKVP[segPrefix + window.Krux.segments[x]] = 1;
    }
    return fwKVP;
};

window.Krux.setControlTag = function(controlTagId) {
    
    var objectProto = Object.prototype;
    var toString = objectProto.toString;

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }
    
    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = function() {}; //noop
    
    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function(/* arguments */) {
            var args = ['[AdFuelModule - Krux]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }
    
    function processCookie() {
    
        function registerModuleWithAdFuel() {
            var kuid = window.Krux.user;
            var ksg = window.Krux.segments;
            
            log('setting krux targeting', {kuid: kuid, ksg: ksg});
            
            window.AdFuel.addPageLevelTarget('kuid',kuid);
            window.AdFuel.addPageLevelTarget('ksg', ksg);
        }
        
        if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }    
        }
    };
    
    //execute script to set cookie
    var a = document,
        b = a.createElement("script"),
        c = a.getElementsByTagName("script")[0],
        d = /^(complete|loaded)$/,
        e = false;
        
    b.type = "text/javascript";
    b.async = true;
	
    var m, src=(m=location.href.match(/\bkxsrc=([^&]+)/))&&decodeURIComponent(m[1]);
	b.src = /^https?:\/\/([^\/]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === "disable" ? "" :
	   (location.protocol==="https:"?"https:":"http:") + "//cdn.krxd.net/controltag?confid=" + controlTagId;
       
    b.onload = b.onreadystatechange = function() {
        if (!e && !(('readyState' in b) && d.test(b.readyState))) {
            b.onload = b.onreadystatechange = null;
            e = true;
            processCookie();
        }
    };
    
    c.parentNode.insertBefore(b, c);        
};

if ("IWzCuclz") {
    //set based on site
    var controlTag = window.location.hostname.toLowerCase().match(/^edition\.cnn\.com/) ? "ITb_9Zup" : "IWzCuclz";
    window.Krux.setControlTag(controlTag);
}


////////////////////////////////////////////
//PII Filter
////////////////////////////////////////////

/*!
    PII Filter AdFuel Module - Version 1.0
    - Compatible with AdFuel 1.x and AdFuel 2.x
    - Initial Implementation
!*/
(function createAdFuelModule() {

    var MODULE_NAME = "PII Filter";
    var re = /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/i;

    function piiIsPresentInQueryString() {
        var regex = new RegExp(re);
        if (document.location.search) {
            var dirtyResults = document.location.search.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.search).search(re) + 1;
            }catch(err){
                cleanResults = dirtyResults;
            }
            var results = { dirty: dirtyResults, clean: cleanResults };
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    function piiIsPresentInHash() {
        var regex = new RegExp(re);
        if (document.location.hash) {
            var dirtyResults = document.location.hash.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.hash).search(re) + 1;
            }catch(err){
                cleanResults = dirtyResults;
            }
            var results = { dirty: dirtyResults, clean: cleanResults };
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    function piiIsPresentInReferrer() {
        var regex = new RegExp(re);
        if (document.referrer){
            var dirtyResults = document.referrer.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.referrer).search(re) + 1;
            }catch(err){
                cleanResults = dirtyResults;
            }
            var results = { dirty: dirtyResults, clean: cleanResults };
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    function filterDFPRequest(){
        if (piiIsPresentInQueryString() || piiIsPresentInHash() || piiIsPresentInReferrer()){
            console.log("[AdFuelModule - PII Filter] Filtering DFP Request due to PII in query string.");
            var AdFuelMethods = Object.getOwnPropertyNames(window.AdFuel);
            for (var x = 0; x < AdFuelMethods.length; x++){
                window.AdFuel[AdFuelMethods[x]] = function(){};
            }
            window.googletag = null;
        }
    }

    function init() {
        if (window.AdFuel) {
            //AdFuel loaded first
            filterDFPRequest();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener("AdFuelCreated", filterDFPRequest, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', filterDFPRequest);
            }
        }
    }

    init();

})();


////////////////////////////////////////////
//Proximic 1.3
////////////////////////////////////////////

/*!
 Proximic AdFuel Module - Version 1.3.1
 - Removal of Proximic script prior to re-calling for Proximic data
 - Method to re-call Proximic for dynamic page loads
 - Clearing of Proximic targeting before re-calling Proximic
 !*/
(function createProximicModule() {

    var loop_count = 0;
    var iteration_time = 50;
    var timeout = 2000;
    var location_url = document.location.href;
    if (window.location.hostname.toLowerCase().match(/^train\.next\.cnn\.com/)) {
        location_url.replace("train.next.", "www");
    }
    var script_url = "//segment-data-us-east.zqtk.net/turner-47fcf6?url=" + encodeURIComponent(location_url);
    // var script_url = "//segment-data-us-east.zqtk.net/turner-47fcf6?url=" + encodeURIComponent('http://www.cnn.com/2016/02/17/entertainment/prince-passport-photo-feat/index.html');
    var segmentData = "";
    var objectProto = Object.prototype;
    var toString = objectProto.toString;
    var scriptAdded = false;
    window.proximicData = [];
    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = function() {}; //noop

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function( /* arguments */ ) {
            var args = ['[AdFuelModule - Proximic/comScore]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }

    // sample response from js and format can be easily changed:
    window.gotSegmentData = function(data) {
        if (data.data) {
            log("Segment Data: ", data.data);
            segmentData = data.data;
            window.proximicData = data.data;
        }
    };

    function recallProximic(url){        
        window.AdFuel.removePageLevelTarget('pconid');
        var location_url = url || document.location.href;
        if (window.location.hostname.toLowerCase().match(/^train\.next\.cnn\.com/)) {
            location_url.replace("train.next.", "www");
        }        
        script_url = "//segment-data-us-east.zqtk.net/turner-47fcf6?url=" + encodeURIComponent(location_url);
        delete document.getElementById('proximic-script');
        scriptAdded = false; 
        addProximicScriptToHead();
        loop_count = 0;
        wait_for_data();
    }

    window.recallProximic = recallProximic;

    function addProximicScriptToHead() {
        if (!scriptAdded) {
            var prox = document.createElement('script');
            prox.id = "proximic-script"
            prox.type = 'text/javascript';
            prox.async = true;
            prox.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + script_url;
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.appendChild(prox);
            log("Added Proximic script to head of page.", script_url);
            scriptAdded = true;
        }
    }

    function call_dfp(dataForDFP, callback) {
        if (dataForDFP !== "" && typeof dataForDFP !== "undefined") {
            log("Setting data for DFP", dataForDFP);
            window.AdFuel.addPageLevelTarget('pconid', dataForDFP);
            window.AdFuel.removePageLevelTarget('prx_to', '1');
            window.AdFuel.addPageLevelTarget('prx_to', '0');
            if(callback) callback();
        }
    }

    function checkEligibility(queue, callback){
        var rktrAdId, x, money = true;
        try {
            if (
                document.location.hostname.indexOf("money") >= 0 &&
                (!window.CNNMONEY ||
                    !window.CNNMONEY.adTargets ||
                    !window.CNNMONEY.adTargets.c_type || ['article', 'video', 'gallery'].indexOf(window.CNNMONEY.adTargets.c_type) < 0
                )
            ) {
                money = false;
            }
            for (x = 1; x < queue.length; x++) {
                rktrAdId = queue[x].rktr_ad_id.toLowerCase();
                if (rktrAdId.search(/^cnn\/(homepage|(.+\/landing))/) < 0 &&
                    rktrAdId.search(/^cnni\/(homepage|(.+\/(landing|main)))/) < 0 &&
                    money) {
                    log("Adding Proximic based on ad unit specifications: ", rktrAdId)
                    addProximicScriptToHead();
                    wait_for_data(callback);
                    break;
                }else{
                    log("Filtering Proximic based on ad unit specifications: ", rktrAdId)
                }
            }
        } catch (err) {
            log("Error parsing Proximic data: ", err.message || "Unknown");
        }

    }

    function wait_for_data(callback) {
        log("Waiting for data...");
        setTimeout(function() {
            loop_count++;
            log("SegmentData: ", segmentData);
            if (segmentData !== "" && typeof segmentData !== "undefined") {
                /* Call DFP with data */
                log("Proximic Data found!");
                call_dfp(segmentData, callback);
            } else if (loop_count * iteration_time < timeout) {
                wait_for_data(callback);
            } else {
                log("Proximic Timeout Occurred!");
                /* Timeout occurred, call DFP without data */
                window.AdFuel.addPageLevelTarget('prx_to', '1');
                if (callback) callback();
            }
        }, iteration_time);
    }

    function registerModuleWithAdFuel() {
        window.AdFuel.registerModule('Proximic', {
            postQueueCallback: checkEligibility
        });
        window.AdFuel.addPageLevelTarget('prx_to', '1');
    }

    function init() {
        if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener("AdFuelCreated", registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    init();

})();

////////////////////////////////////////////
//Transaction ID
////////////////////////////////////////////

window.cnnad_transactionID = null;

//referenced by registries 
window.cnnad_getTransactionID = function() {
	if (!window.cnnad_transactionID) {
		window.cnnad_transactionID = Math.round((new Date()).getTime() / 1000) + '' + Math.floor(Math.random()*9007199254740992);
	}
	return window.cnnad_transactionID;
};

window.turner_getTransactionId = window.cnnad_getTransactionID;

window.turner_getTransactionId();


(function init() {
            
    var objectProto = Object.prototype;
    var toString = objectProto.toString;

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }
    
    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = function() {}; //noop
    
    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function(/* arguments */) {
            var args = ['[AdFuelModule - TransactionId]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }
    
    function registerModuleWithAdfuel() {
        var transId = window.turner_getTransactionId();
            
        log('setting guid targeting', {transId: transId});
        
        window.AdFuel.addPageLevelTarget('transId', transId);
    }
    
    if (window.AdFuel) {
        //AdFuel loaded first
        registerModuleWithAdfuel();
    } else {
        //wait for AdFuel to load
        if (document.addEventListener) {
            document.addEventListener('AdFuelCreated', registerModuleWithAdfuel, true);
        } else if (document.attachEvent) {
            document.attachEvent('onAdFuelCreated', registerModuleWithAdfuel);
        }        
    } 
})();

