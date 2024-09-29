import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import Heading from '../ui/Heading'
import { container } from '@/lib/style'

const contactInfo = [
  {
    type: 'address',
    icon: MapPin,
    title: 'Visit Us',
    content: '123 Business Street, Bayzid, Chattogram, Bangladesh',
    action: {
      text: 'View on Map',
      url: 'https://maps.google.com',
      icon: ExternalLink
    }
  },
  {
    type: 'phone',
    icon: Phone,
    title: 'Call Us',
    content: '+88 01303164505',
    subContent: 'Monday to Friday, 9am - 5pm BDT',
    action: {
      text: 'Dial Now',
      url: 'tel:+15551234567',
      icon: Phone
    }
  },
  {
    type: 'email',
    icon: Mail,
    title: 'Email Us',
    content: 'gkraihan14k@gmail.com',
    subContent: "We'll respond as soon as possible",
    action: {
      text: 'Send an Email',
      url: 'mailto:info@sportspot.com',
      icon: Mail
    }
  }
]

export default function UniqueContactInformation() {
  const [activeTab, setActiveTab] = useState('address')

  return (
    <section className="">
      <div className={container}>
        <Heading text="Get in Touch" />
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-orange-200">
            {contactInfo.map((info) => (
              <button
                key={info.type}
                className={`flex-1 py-2 px-4 text-center font-semibold transition-colors duration-300 ${
                  activeTab === info.type ? 'bg-primary1 text-white' : 'text-primary1 hover:bg-primary1/10'
                }`}
                onClick={() => setActiveTab(info.type)}
              >
                <info.icon className="w-6 h-6 mx-auto" />
                {info.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {contactInfo.map((info) => (
                  info.type === activeTab && (
                    <div key={info.type}>
                      <h3 className="text-2xl font-bold text-orange-800 mb-4">{info.title}</h3>
                      <p className="text-xl text-gray-700 mb-2">{info.content}</p>
                      {info.subContent && (
                        <p className="text-sm text-gray-500 mb-6">{info.subContent}</p>
                      )}
                      <a
                        href={info.action.url}
                        target={info.type === 'address' ? "_blank" : "_self"}
                        rel={info.type === 'address' ? "noopener noreferrer" : ""}
                        className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition-colors duration-300"
                      >
                        {info.action.text}
                        <info.action.icon className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}