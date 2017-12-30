var React = require('react');
var ReactDOM = require('react-dom');
var AptList = require('./AptList');
var AddAppointment = require('./AddAppointment');
var _ = require('lodash');

var MainInterface = React.createClass({
    getInitialState: function() {
        return {
            myAppointments: [],
            aptBodyVisible: false
        } //return
    }, //getInitialState

    componentDidMount: function() {
        this.serverRequest = $.get('./js/data.json', function(result) {
            var tempApts = result;
            this.setState({
                myAppointments: tempApts
            }); //setState
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    deleteMessage: function (item) {
        var allApts = this.state.myAppointments;
        var newApts = _.without(allApts, item);
        this.setState({
            myAppointments: newApts
        }); // setState
    }, // deleteMessage

    toggleAddDisplay: function () {
        var tempVisibility = !this.state.aptBodyVisible;
        this.setState({
            aptBodyVisible: tempVisibility
        })
    },

    render: function() {
        var filteredApts = this.state.myAppointments;
        filteredApts = filteredApts.map(function(item, index) {
            return(
                <AptList
                    key={ index }
                    singleItem={ item }
                    whichItem={ item }
                    onDelete={ this.deleteMessage }
                />
            ) //return
        }.bind(this)); //filteredApts.map
        return (
            <div className="interface">
                <AddAppointment
                    bodyVisible={ this.state.aptBodyVisible }
                    handleToggle = { this.toggleAddDisplay }
                />
                <ul className="item-list media-list">{filteredApts}</ul>
            </div>
        ) //return
    } //render
}); //MainInterface

ReactDOM.render(
    <MainInterface />,
    document.getElementById('petAppointments')
); //render
