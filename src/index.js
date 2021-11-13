import React, { useState } from 'react';
import ReactDOM from "react-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


const user = 'torrenegra';
fetch(`https://bio.torre.co/api/bios/${ user }`)
.then(response => response.json())
.then( data => {  
    ReactDOM.render(<App {...data} />, document.getElementById('root'));
});

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
                <tr>
                    <td colspan="6">
                    <div style={{backgroundColor: '#343A40', color: '#FFF', padding: '10px'}}>
                        <h2> Skill Details </h2>
                        <ul>
                        <li>
                            <span><b>Recommendations:</b></span> {' '}
                            <span> { skill['recommendations'] } </span>
                        </li>
                        <li>
                            <span><b>Weight:</b></span> {' '}
                            <span> { skill.weight } </span>
                        </li>
                       
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
    )
    
}



