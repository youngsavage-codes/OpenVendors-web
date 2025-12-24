'use client'

import {
  Briefcase,
  Calendar,
  Card,
  DollarCircle,
  Profile2User,
  Tag,
  Notification,
  DiscountShape,
  MessageText,
} from 'iconsax-reactjs'
import React, { useEffect, useRef, useState } from 'react'

const tabs = [
  { id: 'settings', label: 'Settings' },
  { id: 'business', label: 'Business' },
  { id: 'others', label: 'Others' },
]

const settingsSections = [
  {
    id: 'billing',
    title: 'Billing',
    description: 'Manage invoices, subscriptions and charges.',
    icon: <Tag size={30} />,
  },
  {
    id: 'payments',
    title: 'Payments',
    description: 'Configure payment methods and payouts.',
    icon: <Card size={30} />,
  },
]

const businessSections = [
  {
    id: 'business-setup',
    title: 'Business Setup',
    description: 'Manage your business details and preferences.',
    icon: <Briefcase size={30} />,
  },
  {
    id: 'scheduling',
    title: 'Scheduling',
    description: 'Control appointment rules and availability.',
    icon: <Calendar size={30} />,
  },
  {
    id: 'sales',
    title: 'Sales',
    description: 'Configure pricing, discounts and upsells.',
    icon: <DollarCircle size={30} />,
  },
  {
    id: 'team',
    title: 'Team',
    description: 'Invite and manage team members.',
    icon: <Profile2User size={30} />,
  },
]

const otherSections = [
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Grow your business with campaigns and outreach.',
    icon: <MessageText size={30} />,
  },
  {
    id: 'promotions',
    title: 'Promotions',
    description: 'Create special offers and limited-time deals.',
    icon: <DiscountShape size={30} />,
  },
  {
    id: 'promos',
    title: 'Promos',
    description: 'Manage promo codes and discounts.',
    icon: <Tag size={30} />,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Control alerts, reminders and system messages.',
    icon: <Notification size={30} />,
  },
]

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('settings')

  const sectionRefs = {
    settings: useRef<HTMLDivElement>(null),
    business: useRef<HTMLDivElement>(null),
    others: useRef<HTMLDivElement>(null),
  }

  const scrollToSection = (id: keyof typeof sectionRefs) => {
    sectionRefs[id].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -40% 0px',
      }
    )

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto px-5">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold">Workspace settings</h2>
        <p className="text-gray-500 text-sm">
          Manage settings for Savage.
        </p>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white z-5 border-b border-[#E9EBEC] mb-10">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id as any)}
              className={`py-4 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-16">

        {/* Settings */}
        <section id="settings" ref={sectionRefs.settings}>
          <h3 className="text-lg font-semibold mb-4">General Settings</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {settingsSections.map((section) => (
              <div
                key={section.id}
                className="border-2 border-[#E9EBEC] rounded-lg p-6 hover:shadow-sm transition"
              >
                <div className="space-y-2">
                  {section.icon}
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-gray-500 text-sm">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business */}
        <section id="business" ref={sectionRefs.business}>
          <h3 className="text-lg font-semibold mb-4">Business Settings</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {businessSections.map((section) => (
              <div
                key={section.id}
                className="border-2 border-[#E9EBEC] rounded-lg p-6 hover:shadow-sm transition"
              >
                <div className="space-y-2">
                  {section.icon}
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-gray-500 text-sm">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Others */}
        <section id="others" ref={sectionRefs.others}>
          <h3 className="text-lg font-semibold mb-4">Growth & Engagement</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherSections.map((section) => (
              <div
                key={section.id}
                className="border-2 border-[#E9EBEC] rounded-lg p-6 hover:shadow-sm transition"
              >
                <div className="space-y-2">
                  {section.icon}
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-gray-500 text-sm">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default SettingsPage
