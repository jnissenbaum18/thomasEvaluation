import React, {Component} from 'react';

import './ResultsPage.css';
import QuickCard from '../../components/QuickCard/QuickCard';
import Modal from '../../components/Modal/Modal';

class ResultsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            rst: {
                name: "",
                cuisine: "",
                building: "",
                street: "",
                boro: "",
                zipcode: "",
                phone: "",
                inspections: [],
            }
        }
    }
    renderButtonGroup = (count) => {
        //Creates an array of buttons to be rendered for paging
        let buttonGroup = [];
        for (let i = 0; i < count/12; i++) {
            buttonGroup.push(<button key={i} type="button" className="btn btn-light" onClick={e => this.updatePage(i+1)}>{i+1}</button>);
            //temporary workaround for very large number of pages
            if (i > 6) {
                break;
            }
        }
        return buttonGroup
    }
    updatePage = async (page) => {
        //Update the page number to be sent to the server and then send the query asynchronously 
        await this.props.updateQuery({
            pageNumber: page
        });
        this.props.queryRestaurants();
    }
    updateFilter = async (e) => {
        //Update the grade filter to be sent to the server and then send the query asynchronously 
        await this.props.updateQuery({
            gradeFilter: e.target.value,
            pageNumber: 1
        });
        this.props.queryRestaurants();
    }
    showModal = async (rst) => {
        await this.setState({
            showModal: true,
            rst: rst
        })
    }
    hideModal = (target) => {
        if (target.id === "Modal-container") {
            this.setState({
                showModal: false
            })
        }
    }
    render(){
        const {restaurants, searchText, count, pageNumber} = this.props;
        return (
            <div className="Results-container">
                <div className="Results-header">
                    <div className="Results-header-search">
                        <h1>Search:</h1>
                    </div>
                    <div className="Results-header-search-text">
                        <h1 style={{fontStyle: "italic", textTransform: "uppercase"}}>{searchText}</h1>
                    </div>
                </div>
                <Modal show={this.state.showModal} handleClose={this.hideModal} rst={this.state.rst}>
                    <div className="Modal-info">
                        <h1 className="Rst Rst-title" style={{fontSize: "x-large", textAlign: "left", width: "80%"}}>{this.state.rst.name}</h1>
                        <div className="Rst Rst-detail">{this.state.rst.cuisine} {}</div>
                        <div className="Rst Rst-text">{this.state.rst.building} {this.state.rst.street}, {this.state.rst.boro}, NY {this.state.rst.zipcode}</div>
                        <div className="Rst Rst-text">{this.state.rst.phone}</div>
                        <hr></hr>
                        <div className="Rst Rst-detail-large">Inspections</div>
                        <div className="pre-scrollable Rst-inspections-container">
                            {this.state.rst.inspections.map((ins, i)=>{
                                const insDate = new Date(ins.date);
                                const gradeDate = new Date(ins.grade_date);
                                let gradeEl = <div></div>
                                if (ins.grade_date) {
                                    gradeEl = <div className="Rst Rst-text">Grade Date: {gradeDate.getMonth() + 1} &#183; {gradeDate.getDate()} &#183; {gradeDate.getFullYear()}</div>
                                }

                                return (
                                    <div key={i}>
                                        <div className="Rst Rst-date">{insDate.getMonth() + 1} &#183; {insDate.getDate()} &#183; {insDate.getFullYear()}</div>
                                        <div className="Rst Rst-text">{ins.action}</div>
                                        <div className="Rst Rst-text" style={{marginLeft: "30px"}}>Violation code: {ins.violation_code}</div>
                                        <div className="Rst Rst-text" style={{marginLeft: "30px"}}>{ins.violation_desc}</div>
                                        <div className="Rst Rst-text">Score: {ins.score}</div>
                                        <div className="Rst Rst-text">Grade {ins.grade}</div>
                                        {gradeEl}
                                        <div className="Rst Rst-text">{ins.inspection_type}</div>
                                        <br/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Modal>
                <div className="Options-row">
                    <select 
                    className="form-control" 
                    style={{flex: 1, marginRight: "10px"}}
                    value={this.props.gradeFilter} 
                    onChange={e => this.updateFilter(e)}>
                        <option value="All">Grade</option>
                        <option value="All">All</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="Not Yet Graded">Grade Pending</option>                        
                    </select>
                    <select className="form-control" style={{flex: 1}}>
                        <option>Price</option>
                        <option>$</option>
                        <option>$$</option>
                        <option>$$$</option>
                        <option>$$$$</option>                        
                    </select>
                    <div style={{flex: 4}}>
                    </div>
                    <div style={{flex: 1, display: "flex", alignItems: "center"}}>
                        <p style={{width: "200px"}}>Viewing: {pageNumber === 1 ? 1 : ((pageNumber - 1)*12 + 1)} - {(pageNumber)*12} of {count}</p>
                    </div>
                </div>
                <div className="Quick-card-row">
                    {restaurants.map((rst, i) => {
                        return (
                            <div key={i} className="Quick-card-container" onClick={() => {this.showModal(rst)}}>
                                <QuickCard rst={rst}>
                                    <div className="Rst Rst-title">{rst.name}</div>
                                    <div className="Rst Rst-detail">{rst.cuisine} {}</div>
                                    <div className="Rst Rst-text">{rst.building} {rst.street}, {rst.boro}, NY {rst.zipcode}</div>
                                    <div className="Rst Rst-text">{rst.phone}</div>
                                </QuickCard>
                            </div>
                        )
                    })}
                </div>
                <div className="Paging-buttons">
                    <div className="btn-toolbar" role="toolbar">
                        <div className="btn-group" role="group">
                            {this.renderButtonGroup(count)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultsPage