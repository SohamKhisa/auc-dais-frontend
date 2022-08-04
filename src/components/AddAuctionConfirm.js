import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import axios from "axios";

class AddAuctionConfirm extends React.Component{
    continue = e => {
        e.preventDefault();
        // api call here
        // use axios to post to server
        let ownerId = localStorage.getItem('user_id');
        const {values : {product_name, product_description, minimum_price, start_date, start_time, end_date, end_time,
            address, photos, tags}} = this.props;
        let auction_start_date = start_date + " " + start_time;
        let auction_end_date = end_date + " " + end_time;
        let url = "http://localhost:8080/auction_products/create" ;

        axios.post(url,
            {},
            {
                params:{
                    ownerId: ownerId,
                    product_name: product_name,
                    product_description: product_description,
                    minimum_price: minimum_price,
                    auction_start_date: auction_start_date,
                    auction_end_date: auction_end_date,
                    photos: photos,
                    tags: tags,
                    address: address

                }
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });


        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const marginTop = {
            marginTop: "10px"
        }
        const {values : {product_name, product_description, minimum_price, start_date, start_time, end_date, end_time,
        auction_type, address, photos, tags}} = this.props;
        return (
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Confirm information </Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>Product Name: {product_name}</ListGroup.Item>
                                        <ListGroup.Item>Product Description: {product_description}</ListGroup.Item>
                                        <ListGroup.Item>Minimum Bid: {minimum_price}</ListGroup.Item>
                                        <ListGroup.Item>Start Date: {start_date}</ListGroup.Item>
                                        <ListGroup.Item>Start Time: {start_time}</ListGroup.Item>
                                        <ListGroup.Item>End Date: {end_date}</ListGroup.Item>
                                        <ListGroup.Item>End Time: {end_time}</ListGroup.Item>
                                        <ListGroup.Item>Auction Type: {auction_type}</ListGroup.Item>
                                        <ListGroup.Item>Address: {address}</ListGroup.Item>
                                        <ListGroup.Item>Photos: {photos}</ListGroup.Item>
                                        <ListGroup.Item>Tags: {tags}</ListGroup.Item>

                                    </ListGroup>
                                    <div className="d-grid gap-2 col-6 mx-auto text-container" style={marginTop}>
                                        <button type="submit" className="btn btn-primary" onClick={this.continue}>Confirm</button>
                                    </div>
                                    <div className="d-grid gap-2 col-6 mx-auto text-container" style={marginTop}>
                                        <button type="submit" className="btn btn-danger" onClick={this.back}>Back</button>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddAuctionConfirm;