import React from 'react';

// ====

class Resume extends React.Component {
    render() {
        const { boxOne, boxTwo, boxTree, boxFour } = this.props;

        return (
            <section className="hero is-dark is-bold">
                <div className="hero-body">
                    <div className="container">
                        <nav className="level">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">{boxOne.title}</p>
                                    <p className="title">{boxOne.amount}</p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">{boxTwo.title}</p>
                                    <p className="title">{boxTwo.amount}</p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">{boxTree.title}</p>
                                    <p className="title">{boxTree.amount}</p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">{boxFour.title}</p>
                                    <p className="title">{boxFour.amount}</p>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>
        );
    }
}

// ====

export default Resume;