import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSubmenu: false
        }
        this.toggleSubmenu = this.toggleSubmenu.bind(this)
    }

    toggleSubmenu() {
        const {openSubmenu} = this.state;
        this.setState({openSubmenu: !openSubmenu})
    }

    render() {
        const style = {
            submenu: {
                display: 'block'
            }
        }
        return (
            <div>
                <nav className="menu__main">
                    <div className="wrapper">
                        <div className="menu__main__scroll">
                            <ul className="menu__main_container float_left" style={{width: '1334px'}}>
                                {menuItems.map(item => (
                                    <li className="menu__main--tit" key={item.target}>
                                        <a href={item.target}>{item.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="btn_more float_right" onClick={this.toggleSubmenu}>
                            <div className="menu-toggle-btn">
                                <span/>
                                <span/>
                                <span/>
                            </div>
                        </div>
                    </div>
                </nav>
                <nav id="touch_submenu" className="menu__submenu" style={this.state.openSubmenu ? style.submenu : {}}>
                    <div id="touch_submenu_wrapper_container" className="wrapper"
                         style={{top: 0, left: 0, zIndex: 999}}>
                        <div className="touch_submenu touch_submenu_wrapper">
                            <div className="menu__submenu__search" data-search-form="">
                                <input type="search" name="keyword" placeholder="搜尋"/>
                                <div className="btn">搜尋</div>
                            </div>
                        </div>
                        <ul className="menu__submenu--list">
                            {submenuItems.map(item => (
                                <li><a href={item.target}>{item.text}</a></li>
                            ))}
                        </ul>
                        <div className="static_links">
                            <ul>
                                {submenuStaticItem.map(item => (
                                    <li><a href={item.target}>{item.text}</a></li>
                                ))}
                            </ul>
                            <div className="socialmedia_channel">
                                {submenuSocialMediaItem.map(item => (
                                    <a href={item.target} target="_blank"><img
                                    src={`/images/${item.image}`} style={{width: '50px'}}/></a>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

const menuItems = [

    {target: "https://www.hk01.com/index.html", text: "主頁"},

    {target: "https://www.hk01.com/channel/%E6%96%B0%E8%81%9E", text: "新聞"},

    {target: "http://2017hkceelection.hk01.com/index.html", text: "特首選舉2017"},

    {target: "https://www.hk01.com/section/01%E8%A7%80%E9%BB%9E", text: "01觀點"},

    {target: "https://www.hk01.com/blogger/01%E5%8D%9A%E8%A9%95", text: "01博評"},

    {target: "https://www.hk01.com/channel/%E7%A4%BE%E5%8D%80", text: "社區"},

    {target: "https://www.hk01.com/channel/%E5%A8%9B%E6%A8%82", text: "娛樂"},

    {target: "https://www.hk01.com/section/%E5%9C%8B%E9%9A%9B", text: "國際"},

    {target: "https://www.hk01.com/channel/%E5%A5%B3%E7%94%9F", text: "女生"},

    {target: "https://www.hk01.com/section/%E5%A5%BD%E7%94%9F%E6%B4%BB", text: "好生活"},

    {target: "https://www.hk01.com/section/%E9%AB%94%E8%82%B2", text: "體育"},

    {target: "https://www.hk01.com/channel/%E7%86%B1%E8%A9%B1", text: "熱話"},

    {target: "https://www.hk01.com/channel/%E7%A7%91%E6%8A%80%E7%8E%A9%E7%89%A9", text: "科技玩物"},

    {target: "http://philosophy.hk01.com", text: "01哲學"},

    {target: "https://www.hk01.com/photostory", text: "01影像"},

    {target: "https://www.hk01.com/channel/01%E6%B4%BB%E5%8B%95", text: "01活動"},

    {target: "http://space.hk01.com/", text: "01空間"},

    {target: "https://www.hk01.com/channel/%E6%9C%83%E5%93%A1%E5%B0%88%E5%8D%80", text: "會員專區"},

]

const submenuItems = [

    {target: "http://www.hk01.com/index.html", text: "主頁"},
    {target: "http://www.hk01.com/module/hotnews", text: "熱門文章"},
    {target: "http://www.hk01.com/module/latestnews", text: "最新文章"},
    {target: "https://www.hk01.com/channel/%E6%96%B0%E8%81%9E", text: "新聞"},
    {target: "http://2017hkceelection.hk01.com/index.html", text: "特首選舉"},
    {target: "https://www.hk01.com/section/%E6%B8%AF%E8%81%9E", text: "港聞"},
    {target: "https://www.hk01.com/section/%E5%85%A9%E5%B2%B8", text: "兩岸"},
    {target: "https://www.hk01.com/section/%E7%B6%93%E6%BF%9F", text: "經濟"},
    {target: "https://www.hk01.com/section/%E7%92%B0%E4%BF%9D", text: "環保"},
    {target: "https://www.hk01.com/section/%E7%BD%AA%E6%A1%88", text: "罪案"},
    {target: "https://www.hk01.com/channel/%E7%A4%BE%E5%8D%80", text: "社區"},
    {target: "https://www.hk01.com/channel/%E5%A8%9B%E6%A8%82", text: "娛樂"},
    {target: "https://www.hk01.com/channel/%E9%9B%BB%E5%BD%B1", text: "電影"},
    {target: "https://www.hk01.com/channel/%E9%9F%B3%E6%A8%82", text: "音樂"},
    {target: "https://www.hk01.com/channel/%E9%9F%93%E8%BF%B7", text: "韓迷"},
    {target: "https://www.hk01.com/section/%E5%9C%8B%E9%9A%9B", text: "國際"},
    {target: "https://www.hk01.com/channel/%E5%A5%B3%E7%94%9F", text: "女生"},
    {target: "https://www.hk01.com/section/%E5%A5%BD%E7%94%9F%E6%B4%BB", text: "好生活"},
    {target: "https://www.hk01.com/channel/%E8%A6%AA%E5%AD%90", text: "親子"},
    {target: "https://www.hk01.com/channel/%E5%AF%B5%E7%89%A9", text: "寵物"},
    {target: "https://www.hk01.com/channel/01%E6%95%99%E7%85%AE", text: "01教煮"},
    {target: "https://www.hk01.com/section/%E9%AB%94%E8%82%B2", text: "體育"},
    {target: "https://www.hk01.com/section/%E8%B7%91%E6%AD%A5", text: "跑步"},
    {target: "https://www.hk01.com/channel/%E7%86%B1%E8%A9%B1", text: "熱話"},
    {target: "https://www.hk01.com/channel/%E7%A7%91%E6%8A%80%E7%8E%A9%E7%89%A9", text: "科技玩物"},
    {target: "http://philosophy.hk01.com/index.html", text: "01哲學"},
    {target: "https://www.hk01.com/section/01%E8%A7%80%E9%BB%9E", text: "01觀點"},
    {target: "https://www.hk01.com/blogger/01%E5%8D%9A%E8%A9%95", text: "01博評"},
    {target: "http://www.hk01.com/bloggers", text: "博評作者"},
    {target: "https://www.hk01.com/channel/01%E5%81%B5%E6%9F%A5", text: "01偵查"},
    {target: "https://www.hk01.com/photostory", text: "01影像"},
    {target: "http://www.hk01.com/tag/9972", text: "01 Video"},
    {target: "https://www.hk01.com/section/01%E6%B4%BB%E5%8B%95", text: "01活動"},
    {target: "http://space.hk01.com/index.html", text: "01空間"},
    {target: "https://www.hk01.com/channel/%E6%9C%83%E5%93%A1%E5%B0%88%E5%8D%80", text: "會員專區"},
    {target: "https://www.hk01.com/issue", text: "01議題"},

]

const submenuStaticItem = [
    {target: "https://www.hk01.com/Pages/Hotline", text: "01線報"},
    {target: "https://www.hk01.com/Pages/PrivacyTerms", text: "私隱條例"},
    {target: "https://www.hk01.com/mediakit/index.html", text: "廣告查詢"},
    {target: "https://www.hk01.com/Pages/ContactUs", text: "聯絡我們"},
    {target: "https://www.hk01.com/Pages/Recruitment", text: "加入我們"},
]

const submenuSocialMediaItem = [
    {target: "https://www.facebook.com/hk01wemedia", image: "facebook_channel.png"},
    {target: "http://www.youtube.com/c/%E9%A6%99%E6%B8%AF01WeMedia", image: "youtube_channel.png"},
    {target: "https://www.instagram.com/hk01wemedia", image: "instagram_channel.png"},

]
export default Navbar