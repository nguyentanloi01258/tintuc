function getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}
$(document).ready(function () {
    loadContent();
    console.log(getAllUrlParams().id)
})
//Load content on single.htlm khi click vào 1 bài viết thì lấy id của bài viết và dò tìm sau đó tải bài viết lên

// var fetchCategory = {
//     url: "https://636c9892ab4814f2b268a6b3.mockapi.io/api/v1/Category",
//     method: "GET",
// };
var contentPosts = {
    url: `https://636c9892ab4814f2b268a6b3.mockapi.io/api/v1/posts/${getAllUrlParams().id}`,
    method: "GET",
};
var fetchGetPostid = {
    url: `${API_PATH}/post/${getAllUrlParams().id}`,
    method: "GET",
    timeout: 0,
};
function loadContent() {

    $.ajax(fetchGetPostid).done(function (response) {
        var tempDate = String(response.data.date).split('T', 1)
        var year = String(tempDate).split('-', 1)[0]
        var month = String(tempDate).split('-', 2)[1]
        var day = String(tempDate).split('-', 3)[2]
        // console.log(day)
        // console.log(year)
        var month_str = getMonthName(Number(month));
        console.log(response.data.content.split("\n\n").length - 1)
        var img_1 = response.data.content.split("{1}").length - 1
        var img_2 = response.data.content.split("{2}").length - 1
        var img_3 = response.data.content.split("{3}").length - 1
        var img_4 = response.data.content.split("{4}").length - 1
        console.log(response.data.content)
        var result

        if (img_1 > 0) {
            result = response.data.content.replace("{1}", `</p><figure>
            <img src="${response.data.imagB64_1}">
            <figcaption></figcaption>
        </figure><p>`);
        }
        if (img_2 > 0 && img_1 > 0) {
            result = result.replace("{2}", `</p><figure>
            <img src="${response.data.imagB64_2}">
            <figcaption></figcaption>
        </figure><p>`);
        } else if (img_2 > 0) {
            result = response.data.content.replace("{2}", `</p><figure>
            <img src="${response.data.imagB64_2}">
            <figcaption></figcaption>
        </figure><p>`);
        }

        if ((img_3 > 0 && img_2 > 0 && img_1 > 0) || (img_3 > 0 && img_2 > 0) || (img_3 > 0 && img_1 > 0)) {
            result = result.replace("{3}", `</p><figure>
            <img src="${response.data.imagB64_3}">
            <figcaption></figcaption>
        </figure><p>`);
        }
        else if (img_3 > 0) {
            result = response.data.content.replace("{3}", `</p><figure>
            <img src="${response.data.imagB64_3}">
            <figcaption></figcaption>
        </figure><p>`);
        }


        if (img_1 == 0 && img_2 == 0 && img_3 == 0) {
            result = response.data.content
        }
        if ((response.data.content.split("\n\n").length - 1) > 0) {
            result = result.replace(/\n/g, "<br>")
        }
        // let result = text.replace("Microsoft", "W3Schools");
        // console.log(result)
        var itemFeatured = `
            
            <header>
            <h1 style="word-wrap: break-word;">${response.data.title}</h1>
            <ul class="details">
                <li>Đăng ngày ${day},${month},${year}</li>
                <li><a>${response.data.category}</a></li>
                <li>Tác giả <a href="#">${response.data.author}</a></li>
            </ul>
        </header>
        <div class="main">
            <h2></h2>
            <div class="featured">
                
            </div>
            <p>${result}</p>
            
        </div>
        
        <footer>
            <div class="col">
                <ul class="tags">
                    <li><a href="#">Free Themes</a></li>
                    <li><a href="#">Bootstrap 3</a></li>
                    <li><a href="#">Responsive Web Design</a></li>
                    <li><a href="#">HTML5</a></li>
                    <li><a href="#">CSS3</a></li>
                    <li><a href="#">Web Design</a></li>
                </ul>
            </div>
            <div class="col">
                <a href="#" class="love"><i class="ion-android-favorite-outline"></i> <div>${response.data.favorite}</div></a>
            </div>
        </footer>
            `;

        //######################

        $('.active-cate').append(response.data.category);
        $('.contentOnSingle').append(itemFeatured);



    });

    // $.ajax(fetchPosts).done(function (response) {
        

    // })

}

// function maybeYouLike() {
//     var mayBeYouLike = `
//             <article class="article related col-md-6 col-sm-6 col-xs-12">
// 								<div class="inner">
// 									<figure>
// 										<a href="#">
// 											<img src="images/news/img03.jpg">
// 										</a>
// 									</figure>
// 									<div class="padding">
// 										<h2><a href="#">Duis aute irure dolor in reprehenderit in voluptate</a></h2>
// 										<div class="detail">
// 											<div class="category"><a href="category.html">Lifestyle</a></div>
// 											<div class="time">December 26, 2016</div>
// 										</div>
// 									</div>
// 								</div>
// 							</article>
//             `

//     $('#mayBeYouLike').append(mayBeYouLike);
// }

