import { useState } from 'react';
const IssuesCard = (props) => {
    const { house_no, resident, issues } = props.data;
    const activeIssues = issues.filter((issue) => issue.status === 'pending');
    const resolvedIssues = issues.filter((issue) => issue.status === 'resolved');
    const [showIssues, setShowIssues] = useState(false);

    return (
        <div className="card" onMouseOver={() => setShowIssues(true)} onMouseLeave={() => setShowIssues(false)}>
            {showIssues && <div className="issues">
                <div>
                    <h3>Active Issues</h3>
                    {activeIssues.map((issue, key) => <p key={key}>{issue.description}</p>)}
                </div>
                <div>
                    <h3>Resolved Issues</h3>
                    {resolvedIssues.map((issue, key) => <p key={key}>{issue.description}</p>)}
                </div>
            </div>}

            <div className="card-image">
                <img src={props.data.img} alt=''></img>
            </div>
            <div className="card-info">
                {activeIssues.length > 0 ? <button className="badge">{activeIssues.length}</button> : <h3 className="badge green-badge">Resolved</h3>}
                
                <table>
                    <tr>
                        <td>House No.</td>
                        <td>{house_no}</td>
                    </tr>
                    <tr>
                        <td>Resident</td>
                        <td>{resident}</td>
                    </tr>
                    <tr>
                        <td>Issue(s)</td>
                        <td>{activeIssues.length}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default IssuesCard;