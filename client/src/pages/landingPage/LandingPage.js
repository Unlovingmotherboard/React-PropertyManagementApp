import React, { Component } from "react";
import { Carousel, Parallax } from "react-materialize";


class LandingPage extends Component {
    render() {
        return (
            <div>
                <Carousel options={{ fullWidth: true, indicators: true }} className="white-text center">
                    <div className="red">
                        <h2>
                            First Panel
                        </h2>
                        <p>
                            This is your first panel
                        </p>
                    </div>
                    <div className="amber">
                        <h2>
                            Second Panel
                        </h2>
                        <p>
                            This is your second panel
                        </p>
                    </div>
                    <div className="green">
                        <h2>
                            Third Panel
                        </h2>
                        <p>
                            This is your third panel
                        </p>
                    </div>
                    <div className="blue">
                        <h2>
                            Fourth Panel
                        </h2>
                        <p>
                            This is your fourth panel
                        </p>
                    </div>
                </Carousel>


                <Parallax image={<img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" />} />
                <div className="section white">
                    <div className="row container">
                        <h2 className="header">
                            Parallax
                        </h2>
                        <p className="grey-text text-darken-3 lighten-3">
                            Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.
                        </p>
                    </div>
                </div>
                <Parallax image={<img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80" />} />
            </div>
        );
    }
}

export default LandingPage;
