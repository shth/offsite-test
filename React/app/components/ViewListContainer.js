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
        image: 'b5d1a9f06f0241bf42c3672ca90c53d3.jpg'
        ,
        targetLink: 'https://www.hk01.com/01%E8%A7%80%E9%BB%9E/68137/-01%E8%A7%80%E9%BB%9E-%E5%8F%B0%E7%8D%A8%E5%B0%8E%E6%BC%94-%E7%8D%B2%E5%B9%B3%E5%8F%8D-%E5%BC%B5%E6%95%AC%E8%BB%92%E5%91%A2-'
        ,
        title: '「台獨導演」獲平反　張敬軒呢 hihi？'
        ,
        info: '陳玉勳執導的賀歲片電影《健忘村》，不但攝制預算大手筆、題材新穎，而且還結合大陸、台灣兩地資金與菁英人才，在台灣各地搭景拍攝，成為兩岸影業合作的最好範例。但此前，由於陳玉勳被指支持台……'
        ,
        date: '2017年1月27日'

    },

]
export default ViewListContainer