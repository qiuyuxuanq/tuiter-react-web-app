import who from "./who.js"
const list = () => {  
    let htmlStr = ""
    who.forEach((item, index) => {
        htmlStr += `
            <div class="follow_item">
                <div class="item_left">
                    <img src="./img/1.jpg" alt="">
                    <div class="ln">
                        <p>${item.userName}</p>
                        <span>@${item.handle}</span>
                    </div>
                </div>
                <div class="item_right">
                    Follow
                </div>
            </div>        
        `
    })  
    console.log(htmlStr) 
    return (htmlStr) }
    // $(list);
 export default list();