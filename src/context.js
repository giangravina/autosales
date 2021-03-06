import React, { Component } from 'react';
import items from './data';

const CarContext = React.createContext();
// <CarContext.Provider value={'hello'}

export default class CarProvider extends Component {
    state={
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type:'all',
        cylinders:4,
        price:0,
        minPrice:15000,
        maxPrice:0,
        minHorsepower:0,
        coupe:false,
        manual:false

    };
    //getData

    componentDidMount(){
        //this.getData
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => 
        item.price))
        let maxHorsepower = Math.max(...rooms.map(item => 
            item.horsepower))
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading: false,
            price:maxPrice,
            maxPrice,
            maxHorsepower
        });

        }

    formatData(items){
        let tempItems = items.map(item =>{
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields,images,id};
            return room;

        });
        return tempItems;
    }

    getRoom = (slug) =>{
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    };
    handleChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ?
        target.checked:target.value
        const name = event.target.name;
        this.setState({
            [name]:value
        },this.filterRooms)
    };
    filterRooms = () => {
        let{
            rooms, type, cylinders, price, minHorsepower, maxHorsepower, coupe, manual
        } = this.state
        //  all the rooms
        let tempRooms = [...rooms];
        //  transform values
        cylinders = parseInt(cylinders)
        //  filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        //  filter by capacity
        if(cylinders !==5){
            tempRooms = tempRooms.filter(room => room.cylinders >= cylinders);
        }
        //  filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        //  filter by horsepower
        tempRooms = tempRooms.filter(room => room.horsepower >= minHorsepower && 
            room.horsepower <= maxHorsepower);
        //  filter by coupe
        if(coupe){
            tempRooms = tempRooms.filter(room => room.coupe === true);
        }
        //  filter by manual
        if(manual){
            tempRooms = tempRooms.filter(room => room.manual === true);
        }
        //  change state
        this.setState({
            sortedRooms:tempRooms
        });
    };



    render() {
        return <CarContext.Provider value={{...this.state, getRoom:this.getRoom, handleChange:this.handleChange }}>
            {this.props.children}
        </CarContext.Provider>;
    }
}

const CarConsumer = CarContext.Consumer;

export function withCarConsumer(Component){
    return function ConsumerWrapper(props){
        return <CarConsumer>
            {value => <Component {...props} context={value}/>}
        </CarConsumer>
    }
}

export{ CarProvider,CarConsumer,CarContext };