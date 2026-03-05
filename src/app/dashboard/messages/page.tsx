'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { FiSend, FiPaperclip, FiPhone, FiVideo, FiMoreVertical, FiSearch, FiPlus, FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

interface ChatMessage {
  id: number
  text: string
  sender: 'user' | 'other' | 'system'
  timestamp: string
}

interface Conversation {
  id: number
  name: string
  lastMessage: string
  time: string
  unread?: number
}

export default function MessagesPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [selectedConversation, setSelectedConversation] = useState<number>(1)
  const [messageInput, setMessageInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversations: Conversation[] = [
    { id: 1, name: 'James Doe', lastMessage: 'Hello, I was wondering about...', time: 'Wednesday, 12:00 PM', unread: 2 },
    { id: 2, name: 'Farmer Kallis', lastMessage: 'Thanks for the help!', time: 'Tuesday, 3:45 PM' },
    { id: 3, name: 'Farmer Albert', lastMessage: 'See you tomorrow', time: 'Monday, 5:20 PM' },
  ]

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Do you know what time is it?", sender: 'user', timestamp: '11:57' },
    { id: 2, text: "It's morning in Tokyo ☀️", sender: 'other', timestamp: '11:57' },
    { id: 3, text: "Do you know what time is it?", sender: 'user', timestamp: '11:58' },
    { id: 4, text: "It's morning in Tokyo ☀️", sender: 'other', timestamp: '11:58' },
    { id: 5, text: "Do you know what time is it?", sender: 'user', timestamp: '11:59' },
    { id: 6, text: "It's morning in Tokyo ☀️", sender: 'other', timestamp: '11:59' },
    { id: 7, text: "Rainfall improved soil hydration across your field today - moisture levels are stable, and you won't need additional irrigation until tomorrow.", sender: 'system', timestamp: '12:00' },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!messageInput.trim()) return

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      text: messageInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, newMessage])
    setMessageInput('')
  }

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-3 sm:px-0 pb-4 sm:pb-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display mb-1 sm:mb-2">{t('messages.title')}</h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('messages.search')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all text-sm"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      selectedConversation === conversation.id ? 'bg-green-50 border-l-4 border-l-[#16a34a]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#16a34a] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                        {conversation.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.time}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread && (
                        <div className="w-5 h-5 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="hidden md:flex flex-1 flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#16a34a] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        {selectedConv.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{selectedConv.name}</h3>
                        <p className="text-xs text-gray-500">{t('messages.activeNow')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-[#16a34a] hover:bg-gray-100 rounded-lg transition-colors">
                        <FiPhone className="text-lg sm:text-xl" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[#16a34a] hover:bg-gray-100 rounded-lg transition-colors">
                        <FiVideo className="text-lg sm:text-xl" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <FiMoreVertical className="text-lg sm:text-xl" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
                    <div className="space-y-4">
                      {/* Date Separator */}
                      <div className="text-center">
                        <span className="text-xs text-gray-500 font-medium">{t('messages.today')} 11:50 PM</span>
                      </div>

                      {messages.map((message) => {
                        if (message.sender === 'system') {
                          return (
                            <div key={message.id} className="flex justify-center">
                              <div className="max-w-[85%] bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{message.text}</p>
                              </div>
                            </div>
                          )
                        }

                        return (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                          >
                            <div
                              className={`max-w-[75%] rounded-2xl p-3 sm:p-4 ${
                                message.sender === 'user'
                                  ? 'bg-gray-200 text-gray-900'
                                  : 'bg-[#16a34a] text-white'
                              }`}
                            >
                              <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === 'user' ? 'text-gray-500' : 'text-green-100'
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button className="p-2 text-gray-600 hover:text-[#16a34a] hover:bg-gray-100 rounded-lg transition-colors">
                        <FiPlus className="text-lg sm:text-xl" />
                      </button>
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('messages.messagePlaceholder')}
                        className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all text-sm sm:text-base"
                      />
                      <button className="p-2 text-gray-600 hover:text-[#16a34a] hover:bg-gray-100 rounded-lg transition-colors">
                        <FiPaperclip className="text-lg sm:text-xl" />
                      </button>
                      <button
                        onClick={handleSend}
                        disabled={!messageInput.trim()}
                        className="p-2 sm:p-3 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiSend className="text-lg sm:text-xl" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500">{t('messages.selectConversation')}</p>
                </div>
              )}
            </div>

            {/* Mobile Chat View */}
            <div className="md:hidden flex-1 flex flex-col">
              {selectedConv ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                    <button onClick={() => setSelectedConversation(0)} className="text-gray-600">
                      ← Back
                    </button>
                    <h3 className="font-semibold text-gray-900">{selectedConv.name}</h3>
                    <div className="w-8"></div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-xs text-gray-500 font-medium">{t('messages.today')} 11:50 PM</span>
                      </div>
                      {messages.map((message) => {
                        if (message.sender === 'system') {
                          return (
                            <div key={message.id} className="flex justify-center">
                              <div className="max-w-[85%] bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-gray-700">{message.text}</p>
                              </div>
                            </div>
                          )
                        }
                        return (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                          >
                            <div
                              className={`max-w-[75%] rounded-2xl p-3 ${
                                message.sender === 'user'
                                  ? 'bg-gray-200 text-gray-900'
                                  : 'bg-[#16a34a] text-white'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.text}</p>
                              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-gray-500' : 'text-green-100'}`}>
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600">
                        <FiPlus className="text-lg" />
                      </button>
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('messages.messagePlaceholder')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <button className="p-2 text-gray-600">
                        <FiPaperclip className="text-lg" />
                      </button>
                      <button
                        onClick={handleSend}
                        disabled={!messageInput.trim()}
                        className="p-2 bg-[#16a34a] text-white rounded-lg disabled:opacity-50"
                      >
                        <FiSend className="text-lg" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-4">
                  <p className="text-gray-500 text-center">Select a conversation to start chatting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
