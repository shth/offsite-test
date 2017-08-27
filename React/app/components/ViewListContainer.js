import React from 'react';
import ViewCover from './ViewCover';
import ViewList from './ViewList';

class ViewListContainer extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.fetchViews();
    }

    mockAPI() {
        return (new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000)
        })).then(() => {
            const status = (Math.floor(Math.random() * 2));
            const [viewCover, ...views] = viewList;

            return {
                status,
                viewCover,
                views,
            }
        })

    }

    fetchViews() {
        this.mockAPI()
            .then(response => {
                const {status, viewCover, views} = response;
                this.setState(response);
            })
    }

    render() {
        return (
            <div>
                <div>Im view list container</div>
                <div>status: {this.state.status}</div>
                <ViewCover/>
                <ViewList/>
            </div>
        )
    }
}

const viewList = [
    {
        image: 'b5d1a9f06f0241bf42c3672ca90c53d3.jpg'
        ,
        targetLink: 'https://www.hk01.com/01%E8%A7%80%E9%BB%9E/68137/-01%E8%A7%80%E9%BB%9E-%E5%8F%B0%E7%8D%A8%E5%B0%8E%E6%BC%94-%E7%8D%B2%E5%B9%B3%E5%8F%8D-%E5%BC%B5%E6%95%AC%E8%BB%92%E5%91%A2-'
        ,
        title: '「台獨導演」獲平反　張敬軒呢？'
        ,
        info: '陳玉勳執導的賀歲片電影《健忘村》，不但攝制預算大手筆、題材新穎，而且還結合大陸、台灣兩地資金與菁英人才，在台灣各地搭景拍攝，成為兩岸影業合作的最好範例。但此前，由於陳玉勳被指支持台……'
        ,
        date: '2017年1月27日'

    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/68089/-01%E8%A7%80%E9%BB%9E-APA%E9%85%92%E5%BA%97%E9%9B%96%E6%92%A4%E5%8F%B3%E7%BF%BC%E6%9B%B8-%E8%BB%8D%E5%9C%8B%E4%B8%BB%E7%BE%A9%E9%99%B0%E9%AD%82%E6%9C%AA%E6%95%A3"
        , image: "d7dd0992b84ec4f1620beda3b98402d9.jpg"

        , title: "APA酒店雖撤右翼書　軍國主義陰魂未散"
        , info: "APA酒店被揭在客房擺放多本否認南京大屠殺、否認強徵慰安婦等右翼書籍，惹來包括中韓在內的多國反彈，除中方批評有關做法挑釁中國遊客，內地旅遊業界宣布斷絕和APA的合作；南韓方面則透過…"
        , date: "2017年1月26日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/67641/-01%E8%A7%80%E9%BB%9E-%E5%A2%9E%E8%81%98PTU%E9%81%8F%E7%A4%BA%E5%A8%81-%E7%84%A1%E5%8A%A9%E5%8C%96%E8%A7%A3%E8%AD%A6%E6%B0%91%E5%B0%8D%E7%AB%8B"
        , image: "1c8dc60af5a7a9f7bb1e0a788a8dfdc2.jpg"

        , title: "增聘PTU遏示威　無助化解警民對立"
        , info: "平情而論，近年示威愈演激烈、警員甚至要在旺角開槍示警，警方無論在增強針對激烈示威行為的裝備、還是增聘專責處理激烈示威行為的隊伍，表面上都有其合理之處。但這種做法顯然治標不治本，無助…"
        , date: "2017年1月24日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/67391/-01%E8%A7%80%E9%BB%9E-%E4%B8%AD%E5%A4%AE-%E6%AC%BD%E9%BB%9E-%E6%9E%97%E9%84%AD-%E6%9E%97%E9%84%AD%E4%BB%A3%E8%A1%A8%E4%B8%AD%E5%A4%AE-"
        , image: "c5ca6e09537f3d83a1572386c1b1fb81.jpg"

        , title: "中央「欽點」林鄭？　林鄭代表中央？"
        , info: "在各個選舉民調中，林鄭月娥的民意支持度並非最高，但最多人認為她將當選下任特首，出現這個落差的主要原因，相信是由於有分析指她已獲中央「欽點」，並認為中聯辦等港澳事務行政機關支持她參選…"
        , date: "2017年1月23日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/67005/-%E7%A4%BE%E8%AB%96-%E9%A6%99%E6%B8%AF%E4%B8%89%E5%A4%A7%E7%B5%90%E6%A7%8B%E7%9F%9B%E7%9B%BE-%E7%89%B9%E9%A6%96%E5%80%99%E9%81%B8%E4%BA%BA%E8%A6%81%E6%9C%89%E7%AD%94%E6%A1%88"
        , image: "1ab6f74d69f7cd11ef28b8a3a3eb91fe.jpg"
        , title: "【社論】香港三大結構矛盾　特首候選人要有答案"
        , info: "隨着國務院在1月16日（周一）下午正式批准林鄭月娥與曾俊華辭任司長，兩人先後宣布參選特首，正式加入戰團。雖然已正式公布參選的，還有前法官胡國興和前行會成員葉劉淑儀，但以當前的戰況來…"
        , date: "2017年1月21日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/67892/-01%E8%A7%80%E9%BB%9E-%E6%9E%97%E9%84%AD%E7%AB%B6%E9%81%B8-%E9%97%9C%E5%85%AC-%E7%82%BA%E6%9B%BE%E4%BF%8A%E8%8F%AF%E9%80%A0%E5%8B%A2-"
        , image: "b197bc271a70b80a8888626c8eaed3c9.jpg"
        , title: "林鄭競選「關公」為曾俊華造勢？"
        , info: "在各個主要選舉民調中，林鄭月娥並非民望最高，但卻被公眾認為勝算最高，出現這種落差，相信是市民對「小圈子」選舉是否能如實反映普遍港人意願，存在極大疑問。而且按照目前形勢，林鄭月娥獲得…"
        , date: "2017年1月25日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/66969/-01%E8%A7%80%E9%BB%9E-%E8%8D%83%E5%B1%AF%E5%96%AE%E8%BB%8A%E5%BE%91%E9%81%B2%E6%9C%AA%E5%8B%95%E5%B7%A5-%E5%8D%80%E8%AD%B0%E5%93%A1%E5%8B%BF%E9%98%BB%E5%BE%B7%E6%94%BF%E8%90%BD%E5%AF%A6-"
        , image: "483e33690f60913bae5509b3077d9246.jpg"
        , title: "荃屯單車徑遲未動工　區議員勿阻德政落實　"
        , info: "反對理由欠理據　難以說服公眾區議員反對興建荃屯單車徑的原因之一，就是恐怕單車徑會帶來人流，影響該區樓價。惟此明顯是杞人憂天，現時港人崇尚綠色生活，單車徑不但不會導致樓價下……"
        , date: "2017年1月20日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/66704/-01%E8%A7%80%E9%BB%9E-Facebook%E6%88%90%E7%89%B9%E9%A6%96%E9%81%B8%E6%88%B0%E5%B9%B3%E5%8F%B0-%E8%B1%88%E6%AD%A2%E7%82%BA-%E5%91%83like-"
        , image: "9f6f5b458d594e31f39149f5d39c3893.jpg"
        , title: "Facebook成特首選戰平台　豈止為「呃like」？"
        , info: "特首參人是否開設facebook專頁，為何變成公眾關注的議題？相信是因為調查顯示，香港是全球facebook用戶佔人口比例最高的地方，現時使用facebook的人口約有500萬，每…"
        , date: "2017年1月19日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/66644/-01%E8%A7%80%E9%BB%9E-%E5%85%A8%E5%9F%8E%E9%97%9C%E6%B3%A8%E5%8A%89%E5%BE%B7%E8%8F%AF-%E7%89%B9%E9%A6%96%E9%81%B8%E6%88%B0%E5%95%9F%E7%A4%BA-"
        , image: "21ea27ebc8c9d48b683205137bb5afa5.jpg"
        , title: "全城關注劉德華　特首選戰啟示？"
        , info: "特首梁振英在周三（1月18日）宣讀他任內的最後一份施政報告，但不少港人更為關注的，可能是劉德華在泰國意外墮馬，更一度傳出他脊椎受重創，擔心他會有嚴重的後遺症。其後他透過聲明向公眾報…"
        , date: "2017年1月19日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/66492/-01%E8%A7%80%E9%BB%9E-%E5%92%8C%E8%AB%A7%E5%85%B1%E8%9E%8D-%E4%BA%A4%E7%99%BD%E5%8D%B7-%E6%96%BD%E6%94%BF%E5%A0%B1%E5%91%8A%E7%95%99%E9%81%BA%E6%86%BE"
        , image: "57ab52b48e8f3b703f88c9027981cd0a.jpg"
        , title: "「和諧共融」交白卷　施政報告留遺憾"
        , info: "梁振英宣讀他任內最後一份施政報告後，公眾對這份報告的初步評價似乎不高，這或許因為公眾已有印象，梁振英的任期只剩下不足半年，一個「看守」特首所撰寫的施政報告無論寫得再好，是否能在未來…"
        , date: "2017年1月18日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/66185/-01%E8%A7%80%E9%BB%9E-%E5%B0%81%E6%AE%BA%E5%BC%B5%E6%95%AC%E8%BB%92%E9%A1%AF%E6%B0%91%E7%B2%B9%E6%AD%AA%E9%A2%A8-%E6%84%9B%E5%9C%8B%E8%AE%8A-%E5%80%92%E7%B1%B3-"
        , image: "8c1116ec6f10f55ec20bd22e4b326dcf.jpg"
        , title: "封殺張敬軒顯民粹歪風　愛國變「倒米」"
        , info: "如果張敬軒確實是港獨，那麼內地網民強烈抵制，就是「出師有名」。但客觀地說，張敬軒的言行很難稱得上是「港獨」，雖然他曾領唱爭取普選的社運歌曲《問誰未發聲》，甚至曾在2014年的雨傘運…"
        , date: "2017年1月17日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/66025/-01%E8%A7%80%E9%BB%9E-%E9%9B%99%E5%8F%B8-%E8%BE%AD%E5%91%88%E5%90%8C%E6%97%A5%E6%89%B9-%E5%8C%97%E4%BA%AC%E7%99%BC%E5%8F%83%E9%81%B8-%E4%B8%8D%E5%8F%8D%E5%B0%8D%E9%80%9A%E7%9F%A5%E6%9B%B8-"
        , image: "a8e0b5cb2feaa9ed61c2ace61edf8171.jpg"
        , title: "「雙司」辭呈同日批　北京發參選「不反對通知書」"
        , info: "長期以來，香港政壇以至社會上，一直有忖度中央領導心意的習慣。這種揣測文化，具體的體現是對北京一些舉措的旁枝末節，以放大鏡甚至顯微鏡觀之，香港社會對此類觀察北京「眉頭眼額」的姿態解讀…"
        , date: "2017年1月16日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/65686/-01%E8%A7%80%E9%BB%9E-8%E5%B9%B4%E6%94%B9%E7%82%BA14%E5%B9%B4-%E9%87%8D%E6%96%B0%E5%AF%A9%E8%A6%96%E6%8A%97%E6%88%B0%E5%8F%B2"
        , image: "7dc37cc2fe5985fcfe9314ecbe84dd02.jpg"
        , title: "8年改為14年　重新審視抗戰史"
        , info: "一石激起千重浪，該消息一經報道，立刻遭到各方輿論的解讀。中國官方的解讀多顯得籠統和官僚。中國抗戰史從八年變為十四年，不是簡單的數字遊戲，也不只是概念上的一項修正，而是中共在清晰認知…"
        , date: "2017年1月14日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/65503/-%E7%A4%BE%E8%AB%96-%E5%9C%9F%E5%9C%B0%E6%94%BF%E7%AD%96%E6%96%B0%E6%80%9D%E7%B6%AD-%E5%B0%88%E6%AC%BE%E5%B0%88%E7%94%A8%E5%8A%A9%E5%BB%BA%E5%85%AC%E5%B1%8B-%E5%8D%B0%E8%8A%B1%E7%A8%85%E8%BE%A3%E6%8B%9B%E6%87%89%E6%81%86%E5%B8%B8%E5%8C%96"
        , image: "5af8f2c58222d940c6ac48de8da7df14.jpg"
        , title: "【社論】土地政策新思維　專款專用助建公屋　印花稅辣招應恆常化"
        , info: "根據差餉物業估價署最新公布的樓價指數，香港住宅樓價已突破2015年9月的高位，再創歷史新高。自2010年開始，港府已先後推出四輪物業印花稅「辣招」，期間樓價仍升不停，反映市場已適應…"
        , date: "2017年1月14日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/65583/-01%E8%A7%80%E9%BB%9E-%E4%B9%9D%E5%B7%B4%E7%94%B3%E5%B0%88%E7%87%9F%E6%AC%8A%E7%BA%8C%E6%9C%9F-%E4%B8%8D%E8%83%BD%E5%8F%AA%E6%9C%89-%E5%B0%8F%E6%81%A9%E5%B0%8F%E6%83%A0-"
        , image: "396f05723e5b9f30e46855d07a6322ba.jpg"
        , title: "九巴申專營權續期　不能只有「小恩小惠」"
        , info: "的確，近年隨着人手成本上升，九巴亦須投入資源更新車隊，以符合新的環保標準，存在一定經營壓力。另外，政府以鐵路為核心的公共交通規劃下，九巴的業務發展亦不斷受挑戰。然而，九巴同……"
        , date: "2017年1月13日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/65291/-01%E8%A7%80%E9%BB%9E-%E6%9E%97%E9%84%AD%E8%BE%AD%E8%81%B7%E5%82%99%E9%81%B8-%E5%95%8F%E9%BC%8E%E7%89%B9%E9%A6%96%E9%82%84%E9%A0%88%E5%8A%AA%E5%8A%9B"
        ,
        image: "5b692d9cab08dc15a6bb863f44968b16.jpg"
        ,
        title: "林鄭辭職備選　問鼎特首還須努力",
        info: "若以這四大條件中的頭兩項，即「愛國愛港、中央信任」觀之，林鄭月娥幾乎可肯定是合格有餘，否則她不可能獲中央任命為政務司長。因此，要檢視林鄭是否下任特首的合適人選，主要問題在於她是否合…"
        ,
        date: "2017年1月12日"
    },

    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/65112/-01%E8%A7%80%E9%BB%9E-%E8%87%AA%E9%A1%98%E6%8D%90%E8%B4%88%E5%99%A8%E5%AE%98%E6%88%90%E6%95%88%E4%B8%8D%E5%BD%B0-%E9%A0%90%E8%A8%AD%E9%BB%98%E8%A8%B1-%E6%88%96%E6%88%90%E7%97%85%E4%BA%BA%E7%A6%8F%E9%9F%B3"
        , image: "ccfa633edaf539d1bfffcd226657ba11.jpg"
        , title: "自願捐贈器官成效不彰 「預設默許」或成病人福音"
        , info: "可惜，香港的器官捐贈比例一直偏低，這個情況在全球不同地方亦是普遍現象。法國則嘗試想出解決辦法，法國的器官捐贈法在2017年1月1日生效，為「預設默許」（presume conse……"
        , date: "2017年1月11日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/64841/-01%E8%A7%80%E9%BB%9E-%E7%BE%8E%E5%9C%8B%E6%89%B9%E4%BF%84%E5%B9%B2%E9%A0%90%E5%A4%A7%E9%81%B8-%E5%87%BA%E5%BE%97%E4%BE%86%E8%A1%8C%E4%BE%BF%E8%A6%81%E9%82%84"
        ,
        image: "616612017ae36d782266aa84e857eaed.jpg"
        ,
        title: "美國批俄干預大選　出得來行便要還",
        info: "干涉別國內政　美認第二誰敢認第一？恰恰是因為，美國在干涉他國政治這一方面的經驗，實在太豐富。俄羅斯是否干涉2016美國大選，這尚未被證實，但卻也並不那麼重要&amp;mda……"
        ,
        date: "2017年1月10日"
    },
    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/64673/-01%E8%A7%80%E9%BB%9E-%E7%B3%BE%E7%9C%BE%E8%A1%9D%E6%93%8A%E7%BE%85%E5%86%A0%E8%81%B0-%E4%BB%A5%E6%84%9B%E6%B8%AF%E4%B9%8B%E5%90%8D%E8%A1%8C%E5%AE%B3%E6%B8%AF%E4%B9%8B%E5%AF%A6"
        , image: "503eeecc7d5957d78411eb9a43a2e970.jpg"
        , title: "糾眾衝擊羅冠聰　以愛港之名行害港之實"
        , info: "鄧相超事件，緣起山東建築大學藝術學院副院長鄧相超在網上諷刺毛澤東，因而招致擁毛「水軍」在網上洗版抨擊。擁毛者後更到校內示威引發衝突，鄧因而被免去省政府參事、省政協常委等職務，最後更…"
        , date: "2017年1月09日"
    },

    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/64230/-%E7%A4%BE%E8%AB%96-%E5%9C%8B%E5%AE%B6%E6%B2%BB%E7%90%86%E7%8F%BE%E4%BB%A3%E5%8C%96-%E8%A6%81%E5%96%84%E6%B2%BB%E5%85%88%E5%BD%B0%E6%B3%95%E6%B2%BB"
        , image: "ff3d3ffd72281306ea60d00b1dc75bc1.jpg"
        , title: "【社論】國家治理現代化 要善治先彰法治"
        , info: "有不少內地媒體和中國專家認為，展望2017，中國的眾多改革之中，第五個現代化——即國家治理體系和治理能力的現代化，將是認識新一年中國政治的關鍵概念，甚至是重…"
        , date: "2017年1月07日"
    },

    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/64224/-01%E8%A7%80%E9%BB%9E-%E5%9C%98%E8%B3%BC%E8%B2%B7%E9%A4%B8%E7%B8%B1%E9%81%95%E8%A6%8F-%E8%A6%81%E7%9F%A5%E8%83%8C%E5%BE%8C%E6%B0%91%E7%94%9F%E8%8B%A6"
        , image: "aa5927859d59a5a3d2453a35214f8f84.jpg"
        , title: "團購買餸縱違規　要知背後民生苦"
        , info: "約200多名天水圍居民曾於年中發起遊行，抗議領展壟斷該區街市，要求設立食環署街市，引入競爭。皆因在領展壟斷下，天水圍區的餸價格明顯較其他區份高昂，有調查曾指天水圍的餸菜，較被譽為「…"
        , date: "2017年1月06日"
    },

    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/64001/-01%E8%A7%80%E9%BB%9E-%E8%A8%82%E6%89%93%E5%B7%A5%E4%BB%94%E4%B8%8B%E7%8F%AD-%E9%9B%A2%E7%B7%9A%E6%AC%8A-%E6%8C%87%E5%BC%95-%E5%91%8A%E5%88%A5on-call-24%E5%B0%8F%E6%99%82"
        , image: "5ceaad4ca6582b81c8457f247784c3fb.jpg"
        , title: "訂打工仔下班「離線權」指引　告別on call 24小時"
        , info: "「離線權」乃法國《勞動法典》中的新設條例，法例規定人手達50人以上的公司須與員工協定收發電郵的時間，訂立明確的「離線權」準則，以保障員工在工餘時間得以休息。有不少組織指在立法後「離…"
        , date: "2017年1月05日"
    },

    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/63832/-01%E8%A7%80%E9%BB%9E-%E7%9C%81%E6%B8%AF%E7%9B%83%E6%89%93%E5%87%BA-%E7%88%AD%E6%B0%A3%E6%B3%A2-%E9%A6%99%E6%B8%AF%E4%BA%BA%E6%92%90%E9%A6%99%E6%B8%AF%E9%9A%8A"
        , image: "efa895f4ed398161017f9ecd11f67ccb.jpg"
        , title: "省港盃打出「爭氣波」　香港人撐香港隊"
        , info: "由於省港盃非國際A級賽事，球隊有權不放人參賽，在省港盃開賽前，港隊已不斷有主將退隊，結果港隊只剩下二線球會的年輕球員成港隊主力。因此，港隊在今屆省港盃開賽前已被看低一線，更有人質疑…"
        , date: "2017年1月04日"
    },

    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/63617/-01%E8%A7%80%E9%BB%9E-%E5%A4%A7%E8%81%AF%E7%9B%9F-%E7%82%BA%E6%92%90%E8%80%8C%E6%92%90-%E8%A5%BF%E4%B9%9D%E6%95%85%E5%AE%AE%E6%84%88%E6%8F%8F%E6%84%88%E9%BB%91"
        , image: "f96f9d2841fe3bf9781bf6ff0cf8dfdd.jpg"
        , title: "「大聯盟」為撐而撐　西九故宮愈描愈黑"
        , info: "中華廠商會會長李秀恒在周二（1月3日）上午接受電台訪問時指，北京故宮到香港西九成立博物館，是本港收藏家夢寐以求的事，他擔任主席的香港中華文化藝術推廣基金等組織，將組成「支持興建『香…"
        , date: "2017年1月03日"
    },

    {
        targetLink: "https://www.hk01.com/01%E8%A7%80%E9%BB%9E/63040/%E5%8B%95%E7%9B%AA%E7%9A%842016-%E4%BD%8E%E9%96%8B%E9%AB%98%E8%B5%B0-%E6%96%B0%E7%9A%84%E4%B8%80%E5%B9%B4%E7%9B%BC%E8%8B%A6%E7%9B%A1%E7%94%98%E4%BE%86"
        , image: "a45a4da4e86015c1484f1214da8aed55.jpg"
        , title: "動盪的2016「低開高走」 新的一年盼苦盡甘來"
        , info: "2016年是香港政治、社會動盪的一年，由年初的旺角騷動、港獨急速冒起、張德江訪港釋放和風，隨後人大就港獨議員宣誓問題釋法，至年底解除泛民議員回鄉證禁令、特首梁振英宣布不再競逐連任，…"
        , date: "2016年12月31日"
    }
]
export default ViewListContainer