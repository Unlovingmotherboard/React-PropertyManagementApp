import React from "react";
import { Row, Col, Card, Button, Chip } from "react-materialize"
import { withRouter } from 'react-router-dom';

function TenantUpdatesCard(props) {
    return (
        <div className="container-fluid">
            <Row>
                <Col m={6} s={12} l={12} xl={12}>
                    <Card>

                        <h5>{props.type}</h5>
                        <p>{props.message}</p>

                        <Chip>
                            {props.status}
                        </Chip>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}



export default withRouter(TenantUpdatesCard);