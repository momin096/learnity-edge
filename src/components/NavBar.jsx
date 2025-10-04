"use client"
import React, { useState } from 'react';
import { Home, Radio, Briefcase, User, LogIn, Sun, Moon, Monitor, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { useSession } from 'next-auth/react';



const NavBar = () => {
    const session = useSession();

    console.log(session?.data?.user);


    const pathname = usePathname();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, href: '/' },
        { id: 'feed', label: 'Feed', icon: Radio, href: '/feed' },
        { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/jobs' },
        { id: 'course', label: 'Course', icon: Briefcase, href: '/course' }
    ];

    let dashboardLink;
    if (session?.data?.user?.role === 'user') {
        dashboardLink = 'user-dashboard'
    } else if (session?.data?.user?.role === "recruiter") {
        dashboardLink = 'recruiter-dashboard'
    }

    const getUserTypeBadge = (role) => {
        switch (role) {
            case 'recruiter': return 'bg-secondary/10 text-secondary border-secondary/20';
            case 'instructor': return 'bg-success/10 text-success border-success/20';
            case 'admin': return 'bg-danger/10 text-danger border-danger/20';
            case 'user': return 'bg-info/10 text-info border-info/20';
            default: return 'bg-primary/10 text-primary border-primary/20';
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Left - Logo */}
                    <div className="flex items-center gap-2">
                        <Image className='w-32 rounded-2xl bg-transparent dark:bg-secondary/30' src={logo} alt='logo' />
                    </div>

                    {/* Center - Navigation (Desktop) */}
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

                    {/* Right - Theme Toggle & User Profile or Login & Mobile Menu Button */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <ModeToggle />

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {showMobileMenu ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>

                        {/* User Profile or Login (Desktop) */}
                        <div className="hidden md:block">
                            {session?.data?.user?.email ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(true)}
                                        onMouseDownCapture={() => setShowUserMenu(false)}
                                        className="flex items-center gap-3 rounded-full border-transparent hover:border-primary/20 transition-all duration-200 p-1 pr-3"
                                    >
                                        <img
                                            src={session?.data?.user?.image}
                                            alt={session?.data?.user?.name}
                                            className="h-9 w-9 rounded-full"
                                        />
                                        <div className="hidden sm:block text-left">
                                            <p className="text-sm font-medium text-foreground leading-none">
                                                {session?.data?.user?.name}
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
                                                        src={session?.data?.user?.image}
                                                        alt={session?.data?.user?.name}
                                                        className="h-14 w-14 rounded-full ring-2 ring-primary/20"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-foreground uppercase">
                                                            {session?.data?.user?.name}
                                                        </h3>

                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-muted-foreground">Account Type</span>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeBadge(session?.data?.user?.role)}`}>
                                                            {session.data.user.role}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-3 pt-3 border-t">
                                                    <button className="w-full px-4 py-2 text-sm text-left rounded-lg hover:bg-muted transition-colors">
                                                        Profile Settings
                                                    </button>
                                                    <Link href={dashboardLink}>
                                                        <button className="w-full px-4 py-2 text-sm text-left rounded-lg hover:bg-secondary/20 transition-colors">
                                                            Dashboard
                                                        </button>
                                                    </Link>
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

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="md:hidden border-t animate-in slide-in-from-top-2 duration-200">
                        <div className="py-4 space-y-1">
                            {/* Mobile Navigation Links */}
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setShowMobileMenu(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}

                            {/* Mobile User Section */}
                            <div className="pt-4 mt-4 border-t">
                                {session?.data?.user?.email ? (
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted">
                                            <img
                                                src={session?.data?.user?.image}
                                                alt={session?.data?.user?.name}
                                                className="h-10 w-10 rounded-full ring-2 ring-primary/20"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-foreground">
                                                    {session?.data?.user?.name}
                                                </p>

                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUserTypeBadge(mockUser.type)}`}>
                                                {session?.data?.user?.role}
                                            </span>
                                        </div>
                                        <button className="w-full px-4 py-3 text-sm text-left rounded-lg hover:bg-muted transition-colors">
                                            Profile Settings
                                        </button>
                                        <Link href={dashboardLink}>
                                            <button className="w-full px-4 py-3 text-sm text-left rounded-lg hover:bg-muted transition-colors">
                                                Dashboard
                                            </button>
                                        </Link>
                                        <button className="w-full px-4 py-3 text-sm text-left rounded-lg hover:bg-danger/10 text-danger transition-colors">
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                                        <LogIn className="h-4 w-4" />
                                        <span>Login</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;