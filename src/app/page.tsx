'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, MenuIcon, XIcon, SendIcon } from 'lucide-react'
import InteractiveBackground from '@/components/InteractiveBackground'
import emailjs from '@emailjs/browser'

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const count = localStorage.getItem('visitorCount')
    const newCount = count ? parseInt(count) + 1 : 1
    localStorage.setItem('visitorCount', newCount.toString())
    setVisitorCount(newCount)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS Implementation (Recommended)
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Your Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Your Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // Your Public Key
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }

      // Alternative: Formspree (Commented out)
      /*
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
      */

      // Alternative: Google Apps Script (Commented out)
      /*
      const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
      */

    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark text-white relative">
      <InteractiveBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm border-b border-dark-lighter">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-primary"
            >
              Vignan Uday Chand
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-dark-lighter border-b border-dark-darker"
          >
            <div className="container mx-auto px-4 py-4">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-darker to-dark opacity-50"></div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Software Engineer
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Vignan Uday Chand Chowdary Narisetty
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/vnariset"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-dark-lighter hover:bg-primary transition-colors"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/coderuday"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-dark-lighter hover:bg-primary transition-colors"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div className="text-gray-300 text-lg leading-relaxed mb-8 space-y-4">
              <p>
                I'm a passionate and results-driven Software Engineer with over 4 years of experience building scalable web applications, cloud-native services, and AI-powered solutions. Currently working at Akdene Technologies, I specialize in full-stack development, microservices architecture, and emerging AI technologies.
              </p>
              <p>
                With a Master's in Computer Science (4.0 GPA) from the University of Alabama at Birmingham and experience at Amazon, I bring a unique combination of academic excellence and enterprise-level expertise. I've successfully delivered projects impacting millions of users and optimized systems handling 400M+ shipping units annually.
              </p>
            </div>
            <div className="flex justify-center">
              <a
                href="/Uday_Resume_Jun.pdf"
                download
                className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark-lighter p-6 rounded-lg border border-dark-darker hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Master of Science in Computer Science</h3>
                  <span className="text-primary font-bold">4.0 GPA</span>
                </div>
                <p className="text-gray-400 mb-2">University of Alabama at Birmingham</p>
                <p className="text-gray-400 mb-2">Birmingham, Alabama</p>
                <p className="text-gray-400">Jan 2023 - Dec 2024</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark-lighter p-6 rounded-lg border border-dark-darker hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Bachelor of Technology in Computer Science</h3>
                  <span className="text-primary font-bold">9.57/10 GPA</span>
                </div>
                <p className="text-gray-400 mb-2">K L University</p>
                <p className="text-gray-400 mb-2">Guntur, India</p>
                <p className="text-gray-400">Jun 2017 - Apr 2021</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>
            <div className="space-y-8 max-w-5xl mx-auto">
              
              {/* Akdene Technologies */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold">Software Engineer</h3>
                    <p className="text-primary">Akdene Technologies</p>
                    <p className="text-gray-400">Morrisville, NC, USA</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">
                    <p>Mar 2025 - Present</p>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Designed and developed 3 customer-centric web applications using React, Node.js, TypeScript, and Firebase</li>
                  <li>Designed and documented 3 AI-powered products collaborating with cross-functional teams</li>
                  <li>Automated client requirements documentation using n8n and OpenAI API</li>
                  <li>Leveraged Mistral 7B for rapid prototyping of AI-based restaurant applications</li>
                  <li>Implemented hybrid image retrieval pipeline using Stable Diffusion and web APIs</li>
                </ul>
              </motion.div>

              {/* UAB GTA */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold">Graduate Teaching Assistant</h3>
                    <p className="text-primary">University of Alabama at Birmingham</p>
                    <p className="text-gray-400">Birmingham, AL, USA</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">
                    <p>Aug 2024 - Dec 2024</p>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Delivered lectures on data structures and algorithms to 100+ students with 100% positive feedback</li>
                  <li>Developed 10+ questionnaires and adapted course structure using Canvas LMS</li>
                </ul>
              </motion.div>

              {/* Amazon */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold">Software Programmer Analyst</h3>
                    <p className="text-primary">Amazon</p>
                    <p className="text-gray-400">Hyderabad, India</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">
                    <p>Jun 2021 - Dec 2022</p>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Designed scalable carrier integration microservices optimizing 400M+ shipping units annually</li>
                  <li>Reduced operational delays by 20% through SQL analysis and workflow optimizations</li>
                  <li>Built web applications using Java, Spring Boot, and React for carrier system automation</li>
                  <li>Migrated 10.35% of shipment traffic to improved workflows, reducing configuration time by 50%</li>
                  <li>Orchestrated successful launch of 12 UK fulfillment centers</li>
                  <li>Led EU carrier integrations improving operational efficiency by 15%</li>
                </ul>
              </motion.div>

              {/* Empower.xyz */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold">Software Developer</h3>
                    <p className="text-primary">Empower.xyz</p>
                    <p className="text-gray-400">Bangalore, India</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">
                    <p>Sep 2020 - Jun 2021</p>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Designed housing marketplace web application using Vue.js, Node.js, MongoDB, and OpenCV</li>
                  <li>Led team of 4 through full Software Development Lifecycle</li>
                  <li>Implemented OpenCV algorithms for community block detection and mapping</li>
                  <li>Developed secure document sharing application using microservice architecture</li>
                  <li>Integrated AWS services (S3, Lambda, DynamoDB, API Gateway, CloudWatch)</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
            
            {/* Languages */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center text-primary">Programming Languages</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', '.Net', 'R', 'SQL', 'Kotlin', 'C', 'Rust', 'HTML/CSS', 'Bash'].map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="bg-dark-lighter p-4 rounded-lg text-center hover:border hover:border-primary transition-colors"
                  >
                    <h4 className="font-semibold">{skill}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center text-primary">Frameworks & Libraries</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['Spring Boot', 'React', 'Vue.js', 'Node.js', 'FastAPI', 'Flask', 'JUnit', 'Jetpack Compose', 'RESTful APIs', 'GraphQL', 'Express.js'].map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="bg-dark-lighter p-4 rounded-lg text-center hover:border hover:border-primary transition-colors"
                  >
                    <h4 className="font-semibold">{skill}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-center text-primary">Cloud & DevOps</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['AWS', 'Docker', 'Firebase', 'Git', 'GitHub', 'GitLab', 'Azure', 'Jenkins', 'CI/CD', 'Kubernetes'].map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="bg-dark-lighter p-4 rounded-lg text-center hover:border hover:border-primary transition-colors"
                  >
                    <h4 className="font-semibold">{skill}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center text-primary">Databases</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['MySQL', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'Redshift', 'Microsoft SQL Server'].map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="bg-dark-lighter p-4 rounded-lg text-center hover:border hover:border-primary transition-colors"
                  >
                    <h4 className="font-semibold">{skill}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-4">Food Order Assistant</h3>
                <p className="text-gray-300 mb-4">
                  AI application that helps customers understand menus, place orders, generate bills, and provide feedback using conversational AI.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Ollama', 'Mistral 7B', 'Python', 'Firebase', 'REST API', 'Docker', 'Kubernetes'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-lighter rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-4">Library Management System</h3>
                <p className="text-gray-300 mb-4">
                  Backend services for digital document management with REST APIs, Kubernetes clusters via AWS EKS, and S3 integration.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Java', 'Spring Boot', 'MySQL', 'REST API', 'Docker', 'Kubernetes', 'AWS S3', 'Lambda', 'SES'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-lighter rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-4">Shopping List App</h3>
                <p className="text-gray-300 mb-4">
                  Android app that manages inventory, adds items to shopping list when low, and notifies users using AWS services.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Kotlin', 'Jetpack Compose', 'REST API', 'AWS', 'DynamoDB', 'Lambda', 'API Gateway', 'SNS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-lighter rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-4">Secure File Sharing App</h3>
                <p className="text-gray-300 mb-4">
                  File sharing application with S3 storage, email notifications, and comprehensive AWS integration.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Python', 'REST API', 'AWS S3', 'DynamoDB', 'Lambda', 'CloudWatch', 'API Gateway'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-lighter rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Achievements & Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-lighter p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-primary">Academic Excellence</h3>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Pratibha Award for Academic Excellence by Government of Andhra Pradesh, India</li>
                  <li>Winner in 25+ Inter, Intra College and National coding competitions</li>
                  <li>5 Star Programmer in CodeChef (Top rating)</li>
                  <li>Achieved 448th rank in Google Kickstart programming Competition</li>
                </ul>
              </div>
              
              <div className="bg-dark-lighter p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-primary">Certifications</h3>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>CCDSAP Foundation level certification by CodeChef</li>
                  <li>Microsoft Technology Associate: Programming in Java</li>
                  <li>Algorithms Specialization by Stanford</li>
                  <li>CPA: Programming Essentials in C++ by C++ Institute CISCO</li>
                  <li>Digital Marketing Certification by GOOGLE</li>
                  <li>Automation Anywhere Certified RPA Professional</li>
                  <li>Oracle Java certification through i-learning</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
            <p className="text-gray-300 mb-8 text-center">
              I'm always open to discussing new opportunities, collaborative projects, or innovative ideas. Let's build something amazing together.
            </p>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-dark-darker rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark border border-dark-darker rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark border border-dark-darker rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark border border-dark-darker rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-4 bg-green-900/20 border border-green-500 rounded-lg"
                >
                  <p className="text-green-400">Thank you! Your message has been sent successfully.</p>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-4 bg-red-900/20 border border-red-500 rounded-lg"
                >
                  <p className="text-red-400">Sorry, there was an error sending your message. Please try again.</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark-lighter border-t border-dark-darker">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Vignan Uday Chand Chowdary Narisetty. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Visitor Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 bg-dark-lighter p-4 rounded-lg shadow-lg border border-dark-darker"
      >
        <p className="text-sm text-gray-400">Visitors</p>
        <motion.p
          key={visitorCount}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-primary"
        >
          {visitorCount}
        </motion.p>
      </motion.div>
    </div>
  )
} 