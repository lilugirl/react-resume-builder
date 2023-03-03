import { useRef } from "react";
import ErrorPage from "./ErrorPage";

const Resume = ({ result }) => {
  const componentRef = useRef();
  // function the replace the new line with a break tag
  const replaceWithBr = (string) => {
    return string.replace(/\n/g, "<br/>");
  };

  // returns an error page if the result object is empty
  if (JSON.stringify(result) === "{}") {
    return <ErrorPage />;
  }

  const handlePrint = () => alert("Print Successful!");
  return (
    <>
      <button onClick={handlePrint}>Print Page</button>
      <main className="container" ref={componentRef}>
        <header className="header">
          <div>
            <h1>{result.fullName}</h1>
            <p className="resumeTitle headerTitle">
                {result.currentPosition} ({result.currentTechnologies})
            </p>
            <p className="resumeTitle">
                  {result.currentLength}year(s) work experience
            </p>
          </div>
          <div>
            <img src={result.image_url} alt={result.fullName} className='resumeImage' />
          </div>
        </header>
        <div className='resumeBody'>
            <div>
                <h2 className='resumeBodyTItle'>PROFILE SUMMARY</h2>
                <p dangerouslySetInnerHTML={{__html:replaceWithBr(result.objective)}} className='resumeBodyContent' />
            </div>
            <div>
                <h2 className='resumeBodyTitle'>WORK HISTORY</h2>
                {result.workHistory.map((work)=>(
                    <p className='resumeBodyContent' key={work.name}>
                      <span style={{fontWeight:"bold"}}>{work.name}</span> - {work.position}
                    </p>
                ))}
            </div>
            <div>
                <h2 className='resumeBodyTitle'>JOB PROFILE</h2>
                <p dangerouslySetInnerHTML={{__html:replaceWithBr(result.jobResponsibilities)}}  className="resumeBodyContent" />
            </div>
            <div>
              <h2 className='resumeBodyTitle'>JOB RESPONSIBILITIES</h2>
              <p dangerouslySetInnerHTML={{__html:replaceWithBr(result.keypoints)}} className='resumeBodyContent' />
            </div>
        </div>
      </main>
    </>
  );
};

export default Resume;
