/**
 * ============================================
 * MODULE: Easter egg
 * ============================================
 */



document.addEventListener("DOMContentLoaded", () => {

    const konamiCode = [
        "ArrowUp","ArrowUp",
        "ArrowDown","ArrowDown",
        "ArrowLeft","ArrowRight",
        "ArrowLeft","ArrowRight",
        "b","a"
    ];

    let position = 0;

    document.addEventListener("keydown", (event) => {

        const target = event.target.tagName.toLowerCase();

        if (target === "input" || target === "textarea") {
            return;
        }

        const key = event.key.toLowerCase();

        if (key === konamiCode[position].toLowerCase()) {
            position++;

            if (position === konamiCode.length) {
                activateEasterEgg();
                position = 0;
            }

        } else {
            position = 0;
        }

    });


    const photo = document.getElementById("photo-profil");
    let tapCount = 0; let tapTimer;
    if (photo) {

        photo.addEventListener("touchstart", (event) => {
            photo.classList.add("tap");
            setTimeout(() => { photo.classList.remove("tap"); }, 100);
            tapCount++;
            clearTimeout(tapTimer);
            if (tapCount === 8) {
                activateEasterEgg();
                tapCount = 0;
                return;
            }
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 1500);
        });
    }







	
});

function activateEasterEgg() {
    // alert("Félicitations ! Vous avez trouvé l'easter egg !");
    openSecretConsole();
}
    function openSecretConsole() {

    const consoleWindow = document.createElement("div");
    consoleWindow.className = "secret-console";

    const content = document.createElement("div");
    content.className = "console-content";

    consoleWindow.appendChild(content);
    document.body.appendChild(consoleWindow);

    const message = `
initializing system...

loading developer profile...

> Mario detected
> Full-stack developer
> curiosity level : HIGH
> persistence : MAX

access granted.
welcome.
`;

    typeWriter(content, message);

    setTimeout(() => {
        consoleWindow.remove();
    }, 12000);

}

function typeWriter(element, text) {

    let index = 0;

    function write() {

        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(write, 40);
        }

    }

    write();
}

