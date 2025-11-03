export interface Profile {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    profileImage: string;
    coverImage: string;
    heroAnimation?: {
        type: string;
        colors: string[];
        speed: string;
    };
    socials: Social[];
    stats?: Array<{ label: string; value: string }>; // ADD THIS LINE
}

export interface Social {
    name: string;
    url: string;
    icon: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    image: string;
    thumbnail: string;
    category: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    metrics?: {
        rating: number;
        views: number;
        likes: number;
    };
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedDate: string;
    readingTime: number;
    tags: string[];
    featured: boolean;
    views: number;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    yearsOfExperience: number;
    icon?: string;
}

export interface Experience {
    id: number;
    title: string;
    company: string;
    duration: string;
    startDate: string;
    endDate?: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
    image: string;
}

export interface Section {
    id: string;
    title: string;
    description?: string;
    isVisible: boolean;
    order: number;
    gridCols?: number;
}

export interface Contact {
    email: string;
    phone: string;
    address: string;
    contractRate: string;
    availability: string;
}

export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    darkMode: boolean;
}

export interface PortfolioData {
    profile: Profile;
    projects: Project[];
    blog: BlogPost[];
    skills: Skill[];
    experience: Experience[];
    testimonials: Testimonial[];
    sections: Section[];
    contact: Contact;
    theme: Theme;
    [key: string]: any; // Add this line to allow dynamic key access
}
