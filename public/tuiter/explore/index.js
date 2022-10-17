import NavigationSidebar from "../../tuiter/NavigationSideBar/index.js"
import WhoToFollowList from "../../tuiter/WhoToFollowList/index.js"
import PostSummaryList from "../../tuiter/PostSummaryList/index.js"
function exploreComponent() {
    $('#wd-explore').append(`
    <div class="col-2 col-md-2 col-lg-1 col-xl-2 left_menu">
    ${NavigationSidebar()}
    </div>
    <div class="col-10 col-lg-7 col-xl-6">
        <div class="wd-A_container">
            <div class="wd-A_search_box">
                <div class="wd-A_search">
                    <div class="wd-A_search_input">
                        <i class="bi bi-search"></i>
                        <input type="text" placeholder="Search Twitter"/>
                    </div>
                    <i class="bi bi-gear-fill"></i>           
                </div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">For you</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Trending</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">News</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link">Sprots</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Entertainment</a>
                    </li>
                </ul>
            </div>
            <div class="wd-A_content">
                <img class="space" src="./img/space.png" alt="">
                ${PostSummaryList()}
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-xl-4 d-none d-sm-none d-md-none d-lg-block">
        <div class="follow_box">
        <p class="tollow_title">Who to follow</p>
            ${WhoToFollowList()}
        </div>
    </div>
   </div>
    `);
 }
 $(exploreComponent);
 
 