"use client"
import React, { useState } from 'react';
import { Home, Radio, Briefcase, User, LogIn, Sun, Moon, Monitor } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';
import Image from 'next/image';
import logo from '@/assets/logo.png';

// Mock user data
const mockUser = {
    isLoggedIn: true,
    name: "Rahul Ahmed",
    username: "@rahul_dev",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    type: "Recruiter" // Normal User, Recruiter, Instructor, Admin
};

const NavBar = () => {
    const pathname = usePathname();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, href: '/' },
        { id: 'feed', label: 'Feed', icon: Radio, href: '/feed' },
        { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/jobs' }
    ];


    const getUserTypeBadge = (type) => {
        switch (type) {
            case 'Recruiter': return 'bg-secondary/10 text-secondary border-secondary/20';
            case 'Instructor': return 'bg-success/10 text-success border-success/20';
            case 'Admin': return 'bg-danger/10 text-danger border-danger/20';
            default: return 'bg-primary/10 text-primary border-primary/20';
        }
    };


    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Left - Logo */}
                    <div className="flex items-center gap-2">
                        {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                            <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            JobPortal
                        </span> */}
                        <Image className='w-32 rounded-2xl bg-transparent dark:bg-secondary/30' src={logo} alt='logo' />
                    </div>

                    {/* Center - Navigation */}
                    <div className="hidden md:flex items-center gap-1 rounded-full bg-muted p-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-background'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right - Theme Toggle & User Profile or Login */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <ModeToggle />

                        {/* User Profile or Login */}
                        {mockUser.isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onMouseEnter={() => setShowUserMenu(true)}
                                    onMouseLeave={() => setShowUserMenu(false)}
                                    className="flex items-center gap-3 rounded-full border-2 border-transparent hover:border-primary/20 transition-all duration-200 p-1 pr-3"
                                >
                                    <img
                                        src={mockUser.image}
                                        alt={mockUser.name}
                                        className="h-9 w-9 rounded-full ring-2 ring-primary/20"
                                    />
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-medium text-foreground leading-none">
                                            {mockUser.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {mockUser.username}
                                        </p>
                                    </div>
                                </button>

                                {/* User Menu Dropdown */}
                                {showUserMenu && (
                                    <div
                                        onMouseEnter={() => setShowUserMenu(true)}
                                        onMouseLeave={() => setShowUserMenu(false)}
                                        className="absolute right-0 mt-2 w-72 rounded-xl border bg-card shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <img
                                                    src={mockUser.image}
                                                    alt={mockUser.name}
                                                    className="h-14 w-14 rounded-full ring-2 ring-primary/20"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-foreground">
                                                        {mockUser.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {mockUser.username}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-3 border-t">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-muted-foreground">Account Type</span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeBadge(mockUser.type)}`}>
                                                        {mockUser.type}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3 border-t">
                                                <button className="w-full px-4 py-2 text-sm text-left rounded-lg hover:bg-muted transition-colors">
                                                    Profile Settings
                                                </button>
                                                <button className="w-full px-4 py-2 text-sm text-left rounded-lg hover:bg-muted transition-colors">
                                                    Dashboard
                                                </button>
                                                <button className="w-full px-4 py-2 text-sm text-left rounded-lg hover:bg-danger/10 text-danger transition-colors mt-1">
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                                <LogIn className="h-4 w-4" />
                                <span>Login</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;