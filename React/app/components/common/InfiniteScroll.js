import React from 'react';

class InfiniteScroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times_scrolled: 1,
            fetching: false,
            initialPage: 0,
            currentPage: 1,
            fetchLength: 3
        }
        const $window = $(window);
        let timer;
        var isScrolledIntoView = function (elem) {
            elem = $(elem);
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();

            var elemTop = elem.offset().top;
            var elemBottom = elemTop + elem.height();

            return ((elemBottom <= docViewBottom));
        };

        (() => {
            $window.scroll((e) => {
                clearTimeout(timer);
                if (this.state.fetching || !isScrolledIntoView(this.rootElem)) return;

                timer = setTimeout(() =>{
                    this.fetchMore();
                }, 50);
            })
        })()
    }

    fetchMore() {
        this.setState({fetching: true});
        this.props.loadMoreFunction()
            .then(() => {
                this.setState({fetching: false})
            })
    }

    render() {
        const {InfiniteScroll} = this.props;
        const {fetching} = this.state;
        return (
            <section ref={elem => this.rootElem = elem}>
                {this.props.children}
                {(fetching && <div>Loading...</div>)}
            </section>
        )
    }
}

export
default
InfiniteScroll