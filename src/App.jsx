
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  LayoutDashboard, BriefcaseBusiness,
  ChartNoAxesColumn, CloudUpload,
  Search, Database, TrendingUp
} from "lucide-react";
import "./App.css";

const skills = [
  { skill: "Python", count: 8 },
  { skill: "SQL", count: 7 },
  { skill: "AWS", count: 6 },
  { skill: "Java", count: 5 },
  { skill: "React", count: 4 },
  { skill: "Machine Learning", count: 3 }
];

const jobs = [
  {
    role: "Data Analyst",
    company: "ABC Technologies",
    skills: "Python, SQL",
    experience: "0–2 years",
    salary: "₹4–6 LPA"
  },
  {
    role: "Cloud Engineer",
    company: "Cloud Solutions",
    skills: "AWS, Linux",
    experience: "1–3 years",
    salary: "₹5–8 LPA"
  },
  {
    role: "Software Developer",
    company: "Tech Innovations",
    skills: "Java, React",
    experience: "0–2 years",
    salary: "₹4–7 LPA"
  },
  {
    role: "ML Engineer",
    company: "Future AI",
    skills: "Python, Machine Learning",
    experience: "1–3 years",
    salary: "₹6–10 LPA"
  }
];

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [search, setSearch] = useState("");

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Job Market Data", icon: BriefcaseBusiness },
    { name: "Skill Analytics", icon: ChartNoAxesColumn },
    { name: "Upload Dataset", icon: CloudUpload }
  ];

  const filteredJobs = jobs.filter(job =>
    `${job.role} ${job.company} ${job.skills}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <TrendingUp size={25} />
          </div>
          <div>
            <h2>SkillScope</h2>
            <p>JOB MARKET INTELLIGENCE</p>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav>
          {menu.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${page === name ? "active" : ""}`}
              onClick={() => setPage(name)}
            >
              <Icon size={19} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <div className="cloud-status">
          <Database size={22} />
          <strong>AWS Cloud Storage</strong>
          <span>● Connection pending</span>
          <p>Amazon S3 integration will be configured next.</p>
        </div>

        <p className="sidebar-footer">Powered by AWS Services</p>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>Workspace / {page}</span>
          <div className="profile">
            <div className="avatar">JS</div>
            <div>
              <strong>Project Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <section className="content">
          <div className="welcome">
            <div>
              <p className="eyebrow">JOB MARKET INTELLIGENCE</p>
              <h1>{page}</h1>
              <p className="subtitle">
                Explore job market trends and in-demand skills.
              </p>
            </div>
            <span className="demo-badge">SAMPLE DATA</span>
          </div>

          {page === "Dashboard" && (
            <>
              <div className="stats-grid">
                <Stat title="Job Postings" value="10" />
                <Stat title="Skills Tracked" value="12" />
                <Stat title="Top Skill" value="Python" />
                <Stat title="Job Categories" value="6" />
              </div>

              <div className="section-heading">
                <div>
                  <h2>Skill Demand Overview</h2>
                  <p>Example skill frequency counts</p>
                </div>
              </div>

              <div className="panel chart-panel">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={skills}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis dataKey="skill" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      name="Skill Count"
                      fill="#7059e8"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="section-heading">
                <div>
                  <h2>Popular Skills</h2>
                  <p>Example ranking</p>
                </div>
                <button
                  className="text-button"
                  onClick={() => setPage("Skill Analytics")}
                >
                  View all →
                </button>
              </div>

              <div className="panel skill-list">
                {skills.map((item, index) => (
                  <div className="skill-row" key={item.skill}>
                    <span className="rank">{index + 1}</span>
                    <strong>{item.skill}</strong>
                    <div className="progress">
                      <span
                        style={{
                          width: `${item.count / 8 * 100}%`
                        }}
                      />
                    </div>
                    <b>{item.count}</b>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === "Job Market Data" && (
            <div className="panel data-panel">
              <h2>Job Listings</h2>
              <p className="subtitle">
                Search job roles, companies and skills.
              </p>

              <div className="search-box">
                <Search size={18} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search jobs..."
                />
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Job Role</th>
                      <th>Company</th>
                      <th>Skills</th>
                      <th>Experience</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map(job => (
                      <tr key={job.role}>
                        <td>{job.role}</td>
                        <td>{job.company}</td>
                        <td>{job.skills}</td>
                        <td>{job.experience}</td>
                        <td>{job.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredJobs.length === 0 && (
                  <p>No matching jobs found.</p>
                )}
              </div>
            </div>
          )}

          {page === "Skill Analytics" && (
            <div className="panel data-panel">
              <h2>Skill Frequency Analysis</h2>
              <p className="subtitle">
                Illustrative results for the dashboard preview.
              </p>
              {skills.map(item => (
                <div className="analysis-row" key={item.skill}>
                  <span>{item.skill}</span>
                  <div className="progress">
                    <span
                      style={{
                        width: `${item.count / 8 * 100}%`
                      }}
                    />
                  </div>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          )}

          {page === "Upload Dataset" && (
            <div className="panel upload-panel">
              <CloudUpload size={45} />
              <h2>Upload Job Dataset</h2>
              <p>
                Upload your job market CSV file to analyse
                in-demand skills.
              </p>

              <div className="upload-drop">
                <CloudUpload size={32} />
                <strong>Cloud upload will be enabled next</strong>
                <span>
                  Your dataset will be stored in Amazon S3.
                </span>
              </div>

              <small>
                Required columns: role, company, skills,
                experience, salary
              </small>
            </div>
          )}

          <footer>
            SkillScope | Job Market Skill Demand Analysis | AWS
          </footer>
        </section>
      </main>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <small>Dashboard overview</small>
    </div>
  );
}
