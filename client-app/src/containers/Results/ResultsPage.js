import React, {Component} from 'react';

import './ResultsPage.css';
import QuickCard from '../../components/QuickCard/QuickCard';
import Modal from '../../components/Modal/Modal';
import LetterRating from '../../components/LetterRating/LetterRating';

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
        await this.props.updateQuery("", page);
        this.props.queryRestaurants();
    }
    updateFilter = async (e) => {
        await this.props.updateFilter(e.target.value);
        this.props.queryRestaurants();
    }
    filterResults = (rst) => {
        if (this.props.gradeFilter === "All") {
            return true
        } else if (this.props.gradeFilter === rst.grade) {
            return true
        } else {
            return false
        }
    }
    showModal = async (rst) => {
        await this.setState({
            showModal: true,
            rst: rst
        })
        console.log("show modal, rst: ", this.state.rst)
    }
    hideModal = () => {
        this.setState({
            showModal: false
        })
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
                        <h1 className="Rst Rst-title" style={{fontSize: "x-large", textAlign: "left"}}>{this.state.rst.name}</h1>
                        <p className="Rst Rst-detail">{this.state.rst.cuisine} {}</p>
                        <p className="Rst Rst-text">{this.state.rst.building} {this.state.rst.street}, {this.state.rst.boro}, NY {this.state.rst.zipcode}</p>
                        <p className="Rst Rst-text">{this.state.rst.phone}</p>
                        <hr></hr>
                        <p className="Rst Rst-detail-large">Inspections</p>
                        <div className="pre-scrollable Rst-inspections-container">
                            {this.state.rst.inspections.map((ins, i)=>{
                                return (
                                    <div key={i}>
                                        <p className="Rst Rst-date">{ins.date}</p>
                                        <p className="Rst Rst-text">{ins.action}</p>
                                        <p className="Rst Rst-text" style={{marginLeft: "30px"}}>Violation code: {ins.violation_code}</p>
                                        <p className="Rst Rst-text" style={{marginLeft: "30px"}}>{ins.violation_desc}</p>
                                        <p className="Rst Rst-text">Score: {ins.score}</p>
                                        <p className="Rst Rst-text">Grade {ins.grade}</p>
                                        <p className="Rst Rst-text">Grade Date: {ins.grade_date}</p>
                                        <p className="Rst Rst-text">{ins.inspection_type}</p>
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
                    <div style={{flex: 1}}>
                        <p style={{width: "200px"}}>Viewing: {pageNumber === 1 ? 1 : ((pageNumber - 1)*12 + 1)} - {(pageNumber)*12} of {count}</p>
                    </div>
                </div>
                <div className="Quick-card-row">
                    {restaurants.map((rst, i) => {
                        if (this.filterResults(rst)) {
                            return (
                                <div key={i} className="Quick-card-container" onClick={() => {this.showModal(rst)}}>
                                    <QuickCard rst={rst}>
                                        <p className="Rst Rst-title">{rst.name}</p>
                                        <p className="Rst Rst-detail">{rst.cuisine} {}</p>
                                        <p className="Rst Rst-text">{rst.building} {rst.street}, {rst.boro}, NY {rst.zipcode}</p>
                                        <p className="Rst Rst-text">{rst.phone}</p>
                                    </QuickCard>
                                </div>
                            )
                        } else {
                            return (
                                <div key={i}></div>
                            )
                        }
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