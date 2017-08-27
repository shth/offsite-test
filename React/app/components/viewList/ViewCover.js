import React from 'react';

class ViewCover extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {viewCover} = this.props;
        return (
            <div className="views_cover">
                <div className="views_cover__img ">
                    <a href={viewCover.targetLink}>
                        <img src={`/images/${viewCover.image}`}/>
                    </a>
                </div>
                <div className="views_cover__content">
                    <div className="views_cover__content__tag">
                        <tag>01觀點</tag>
                    </div>
                    <a href={viewCover.targetLink}>
                        <div className="views_cover__content__tit">
                            <h3>【01觀點】{viewCover.title}</h3>
                        </div>
                        <div className="views_cover__content__info">
                            {viewCover.info}
                        </div>
                    </a>
                    <div className="views_cover__content__time">
                        <span className="clock">{viewCover.date}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewCover