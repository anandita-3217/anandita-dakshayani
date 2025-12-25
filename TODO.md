# Portfolio App Routing Structure

## 1. Install React Router

```bash
npm install react-router-dom
```

## 2. File Structure

```
src/
├── App.jsx                 # Main app with routing
├── components/
│   ├── Header.jsx         # Navbar with Links
│   ├── Hero.jsx
│   ├── AboutBrief.jsx     # Short version for home
│   ├── AboutFull.jsx      # Full version for about page
│   ├── Hobbies.jsx
│   ├── Certificates.jsx
│   ├── Skills.jsx
│   ├── ContributionMap.jsx
│   ├── Resume.jsx
│   ├── Learning.jsx       # Mini projects
│   ├── Projects.jsx       # All projects
│   ├── FeaturedProjects.jsx  # 2-3 projects for home
│   ├── Contact.jsx
│   └── Footer.jsx
└── pages/
    ├── HomePage.jsx
    ├── AboutPage.jsx
    └── ProjectsPage.jsx
```

## 3. App.jsx (Main File)

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

## 4. Header.jsx (Updated with Navigation)

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Your Name
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-blue-400 transition">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
```

## 5. pages/HomePage.jsx

```jsx
import React from 'react';
import Hero from '../components/Hero';
import AboutBrief from '../components/AboutBrief';
import FeaturedProjects from '../components/FeaturedProjects';
import Contact from '../components/Contact';

function HomePage() {
  return (
    <>
      <Hero />
      <AboutBrief />
      <FeaturedProjects />
      <Contact />
    </>
  );
}

export default HomePage;
```

## 6. pages/AboutPage.jsx

```jsx
import React from 'react';
import AboutFull from '../components/AboutFull';
import Hobbies from '../components/Hobbies';
import Certificates from '../components/Certificates';
import Skills from '../components/Skills';
import ContributionMap from '../components/ContributionMap';
import Resume from '../components/Resume';

function AboutPage() {
  return (
    <>
      <AboutFull />
      <Hobbies />
      <Certificates />
      <Skills />
      <ContributionMap />
      <Resume />
    </>
  );
}

export default AboutPage;
```

## 7. pages/ProjectsPage.jsx

```jsx
import React from 'react';
import Learning from '../components/Learning';
import Projects from '../components/Projects';

function ProjectsPage() {
  return (
    <>
      <Learning />
      <Projects />
    </>
  );
}

export default ProjectsPage;
```

## 8. components/AboutBrief.jsx (New Component)

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AboutBrief() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
        <p className="text-lg text-gray-700 mb-4">
          Brief introduction about yourself (2-3 sentences)
        </p>
        
        {/* Small GitHub activity preview */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-3">GitHub Activity</h3>
          {/* Add a small version of your ContributionMap here */}
        </div>
        
        <div className="text-center">
          <Link 
            to="/about" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Learn More About Me →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutBrief;
```

## 9. components/FeaturedProjects.jsx (New Component)

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

function FeaturedProjects() {
  const featuredProjects = [
    // Add 2-3 of your best projects
    { id: 1, title: 'Project 1', description: '...', tags: ['React', 'Node.js'] },
    { id: 2, title: 'Project 2', description: '...', tags: ['Next.js', 'MongoDB'] },
    { id: 3, title: 'Project 3', description: '...', tags: ['TypeScript', 'API'] },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/projects" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
```

## 10. Additional Tips

### Smooth Scrolling to Top on Route Change

Add this to App.jsx:

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Then in App component:
function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* rest of your app */}
    </Router>
  );
}
```

### Active Link Styling

Update Header.jsx to highlight active links:

```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/" 
  className={({ isActive }) => 
    isActive ? "text-blue-400" : "hover:text-blue-400 transition"
  }
>
  Home
</NavLink>
```

## Migration Steps

1. **Install react-router-dom**
2. **Create the pages folder** and three page components
3. **Split your About component** into AboutBrief and AboutFull
4. **Create FeaturedProjects component** that shows only 2-3 projects
5. **Update Header** to use Link/NavLink from react-router-dom
6. **Update App.jsx** with Router, Routes, and Route components
7. **Test navigation** between pages
8. **Add ScrollToTop component** for better UX

This structure keeps your home page clean while allowing detailed content on dedicated pages!