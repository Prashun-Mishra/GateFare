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
    "components/packages-carousel.tsx",
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
        // Replace sky- with blue-
        // We use a regex to ensure we don't replace things like "skyline" if we were just replacing "sky"
        // But here we want to replace the color classes like text-sky-600 -> text-blue-600
        // The previous rebrand was emerald -> sky. Now sky -> blue.
        // A simple replace of "sky" with "blue" might be too aggressive (e.g. "skyline" -> "blueline").
        // However, looking at the previous script, it just replaced "emerald" with "sky".
        // Let's be slightly more careful but still broad enough to catch bg-sky-*, text-sky-*, border-sky-*, etc.
        // Actually, "sky" appears in "skyline" in the text content.
        // Let's replace "sky-" with "blue-" and "text-sky" with "text-blue", "bg-sky" with "bg-blue", "border-sky" with "border-blue", "from-sky" with "from-blue", "via-sky" with "via-blue", "to-sky" with "to-blue", "ring-sky" with "ring-blue", "shadow-sky" with "shadow-blue", "decoration-sky" with "decoration-blue".

        // A safer approach for classes:
        let newContent = content.replace(/(bg|text|border|from|via|to|ring|shadow|decoration|outline|accent)-sky-/g, '$1-blue-');

        // Also handle the specific case of "sky-50", "sky-100", etc. if they are used without a prefix (unlikely in standard tailwind but possible in custom classes or string interpolation).
        // But wait, the previous script just did `replace(/emerald/g, 'sky')`.
        // If I do `replace(/sky/g, 'blue')`, "New York Skyline" becomes "New York Blueline".
        // So I should stick to the class prefixes.

        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
