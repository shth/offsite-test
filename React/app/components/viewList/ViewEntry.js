import React from 'react';

class ViewEntry extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {viewEntry} = this.props;
        return (
            <div className="blog_listing__item">
                <a href={viewEntry.targetLink}>
                    <div className="blog_listing__item__img ">
                        <img src={`/images/${viewEntry.image}`}/>
                    </div>
                    <div className="blog_listing__item__content">
                        <div className="blog_listing__item__content__tag">
                            <tag>01觀點</tag>
                        </div>
                        <div className="blog_listing__item__content__tit">
                            <h3>【01觀點】{viewEntry.title}</h3>
                        </div>
                        <div className="blog_listing__item__content__caption">
                            {viewEntry.info}
                        </div>
                        <div className="blog_listing__item__content__time"><span className="clock">{viewEntry.date}</span>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}
export default ViewEntry