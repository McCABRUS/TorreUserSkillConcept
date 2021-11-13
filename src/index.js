import React, { useState } from 'react';
import ReactDOM from "react-dom";
import {default as UUID} from "node-uuid";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const UserForm = () => {

    const handleSubmit = (e) => {
        if (e.target[0].value === '')
        {
            return false;
        }
        fetch(`https://bio.torre.co/api/bios/${ e.target[0].value }`)
        .then(response => response.json())
        .then( data => { 
            if(data.message === 'Person not found!') 
            {
                console.error(data.message + ' try with another user name.');
                return false;
            }
            ReactDOM.render(<App {...data} />, document.getElementById('root'));
        })
        .catch(error =>{
            console.error('There was an error!', error);
        });;
        e.preventDefault();
    }
 
    return (
        <form onSubmit={handleSubmit}>
          <label>
            User Name:
            <input type="text" defaultValue="torrenegra" />
          </label>
          <input type="submit" value="Display Skills"  />
        </form>
      );
}

ReactDOM.render(< UserForm /> , document.getElementById('root'));


const App = (data) => {
  
    const [expandedRows, setExpandedRows] = useState([]);

    const [expandState, setExpandState] = useState({});


    const handleEpandRow = (event, userId) => {
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(userId);

        let obj = {};
        isRowExpanded ? (obj[userId] = false) :  (obj[userId] = true);
        setExpandState(obj);


        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== userId) :
            currentExpandedRows.concat(userId);
        setExpandedRows(newExpandedRows);
    }
    
    return(
        <Container>
        <Row>
        <Col sm={12}>
        <Table responsive variant="dark">
            <thead>
                <tr>
                <th>Skill Name</th>
                <th>Proficiency</th>
                <th>More Details</th>
                </tr>
            </thead>
            <tbody>
            {
            data.strengths.map((skill) =>
            <>
                <tr key={skill.id}>
                    <td>
                    {skill['name']}
                    </td>
                    <td>
                    {skill['proficiency']}
                    </td>
                  
                
                    <td>
                    <Button
                        
                        variant="link"
                        onClick={event => handleEpandRow(event, skill.id)}>
                        {
                            expandState[skill.id] ?
                            'Hide' : 'Show'
                        }
                    </Button>
                    </td>
                </tr>
                <>
                {
                expandedRows.includes(skill.id) ?
                <tr key={UUID.v4()}>
                    <td colSpan="6">
                    <div style={{backgroundColor: '#343A40', color: '#FFF', padding: '10px'}}>
                        <h2> Skill Details </h2>
                        <ul>
                            <li key={UUID.v4()}>
                                <span><b>Recommendations:</b></span> {' '}
                                <span> { skill['recommendations'] } </span>
                            </li>
                            <li key={UUID.v4()}>
                                <span><b>Weight:</b></span> {' '}
                                <span> { skill.weight } </span>
                            </li>
                            {skill.media[0] && <li key={UUID.v4()}>
                                <span><b>Media:</b></span> {' '}
                                <span> { skill.media[0].description } </span>
                                <img className='fitImg' alt={skill.media[0].description} src={skill.media[0].mediaItems[0].address} />
                            </li>}
                        </ul>
                    </div>
                    </td>
                </tr> : null
                }
                </>
            </> 
            )}
            </tbody>
        </Table>
        </Col>
        </Row>
        </Container>
    );
    
}



