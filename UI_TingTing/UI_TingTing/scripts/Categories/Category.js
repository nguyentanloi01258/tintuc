// https://636c9892ab4814f2b268a6b3.mockapi.io/api/v1/Category
const API_PATH = 'http://localhost:8080'
$(document).ready(function () {

    findCategory();
    fetchPostSlideHeader();
    fetchPostLatestNew();
    fetchPostFeaturePosTrending();
    fetchPostOderNew();
    //fetchPostNoiBat();
    fetchPostFeatured();
    fetchPostTinNong();
    // fetchCategories();
})
let x_category = [];
//https://636c9892ab4814f2b268a6b3.mockapi.io/api/v1/Category
var fetchCategory = {
    url: "https://636c9892ab4814f2b268a6b3.mockapi.io/api/v1/Category",
    method: "GET",
};
var fetchPosts = {
    url: `${API_PATH}/post`,
    method: "GET",
    timeout: 0,
};
const title = $(".text_category");

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', { month: 'long' });
}
//post of slide on header
function fetchPostSlideHeader() {

    $.ajax(fetchPosts).done(function (response) {
        console.log(response)
        response.forEach((item, index) => {
            const result = item.title.match(/.{1,40}/g) ?? [];

            
            if (result.length > 1) {
                result.unshift(item.title + "...")
            }item.title
            // title.text(item.title);
            // findOneCategory(item.categoryID);
            var tempDate = String(item.date).split('T', 1)
            var year = String(tempDate).split('-', 1)[0]
            var month = String(tempDate).split('-', 2)[1]
            var day = String(tempDate).split('-', 3)[2]
            // console.log(day)
            // console.log(year)
            var month_str = getMonthName(Number(month));
            // console.log(month)

            var itemFeatured = `
            <div class="w3-display-container mySlides w3-animate-left firstchill" style="display: none;">
								<a href="single.html?id=${Number(item.id)}"><img src="${item.imagB64_1}" style="width:100%"></a>
								<div class="w3-display-bottom w3-large w3-container w3-padding-16 ">
									<div class="titleIndex" style="width:100%">
										<div class="category"><a href="category.html">${item.category}</a></div>
										<h1><a href="single.html?id=${Number(item.id)}" style="word-wrap: break-word;">${item.title}</a></h1>
										<div class="time">${day}/${month}/${year}</div>
									</div>

								</div>
							</div>
            `;

            $('.formimage').append(itemFeatured);
            $(".firstchill:first-child").css("display", "block");
        });

    });

}
//post of latest New on Body
function fetchPostLatestNew() {
    var d = 0;
    $.ajax(fetchPosts).done(function (response) {

        response.reverse().forEach((item, index) => {
            if (d < 6) {
                const result = item.title.match(/.{1,20}/g) ?? [];
                if (result.length > 1) {
                    result.unshift(item.title + "...")
                }
                var tempDate = String(item.date).split('T', 1)
                var year = String(tempDate).split('-', 1)[0]
                var month = String(tempDate).split('-', 2)[1]
                var day = String(tempDate).split('-', 3)[2]
                // console.log(day)
                // console.log(year)
                var month_str = getMonthName(Number(month));
                if(d % 2 != 0){
                    var itemFeatured = `
                <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12"">
                <div class="row">
                    <article class="article col-md-12">
                        <div class="inner">
                            <figure>
                                <a href="single.html?id=${Number(item.id)}">
                                    <img src="${item.imagB64_1}" alt="Sample Article">
                                </a>
                            </figure>
                            <div class="padding">
                                <div class="detail">
                                    <div class="time">${day}/${month}/${year}</div>
                                    <div class="category"><a href="category.html">${item.category}</a></div>
                                </div>
                                <h2><a href="single.html?id=${Number(item.id)}" style="word-wrap: break-word;">${item.title}</a></h2>
                                <p class="block-ellipsis" style="word-wrap: break-word;">${item.description}</p>
                                <footer>
                                    <a href="#" class="love"><i class="ion-android-favorite-outline"></i>
                                        <div>${item.favorite}</div>
                                    </a>
                                    <a class="btn btn-primary more" href="single.html?id=${Number(item.id)}">
                                        <div>Xem Thêm</div>
                                        <div><i class="ion-ios-arrow-thin-right"></i></div>
                                    </a>
                                </footer>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
                `
                }else{
                    var itemFeatured = `
                    <div class="col-md-6 col-sm-6 col-xs-12"">
                    <div class="row">
                        <article class="article col-md-12">
                            <div class="inner">
                                <figure>
                                    <a href="single.html?id=${Number(item.id)}">
                                        <img src="${item.imagB64_1}" alt="Sample Article">
                                    </a>
                                </figure>
                                <div class="padding">
                                    <div class="detail">
                                        <div class="time">${day}/${month}/${year}</div>
                                        <div class="category"><a href="category.html">${item.category}</a></div>
                                    </div>
                                    <h2><a href="single.html?id=${Number(item.id)}" style="word-wrap: break-word;">${item.title}</a></h2>
                                    <p class="block-ellipsis" style="word-wrap: break-word;">${item.description}</p>
                                    <footer>
                                        <a href="#" class="love"><i class="ion-android-favorite-outline"></i>
                                            <div>${item.favorite}</div>
                                        </a>
                                        <a class="btn btn-primary more" href="single.html?id=${Number(item.id)}">
                                            <div>Xem Thêm</div>
                                            <div><i class="ion-ios-arrow-thin-right"></i></div>
                                        </a>
                                    </footer>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                </div>
                    `

                }
                $('.latestNews').append(itemFeatured);
                d = d + 1;
            }


        });
        response.forEach((item, index) => {
            if(index <3){
                var tempDate = String(item.date).split('T', 1)
                var year = String(tempDate).split('-', 1)[0]
                var month = String(tempDate).split('-', 2)[1]
                var day = String(tempDate).split('-', 3)[2]
                // console.log(day)
                // console.log(year)
                var month_str = getMonthName(Number(month));
                var singelAside = `
                <article class="article-mini">
                    <div class="inner" style="width:100%">
                        <figure>
                            <a href="single.html?id=${Number(item.id)}">
                                <img src="${item.imagB64_1}">
                            </a>
                        </figure>
                        <div class="padding" >
                            <h1 style="word-wrap: break-word;"><a href="single.html?id=${Number(item.id)}" >${item.title}</a></h1>
                            <div class="detail">
                                <div class="category"><a href="#">${item.category}</a></div>
                                <div class="time">${day}/${month}/${year}</div>
                            </div>
                        </div>
                    </div>
                </article>`
                $('.singel-aside').append(singelAside);
            }

    });
})

}
//post of more->feature post trending
async function fetchPostFeaturePosTrending() {

    var d = 0, k = 0;
    $.ajax(fetchPosts).done(function (response) {
        var arr_favorite = new Array
        response.forEach((item, index) => {
            
            arr_favorite.push(item.favorite)
        })
        arr_sort = arr_favorite.sort().reverse()
        response.forEach((item, index) => {
            
            if (d < 3) {
                if(item.favorite == arr_sort[0] || item.favorite == arr_sort[1] || item.favorite == arr_sort[2])
                {
                    const result = item.title.match(/.{1,20}/g) ?? [];
                    if (result.length > 1) {
                        result.unshift(item.title + "...")
                    }
                    var tempDate = String(item.date).split('T', 1)
                    var year = String(tempDate).split('-', 1)[0]
                    var month = String(tempDate).split('-', 2)[1]
                    var day = String(tempDate).split('-', 3)[2]
                    // console.log(day)
                    // console.log(year)
                    var month_str = getMonthName(Number(month));
                    d = d + 1;
                    var itemFeatured = `
                        <article class="article col-md-4 mini">
                            <div class="inner">
                                <figure>
                                    <a href="single.html?id=${Number(item.id)}?id=${item.id}">
                                        <img src="${item.imagB64_1}" alt="Sample Article">
                                    </a>
                                </figure>
                                <div class="padding">
                                    <div class="detail">
                                        <div class="time">${day}/${month}/${year}</div>
                                        <div class="category"><a
                                            href="category.html">${item.category}</a></div>
                                    </div>
                                    <h2><a href="single.html?id=${Number(item.id)}" style="word-wrap: break-word;">${item.title}</a></h2>
                                </div>
                            </div>
                        </article>
                        `;
                    $('.MenuMoreFTPostTren').append(itemFeatured);

                }

            }
        });

    });

}
//post of tin tức khác

async function fetchPostOderNew() {
    var d = 0;
    $.ajax(fetchPosts).done(function (response) {
        var arr_id = new Array
        response.forEach((item, index) => {
            arr_id.push(item.id)
        })
        // arr_random = arr_id[Math.floor(Math.random()*arr_id.length)]
        var arr_saveId = new Array
        for(let i = 0; i < 5; i++){
            var arr_temp = arr_id[Math.floor(Math.random()*arr_id.length)]
            var checkArr = false
            arr_saveId.forEach((item, index) => {
                if(arr_temp == item)
                {
                    checkArr = true
                }
            })
            if(checkArr==false){
                arr_saveId.push(arr_temp)
            }else{
                i -= 1
                checkArr = false
            }
        }
        console.log(arr_saveId)
        for(let i = 0 ; i < 5 ; i++){

            response.forEach((item, index) => {
                if (d < 5 && item.id == arr_saveId[i]) {
                    d = d + 1;
                    const result = item.title.match(/.{1,40}/g) ?? [];
                    if (result.length > 1) {
                        result.unshift(item.title + "...")
                    }
                    var tempDate = String(item.date).split('T', 1)
                    var year = String(tempDate).split('-', 1)[0]
                    var month = String(tempDate).split('-', 2)[1]
                    var day = String(tempDate).split('-', 3)[2]
                    // console.log(day)
                    // console.log(year)
                    var month_str = getMonthName(Number(month));
                    var itemFeatured = `
                            <article class="col-md-12 article-list">
                            <div class="inner">
                                <figure>
                                    <a href="single.html?id=${Number(item.id)}">
                                        <img src="${item.imagB64_1}" alt="Sample Article">
                                    </a>
                                </figure>
                                <div class="details">
                                    <div class="detail">
                                        <div class="category">
                                            <a href="#">${item.category}</a>
                                        </div>
                                        <div class="time">${day}/${month}/${year}</div>
                                    </div>
                                    <h1><a href="single.html?id=${Number(item.id)}" style="word-wrap: break-word;">${item.title}</a></h1>
                                    <p  style="word-wrap: break-word; font-size:15px;">
                                        ${item.description}
                                    </p>
                                    <footer>
                                        <a href="#" class="love"><i class="ion-android-favorite-outline"></i>
                                            <div>${item.favorite}</div>
                                        </a>
                                        <a class="btn btn-primary more" href="single.html?id=${Number(item.id)}">
                                            <div>Xem Thêm</div>
                                            <div><i class="ion-ios-arrow-thin-right"></i></div>
                                        </a>
                                    </footer>
                                </div>
                            </div>
                        </article>
                        `;

                    
                    $('.orderNew').append(itemFeatured);
                    
    
                }
                
                
            });

            
        }
        var d2 = 0
        for(let i = 0 ; i < 2 ; i++){
            response.forEach((item, index) => {
                if (d2 < 2 && item.id == arr_saveId[i])
                {
                    d2 += 1
                    var tempDate = String(item.date).split('T', 1)
                        var year = String(tempDate).split('-', 1)[0]
                        var month = String(tempDate).split('-', 2)[1]
                        var day = String(tempDate).split('-', 3)[2]
                        // console.log(day)
                        // console.log(year)
                        var month_str = getMonthName(Number(month));
                    
        
                        var mayBeYouLikes =`
                        <article class="article related col-md-6 col-sm-6 col-xs-12">
                                    <div class="inner">
                                        <figure>
                                            <a href="single.html?id=${Number(item.id)}">
                                                <img src="${item.imagB64_1}">
                                            </a>
                                        </figure>
                                        <div class="padding">
                                            <h2><a href="single.html?id=${Number(item.id)}" style="word-wrap: break-word;">${item.title}</a></h2>
                                            <div class="detail">
                                                <div class="category"><a href="category.html">${item.category}</a></div>
                                                <div class="time">${day}/${month}/${year}</div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                        `
                        
                        $('.mayBeYouLike').append(mayBeYouLikes);
                }
                
            })
        }


    });

}
//post of Nổi bật
function fetchPostFeatured() {
    var d = 0;
    $.ajax(fetchPosts).done(function (response) {
        var arr_favorite = new Array
        response.forEach((item, index) => {
            
            arr_favorite.push(item.favorite)
        })
        arr_sort = arr_favorite.sort().reverse()
        for(let i = 0; i < 5 ; i++)
        {
            
            response.forEach((item, index) => {
                if (d < 5 && item.favorite == arr_favorite[i]) {
                const result = item.title.match(/.{1,40}/g) ?? [];
                    if (result.length > 1) {
                        result.unshift(item.title + "...")
                    }
                    var tempDate = String(item.date).split('T', 1)
                    var year = String(tempDate).split('-', 1)[0]
                    var month = String(tempDate).split('-', 2)[1]
                    var day = String(tempDate).split('-', 3)[2]
                    var month_str = getMonthName(Number(month));
                    d = d + 1;
                    var itemFeatured = `
                    <article class="article-mini">
                        <div class="inner" style="width:100%">
                            <figure>
                                <a href="single.html?id=${Number(item.id)}">
                                    <img src="${item.imagB64_1}" alt="Sample Article">
                                </a>
                            </figure>
                            <div class="padding">
                                <h1 style="word-wrap: break-word;"><a href="single.html?id=${Number(item.id)}">${item.title}</a></h1>
                                <div class="detail">
                                    <div class="category"><a href="category.html">${item.category}</a></div>
                                    <div class="time">${day}/${month}/${year}</div>
                                </div>
                            </div>
                          
                        </div>
                     </article>
                    `;
                    $('.featuredPosts').append(itemFeatured);
    
                }
            });
            
        }

    });

}

//post of nổi bật nhất tuần

// function fetchPostNoiBat() {
//     var d = 0;
//     $.ajax(fetchPosts).done(function (response) {

//         response.forEach((item, index) => {
//             if (d < 5) {
//                 d = d + 1;
//                 var itemFeatured = `
//                 <article class="owl-item active" style="width: 350px; margin-right: 20px;"><article class="article">
// 					<div class="inner">
// 						<figure>
// 							<a href="single.html?id=${Number(item.id)}">
// 								<img src="images/news/img03.jpg" alt="Sample Article">
// 							</a>
// 						</figure>
// 						<div class="padding">
// 							<div class="detail">
// 								<div class="time">December 11, 2016</div>
// 								<div class="category"><a href="category.html">Travel</a></div>
// 							</div>
// 							<h2><a href="single.html?id=${Number(item.id)}">${item.title}</a></h2>
// 							<p>Praesent tincidunt, leo vitae congue molestie.</p>
// 						</div>
// 					</div>
// 				</article></article>
//                 `;
//                 $('.owl-stage').append(itemFeatured);

//             }
//         });

//     });

// }
//
//post of Tin nóng
//
function fetchPostTinNong() {
    var d = 0;
    $.ajax(fetchPosts).done(function (response) {
        var arr_favorite = new Array
        var countfavorite = 0
        response.reverse().forEach((item, index) => {
            if(countfavorite < 5){
                arr_favorite.push(item.favorite)
                countfavorite += 1
            }
        })
        arr_sort = arr_favorite.sort().reverse()
        // console.log(arr_sort)
        for(let i = 0 ;i < 5; i++){
            response.forEach((item, index) => {
                if (d < 5 && item.favorite == arr_sort[i]) {
                    d = d + 1;
                    var tempDate = String(item.date).split('T', 1)
                    var year = String(tempDate).split('-', 1)[0]
                    var month = String(tempDate).split('-', 2)[1]
                    var day = String(tempDate).split('-', 3)[2]
                    var month_str = getMonthName(Number(month));
                    var itemFeatured = `
                    <article class="article-mini">
                        <div class="inner" style="width: 100%">
                            <figure>
                                <a href="single.html?id=${Number(item.id)}">
                                    <img src="${item.imagB64_1}" alt="Sample Article">
                                </a>
                            </figure>
                            <div class="padding">
                                <h1 style="word-wrap: break-word;"><a href="single.html?id=${Number(item.id)}">${item.title}</a></h1>
                                <div class="detail">
                                    <div class="category"><a href="category.html">${item.category}</a></div>
                                    <div class="time">${day}/${month}/${year}</div>
                                </div>
                            </div>
                        </div>
                    </article>
                    `;
                    $('.hotNews').append(itemFeatured);
    
                }
            });

        }

    });

}




function findOneCategory(cc) {

    $.ajax({
        url: `https://636c9892ab4814f2b268a6b3.mockapi.io/api/v1/Category/${cc}`
    }).done(function (response) {
        cc = response.id;
        // console.log(res)
        // if (categoryId == response.id) {
        //     title.html(response.title)
        // }

    }).fail(function (err) {
        console.log(err)

    });
    return cc;
}
//Load category on nav
async function findCategory() {
    var d = 0;

    $.ajax(fetchCategory).done(function (response) {

        response.forEach((item, index) => {
            x_category[index] = item.title;
            if (d < 3) {
                d = d + 1;
                var items = `<li>
                <a onclick="movePage(${item.id})">${item.title}</a></li>

            `;
                $('.menuListCategory').append(items);
            }
        })
        var items = `
        <li class="dropdown magz-dropdown magz-dropdown-megamenu"><a href="#">Xem Thêm<div class="badge">Hot
        </div><i class="ion-ios-arrow-right"></i> </a>
    <div class="dropdown-menu megamenu">
        <div class="megamenu-inner">
            <div class="row">
                <div class="col-md-3">
                    <div class="row">
                        <div class="col-md-12">
                            <h2 class="megamenu-title">Danh mục tin tức</h2>
                        </div>
                    </div>
                    <ul class="vertical-menu">
                        
                    <li><a onclick="movePage(4)"><i class="ion-ios-circle-outline"></i>${x_category[3]}</a></li>
                    <li><a onclick="movePage(5)"><i class="ion-ios-circle-outline"></i>${x_category[4]}</a>
                    </li>
                    <li><a onclick="movePage(6)"><i class="ion-ios-circle-outline"></i>${x_category[5]}</a></li>
                    <li><a onclick="movePage(7)"><i class="ion-ios-circle-outline"></i>${x_category[6]}</a>
                    </li>
                    <li><a onclick="movePage(8)"><i class="ion-ios-circle-outline"></i>${x_category[7]}</a></li>
                    </ul>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-12">
                            <h2 class="megamenu-title">Bài đăng nổi bật đang thịnh hành</h2>
                        </div>
                    </div>
                    <div class="row MenuMoreFTPostTren">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>
`
        $('.menuListCategory').append(items);
        console.log(x_category);
    }).fail(function (err) {
        console.log(err)

    });
}
//More Category

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}
//slide of home
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}
