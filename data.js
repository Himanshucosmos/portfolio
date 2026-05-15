const siteData = {
  projects: [
    {
      title: "bundlebuild_",
      link: "https://github.com/Himanshucosmos/bundlebuild_",
      image: "bundlebuild_thumb.png",
      description: "A Resume builder that helps you to get the job faster. Built with JavaScript."
    },
    {
      title: "linked-out",
      link: "https://github.com/Himanshucosmos/linked-out",
      image: "linkedout_thumb.png",
      description: "They thought LinkedIn was Tinder. This is your response. Built with TypeScript."
    },
    {
      title: "watari",
      link: "https://github.com/Himanshucosmos/watari",
      image: "watari_thumb.png",
      description: "WATARI is a meditative web simulation where you guide a flock of birds through an endless ocean landscape. It was created out of a desire to build something quiet, reflective, and peaceful. Built with HTML & JS."
    },
    {
      title: "himanshu-portfolio",
      link: "https://github.com/Himanshucosmos/himanshu-portfolio",
      image: "portfolio_thumb.png",
      description: "It's just my first version of my cringe portfolio then thought of pivoting to the better version of the portfolio with portfolio 2.0. Built with TypeScript."
    },
    {
      title: "ai-native-news-reporting",
      link: "https://github.com/Himanshucosmos/ai-native-news-reporting",
      image: "ainews_thumb.png",
      description: "The website that collects tech news across the internet and brings them into one place. Built with TypeScript."
    }
  ],
  articles: [
    {
      title: "the burden of infinite choice",
      date: "2025-09-28",
      link: "article-1.html",
      hoverImage: "hover_scene_1.png"
    },
    {
      title: "suffering as curriculum",
      date: "2025-11-14",
      link: "article-2.html",
      hoverImage: "hover_scene_1.png"
    }
  ],
  poetry: [
    {
      title: "on waiting",
      date: "October 10, 2025",
      link: "#",
      lines: [
        "we call it patience when it belongs to someone else.",
        "in ourselves it is just fear wearing a quieter coat.",
        "",
        "we wait for the storm to pass,",
        "we wait for the light to shift,",
        "we wait for someone to tell us",
        "it is finally time to begin.",
        "",
        "but the calendar keeps tearing itself apart",
        "one page at a time,",
        "and we are still here,",
        "hands in our pockets,",
        "waiting."
      ]
    },
    {
      title: "inventory",
      date: "August 4, 2025",
      link: "#",
      lines: [
        "count what you have left after each subtraction.",
        "the remainder is the real number. start there.",
        "",
        "not the version of you before the loss,",
        "not the version you planned to become.",
        "the one standing here now,",
        "a little less, and still standing.",
        "",
        "take stock.",
        "even the broken things cast a shadow.",
        "even the empty rooms still have walls."
      ]
    }
  ]
};

// Auto-render logic for listing pages
window.initPageData = () => {
  // Render Projects
  const projectsList = document.getElementById('projects-container');
  if (projectsList && siteData.projects) {
    projectsList.innerHTML = siteData.projects.map(p => {
      const dateStr = p.date ? p.date : '2024-2025';
      return `
      <div class="project-entry">
        <div class="project-info">
          <div class="project-title-line">
            <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project-title">[${p.title}]</a>
            <span class="project-date">${dateStr}</span>
          </div>
          <p class="project-desc">${p.description}</p>
        </div>
        <div class="project-thumb">
          <img src="${p.image}" alt="${p.title}" />
        </div>
      </div>`;
    }).join('');
  }

  // Render Articles
  const articlesList = document.getElementById('articles-container');
  if (articlesList && siteData.articles) {
    articlesList.innerHTML = siteData.articles.map(a => `
      <div class="post-entry">
        <a href="${a.link}" class="post-title">${a.title}</a>
        <div class="post-date">${a.date}</div>
      </div>
    `).join('');
  }

  // Render Poetry
  const poetryList = document.getElementById('poetry-container');
  if (poetryList && siteData.poetry) {
    const archiveLinks = siteData.poetry.map(p =>
      `<a href="#poem-${p.title.replace(/\s+/g, '-')}" class="post-title">${p.title}</a>`
    ).join('\n    ');

    const poems = siteData.poetry.map(p => {
      const body = p.lines.map(line =>
        line === '' ? '<br>' : `<span>${line}</span>`
      ).join('\n      ');
      return `
      <div class="poem-entry" id="poem-${p.title.replace(/\s+/g, '-')}">
        <h2 class="poem-title">[ ${p.title} ]</h2>
        <div class="poem-date">${p.date}</div>
        <div class="poem-body">
          ${body}
        </div>
      </div>`;
    }).join('');

    poetryList.innerHTML = `
      <div class="poetry-archive">
        <h3 class="archive-heading">Poetry Archive</h3>
        <div class="archive-links">
          ${archiveLinks}
        </div>
      </div>
      <div class="poems-list">${poems}</div>
    `;
  }

};

document.addEventListener('DOMContentLoaded', window.initPageData);
