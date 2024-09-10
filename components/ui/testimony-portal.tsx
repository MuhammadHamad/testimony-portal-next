'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon, Facebook, Instagram, Twitter, Moon, Sun } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns'

export default function TestimonyPortal() {
  const [darkMode, setDarkMode] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()
  const [testimony, setTestimony] = useState("All Testimonies")
  const [type, setType] = useState("All Types")

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') !== 'false'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleClear = () => {
    setFromDate(undefined)
    setToDate(undefined)
  }

  const categories = [
    { name: 'All Testimonies', icon: '≡' },
    { name: 'Childbirth', icon: '👶' },
    { name: 'Finance', icon: '💰' },
    { name: 'Investment', icon: '$' },
    { name: 'Funding', icon: '💸' },
    { name: 'Immigration', icon: '🌎' },
    { name: 'Career', icon: '💼' },
    { name: 'Business', icon: '🏢' },
    { name: 'School Fees', icon: '🎓' },
    { name: 'Audio', icon: '🎤' },
    { name: 'Healing', icon: '❤️' },
    { name: 'Video', icon: '🎥' },
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white font-['Nerko_One', sans-serif]`}>
      {/* Header */}
      <header className="bg-black bg-opacity-50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harvesters-WzYzJVUJkm3e1QMp8vw2fFDFYk1L55.png"
            alt="Harvesters International Christian Centre Logo"
            width={150}
            height={40}
          />
          <nav className="hidden md:flex space-x-4">
            <Link href="#" className="hover:text-gray-300">Activities</Link>
            <Link href="#" className="hover:text-gray-300">Testimony Categories</Link>
            <Link href="#" className="hover:text-gray-300">Contact</Link>
            <Link href="#" className="hover:text-gray-300">Login</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button onClick={toggleDarkMode} variant="ghost" size="icon">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Upload Testimony</Button>
          </div>
        </div>
      </header>

      {!showSearch ? (
        <>
          {/* Hero Section */}
          <section className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center text-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-pJCSHkvjGMNjYaiw0xp6R9J0IMcELl.jpeg"
              alt="Background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4">
              <h1 className="text-5xl mb-4">Welcome to the Testimony Portal</h1>
              <p className="text-xl mb-8">Share your thoughts, experiences, and wisdom with others.</p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
                Share Your Testimony
              </Button>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-16 bg-black bg-opacity-50 dark:bg-opacity-30">
            <div className="container mx-auto">
              <h2 className="text-4xl text-center mb-12">Testimony Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-10 dark:bg-opacity-5 p-6 rounded-lg text-center hover:bg-opacity-20 dark:hover:bg-opacity-10 transition-all cursor-pointer"
                    onClick={() => {
                      setShowSearch(true)
                      setTestimony(category.name)
                    }}
                  >
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h3 className="text-xl">{category.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Testimony Search Section */
        <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white p-8">
          <div className="container mx-auto">
            <Button 
              onClick={() => setShowSearch(false)} 
              className="mb-8 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Back to Home
            </Button>
            <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl">
              <h1 className="text-4xl mb-6">Search by Categories</h1>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <Select onValueChange={setTestimony} value={testimony}>
                  <SelectTrigger className="w-[200px] bg-blue-600 text-white">
                    <SelectValue placeholder="All Testimonies" />
                  </SelectTrigger>
                  <SelectContent className="bg-orange-500 text-white">
                    {categories.map((category, index) => (
                      <SelectItem 
                        key={index} 
                        value={category.name} 
                        className="hover:bg-orange-600 focus:bg-orange-700 focus:text-white"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xl">in</span>
                <Select onValueChange={setType} value={type}>
                  <SelectTrigger className="w-[200px] bg-blue-600 text-white">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-orange-500 text-white">
                    <SelectItem value="All Types" className="hover:bg-orange-600 focus:bg-orange-700 focus:text-white">All Types</SelectItem>
                    <SelectItem value="Video" className="hover:bg-orange-600 focus:bg-orange-700 focus:text-white">Video</SelectItem>
                    <SelectItem value="Post" className="hover:bg-orange-600 focus:bg-orange-700 focus:text-white">Post</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h2 className="text-xl mb-4">Filter by Date Range:</h2>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-end">
                  <div>
                    <label htmlFor="from-date" className="block mb-2">From</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] justify-start text-left font-normal bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:text-white ${!fromDate && "text-gray-400"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                          className="bg-gray-800 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label htmlFor="to-date" className="block mb-2">To</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-[240px] justify-start text-left font-normal bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:text-white ${!toDate && "text-gray-400"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                          className="bg-gray-800 text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleClear}
                    className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:text-white"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Contact Form Section */}
      <section className="py-16 bg-black bg-opacity-30 dark:bg-opacity-10">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-12">Submit Your Testimony</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name:</label>
              <Input id="name" className="w-full bg-white bg-opacity-10 dark:bg-opacity-5" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">Category:</label>
              <Select>
                <SelectTrigger className="w-full bg-white bg-opacity-10 dark:bg-opacity-5">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.name.toLowerCase()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="testimony" className="block text-sm font-medium mb-2">Your Testimony:</label>
              <Textarea id="testimony" className="w-full bg-white bg-opacity-10 dark:bg-opacity-5" rows={6} />
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Submit</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 dark:bg-gray-900">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Locations</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-4">Testimony Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category, index) => (
                <li key={index}><Link href="#" className="hover:text-gray-300">{category.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-4">More Categories</h3>
            <ul className="space-y-2">
              {categories.slice(6).map((category, index) => (
                <li key={index}><Link href="#" className="hover:text-gray-300">{category.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300"><Facebook /></Link>
              <Link href="#" className="hover:text-gray-300"><Instagram /></Link>
              <Link href="#" className="hover:text-gray-300"><Twitter /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 ml-8 text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harvesters-WzYzJVUJkm3e1QMp8vw2fFDFYk1L55.png"
            alt="Harvesters International Christian Centre Logo"
            width={200}
            height={50}
          />
          <p className="mt-4">&copy; 2023 Harvesters International Christian Centre. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}