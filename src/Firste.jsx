import { Link } from 'react-router-dom';
import './Exam.css';

export default function ExamFirstSem() {
  const caItems = [
    {
      name: "Coming Soon...",
      viewUrl: "#",
      downloadUrl: "#",
    },
    // {
    //   name: "Metaphysics",
    //   viewUrl: "https://eu.docworkspace.com/d/sIPf6ivnRAcSM67kG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/Plato's parmenides.docx",
    // },
    // {
    //   name: "Psy. of Rel.",
    //   viewUrl: "https://eu.docworkspace.com/d/sIGj6ivnRAbyN67kG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/PSYCHOLOGY OF RELGION.docx",
    // },
    // {
    //   name: "Soc. & Pol. Phil",
    //   viewUrl: "https://eu.docworkspace.com/d/sIG_6ivnRAZLepboG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/Why Nations Fail by Daron Acemoğlu.docx",
    // },
  ];

  const examItems = [
    {
      name: "Coming soon..",
      viewUrl: "#",
      downloadUrl: "#",
    },
    // {
    //   name: "African phil.",
    //   viewUrl: "https://eu.docworkspace.com/d/sIGr6ivnRAaSu-7AG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/african phil.docx",
    // },
    // {
    //   name: "Apo. Voc.",
    //   viewUrl: "https://eu.docworkspace.com/d/sILj6ivnRAajB8bsG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/apostolic vocation.docx",
    // },
    // {
    //   name: "Entrepreneurship",
    //   viewUrl: "https://eu.docworkspace.com/d/sIMD6ivnRAaK-h7wG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/enteprenuership.docx",
    // },
    // {
    //   name: "Metaphysics",
    //   viewUrl: "https://eu.docworkspace.com/d/sIJT6ivnRAc2WrLwG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/meta exam.docx",
    // },
    // {
    //   name: "Phil. of Sci",
    //   viewUrl: "https://eu.docworkspace.com/d/sINr6ivnRAfydu7wG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/Philosophie des Sciences.docx",
    // },
    // {
    //   name: "Psy. of Rel.",
    //   viewUrl: "https://eu.docworkspace.com/d/sILD6ivnRAd-tu7wG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/Psychology of religion exam.docx",
    // },
    // {
    //   name: "Early Mod. Phil",
    //   viewUrl: "https://eu.docworkspace.com/d/sIHn6ivnRAZPtvbwG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/cum-exam.docx",
    // },
    // {
    //   name: "Soc./Pol. phil",
    //   viewUrl: "https://eu.docworkspace.com/d/sIIT6ivnRAfXzvbwG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/Philosophie Socio-Politique.docx",
    // },
    // {
    //   name: "Phil of lit.",
    //   viewUrl: "https://eu.docworkspace.com/d/sIPX6ivnRAfDHyLwG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/philosophy of literature exam.docx",
    // },
    // {
    //   name: "Soc. of rel.",
    //   viewUrl: "https://eu.docworkspace.com/d/sINP6ivnRAdLbxLwG",
    //   downloadUrl: "https://savio-emma.github.io/sweet-store/sociology of religion exam.docx",
    // },
  ];

  return (
    <div className="exam-page">

      <header className="study-header">
        <div className="logo">Sweetest</div>
        <div className="site-name">Study website</div>
      </header>

      <marquee className="ticker">
        <p>Choice is the quiet power behind direction 👣 Each decision shapes the path before it is walked 🧠🛤️</p>
      </marquee>

      <section className="exam-container">
        <div className="intro-comment">
          {/* Click the file icon to view online or the download button to save offline. */}
          Updates are coming soonest...
        </div>

        <div className="past-questions-section">
          <h3>1st Semester CA</h3>
          <div className="question-grid">
            {caItems.map((item, index) => (
              <div key={index} className="grid-item">
                <a
                  href={item.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-link"
                  title="View online"
                >
                  <i className="fa-solid fa-file-lines"></i>
                </a>
                <p className="item-name">{item.name}</p>
                <a
                  href={item.downloadUrl}
                  download
                  className="download-btn"
                  title="Download"
                  onClick={() => alert("If you have data, your file will start downloading...")}
                >
                  <i className="fa-solid fa-download"></i>
                </a>
              </div>
            ))}
          </div>

          <hr className="section-divider" />

          <h3>1st Semester Exam</h3>
          <div className="question-grid">
            {examItems.map((item, index) => (
              <div key={index} className="grid-item">
                <a
                  href={item.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-link"
                  title="View online"
                >
                  <i className="fa-solid fa-file-lines"></i>
                </a>
                <p className="item-name">{item.name}</p>
                <a
                  href={item.downloadUrl}
                  download
                  className="download-btn"
                  title="Download"
                  onClick={() => alert("If you have data, your file will start downloading...")}
                >
                  <i className="fa-solid fa-download"></i>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="back-links">
          <Link to="/" className="back-btn">
            <i className="fa-solid fa-left-long"></i> Home
          </Link>
          <Link to="/menu" className="back-btn">
            <i className="fa-solid fa-left-long"></i> Menu
          </Link>
        </div>
      </section>

      {/* Bottom Navigation – same as previous */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link to="/dev" className="nav-item">
          <i className="fa-solid fa-code"></i>
          <span>Developer</span>
        </Link>
        <Link to="/menu" className="nav-item active">
          <i className="fa-solid fa-bars"></i>
          <span>Menu</span>
        </Link>
        <Link to="/about" className="nav-item">
          <i className="fas fa-info-circle"></i>
          <span>About</span>
        </Link>
        <Link to="/games" className="nav-item">
          <i className="fa-solid fa-gamepad"></i>
          <span>Games</span>
        </Link>
      </nav>

    </div>
  );
}