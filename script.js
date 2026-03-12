/**
 * ============================================
 * MODULE: Navigation Mobile (Burger Menu)
 * ============================================
 * 
 * Objectif : Gérer l'ouverture/fermeture du menu mobile
 * et assurer l'accessibilité (clavier + lecteurs d'écran)
 * 
 */

(function() {
    'use strict'; // Active le mode strict pour éviter les erreurs silencieuses
    
    /**
     * Attendre que le DOM soit complètement chargé
     * avant d'exécuter le code
     */
    document.addEventListener('DOMContentLoaded', function() {
        
        // --- Sélection des éléments du DOM ---
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('navLinks');
        const links = document.querySelectorAll('.nav-links a');
        
        // --- Vérification de sécurité ---
        // Si un élément n'existe pas, on arrête proprement
        if (!burger || !navLinks) {
            console.warn('[Navigation] Un élément manquant : burger ou navLinks');
            return;
        }
        
        // --- Initialisation de l'état du menu ---
        // On s'assure que l'attribut aria est présent pour l'accessibilité
        if (!burger.hasAttribute('aria-expanded')) {
            burger.setAttribute('aria-expanded', 'false');
        }
        if (!burger.hasAttribute('aria-controls')) {
            burger.setAttribute('aria-controls', 'navLinks');
        }
        
        // --- Fonction : Ouvrir/Fermer le menu ---
        function toggleMenu() {
            const isActive = navLinks.classList.toggle('active');
            
            // Mise à jour de l'attribut ARIA pour les lecteurs d'écran
            burger.setAttribute('aria-expanded', isActive.toString());
            
            // Gestion du focus pour l'accessibilité
            if (isActive) {
                // Quand on ouvre, on met le focus sur le premier lien
                const firstLink = navLinks.querySelector('a');
                if (firstLink) firstLink.focus();
            } else {
                // Quand on ferme, on remet le focus sur le bouton burger
                burger.focus();
            }
        }
        
        // --- Fonction : Fermer le menu ---
        function closeMenu() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                burger.focus();
            }
        }
        
        // --- Événement : Clic sur le bouton burger ---
        burger.addEventListener('click', toggleMenu);
        
        // --- Événement : Clic sur un lien de navigation ---
        // Ferme automatiquement le menu après sélection
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // --- Événement : Touche Échap ---
        // Permet de fermer le menu avec le clavier (accessibilité)
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
        
        // --- Événement : Clic extérieur ---
        // Ferme le menu si on clique en dehors
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active')) {
                // Si le clic n'est ni sur le burger ni dans le menu
                if (!burger.contains(event.target) && !navLinks.contains(event.target)) {
                    closeMenu();
                }
            }
        });
        
        // --- Événement : Redimensionnement fenêtre ---
        // Ferme le menu si on passe en desktop (responsive)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // --- Log de débogage (à retirer en production) ---
        console.log('[Navigation] Module initialisé avec succès');
    });
})();
