import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect,
  Button
} from "shards-react";


class TopReferrals extends React.Component {
      
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount(){
    this.getTagsFromDb();
  }

  getTagsFromDb = () =>{
    fetch("http://127.0.0.1:8000/get-dim/get-tags/")
      .then(res => res.json())
      .then((result) => this.setState({items:result}))
  }

  refreshTags = () =>{
      let result = window.confirm('This will cost additional 0.01$. Do you want to proceed?');

      if(result){
        fetch('http://127.0.0.1:8000/get-dim/tags/')
        .then(res => res.json())
        .then((data) => {
          this.getTagsFromDb();
        })
      }
  }

  render(){
    return(
      <Card small>
    <CardHeader className="border-bottom">
      <Row>
      <Col><h6 className="m-0">Fetched Tags</h6></Col>
      <Col><Button theme="accent" onClick={this.refreshTags}>Refresh Tags</Button></Col></Row>
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup small flush className="list-group-small">
        {this.state.items.map((item, idx) => (
          <ListGroupItem key={idx} className="d-flex px-3">
            <span className="text-semibold text-fiord-blue">{item.value}</span>
            <span className="ml-auto text-right text-semibold text-reagent-gray">
              {item.key}
            </span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </CardBody>

    <CardFooter className="border-top">
      <Row>
        {/* View Full Report */}
        <Col className="text-right view-report">
          {/* eslint-disable-next-line */}
          <a href="#">Full Tag list &rarr;</a>
        </Col>
      </Row>
    </CardFooter>
  </Card>
    );
  }
}

// TopReferrals.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string,
//   /**
//    * The referral data.
//    */
//   referralData: PropTypes.array
// };

// TopReferrals.defaultProps = {
//   title: "Tags fetched",
//   referralData: [
//     {
//       title: "GitHub",
//       value: "19,291"
//     },
//     {
//       title: "Stack Overflow",
//       value: "11,201"
//     },
//     {
//       title: "Hacker News",
//       value: "9,291"
//     },
//     {
//       title: "Reddit",
//       value: "8,281"
//     },
//     {
//       title: "The Next Web",
//       value: "7,128"
//     },
//     {
//       title: "Tech Crunch",
//       value: "6,218"
//     },
//     {
//       title: "YouTube",
//       value: "1,218"
//     },
//     {
//       title: "Adobe",
//       value: "1,171"
//     }
//   ]
// };

export default TopReferrals;
