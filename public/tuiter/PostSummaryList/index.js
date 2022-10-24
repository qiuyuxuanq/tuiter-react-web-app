import post from "./post.js"
const PostSummaryList  = () => {  
    let htmlStr = ''
    post.forEach((item)=>{
        htmlStr += `
        <div class="wd-A_item_box wd-A_flex">
        <div class="wd-A_item">
            <div class="wd-A_left">
                <span style="color: lightgray;">${item.topic}</span>
                <p>
                    ${item.userName}
                    <i class="bi bi-record-fill"></i>
                    ·${item.time}
                </p>
                <p>${item.title}</p>
            </div>
            <a href="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"><img src="./img/2.jpg" alt=""></a>
        </div>
    </div>
        `
    })
   return (htmlStr); }
export default PostSummaryList;

