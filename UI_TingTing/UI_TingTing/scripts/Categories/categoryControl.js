
$(document).ready(function () {
    //loadContent();
    console.log(localStorage.getItem("movePage"))
    getcategory()
    
})

var fetchCategoryControl = {
    url: "https://636c9892ab4814f2b268a6b3.mockapi.io/api/v1/Category",
    method: "GET",
};
var fetchPostsControl = {
    url: "https://636c9892ab4814f2b268a6b3.mockapi.io/api/v1/posts",
    method: "GET",
};
var fetchPostsCategory = {
    url: `${API_PATH}/post`,
    method: "GET",
    timeout: 0,
};

function movePage(ra)
{
    localStorage.setItem("movePage", ra);
    location.pathname="category.html";
}
async function getcategory(){
    var idCategory = localStorage.getItem("movePage")
    var cateTemp
    $.ajax(fetchCategoryControl).done(function (response) {

        response.forEach((item, index) => {
            if(index+1 == Number(idCategory)){
                console.log(item.title)
                // location.pathname="category.html";
                document.getElementById("active-content").innerHTML = item.title;
                document.getElementById("content").innerHTML = item.title;
                var pageSubtitle = `Hiện toàn bộ các bài viết liên quan đến <i>${item.title}</i>`
                $('.page-subtitle').append(pageSubtitle);
                getPostsCategory(item.title)
            }
            
        })
    })
    
}

async function getPostsCategory(category){
    $.ajax(fetchPosts).done(function (response) {
        response.reverse().forEach((item, index) => {
            if(item.category.toLowerCase() == category.toLowerCase())
            {
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
                                    <p  style="word-wrap: break-word;">
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
                    $('#category-home-page').append(itemFeatured);
            }
        })
        

    })
}


//khi click vào "Thể thao" -> chuyển đến trang category và load bài viết có category = "sport" 

//khi click vào "Tin tức Việt Nam" -> chuyển đến trang category và load bài viết có category = "vietnamnew" 

//khi click vào "Du lịch" -> chuyển đến trang category và load bài viết có category = "travel" 

//khi click vào "Tin nóng" -> chuyển đến trang category và load bài viết có category = "hotnew" 

//khi click vào "Giải trí" -> chuyển đến trang category và load bài viết có category = "technology" 

//khi click vào "Xe cộ" -> chuyển đến trang category và load bài viết có category = "car" 

//khi click vào "Công nghệ" -> chuyển đến trang category và load bài viết có category = "technology" 

//khi click vào "Ẩm thực" -> chuyển đến trang category và load bài viết có category = "culinary" 