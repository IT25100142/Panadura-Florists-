document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle & Overlay ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    function toggleMenu() {
        if (!mobileMenu) return; 
        
        if (mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.remove('translate-x-full');
            body.classList.add('overflow-hidden'); 
        } else {
            mobileMenu.classList.add('translate-x-full');
            body.classList.remove('overflow-hidden');
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // --- 2. Hero Image Slideshow ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, 7000);
    }

    // --- 3. Scroll-to-Top Button & Navbar ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            window.scrollY > 400 ? scrollTopBtn.classList.add('show') : scrollTopBtn.classList.remove('show');
        }
        if (navbar) {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-lg', 'border-b', 'border-gray-100', 'py-2');
                navbar.classList.remove('py-4');
            } else {
                navbar.classList.remove('shadow-lg', 'border-b', 'border-gray-100', 'py-2');
                navbar.classList.add('py-4');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. Intersection Observer ---
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                obs.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-hidden').forEach(el => observer.observe(el));

    // --- 6. Language Init ---
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    if (savedLang === 'si') changeLanguage('si');

    // --- 7. Package Sorting Logic ---
    const sortDropdown = document.getElementById('sortDropdown');
    const packagesGrid = document.getElementById('packagesGrid');

    if (sortDropdown && packagesGrid) {
        sortDropdown.addEventListener('change', function() {
            const criteria = this.value;
            const cards = Array.from(packagesGrid.children);

            const sortedCards = cards.sort((a, b) => {
                const priceA = parseInt(a.getAttribute('data-price')) || 0;
                const priceB = parseInt(b.getAttribute('data-price')) || 0;

                if (criteria === 'price-asc') {
                    return priceA - priceB;
                } else if (criteria === 'price-desc') {
                    return priceB - priceA;
                } else {
                    return 0; 
                }
            });

            packagesGrid.innerHTML = '';
            sortedCards.forEach(card => packagesGrid.appendChild(card));
        });
    }
});

// --- 5. Packages Modal Logic (UPDATED IMAGE URLs) ---
const packageData = {
    'general': { 
        title: 'General Package', 
        price: 'Rs. 45,000', 
        image: 'https://www.chandrapanagoda.lk/wp-content/uploads/2016/04/general-470x430.jpg', 
        features: ['Basic polished coffin', 'Dressing and makeup service', 'Floral wreaths (2)', 'Hearse transport', 'Standard funeral notice'] 
    },
    'standard': { 
        title: 'Standard Package', 
        price: 'Rs. 75,000', 
        image: 'https://www.chandrapanagoda.lk/wp-content/uploads/2016/04/standard-2-470x430.jpg', 
        features: ['Polished Teak-finish coffin', 'Professional embalming', 'Floral wreaths (4)', 'Mercedes hearse', 'Funeral notice & chairs'] 
    },
    'silver': { 
        title: 'Silver Package', 
        price: 'Rs. 110,000', 
        image: 'https://www.chandrapanagoda.lk/wp-content/uploads/2016/04/silver-3-470x430.jpg', 
        features: ['Elegant white/gold casket', 'Full embalming', 'Premium floral arrangements', 'Mercedes hearse & flower van', 'Video coverage'] 
    },
    'gold': { 
        title: 'Gold Package (VIP)', 
        price: 'Rs. 185,000', 
        image: 'https://www.chandrapanagoda.lk/wp-content/uploads/2016/04/gold-1-470x430.jpg', 
        features: ['Luxury rippled casket', 'VIP Embalming', 'Imported flower arrangements', 'Limousine hearse', 'Uniformed pallbearers'] 
    },
    'diamond': { 
        title: 'Diamond Package (VIP)', 
        price: 'Rs. 250,000', 
        image: 'https://www.chandrapanagoda.lk/wp-content/uploads/2016/04/Diamond-1-470x430.jpg', 
        features: ['Open-poles luxury casket', 'Full floral decor', 'Luxury hearse & 2 family cars', 'Full western band', 'Drone coverage'] 
    },
    'platinum': { 
        title: 'Platinum Package (Elite)', 
        price: 'Call for Pricing', 
        image: 'https://www.chandrapanagoda.lk/wp-content/uploads/2016/03/platinum-470x430.jpg', 
        features: ['Presidential Grade Casket', 'Complete Event Management', 'Executive fleet', 'Choir or Traditional drummers', 'Unlimited floral decor'] 
    }
};

function openModal(key) {
    const modal = document.getElementById('packageModal');
    const data = packageData[key];
    if (!data || !modal) return;

    if (document.getElementById('modalTitle')) document.getElementById('modalTitle').textContent = data.title;
    if (document.getElementById('modalPrice')) document.getElementById('modalPrice').textContent = data.price;
    if (document.getElementById('modalImage')) document.getElementById('modalImage').src = data.image;
    
    const list = document.getElementById('modalList');
    if (list) {
        list.innerHTML = '';
        data.features.forEach(f => {
            const li = document.createElement('li');
            li.className = 'flex items-center gap-3';
            li.innerHTML = `<i class="fas fa-check text-brand-gold"></i> <span>${f}</span>`;
            list.appendChild(li);
        });
    }
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeModal() {
    const modal = document.getElementById('packageModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

// --- 6. Language Translation Dictionary ---
const translations = {
    'en': {
        // Navigation
        'nav_home': 'Home', 'nav_about': 'About Us', 'nav_services': 'Services',
        'nav_packages': 'Packages', 'nav_gallery': 'Gallery', 'nav_contact': 'Contact Us',
        
        // Home
        'hero_title': 'Professional & Reliable', 'hero_subtitle': 'Funeral Services',
        'hero_desc': 'We act with the highest levels of respect and dignity, standing by your side during times of bereavement.',
        'btn_support': 'Immediate Support', 'btn_packages': 'View Packages',

        // Services Page
        'svc_page_title': 'Our Services',
        'svc_management_title': 'Funeral Management',
        'svc_management_desc': 'We take the weight off your shoulders by handling every aspect of the funeral arrangement.',
        'svc_embalming_title': 'Professional Embalming',
        'svc_embalming_desc': 'Our qualified embalmers use state-of-the-art techniques to preserve the dignity of your loved one.',
        'svc_fleet_title': 'Luxury Fleet',
        'svc_fleet_desc': 'We possess one of the finest fleets of ceremonial vehicles in Sri Lanka.',
        'svc_ransivige_title': 'Traditional Ransivige',
        'svc_ransivige_desc': 'For traditional Buddhist funerals, we construct elaborate and respectful Ransivige.',
        'cta_title': 'Need Assistance?',
        'cta_desc': 'Our team is available 24/7 to answer your questions and guide you.',
        'btn_contact': 'Contact Us',

        // About Page
        'abt_page_title': 'About Us',
        'abt_history_label': 'Our History',
        'abt_history_title': 'Serving with Compassion Since 1990',
        'abt_history_desc1': 'Founded over three decades ago, Panadura Florists began with a simple mission: to provide families with a shoulder to lean on during life’s most difficult moments.',
        'abt_history_desc2': 'From our humble beginnings as a local floral shop, we have grown into a premier funeral service provider.',
        'abt_stat_years': 'Years Experience',
        'abt_stat_families': 'Families Served',
        'val_empathy_title': 'Empathy First',
        'val_empathy_desc': 'We listen to your needs with an open heart, ensuring you feel supported at every step.',
        'val_respect_title': 'Respectful Care',
        'val_respect_desc': 'We treat your loved ones with the highest level of dignity, adhering to all cultural traditions.',
        'val_excellence_title': 'Excellence',
        'val_excellence_desc': 'From our facilities to our floral arrangements, we maintain the highest standards of quality.',

        // Packages Page
        'pkg_page_title': 'Our Packages',
        'pkg_page_subtitle': 'Transparent Pricing • Dignified Service • No Hidden Costs',
        'pkg_general_title': 'General Package', 'pkg_general_desc': 'The affordable funeral plan. Specially designed for those who want to arrange a decent ceremony at the lowest possible cost.',
        'pkg_standard_title': 'Standard Package', 'pkg_standard_desc': 'Designed specially for those who look for above average funeral ceremony with all the elements of a standard funeral ceremony.',
        'pkg_silver_title': 'Silver Package', 'pkg_silver_desc': 'A modest but elegant last ceremony. Special floral arrangements and sprayed casket are included in this tier.',
        'pkg_gold_title': 'Gold Package', 'pkg_gold_desc': 'Includes luxury rippled casket, Mercedes/Volvo hearse, and personal uniformed attendees for a dignified farewell.',
        'pkg_diamond_title': 'Diamond Package', 'pkg_diamond_desc': 'Features open-poles luxury casket, limousine hearse, full band, and live streaming services for extended family.',
        'pkg_platinum_title': 'Platinum Package', 'pkg_platinum_desc': 'The ultimate tribute. Presidential casket, executive fleet, drone coverage, and full event management.',
        'tag_vip': 'VIP Service', 'tag_elite': 'Elite', 'btn_read_more': 'Read More', 'btn_book': 'Book This Package',

        // Contact Page
        'cnt_page_title': 'Contact Us',
        'cnt_page_subtitle': 'We are here to support you 24 hours a day, 7 days a week. Please do not hesitate to contact us for immediate assistance.',
        'cnt_info_phone': 'Phone',
        'cnt_info_address': 'Address',
        'cnt_info_email': 'Email',
        'form_name': 'Your Name',
        'form_phone': 'Phone Number',
        'form_email': 'Email Address',
        'form_message': 'Message',
        'form_submit': 'Send Message'
    },
    'si': {
        // Navigation
        'nav_home': 'මුල් පිටුව', 'nav_about': 'අපි ගැන', 'nav_services': 'සේවාවන්',
        'nav_packages': 'පැකේජ', 'nav_gallery': 'ඡායාරූප', 'nav_contact': 'අමතන්න',
        
        // Home
        'hero_title': 'වෘත්තීය සහ විශ්වාසවන්ත', 'hero_subtitle': 'මල් ශාලා සේවාවන්',
        'hero_desc': 'වියෝවූ මොහොතක, ගෞරවය සහ අභිමානය පෙරදැරිව අපි ඔබ ළඟින්ම සිටිමු.',
        'btn_support': 'හදිසි ඇමතුම්', 'btn_packages': 'පැකේජ බලන්න',

        // Services Page
        'svc_page_title': 'අපගේ සේවාවන්',
        'svc_management_title': 'අවමංගල්‍ය කළමනාකරණය',
        'svc_management_desc': 'අවමංගල්‍ය කටයුතු වල සියලුම වගකීම් භාරගනිමින් අපි ඔබට සහාය වන්නෙමු.',
        'svc_embalming_title': 'වෘත්තීය මිනී එබ්බවීමේ සේවා',
        'svc_embalming_desc': 'අපගේ සුදුසුකම් ලත් කාර්ය මණ්ඩලය නවීන තාක්ෂණය භාවිතා කරමින් ගෞරවනීය සේවාවක් සපයයි.',
        'svc_fleet_title': 'සුඛෝපභෝගී රථ වාහන',
        'svc_fleet_desc': 'ශ්‍රී ලංකාවේ ඇති විශිෂ්ටතම අවමංගල්‍ය රථ ඇණියක් අප සතුය.',
        'svc_ransivige_title': 'සාම්ප්‍රදායික රන්සිවිගෙයි',
        'svc_ransivige_desc': 'බෞද්ධ අවමංගල්‍ය සඳහා උසස් තත්ත්වයේ රන්සිවිගෙයි නිර්මාණය කරනු ලැබේ.',
        'cta_title': 'අපගේ සහාය අවශ්‍යද?',
        'cta_desc': 'ඔබගේ ගැටළු සහ අවශ්‍යතා සඳහා අපගේ කණ්ඩායම දවසේ පැය 24 පුරාම සූදානම්.',
        'btn_contact': 'අපව අමතන්න',

        // About Page
        'abt_page_title': 'අපි ගැන',
        'abt_history_label': 'අපගේ ඉතිහාසය',
        'abt_history_title': '1990 සිට කාරුණික සේවාව',
        'abt_history_desc1': 'දශක තුනකට පෙර පානදුරේ ආරම්භ වූ අපගේ ආයතනය, පවුල්වල දුෂ්කරම අවස්ථාවලදී ඔවුන්ට ශක්තියක් වීම අරමුණු කර ගෙන ඇත.',
        'abt_history_desc2': 'කුඩා මල් සාප්පුවකින් ආරම්භ වී අද වන විට කළුතර දිස්ත්‍රික්කයේ ප්‍රමුඛතම මල් ශාලාව බවට පත්ව ඇත.',
        'abt_stat_years': 'වසරක පළපුරුද්ද',
        'abt_stat_families': 'පාරිභෝගික පවුල්',
        'val_empathy_title': 'කරුණාව පෙරදැරිව',
        'val_empathy_desc': 'අපි ඔබගේ අවශ්‍යතාවන්ට හදවතින්ම සවන් දෙන්නෙමු.',
        'val_respect_title': 'ගෞරවනීය සත්කාර',
        'val_respect_desc': 'සියලුම සංස්කෘතික චාරිත්‍ර වලට ගරු කරමින් අපි කටයුතු කරන්නෙමු.',
        'val_excellence_title': 'විශිෂ්ටත්වය',
        'val_excellence_desc': 'අපගේ පහසුකම් සහ මල් සැරසිලි ඉහළම ප්‍රමිතියෙන් යුක්තය.',

        // Packages Page
        'pkg_page_title': 'අපගේ පැකේජ',
        'pkg_page_subtitle': 'විනිවිද පෙනෙන මිල ගණන් • ගෞරවනීය සේවාව',
        'pkg_general_title': 'සාමාන්‍ය පැකේජය', 'pkg_general_desc': 'අඩුම වියදමකින් ගෞරවනීය උත්සවයක් සඳහා විශේෂයෙන් නිර්මාණය කර ඇත.',
        'pkg_standard_title': 'ස්ටෑන්ඩර්ඩ් පැකේජය', 'pkg_standard_desc': 'සියලුම මූලික අංග ඇතුළත් සාමාන්‍ය මට්ටමේ ගෞරවනීය පැකේජය.',
        'pkg_silver_title': 'සිල්වර් පැකේජය', 'pkg_silver_desc': 'මධ්‍යම මට්ටමේ අලංකාරවත් උත්සවයක් සඳහා. විශේෂ මල් සැරසිලි ඇතුලත්ය.',
        'pkg_gold_title': 'ගෝල්ඩ් පැකේජය', 'pkg_gold_desc': 'සුඛෝපභෝගී පෙට්ටිය, මර්සිඩීස් රථය සහ නිල ඇඳුම් සේවකයන් ඇතුළත්ය.',
        'pkg_diamond_title': 'ඩයමන්ඩ් පැකේජය', 'pkg_diamond_desc': 'සුඛෝපභෝගී විවෘත පෙට්ටිය, ලිමසින් රථය සහ සජීවී විකාශන පහසුකම් සහිතයි.',
        'pkg_platinum_title': 'ප්ලැටිනම් පැකේජය', 'pkg_platinum_desc': 'ඉහළම ගෞරවය. ජනාධිපති මට්ටමේ පෙට්ටිය සහ සම්පූර්ණ උත්සව කළමනාකරණය.',
        'tag_vip': 'VIP සේවාව', 'tag_elite': 'විශිෂ්ටතම', 'btn_read_more': 'වැඩි විස්තර', 'btn_book': 'අපව අමතන්න',

        // Contact Page
        'cnt_page_title': 'අපව අමතන්න',
        'cnt_page_subtitle': 'අපගේ කණ්ඩායම දවසේ පැය 24 පුරාම ඔබගේ සහායට සූදානම්.',
        'cnt_info_phone': 'දුරකථන',
        'cnt_info_address': 'ලිපිනය',
        'cnt_info_email': 'විද්‍යුත් තැපෑල',
        'form_name': 'ඔබගේ නම',
        'form_phone': 'දුරකථන අංකය',
        'form_email': 'විද්‍යුත් ලිපිනය',
        'form_message': 'පණිවිඩය',
        'form_submit': 'පණිවිඩය යවන්න'
    }
};

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    const btnSi = document.getElementById('btn-si');
    const btnEn = document.getElementById('btn-en');
    
    if (btnSi && btnEn) {
        if (lang === 'si') {
            btnSi.classList.add('text-brand-gold', 'font-bold');
            btnSi.classList.remove('text-gray-400', 'hover:text-brand-gold');
            btnEn.classList.remove('text-brand-gold', 'font-bold');
            btnEn.classList.add('text-gray-400', 'hover:text-brand-gold');
            document.body.style.fontFamily = '"Noto Sans Sinhala", sans-serif'; 
        } else {
            btnEn.classList.add('text-brand-gold', 'font-bold');
            btnEn.classList.remove('text-gray-400', 'hover:text-brand-gold');
            btnSi.classList.remove('text-brand-gold', 'font-bold');
            btnSi.classList.add('text-gray-400', 'hover:text-brand-gold');
            document.body.style.fontFamily = '"Manrope", sans-serif';
        }
    }
    localStorage.setItem('preferredLanguage', lang);
}