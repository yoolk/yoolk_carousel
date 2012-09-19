$.fn.yoolkCarousel = function (data, option) {
    return this.each(function () {
        var _constructFlash = function (data) {
            var flashObject = $("<object></object>");
            flashObject.attr("data", data.url).attr("type", "application/x-shockwave-flash").attr("width", option.width).attr("height", option.height);

            var nameParam = $("<param>").attr("name", "wmode").attr("value", "transparent");
            var srcParam = $("<param>").attr("name", "src").attr("value", data.url);

            flashObject.append(nameParam);
            flashObject.append(srcParam);

            return flashObject;
        };

        var _constructImage = function (data) {
            var link = $("<a></a>");
            link.attr("href", data.action).attr("target", "_blank").attr("alt", data.alt);

            var image = $("<img></img>");
            image.attr("src", data.url).attr("width", option.width).attr("height", option.height);

            link.append(image);

            return link;
        };

        var _renderCarouselItem = function (data) {
            var item = $("<li></li>").addClass("item"),
                displayObject;

            var splitedData = data.url.split("."),
                urlExtension = splitedData[splitedData.length - 1];

            if (urlExtension === "swf") {
                displayObject = _constructFlash(data);
            } else {
                displayObject = _constructImage(data);
            }

            item.append(displayObject);
            return item;
        };

        var _renderItems = function (ul, data, index) {
            var mainItem = _renderCarouselItem(data[index]),
                dataLen = data.length,
                previouseIndex = index === 0 ? dataLen - 1 : index - 1,
                nextIndex = index === dataLen - 1 ? 0 : index + 1,
                previousItem = _renderCarouselItem(data[previouseIndex]),
                nextItem = _renderCarouselItem(data[nextIndex]);

            ul.append(previousItem);
            ul.append(mainItem);
            ul.append(nextItem);
        };

        var wrapper = $("<div>").addClass("wrapper"),
            ul = $("<ul>"),
            index = 0;

        _renderItems(ul, data, index);

        $(this).append(ul);
    });
};