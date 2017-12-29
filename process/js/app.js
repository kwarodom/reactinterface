var React = require('react');
var ReactDOM = require('react-dom');

var MainInterface = React.createClass({
    getInitialState: function() {
        return {
            myAppointments: []
        } //return
    }, //getInitialState

    componentDidMount:function () {
        this.serverRequest = $.get('./js/data.json', function (result) {
            var tempApts = result;
            this.setState({
                myAppointments: tempApts
            }); //setState
        }.bind(this));
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    render: function() {
        var filteredApts = this.state.myAppointments;
        filteredApts = filteredApts.map(function(item, index){
            console.log(this);
            return (
                <li className="pet-item media" key={index}>
                    <div className="pet-head">
                        <span className="pet-name"> {this.state.myAppointments[index].petName} </span>
                        <span className="apt-date pull-right"> {this.state.myAppointments[index].aptDate} </span>
                    </div>
                    <div className="owner-name">
                        <span className="label-item">Owner: </span>
                        { this.state.myAppointments[index].ownerName }
                    </div>
                    <div className="apt-notes">
                        { this.state.myAppointments[index].aptNotes }
                    </div>
                </li>
            ) //return
        }.bind(this)); //filteredApts

        return (
            <div className="interface">
                <div className="item-list media-list">
                    <ul className="item-list media-list">
                        { filteredApts }
                    </ul>
                </div>
            </div>
        )
    } //render
}); //MainInterface

ReactDOM.render(
    <MainInterface />,
    document.getElementById('petAppointments')
); //render
