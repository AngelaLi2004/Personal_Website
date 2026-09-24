/* =========================================================
 * 全站公共配置：顶部导航 + 左侧个人信息栏
 * 所有页面共用这一份，改这里就会同步到每个页面。
 * ========================================================= */

const SITE = {
  title: "Homepage",                     // 导航栏最左边的站点名
  name: "Angela (Meixian) Li",                     // 侧边栏名字
  avatar: "images/profile.jpeg",           // 换成你的照片，比如 images/avatar.jpg
  bio: "Undergraduate Student at UIUC",
  info: [
    { icon: "fa-solid fa-building-columns", text: "University of Illinois Urbana-Champaign" },
    { icon: "fa-solid fa-location-dot", text: "Champaign, Illinois" },
  ],
  // 不需要的链接直接删掉那一行；url 填你自己的
  links: [
    { label: "Email",    icon: "fa-solid fa-envelope",  color: "#555",    url: "mailto:meixian2@illinois.edu" },
    { label: "LinkedIn", icon: "fa-brands fa-linkedin", color: "#0a66c2", url: "https://www.linkedin.com/in/angelagis" },
    { label: "Github",   icon: "fa-brands fa-github",   color: "#171516", url: "https://github.com/AngelaLi2004" },
  ],
};

// 顶部导航栏的 tab，顺序即显示顺序
const NAV = [
  { label: "About",        href: "index.html" },
  { label: "Education",    href: "education.html" },
  { label: "Experience",   href: "experience.html" },
  { label: "Portfolio",    href: "portfolio.html" },
  { label: "Presentation", href: "presentation.html" },
  // { label: "More",         href: "more.html" },  // 还没有内容，先隐藏
];

/* ---------------- 以下是渲染逻辑，一般不用改 ---------------- */

(function () {
  let current = location.pathname.split("/").pop() || "index.html";
  if (location.pathname.includes("/works/")) current = "portfolio.html"; // works/ 里的项目详情页也高亮 Portfolio

  const navLinks = NAV.map(
    (n) => `<a href="${n.href}" class="${n.href === current ? "active" : ""}">${n.label}</a>`
  ).join("");

  document.getElementById("masthead").innerHTML = `
    <nav class="masthead-inner">
      <a class="site-title" href="index.html">${SITE.title}</a>
      <div class="nav-links">${navLinks}</div>
      <button class="menu-btn" type="button" aria-expanded="false">Menu</button>
    </nav>
    <div class="nav-dropdown" hidden>${navLinks}</div>`;

  const btn = document.querySelector(".menu-btn");
  const dropdown = document.querySelector(".nav-dropdown");
  btn.addEventListener("click", () => {
    dropdown.hidden = !dropdown.hidden;
    btn.setAttribute("aria-expanded", String(!dropdown.hidden));
  });

  const info = SITE.info
    .map((i) => `<li><i class="${i.icon}"></i><span>${i.text}</span></li>`)
    .join("");
  const links = SITE.links
    .map(
      (l) => `<li><a href="${l.url}" target="_blank" rel="noopener">
        <i class="${l.icon}" style="color:${l.color}"></i><span>${l.label}</span></a></li>`
    )
    .join("");

  document.getElementById("sidebar").innerHTML = `
    <div class="author-avatar"><img src="${SITE.avatar}" alt="${SITE.name}"></div>
    <div class="author-content">
      <h3 class="author-name">${SITE.name}</h3>
      <p class="author-bio">${SITE.bio}</p>
    </div>
    <ul class="author-urls">${info}${links}</ul>`;

  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = `© ${new Date().getFullYear()} ${SITE.name}`;
  }
})();
