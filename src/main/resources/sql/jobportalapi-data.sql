INSERT INTO roles (
    name,
    created_at,
    created_by
)
VALUES
    ('ROLE_ADMIN', CURRENT_TIMESTAMP, 'system'),
    ('ROLE_CANDIDATE', CURRENT_TIMESTAMP, 'system'),
    ('ROLE_EMPLOYER', CURRENT_TIMESTAMP, 'system');

INSERT INTO companies (
    name,
    logo,
    industry,
    company_size,
    rating,
    location,
    founded_year,
    website,
    description,
    created_at,
    created_by
)
VALUES
    ('TechNova Solutions', 'https://technova.example/logo.png', 'Software Development', '51-200 employees', 4.5, 'Toronto, Canada', 2018, 'https://technova.example', 'Builds cloud and enterprise software for growing businesses.', CURRENT_TIMESTAMP, 'system'),
    ('MapleCare Health', 'https://maplecare.example/logo.png', 'Healthcare Technology', '201-500 employees', 4.3, 'Ottawa, Canada', 2015, 'https://maplecare.example', 'Provides digital tools for clinics and healthcare teams.', CURRENT_TIMESTAMP, 'system'),
    ('NorthPeak Logistics', 'https://northpeak.example/logo.png', 'Transportation', '501-1000 employees', 4.1, 'Mississauga, Canada', 2012, 'https://northpeak.example', 'Helps companies manage shipping, delivery, and warehouse operations.', CURRENT_TIMESTAMP, 'system'),
    ('BrightPath Finance', 'https://brightpath.example/logo.png', 'Financial Services', '51-200 employees', 4.4, 'Vancouver, Canada', 2019, 'https://brightpath.example', 'Offers financial technology solutions for small businesses.', CURRENT_TIMESTAMP, 'system'),
    ('GreenGrid Energy', 'https://greengrid.example/logo.png', 'Renewable Energy', '201-500 employees', 4.6, 'Calgary, Canada', 2016, 'https://greengrid.example', 'Develops software and systems for renewable energy management.', CURRENT_TIMESTAMP, 'system');

INSERT INTO app_users (
    full_name,
    email,
    password_hash,
    mobile_number,
    role_id,
    company_id,
    enabled,
    created_at,
    created_by
)
VALUES
    (
        'Admin User',
        'admin@percybuilderhire.com',
        '$2a$10$o9Mlx7AEc9kBx1f1jKiUu.E6h2EzLl7NA8SDrix6IjA/lr5RtNfBm',

        '1111111111',
        1,
        NULL,
        true,
        CURRENT_TIMESTAMP,
        'system'
    ),
    (
        'Candidate User',
        'candidate@percybuilderhire.com',
        '$2a$10$o9Mlx7AEc9kBx1f1jKiUu.E6h2EzLl7NA8SDrix6IjA/lr5RtNfBm',
        '2222222222',
        2,
        NULL,
        true,
        CURRENT_TIMESTAMP,
        'system'
    ),
    (
        'Employer User',
        'employer@percybuilderhire.com',
        '$2a$10$o9Mlx7AEc9kBx1f1jKiUu.E6h2EzLl7NA8SDrix6IjA/lr5RtNfBm',
        '3333333333',
        3,
        1,
        true,
        CURRENT_TIMESTAMP,
        'system'
    );

INSERT INTO jobs (
    title,
    company_id,
    location,
    work_type,
    job_type,
    category,
    experience_level,
    salary_min,
    salary_max,
    salary_currency,
    salary_period,
    description,
    requirements,
    benefits,
    posted_date,
    application_deadline,
    applications_count,
    featured,
    urgent,
    remote,
    status,
    created_at,
    created_by
)
VALUES
    ('Backend Java Developer', 1, 'Toronto, Canada', 'Hybrid', 'Full-time', 'Software Development', 'Junior', 65000, 85000, 'CAD', 'YEARLY', 'Build and maintain backend APIs using Java and Spring Boot.', 'Java, Spring Boot, REST APIs, SQL', 'Health benefits, paid vacation, learning budget', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', 12, true, false, false, 'OPEN', CURRENT_TIMESTAMP, 'system'),

    ('Frontend React Developer', 1, 'Toronto, Canada', 'Remote', 'Full-time', 'Software Development', 'Junior', 60000, 80000, 'CAD', 'YEARLY', 'Create responsive user interfaces for job portal features.', 'React, JavaScript, HTML, CSS', 'Remote work, flexible hours, mentorship', CURRENT_DATE, CURRENT_DATE + INTERVAL '25 days', 8, false, false, true, 'OPEN', CURRENT_TIMESTAMP, 'system'),

    ('Healthcare Data Analyst', 2, 'Ottawa, Canada', 'On-site', 'Full-time', 'Data Analytics', 'Intermediate', 70000, 90000, 'CAD', 'YEARLY', 'Analyze healthcare data and support reporting for clinics.', 'SQL, Excel, data visualization, healthcare knowledge', 'Health benefits, pension plan, professional development', CURRENT_DATE, CURRENT_DATE + INTERVAL '20 days', 15, true, false, false, 'OPEN', CURRENT_TIMESTAMP, 'system'),

    ('Logistics Support Coordinator', 3, 'Mississauga, Canada', 'On-site', 'Full-time', 'Operations', 'Entry Level', 45000, 55000, 'CAD', 'YEARLY', 'Support delivery scheduling and warehouse coordination.', 'Communication, organization, basic Excel skills', 'Paid training, benefits, growth opportunities', CURRENT_DATE, CURRENT_DATE + INTERVAL '18 days', 20, false, true, false, 'OPEN', CURRENT_TIMESTAMP, 'system'),

    ('Junior Financial Systems Analyst', 4, 'Vancouver, Canada', 'Hybrid', 'Full-time', 'Finance Technology', 'Junior', 62000, 78000, 'CAD', 'YEARLY', 'Support financial software systems and troubleshoot user issues.', 'SQL, business analysis, problem solving', 'Hybrid work, health benefits, training support', CURRENT_DATE, CURRENT_DATE + INTERVAL '28 days', 6, false, false, false, 'OPEN', CURRENT_TIMESTAMP, 'system'),

    ('Renewable Energy Software Intern', 5, 'Calgary, Canada', 'Hybrid', 'Internship', 'Software Development', 'Intern', 22, 28, 'CAD', 'HOURLY', 'Assist with software tools used for renewable energy monitoring.', 'Java or Python, basic databases, willingness to learn', 'Mentorship, flexible schedule, project experience', CURRENT_DATE, CURRENT_DATE + INTERVAL '35 days', 4, true, false, false, 'OPEN', CURRENT_TIMESTAMP, 'system');