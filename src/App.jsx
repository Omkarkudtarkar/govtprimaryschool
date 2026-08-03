import { useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  Image as ImageIcon,
  LogIn,
  Mail,
  MapPin,
  Phone,
  Send,
  Trash2,
  Upload,
  UsersRound,
} from 'lucide-react'
import aksharaClassroomImage from './assets/akshara-classroom.jpg'
import aksharaStudentsImage from './assets/akshara-students.jpg'
import aksharaTeaShopLibraryImage from './assets/akshara-tea-shop-library.jpg'
import './App.css'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'school123'
const EVENTS_STORAGE_KEY = 'jagalbet-school-events'
const PHOTOS_STORAGE_KEY = 'jagalbet-school-photos'
const FACULTY_STORAGE_KEY = 'jagalbet-school-faculty'
const ADMIN_STORAGE_KEY = 'jagalbet-school-admin'

const schoolProfile = {
  name: 'Govt. Higher Primary School, Jagalbet',
  shortName: 'Higher Primary School',
  place: 'Jagalbet',
  tagline: 'Empowering Young Minds | Quality Education for Every Child',
  udise: '29341105201',
  location: 'Jagalbet, Joida Taluk, Uttara Kannada',
  schoolType: 'Government Co-ed',
  medium: 'Kannada medium with English language learning support',
  address: 'Govt. Higher Primary School, Jagalbet, Joida Taluk, Uttara Kannada, Karnataka',
}

const defaultFaculty = [
  {
    id: 'head-teacher',
    name: 'Headmaster / Headmistress',
    role: 'Academic leadership and school administration',
    subject: 'School Leadership',
    focus: 'Learning standards, parent meetings, student support',
    photo: '',
  },
  {
    id: 'language-faculty',
    name: 'Language Faculty',
    role: 'Kannada, English, and reading practice',
    subject: 'Kannada and English',
    focus: 'Communication, handwriting, storytelling, library habits',
    photo: '',
  },
  {
    id: 'maths-science-faculty',
    name: 'Maths & Science Faculty',
    role: 'Activity-based numeracy and science learning',
    subject: 'Mathematics and Science',
    focus: 'Experiments, problem solving, classroom projects',
    photo: '',
  },
  {
    id: 'social-arts-faculty',
    name: 'Social Studies & Arts Faculty',
    role: 'Community learning, culture, and creative work',
    subject: 'Social Studies and Arts',
    focus: 'History, geography, drawing, songs, celebrations',
    photo: '',
  },
]

const defaultEvents = [
  {
    id: 'independence-day',
    title: 'Independence Day Celebration',
    date: 'August 15',
    detail: 'Flag hoisting, patriotic songs, speeches, and student cultural programs.',
  },
  {
    id: 'rajyotsava',
    title: 'Karnataka Rajyotsava',
    date: 'November 1',
    detail: 'Kannada songs, speeches, local culture activities, and student participation.',
  },
  {
    id: 'pratibha-karanji',
    title: 'Pratibha Karanji',
    date: 'As announced',
    detail: 'Talent-based competitions including music, speech, drawing, and cultural events.',
  },
  {
    id: 'sports-meet',
    title: 'School Sports Meet',
    date: 'January',
    detail: 'Track events, team games, drills, and student participation.',
  },
]

const noticeBoard = [
  {
    title: 'School Reopening',
    date: 'June',
    detail: 'Students and parents should follow the annual reopening instructions issued by the school.',
  },
  {
    title: 'Exam Dates',
    date: 'Term-wise',
    detail: 'Formative and summative assessment dates will be shared with parents through the school office.',
  },
  {
    title: 'Government Schemes',
    date: 'Academic Year',
    detail: 'Updates on PM POSHAN meals, free textbooks, uniforms, and scholarships will be posted here.',
  },
  {
    title: 'Holiday Announcements',
    date: 'As notified',
    detail: 'Government and local holiday notices will be updated for parents and students.',
  },
]

const academicCalendar = [
  {
    title: 'First Term',
    detail: 'School reopening, bridge courses, classroom routines, and foundational practice.',
  },
  {
    title: 'Mid-year Evaluations',
    detail: 'Regular class tests, activity records, oral work, and parent communication.',
  },
  {
    title: 'Second Term',
    detail: 'Project work, cultural activities, revision, and annual evaluation preparation.',
  },
  {
    title: 'Vacation Schedule',
    detail: 'Vacations and special holidays follow Government of Karnataka school instructions.',
  },
]

const facilities = [
  'Classrooms for primary and higher primary learning',
  'Library and reading support for children',
  'Playground space for games, drills, and sports practice',
  'Computer learning support when available',
  'Safe and welcoming campus environment',
]

const governmentSchemes = [
  'PM POSHAN Mid-Day Meal program',
  'Free textbooks as per government norms',
  'Free uniform distribution as per department guidelines',
  'Scholarship and student welfare support for eligible children',
  'RTE-aligned free and compulsory education support',
]

const admissionDocuments = [
  'Aadhaar card copy',
  'Birth certificate',
  'Transfer certificate, if applicable',
  'Previous school records, if applicable',
  'Parent or guardian contact details',
]

const stats = [
  { value: schoolProfile.udise, label: 'UDISE Code' },
  { value: 'Joida Taluk', label: 'Jagalbet, Uttara Kannada' },
  { value: schoolProfile.schoolType, label: 'School Type' },
]

const defaultPhotos = [
  {
    id: 'default-akshara-classroom',
    title: 'Rural Classroom Visit',
    caption: 'Students and visitors during a school visit in rural Karnataka.',
    src: aksharaClassroomImage,
  },
  {
    id: 'default-akshara-students',
    title: 'Classroom Learning',
    caption: 'Students working at the blackboard during a classroom activity.',
    src: aksharaStudentsImage,
  },
  {
    id: 'default-akshara-tea-shop-library',
    title: 'Community Reading Space',
    caption: 'A tea shop library supporting reading in the local community.',
    src: aksharaTeaShopLibraryImage,
  },
]

function getStoredValue(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => getStoredValue(key, fallback))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname])

  return null
}

function LoadingScreen() {
  return (
    <div className="loader-screen" role="status" aria-label="Loading website">
      <div className="pencil-loader" aria-hidden="true">
        <div className="paper-line">
          <span>Higher Primary School Jagalbet</span>
        </div>
        <div className="pencil">
          <span className="pencil-tip"></span>
          <span className="pencil-body"></span>
          <span className="pencil-eraser"></span>
        </div>
      </div>
    </div>
  )
}

function Header() {
  const navigate = useNavigate()
  const [logoTapCount, setLogoTapCount] = useState(0)

  function handleLogoTap(event) {
    const nextCount = logoTapCount + 1

    if (nextCount >= 6) {
      event.preventDefault()
      setLogoTapCount(0)
      navigate('/admin')
      return
    }

    setLogoTapCount(nextCount)
    window.setTimeout(() => {
      setLogoTapCount((currentCount) => (currentCount === nextCount ? 0 : currentCount))
    }, 2200)
  }

  return (
    <header className="site-header">
      <Link
        className="brand"
        to="/"
        aria-label="Higher Primary School Jagalbet home"
        onClick={handleLogoTap}
      >
        <span className="brand-mark">
          <GraduationCap size={22} aria-hidden="true" />
        </span>
        <span>
          <strong>{schoolProfile.shortName}</strong>
          <small>{schoolProfile.place}</small>
        </span>
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/academics">Academics</NavLink>
        <NavLink to="/facilities">Facilities & Welfare</NavLink>
        <NavLink to="/activities">Activities & Events</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/admissions">Admissions & Compliance</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </nav>
    </header>
  )
}

function HomePage({ photos }) {
  const latestPhotos = photos.slice(0, 3)

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Government higher primary education</p>
          <h1>{schoolProfile.name}</h1>
          <p className="school-tagline">{schoolProfile.tagline}</p>
          <p className="hero-copy">
            Welcome from the Headmaster / Headmistress. Our school nurtures
            curiosity, creativity, values, strong basics, and life skills for
            every child in Jagalbet.
          </p>
          <dl className="hero-identity" aria-label="School identity">
            <div>
              <dt>UDISE Code</dt>
              <dd>{schoolProfile.udise}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{schoolProfile.location}</dd>
            </div>
            <div>
              <dt>School Type</dt>
              <dd>{schoolProfile.schoolType}</dd>
            </div>
          </dl>
          <div className="hero-actions">
            <Link className="primary-button" to="/admissions">
              <Send size={18} aria-hidden="true" />
              Admissions
            </Link>
            <Link className="secondary-button" to="/activities">
              <CalendarDays size={18} aria-hidden="true" />
              View Events
            </Link>
          </div>
        </div>

        <div className="hero-media" aria-label="School campus illustration">
          <div className="crest-badge" aria-label="Official school crest">
            <GraduationCap size={32} aria-hidden="true" />
            <span>Govt. School</span>
          </div>
          <img src={aksharaClassroomImage} alt="Students in a rural Karnataka classroom" />
        </div>
      </section>

      <section className="stats-band" aria-label="School highlights">
        {stats.map((item) => (
          <div className="stat-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section-block notice-section">
        <div className="section-heading">
          <p className="eyebrow">Notice Board</p>
          <h2>Latest School Updates</h2>
          <p>
            Reopenings, exam dates, government schemes, holiday announcements,
            and school office notices can be updated here.
          </p>
        </div>
        <div className="notice-grid">
          {noticeBoard.map((notice) => (
            <article className="notice-card" key={notice.title}>
              <span>{notice.date}</span>
              <h3>{notice.title}</h3>
              <p>{notice.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {latestPhotos.length > 0 && (
        <section className="section-block latest-gallery">
          <div className="section-heading">
            <p className="eyebrow">Latest Photos</p>
            <h2>Recent School Gallery</h2>
            <p>Photos uploaded by the admin appear here and on the Gallery page.</p>
            <Link className="section-link-button" to="/gallery">
              <ImageIcon size={18} aria-hidden="true" />
              Open Gallery
            </Link>
          </div>
          <div className="gallery-grid compact-gallery">
            {latestPhotos.map((photo) => (
              <article className="gallery-card" key={photo.id}>
                <img src={photo.src} alt={photo.title} />
                <div>
                  <h3>{photo.title}</h3>
                  <p>{photo.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="section-block home-preview">
        <div className="section-heading">
          <p className="eyebrow">Explore</p>
          <h2>Essential School Information</h2>
          <p>Select a page to view academics, welfare, events, admissions, or contact details.</p>
        </div>
        <div className="preview-grid">
          <Link className="preview-card" to="/about">
            <BookOpen size={22} aria-hidden="true" />
            <h3>About Us</h3>
            <p>Read about the school mission, history, leadership, and staff.</p>
          </Link>
          <Link className="preview-card" to="/academics">
            <GraduationCap size={22} aria-hidden="true" />
            <h3>Academics</h3>
            <p>View classes, curriculum, medium of instruction, and calendar.</p>
          </Link>
          <Link className="preview-card" to="/facilities">
            <UsersRound size={22} aria-hidden="true" />
            <h3>Facilities & Welfare</h3>
            <p>See infrastructure and government student welfare schemes.</p>
          </Link>
          <Link className="preview-card" to="/gallery">
            <ImageIcon size={22} aria-hidden="true" />
            <h3>Gallery</h3>
            <p>View classroom, activity, and community learning photos.</p>
          </Link>
          <Link className="preview-card" to="/admissions">
            <CalendarDays size={22} aria-hidden="true" />
            <h3>Admissions</h3>
            <p>Check requirements, documents, eligibility, and RTE compliance.</p>
          </Link>
        </div>
      </section>
    </>
  )
}

function FacultyPage({ facultyMembers }) {
  return (
    <section className="section-block section-page">
      <div className="page-hero">
        <p className="eyebrow">Faculty</p>
        <h1>Teachers Who Support Every Stage</h1>
        <p>
          The school team guides students through classroom learning, values,
          activities, and regular practice.
        </p>
      </div>

      <div className="faculty-grid">
        {facultyMembers.map((member) => (
          <article className="info-card faculty-card" key={member.id}>
            {member.photo ? (
              <img className="faculty-photo" src={member.photo} alt={member.name} />
            ) : (
              <div className="faculty-photo faculty-photo-placeholder">
                <UsersRound size={34} aria-hidden="true" />
              </div>
            )}
            <h3>{member.name}</h3>
            <strong className="faculty-subject">{member.subject}</strong>
            <p>{member.role}</p>
            <span>{member.focus}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function EventsPage({ events }) {
  return (
    <section className="section-block section-page event-section">
      <div className="page-hero">
        <p className="eyebrow">Events</p>
        <h1>School Activities And Celebrations</h1>
        <p>
          Events give students space to perform, compete, explore, and learn
          with the community.
        </p>
      </div>

      <div className="event-list">
        {events.map((event) => (
          <article className="event-row" key={event.id}>
            <div className="event-date">
              <CalendarDays size={18} aria-hidden="true" />
              <span>{event.date}</span>
            </div>
            <div>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </div>
            <ChevronRight className="event-arrow" size={20} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}

function GalleryPage({ photos }) {
  return (
    <section className="section-block section-page gallery-section">
      <div className="page-hero">
        <p className="eyebrow">Gallery</p>
        <h1>School Photos</h1>
        <p>Photos uploaded by the admin will be displayed here for visitors.</p>
      </div>

      {photos.length > 0 ? (
        <div className="gallery-grid">
          {photos.map((photo) => (
            <article className="gallery-card" key={photo.id}>
              <img src={photo.src} alt={photo.title} />
              <div>
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <ImageIcon size={34} aria-hidden="true" />
          <h3>No photos uploaded yet</h3>
          <p>Admin uploaded photos will appear on this gallery page.</p>
          <Link className="secondary-button" to="/admin">
            Go to Admin
          </Link>
        </div>
      )}
    </section>
  )
}

function AboutPage({ facultyMembers }) {
  return (
    <>
      <section className="about-band">
        <div className="about-text">
          <p className="eyebrow">About Our School</p>
          <h1>Rooted In Jagalbet, Built Around Children</h1>
          <p>
            Govt. Higher Primary School, Jagalbet is committed to nurturing
            curiosity, creativity, and values in primary school students.
            Located in the heart of Jagalbet, our school provides a safe,
            welcoming, and encouraging environment where children build academic
            strongholds and essential life skills.
          </p>
        </div>

        <div className="about-points">
          <div>
            <BookOpen size={22} aria-hidden="true" />
            <h3>Vision</h3>
            <p>
              To give every child in the local community access to caring,
              value-based, and activity-rich primary education.
            </p>
          </div>
          <div>
            <GraduationCap size={22} aria-hidden="true" />
            <h3>Mission</h3>
            <p>
              To strengthen reading, writing, numeracy, confidence, discipline,
              creativity, and social responsibility.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block content-section">
        <div className="content-grid two-column">
          <article className="content-card">
            <p className="eyebrow">History & Profile</p>
            <h2>Serving Jagalbet Families</h2>
            <p>
              The school serves children from Jagalbet and nearby areas of
              Joida Taluk, Uttara Kannada. It supports primary learning through
              classroom teaching, co-curricular participation, parent
              communication, and government student welfare programs.
            </p>
          </article>
          <article className="content-card">
            <p className="eyebrow">School Profile</p>
            <h2>Official Details</h2>
            <dl className="detail-list">
              <div>
                <dt>School Name</dt>
                <dd>{schoolProfile.name}</dd>
              </div>
              <div>
                <dt>UDISE Code</dt>
                <dd>{schoolProfile.udise}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{schoolProfile.location}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{schoolProfile.schoolType}</dd>
              </div>
            </dl>
          </article>
        </div>

        <div className="section-heading staff-heading">
          <p className="eyebrow">Leadership & Staff</p>
          <h2>Teachers And Administrative Personnel</h2>
          <p>
            Faculty details uploaded from the admin panel appear here and on
            the Faculty page.
          </p>
        </div>
        <div className="faculty-grid">
          {facultyMembers.map((member) => (
            <article className="info-card faculty-card" key={member.id}>
              {member.photo ? (
                <img className="faculty-photo" src={member.photo} alt={member.name} />
              ) : (
                <div className="faculty-photo faculty-photo-placeholder">
                  <UsersRound size={34} aria-hidden="true" />
                </div>
              )}
              <h3>{member.name}</h3>
              <strong className="faculty-subject">{member.subject}</strong>
              <p>{member.role}</p>
              <span>{member.focus}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function AcademicsPage() {
  return (
    <section className="section-block section-page content-section">
      <div className="page-hero">
        <p className="eyebrow">Academics</p>
        <h1>Curriculum, Classes, And Calendar</h1>
        <p>
          The school follows Karnataka State Board guidance for primary and
          higher primary education with steady focus on foundational learning.
        </p>
      </div>

      <div className="content-grid three-column">
        <article className="content-card">
          <BookOpen size={24} aria-hidden="true" />
          <h2>Curriculum</h2>
          <p>
            Classes 1 to 7 follow the Karnataka State Board syllabus, classroom
            practice, activity-based learning, and regular evaluation.
          </p>
        </article>
        <article className="content-card">
          <GraduationCap size={24} aria-hidden="true" />
          <h2>Medium Of Instruction</h2>
          <p>{schoolProfile.medium}. Students receive language support through reading, writing, and speaking practice.</p>
        </article>
        <article className="content-card">
          <CalendarDays size={24} aria-hidden="true" />
          <h2>Evaluation</h2>
          <p>
            Teachers track classwork, activities, term evaluations, attendance,
            and parent communication throughout the academic year.
          </p>
        </article>
      </div>

      <section className="timeline-section" aria-label="Academic calendar">
        <div className="section-heading">
          <p className="eyebrow">Academic Calendar</p>
          <h2>Term Dates And Evaluation Timeline</h2>
        </div>
        <div className="timeline-list">
          {academicCalendar.map((item) => (
            <article className="timeline-item" key={item.title}>
              <CalendarDays size={20} aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

function FacilitiesPage() {
  return (
    <section className="section-block section-page content-section">
      <div className="page-hero">
        <p className="eyebrow">Facilities & Student Welfare</p>
        <h1>Infrastructure And Government Schemes</h1>
        <p>
          School facilities and welfare programs support attendance, health,
          learning materials, and child-friendly education.
        </p>
      </div>

      <div className="content-grid two-column">
        <article className="content-card">
          <BookOpen size={24} aria-hidden="true" />
          <h2>Infrastructure</h2>
          <ul className="check-list">
            {facilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="content-card">
          <UsersRound size={24} aria-hidden="true" />
          <h2>Government Schemes</h2>
          <ul className="check-list">
            {governmentSchemes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <section className="notice-section welfare-notes">
        <div className="section-heading">
          <p className="eyebrow">Student Support</p>
          <h2>PM POSHAN And Learning Materials</h2>
          <p>
            Mid-day meal schedules, textbook distribution, uniform distribution,
            and scholarship updates are shared through school notices and parent
            communication.
          </p>
        </div>
      </section>
    </section>
  )
}

function ActivitiesPage({ events, photos }) {
  const latestPhotos = photos.slice(0, 6)

  return (
    <section className="section-block section-page content-section">
      <div className="page-hero">
        <p className="eyebrow">Activities & Events</p>
        <h1>Sports, Culture, Celebrations, And Gallery</h1>
        <p>
          Students participate in school programs, cultural days, sports,
          student projects, and Pratibha Karanji activities.
        </p>
      </div>

      <div className="event-list activity-events">
        {events.map((event) => (
          <article className="event-row" key={event.id}>
            <div className="event-date">
              <CalendarDays size={18} aria-hidden="true" />
              <span>{event.date}</span>
            </div>
            <div>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </div>
            <ChevronRight className="event-arrow" size={20} aria-hidden="true" />
          </article>
        ))}
      </div>

      <section className="gallery-preview-section">
        <div className="section-heading">
          <p className="eyebrow">Photo & Video Gallery</p>
          <h2>Campus Activities And Student Work</h2>
          <p>
            Gallery photos uploaded by the school admin are shown here. Video
            links can be added as event details when required.
          </p>
        </div>
        <div className="gallery-grid">
          {latestPhotos.map((photo) => (
            <article className="gallery-card" key={photo.id}>
              <img src={photo.src} alt={photo.title} />
              <div>
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

function AdmissionsPage() {
  return (
    <section className="section-block section-page content-section">
      <div className="page-hero">
        <p className="eyebrow">Admissions & Compliance</p>
        <h1>Admission Process And RTE Information</h1>
        <p>
          Admissions are supported through the school office as per government
          rules, age eligibility, records, and Right to Education guidelines.
        </p>
      </div>

      <div className="content-grid two-column">
        <article className="content-card">
          <GraduationCap size={24} aria-hidden="true" />
          <h2>Admission Process</h2>
          <p>
            Parents or guardians can visit the school office with required
            documents. The office will guide eligibility, class placement, and
            transfer record requirements.
          </p>
          <ul className="check-list">
            <li>Classes offered: 1 to 7</li>
            <li>Eligibility: As per Government of Karnataka school norms</li>
            <li>Admission support: Contact the school during working hours</li>
          </ul>
        </article>
        <article className="content-card">
          <BookOpen size={24} aria-hidden="true" />
          <h2>Required Documents</h2>
          <ul className="check-list">
            {admissionDocuments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <section className="rte-band">
        <div>
          <p className="eyebrow">RTE Act Compliance</p>
          <h2>Free And Compulsory Education</h2>
          <p>
            The school follows Right to Education guidelines and government
            instructions for free, inclusive, and child-friendly elementary
            education.
          </p>
        </div>
      </section>
    </section>
  )
}

function ContactPage() {
  const [messageSent, setMessageSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setMessageSent(true)
  }

  return (
    <section className="section-block section-page contact-section">
      <div className="page-hero">
        <p className="eyebrow">Contact Us</p>
        <h1>Reach The School Office</h1>
        <p>
          For admission, certificates, records, parent meetings, and community
          feedback, contact the school during working hours.
        </p>
      </div>

      <div className="contact-layout">
        <div className="contact-details">
          <div className="contact-item">
            <MapPin size={20} aria-hidden="true" />
            <div>
              <strong>Postal Address</strong>
              <span>{schoolProfile.address}</span>
            </div>
          </div>
          <div className="contact-item">
            <Phone size={20} aria-hidden="true" />
            <div>
              <strong>Phone Number</strong>
              <span>To be updated by school office</span>
            </div>
          </div>
          <div className="contact-item">
            <Mail size={20} aria-hidden="true" />
            <div>
              <strong>Email Address</strong>
              <span>To be updated by school office</span>
            </div>
          </div>
          <div className="contact-item">
            <CalendarDays size={20} aria-hidden="true" />
            <div>
              <strong>Office Hours</strong>
              <span>Monday to Saturday, 9:30 AM to 4:30 PM</span>
            </div>
          </div>
          <div className="contact-item">
            <BookOpen size={20} aria-hidden="true" />
            <div>
              <strong>UDISE Code</strong>
              <span>{schoolProfile.udise}</span>
            </div>
          </div>
        </div>

        <div className="map-panel" aria-label="Location map">
          <iframe
            title="Govt. Higher Primary School Jagalbet location map"
            src="https://www.google.com/maps?q=Jagalbet%2C%20Joida%20Taluk%2C%20Uttara%20Kannada%2C%20Karnataka&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" placeholder="Your name" required />
          </label>
          <label>
            Phone Number
            <input name="phone" type="tel" placeholder="Your phone number" required />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Write your inquiry or feedback"
              required
            />
          </label>
          <button type="submit" className="primary-button">
            <Send size={18} aria-hidden="true" />
            Send Inquiry
          </button>
          {messageSent && (
            <p className="form-status" role="status">
              Thank you. Your enquiry is ready for the school office.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function AdminLogin({ onLogin }) {
  const [error, setError] = useState('')

  function handleLogin(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError('')
      onLogin()
      return
    }

    setError('Invalid username or password.')
  }

  return (
    <section className="section-block section-page admin-section">
      <div className="page-hero">
        <p className="eyebrow">Admin Login</p>
        <h1>Manage Faculty, Events, And Gallery Photos</h1>
        <p>Login to add faculty members, school events, and gallery photos.</p>
      </div>

      <form className="contact-form admin-login" onSubmit={handleLogin}>
        <label>
          Username
          <input name="username" type="text" placeholder="admin" required />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="school123" required />
        </label>
        <button type="submit" className="primary-button">
          <LogIn size={18} aria-hidden="true" />
          Login
        </button>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <p className="admin-help">Demo login: admin / school123</p>
      </form>
    </section>
  )
}

function AdminPage({
  events,
  photos,
  facultyMembers,
  onAddEvent,
  onAddPhotos,
  onAddFaculty,
  onDeleteEvent,
  onDeletePhoto,
  onDeleteFaculty,
  onLogout,
}) {
  const [eventStatus, setEventStatus] = useState('')
  const [photoStatus, setPhotoStatus] = useState('')
  const [facultyStatus, setFacultyStatus] = useState('')

  function handleEventSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    onAddEvent({
      id: `event-${Date.now()}`,
      title: formData.get('title').trim(),
      date: formData.get('date').trim(),
      detail: formData.get('detail').trim(),
    })

    form.reset()
    setEventStatus('Event uploaded successfully.')
  }

  async function handlePhotoSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const files = Array.from(formData.getAll('photos')).filter((file) => file.size > 0)

    if (files.length === 0) {
      setPhotoStatus('Please choose at least one photo.')
      return
    }

    const title = formData.get('title').trim() || 'School Photo'
    const caption = formData.get('caption').trim() || 'Uploaded from the school admin panel.'
    const uploadedPhotos = await Promise.all(
      files.map(async (file, index) => ({
        id: `photo-${Date.now()}-${index}`,
        title: files.length === 1 ? title : `${title} ${index + 1}`,
        caption,
        src: await readFileAsDataUrl(file),
      })),
    )

    onAddPhotos(uploadedPhotos)
    form.reset()
    setPhotoStatus(`${uploadedPhotos.length} photo uploaded successfully.`)
  }

  async function handleFacultySubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const photoFile = formData.get('photo')

    onAddFaculty({
      id: `faculty-${Date.now()}`,
      name: formData.get('name').trim(),
      subject: formData.get('subject').trim(),
      role: formData.get('information').trim(),
      focus: formData.get('focus').trim() || 'Dedicated to student learning and support.',
      photo: photoFile && photoFile.size > 0 ? await readFileAsDataUrl(photoFile) : '',
    })

    form.reset()
    setFacultyStatus('Faculty member uploaded successfully.')
  }

  return (
    <section className="section-block section-page admin-section">
      <div className="admin-header">
        <div className="page-hero">
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Upload Faculty, Events, And Photos</h1>
          <p>
            Faculty appears on the Faculty page. Events and photos appear on
            their public pages.
          </p>
        </div>
        <button type="button" className="secondary-button admin-logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="admin-grid">
        <form className="contact-form admin-panel" onSubmit={handleFacultySubmit}>
          <div className="form-heading">
            <UsersRound size={22} aria-hidden="true" />
            <h2>Add Faculty</h2>
          </div>
          <label>
            Faculty Name
            <input name="name" type="text" placeholder="Example: Smt. Kavita Patil" required />
          </label>
          <label>
            Subject
            <input name="subject" type="text" placeholder="Example: Mathematics" required />
          </label>
          <label>
            Information
            <textarea name="information" rows="3" placeholder="Write teacher information" required />
          </label>
          <label>
            Focus Area
            <input name="focus" type="text" placeholder="Example: Activity-based learning" />
          </label>
          <label>
            Faculty Photo
            <input name="photo" type="file" accept="image/*" required />
          </label>
          <button type="submit" className="primary-button">
            <Upload size={18} aria-hidden="true" />
            Upload Faculty
          </button>
          {facultyStatus && <p className="form-status">{facultyStatus}</p>}
        </form>

        <form className="contact-form admin-panel" onSubmit={handleEventSubmit}>
          <div className="form-heading">
            <CalendarDays size={22} aria-hidden="true" />
            <h2>Add Event</h2>
          </div>
          <label>
            Event Title
            <input name="title" type="text" placeholder="Example: Independence Day" required />
          </label>
          <label>
            Month or Date
            <input name="date" type="text" placeholder="Example: August 15" required />
          </label>
          <label>
            Event Details
            <textarea name="detail" rows="4" placeholder="Write event details" required />
          </label>
          <button type="submit" className="primary-button">
            <Upload size={18} aria-hidden="true" />
            Upload Event
          </button>
          {eventStatus && <p className="form-status">{eventStatus}</p>}
        </form>

        <form className="contact-form admin-panel" onSubmit={handlePhotoSubmit}>
          <div className="form-heading">
            <ImageIcon size={22} aria-hidden="true" />
            <h2>Add Photos</h2>
          </div>
          <label>
            Photo Title
            <input name="title" type="text" placeholder="Example: Sports Day" />
          </label>
          <label>
            Caption
            <textarea name="caption" rows="3" placeholder="Write a short caption" />
          </label>
          <label>
            Choose Photos
            <input name="photos" type="file" accept="image/*" multiple required />
          </label>
          <button type="submit" className="primary-button">
            <Upload size={18} aria-hidden="true" />
            Upload Photos
          </button>
          {photoStatus && <p className="form-status">{photoStatus}</p>}
        </form>
      </div>

      <div className="admin-manage-grid">
        <section className="manage-panel">
          <h2>Uploaded Faculty</h2>
          {facultyMembers.length > 0 ? (
            <div className="manage-photo-grid">
              {facultyMembers.map((member) => (
                <article className="manage-photo" key={member.id}>
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <div className="manage-photo-placeholder">
                      <UsersRound size={26} aria-hidden="true" />
                    </div>
                  )}
                  <div className="manage-photo-body">
                    <strong>{member.name}</strong>
                    <span>{member.subject}</span>
                    <button type="button" onClick={() => onDeleteFaculty(member.id)}>
                      <Trash2 size={17} aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="muted-text">No admin uploaded faculty yet.</p>
          )}
        </section>

        <section className="manage-panel">
          <h2>Uploaded Events</h2>
          {events.length > 0 ? (
            <div className="manage-list">
              {events.map((event) => (
                <article className="manage-row" key={event.id}>
                  <div>
                    <strong>{event.title}</strong>
                    <span>{event.date}</span>
                  </div>
                  <button type="button" onClick={() => onDeleteEvent(event.id)}>
                    <Trash2 size={17} aria-hidden="true" />
                    Remove
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="muted-text">No admin uploaded events yet.</p>
          )}
        </section>

        <section className="manage-panel">
          <h2>Uploaded Photos</h2>
          {photos.length > 0 ? (
            <div className="manage-photo-grid">
              {photos.map((photo) => (
                <article className="manage-photo" key={photo.id}>
                  <img src={photo.src} alt={photo.title} />
                  <div className="manage-photo-body">
                    <strong>{photo.title}</strong>
                    <button type="button" onClick={() => onDeletePhoto(photo.id)}>
                      <Trash2 size={17} aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="muted-text">No gallery photos uploaded yet.</p>
          )}
        </section>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p>{schoolProfile.name}</p>
        <span>{schoolProfile.tagline}</span>
      </div>
      <small className="photo-credit-line">
        Photos:
        {' '}
        <a
          href="https://akshara.org.in/beautiful-warm-resourceful-my-first-visit-to-a-school-in-rural-india/"
          target="_blank"
          rel="noreferrer"
        >
          Akshara Foundation
        </a>
        {' '}
        from the article "My first visit to a government school in rural India",
        {' '}
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
          CC BY 4.0
        </a>
        .
      </small>
    </footer>
  )
}

function App() {
  const [uploadedEvents, setUploadedEvents] = useStoredState(EVENTS_STORAGE_KEY, [])
  const [photos, setPhotos] = useStoredState(PHOTOS_STORAGE_KEY, [])
  const [uploadedFaculty, setUploadedFaculty] = useStoredState(FACULTY_STORAGE_KEY, [])
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(ADMIN_STORAGE_KEY) === 'true')
  const [isLoading, setIsLoading] = useState(true)
  const allEvents = useMemo(() => [...uploadedEvents, ...defaultEvents], [uploadedEvents])
  const allPhotos = useMemo(() => [...photos, ...defaultPhotos], [photos])
  const allFaculty = useMemo(() => [...uploadedFaculty, ...defaultFaculty], [uploadedFaculty])

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 1900)
    return () => window.clearTimeout(loadingTimer)
  }, [])

  function handleLogin() {
    localStorage.setItem(ADMIN_STORAGE_KEY, 'true')
    setIsAdmin(true)
  }

  function handleLogout() {
    localStorage.removeItem(ADMIN_STORAGE_KEY)
    setIsAdmin(false)
  }

  function handleAddEvent(event) {
    setUploadedEvents((currentEvents) => [event, ...currentEvents])
  }

  function handleAddPhotos(newPhotos) {
    setPhotos((currentPhotos) => [...newPhotos, ...currentPhotos])
  }

  function handleAddFaculty(member) {
    setUploadedFaculty((currentFaculty) => [member, ...currentFaculty])
  }

  function handleDeleteEvent(eventId) {
    setUploadedEvents((currentEvents) => currentEvents.filter((event) => event.id !== eventId))
  }

  function handleDeletePhoto(photoId) {
    setPhotos((currentPhotos) => currentPhotos.filter((photo) => photo.id !== photoId))
  }

  function handleDeleteFaculty(memberId) {
    setUploadedFaculty((currentFaculty) =>
      currentFaculty.filter((member) => member.id !== memberId),
    )
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isLoading && <LoadingScreen />}
      <div className="site-shell">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage photos={allPhotos} />} />
            <Route path="/faculty" element={<FacultyPage facultyMembers={allFaculty} />} />
            <Route path="/events" element={<EventsPage events={allEvents} />} />
            <Route path="/gallery" element={<GalleryPage photos={allPhotos} />} />
            <Route path="/about" element={<AboutPage facultyMembers={allFaculty} />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/activities" element={<ActivitiesPage events={allEvents} photos={allPhotos} />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminPage
                    events={uploadedEvents}
                    photos={photos}
                    facultyMembers={uploadedFaculty}
                    onAddEvent={handleAddEvent}
                    onAddPhotos={handleAddPhotos}
                    onAddFaculty={handleAddFaculty}
                    onDeleteEvent={handleDeleteEvent}
                    onDeletePhoto={handleDeletePhoto}
                    onDeleteFaculty={handleDeleteFaculty}
                    onLogout={handleLogout}
                  />
                ) : (
                  <AdminLogin onLogin={handleLogin} />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
