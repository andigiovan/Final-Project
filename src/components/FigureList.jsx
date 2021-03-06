import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Card, Button, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, CardImg, CardHeader, CardFooter, Row,} from 'reactstrap';
  import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import star from "../helpers/images/goldenstar.png"
import axios from "axios"
import Swal from 'sweetalert2'
import { Spinner } from 'reactstrap';

class FigureList extends Component {

  state = {
    articles: [],
    articles_2: [],
    
  }

  getData = () => {
    axios.get(
      "http://localhost:4500/art/figurelist", 


    ).then((res) => {
      console.log(res.data);
      this.setState({articles:res.data})
    })
    
    
  }

  getList = () => {
    axios.get(
      "http://localhost:4500/art/premiumlist", 


    ).then((res) => {
      console.log(res.data);
      this.setState({articles_2:res.data})
    })
  }

  componentDidMount() {
    this.getData()
    this.getList()
  }

  swalAlert = () => {
    if (this.props.name) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Anda belum berlangganan',
        footer: '<a href=/premium>klik disini untuk berlangganan</a>'
      })
    }
    else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Anda belum Login',
        footer: '<a href=/login>Anda harus login jika ingin berlangganan</a>'
      })
    }
    
  }

  

  renderList = () => {

    let name = this.props.keyword
    let hasilSearch = this.state.articles.filter((article) => {
        return article.name.toLowerCase().includes(name.toLowerCase())
    })
    return hasilSearch.map((article) => {
      return (

        <Link to={`/figuredetail/${article.id}`} className="col-4 mt-4" style={{textDecoration: "none", color: "black"}}>
      <Card>
        <CardImg src={article.image} />
        <CardBody>
          <CardTitle className="text-center logo font-weight-bold" style={{fontSize: "20px"}}>{article.name}</CardTitle>
          <CardText>{article.text}</CardText>
          
         
        </CardBody>
      </Card>
      </Link>
      

      

        
      )
    })

  }

  renderPremium = () => {

    let name = this.props.keyword
    let hasilSearch = this.state.articles_2.filter((article) => {
        return article.name.toLowerCase().includes(name.toLowerCase())
    })
    return hasilSearch.map((article) => {
      if (this.props.role === "premium" || this.props.role === "admin") {
        return (

          <Link to={`/premiumfiguredetail/${article.id}`} className="col-4 mt-4" style={{textDecoration: "none", color: "black"}}>
        <Card>
          <CardImg src={article.image} />
          <CardBody>
            <CardTitle className="text-center logo font-weight-bold" style={{fontSize: "20px"}}>{article.name}</CardTitle>
            <CardText>{article.text}</CardText>
            
           
          </CardBody>
        </Card>
        </Link>
          
  
          
          
        
        
  
        
  
          
          )
        }
        
      else {
        return(
          <Link onClick={this.swalAlert} className="link col-4 mt-4" style={{textDecoration: "none", color: "black"}}>
        <Card className="align-items-center" >
          <CardImg src={article.image} />
          <CardBody>
            <CardTitle className="text-center logo font-weight-bold" style={{fontSize: "20px"}}>{article.name}</CardTitle>
            
            <CardText>{article.text}</CardText>
           
          </CardBody>
        </Card>
        </Link>
        
        )
      }
      
    })

  }

    render() {
        return (
            <div>

  <Card className="shadow-none">
        
        
        

        <Card className="card-list shadow-none m-3">
          <CardHeader className="tokoh-header">
            <h3 className="logo text-center mt-1 mb-0 ">Tokoh abad modern</h3>
            </CardHeader>
        <Row className="figure-list mt-4 justify-content-center">
         
          {this.renderList()}
        
        </Row>
        </Card>

        <Card className="card-list shadow-none m-3">
          <CardHeader className="tokoh-klasik p-0">
      
         
            
            <h3 className="logo text-center mt-3 mb-1">
            <img className="mb-3" style={{width: "40px"}} src={star}/>
            Tokoh musik abad klasik
            
            </h3>
        
         
          
          </CardHeader>

          <Row className="figure-list mt-4 justify-content-center">
         
         {this.renderPremium()}
         
       
       </Row>

          </Card>
        

         

          
          <Card className="m-3 shadow-none">
        <CardHeader className="text-center quotes-header logo font-weight-bold"><h4 className="mt-1 mb-0">TokohQuoteS</h4></CardHeader>
        <CardBody>
        <div className="container quotes-body">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet neque hic, incidunt mollitia. Eius autem, asperiores velit, quaerat blanditiis ratione.</p>
  <blockquote cite="John Locke">I have always thought the actions of men the best interpreters of their thoughts.</blockquote>
  <blockquote cite="Rene Descartes">Cogito ergo sum. (I think; therefore I am.)</blockquote>
  <blockquote cite="Friedrich Nietzsche">It is not a lack of love, but a lack of friendship that makes unhappy marriages.</blockquote>
  <blockquote cite="Niccolo Machiavelli">The first method for estimating the intelligence of a ruler is to look at the men he has around him.</blockquote>
  <blockquote cite="Jean-Jacques Rousseau">What wisdom can you find that is greater than kindness?</blockquote>
  
  
</div>

        </CardBody>
     
        
      </Card>
          
        
        

        


        
        
      </Card>
            
            </div>
            
            
        
        

       
        

            
            
                
        )
    }
    
}

const mapStateToProps = (state) => {
  return {
    name: state.auth.username,
    keyword: state.search.keyword,
    role: state.auth.role
  }
} 
    

export default connect(mapStateToProps)(FigureList)

