import { Link } from 'react-router-dom'; 
import './Study.css';          

export default function StudyMaterials() {
  const subjects = [
    {
      title: "Comparative Philosophy",
      materials: [
        { name: "Kwame Gyekye", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Comp. Phil/Gyekye on Universalism and Particularism.pdf" },
        { name: "Notes", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Comp. Phil/Part of Comparative Philosophy Lecture Notes.pdf" }, 
        { name: "Exam quest.", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Comp. Phil/comparative phil alusi 2q.pdf" },
        { name: "Causality", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Comp. Phil/COMPARATIVE 1.docx" }, 
        { name: "Personhood", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Comp. Phil/Comparative philosophy assignment.docx" },   
      ]
    },
    {
      title: "Epistemology",
      materials: [
        { name: "Corresp. theory", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Epistemology/NOTE THE CORRESPONDENCE THEORY OF TRUTH.docx" },
         { name: "Decolonization", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Epistemology/Epistemological Decolonization.pdf" },
         { name: "Lectures", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Epistemology/Lectures.docx" },
      ]
    },
    {
      title: "Heidegger",
      materials: [
        { name: "Textbook", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Heidegger/_OceanofPDF.com_Being_and_Time_-_Martin_Heidegger.pdf" },
        { name: "Lectures", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Heidegger/lecture.docx" },
      ]
    },
    {
      title: "Phenomenology",
      materials: [{ name: "Hursell", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Heidegger/Edmund Husserl's phenomenological method.docx" },
                  { name: "Handout", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Heidegger/PHENOMENOLOGY.docx" },
                  { name: "Hursell and Heidegger", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/GROUP ONE (1) PHENOMENOLOGY PRESENTATION.docx" }, 
                  { name: "Gadamer", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Gadamer.docx" },
                  { name: "Ponty 1", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Notes on Merlea-WPS Office.docx" }, 
                  { name: "Ponty 2", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Online Note on-WPS Office.docx" },
                  { name: "Ricoeur and Gadamer", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Abstract-2.docx" },   
      ]
    },
    {
      title: "Phil. of Mind",
      materials: [
        { name: "Handout 2025", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/phil. of mind/AKTUALIZIERT 2025- PHL 412- Bgd- Yia des Geistes- Ganz.docx" },
        { name: "questions 1", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/phil. of mind/Bgd- Phil of Mind- Learning Through Questions.pdf" },
         { name: "questions 2", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/phil. of mind/Sr. philosophy of mind 4q.pdf" },
       ]
    },
     {
      title: "Rec. Mod. Phil",
      materials: [
        { name: "Brentano", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Rec. Mod. Phil/BRENTANO working document.docx" },
        { name: "Brentano Text", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Rec. Mod. Phil/Brentano.pdf" },
        { name: "Croche", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Rec. Mod. Phil/CROCE, UDENWAGU.docx" }, 
        { name: "Hegel", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Rec. Mod. Phil/HEGEL 25.docx" },
        { name: "Handout", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Rec. Mod. Phil/RECENT MODERN PHILOSOPHY 2025.docx" },
        { name: "Exam quest.", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Rec. Mod. Phil/Recent Modern phil alusi 2q.pdf" },
       ]
    },
    {
      title: "Topics in Logic",
      materials: [
        { name: "Log. Paradoxes", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Topics in Logic/Logical Paradoxes.pdf" },
        { name: "Modal log.", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Topics in Logic/Modal logic Retrieved from.docx" },
        { name: "Counterfactuals", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/Topics in Logic/logic.docx" },
       ]
    },
    {
      title: "Analytic Philosophy",
      materials: [
        { name: "Test", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/analytic phil/20th century analytic, for test.docx" },
        { name: "Handout 2nd part", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/analytic phil/ANALYTIC PHILOSOPHY-WPS Office.docx" },
        { name: "Log. Atomism", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/analytic phil/LOGICAL ATOMISM.docx" },
        { name: "W. V. O Quine", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/analytic phil/Missing_links_W_V_Quine_the_making_of_Tw 2.pdf" },
        { name: "Notes on Lang. Anal.", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/analytic phil/Note on language analysis and Definite Descriptions.docx" },
        { name: "Handout 1st Part", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/analytic phil/slide days 5-9.pdf" },
        { name: "Exam question", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/analytic phil/Analytic 3q.pdf" },
        { name: "Brief Note", url: "https://savio-emma.github.io/sweet-store-4/year4/first sem/analytic phil/Brief Note to assist your reading.docx" },
       ]
    },
    
  ];

  return (
    <div className="study-page">

      <header className="study-header">
        <div className="logo">Sweetest</div>
        <div className="site-name">Study website</div>
      </header>

      <marquee className="ticker">
        <p>Choice is the quiet power behind direction 👣 Each decision shapes the path before it is walked 🧠🛤️</p>
      </marquee>

      <div className="study-container">
        <div className="intro-note">
          📚 Please click on each subject below to view and download the available study materials.
        </div>

        <div className="subjects-list">
          {subjects.map((subject, index) => (
            <details key={index} className="subject-item">
              <summary>{subject.title}</summary>
              <div className="material-links">
                {subject.materials.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="material-link"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </details>
          ))}
        </div>

        {/* Back link - you had <a href="menu.html"> */}
        <div className="back-link-wrapper">
          <Link to="/menu" className="back-link">
            <i className="fa-solid fa-left-long"></i> Back to Menu
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
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