let ext = "";
if (window.location.hostname !== "quizmania.tk") ext = ".html";
const redirectLinks = [...document.querySelectorAll("a[href='/play']")].concat([...document.querySelectorAll("a[href='/highscores']")].concat([...document.querySelectorAll("a[href='/end']")]));
redirectLinks.forEach(link => {
    link.href = link.href + ext;
});