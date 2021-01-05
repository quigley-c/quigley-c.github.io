import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

class Title extends React.Component  {
    
    constructor(props)  {
        super(props);
        this.state={
            color: "#000000",
            opacity:"0",
            position:"relative",
            top:"-1.4vh",
            transition:"1s"
        };
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                opacity:1,
                top:"0.5vh",
                
                })
            }, 10);
        }

    toggleFloat = () => {
        setTimeout(() =>   {
            this.setState({
            })
        }, 1000);
    }

    floatText = () =>   {
        
    }

    render()   {
        return (
            <div>
                <div class="content">
                    <h1 style={this.state}>Carson Quigley</h1>
                </div>
                <div class="socialbar">
                    <ul class="social-icons">
                        <li><a href="https://github.com/quigley-c/" class="social-icon"> <i class="fa fa-github">
                        </i></a></li>

                        <li><a href="https://linkedin.com/in/quigley-c/" class="social-icon"> <i class="fa fa-linkedin">
                        </i></a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Title />, document.getElementById('root'));
