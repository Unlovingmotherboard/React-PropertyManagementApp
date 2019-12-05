import React, { Component } from "react";
import { Carousel, Parallax, Slider, Slide, Caption } from "react-materialize";

import "../LandingPage Styles/style.css"


class LandingPage extends Component {
    render() {
        return (
            <div>

                <Slider
                    fullscreen={false}
                    options={{
                        duration: 500,
                        height: 700,
                        indicators: true,
                        interval: 6000
                    }}
                >
                    <Slide image={<img alt="" className="darken" src="https://realestate.findlaw.com/content/public/realestate/landlord-tenant-law/your-rights-as-a-tenant/jcr%3acontent/pg/articleHeading/imageInLine.coreimg.jpeg/1559146517273.jpeg" />}>
                        <Caption placement="center">
                            <h3>
                                Connecting landlords and tenants
                            </h3>
                            <h5 className="light grey-text text-lighten-3">
                                All in one page!
                            </h5>
                        </Caption>
                    </Slide>
                    <Slide image={<img alt="" className="darken" src="https://www.yardibreeze.com/wp-content/uploads/sites/12/2019/01/Easy-Ways-To-Make-Tenants-Happy-7240-feature.jpg" />}>
                        <Caption placement="left">
                            <h3>
                                Left Aligned Caption
                            </h3>
                            <h5 className="light grey-text text-lighten-3">
                                Here's our small slogan.
                            </h5>
                        </Caption>
                    </Slide>
                    <Slide image={<img alt="" className="darken" src="https://www.comeseeyournewhouse.com/wp-content/uploads/2018/07/Family-Moving.jpg" />}>
                        <Caption placement="right">
                            <h3>
                                Making moving easy for any size family!
                            </h3>
                            <h5 className="light grey-text text-lighten-3">
                                Apply Today!
                            </h5>
                        </Caption>
                    </Slide>
                </Slider>


                <Parallax image={<img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" />} />
                <div className="section white">
                    <div className="row container">
                        <h2 className="header">
                            Quality Homes LLC.
                        </h2>
                        <p className="grey-text text-darken-3 lighten-3">
                            A powerful property management application aimed at centralizing tenant to landlord communication.  
                        </p>
                    </div>
                </div>
                <Parallax image={<img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80" />} />

                <Parallax image={<img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" />} />
                <div className="section white">
                    <div className="row container">
                        <h2 className="header">
                            Communication
                        </h2>
                        <p className="grey-text text-darken-3 lighten-3">
                            A powerful property management application aimed at centralizing tenant to landlord communication.  
                        </p>
                    </div>
                </div>
                <Parallax image={<img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80" />} />

            </div>
        );
    }
}

export default LandingPage;
