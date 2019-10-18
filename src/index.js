import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



// PAGE STRUCTURE

function Card(props) {
    return (
        <div className="card">
            <img className="card-img-top"
                src={props.featureImage}
                alt="cap"
            />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <a href={props.link} className="btn btn-info" target="_blank">Learn More</a>
            </div>
        </div>
    );
}

function CardList() {
    return (
        <div className="row">
            <div className="col-sm-4">
                <Card 
                    featureImage="https://sebhastian.com/static/eb0e936c0ef42ded5c6b8140ece37d3e/fcc29/feature-image.png"
                    title="How To Make Interactive ReactJS Form"
                    description="Let's write some interactive form with React"
                    link="https://sebhastian.com/interactive-react-form"
                />
            </div>
            <div className="col-sm-4">
                <MasterForm />
            </div>
            <div className="col-sm-4">
                <Card />
            </div>
        </div>
    );
}

// FORM SHTUFFF

//big daddy form
class MasterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 1,
            race: '',
            name: '',
            pcClass: '',
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const currentStep = this.state.currentStep;
        
        if (currentStep !== 3) {
            return null;
        }
        const { race, pcClass, name } = this.state;
        alert (
            `Form: \n
            Race: ${race} \n
            PC Class: ${pcClass} \n
            PC Name: ${name}`    
        );
    }

    _next = () => {
        const currentStep = this.state.currentStep;
        const nextStep = currentStep >= 2 ? 3 : currentStep + 1;
        this.setState({
            currentStep: nextStep,
        })
    }
    _prev = () => {
        const currentStep = this.state.currentStep;
        const nextStep = currentStep <= 1 ? 1 : currentStep -1;
        this.setState({
            currentStep: nextStep,
        })
    }

    previousButton() {
        const currentStep = this.state.currentStep;
        if (currentStep !==1) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={this._prev}
                >
                    Prev
                </button>
            );
        }

        return null;
    }

    nextButton() {
        const currentStep = this.state.currentStep;
        if (currentStep <3) {
            return (
                <button
                    className="btn btn-info float-right"
                    type="button"
                    onClick={this._next}
                >
                    Next</button>
            );
        }

        return null;
    }

    render() {
        return (
            <React.Fragment>
                <h1>A Wizard Form!</h1>
                <p>Step {this.state.currentStep}</p>

                <form onSubmit={this.handleSubmit}>
                    {/*
                        render the steps and pass props
                    */}
                    <Step1
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        race={this.state.race}
                    />
                    <Step2
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        pcClass={this.state.pcClass}
                    />
                    <Step3
                        currentStep={this.state.currentStep}
                        handleChange={this.handleChange}
                        name={this.state.name}
                    />

                    {this.previousButton()}
                    {this.nextButton()}
                </form>
            </React.Fragment>
        );
    }
 
}

//baby steps [1,2,3]
function Step1(props) {
    if (props.currentStep !== 1) {
        return null;
    }

    return (
        <div className="form-group">
            <label className="label" htmlFor="race">5e Race</label>
            <input className="form-control"
                id="race"
                name="race"
                type="text"
                placeholder="enter race here..."
                value={props.race}
                onChange={props.handleChange}
            />
        </div>
    )
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null;
    }

    return (
        <div className="form-group">
            <label className="label" htmlFor="pcClass">5e Class</label>
            <input className="form-control"
                id="pcClass"
                name="pcClass"
                type="text"
                placeholder="best 5e class here..."
                value={props.pcClass}
                onChange={props.handleChange}
            />
        </div>
    )
}

function Step3(props) {
    if (props.currentStep !== 3) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="form-group">
                <label className="label" htmlFor="name">PC Name</label>
                <input className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="what's your name"
                    value={props.name}
                    onChange={props.handleChange}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-info float-right">Send to the void</button>
            </div>
        </React.Fragment>
    );
}





ReactDOM.render(
    <div className="container site-content">
        <CardList />
    </div>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
