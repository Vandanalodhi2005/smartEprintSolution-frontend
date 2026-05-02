import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllChats, fetchChatById, sendChatMessage, markChatAsRead } from '../../../redux/actions/chatActions';
import { 
    Search, Send, User, MoreVertical, Phone, Video, 
    ChevronLeft, MessageCircle, Zap, Shield, Loader2,
    Activity, Clock, Hash
} from 'lucide-react';
import io from 'socket.io-client';

const AdminChat = () => {
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [showMobileList, setShowMobileList] = useState(true);
    const [activeChat, setActiveChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const chatList = useSelector((state) => state.chatList);
    const { loading, chats, error } = chatList;

    const chatDetails = useSelector((state) => state.chatDetails);
    const { chat: currentChat } = chatDetails;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchAllChats());

            const socketUrl = import.meta.env.VITE_SOCKET_URL || 'https://smart-eprint-solution-backend.vercel.app';
            const newSocket = io(socketUrl, {
                auth: { token: userInfo.token }
            });

            newSocket.on('new-message', (data) => {
                dispatch(fetchAllChats());
                if (activeChat && data.chatId === activeChat._id) {
                    dispatch(fetchChatById(data.chatId));
                }
            });

            setSocket(newSocket);
            return () => newSocket.close();
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        scrollToBottom();
    }, [currentChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        setShowMobileList(false);
        dispatch(fetchChatById(chat._id));

        if (chat.unreadCount > 0) {
            dispatch(markChatAsRead(chat._id));
        }

        if (socket) {
            socket.emit('join-chat', chat._id);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;

        dispatch(sendChatMessage(activeChat._id, newMessage));

        if (socket) {
            socket.emit('send-message', {
                chatId: activeChat._id,
                message: newMessage,
                sender: {
                    _id: userInfo._id,
                    name: userInfo.name,
                    isAdmin: true
                }
            });
        }

        setNewMessage('');
    };

    const filteredChats = chats?.filter(chat =>
        chat.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="p-4 sm:p-8 h-[calc(100vh-100px)] animate-in fade-in duration-700">
            <div className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/50 flex h-full overflow-hidden relative">
                
                {/* Sidebar List (The Terminal Feed) */}
                <div className={`
                    w-full lg:w-[400px] border-r-2 border-slate-50 flex flex-col bg-white z-10
                    ${showMobileList ? 'flex' : 'hidden lg:flex'}
                `}>
                    <div className="p-10 border-b-2 border-slate-50 space-y-6 bg-slate-50/30">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="font-black text-2xl text-slate-900 tracking-tighter leading-none">
                                    Messages<span className="text-blue-600">.</span>
                                </h2>
                                <p className="text-[10px] font-black text-slate-400 italic">Support Center</p>
                            </div>
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200 text-white">
                                <Zap size={20} className="fill-white" />
                            </div>
                        </div>
                        
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                            <input
                                type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search customers..."
                                className="w-full pl-12 pr-6 py-4 text-xs font-bold bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="p-20 text-center space-y-4">
                                <Loader2 className="animate-spin mx-auto text-blue-600" size={32} />
                                <p className="text-[10px] font-black text-slate-400">Loading chats...</p>
                            </div>
                        ) : filteredChats.length === 0 ? (
                            <div className="p-20 text-center">
                                <Activity className="mx-auto text-slate-100 mb-6" size={64} />
                                <p className="text-sm font-black text-slate-300">No active chats</p>
                            </div>
                        ) : (
                            filteredChats.map(chat => (
                                <button
                                    type="button" key={chat._id} onClick={() => handleChatSelect(chat)}
                                    className={`w-full text-left p-8 flex gap-5 hover:bg-slate-50 transition-all border-b-2 border-slate-50 relative group ${activeChat?._id === chat._id ? 'bg-blue-50/50' : ''}`}
                                >
                                    {activeChat?._id === chat._id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />
                                    )}
                                    <div className="relative shrink-0">
                                        <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-900 font-black text-lg group-hover:scale-105 transition-transform shadow-sm">
                                            {chat.user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-4 border-white rounded-full ${chat.status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-slate-300'}`} />
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-black text-sm text-slate-900 truncate tracking-tight">{chat.user?.name || 'Guest'}</h4>
                                            <span className="text-[10px] font-black text-slate-400 tabular-nums">
                                                {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium truncate leading-relaxed">{chat.lastMessage || 'Waiting for message...'}</p>
                                    </div>
                                    {chat.unreadCount > 0 && (
                                        <div className="absolute right-8 bottom-8 flex items-center justify-center">
                                            <span className="bg-blue-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-blue-200">
                                                {chat.unreadCount} New
                                            </span>
                                        </div>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Main Console Area */}
                <div className={`
                    flex-1 flex flex-col bg-slate-50/20
                    ${!showMobileList ? 'flex' : 'hidden lg:flex'}
                `}>
                    {activeChat && currentChat ? (
                        <>
                            {/* Console Header */}
                            <div className="h-24 bg-white border-b-2 border-slate-50 px-10 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setShowMobileList(true)}
                                        className="lg:hidden p-3 bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white rounded-2xl transition-all"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-base shadow-xl shadow-slate-200">
                                            {activeChat.user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${activeChat.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 text-base tracking-tight leading-none">{activeChat.user?.name || 'Customer Profile'}</h3>
                                        <p className="text-[10px] font-black text-blue-600 mt-2">{activeChat.user?.email || 'Guest User'}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-3">
                                     <div className="px-4 py-2 bg-slate-100 rounded-xl text-[9px] font-black text-slate-500">
                                         ID: {activeChat._id.substring(18).toUpperCase()}
                                     </div>
                                     <button className="p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                                         <MoreVertical size={20} />
                                     </button>
                                </div>
                            </div>

                            {/* Signal Feed */}
                            <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed opacity-[0.95]">
                                {currentChat.messages && currentChat.messages.length > 0 ? (
                                    currentChat.messages.map((msg, index) => {
                                        const isAdmin = msg.sender.toString() === userInfo._id;
                                        return (
                                            <div key={index} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                                <div className={`max-w-[75%] rounded-[2rem] px-8 py-5 text-sm font-bold shadow-2xl ${isAdmin
                                                    ? 'bg-slate-900 text-white rounded-tr-none shadow-slate-300/50'
                                                    : 'bg-white text-slate-800 rounded-tl-none border-2 border-slate-50 shadow-slate-100'
                                                    }`}>
                                                    <p className="leading-relaxed">{msg.message}</p>
                                                    <div className={`text-[9px] font-black mt-3 ${isAdmin ? 'text-blue-300/60' : 'text-slate-300'}`}>
                                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Message Sent
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-30 grayscale">
                                        <MessageCircle size={100} strokeWidth={1} />
                                        <p className="font-black text-[10px]">Connecting...</p>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Command Input Area */}
                            <div className="p-10 bg-white border-t-2 border-slate-50">
                                <form onSubmit={handleSend} className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                            className="w-full bg-slate-100 border-2 border-transparent focus:border-blue-500 rounded-[2rem] pl-10 pr-6 py-6 text-sm font-bold outline-none transition-all shadow-inner"
                                            placeholder="Write a message..."
                                        />
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Hash size={16} />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center group active:scale-90"
                                    >
                                        <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-10">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-10 animate-pulse" />
                                <MessageCircle size={140} strokeWidth={0.5} className="text-slate-100 relative z-10" />
                            </div>
                            <div className="space-y-4 relative z-10">
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Chat Hub<span className="text-blue-600">.</span></h3>
                                <p className="text-slate-400 font-bold text-sm max-w-sm mx-auto">
                                    Select a customer to start chatting.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminChat;
