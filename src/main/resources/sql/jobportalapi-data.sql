INSERT INTO companies (
    name,
    industry,
    location,
    website,
    description,
    created_at,
    created_by
)
VALUES
    ('TechNova Solutions', 'Software Development', 'Toronto, Canada', 'https://technova.example', 'Builds cloud and enterprise software for growing businesses.', CURRENT_TIMESTAMP, 'system'),
    ('MapleCare Health', 'Healthcare Technology', 'Ottawa, Canada', 'https://maplecare.example', 'Provides digital tools for clinics and healthcare teams.', CURRENT_TIMESTAMP, 'system'),
    ('NorthPeak Logistics', 'Transportation', 'Mississauga, Canada', 'https://northpeak.example', 'Helps companies manage shipping, delivery, and warehouse operations.', CURRENT_TIMESTAMP, 'system'),
    ('BrightPath Finance', 'Financial Services', 'Vancouver, Canada', 'https://brightpath.example', 'Offers financial technology solutions for small businesses.', CURRENT_TIMESTAMP, 'system'),
    ('GreenGrid Energy', 'Renewable Energy', 'Calgary, Canada', 'https://greengrid.example', 'Develops software and systems for renewable energy management.', CURRENT_TIMESTAMP, 'system');