import React, { Component } from 'react';
import { Container , ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class ShopingList extends Component{
    state = {
        items : [
            {uuid: uuid(), name: "Egg"},
            {uuid: uuid(), name: "Meat"},
            {uuid: uuid(), name: "Plantain"},
            {uuid: uuid(), name: "Moi Moi"},
            {uuid: uuid(), name: "Akara"},
        ]
    }

    render(){
        console.log(this.state.items)
        const { items } = this.state;
        return(
            <Container>
                <Button color="dark" onClick={ () => {
                   const name =  prompt("Enter Your name");
                   if(name){
                       this.setState(state => ({items: [...state.items, {id: uuid(), name}]
                    }))
                   }
                }
                }>
                    Add Item
                </Button>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({id, name}) =>(
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem style={{color: "black"}}>
                                <Button className="remove-btn" color="danger" size="sm" onClick={ () => {
                                    this.setState(state => ({
                                        items: state.items.filter(item => item.id !== id)
                                    }))
                                }}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ) )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )

    }

}

export default ShopingList