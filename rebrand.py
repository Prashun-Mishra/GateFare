import sys
import os

files = [
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
]

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content.replace("emerald", "sky")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"File not found: {file_path}")
