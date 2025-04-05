import React from "react";
import { reactSnippet } from "../../codesnippets/reactSnippet.ts";
import { themeCodeSnippet } from "../../codesnippets/mui.ts";
import { typescriptCodeSnippet } from "../../codesnippets/typescript.ts";
import RechartsDemo from "../../demos/RechartsMouseEventDataViz.tsx";
import ChatComponent from "../../demos/Chat.tsx"; // <-- Import the ChatComponent for demo

export interface SkillCardProps {
    id: string;
    title: string;
    logoSrc: string;
    description: string;
    bulletPoints: string[];
    path: string;
    themeCodeSnippet?: string;
    demo?: any
    advancedComponents?: {
        name: string;
        desc: string;
        tags: string[]; // <-- ADDED TAGS PROPERTY
    }[];
    experience?: {
        company: string;
        years: string;
        focus: string;
    }[];
    implementation?: string;
}

export interface SkillsData {
    [key: string]: SkillCardProps;
}

export const skillsData: SkillsData = {
    // ========================
    // CORE FRONTEND TECHNOLOGIES
    // ========================

    // React
    react: {
        id: "react",
        title: "React",
        logoSrc: "/react-logo.png",
        description:
            "JavaScript library for building user interfaces with reusable components and efficient state management.",
        bulletPoints: [
            "Component-based architecture",
            "Virtual DOM for performance",
            "Hooks and context API",
            "React Router for navigation",
            "State management solutions",
            "Micro-frontend architecture",
        ],
        path: "/skills/react",
        advancedComponents: [
            {
                name: "Custom Hooks",
                desc: "Encapsulate and reuse stateful logic across multiple components",
                tags: ["hooks", "reuse", "state"],
            },
            {
                name: "Error Boundaries",
                desc: "Gracefully handle rendering errors to prevent application crashes",
                tags: ["error", "boundary", "safety"],
            },
            {
                name: "Portals",
                desc: "Render children into a DOM node outside of the parent component hierarchy",
                tags: ["portal", "DOM", "UI"],
            },
            {
                name: "Suspense and Lazy Loading",
                desc: "Optimize bundle size and improve performance for code-splitting",
                tags: ["suspense", "lazy", "performance"],
            },
            {
                name: "Context Providers",
                desc: "Share global data (e.g., themes or user info) without prop drilling",
                tags: ["context", "global", "state"],
            },
            {
                name: "Server Components (Experimental)",
                desc: "Render React components on the server for better performance",
                tags: ["server", "experimental", "render"],
            },
            {
                name: "Concurrent Features (Experimental)",
                desc: "Improve UI responsiveness by rendering updates concurrently",
                tags: ["concurrent", "experimental", "responsive"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus:
                    "Legal document management interfaces and insurance claims mediation applications",
            },
            {
                company: "CSAA Insurance Group",
                years: "4+ years",
                focus:
                    "Multi-product insurance quoting platforms and customer portals",
            },
            {
                company: "American Express",
                years: "2+ years",
                focus:
                    "Financial dashboards and reporting interfaces using micro-frontend architecture",
            },
            {
                company: "Sierra Telecom",
                years: "1+ year",
                focus:
                    "IoT monitoring dashboards with real-time data visualization",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus:
                    "Custom React applications for various clients, including e-commerce and portfolio sites",
            }
        ],
        implementation: `This portfolio showcases my React expertise through modular component design and optimization techniques like code splitting and lazy loading. I've implemented custom hooks for shared logic and created efficient component structures. The project demonstrates my ability to architect scalable React applications with clean, maintainable code.`,
        themeCodeSnippet: reactSnippet,
    },

    // TypeScript
    typescript: {
        id: "typescript",
        title: "TypeScript",
        logoSrc: "/typescript-logo.svg",
        description:
            "Strongly typed programming language that builds on JavaScript, enhancing code quality and developer productivity.",
        bulletPoints: [
            "Static type checking",
            "Interface-based design",
            "Advanced type systems",
            "Generics and utility types",
            "Enhanced IDE integration",
            "Type-safe API integration",
        ],
        path: "/skills/typescript",
        advancedComponents: [
            {
                name: "Complex Type Systems",
                desc: "Creation of advanced type hierarchies for robust application architecture",
                tags: ["types", "complex", "architecture"],
            },
            {
                name: "Generic Components",
                desc: "Reusable components with type parameters for maximum flexibility",
                tags: ["generic", "flexibility", "components"],
            },
            {
                name: "Type Guards",
                desc: "Runtime type checking with custom type predicates",
                tags: ["guards", "runtime", "safety"],
            },
            {
                name: "Mapped Types",
                desc: "Dynamic type creation based on existing type definitions",
                tags: ["mapped", "dynamic", "types"],
            },
            {
                name: "Declaration Files",
                desc: "Custom type definitions for third-party libraries",
                tags: ["declaration", "third-party", "types"],
            },
            {
                name: "Strict Null Checking",
                desc: "Enhanced error prevention through null and undefined handling",
                tags: ["null", "strict", "error-prevention"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus:
                    "Type-safe architecture for legal document management systems",
            },
            {
                company: "CSAA Insurance Group",
                years: "4+ years",
                focus:
                    "Implementing strict typing in insurance quoting platforms",
            },
            {
                company: "American Express",
                years: "1+ year",
                focus:
                    "Financial application development with advanced TypeScript patterns",
            },
        ],
        implementation: `This portfolio leverages TypeScript throughout, showcasing type-safe component design, strict null checking, and interface-based architecture. The implementation demonstrates advanced typing patterns such as discriminated unions, generics, and utility types to ensure code reliability and maintainability.`,
        themeCodeSnippet: typescriptCodeSnippet,
    },

    // Data Visualization
    datavis: {
        id: "datavis",
        title: "Data Visualization",
        logoSrc: "/highcharts-logo.png",
        description:
            "Tools and libraries for creating interactive, insightful visual representations of complex data.",
        bulletPoints: [
            "D3.js visualization library",
            "Highcharts integration",
            "Interactive dashboards",
            "Real-time data updates",
            "Responsive chart design",
            "Custom visualization types",
        ],
        path: "/skills/datavis",
        advancedComponents: [
            {
                name: "D3.js Visualizations",
                desc: "Custom, interactive data visualizations using D3.js",
                tags: ["d3", "visualization", "interactive"],
            },
            {
                name: "Highcharts Integration",
                desc: "Enterprise-grade charts with accessibility support",
                tags: ["highcharts", "charts", "enterprise"],
            },
            {
                name: "Dashboard Systems",
                desc: "Multi-chart dashboards with synchronized filtering",
                tags: ["dashboard", "multi-chart", "filtering"],
            },
            {
                name: "Real-Time Updates",
                desc: "WebSocket integration for live data visualization",
                tags: ["realtime", "websocket", "updates"],
            },
            {
                name: "Responsive Charts",
                desc: "Visualizations that adapt to different screen sizes",
                tags: ["responsive", "charts", "adaptive"],
            },
            {
                name: "Geospatial Visualization",
                desc: "Map-based data representation with custom overlays",
                tags: ["geospatial", "map", "overlays"],
            },
        ],
        demo: () => <RechartsDemo />,
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus: "Interactive dashboards for legal document management and insurance claims mediation applications",
            },
            {
                company: "CSAA Insurance Group",
                years: "4+ years",
                focus: "Data visualization for multi-product insurance quoting platforms, including charts and graphs for performance metrics",
            },
            {
                company: "American Express",
                years: "2+ years",
                focus: "Financial dashboards with real-time data visualization, including performance metrics and transaction trends",
            },
            {
                company: "Sierra Telecom",
                years: "1+ year",
                focus: "IoT monitoring dashboards with real-time data updates and geospatial visualization for device locations",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus: "Custom data visualization solutions for various clients, including e-commerce sales dashboards and portfolio performance charts",
            }
        ],
        implementation: `Data visualization components in this portfolio demonstrate interactive charts and dashboards using D3.js and Highcharts. The implementation features responsive design, WebSocket integration for real-time updates, and custom visualization types for complex data representation.`,
    },

    // ========================
    // STATE MANAGEMENT & DATA HANDLING
    // ========================

    // Redux
    redux: {
        id: "redux",
        title: "Redux & RTK Query",
        logoSrc: "/redux-logo.png",
        description:
            "Predictable state container for JavaScript apps with powerful data fetching and caching capabilities.",
        bulletPoints: [
            "Centralized state management",
            "Predictable state updates",
            "Middleware for side effects",
            "DevTools for debugging",
            "RTK Query for API handling",
            "Automated cache management",
        ],
        path: "/skills/redux",
        advancedComponents: [
            {
                name: "Redux Toolkit",
                desc: "Simplified Redux implementation with reduced boilerplate",
                tags: ["redux", "toolkit", "boilerplate"],
            },
            {
                name: "RTK Query",
                desc: "Auto-generated API hooks with caching and synchronization",
                tags: ["rtk", "query", "api"],
            },
            {
                name: "Normalized State",
                desc: "Efficient data normalization for complex state management",
                tags: ["normalized", "state", "efficiency"],
            },
            {
                name: "Redux Middleware",
                desc: "Custom middleware for logging, analytics, and side effects",
                tags: ["middleware", "logging", "analytics"],
            },
            {
                name: "Entity Adapters",
                desc: "Simplified CRUD operations for collections of entities",
                tags: ["entities", "CRUD", "adapter"],
            },
            {
                name: "Selectors & Memoization",
                desc: "Performance optimization through memorized selectors",
                tags: ["selectors", "memoization", "performance"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus: "RTK Query for managing API calls and state in legal document management systems, including caching and synchronization of document data",
            },
            {
                company: "CSAA Insurance Group",
                years: "4+ years",
                focus: "Redux Toolkit for state management in multi-product insurance quoting platforms, including complex state normalization and middleware for side effects",
            },
            {
                company: "American Express",
                years: "2+ years",
                focus: "Redux state management for financial dashboards."
            },
            {
                company: "Sierra Telecom",
                years: "1+ year",
                focus: "Real-time state management for IoT dashboards",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus: "Custom state management solutions for various clients",
            }
        ],
        implementation: `This portfolio demonstrates advanced Redux patterns using Redux Toolkit and RTK Query. The implementation features normalized state structures, optimized selectors with reselect, and custom middleware for authentication and logging. The RTK Query integration showcases automatic data fetching, caching, and synchronization for optimal performance.`,
    },

    // PostgreSQL
    postgresql: {
        id: "postgresql",
        title: "PostgreSQL",
        logoSrc: "/postgres-logo.png",
        description:
            "Powerful, open-source object-relational database system with a strong reputation for reliability and data integrity.",
        bulletPoints: [
            "Advanced query optimization",
            "JSON/JSONB data types",
            "Stored procedures & functions",
            "Transaction management",
            "Indexing strategies",
            "Security & auditing",
        ],
        path: "/skills/postgresql",
        advancedComponents: [
            {
                name: "Query Optimization",
                desc: "Performance tuning and execution plan analysis",
                tags: ["query", "optimization", "performance"],
            },
            {
                name: "JSON Operations",
                desc: "Working with semi-structured data using JSON/JSONB types",
                tags: ["json", "semi-structured", "operations"],
            },
            {
                name: "Indexing Strategies",
                desc: "Advanced indexing for optimal query performance",
                tags: ["index", "strategy", "performance"],
            },
            {
                name: "Stored Procedures",
                desc: "Server-side logic with PL/pgSQL",
                tags: ["stored", "procedures", "plpgsql"],
            },
            {
                name: "Security Implementation",
                desc: "Role-based access control and row-level security",
                tags: ["security", "roles", "access"],
            },
            {
                name: "Data Migration",
                desc: "Schema evolution and data migration strategies",
                tags: ["migration", "schema", "evolution"],
            },
        ],
        experience: [
            {
                company: "American Express",
                years: "2+ years",
                focus:
                    "Financial database solutions with security and audit requirements",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus: "Optimized database design for web applications",
            },
        ],
        implementation: `Database architecture in this portfolio utilizes PostgreSQL with optimized schema design, indexing strategies, and query performance. The implementation includes transaction management, data validation, and security controls to ensure data integrity and compliance with regulatory requirements.`,
    },

    // ========================
    // BACKEND & SERVER TECHNOLOGIES
    // ========================

    // Node.js
    nodejs: {
        id: "nodejs",
        title: "Node.js",
        logoSrc: "/node-logo.png",
        description:
            "JavaScript runtime built on Chrome's V8 engine for building scalable network applications and APIs.",
        bulletPoints: [
            "Event-driven, non-blocking I/O",
            "RESTful API development",
            "Express.js framework",
            "Microservices architecture",
            "Authentication & authorization",
            "Real-time applications",
        ],
        path: "/skills/nodejs",
        advancedComponents: [
            {
                name: "Express.js",
                desc: "Web framework for building RESTful APIs and web applications",
                tags: ["express", "framework", "api"],
            },
            {
                name: "Authentication",
                desc: "JWT, OAuth 2.0, and role-based access control implementation",
                tags: ["auth", "jwt", "oauth"],
            },
            {
                name: "Database Integration",
                desc: "PostgreSQL connections with ORM and query optimization",
                tags: ["database", "integration", "ORM"],
            },
            {
                name: "WebSockets",
                desc: "Real-time bidirectional event-based communication",
                tags: ["websockets", "real-time", "communication"],
            },
            {
                name: "Middleware Architecture",
                desc: "Custom middleware for logging, error handling, and authentication",
                tags: ["middleware", "architecture", "custom"],
            },
            {
                name: "API Documentation",
                desc: "Automated API documentation generation with OpenAPI/Swagger",
                tags: ["API", "documentation", "swagger"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus: "Backend services for legal document management",
            },
            {
                company: "American Express",
                years: "2+ years",
                focus: "Financial services APIs with security compliance",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus: "Full-stack applications with Node.js backends",
            },
        ],
        implementation: `Backend services in this portfolio are built with Node.js and Express, implementing RESTful API patterns with comprehensive error handling and validation. The architecture demonstrates microservice design principles, JWT authentication, and database integration using PostgreSQL with optimized query performance.`,
    },

    // Deno
    deno: {
        id: "deno",
        title: "Deno",
        logoSrc: "/deno-logo.png",
        description:
            "Secure runtime for JavaScript and TypeScript built on V8, with built-in TypeScript support and security by default.",
        bulletPoints: [
            "Secure by default architecture",
            "Built-in TypeScript support",
            "Modern ES module system",
            "Standard library",
            "Single executable deployment",
            "Web standard compatibility",
        ],
        path: "/skills/deno",
        advancedComponents: [
            {
                name: "Permissions System",
                desc: "Explicit permission granting for file, network, and environment access",
                tags: ["permissions", "security", "access"],
            },
            {
                name: "Oak Framework",
                desc: "Middleware framework for building web applications and APIs",
                tags: ["oak", "framework", "middleware"],
            },
            {
                name: "Deno Deploy",
                desc: "Edge runtime deployment for global distribution",
                tags: ["deploy", "edge", "distribution"],
            },
            {
                name: "Fresh Framework",
                desc: "Next-gen web framework with zero runtime overhead",
                tags: ["fresh", "modern", "framework"],
            },
            {
                name: "Testing Tools",
                desc: "Built-in testing capabilities with assertions and benchmarking",
                tags: ["testing", "benchmark", "assertions"],
            },
            {
                name: "WebSocket Server",
                desc: "Real-time communication with built-in WebSocket support",
                tags: ["websocket", "server", "realtime"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "1+ year",
                focus: "Modern API development with enhanced security features",
            },
            {
                company: "Freelance",
                years: "1+ year",
                focus: "Building secure microservices with TypeScript and Deno",
            },
        ],
        implementation: `This portfolio demonstrates Deno's capabilities through a real-time chat application that leverages Deno's native WebSocket support and Oak framework. The implementation showcases Deno's security-first approach with explicit permissions, TypeScript integration, and modern JavaScript features. The chat server handles real-time message broadcasting, connection management, and user presence tracking while maintaining clean separation of concerns and error handling.`,
        demo: () => <ChatComponent />
    },

    // ========================
    // INFRASTRUCTURE & CLOUD
    // ========================

    // AWS
    aws: {
        id: "aws",
        title: "AWS",
        logoSrc: "/aws-logo.png",
        description:
            "Comprehensive cloud platform with services for compute, storage, databases, and serverless architecture.",
        bulletPoints: [
            "Lambda serverless functions",
            "EC2 virtual servers",
            "S3 object storage",
            "IAM security management",
            "CloudFormation & Terraform",
            "CI/CD integration",
        ],
        path: "/skills/aws",
        advancedComponents: [
            {
                name: "Lambda & Serverless",
                desc: "Event-driven, scalable computing without server management",
                tags: ["lambda", "serverless", "event-driven"],
            },
            {
                name: "EC2 & Containers",
                desc: "Scalable virtual servers with container orchestration",
                tags: ["ec2", "containers", "scalable"],
            },
            {
                name: "S3 & Storage Solutions",
                desc: "Object storage with lifecycle policies and security controls",
                tags: ["s3", "storage", "object"],
            },
            {
                name: "Infrastructure as Code",
                desc: "Terraform and CloudFormation for infrastructure provisioning",
                tags: ["iac", "terraform", "cloudformation"],
            },
            {
                name: "Security & Compliance",
                desc: "IAM roles, policies, and security best practices",
                tags: ["security", "compliance", "iam"],
            },
            {
                name: "CI/CD Pipeline Integration",
                desc: "Continuous integration and deployment workflows",
                tags: ["cicd", "automation", "integration"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus:
                    "Cloud infrastructure for legal data handling with security focus",
            },
            {
                company: "CSAA Insurance Group",
                years: "4+ years",
                focus:
                    "AWS services for protecting confidential customer information",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus:
                    "Serverless architecture for scalable, cost-effective solutions",
            },
        ],
        implementation: `This portfolio's infrastructure utilizes AWS services including Lambda for serverless functions, S3 for static assets, and CloudFront for content delivery. The implementation features Terraform for infrastructure as code, ensuring reproducible deployments with security best practices and IAM role-based access control.`,
    },

    // ========================
    // QUALITY & SECURITY
    // ========================

    // Testing
    testing: {
        id: "testing",
        title: "Testing",
        logoSrc: "/testing-logo.svg",
        description:
            "Comprehensive testing methodologies and tools for ensuring application quality, reliability, and documentation.",
        bulletPoints: [
            "Test-Driven Development",
            "End-to-end testing (Playwright, Cypress)",
            "Unit and integration testing (Jest)",
            "Component documentation (Storybook)",
            "Automated test pipelines",
            "Visual regression testing",
        ],
        path: "/skills/testing",
        advancedComponents: [
            {
                name: "Playwright & Cypress E2E Testing",
                desc: "End-to-end testing across browsers with visual comparison and recording",
                tags: ["playwright", "cypress", "e2e"],
            },
            {
                name: "Jest Unit & Integration Testing",
                desc: "JavaScript testing framework with mocking and code coverage",
                tags: ["jest", "unit", "integration"],
            },
            {
                name: "Storybook Component Library",
                desc: "Interactive component documentation and visual testing environment",
                tags: ["storybook", "documentation", "UI"],
            },
            {
                name: "TDD Methodology",
                desc: "Test-driven development approach for reliable code",
                tags: ["tdd", "test-driven", "development"],
            },
            {
                name: "CI/CD Test Integration",
                desc: "Automated testing within continuous integration pipelines",
                tags: ["cicd", "tests", "automation"],
            },
            {
                name: "Mock Services & Fixtures",
                desc: "Service mocking, fixtures, and dependency isolation",
                tags: ["mocks", "fixtures", "isolation"],
            },
            {
                name: "Test Coverage Analysis",
                desc: "Comprehensive test coverage reporting and gap analysis",
                tags: ["coverage", "analysis", "reports"],
            },
            {
                name: "Visual Regression Testing",
                desc: "Automated detection of visual UI changes with snapshots",
                tags: ["visual", "regression", "snapshots"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus:
                    "Implementing end-to-end testing with Playwright and component documentation with Storybook",
            },
            {
                company: "CSAA Insurance Group",
                years: "4+ years",
                focus:
                    "Comprehensive testing including Jest unit tests and Cypress E2E tests for insurance applications",
            },
            {
                company: "American Express",
                years: "2+ years",
                focus:
                    "Testing suites with Jest and Storybook for financial services compliance and documentation",
            },
        ],
        implementation: `This portfolio incorporates a comprehensive testing strategy across multiple levels: Jest for unit and integration tests, Playwright and Cypress for end-to-end tests, and Storybook for component documentation and visual testing. The implementation demonstrates test-driven development practices, snapshot testing for UI components, mocking strategies for API dependencies, and automated test pipelines integrated with CI/CD workflows to ensure code quality, consistent behavior, and visual integrity across the application.`,
    },

    // Security
    security: {
        id: "security",
        title: "Security",
        logoSrc: "/security-logo.png",
        description:
            "Implementation of robust security measures for protecting applications and data from threats.",
        bulletPoints: [
            "OAuth 2.0 authentication",
            "JWT token management",
            "Role-based access control",
            "Data encryption",
            "Security best practices",
            "Compliance implementation",
        ],
        path: "/skills/security",
        advancedComponents: [
            {
                name: "OAuth 2.0 & OpenID Connect",
                desc: "Advanced authentication flows with identity providers",
                tags: ["oauth", "openid", "auth"],
            },
            {
                name: "JWT Implementation",
                desc: "Secure token-based authentication with best practices",
                tags: ["jwt", "token", "security"],
            },
            {
                name: "Role-Based Access Control",
                desc: "Fine-grained permission systems for application security",
                tags: ["rbac", "roles", "access"],
            },
            {
                name: "API Security",
                desc: "Securing REST APIs against common vulnerabilities",
                tags: ["api", "security", "vulnerabilities"],
            },
            {
                name: "Data Protection",
                desc: "Encryption and secure data handling practices",
                tags: ["data", "encryption", "protection"],
            },
            {
                name: "Compliance Framework",
                desc: "Implementation of security controls for regulatory compliance",
                tags: ["compliance", "framework", "regulation"],
            },
        ],
        experience: [
            {
                company: "CSAA Insurance Group",
                years: "4+ years",
                focus: "Security protocols for confidential customer information",
            },
            {
                company: "American Express",
                years: "2+ years",
                focus: "Financial security standards and compliance",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus: "JWT authentication and role-based access control",
            },
        ],
        implementation: `Security implementation in this portfolio demonstrates OAuth 2.0 authentication flows, JWT token management with proper expiration and rotation, and role-based access control for protected resources. The approach includes secure data handling practices, input validation, and protection against common web vulnerabilities.`,
    },

    // ========================
    // UI FRAMEWORKS & DESIGN
    // ========================

    // MUI
    mui: {
        id: "mui",
        title: "Material UI",
        logoSrc: "/mui-logo.png",
        description:
            "Comprehensive library of React components implementing Google's Material Design with advanced customization.",
        bulletPoints: [
            "Responsive component library",
            "Theming & customization",
            "Accessible UI components",
            "Advanced grid system",
            "Form components & validation",
            "Data visualization",
        ],
        path: "/skills/mui",
        advancedComponents: [
            {
                name: "Data Grid",
                desc: "Complex data tables with sorting, filtering, and virtualization.",
                tags: ["datagrid", "tables", "sorting"],
            },
            {
                name: "Date/Time Pickers",
                desc: "Robust components for date and time selection with localization support.",
                tags: ["date", "time", "pickers"],
            },
            {
                name: "Dialog System",
                desc: "Modal dialogs for confirmations, forms, and multi-step interactions.",
                tags: ["dialog", "modal", "interaction"],
            },
            {
                name: "Theme Provider",
                desc: "Customizable theming solution for dynamic light/dark mode and branding.",
                tags: ["theme", "provider", "customization"],
            },
            {
                name: "Custom Styled Components",
                desc: "Extending and overriding default MUI styles for unique interfaces.",
                tags: ["styled", "custom", "components"],
            },
            {
                name: "Material Charts",
                desc: "Data visualization components using recharts integration.",
                tags: ["charts", "material", "data"],
            },
            {
                name: "Form Components",
                desc: "Advanced form controls with validation and state management.",
                tags: ["forms", "validation", "state"],
            },
        ],
        implementation: `This portfolio features a custom Material UI theme with dynamic light/dark mode toggling via the ThemeToggleSwitch component. The implementation demonstrates advanced component customization through styled components, theme extensions, and responsive design patterns integrated with Redux for state persistence.`,
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus:
                    "Legal document management interfaces with custom MUI themes",
            },
            {
                company: "CSAA Insurance Group",
                years: "4+ years",
                focus:
                    "Building responsive insurance applications with MUI components",
            },
            {
                company: "American Express",
                years: "2+ years",
                focus:
                    "Financial dashboards with customized Material UI components",
            },
        ],
        themeCodeSnippet,
    },

    // Tailwind CSS
    tailwind: {
        id: "tailwind",
        title: "Tailwind CSS",
        logoSrc: "/tailwind-logo.png",
        description:
            "Utility-first CSS framework for rapidly building custom user interfaces with minimal CSS.",
        bulletPoints: [
            "Utility-first approach",
            "Responsive design system",
            "Theme customization",
            "Dark mode support",
            "JIT compilation",
            "Component extraction",
        ],
        path: "/skills/tailwind",
        advancedComponents: [
            {
                name: "Custom Design System",
                desc: "Extending Tailwind's configuration for branded design systems",
                tags: ["design", "system", "tailwind"],
            },
            {
                name: "Responsive Patterns",
                desc: "Complex responsive layouts using Tailwind's breakpoint system",
                tags: ["responsive", "patterns", "layout"],
            },
            {
                name: "Dark Mode",
                desc: "Implementation of theme-aware components with dark mode support",
                tags: ["dark", "mode", "theme"],
            },
            {
                name: "Animation",
                desc: "Custom animations and transitions using Tailwind's utilities",
                tags: ["animation", "transitions", "tailwind"],
            },
            {
                name: "Form Styling",
                desc: "Consistent form element styling across browsers",
                tags: ["forms", "styling", "consistency"],
            },
            {
                name: "Component Libraries",
                desc: "Integration with component libraries like Headless UI",
                tags: ["components", "libraries", "integration"],
            },
        ],
        experience: [
            {
                company: "CSAA Insurance Group",
                years: "2+ years",
                focus: "Implementing Tailwind in insurance product interfaces",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus: "Rapid UI development with utility-first approach",
            },
        ],
        implementation: `This portfolio showcases Tailwind CSS implementation with custom design token integration, responsive layouts, and theme-aware components. The approach demonstrates component composition using utility classes while maintaining design consistency and accessibility.`,
    },

    // Python
    python: {
        id: "python",
        title: "Python",
        logoSrc: "/python-logo.png",
        description:
            "Versatile, high-level programming language known for its readability, simplicity, and extensive ecosystem.",
        bulletPoints: [
            "Data analysis & processing",
            "Backend API development",
            "Automation & scripting",
            "Machine learning integration",
            "Data visualization",
            "Cross-platform compatibility",
        ],
        path: "/skills/python",
        advancedComponents: [
            {
                name: "FastAPI Framework",
                desc: "High-performance, easy-to-use framework for building APIs",
                tags: ["fastapi", "api", "framework"],
            },
            {
                name: "Data Processing",
                desc: "Pandas and NumPy for efficient data manipulation",
                tags: ["pandas", "numpy", "processing"],
            },
            {
                name: "Automation Scripts",
                desc: "Task automation for development and deployment workflows",
                tags: ["automation", "scripts", "scripting"],
            },
            {
                name: "API Integration",
                desc: "Connecting with third-party services and data sources",
                tags: ["api", "integration", "connectivity"],
            },
            {
                name: "Testing Frameworks",
                desc: "PyTest and unittest for comprehensive test coverage",
                tags: ["pytest", "testing", "unittest"],
            },
            {
                name: "Data Visualization",
                desc: "Matplotlib and Seaborn for insightful data representations",
                tags: ["matplotlib", "seaborn", "visualization"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "1+ year",
                focus:
                    "Data processing and automation for legal document analysis",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus: "Backend services and data processing scripts",
            },
        ],
        implementation: `Python components in this portfolio demonstrate data processing capabilities, API integration, and automation scripts. The implementation highlights Python's versatility for backend services, data manipulation, and system integration tasks with clean, maintainable code.`,
    },

    // PDF Manipulation
    pdf: {
        id: "pdf",
        title: "PDF Manipulation",
        logoSrc: "/pdf-logo.svg",
        description:
            "Specialized expertise in PDF document processing, modification, and data extraction for document management systems, with extensive PSPDFKit implementation experience.",
        bulletPoints: [
            "PSPDFKit integration",
            "Bounding box data extraction",
            "Dynamic PDF editing",
            "Form field manipulation",
            "Document generation",
            "AI processing integration",
        ],
        path: "/skills/pdf",
        advancedComponents: [
            {
                name: "PSPDFKit Implementation",
                desc: "Enterprise-grade PDF viewing, editing, and annotation capabilities",
                tags: ["pspdfkit", "pdf", "annotation"],
            },
            {
                name: "Data Extraction",
                desc: "Bounding box identification and content extraction for AI processing",
                tags: ["extraction", "bounding-box", "ai"],
            },
            {
                name: "Form Field Operations",
                desc: "Dynamic form creation, field population, and validation",
                tags: ["forms", "fields", "operations"],
            },
            {
                name: "Document Generation",
                desc: "Programmatic PDF creation from various data sources and templates",
                tags: ["generation", "pdf", "templates"],
            },
            {
                name: "AI Integration",
                desc: "Machine learning for intelligent document processing and analysis",
                tags: ["ai", "integration", "ml"],
            },
            {
                name: "Digital Signatures",
                desc: "Secure document signing, verification, and certification",
                tags: ["digital", "signature", "security"],
            },
            {
                name: "Document Collaboration",
                desc: "Real-time collaborative editing and annotation of PDF documents",
                tags: ["collaboration", "editing", "realtime"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus:
                    "PDF editing solutions with PSPDFKit, bounding box data extraction for AI-powered legal documentation",
            },
            {
                company: "CSAA Insurance Group",
                years: "1+ year",
                focus:
                    "Insurance document management with PSPDFKit integration for policy review",
            },
        ],
        implementation: `PDF manipulation components in this portfolio showcase my extensive experience with PSPDFKit for comprehensive document handling. I've implemented advanced PSPDFKit features including document viewing, editing, annotation, and collaboration in web applications. The implementation also demonstrates custom integrations for dynamic content extraction, form field manipulation, and seamless integration with AI services for intelligent document processing. My work includes secure document handling with proper validation and error management for legal and insurance document workflows, significantly improving documentation accuracy and processing efficiency.`,
    },

    // WebSockets
    websockets: {
        id: "websockets",
        title: "WebSockets",
        logoSrc: "/websockets-logo.svg",
        description:
            "Protocol providing full-duplex communication channels over a single TCP connection for real-time data transfer.",
        bulletPoints: [
            "Real-time bidirectional communication",
            "Push notifications",
            "Live data streaming",
            "Chat functionality",
            "Collaborative editing",
            "Interactive dashboards",
        ],
        path: "/skills/websockets",
        advancedComponents: [
            {
                name: "Socket.io Implementation",
                desc: "Cross-browser WebSocket implementation with fallbacks",
                tags: ["socket.io", "websocket", "fallbacks"],
            },
            {
                name: "Secure Connections",
                desc: "Encrypted WebSocket connections with authentication",
                tags: ["secure", "encryption", "auth"],
            },
            {
                name: "Event Broadcasting",
                desc: "Real-time event distribution to multiple clients",
                tags: ["broadcast", "events", "realtime"],
            },
            {
                name: "Connection Management",
                desc: "Handling connection states, reconnection, and error recovery",
                tags: ["connection", "management", "reconnect"],
            },
            {
                name: "Message Serialization",
                desc: "Efficient data formatting for real-time transmission",
                tags: ["serialization", "formatting", "data"],
            },
            {
                name: "Scalable Architecture",
                desc: "Designing WebSocket systems for high-concurrency environments",
                tags: ["scalable", "architecture", "concurrency"],
            },
            {
                name: "Native WebSockets",
                desc: "Working directly with browser WebSocket API for optimal performance",
                tags: ["native", "api", "performance"],
            },
            {
                name: "Real-time Chat",
                desc: "Multi-user chat applications with typing indicators and presence detection",
                tags: ["chat", "indicators", "presence"],
            },
        ],
        experience: [
            {
                company: "Sierra Telecom",
                years: "1+ year",
                focus: "Real-time monitoring of IoT devices via WebSockets",
            },
            {
                company: "Freelance",
                years: "2+ years",
                focus:
                    "Building interactive dashboard applications with live updates",
            },
            {
                company: "Portfolio Projects",
                years: "Current",
                focus:
                    "Real-time chat applications with native WebSockets and Deno",
            },
        ],
        implementation: `This portfolio showcases WebSocket implementation through a fully functional real-time chat application using Deno's native WebSocket support. The application demonstrates bidirectional communication with features including user presence detection, typing indicators, and message broadcasting. The implementation includes proper connection management with automatic reconnection, error handling, and efficient message serialization for optimal performance. Try opening multiple chat windows to see the WebSocket communication in action.`,
        demo: () => <ChatComponent />
    },

    // Micro-Frontend Architecture
    microfrontend: {
        id: "microfrontend",
        title: "Micro-Frontend Architecture",
        logoSrc: "/webpack-logo.png",
        description:
            "Architectural style where independently deliverable frontend applications are composed into a greater whole, enabling scalable multi-product suites with Webpack Module Federation.",
        bulletPoints: [
            "Independent deployment",
            "Webpack Module Federation",
            "Team autonomy",
            "Technology agnosticism",
            "Isolated codebases",
            "Multi-product integration",
        ],
        path: "/skills/microfrontend",
        advancedComponents: [
            {
                name: "Webpack Module Federation",
                desc: "Advanced Webpack 5 configuration for dynamic loading of remote modules at runtime",
                tags: ["webpack", "module", "federation"],
            },
            {
                name: "Bundle Optimization",
                desc: "Webpack chunking strategies and shared dependencies for optimized loading",
                tags: ["bundle", "optimization", "chunking"],
            },
            {
                name: "Cross-Product Navigation",
                desc: "Unified navigation system across independently deployed applications",
                tags: ["navigation", "cross-product", "integration"],
            },
            {
                name: "Shared Authentication",
                desc: "Centralized authentication and authorization across product suite",
                tags: ["authentication", "shared", "auth"],
            },
            {
                name: "Distributed State",
                desc: "State management and data sharing across independent applications",
                tags: ["state", "distributed", "management"],
            },
            {
                name: "Design System Integration",
                desc: "Consistent UI implementation across independently developed modules",
                tags: ["design", "system", "integration"],
            },
            {
                name: "Multi-Team Coordination",
                desc: "Processes and tools for coordinating development across product teams",
                tags: ["coordination", "teams", "collaboration"],
            },
        ],
        experience: [
            {
                company: "Precedent",
                years: "2+ years",
                focus:
                    "Architecting and implementing multi-product suite with Webpack Module Federation for legal insurance claims mediation with independent frontend applications sharing core infrastructure",
            },
            {
                company: "American Express",
                years: "2+ years",
                focus:
                    "Micro-frontend architecture using Webpack for financial services applications with shared authentication",
            },
        ],
        implementation: "",
    },
};
