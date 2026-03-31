/**
 * ============================================
 * MODULE: Navigation Mobile (Burger Menu)
 * ============================================
 */

(function() {
    'use strict';

     // Attends que TOUT soit chargé (DOM + ressources)
    window.addEventListener('load', function init() {

         // --- Sélection des éléments ---
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('navLinks');
        const links = document.querySelectorAll('.nav-links a');
        
        // --- Vérification de sécurité ---
        if (!burger || !navLinks) {
            console.error('[Navigation] Éléments manquants:', { burger: !!burger, navLinks: !!navLinks });
            return;
        }
        
        // --- Initialisation ARIA ---
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-controls', 'navLinks');



          // --- Variables d'état ---
        let isMenuOpen = false;
        const MOBILE_BREAKPOINT = 768;
        
        // --- Fonctions ---
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('active', isMenuOpen);
            burger.setAttribute('aria-expanded', isMenuOpen.toString());
            
            // Gestion du focus
            if (isMenuOpen) {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) firstLink.focus();
            } else {
                burger.focus();
            }
        }
        
        function closeMenu() {
            if (isMenuOpen) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                burger.focus();
            }
        }
        
        // --- Événements ---
        
        // Toggle au clic/touch sur le burger
        burger.addEventListener('click', toggleMenu);
        burger.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Empêche le double-clic
            toggleMenu();
        });
        
        // Fermeture au clic sur un lien
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Fermeture avec Échap
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
        
        // Fermeture au clic extérieur (avec débogage)
        document.addEventListener('click', function(event) {
            if (isMenuOpen) {
                const clickedInside = burger.contains(event.target) || navLinks.contains(event.target);
                if (!clickedInside) {
                    closeMenu();
                }
            }
        });
        
        // Resize: seulement si on passe DE mobile vers desktop
        let wasMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        
        window.addEventListener('resize', function() {
            const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
            
            // Seulement si on quitte le mode mobile
            if (wasMobile && !isMobile && isMenuOpen) {
                closeMenu();
            }
            
            wasMobile = isMobile;
        });
        
        // --- Debug (retirer en production) ---
        console.log('[Navigation] Module initialisé - Burger:', burger, 'NavLinks:', navLinks);
        
        // Nettoyage de l'écouteur d'initialisation
        window.removeEventListener('load', init);
    });
})();


/**
 * ====================================================
 * MODULE: Fermeture automatique des détails/summary
 * ====================================================
 */

document.querySelectorAll(".stack-card").forEach(detail => {

    detail.addEventListener("toggle", () => {

        if (detail.open) {

            document.querySelectorAll(".stack-card").forEach(other => {

                if (other !== detail) {
                    other.removeAttribute("open");
                }

            });

        }

    });
    
});


/**
 * ============================================
 * MODULE: Date dans le footer
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const anneeSpan = document.getElementById('annee');
    if (anneeSpan) {
        anneeSpan.textContent = new Date().getFullYear();
    }
});




/**
 * ============================================
 * MODULE: Scroll : Bouton retour vers le haut 
 * ============================================
 */

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {
    if (window.scrollY > 800) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }
});

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/**
 * ============================================
 * MODULE: FLIP CARD
 * ============================================
 */


document.querySelectorAll(".flip-btn").forEach(button => {

	button.addEventListener("click", () => {
		button.closest(".card").classList.add("flipped")
	})

})

document.querySelectorAll(".btn_back").forEach(button => {

	button.addEventListener("click", () => {
		button.closest(".card").classList.remove("flipped")
	})

})





/**
 * ============================================
 * MODULE: Onglets pour la section CODE
 * ============================================
 */

        const tabs = document.querySelectorAll(".tab");
        const blocks = document.querySelectorAll(".code-block");

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                blocks.forEach(b => b.classList.remove("active"));
                tab.classList.add("active");
                const file = tab.dataset.file;
                document.getElementById(file).classList.add("active");
            });
        });