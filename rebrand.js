const fs = require('fs');
const path = require('path');

const files = [
    "components/booking/booking-wizard.tsx",
    "components/booking/step-seats.tsx",
    "components/booking/step-passenger.tsx",
    "components/booking/step-addons.tsx",
    "components/flight-card-skeleton.tsx",
    "components/concentric-circles.tsx",
    "components/flight-card.tsx",
    "components/flight-filters.tsx",
    "components/navbar.tsx",
    "components/promo-popup.tsx",
    "components/search-widget.tsx",
    "app/flights/page.tsx",
    "app/faq/page.tsx",
    "app/page.tsx",
    "app/enquiry/page.tsx",
    "app/contact/page.tsx",
    "app/about/page.tsx"
];

files.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const newContent = content.replace(/emerald/g, 'sky');
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
