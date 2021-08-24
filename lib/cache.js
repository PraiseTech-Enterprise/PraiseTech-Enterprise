//When you think about it,
//Nobody is a nobody.
//Everybody is someone to somebody.

function cache() {
    let innerCacher = this;
    let xhr;
    let success = false;
    let error = false;
    let cacheID = Math.floor(Math.random() * 10000000);

    this.store = function(url, key=null) {
        if (key != null) {
            cacheID = key;
        }
        if (typeof cacheID != "number") {
            if (Number(cacheID) != NaN) {
                cacheID = Number(cacheID);
            } else {
                throw ("Cache Key must be of type number");
            }
        }
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhr = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onload = function() {
            if (xhr.status == 200) {
                let reader = new FileReader();
                reader.onloadend = function() {
                    try {
                        localStorage.setItem("CacheJS_" + cacheID, reader.result);
                        if (success) {
                            success(cacheID);
                        }
                    } catch (e) {
                        if (error) {
                            error(e);
                        }
                    }
                }
                try {
                    reader.readAsDataURL(xhr.response);
                } catch (e) {}
            } else {
                console.log(xhr.status, xhr.response)
                if (error) {
                    error("Error loading file");
                }
            }
        }
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
    this.onSuccess = function(callback) {
        success = callback;
    }
    this.onError = function(callback) {
        error = callback;
    }
    this.get = function(key) {
        return localStorage.getItem("CacheJS_" + key);
    }
    this.remove = function(key) {
        localStorage.removeItem("CacheJS_" + key);
    }
    this.hasKey = function(key) {
        if (innerCacher.get(key) == null) {
            return false;
        }
        return true;
    }
    this.getAllKeys = function() {
        let items = Object.keys(localStorage);
        let keys = [];
        items.forEach(function(item) {
            if (item.startsWith("CacheJS_")) {
                keys.push(item.substring(8));
            }
        })
        return keys;
    }
    this.removeAllKeys = function() {
        let items = Object.keys(localStorage);
        let len = 0;
        items.forEach(function(item) {
            if (item.startsWith("CacheJS_")) {
                localStorage.removeItem(item);
                len++;
            }
        })
        return len;
    }

    this.init = function() {
        let data = [];
        let elements = document.querySelectorAll("*");
        let valid_elements = ["IMG", "VIDEO", "SOURCE"]
        for (i = 0; i < elements.length; i++) {
            let elem = elements[i];
            let attributes = elem.attributes;
            Object.values(attributes).forEach(function(attribute) {
                let value = attribute.value;
                let key = attribute.name;
                if (key.toLowerCase() == "cache") {
                    if (valid_elements.includes(elem.tagName)) {
                        if (elem.getAttribute("src") != null && elem.getAttribute("cache") != null) {
                            if (innerCacher.get(value) == null) {
                                let url = elem.getAttribute("src");
                                data.push([url, value]);
                            } else {
                                let data = innerCacher.get(value);
                                elem.setAttribute("src", data);
                            }
                        }
                    }
                }
            });
        }
        let len = data.length;
        let index = 0;
        let loop = setInterval(function() {
            try {
                innerCacher.store(data[index][0], data[index][1])
                index++
                if (index == len) {
                    clearInterval(loop);
                    index = 0;
                }
            } catch (e) {
                clearInterval(loop);
                index = 0;
            }
        }, 1000);
    }
}