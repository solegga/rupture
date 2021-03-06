var Request = {
    _img: null,
    make(url, callback) {
        console.log('Making request to ' + url);

        this._img = new Image();
        this._img.onerror = callback;
        this._img.src = url;
    },
    cancel() {
        this._img.src = '';
    }
};

var Collection = {
    _ONE_REQUEST_DEFAULT_TIMEOUT: 5000,
    create(url, {amount, alignmentalphabet, oneRequestTimeout}, onOneSuccess, onAllSuccess, onError) {
        var requests = [];
        var loadingTimeout;
        var loadedCount = 0;

        if (oneRequestTimeout === 0) {
            throw 'oneRequestTimeout should not be zero';
        }

        oneRequestTimeout = oneRequestTimeout || this._ONE_REQUEST_DEFAULT_TIMEOUT;

        console.log('Creating request collection of ' + amount + ' requests to URL: ' + url);
        console.log('Using one request time out value of ' + oneRequestTimeout);

        const resetTimeout = () => {
            clearTimeout(loadingTimeout);
            loadingTimeout = setTimeout(() => {
                for (var i = 0; i < amount; ++i) {
                    requests[i].cancel();
                }
                clearTimeout(loadingTimeout);
                onError();
            }, oneRequestTimeout);
        }
        const allCompleted = () => {
            clearTimeout(loadingTimeout);
            onAllSuccess();
        }
        const oneLoaded = (index) => {
            console.log();

            resetTimeout();
            console.log('Completed request: ' + index);
            ++loadedCount;

            onOneSuccess(index);

            if (loadedCount == amount) {
                allCompleted();
            }
        }

        antiBrowserCaching = Math.random() * Number.MAX_SAFE_INTEGER;
        var alignmentPadding;

        for (var i = 0; i < amount; ++i) {
            alignmentPadding = alignmentalphabet.substr(0, i % 16);
            var request = Request.make(url + alignmentPadding + '&' + (antiBrowserCaching + i), oneLoaded.bind({}, i));
            requests.push(request);
        }
    }
};

module.exports = {Request, Collection};
