'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon, MenuIcon, XIcon } from 'lucide-react'
import InteractiveBackground from '@/components/InteractiveBackground'

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // In a real application, this would be an API call to your backend
    const count = localStorage.getItem('visitorCount')
    const newCount = count ? parseInt(count) + 1 : 1
    localStorage.setItem('visitorCount', newCount.toString())
    setVisitorCount(newCount)
  }, [])

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
              Uday Chand
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Work', 'About', 'Blog', 'More'].map((item) => (
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
              {['Home', 'Work', 'About', 'Blog', 'More'].map((item) => (
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
              Coder X Dreamer
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Hello, I'm Uday Chand — a Software Developer
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
              <a
                href="mailto:nvuday.work@gmail.com"
                className="p-3 rounded-full bg-dark-lighter hover:bg-primary transition-colors"
              >
                <MailIcon className="w-6 h-6" />
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
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              I'm a passionate software engineer with expertise in web development.
              I love creating beautiful and functional applications that solve real-world problems.
              My journey in tech is driven by curiosity and a desire to build impactful solutions.
            </p>
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

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                'JavaScript',
                'React',
                'Node.js',
                'TypeScript',
                'Python',
                'AWS',
                'Next.js',
                'Tailwind CSS',
                'MongoDB',
                'PostgreSQL',
                'Express.js',
                'Git'
              ].map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="bg-dark-lighter p-6 rounded-lg text-center hover:border hover:border-primary transition-colors"
                >
                  <h3 className="text-xl font-semibold">{skill}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-20 bg-dark-lighter">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark p-6 rounded-lg border border-dark-lighter hover:border-primary transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-4">RideBuddy</h3>
                <p className="text-gray-300 mb-4">
                  A ride-sharing application built with React and Node.js, featuring real-time tracking
                  and secure payment integration.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'MongoDB', 'Express'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-lighter rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/vnariset/RideBuddy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
            <p className="text-gray-300 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a
              href="mailto:nvuday.work@gmail.com"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <MailIcon className="w-5 h-5" />
              <span>Get in Touch</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark-lighter border-t border-dark-darker">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Uday Chand. All rights reserved.
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