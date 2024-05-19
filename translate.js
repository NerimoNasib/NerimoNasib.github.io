document.addEventListener("DOMContentLoaded", function() {
    const languageLink = document.querySelector("#language a");
    const translateElements = document.querySelectorAll("[data-translate]");

    let currentLanguage = "jp";

    function loadTranslations(language) {
        fetch("translations.json")
            .then(response => response.json())
            .then(data => {
                translateElements.forEach(element => {
                    const key = element.getAttribute("data-translate");
                    const translation = data[language][key];
                    if (translation) {
                        element.textContent = translation;
                    }
                });
            })
            .catch(error => console.error("Error loading translations", error));
    }

    loadTranslations(currentLanguage);

    languageLink.addEventListener("click", function(event) {
        event.preventDefault();

        currentLanguage = currentLanguage === "en" ? "jp" : "en";

        loadTranslations(currentLanguage);

        languageLink.textContent = currentLanguage === "en" ? "🇯🇵 🇺🇸 Change Language" : "🇯🇵 🇺🇸 言語変換";
    });
});
