export const cvData = {
    personalInfo: {
        name: "MEHDI HAIDI",
        title: "Engineer",
        email: "Haidimehdi13@gmail.com",
        phone: "+212621617424",
        location: "Casablanca, Morocco",
        summary: "Engineering student in Computer Science and Networks (MIAGE), passionate about cybersecurity and application development. Practical experience in network and system administration, automation, and full-stack development (.NET + React). Curious, rigorous, and result-oriented — I love transforming business needs into secure and maintainable technical solutions.",
        socials: {}
    },
    experience: [
        {
            company: "Comsys",
            role: "PFA — Contract Management",
            period: "July - September 2025",
            location: "Casablanca",
            technologies: ["ASP.NET Core", "React (Vite)", "Entity Framework", "MediatR (CQRS)", "QuestPDF", "MailKit"],
            description: [
                "Design and implementation of Clean Architecture (Domain / Application / Infrastructure / API).",
                "Implementation of a hierarchical validation workflow (HR → Manager → Admin).",
                "Integration of an electronic signature system via Canvas (base64 storage and PDF rendering).",
                "Automatic generation of PDF contracts (QuestPDF library).",
                "Configuration of email notification system (MailKit SMTP).",
                "Supervision and traceability via AuditLog Middleware."
            ]
        },
        {
            company: "Marsa Maroc",
            role: "PFA — Supervision Nagios & Installation Réseaux",
            period: "July - August 2024",
            location: "Casablanca",
            technologies: ["Cisco IOS", "Nagios", "DHCP", "VLAN", "Routing Inter-VLAN", "SNMP"],
            description: [
                "Deployment and configuration of Nagios for supervision of a complete network environment.",
                "Configuration of Cisco switches (L2/L3) and implementation of inter-VLAN routing.",
                "Implementation of a DHCP server and equipment supervision via SNMP.",
                "Drafting of operating procedures and documentation of network incidents."
            ]
        },
        {
            company: "PCARD",
            role: "PFA — Maintenance TPE & Administration Windows",
            period: "April - June 2023",
            location: "Casablanca",
            technologies: ["Windows Server", "Active Directory", "TPE", "LAN Network", "Diagnostic Tools"],
            description: [
                "Installation and maintenance of payment terminals (TPE) for points of sale.",
                "Administration of Windows servers: user management, rights, and backups.",
                "Diagnosis and resolution of hardware and software failures.",
                "Technical support for users."
            ]
        }
    ],
    education: [
        {
            institution: "École marocaine des sciences de l'ingénieur",
            degree: "5th Year Engineering Cycle",
            period: "2023 – Present",
            details: ["Full-stack Software Development", "AI & Data Science", "Cybersecurity & Networks", "Information Systems"]
        },
        {
            institution: "ISTA NTIC 2",
            degree: "Technicien Spécialisé",
            period: "2021 – 2023",
            details: ["Digital Infrastructures option system and networks"]
        },
        {
            institution: "Lycée Taha Hussein",
            degree: "Baccalauréat",
            period: "2019-2020",
            details: ["Physical Sciences"]
        }
    ],
    projects: [
        {
            title: "Billing System",
            tech: "C++",
            description: "Console application for invoice and stock management."
        },
        {
            title: "Quora Web App",
            tech: "Python/Django",
            description: "A website like the Quora platform."
        },
        {
            title: "TodoList App",
            tech: "Java/J2EE",
            description: "Complete web application with persistence and responsive interface."
        },
        {
            title: "Android Quiz App",
            tech: "Java XML (Android Studio)",
            description: "Mobile application for quizzes."
        },
        {
            title: "Virtualization Cluster",
            tech: "VMware vSphere/Proxmox",
            description: "Virtual cluster for high availability tests."
        },
        {
            title: "Attack Simulation",
            tech: "Security Tools",
            description: "Intrusion scenarios and protection solutions."
        },
        {
            title: "Web App Deployment & Pentest",
            tech: "Azure, Vercel, CI/CD, OWASP",
            description: "Deployment on Azure Static Web Apps and Vercel with CI/CD. Pentesting based on OWASP Top 10. Security best practices (HTTP headers, XSS protection, CSP)."
        }
    ],
    skills: {
        development: ["C#", ".NET Core", "React", "Python", "Django", "SQL", "C++", "Java (J2EE)", "PHP (Symfony)", "Android"],
        devops: ["Docker", "Azure DevOps", "CI/CD", "Git"],
        cybersecurity: ["OWASP", "Pentesting", "Network Security"],
        networks: ["Cisco IOS", "VLAN", "DHCP", "NAT", "ACL", "VPN", "SNMP"]
    },
    certifications: [
        "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
        "The Unix Workbench (Johns Hopkins University)",
        "Software Engineering: Software Design and Project Management (HKUST)",
        "React (Meta)",
        "Virtual Networks in Azure (Whizlabs)",
        "Solving Problems with Creative and Critical Thinking (IBM)"
    ],
    languages: ["French", "English", "Arabic"],
    interests: ["Football", "Music", "Podcasts"]
};
