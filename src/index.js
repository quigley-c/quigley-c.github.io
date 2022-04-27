import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

class Title extends React.Component  {

    constructor(props)  {
        super(props);
        this.state={
            color: "#808080",
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

    render()   {
        return (
            <div>
                <div class="content">
                    <h1 style={this.state}>Carson Quigley</h1>
                </div>
                <div class="socialbar">
					<input type="checkbox" id="btnc" />
					<label class="btn" for="btnc">*o*</label>
					<label class="btn" for="btnc">^u^</label>
					<label class="btn" for="btnc">>_></label>
					<a href="https://github.com/quigley-c/" class="social-icon"><i class="fab fa-github-alt fa-2x"></i></a>
					<a href="https://linkedin.com/in/quigley-c/" class="social-icon"><i class="fab fa-linkedin fa-2x"></i></a>
                </div>
            </div>
        );
    }
}


class Search extends React.Component	{

	render()	{
		return (
			<div>
				<div class="stuff">
					<h2>Hello World!</h2>
				</div>
			</div>
		);
	}
}

//can only be called once(?)
ReactDOM.render(<Title />, document.getElementById('root'));
