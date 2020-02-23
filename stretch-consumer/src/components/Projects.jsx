import React, {useState, useEffect} from 'react';
import { axiosBase } from '../utils/utilities';

const Projects = () => {
    const [projectList, setProjectList] = useState([]);
    useEffect(() => {
        axiosBase().get('/projects')
                   .then(res => {
                       res.data.forEach(project => {
                        axiosBase().get(`/projects/${project.id}`)
                        .then( res => setProjectList([...projectList, res.data]) )
                        .catch(err => console.log('Axios Error!! ', err))
                       })
                       
                   })
                   .catch(err => console.log('Axios Error! ', err))
    }, []);

    return (
        <div>
            {projectList && projectList.map( project => {
               return ( 
               <div key={`${project.name}${project.id}`}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p>Status: {project.completed ? 'Completed' : 'Pending'}</p>
                    {
                    project.actions &&
                    <ul>
                        <p>Actions</p>
                        {
                        project.actions.map(action =>
                             <li>
                                 <div>
                                    <p>{action.description}</p>
                                    <p>Notes: {action.notes}</p>
                                    <p>Status: {action.completed ? 'Completed' : 'Pending'}</p>
                                 </div>
                            </li>
                        )}
                    </ul>
                    }
                </div> 
               );
            } )}
        </div>
    );
}

export default Projects;