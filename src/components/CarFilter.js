import React from 'react';
import {useContext} from 'react';
import {CarContext} from '../context'
import Title from '../components/Title';
// get all unique values
const getUnique = (items,value)=>{
    return [...new Set(items.map(item => item[value]))]
}

export default function CarFilter({ rooms }) {
        const context = useContext (CarContext);
        const {
            handleChange,
            type,
            cylinders,
            price,
            minPrice,
            maxPrice,
            minHorsepower,
            maxHorsepower,
            coupe,
            manual
        } = context; 
        //get unique types 
        let types = getUnique(rooms,'type');
        //add all
        types = ['all',...types];
        // map to jsx
        types = types.map((item, index) => {
            return (
                <option value={item} key={index}>
                    {item}
                </option>
            );
        });
        let engine = getUnique(rooms,'cylinders');
        engine = engine.map((item,index) => {
            return <option key={index} value={item}>{item}</option>
        })

        return ( 
            <section className="filter-container">
            <Title title="search vehicles" />
            <form className="filter-form">
                {/*select type */}
                <div className="form-group">
                    <label htmlFor="type">Car type</label>
                    <select name="type" 
                            id="type" 
                            value={type} 
                            className="form-control" 
                            onChange={handleChange}>
                                {types}
                            </select>
                </div>
                {/*end select type */}
                {/*select cylinders */}
                <div className="form-group">
                    <label htmlFor="cylinders">Cylinders</label>
                    <select name="cylinders" 
                            id="cylinders" 
                            value={cylinders} 
                            className="form-control" 
                            onChange={handleChange}>
                                {engine}
                            </select>
                </div>
                {/* end of select cylinders */}
                {/* car price */}
                <div className="form-group">
                    <label htmlFor="price">
                        car price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice}
                    id="price" value={price} onChange={handleChange} className="form-control"/>
                </div>
                {/* end of car price */}
                {/* horsepower */}
                <div className="form-group">
                    <label htmlFor="horsepower">horsepower</label>
                    <div className="horsepower-inputs">
                        <input type="number" name="minHorsepower" id="horsepower" 
                        value={minHorsepower} onChange={handleChange}
                        className="horsepower-input"/>
                        <input type="number" name="maxHorsepower" id="horsepower" 
                        value={maxHorsepower} onChange={handleChange}
                        className="horsepower-input"/>
                    </div>
                </div>
                {/* end of horsepower */}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="coupe"
                        id="coupe" checked={coupe} onChange={handleChange}/>
                        <label htmlFor="coupe">coupe</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="manual"
                        id="manual" checked={manual} onChange={handleChange}/>
                        <label htmlFor="manual">manual</label>
                    </div>
                </div>
                {/* end of extras */}


            </form>
        </section>
        )};
