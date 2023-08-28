import issuesData from "../dummyData/issuesData";
import IssuesCard from "../components/IssuesCard";
const Issues = () => {
    return (
        <div>
            <h1>Issues</h1>
            <div className="grid">
                {issuesData.map((item, key) => <IssuesCard key={key} data={item} />)}
            </div>
        </div>
    )
}

export default Issues;